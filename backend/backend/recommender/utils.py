from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict
from auth_app.models import UserProfile
from .models import UserInteraction
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from collections import Counter
import ast
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

def get_user_interaction_matrix(interactions):
    users = list(set(interactions.values_list('user_id', flat=True)))
    songs = list(set(interactions.values_list('song_id', flat=True)))
    
    user_mapping = {user: idx for idx, user in enumerate(users)}
    song_mapping = {song: idx for idx, song in enumerate(songs)}
    
    matrix = np.zeros((len(users), len(songs)))
    
    for interaction in interactions:
        user_idx = user_mapping[interaction.user_id]
        song_idx = song_mapping[interaction.song_id]
        # convert like/dislike to numerical values
        value = 1 if interaction.interaction_type == "like" else -1
        matrix[user_idx, song_idx] = value
    
    return matrix, user_mapping, 

def get_song_features_matrix(songs):
    features = []
    for song in songs:
        # Combine genre and other metadata into feature vector
        song_features = [song.genre]
        # Add other relevant features from your Song model
        # For example: song.artist, song.album, etc.
        features.append(song_features)
    
    # Convert features to one-hot encoding
    mlb = MultiLabelBinarizer()
    return mlb.fit_transform(features)

class Recommender:
    def __init__(self, df):
        self.df = df.copy()  
        self.df = self._aggregate_song_data(df)
        self._prepare_features()

    def _safe_literal_eval(self, value):
        """Safely apply literal_eval to strings."""
        if isinstance(value, str):
            try:
                return ast.literal_eval(value)
            except (ValueError, SyntaxError):
                # if fails, return a list with the string itself
                return [value]
        return value  


    def _aggregate_song_data(self, df):

       
       # group by song_id and aggregate
        aggregated = df.groupby('song_id').agg({
            'listen_count': 'sum',  
            'interaction': lambda x: list(x),  
            'genres': 'first',  # genres should be the same for each song
        }).reset_index()
        
        # calculate interaction statistics
        aggregated['interaction_stats'] = aggregated['interaction'].apply(
            lambda x: {
                'positive': sum(1 for i in x if i == 1),
                'negative': sum(1 for i in x if i == -1),
                'total': len(x)
            }
        )
        return aggregated
    
    def _prepare_features(self):
        self.df["genres"] = self.df["genres"].apply(self._safe_literal_eval)

        
        # genre processing
        mlb = MultiLabelBinarizer()
        print("ATTENTION:", type(self.df["genres"]))
        genre_matrix = mlb.fit_transform(self.df["genres"])
    
        genre_df = pd.DataFrame(
            genre_matrix,
            columns=mlb.classes_,
            index=self.df.index  # ensure this to align with the original df index
        )
        def adjust_interactions(interactions):
            return [1 if x == 1 else -1 for x in interactions]
        
        self.df['adjusted_interaction'] = self.df['interaction'].apply(adjust_interactions)
        df_exploded = self.df.explode('adjusted_interaction')
        interactions_matrix = pd.get_dummies(df_exploded['adjusted_interaction'], prefix='interaction')
        interactions_matrix = interactions_matrix.groupby(df_exploded.index).sum()  # ensure it has the same length as the original df
    
        
        # fill the missing listen count values with 0
        self.df['listen_count'] = self.df['listen_count'].fillna(0)
        
        # using MinMax scaling for all feature matrices -- ranges 0 to 1
        scaler = MinMaxScaler()
        genre_scaled = scaler.fit_transform(genre_df)
        interaction_scaled = scaler.fit_transform(interactions_matrix)
        listen_count_scaled = scaler.fit_transform(self.df[['listen_count']].values)
        
        # ensure all feature matrices have the same number of rows
        assert genre_scaled.shape[0] == interaction_scaled.shape[0] == listen_count_scaled.shape[0], "row mismatch!"
    
        # combine all features into a single feature matrix
        self.feature_matrix = np.hstack([
            genre_scaled * 0.4,  
            interaction_scaled * 0.4, 
            listen_count_scaled * 0.2  
        ])
        
        # store song IDs for reference
        self.song_ids = self.df["song_id"].values

    def get_similar_songs(self, target_song_id, top_n=5,min_score_threshold=-0.3):

        scaler = MinMaxScaler()
        # find the target song index
        target_idx = np.where(self.song_ids == target_song_id)[0]
        if len(target_idx) == 0:
            raise ValueError(f" The song: {target_song_id} not found in dataset.")
        target_idx = target_idx[0]
        
        # calculate similarities
        target_features = self.feature_matrix[target_idx].reshape(1, -1)
        similarities = cosine_similarity(target_features, self.feature_matrix)[0]
        
        # create a mask for songs to exclude (including the target song)
        mask = np.ones_like(similarities, dtype=bool)
        mask[target_idx] = False  # exclude the target song

        self.df['normalized_interaction'] = self.df['interaction'].apply(lambda x: np.mean(x))  
        for idx, song_id in enumerate(self.song_ids):
            if self.df.loc[idx, 'normalized_interaction'] < min_score_threshold:
                mask[idx] = False

        
        # get the top N similar songs
        similar_indices = np.argsort(similarities[mask])[::-1][:top_n]
        
        # map back to the actual indices
        actual_indices = np.arange(len(similarities))[mask][similar_indices]
        
        # return the song IDs and their similarity scores
        result_songs = self.song_ids[actual_indices]
        result_scores = []
        for idx in actual_indices:
            result_scores.append({
                'similarity_score': similarities[idx],
                'interaction_score': self.df.loc[idx, 'normalized_interaction'],
                'combined_score': (similarities[idx] + 1) * (self.df.loc[idx, 'normalized_interaction'] + 1) / 4
                # combined score formula normalizes both scores to [0,1] range and multiplies them
            })        
        return result_songs, result_scores
import React, { useState, useEffect } from 'react';
import "../../styling/SongLoad.css";
import Like from "../../assets/images/Like.png";
import Dislike from "../../assets/images/Dislike.png";
import { ACCESS_TOKEN } from '../../constants';


const SongLoad: React.FC = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const [interaction, setInteraction] = useState<null | 'like' | 'dislike'>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const getAuthToken = () => localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/music-app/songs/');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handleInteraction = async (type: 'like' | 'dislike') => {
    if (songs.length === 0) return;

    const currentSong = songs[currentSongIndex];

    const interactionData = {
        song_id: currentSong.id,  
        artist_name: currentSong.artist_name,
        genre: currentSong.genre,
        interaction_type: type
      };
      

    try {
        const token = getAuthToken(); 
        if (!token) {
          return;
        }
      const response = await fetch('http://127.0.0.1:8000/recommender/interactions/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(interactionData),
      });

      if (response.ok) {
        console.log(`${type} interaction recorded successfully.`);
        setInteraction(type);
        nextSong();
      } else {
        console.error('Failed to record interaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error recording interaction:', error);
    }
  };

  if (songs.length === 0) {
    return <div>Loading songs...</div>;
  }

  const currentSong = songs[currentSongIndex];

  return (
    <div className="song-container">
      <div className="song-details">
        <div className='song-title'>{currentSong.song_name}</div>
        <div className='song-artist'>{currentSong.artist_name}</div>
        <div className='song-hashtags'>{currentSong.genre.join(' ')}</div>
        <div className='song-hashtags'>{currentSong.hashtags.join(' ')}</div>

        <audio
          key={currentSongIndex}
          src={`http://127.0.0.1:8000${currentSong.audio_file}`}
          controls
          className='audio'
        />
      </div>

      <div>
        <button
          className="song-button"
          onClick={() => handleInteraction('like')}
        >
          <img className="button-img" src={Like} alt="Like" />
        </button>
        <button
          className="song-button"
          onClick={() => handleInteraction('dislike')}
        >
          <img className="button-img" src={Dislike} alt="Dislike" />
        </button>
      </div>
    </div>
  );
};

export default SongLoad;

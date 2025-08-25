import React, { useState, useEffect } from 'react';
import "../../styling/SongLoad.css";
import { motion, AnimatePresence } from 'framer-motion';
import { IoHeartOutline, IoHeartDislikeOutline } from 'react-icons/io5';
import { BsMusicNoteBeamed } from 'react-icons/bs';
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
        
        // Animate out current song
        setTimeout(() => {
          nextSong();
          setInteraction(null);
        }, 500);
      } else {
        console.error('Failed to record interaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error recording interaction:', error);
    }
  };

  if (songs.length === 0) {
    return (
      <div className="loading-container">
        <BsMusicNoteBeamed className="loading-icon" />
        <p>Loading songs...</p>
      </div>
    );
  }

  const currentSong = songs[currentSongIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="song-container"
        key={currentSongIndex}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="song-card">
          <div className="song-details">
            <motion.h1 
              className="song-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentSong.song_name}
            </motion.h1>
            <motion.h2 
              className="song-artist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentSong.artist_name}
            </motion.h2>
            
            <motion.div 
              className="song-tags"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentSong.genre.map((genre: string, index: number) => (
                <span key={index} className="tag genre-tag">{genre}</span>
              ))}
              {currentSong.hashtags.map((tag: string, index: number) => (
                <span key={index} className="tag hashtag-tag">#{tag}</span>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="interaction-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className={`interaction-button dislike-button ${interaction === 'dislike' ? 'active' : ''}`}
              onClick={() => handleInteraction('dislike')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoHeartDislikeOutline />
            </motion.button>
            <motion.button
              className={`interaction-button like-button ${interaction === 'like' ? 'active' : ''}`}
              onClick={() => handleInteraction('like')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoHeartOutline />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SongLoad;

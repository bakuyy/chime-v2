import React, { useState, useEffect } from 'react';
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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <BsMusicNoteBeamed className="text-6xl text-pink-500 mb-6 animate-pulse" />
        <p className="text-xl text-gray-600 font-medium">Loading songs...</p>
      </div>
    );
  }

  const currentSong = songs[currentSongIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="w-full"
        key={currentSongIndex}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <div className="text-left mb-8">
            <motion.h1 
              className="text-4xl font-bold text-gray-900 mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentSong.song_name}
            </motion.h1>
            <motion.h2 
              className="text-2xl text-gray-600 font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentSong.artist_name}
            </motion.h2>
            
            <motion.div 
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentSong.genre.map((genre: string, index: number) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium">
                  {genre}
                </span>
              ))}
              {currentSong.hashtags.map((tag: string, index: number) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="flex justify-center gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className={`w-24 h-24 rounded-full border-none flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
                interaction === 'dislike' ? 'scale-125' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
                color: 'white'
              }}
              onClick={() => handleInteraction('dislike')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoHeartDislikeOutline />
            </motion.button>
            <motion.button
              className={`w-24 h-24 rounded-full border-none flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
                interaction === 'like' ? 'scale-125' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                color: 'white'
              }}
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

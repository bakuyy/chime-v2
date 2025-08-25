import React, { useState, useEffect } from 'react';
import "../../styling/ProfileLayout.css";
import { motion, AnimatePresence } from 'framer-motion';
import { IoAddCircleOutline, IoSaveOutline } from 'react-icons/io5';
import { ACCESS_TOKEN } from '../../constants';

interface Profile {
  preferredGenres: string[];
}

const ProfileLayout: React.FC = () => {
  const initialProfile: Profile = {
    preferredGenres: [],
  };

  const [profileData, setProfileData] = useState<Profile>(initialProfile);
  const [genreInput, setGenreInput] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const getAuthToken = () => localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchProfileAndUsername = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const token = getAuthToken();
        if (!token) {
          setError('Authorization token not found.');
          setLoading(false);
          return;
        }
  
        const response = await fetch('http://127.0.0.1:8000/auth-app/user-profile/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to fetch profile: ${errorData}`);
        }
  
        const data = await response.json();
        console.log("API Response Data:", data);
  
        const { username, preferred_genres } = data;
  
        setUsername(username);
        setProfileData({
          preferredGenres: Array.isArray(preferred_genres) ? preferred_genres : [],
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileAndUsername();
  }, []);

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenreInput(e.target.value);
  };

  const handleAddGenres = () => {
    const newGenres = genreInput
      .split(',')
      .map((genre) => genre.trim())
      .filter((genre) => genre.length > 0);

    setProfileData((prev) => ({
      ...prev,
      preferredGenres: [...new Set([...prev.preferredGenres, ...newGenres])],
    }));

    setGenreInput('');
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      preferredGenres: prev.preferredGenres.filter(genre => genre !== genreToRemove),
    }));
  };

  const handleSave = async () => {
    const token = getAuthToken();
    if (!token) {
      setError('Authorization token not found.');
      return;
    }

    setSaveStatus('saving');

    try {
      const response = await fetch('http://127.0.0.1:8000/auth-app/user-profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const textResponse = await response.text();
        throw new Error(`Error saving the profile: ${textResponse}`);
      }

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="profile-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="profile-card"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="profile-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="username">{username}</h1>
          {error && <p className="error-message">{error}</p>}
        </motion.div>

        <motion.div 
          className="genre-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Add Music Preferences</h2>
          <div className="genre-input-container">
            <input
              type="text"
              value={genreInput}
              onChange={handleGenreChange}
              className="genre-input"
              placeholder="Add genres (comma-separated)"
            />
            <motion.button
              className="add-genre-button"
              onClick={handleAddGenres}
              disabled={genreInput.trim() === ''}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoAddCircleOutline />
            </motion.button>
          </div>

          <motion.div 
            className="genres-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence>
              {profileData.preferredGenres.map((genre, index) => (
                <motion.div
                  key={genre}
                  className="genre-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleRemoveGenre(genre)}
                >
                  {genre}
                  <span className="remove-genre">×</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.button
          className={`save-button ${saveStatus}`}
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <IoSaveOutline />
          {saveStatus === 'saving' ? 'Saving...' : 
           saveStatus === 'success' ? 'Saved!' : 
           saveStatus === 'error' ? 'Error!' : 'Save Changes'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProfileLayout;

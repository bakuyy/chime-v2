import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import { IoPersonCircleOutline } from "react-icons/io5";

import './styling/ProfileLayout.css';

const ProfileLayout = () => {
  const [username, setUsername] = useState('');
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState('idle');

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setUsername(data.username);
        setGenres(data.genres || []);
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAddGenre = () => {
    if (newGenre.trim() && !genres.includes(newGenre.trim())) {
      setGenres([...genres, newGenre.trim()]);
      setNewGenre('');
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    setGenres(genres.filter(genre => genre !== genreToRemove));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // Replace with actual API call
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, genres }),
      });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-layout">
      <div className="profile-card">
        <div className="profile-header">
          <h1 className="username">{username}</h1>
        </div>

        <div className="genre-section">
          <h2>Favorite Genres</h2>
          <div className="genre-input-container">
            <input
              type="text"
              className="genre-input"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              placeholder="Add a genre..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddGenre()}
            />
            <button
              className="add-genre-button"
              onClick={handleAddGenre}
              disabled={!newGenre.trim()}
            >
              <FaPlus />
            </button>
          </div>

          <div className="genres-grid">
            {genres.map((genre) => (
              <div key={genre} className="genre-tag">
                {genre}
                <span
                  className="remove-genre"
                  onClick={() => handleRemoveGenre(genre)}
                >
                  <FaTimes />
                </span>
              </div>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          className={`save-button ${saveStatus}`}
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
        >
          <FaSave />
          {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default ProfileLayout; 
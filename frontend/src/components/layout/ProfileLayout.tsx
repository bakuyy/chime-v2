import React, { useState, useEffect } from 'react';
import "../../styling/ProfileLayout.css";
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

  // Retrieve the JWT token from localStorage
  const getAuthToken = () => localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchProfileAndUsername = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const token = getAuthToken(); // Get the token from localStorage
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
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

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
      preferredGenres: [...prev.preferredGenres, ...newGenres],
    }));

    setGenreInput('');
  };

  // Save the profile (PUT request to update the profile)
  const handleSave = async () => {
    const token = getAuthToken();
    if (!token) {
      setError('Authorization token not found.');
      return;
    }

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

      const textResponse = await response.text();
      console.log('Raw Response Text:', textResponse);
      alert('Profile saved successfully!');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-layout">
      {error && <div className="error-message">{error}</div>}
      <div className="profile-form">
        <div className="form-group">
          <label  htmlFor="username"><div className="username">{username}</div></label>
        </div>



        <div className="form-group">
          <label htmlFor="preferredGenres">Preferred Genres</label>
          <input
            type="text"
            id="preferredGenres"
            value={genreInput}
            onChange={handleGenreChange}
            className="input-field"
            placeholder="Enter genres (comma separated)"
          />
          <button
            onClick={handleAddGenres}
            className="add-genre-button"
            disabled={genreInput.trim() === ''}
          >
            Add Genres
          </button>
          <div className="genres-list">
            {profileData.preferredGenres.length > 0 && (
              <ul>
                {profileData.preferredGenres.map((genre, index) => (
                  <div className="genre" key={index}>{genre}</div>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileLayout;

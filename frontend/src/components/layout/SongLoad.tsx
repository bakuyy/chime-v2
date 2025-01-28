import React, { useState, useEffect } from 'react';
import "../../styling/SongLoad.css";

const SongLoad: React.FC = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

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

        
        <audio key={currentSongIndex} controls>
          <source src={`http://127.0.0.1:8000${currentSong.audio_file}`} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <button onClick={nextSong}>Next Song</button>
    </div>
  );
};

export default SongLoad;

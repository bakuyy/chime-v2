import React from 'react';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';
import { mockPlaylists } from '../mockData/playlists';
import './styling/Playlist.css';

const Playlist = () => {
  return (
    <div className="playlist-layout">
      <div className="playlist-container">
        <h1 className="playlist-title">Your Playlists</h1>
        <div className="playlists-grid">
          {mockPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
              <div className="playlist-header">
                <div className="playlist-icon">
                  <FaMusic />
                </div>
                <h2 className="playlist-name">{playlist.name}</h2>
              </div>
              <div className="songs-list">
                {playlist.songs.map((song) => (
                  <div key={song.id} className="song-item">
                    <div className="song-info">
                      <h3 className="song-title">{song.title}</h3>
                      <p className="song-artist">{song.artist}</p>
                    </div>
                    <div className="song-tags">
                      {song.genre.map((genre, index) => (
                        <span key={index} className="genre-tag">{genre}</span>
                      ))}
                      {song.hashtags.map((hashtag, index) => (
                        <span key={index} className="hashtag-tag">{hashtag}</span>
                      ))}
                    </div>
                    <button className="play-button">
                      <FaPlay />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist; 
import React from 'react';
import ProtectedNavbar from '../../components/layout/ProtectedNavbar';
import SongLoad from '../../components/layout/SongLoad';
import Audio from "../../assets/images/Audio.png";
import "../../styling/Swipe.css";

const Swipe: React.FC = () => {
  return (
    <div className="swipe-page">
      <ProtectedNavbar />
      <div className="swipe-container">
        <div className="audio-section">
          <img src={Audio} alt="Audio Visualizer" className="audio-image" />
        </div>
        <div className="song-section">
          <SongLoad />
        </div>
      </div>
    </div>
  );
};

export default Swipe;

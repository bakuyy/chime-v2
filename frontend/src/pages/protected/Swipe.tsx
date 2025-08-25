import React from 'react';
import { motion, easeOut } from 'framer-motion';
import ProtectedNavbar from '../../components/layout/ProtectedNavbar';
import SongLoad from '../../components/layout/SongLoad';
import MusicPulseAnimation from '../../components/layout/MusicPulseAnimation';
import "../../styling/Swipe.css";

const Swipe: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  const audioVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      rotate: -3
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  };

  return (
    <div className="swipe-page" style={{ paddingTop: '100px' }}>
      <ProtectedNavbar />
      <motion.div 
        className="swipe-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="audio-section"
          variants={audioVariants}
        >
          <MusicPulseAnimation />
        </motion.div>
        <motion.div 
          className="song-section"
          variants={sectionVariants}
        >
          <SongLoad />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Swipe;

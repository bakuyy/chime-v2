import React from 'react';
import { motion } from 'framer-motion';

const MusicPulseAnimation: React.FC = () => {
  // Create an array of 8 bars for the music visualization
  const bars = Array.from({ length: 8 }, (_, i) => i);

  const barVariants = {
    animate: (i: number) => ({
      scaleY: [1, 2, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut"
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="music-pulse-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '40px',
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        minHeight: '200px',
        minWidth: '300px'
      }}
    >
      {bars.map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={barVariants}
          animate="animate"
          style={{
            width: '12px',
            height: '60px',
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            opacity: 0.8
          }}
        />
      ))}
      
      {/* Add a music note icon in the center */}
     
    </motion.div>
  );
};

export default MusicPulseAnimation;

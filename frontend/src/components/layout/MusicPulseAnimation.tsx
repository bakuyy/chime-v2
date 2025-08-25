import React from 'react';
import { motion, easeOut, easeInOut } from 'framer-motion';

const MusicPulseAnimation: React.FC = () => {
  // Create an array of 8 bars for the music visualization
  const bars = Array.from({ length: 8 }, (_, i) => i);

  const barVariants = {
    animate: (i: number) => ({
      scaleY: [1, 2.5, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        delay: i * 0.15,
        ease: easeInOut
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
        ease: easeOut
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center gap-2 p-10 rounded-3xl min-h-[200px] min-w-[300px] overflow-hidden relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {bars.map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={barVariants}
          animate="animate"
          className="w-3 h-20 bg-white rounded-md opacity-80"
        />
      ))}
    </motion.div>
  );
};

export default MusicPulseAnimation;

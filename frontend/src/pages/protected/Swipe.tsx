import React from 'react';
import { motion, easeOut } from 'framer-motion';
import ProtectedNavbar from '../../components/layout/ProtectedNavbar';
import SongLoad from '../../components/layout/SongLoad';
import MusicPulseAnimation from '../../components/layout/MusicPulseAnimation';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24">
      <ProtectedNavbar />
      <motion.div 
        className="max-w-7xl mx-auto p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex flex-col lg:flex-row gap-8 items-start"
          variants={audioVariants}
        >
          <div className="w-full lg:w-1/3">
            <MusicPulseAnimation />
          </div>
          <motion.div 
            className="w-full lg:w-2/3"
            variants={sectionVariants}
          >
            <SongLoad />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Swipe;

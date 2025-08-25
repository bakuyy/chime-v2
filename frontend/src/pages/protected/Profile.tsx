import React from 'react';
import { motion, easeOut } from 'framer-motion';
import ProtectedNavbar from '../../components/layout/ProtectedNavbar';
import ProfileLayout from '../../components/layout/ProfileLayout';
import SongMatches from '../../components/layout/SongMatches';

const Profile: React.FC = () => {
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

  const itemVariants = {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100 relative overflow-hidden pt-24">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 via-transparent to-purple-300/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      
      <ProtectedNavbar />
      <motion.div 
          className="max-w-7xl mx-auto p-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
      >
          <motion.div className="mb-8" variants={itemVariants}>
              <ProfileLayout />
          </motion.div>
          <motion.div variants={itemVariants}>
              <SongMatches />
          </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;

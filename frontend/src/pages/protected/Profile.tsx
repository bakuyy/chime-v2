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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24">
        <ProtectedNavbar />
        <motion.div 
            className="max-w-7xl mx-auto p-6"
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

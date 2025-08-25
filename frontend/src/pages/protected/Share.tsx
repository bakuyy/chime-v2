import React from 'react';
import { motion, easeOut } from 'framer-motion';
import ProtectedNavbar from '../../components/layout/ProtectedNavbar';
import SongUploadForm from '../../components/layout/SongUploadForm';

const Share: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  const formVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100 relative overflow-hidden pt-24">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 via-transparent to-purple-300/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      
      <ProtectedNavbar/>
      <motion.div
          className="max-w-4xl mx-auto p-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
      >
          <motion.div variants={formVariants} className="flex justify-center">
              <SongUploadForm/>
          </motion.div>
      </motion.div>
    </div>
  );
};

export default Share;

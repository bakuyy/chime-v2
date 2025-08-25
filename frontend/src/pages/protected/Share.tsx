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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24">
        <ProtectedNavbar/>
        <motion.div
            className="max-w-4xl mx-auto p-6"
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

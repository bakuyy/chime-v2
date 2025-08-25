import React from 'react';
import { motion, easeOut, easeInOut } from 'framer-motion';

const NotFound: React.FC = () => {
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

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.3
      }
    }
  };

  const bounceVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  return (
    <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50 p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.div 
            className="text-center space-y-8"
            variants={textVariants}
            animate="animate"
        >
            <motion.span
                className="text-4xl font-bold text-gray-800 block"
                variants={bounceVariants}
            >
                not found
            </motion.span>
        </motion.div>
        <motion.div 
            variants={textVariants}
            className="text-8xl font-bold text-purple-500 mt-8"
        >
            404
        </motion.div>
    </motion.div>
  );
};

export default NotFound;

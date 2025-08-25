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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}
    >
        <motion.div 
            variants={textVariants}
            animate="animate"
        >
            <motion.span
                variants={bounceVariants}
                style={{ display: 'inline-block' }}
            >
                not found
            </motion.span>
        </motion.div>
        <motion.div 
            variants={textVariants}
            style={{ fontSize: '4rem', marginTop: '1rem' }}
        >
            404
        </motion.div>
    </motion.div>
  );
};

export default NotFound;

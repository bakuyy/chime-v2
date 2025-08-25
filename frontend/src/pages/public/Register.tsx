import React from 'react';
import { motion, easeOut } from 'framer-motion';
import PublicNavbar from '../../components/auth/PublicNavbar'
import "../../styling/Register.css"
import LoginForm from '../../components/auth/LoginForm';

import CallToAction from "../../assets/images/CallToAction.png"

const Register: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      rotate: -2
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: easeOut
      }
    }
  };

  return (
    <div>
        <PublicNavbar/>
        <motion.div 
            className='login-container'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.img 
                className='login-img' 
                src={CallToAction}
                variants={imageVariants}
            />
            <motion.div variants={itemVariants}>
                <LoginForm route="/auth-app/register/" method="register"/>
            </motion.div>
        </motion.div>
        
    </div>
  );
};

export default Register;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, easeOut } from 'framer-motion';
import "../../styling/Home.css"
import PublicNavbar from '../../components/auth/PublicNavbar';

import HomePageGirl from "../../assets/images/HomePageGirl.png"

const Home: React.FC = () => {

    const navigate = useNavigate()
    const handleClick =()=>{
        navigate("/login")
    }

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
            scale: 0.9
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

    const imageVariants = {
        hidden: { 
            opacity: 0, 
            x: -50,
            rotate: -5
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

    const buttonVariants = {
        hover: { 
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: { 
            scale: 0.95 
        }
    };

  return (
    <div className=''>
        <PublicNavbar/>
        <motion.div 
            className='home-container'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.img 
                className="home-girl" 
                src={HomePageGirl}
                variants={imageVariants}
            />
            <div>
                <motion.div 
                    className='home-title'
                    variants={itemVariants}
                >
                    the <motion.span 
                        className="music-note"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                    >♫</motion.span> world at your fingertips.
                </motion.div>
                <motion.div 
                    className='home-subtitle'
                    variants={itemVariants}
                >
                    a tinder-like experience on your music
                </motion.div>
                <motion.div 
                    className='home-text' 
                    onClick={handleClick}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    style={{ cursor: 'pointer' }}
                >
                    start swiping →
                </motion.div>
            </div>
        </motion.div>
    </div>
  );
};

export default Home;

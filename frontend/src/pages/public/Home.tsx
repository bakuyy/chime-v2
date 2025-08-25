import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, easeOut } from 'framer-motion';
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
            <PublicNavbar/>
            <motion.div 
                className="container mx-auto px-6 py-20 flex items-center justify-between min-h-screen"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.img 
                    className="w-1/2 max-w-lg h-auto object-contain"
                    src={HomePageGirl}
                    variants={imageVariants}
                    alt="Home page illustration"
                />
                <div className="w-1/2 max-w-lg space-y-8">
                    <motion.h1 
                        className="text-6xl font-bold text-gray-900 leading-tight"
                        variants={itemVariants}
                    >
                        the <motion.span 
                            className="inline-block text-purple-500"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        >♫</motion.span> world at your fingertips.
                    </motion.h1>
                    <motion.p 
                        className="text-2xl text-gray-600 font-medium"
                        variants={itemVariants}
                    >
                        a tinder-like experience on your music
                    </motion.p>
                    <motion.button 
                        className="text-xl text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200 cursor-pointer"
                        onClick={handleClick}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        start swiping →
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;

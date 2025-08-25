import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, easeOut } from 'framer-motion';
import CallToAction from "../../assets/images/CallToAction.png"
import LoginForm from '../../components/auth/LoginForm';

const Login: React.FC = () => {
    const navigate = useNavigate()

    const handleClick=()=>{
        navigate('/register')
    }

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <motion.div 
            className="max-w-6xl w-full flex items-center gap-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.img 
                className='w-1/2 max-w-lg h-auto object-contain rounded-2xl shadow-2xl'
                src={CallToAction}
                variants={imageVariants}
                alt="Call to action"
            />
            <div className="w-1/2 max-w-md space-y-8">
                <motion.div variants={itemVariants}>
                    <LoginForm route='/auth-app/token/' method='login'/>
                </motion.div>
                
                <motion.div 
                    className="text-center space-y-4"
                    variants={itemVariants}
                >
                    <p className="text-gray-600 text-lg">Don't have an account yet?</p>
                    <motion.button 
                        className="text-purple-600 font-semibold text-lg hover:text-purple-700 transition-colors duration-200"
                        onClick={handleClick}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Register Now.
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
        
    </div>
  );
};

export default Login;

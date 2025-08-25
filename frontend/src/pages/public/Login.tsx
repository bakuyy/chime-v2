import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, easeOut } from 'framer-motion';
import CallToAction from "../../assets/images/CallToAction.png"
import LoginForm from '../../components/auth/LoginForm';
import "../../styling/Login.css"


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
    <div>
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
            <div>
                <motion.div variants={itemVariants}>
                    <LoginForm route='/auth-app/token/' method='login'/>
                </motion.div>
                
                <motion.div 
                    className="login-blurb"
                    variants={itemVariants}
                >
                    <div className="login-text">Don't have an account yet?</div>
                    <motion.button 
                        className="login-button" 
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

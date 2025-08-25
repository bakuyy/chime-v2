import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, easeOut } from 'framer-motion';
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import Google from "../../assets/images/GoogleLogo.png"
import { FaArrowRightLong } from "react-icons/fa6";

interface FormProps {
    route: string;
    method: "login" | "register"
}

const LoginForm: React.FC<FormProps> = ({ route, method }) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const buttonText = (method === "login" ? "Login" : "Register")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {

        const data = {username,password}

        const res = await api.post(route, data)
        if (method ==="login"){
            localStorage.setItem(ACCESS_TOKEN,res.data.access)
            localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
            navigate("/chime")
        }
        
        else {
            navigate("/login")
        }
        }  catch (error:any) {
            alert("error occured: "+ error.message)

        } finally {
            setLoading(false)
        }

    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
                duration: 0.4,
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
        <motion.div 
            className="max-w-md mx-auto space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2 
                className="text-3xl font-bold text-center text-gray-900 mb-8"
                variants={itemVariants}
            >
                {buttonText}
            </motion.h2>
            <motion.form 
                className="space-y-4"
                onSubmit={handleSubmit}
                variants={itemVariants}
            >
                <motion.input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    type="text"
                    name="name"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    whileFocus={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                />
                <motion.input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    whileFocus={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                />
                <motion.button
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    {loading ? "Loading..." : <FaArrowRightLong className="mx-auto" />}
                </motion.button>
            </motion.form>
            
            <motion.div 
                className="relative my-8"
                variants={itemVariants}
            >
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-pink-100 text-gray-500">Or continue with</span>
                </div>
            </motion.div>
            
            <motion.button
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-pink-50 transition-all duration-200"
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
            >
                <img className='w-5 h-5' src={Google} alt="Google" />
                <span>{buttonText} with Google</span>
            </motion.button>
        </motion.div>
    )
}

export default LoginForm

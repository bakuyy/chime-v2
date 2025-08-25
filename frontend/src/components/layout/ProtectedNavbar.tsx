import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { motion, easeOut } from "framer-motion";

interface NavItem {
    title: string;
    link:string;
}

const ProtectedNavbar: React.FC = () => {

    const navigate = useNavigate()
    const handleLogout =()=>{
        localStorage.clear()
        window.location.reload
        navigate("/login")
    }

  const links: NavItem[]= [
    { title: "swipe", link: "/chime" },
    { title: "profile", link: "/profile" },
    { title: "share", link: "/share" },

  ]

  const handleClick = () => {}

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.9
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

  const linkVariants = {
    hover: { 
      scale: 1.1,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95 
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
        className="flex justify-center items-center fixed top-0 left-0 w-full p-5 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {links.map(({ title, link }) => (
          <motion.div
            key={title}
            variants={itemVariants}
          >
            <motion.div
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to={link}
                className="text-lg font-medium text-gray-800 hover:text-pink-600 transition-colors duration-200 px-6 py-3 rounded-lg hover:bg-pink-50 mx-2"
                onClick={handleClick}
              >
                {title}
              </Link>
            </motion.div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
        <motion.button 
            className="ml-4 px-6 py-3 bg-transparent text-gray-800 border-2 border-pink-500 rounded-full text-lg font-medium hover:bg-pink-500 hover:text-white transition-all duration-300 cursor-pointer"
            onClick={handleLogout}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
        >
              logout
            </motion.button>
        </motion.div>
    </motion.div>
  )
}

export default ProtectedNavbar;

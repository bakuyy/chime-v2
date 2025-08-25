import React from "react";
import { Link } from "react-router-dom";
import { motion, easeOut } from "framer-motion";

interface NavItem {
    title: string;
    id:string;
    link:string;
}

const PublicNavbar: React.FC = () => {
  const links: NavItem[]= [
    { title: "login", id: "login", link: "/login" },
    // { title: "register", id: "register", link: "/register" },
  ]

  const handleClick = () => {}

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  return (
      <motion.div 
        className="flex justify-center items-center fixed top-0 left-0 w-full p-5 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {links.map(({ title, link }) => (
          <motion.div
            key={title}
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to={link}
              className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors duration-200 px-6 py-3 rounded-lg hover:bg-gray-50"
              onClick={handleClick}
            >
              {title}
            </Link>
          </motion.div>
        ))}
    </motion.div>
  )
}

export default PublicNavbar;

import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "../../styling/ProtectedNavbar.css";

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
    { title: "upload", link: "/upload" },

  ]

  const handleClick = () => {}
  return (
      <div className="navbar-links">
        {links.map(({ title, link }) => (
          <Link
            key={title}
            to={link}
            className="navbar-link"
            onClick={handleClick}
          >
            {title}
          </Link>
        ))}

        <div>
        <button className='logout-button' onClick={handleLogout}>
              logout
            </button>
        </div>
    </div>
  )
}

export default ProtectedNavbar;

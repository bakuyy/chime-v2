import React from "react";
import { Link } from "react-router-dom";
import "../../../styling/PublicNavbar.css";

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
    </div>
  )
}

export default PublicNavbar;

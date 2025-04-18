import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styling/Home.css"
import PublicNavbar from '../../components/auth/PublicNavbar';

import HomePageGirl from "../../assets/images/HomePageGirl.png"

const Home: React.FC = () => {

    const navigate = useNavigate()
    const handleClick =()=>{
        navigate("/login")
    }
  return (
    <div className=''>
        <PublicNavbar/>
        <div className='home-container'>
        <img className="home-girl" src={HomePageGirl}/>
        <div>
            <div className='home-title'>the <span className="music-note">♫</span> world at your fingertips.</div>
            <div className='home-subtitle'>a tinder-like experience on your music</div>
            <div className='home-text' onClick={handleClick}>start swiping →</div>
        </div>
        </div>

    </div>
  );
};

export default Home;

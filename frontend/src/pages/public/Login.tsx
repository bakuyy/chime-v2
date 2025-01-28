import React from 'react';
import { useNavigate } from 'react-router-dom';
import CallToAction from "../../assets/images/CallToAction.png"
import LoginForm from '../../components/auth/LoginForm';
import "../../../styling/Login.css"


const Login: React.FC = () => {
    const navigate = useNavigate()

    const handleClick=()=>{
        navigate('/register')
    }
    
  return (
    <div>
        <div className='login-container'>
            <img className='login-img' src={CallToAction}/>
            <div>
            <LoginForm route='/auth-app/token/' method='login'/>
            
            <div className="login-blurb">
                        <div className="login-text">Don't have an account yet?</div>
                        <button className="login-button" onClick={handleClick}>Register Now.</button>
            </div>
        </div>
        </div>
        
    </div>
  );
};

export default Login;

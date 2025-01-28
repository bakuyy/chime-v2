import React from 'react';
import PublicNavbar from '../../components/auth/PublicNavbar'
import "../../styling/Register.css"
import LoginForm from '../../components/auth/LoginForm';

import CallToAction from "../../assets/images/CallToAction.png"



const Register: React.FC = () => {
  return (
    <div>
        <PublicNavbar/>
        <div className='login-container'>
            <img className='login-img' src={CallToAction}/>
            <LoginForm route="/auth-app/register/" method="register"/>

        </div>
        
    </div>
  );
};

export default Register;

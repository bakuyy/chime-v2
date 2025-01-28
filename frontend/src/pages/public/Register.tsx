import React from 'react';
import PublicNavbar from '../../components/auth/PublicNavbar'
import CallToAction from "../../assets/images/CallToAction.png"
import "../../../styling/Register.css"



const Register: React.FC = () => {
  return (
    <div>
        <PublicNavbar/>
        <div className='login-container'>
            <img className='login-img' src={CallToAction}/>

        </div>
        
    </div>
  );
};

export default Register;

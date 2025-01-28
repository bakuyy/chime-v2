import React from 'react';
import ProtectedNavbar from '../../components/layout/ProtectedNavbar';
import ProfileLayout from '../../components/layout/ProfileLayout';

const Profile: React.FC = () => {

  return (
    <div className=''>
        <ProtectedNavbar/>
        <ProfileLayout/>


    </div>
  );
};

export default Profile;

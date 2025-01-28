import React from 'react';
import "../../styling/Profile.css";
import ProtectedNavbar from '../../components/layout/ProtectedNavbar';
import ProfileLayout from '../../components/layout/ProfileLayout';
import SongMatches from '../../components/layout/SongMatches';

const Profile: React.FC = () => {
  return (
    <div>
        <ProtectedNavbar />
        <div className="profile-container">
            <ProfileLayout />
            <SongMatches />
        </div>
    </div>
  );
};

export default Profile;

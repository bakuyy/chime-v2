import React from 'react';
import ProtectedNavbar from '../../components/layout/ProtectedNavbar';
import SongUploadForm from '../../components/layout/SongUploadForm';


const Share: React.FC = () => {

  return (
    <div className=''>
        <ProtectedNavbar/>
        <SongUploadForm/>


    </div>
  );
};

export default Share;

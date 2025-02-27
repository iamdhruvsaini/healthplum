import React, { useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import General from './General';
import Consultation from './Consultation';
import Documents from './Documents';

const Profile = () => {
  const navigate = useNavigate();

  // Automatically redirect to 'general' if path is /profile
  useEffect(() => {
    if (window.location.pathname === '/profile') {
      navigate('general', { replace: true });
    }
  }, [navigate]);

  return (
    <section className="content h-[calc(100vh-88px)]">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-md">My Profile</h1>

        <div className="flex gap-4 text-xs">
          <button className="gray-btn" onClick={() => navigate('/user/profile/', { replace: true })}>
            General
          </button>
          <button className="gray-btn" onClick={() => navigate('/user/profile/consultation', { replace: true })}>
            Consultation
          </button>
          <button className="gray-btn" onClick={() => navigate('/user/profile/documents', { replace: true })}>
            Documents
          </button>
        </div>

        <Routes>
          <Route path='/' element={<General/>}></Route>
          <Route path='/consultation' element={<Consultation/>}></Route>
          <Route path='/document' element={<Documents/>}></Route>
        </Routes>
      </div>
    </section>
  );
};

export default Profile;

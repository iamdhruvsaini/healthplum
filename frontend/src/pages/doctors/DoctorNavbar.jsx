import { Bell, LogOut } from 'lucide-react'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { replace, useNavigate } from 'react-router-dom';



const DoctorNavbar = () => {

    const {currentUser,logout} = useAuth();
    const navigate = useNavigate();
    

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true }); // Redirect to login page after logout
      };
      
  return (
    <header className="bg-white mb-4 px-2">
        <div className="">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">HealthPlum</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-2">
                
                <span className="font-medium text-gray-700">{currentUser?.name}</span>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleLogout}>
                <LogOut size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>
  )
}

export default DoctorNavbar
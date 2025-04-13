import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/login/Login';
import App from '../App';
import Home from '../pages/home/Home';
import HealthServices from '../pages/services/HealthServices';
import AboutSection from '../pages/about/AboutSection';
import DoctorFinder from '../pages/findDoctor/DoctorFinder';
import ContactPage from '../pages/contact/ContactPage';
import AppointmentBooking from '../pages/appointment/AppointmentBooking';
import SignupPage from '../pages/signup/SignUpPage';
import Appointment from '../pages/appointment/Appointment';
import DoctorDashboard from '../pages/doctors/DoctorDashboard';
import { PatientProfile } from '../pages/profile/PatientProfile';
import { DoctorProfile } from '../pages/profile/DocotorProfile';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path: 'register',
        element: <SignupPage />
      },
      {
        path:'login',
        element:<Login/>

      },
      {
        path:'services',
        element:<HealthServices/>  
      },
      {
        path:'about',
        element:<AboutSection/>
      },
      {
        path:'find-doctor',
        element:<DoctorFinder/>
      },
      {
        path:'contact',
        element:<ContactPage/>
      },
      {
        path:`appointment/:doctorId`,
        element:<AppointmentBooking/>
      },
      {
        path:'appointments',
        element:<Appointment/>
      },
      {
        path:'doctor/:doctorId',
        element:<DoctorDashboard/>  
      },
      {
        path:'patient-profile',
        element:<PatientProfile/>
      },
      {
        path:'doctor-profile',
        element:<DoctorProfile/>
      }
    ]
  }
]);

export default router;

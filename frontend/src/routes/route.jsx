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
import PrivateRoute from './PrivateRoute';




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
        element:<PrivateRoute><HealthServices/></PrivateRoute> 
      },
      {
        path:'about',
        element:<AboutSection/>
      },
      {
        path:'find-doctor',
        element:<PrivateRoute><DoctorFinder/></PrivateRoute>
      },
      {
        path:'contact',
        element:<ContactPage/>
      },
      {
        path:`appointment/:doctorId`,
        element:<PrivateRoute><AppointmentBooking/></PrivateRoute>
      },
      {
        path:'appointments',
        element:<PrivateRoute><Appointment/></PrivateRoute>
      },
      {
        path:'doctor/:doctorId',
        element:<PrivateRoute><DoctorDashboard/></PrivateRoute>
      },
      {
        path:'patient-profile',
        element:<PrivateRoute><PatientProfile/></PrivateRoute>
      },
      {
        path:'doctor-profile',
        element:<PrivateRoute><DoctorProfile/></PrivateRoute>
      },
      
    ]
  }
]);

export default router;

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
import { PatientProfile } from '../pages/profile/PatientProfile';
import { DoctorProfile } from '../pages/profile/DocotorProfile';
import PrivateRoute from './PrivateRoute';
import ParkinsonsForm from '../pages/prediction/Parkinson';
import Heart from '../pages/prediction/Heart';
import BreastCancer from '../pages/prediction/BreastCancer';
import CaloriePrediction from '../pages/prediction/Calories';
import InsurancePricePrediction from '../pages/prediction/Insurance';
import DoctorDashboard from '../pages/doctors/DoctorDashboard';
import Diabetes from '../pages/prediction/Diabetes';





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
        element:<PrivateRoute><DoctorProfile/></PrivateRoute>
      },
      {
        path:'patient-profile',
        element:<PrivateRoute><PatientProfile/></PrivateRoute>
      },
      {
        path:'doctor-profile',
        element:<PrivateRoute><DoctorProfile/></PrivateRoute>
      },
      {
        path:'/parkinson-disease-detection',
        element:<PrivateRoute><ParkinsonsForm/></PrivateRoute>
      },
      {
        path:'/heart-disease-detection',
        element:<PrivateRoute><Heart/></PrivateRoute>
      },
      {
        path:'/breast-cancer-detection',
        element:<PrivateRoute><BreastCancer/></PrivateRoute>
      },
      {
        path:'/calories-prediction',
        element:<PrivateRoute><CaloriePrediction/></PrivateRoute>
      },
      {
        path:'/insurance-prediction',
        element:<PrivateRoute><InsurancePricePrediction/></PrivateRoute>
      },
      {
        path:'/diabetes-prediction',
        element:<PrivateRoute><Diabetes/></PrivateRoute>
      }
    ]
  },
  {
    path:'/doctor-portal',
    element:<DoctorDashboard/>,
  }
]);

export default router;

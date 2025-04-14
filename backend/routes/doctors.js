import express from 'express';
import { fetchDoctorById, fetchDoctors, fetchTrendingDoctors } from '../controllers/fetchDoctors.js';
import { getAppointmentsByDoctorId } from '../controllers/appointments.js';
const router=express.Router();


router.get('/get-doctors',fetchDoctors);
router.get('/get-doctors/:id',fetchDoctorById);
router.get('/get-trending-doctor',fetchTrendingDoctors);
router.get('/get-appointment-by-doctor-id/:doctorId',getAppointmentsByDoctorId);


export default router;
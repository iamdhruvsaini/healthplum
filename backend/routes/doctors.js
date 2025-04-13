import express from 'express';
import { fetchDoctorById, fetchDoctors, fetchTrendingDoctors } from '../controllers/fetchDoctors.js';
const router=express.Router();


router.get('/get-doctors',fetchDoctors);
router.get('/get-doctors/:id',fetchDoctorById);
router.get('/get-trending-doctor',fetchTrendingDoctors);

export default router;
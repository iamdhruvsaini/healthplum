import express from 'express';
import { fetchDoctorById, fetchDoctors } from '../controllers/fetchDoctors.js';
const router=express.Router();


router.get('/get-doctors',fetchDoctors);
router.get('/get-doctors/:id',fetchDoctorById);

export default router;
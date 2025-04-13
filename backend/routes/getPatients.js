import express from 'express';
import { fetchAppointments} from '../controllers/fetchPatients.js';

const router=express.Router();

router.get('/get-appointments',fetchAppointments);

export default router;
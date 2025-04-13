import express from 'express';
import { bookAppointment } from '../controllers/appointmentBooking.js';

const router=express.Router();


router.post('/book-appointment',bookAppointment);


export default router;
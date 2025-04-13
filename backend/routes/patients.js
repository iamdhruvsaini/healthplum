import express from 'express';
import { fetchPatientDetails} from '../controllers/fetchPatients.js';
import { bookAppointment, cancelAppointment, fetchAppointments } from '../controllers/appointments.js';


const router=express.Router();

router.get('/get-appointments/:patientId',fetchAppointments);
router.get('/patient-details/:patientId',fetchPatientDetails);
router.put('/cancel-appointment/:appointmentId',cancelAppointment);
router.post('/book-appointment',bookAppointment);

export default router;
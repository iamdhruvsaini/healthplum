import express from 'express';
import { fetchPatientDetails} from '../controllers/fetchPatients.js';
import { bookAppointment, cancelAppointment, fetchAppointments } from '../controllers/appointments.js';


const router=express.Router();

router.get('/get-appointments/:patientId',fetchAppointments);
router.get('/patient-details/:patientId',fetchPatientDetails);
router.post('/book-appointment',bookAppointment);
router.put('/cancel-appointment/:appointmentId',cancelAppointment);

export default router;
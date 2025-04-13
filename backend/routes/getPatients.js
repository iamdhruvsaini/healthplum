import express from 'express';
import { fetchAppointments, fetchPatientDetails} from '../controllers/fetchPatients.js';

const router=express.Router();

router.get('/get-appointments/:patientId',fetchAppointments);
router.get('/patient-details/:patientId',fetchPatientDetails);

export default router;
import { sql } from "../database/database.config.js";

export const fetchAppointments = async (req, res) => {
    const { patientId } = req.params;
  
    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }
  
    try {
      const appointments = await sql`
        SELECT 
          a.id, 
          a.doctor_id, 
          d.specialization,
          u.name AS doctor_name,
          a.appointment_date, 
          a.appointment_time, 
          a.reason, 
          a.status, 
          a.created_at
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.user_id
        JOIN users u ON d.user_id = u.id
        WHERE a.patient_id = ${patientId}
        ORDER BY a.appointment_date DESC, a.appointment_time DESC;
      `;
  
      res.status(200).json({ success: true, appointments });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
};
  
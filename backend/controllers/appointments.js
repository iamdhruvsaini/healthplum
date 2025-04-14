
import { parse } from "date-fns"; 
import { sql } from "../database/database.config.js";

export const bookAppointment = async (req, res) => {
  const {
    selectedDate,
    selectedTime,
    appointmentType,
    appointmentReason,
    isInsurance,
    insuranceId,
    insuranceProvider,
    doctorId,
    patientId,
    patientName,
    patientEmail,
    patientPhone,
  } = req.body;

  if (!selectedDate || !selectedTime || !appointmentReason || !doctorId || !patientId) {
    return res.status(400).json({ error: "Missing required appointment details" });
  }

  try {
    // Convert date and time from strings to correct format
    const formattedDate = parse(selectedDate, "yyyy-MM-dd", new Date());
    const formattedTime = parse(selectedTime, "h:mm a", new Date());

    const result = await sql`
      INSERT INTO appointments (
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason,
        status
      )
      VALUES (
        ${patientId},
        ${doctorId},
        ${formattedDate.toISOString().split("T")[0]},
        ${formattedTime.toTimeString().split(" ")[0]},
        ${appointmentReason},
        'pending'
      )
      RETURNING id, appointment_date, appointment_time;
    `;

    const newAppointment = result[0];

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: {
        id: newAppointment.id,
        date: newAppointment.appointment_date,
        time: newAppointment.appointment_time,
      },
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
        ORDER BY a.appointment_date DESC, a.created_at DESC;
      `;

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    console.log(appointmentId);
    if (!appointmentId) {
      return res.status(400).json({ error: "Appointment ID is required" });
    }

    // Check if the appointment exists
    const existingAppointment = await sql`
      SELECT * FROM appointments WHERE id = ${appointmentId};
    `;

    if (existingAppointment.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Delete the appointment
    await sql`
      DELETE FROM appointments WHERE id = ${appointmentId};
    `;

    return res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (!doctorId) {
      return res.status(400).json({ error: "Doctor ID is required" });
    }

    const appointments = await sql`
      SELECT 
        a.id,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.status,
        u.name AS patient_name,
        p.age AS patient_age,
        p.gender AS patient_gender
      FROM appointments a
      JOIN patients p ON a.patient_id = p.user_id
      JOIN users u ON p.user_id = u.id
      WHERE a.doctor_id = ${doctorId}
      ORDER BY a.appointment_date, a.appointment_time;
    `;

    const formattedAppointments = appointments.map((apt) => ({
      id: apt.id,
      appointment_date: apt.appointment_date,
      appointment_time: apt.appointment_time,
      reason: apt.reason,
      status: apt.status,
      patient: {
        name: apt.patient_name,
        age: apt.patient_age,
        gender: apt.patient_gender,
      },
    }));

    res.status(200).json(formattedAppointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

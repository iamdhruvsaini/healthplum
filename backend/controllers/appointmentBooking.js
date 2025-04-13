
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

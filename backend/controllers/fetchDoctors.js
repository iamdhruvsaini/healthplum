import { sql } from "../database/database.config.js";

export const fetchDoctors = async (req, res) => {
    try {
        const doctors = await sql`
            SELECT 
                d.user_id,
                u.name,
                u.email,
                u.created_at,
                d.specialization,
                d.qualifications,
                d.experience_years,
                d.consultation_fee,
                d.face_url,
                d.trending,
                d.rating,
                d.available
            FROM doctors d
            JOIN users u ON d.user_id = u.id
            WHERE u.role = 'doctor' AND d.available = TRUE;`;
        
        // If no doctors found, send a message
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No available doctors found." });
        }

        // Send the list of doctors as the response
        return res.status(200).json(doctors);
    } catch (error) {
        // If any error occurs, send a 500 status with an error message
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching doctors.", error: error.message });
    }
};

export const fetchDoctorById = async (req, res) => {
    const doctorId = req.params.id;
    try {
        const doctor = await sql`
            SELECT 
                d.user_id,
                u.name,
                u.email,
                u.created_at,
                d.specialization,
                d.qualifications,
                d.experience_years,
                d.consultation_fee,
                d.face_url,
                d.trending,
                d.rating,
                d.available
            FROM doctors d
            JOIN users u ON d.user_id = u.id
            WHERE u.role = 'doctor' AND d.user_id = ${doctorId};`;

        // If no doctor found, send a message
        if (doctor.length === 0) {
            return res.status(404).json({ message: "Doctor not found." });
        }

        // Send the doctor details as the response
        return res.status(200).json(doctor[0]);
    } catch (error) {
        // If any error occurs, send a 500 status with an error message
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching doctor details.", error: error.message });
    }
};

export const fetchTrendingDoctors = async (req, res) => {
    try {
      const trendingDoctors = await sql`
        SELECT 
          u.id AS doctor_id,
          u.name,
          u.email,
          d.specialization,
          d.qualifications,
          d.experience_years,
          d.consultation_fee,
          d.face_url,
          d.rating,
          d.available
        FROM doctors d
        JOIN users u ON d.user_id = u.id
        WHERE d.trending = true;
      `;
  
      return res.status(200).json(trendingDoctors);
    } catch (error) {
      console.error('Error fetching trending doctors:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};
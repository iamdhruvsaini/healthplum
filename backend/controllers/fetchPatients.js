import { sql } from "../database/database.config.js";



export const fetchPatientDetails = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const result = await sql`
      SELECT 
        u.id AS id,
        u.name,
        u.email,
        u.role,
        u.created_at,
        p.age,
        p.gender,
        p.phone_number,
        p.address
      FROM users u
      INNER JOIN patients p ON u.id = p.user_id
      WHERE u.id = ${patientId};
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPatientProfile = async (req, res) => {
  const patientId = req.params.patientId;
  
  try {
    // Validate patient ID
    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    // Fetch patient data from both users and patients tables
    const patientResult = await sql`
      SELECT 
        p.user_id, 
        u.name, 
        u.email, 
        p.age, 
        p.gender, 
        p.phone_number, 
        p.address
      FROM 
        patients p
      JOIN 
        users u ON p.user_id = u.id
      WHERE 
        p.user_id = ${patientId}
    `;

    if (patientResult.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patient = patientResult[0];


    // Return combined response
    return res.status(200).json({
      patient,
    });
    
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


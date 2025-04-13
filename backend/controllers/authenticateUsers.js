import { sql } from "../database/database.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const loginUser = async (req, res) => {
    try {
      const JWT_SECRET= process.env.JWT_SECRET;
      const { email, password } = req.body;
  
      // 1. Basic input check
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // 2. Find user
      const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // 3. Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // 4. Get full profile based on role
      let profileDetails = {};
  
      if (user.role === "patient") {
        const [patient] = await sql`SELECT * FROM patients WHERE user_id = ${user.id}`;
        profileDetails = { ...patient };
      } else if (user.role === "doctor") {
        const [doctor] = await sql`SELECT * FROM doctors WHERE user_id = ${user.id}`;
        profileDetails = { ...doctor };
      } else if (user.role === "staff") {
        const [staff] = await sql`SELECT * FROM staff WHERE user_id = ${user.id}`;
        profileDetails = { ...staff };
      }
  
      // 5. Generate JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name:user.name,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      // 6. Return response
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
          ...profileDetails,
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

export const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            confirmPassword,
            phoneNumber,
            gender,
            age,
            address,
            role,             // 'patient' | 'doctor' | 'staff'
            specialization,   // doctor only
            qualifications,   // doctor only
            experienceYears,  // doctor only
            consultationFee,  // doctor only
            department,       // staff only
            position,         // staff only
            employeeId        // staff only
        } = req.body;

        // 1. Basic validation
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        if (!["patient", "doctor", "staff"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Insert into users
        const [newUser] = await sql`
          INSERT INTO users (name, email, password, role)
          VALUES (${name}, ${email}, ${hashedPassword}, ${role})
          RETURNING id
        `;
        const userId = newUser.id;

        // 4. Role-specific inserts
        if (role === "patient") {
            await sql`
            INSERT INTO patients (user_id, phone_number, age, gender, address)
            VALUES (${userId}, ${phoneNumber}, ${age}, ${gender},${address})
          `;
        }
        else if (role === "doctor") {
            // assume req.file.path holds uploaded profilePhoto URL, or null
            const faceUrl = req.file?.path ?? null;

            await sql`
            INSERT INTO doctors (
              user_id,
              specialization,
              qualifications,
              experience_years,
              consultation_fee,
              face_url
            ) VALUES (
              ${userId},
              ${specialization},
              ${qualifications},
              ${experienceYears},
              ${consultationFee},
              ${faceUrl}
            )
          `;
        }
        else if (role === "staff") {
            await sql`
            INSERT INTO staff (
              user_id,
              phone_number,
              department,
              position,
              employee_id
            ) VALUES (
              ${userId},
              ${phoneNumber},
              ${department},
              ${position},
              ${employeeId}
            )
          `;
        }

        // 5. Respond
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.error("Registration error:", err);
        // duplicate email?
        if (err.code === "23505") {
            return res.status(409).json({ error: "Email already in use" });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
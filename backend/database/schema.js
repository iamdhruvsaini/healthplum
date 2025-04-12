import { sql } from "./database.config.js";

export const HealthPlumSchema =async ()=>{
    await sql `
        CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) CHECK (role IN ('doctor', 'patient')) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`

    await sql `
        CREATE TABLE IF NOT EXISTS doctors (
        user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        specialization VARCHAR(100) NOT NULL,
        qualifications TEXT,
        experience_years INT CHECK (experience_years >= 0),
        consultation_fee NUMERIC(10, 2),
        face_url TEXT,
        trending BOOLEAN DEFAULT FALSE,
        rating NUMERIC(2, 1) CHECK (rating >= 0 AND rating <= 5),
        available BOOLEAN DEFAULT TRUE
    );`

    await sql `
    CREATE TABLE IF NOT EXISTS patients (
        user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        age INT CHECK (age > 0),
        gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
        phone_number VARCHAR(15),
        address TEXT
    );
    `

    await sql `
    CREATE TABLE IF NOT EXISTS appointments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID REFERENCES patients(user_id) ON DELETE CASCADE,
        doctor_id UUID REFERENCES doctors(user_id) ON DELETE CASCADE,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        reason TEXT,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `

}

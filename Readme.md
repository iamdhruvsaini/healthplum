
# 🏥 HealthPlum

**HealthPlum** is a modern full-stack healthcare web application that bridges the gap between patients, doctors, and hospital staff. With built-in machine learning support for early disease detection, role-based access, and seamless appointment booking, HealthPlum aims to digitize and simplify healthcare services.

---

## 🚀 Features

- 👩‍⚕️ **Doctor Dashboard** – Manage availability, view appointments, and track ratings.
- 👨‍🦰 **Patient Portal** – Book appointments, access prediction tools, view booking history.
- 🧑‍💼 **Staff Panel** – Book and manage ambulance services, assign emergency roles.
- 🤖 **ML-Powered Predictions** – Parkinson’s and Heart Disease prediction using Flask API.
- 🔒 **Secure Role-Based Authentication** – Login system for doctors, patients, and staff (without Firebase).
- 📊 **Real-Time Status Updates** – Appointment and ambulance statuses handled via backend.

---

## 🛠️ Tech Stack

| Layer        | Tech Used                                  |
|--------------|--------------------------------------------|
| Frontend     | React.js, Tailwind CSS, Redux Toolkit      |
| Backend      | Node.js, Express.js, Jwt                        |
| Database     | PostgreSQL (NeonDB)                        |
| ML Services  | Flask, scikit-learn, pandas, NumPy         |
| Authentication | Custom (role-based)                      |

---

## ⚙️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamdhruvsaini/healthplum.git
   cd healthplum
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

5. **Create a `.env` file**

---

## 🌍 Deployment

| Service        | Platform          |
|----------------|-------------------|
| Frontend       | Vercel  |
| Backend + ML   | Render  |
| Database       | NeonDB  |

---

## 🙋‍♂️ Author

- **Dhruv Saini**  
  GitHub: [@iamdhruvsaini](https://github.com/iamdhruvsaini)  
---

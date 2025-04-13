import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { HealthPlumSchema } from "./database/schema.js";
import getDoctors from "./routes/doctors.js";
import authentication from "./routes/authentication.js";
import getPatients from "./routes/patients.js";


dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Health Plum Server Started Successfully");
});

// ---- >
app.use("/api/doctors", getDoctors);
app.use("/api/authentication", authentication);
app.use("/api/patients", getPatients);
// < ---- 


HealthPlumSchema().then(() => {
    console.log("Database schema created successfully.");
    app.listen(PORT, () => {    
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Error creating database schema:", error);

})




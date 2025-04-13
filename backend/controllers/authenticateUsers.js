import { sql } from "../database/database.config.js";

export const loginUser = async (req, res) => {
    console.log("Login User Called");
    console.log(req.body);
    res.status(200).json({
        message: "Login User Called",
    });

};

export const registerUser = async (req, res) => {
    console.log("Register User Called");
    console.log(req.body);
    res.status(200).json({
        message: "Register User Called",
    });
}
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/db.js"; 
dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export async function getUsers(req, resp){
    try {
        const query = 'select * from Users';
        const rows = await pool.query(query);
        resp.status(200).json(rows);
    }
    catch (error) {
        resp.status(500).json({"message":"Error while fetching data"});
    }
}
export async function registerUser(req, resp){
        const { name, email, password, role, address, phone_number } = req.body;
        try {
            console.log("entering try block");
            const hashedPassword = await bcrypt.hash(password, 10);
            const query = 'Insert into Users (name,email,password,role,address,phone_number) Values($1,$2,$3,$4,$5,$6)';
            const values = [name, email, hashedPassword, role, address, phone_number];
            const result = await pool.query(query, values);
            console.log(name, email, password, role, address, phone_number);

            console.log(result);
            return resp.status(201).json({message:"User registered Sucesssfully"})
        } catch (error) {
            return resp.status(500).json({message:error.message});
        }
}





export async function loginUser(req, resp){
        const { email, password } = req.body;
        const result = await pool.query(`Select * from Users where email=$1`, [email]);
        if (result.rows.length === 0) {
            return resp.status(400).json({message:"User doesn't exist"})
        }
        const user = result.rows[0];
        console.log(ACCESS_TOKEN_SECRET);
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return resp.status(401).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({id:user.id,role:user.role},ACCESS_TOKEN_SECRET,{expiresIn:'1hr'});
        return resp.status(200).json({ token:token,user:user });
}

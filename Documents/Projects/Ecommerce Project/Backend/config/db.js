import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
});
export default pool;
import app from "./app.js"; 
import pool from './config/db.js'; 

const PORT = 3600;

pool.connect()
    .then(() => {
        console.log("Connected to database successfully");
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

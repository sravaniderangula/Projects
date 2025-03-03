const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require('pg');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const app = express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
const { authenticateToken, authenticateUser } = require('./middleware')
const PORT = 3600;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});
app.get('/users', async (req, resp) => {
    try {
        const query = 'select * from Users';
        const rows = await pool.query(query);
        resp.status(200).json(rows);
    }
    catch (error) {
        resp.status(500).json({ "message": "Error while fetching data" });
    }

})
app.post('/SignUp', async (req, resp) => {
    const { name, email, password, role, address, phone_number } = req.body;
    console.log(name, email, password, role, address, phone_number);
    try {
        console.log("entering try block");
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'Insert into Users (name,email,password,role,address,phone_number) Values($1,$2,$3,$4,$5,$6)';
        const values = [name, email, hashedPassword, role, address, phone_number];
        const result = await pool.query(query, values);
        console.log(result);
        return resp.status(201).json({ message: "User registered Sucesssfully" })
    } catch (error) {
        return resp.status(500).json({ message: error });

    }
});

app.post('/Login', async (req, resp) => {
    const { email, password } = req.body;
    const result = await pool.query(`Select * from Users where email=$1`, [email]);
    if (result.rows.length === 0) {
        return resp.status(400).json({ message: "User doesn't exist" })
    }
    const user = result.rows[0];
    console.log(ACCESS_TOKEN_SECRET);

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return resp.status(401).json({ message: "Invalid credentials" })
    }
    const token = jwt.sign({ id: user.id, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
    return resp.status(200).json({ token:token,user:user });
})
app.get('/auth', authenticateToken, authenticateUser, (req, resp) => {
    return resp.status(200).json({ message: "Admin Priveleges Granted" })
})
pool.connect().then(() => {
    console.log("connected to database successfully");
    // fetchData();
}).catch((error) => {
    console.log(error)
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost${PORT}`);
});
app.get('/get/products', async (req, resp) => {
    try {

        const result = await pool.query('Select * from Products');
        if (result.rows.length > 0) {
            return resp.status(200).json({ products:result.rows })
        } else {
            return resp.status(400).json({ message: "No Products exists" })
        }

    } catch (error) {
        console.log("error", error.message);
        return resp.status(500).json({ message: "Internal Server Error" })
    }
})
app.post('/add/product', authenticateToken, authenticateUser, async (req, resp) => {
    console.log(req.role)

    try {
        const { title, description, price, category_id, stock, images, rating } = req.body;
        const values = [title, description, price, category_id, stock, images, rating];
        console.log(values);
        const result = await pool.query(`Insert into Products (title,description,price,category_id,stock,images,rating) values($1,$2,$3,$4,$5,$6,$7)`, values);

        //  if (result.rowCount>0){

        return resp.status(201).json({ message: "product added Sucesssfully", result })

        //  }else{
        //     return resp.status(501).json({ message: "Error while inserting data" })

        //  }

    }
    catch (error) {
        console.log(error.message);
        return resp.status(500).json({ message: "Internal Server Error" })
    }
});


app.put('/update/product/:id', async (req, resp) => {
    const id = parseInt(req.params.id);
    const fields = ["title", "description", "price", "category_id", "stock", "images", "rating"];
    const data = req.body;
    const updateFields = Object.keys(data).filter((field) => (fields.includes(field)));
    const updateData = updateFields.map((field, index) => (`${field}=$${index + 1}`));
    const values = updateFields.map((field, index) => {
        return data[field];
    });
    values.push(id);
    try {
        const query = `Update Products set ${(updateData.join(", "))} where id=$${values.length}`;
        const result = await pool.query(query, values);
        return resp.status(200).json({ message: "Updated Product details successfully" });
    } catch (error) {
        console.log("error", error.message);
        return resp.status(500).json({ error: error.message })
    }
})


app.delete('/delete/product/:id', authenticateToken, authenticateUser, async (req, resp) => {
    const id = parseInt(req.params.id);
    try {
        const query = 'delete  from Products where id=$1';
        const result = await pool.query(query, [id]);
        return resp.status(200).json({ message: "Deleted product Successfully" })
    }
    catch (error) {
        console.log("error", error.message);
        return resp.status(500).json({ error: error.message })
    }

});

app.post('/add/cart/:id',async(req,resp)=>{
    const product_id=parseInt(req.params.id);
    const {user_id,quantity}=req.body;
    try{
        console.log("entering try")
        const query='Insert into Cart (user_id,product_id,quantity) Values($1,$2,$3)';
        const values=[user_id,product_id,quantity];
        const result=await pool.query(query,values);
        return resp.status(201).json({message:"Product added to Cart Successfully"})


    }catch(error){
            console.log("error","error.message");
            return resp.status(500).json({message:"Internal Server Error"})
    }
});

app.put('/update/cart/:id',async(req,resp)=>{
    const product_id=parseInt(req.params.id);
    const {quantity,user_id}=req.body;
    try{
        const query='Update Cart Set quantity=$1 where product_id=$2 and user_id=$3';
        const values=[quantity,product_id,user_id];
        const result=await pool.query(query,values);
        return resp.status(200).json({message:"Product details in Cart Updated Successfully"});

    }
    catch(error){
        console.log("error",error.message);
        return resp.status(500).json({message:"Internal server Error"})
    }
})

app.delete('/delete/cart/:id',async(req,resp)=>{
    const product_id=parseInt(req.params.id);
    const {user_id}=req.body;
    try{
        const query='Delete from Cart where product_id=$1 and user_id=$2';
        const values=[product_id,user_id];
        const result=await pool.query(query,values);
        return resp.status(200).json({message:"Product deleted from cart Successfully"});

    }
    catch(error){
        console.log("error",error.message);
        return resp.status(500).json({message:"Internal server Error"})
    }
})

app.post('/add/wishlist/:id',async(req,resp)=>{
    const product_id=parseInt(req.params.id);
    const {user_id}=req.body;
    try{
        const query='Insert into Wishlist (user_id,product_id) Values($1,$2)';
        const values=[user_id,product_id];
        const result=await pool.query(query,values);
        return resp.status(200).json({message:"Product added to Wishlist Successfully"})


    }catch(error){
            console.log("error","error.message");
            return resp.status(500).json({message:"Internal Server Error"})
    }
});

app.delete('/delete/wishlist/:id',async(req,resp)=>{
    const product_id=parseInt(req.params.id);
    const {user_id}=req.body;
    try{
        const query='Delete from Wishlist where product_id=$1 and user_id=$2';
        const values=[product_id,user_id];
        const result=await pool.query(query,values);
        return resp.status(200).json({message:"Product deleted from Wishlist Successfully"});

    }
    catch(error){
        console.log("error",error.message);
        return resp.status(500).json({message:"Internal server Error"})
    }
})

module.exports = pool;
const fetchProduct = async () => {
    try {
        const limit = 100;
        // const response = await fetch('https://dummyjson.com/products/15'); // single product by id 
        //  const response = await fetch('https://dummyjson.com/products/category/Furniture');   //products by category
        const response = await fetch('https://dummyjson.com/products/category-list'); // products category list

        const data = await response.json();

        console.log('Fetched data', data);
        // const category_id = 8;
        // const { title, description, price, stock, images, rating } = data;
        // console.log(title, description, Math.round(price * 100), stock, images, Math.round(rating));
        // await addSmartPhone(title, description, Math.round(price * 100), category_id, stock, images, Math.round(rating));

        // console.log(data.reviews);
        // const comments = (data.reviews).map((item, index) => { return item.comment });
        // console.log(comments);
        // await addReview(49,comments)
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
};


fetchProduct();


async function addSmartPhone(title, description, price, category_id, stock, images, rating) {
    try {
        //  const id=;
        const values = [title, description, price, category_id, stock, images, rating];
        // console.log(product_id);
        const result = await pool.query(`Insert into Products (title,description,price,category_id,stock,images,rating) values($1,$2,$3,$4,$5,$6,$7)`, values);
        console.log("product added Sucesssfully");

    }
    catch (error) {
        console.log(error.message);
        return "Internal Server Error";
    }

}

async function addReview(product_id, comments) {

    for(const comment of comments) {
        const user_id = 9; // Math.floor(Math.random() * 5) + 3;   //  0.9
        const rating = Math.floor(Math.random() * (5 - 3 + 1)) + 3;// 3 to 5

        try {
            const values = [user_id, product_id ,rating, comment];
            // console.log(values);
            const result = await pool.query(`Insert into Reviews (user_id,product_id, rating,comment) values($1,$2,$3,$4)`, values);
            console.log("review added Sucesssfully");

        } catch (error) {
            console.log(error.message);
            return "Internal Server Error";
        }
    }
}
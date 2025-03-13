import dotenv from "dotenv";
import pool from "../config/db.js"; 
dotenv.config();
export async function getCategories(req, resp) {
    try {
        const result = await pool.query('Select * from Categories');
        if (result.rows.length > 0) {
            return resp.status(200).json({ categories:result.rows })
        } else {
            return resp.status(400).json({ message: "No Products exists" })
        }
    } catch (error) {
        console.log("error", error.message);
        return resp.status(500).json({ message: "Internal Server Error" })
    }
}
export async function getAllProducts(req, resp) {
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
}
export async function addSingleProduct(req, resp) {
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
}
export async function getSingleProduct(req, resp) {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(`Select * from Products where id=$1`,[id]);
        if (result.rows.length === 0) {
            return resp.status(400).json({ message: "No Products exists" })
        }
        const product=result.rows[0];
        const reviewQuery= 'Select re.id,re.rating,re.comment,us.name from Reviews re Join Users us on re.user_id=us.id where re.product_id=$1';
        const reviewData=await pool.query(reviewQuery,[id]);
        const reviews=reviewData.rows.length>0?reviewData.rows:[];
        return resp.status(200).json({"product":product,"reviews":reviews})
    } catch (error) {
        console.log("error", error.message);
        return resp.status(500).json({ message: "Internal Server Error" })
    }
}
export async function updateProduct(req, resp) {
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
}
export async function deleteSingleProduct(req, resp) {
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
}

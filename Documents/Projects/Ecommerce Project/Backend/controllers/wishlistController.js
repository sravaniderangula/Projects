import dotenv from "dotenv";
import pool from "../config/db.js";
dotenv.config();

export async function getItemsWishlist(req, resp) {
    try{
        const query='Select * from Wishlist';
        const result=await pool.query(query);
        return resp.status(200).json({wishlist:result.rows})
    }catch(error){
            console.log("error",error.message);
            return resp.status(500).json({message:"Internal Server Error"});
    }
}

export async function addItemToWishlist(req, resp) {
    const {user_id,product_id}=req.body;

    try{
        const query='Insert into Wishlist (user_id,product_id) Values($1,$2)';
        const values=[parseInt(user_id),parseInt(product_id)];
        const result=await pool.query(query,values);
        return resp.status(200).json({message:"Product added to Wishlist Successfully"})
    }catch(error){
            console.log("error",error.message);
            return resp.status(500).json({message:"Internal Server Error"});
    }
}
export async function deleteFromWishlist(req, resp) {
    const {user_id,product_id}=req.body;
    console.log(user_id,product_id);
    try{
        const query='Delete from Wishlist where product_id=$1 and user_id=$2';
        const values=[parseInt(product_id),parseInt(user_id)];
        const result=await pool.query(query,values);
        return resp.status(200).json({message:"Product deleted from Wishlist Successfully"});
    }
    catch(error){
        console.log("error in delete from wishlist",error.message);
        return resp.status(500).json({message:"Internal server Error"})
    }
}

import dotenv from "dotenv";
import pool from "../config/db.js"; 
dotenv.config();

export async function getItemsCart(req, resp) {
    try{
        const query='Select * from Cart';
        const result=await pool.query(query);
        return resp.status(200).json({Cart:result.rows})
    }catch(error){
            console.log("error","error.message");
            return resp.status(500).json({message:"Internal Server Error"});
    }
}

export async function addItemToCart(req, resp) {
    const {user_id,product_id,quantity}=req.body;
    console.log(user_id,product_id,quantity)
    try{
        console.log("entering try");
        console.log(user_id,product_id,quantity)

        const query='Insert into Cart (user_id,product_id,quantity) Values($1,$2,$3)';
        const values=[user_id,product_id,quantity];
        const result=await pool.query(query,values);
        return resp.status(201).json({message:"Product added to Cart Successfully"})
    }catch(error){
            console.log("error",error.message);
            return resp.status(500).json({message:"Internal Server Error"})
    }}
export async function updateCartItem(req, resp) {
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
}
export async function deleteItemInCart(req, resp) {
    const {user_id,product_id}=req.body;
    try{
        const query='Delete from Cart where product_id=$1 and user_id=$2';
        const values=[parseInt(product_id),parseInt(user_id)];
        const result=await pool.query(query,values);
        return resp.status(200).json({message:"Product deleted from cart Successfully"});
    }
    catch(error){
        console.log("error",error.message);
        return resp.status(500).json({message:"Internal server Error"})
    }
}

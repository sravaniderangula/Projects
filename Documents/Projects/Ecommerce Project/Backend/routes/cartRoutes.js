import express from "express";
import {getItemsCart,addItemToCart,updateCartItem,deleteItemInCart} from '../controllers/cartConroller.js'

const router=express.Router();

router.get('/get/items',getItemsCart);

router.post('/add/item',addItemToCart);

router.put("/update/item/:id",updateCartItem);

router.delete("/delete/item",deleteItemInCart);

export default router;
import express from "express";
import {getItemsWishlist,addItemToWishlist,deleteFromWishlist} from '../controllers/wishlistController.js'
const router=express.Router();
router.get('/get/items',getItemsWishlist)
router.post('/add/item',addItemToWishlist);
router.delete('/delete/item',deleteFromWishlist);
export default router;
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/cart', cartRoutes);

export default app;

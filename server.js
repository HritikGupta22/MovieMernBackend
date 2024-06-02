import express from "express";
import dotenv from "dotenv";
import connectdb from "./db/connectdb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';

dotenv.config();
connectdb();
const app = express();
const corsOptions = {
    origin: 'https://joyful-smakager-ab74fa.netlify.app', // replace with your frontend URL
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users",userRoutes);


app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`));
import express from "express";
import  {signupUser,loginUser,logoutUser,} from "../controllers/userController.js"
import { addFavoriteMovie, getFavoriteMovies, deleteFavoriteMovie } from "../controllers/favoriteController.js";


const router   = express.Router();

router.post("/signup", signupUser);

router.post("/login",loginUser);

router.post("/logout",logoutUser);

router.post("/favorites/add", addFavoriteMovie);

router.get("/favorites/:userId", getFavoriteMovies);

router.delete("/favorites/delete", deleteFavoriteMovie);

export default router ; 
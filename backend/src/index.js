import express from 'express';
import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js'  
import connectDB from './db.js'; 
dotenv.config({     // configure dotenv
    path: "./.env"  // set path of env
}); 
const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);

connectDB()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Error connecting to database", err));




import express from 'express';
import client from './db.js';
import dotenv from "dotenv";
dotenv.config({     // configure dotenv
    path: './.env'  // set path of env
}); 
import { app } from './app.js';

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});

client.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    for (let row of res.rows) {
        console.log(row);
    }
    // client.end();
});






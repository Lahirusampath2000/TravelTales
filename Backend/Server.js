import express from 'express';
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';



const salt=10;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    bcrypt.hash(req.body.password.toSring(),salt,(err,hashedPassword)=>{
        if(err)return res.json(err);
        const values=[
            req.body.username,
            req.body.email,
            req.body.password
        ];
    })
    
})

app.listen(8000, () => {
    console.log("Server is running on port 8081")
});
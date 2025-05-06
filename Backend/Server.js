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
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ status: "error", error: "Unauthorized" });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ status: "error", error: "Forbidden" });
        req.user = user;
        next();
    });
}



app.post('/register', (req, res) => {
    const sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(),salt,(err,hashedPassword)=>{
        if(err){
            console.log(err);
            return res.json(err, "Error hashing password");
        }
            
        const values=[
            req.body.username,
            req.body.email,
            hashedPassword
        ]

        db.query(sql,[values],(err,data)=>{
            if(err)return res.json(err);
            return res.json("User has been created successfully")
        })
    })
    
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.status(500).json({ status: "error", error: "Database error" });
        
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, isMatch) => {
                if (err) return res.status(500).json({ status: "error", error: "Server error" });
                
                if (isMatch) {
                    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.cookie('access_token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: 3600000 // 1 hour
                    });
                    return res.status(200).json({ 
                        status: "success", 
                        message: "Login successful", 
                        userId: data[0].id 
                    });
                } else {
                    return res.status(400).json({ 
                        status: "error", 
                        error: "Wrong password or username" 
                    });
                }
            });
        } else {
            return res.status(404).json({ 
                status: "error", 
                error: "User not found" 
            });
        }
    });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000")
});
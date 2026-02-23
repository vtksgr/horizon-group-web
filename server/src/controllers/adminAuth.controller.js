import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

// REGISTER ADMIN
export const registerAdmin = async (req, res) =>{
    try {
        const {username, email, password} = req.body;

        const existingAdmin = await prisma.admin.findFirst({
            where:{
                OR: [{email}, {username}]
            }
        });
        if(existingAdmin){
            return res.status(400).json({
                message: "Admin already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await prisma.admin.create({
            data:{
                username,
                email,
                password: hashedPassword
            }
        });
        res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: admin.id,
                username: admin.username,
                email:admin.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
// LOGIN ADMIN
export const loginAdmin = async (req, res) =>{
    try{
        const { username, email, password } = req.body;

        if(!username && !email){
            return res.status(400).json({
                message: "Username or email is required" 
            })
        }
        // Build the query — prefer username, fall back to email
        const whereClause = username ? {username} : {email};

        const admin = await prisma.admin.findUnique({
            where: whereClause
        });

        if(!admin){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json({
                message: "message: Invalid credentials"
            })
        }
        const token = jwt.sign(
            {id: admin.id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        res.json({
            message: "Login successful",
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
            },
            next: {
                dashboard: "/api/admin/dashboard",
            },
        });
    }catch(error){
        res.status(500).json({ message: "Server error" });
    }
    
}

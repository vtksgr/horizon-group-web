//F:\horizon-group-web\server\src\middleware\adminAuth.middleware.js
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken"


export const protectAdmin = async (req, res, next) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({message: "Not authorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await prisma.admin.findUnique({
            where: {id: decoded.id},
        });

        if(!admin || !admin.isActive){
            return res.status(403).json({message: "Access denied"});
        }
        req.admin = admin
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
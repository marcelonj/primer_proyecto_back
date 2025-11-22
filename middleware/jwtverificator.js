import jsonwebtoken from 'jsonwebtoken';
import publicRoutes from '../config/publicRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

async function jwtverificator(req, res, next) {
    if (publicRoutes.includes(req.path)) {
        return next();
    }
    const token = req.headers.authorization?.split(" ")[1];
    
    if(!token){
        return res.status(401).send("Token requerido")
    }
    try {
        const decoded = jsonwebtoken.verify(token, secret);
        
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: "Token inválido" });
    }  
}

export default jwtverificator;
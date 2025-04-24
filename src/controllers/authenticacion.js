import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

export function generateToken(payload){

    if (!payload) {
        throw new Error("Payload is required to generate token");
    }

    try{

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;

    }catch(error){

        console.log("Error generating token", error);
        throw new Error("Token generation failed");
    }
}

export function verifyToken(req, res, next){

    const token = req.header("authorization")?.replace("Bearer ", "");
    
    if (!token) return res.status(401).json({ message: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token is invalid or expired' });
    }
};

class authController {

    async signUp(req, res) {
        try {

            const { email, password, name, lastName } = req.body;
        
            const existingUser = await UserModel.getOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const data = await UserModel.createUser({
                email,
                password: hashedPassword,
                name,
                lastName,
            });

            res.status(201).json({ message: "User created successfully", data });


        } catch (error) {
            
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async signIn(req, res) {

        try{
            const { email, password } = req.body;

            const user = await UserModel.getOne({ email });
            
            if (!user) {
                return res.status(400).json({ error: "User does not exist" });
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ error: "Invalid password" });
            }

            const token = generateToken({ email: user.email });
            
            return res.status(200).json({ message: "Login successful", user, token});

        }catch(error){
    
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async signOut(req, res) {
        res.status(200).json({ message: "User signed out" });
    }

}

export default new authController();
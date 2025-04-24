import UserModel from "../models/user.js";
import Logger from "../utils/logger.js";

class userController {

    constructor() {

    }

    async createUser(req,res){
        try{
            const data = await UserModel.createUser(req.body);
            
            Logger.info(`User created with ID: ${data.id}`);
            res.status(201).json({message: "User created successfully" , data: data});
        }catch{
            res.status(500).json({message: "Internal server error"});
        }
    }

    async updateUser(req,res){
        try{
            const data = await UserModel.updateUser(req.params.id, req.body);

            Logger.info(`User updated with ID: ${req.params.id}`);
            res.status(200).json({message: "User updated successfully", data: data});
        }catch{

            res.status(500).json({message: "Internal server error"});
        }
    }

    async deleteUser(req,res){

        try{
            const data = await UserModel.deleteUser(req.params.id);
            res.status(200).json({message: "User deleted successfully", data: data});
        }catch{
            res.status(500).json({message: "Internal server error"});
        }
    }

    async getAllUsers(req,res){
        try{
            const data = await UserModel.getAllUsers();
            res.status(200).json({message: "All users retrieved successfully", data: data});
        }catch{
            res.status(500).json({message: "Internal server error"});
        }
    }

    async getUserById(req,res){
        try{
            const data = await UserModel.getUserById(req.params.id);
            res.status(200).json({message: "User retrieved successfully", data: data});
        }catch{
            res.status(500).json({message: "Internal server error"});
        }
    }
    
}

export default new userController();
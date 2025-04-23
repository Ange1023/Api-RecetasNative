import moongose from "mongoose";
import 'dotenv/config';

class database {
    constructor() {
        this.connect();
    }
    
    async connect() {
        try {
            await moongose.connect(process.env.MONGODB_URI);
        } catch (error) {
            console.error("Error connecting to database:", error);
        }
    }
    
    async disconnect() {
        try {
            await moongose.disconnect();
        }catch (error) {
            console.error("Error disconnecting from database:", error);
        }
    }
}

export default new database();
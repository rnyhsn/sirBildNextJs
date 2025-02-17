import mongoose from "mongoose";

const connection: {isConnected: number} = {
    isConnected: 0 
}

export const connecToDB = async () => {

    try {
        if(connection.isConnected) {
            console.log("Database already connected");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URI as string);

        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");

    } catch (error) {
        console.log(error);
    }
}
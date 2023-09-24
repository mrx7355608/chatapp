import mongoose from "mongoose";

export const connectDatabase = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log("DATABASE CONNECTED!");
};

export const disconnectDatabase = async () => {
    await mongoose.disconnect();
    console.log("DATABASE DISCONNECTED!");
};

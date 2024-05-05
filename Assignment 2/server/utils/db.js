const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/Assignment3bAPI";

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("connection is successfully")
    } catch (error) {
        console.error("connection is failed")
        process.exit(0);
    }
}

module.exports = connectDB;
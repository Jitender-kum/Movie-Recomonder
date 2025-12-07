const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB URL hum .env file se uthayenge (Security ke liye)
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Agar fail hua to process band kar do
    }
};

module.exports = connectDB;
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Config load karo
dotenv.config();

// Database connect karo
connectDB();

const app = express();

// Middleware (Zaruri settings)
app.use(cors()); // React ko allow karega
app.use(express.json()); // JSON data samajhne ke liye

// Test Route (Sirf check karne ke liye ki server chal raha hai)
app.get('/', (req, res) => {
    res.send('MoodFlix API is Running...');
});

app.use('/api/users', userRoutes);
// Port setting
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
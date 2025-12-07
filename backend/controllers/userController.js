const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 1. Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        if (user) {
            res.status(201).json({ _id: user._id, name: user.name, email: user.email, favorites: [], message: "Registered!" });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Login User
const authUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                favorites: user.favorites || [], // Agar favorites nahi hai to empty array bhejo
                message: "Login Successful!"
            });
        } else {
            res.status(401).json({ message: 'Invalid Email or Password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Toggle Favorite (With Debugging Logs)
const toggleFavorite = async (req, res) => {
    const { email, movie } = req.body;

    console.log("👉 Request aayi:", email); // Terminal mein check karna ye print hoga
    console.log("🎬 Movie ID:", movie?.id);

    try {
        const user = await User.findOne({ email });

        if (user) {
            // Check agar favorites array exist karta hai, nahi to banao
            if (!user.favorites) user.favorites = [];

            const isFavorite = user.favorites.find(fav => fav.movieId === movie.id.toString());

            if (isFavorite) {
                user.favorites = user.favorites.filter(fav => fav.movieId !== movie.id.toString());
                await user.save();
                console.log("❌ Movie Removed");
                res.json({ message: "Removed", favorites: user.favorites });
            } else {
                const newMovie = {
                    movieId: movie.id.toString(),
                    title: movie.title,
                    posterPath: movie.poster_path
                };
                user.favorites.push(newMovie);
                await user.save();
                console.log("✅ Movie Added");
                res.json({ message: "Added", favorites: user.favorites });
            }
        } else {
            console.log("User nahi mila!");
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log("Server Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, authUser, toggleFavorite };
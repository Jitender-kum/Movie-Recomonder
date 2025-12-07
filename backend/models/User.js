const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [
        {
            movieId: String,
            title: String,
            posterPath: String
        }
    ]
}, {
    timestamps: true,
});

// --- FIX IS HERE ---
// Humne 'async function(next)' se 'next' hata diya hai
userSchema.pre('save', async function () { 
    // Agar password change nahi hua, to bas return kar jao (next() ki zarurat nahi)
    if (!this.isModified('password')) {
        return; 
    }
    
    // Agar password naya hai to encrypt karo
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
const express = require('express');
const { registerUser, authUser, toggleFavorite } = require('../controllers/userController'); // <-- Import update kiya

const router = express.Router();

router.post('/', registerUser);     // Register ke liye
router.post('/login', authUser);    // Login ke liye
router.put('/favorite', toggleFavorite);
module.exports = router;
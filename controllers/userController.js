const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const env = require("../env")

exports.registerUser = async (req, res) => {
    try {
        const { username, phoneNumber, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User email already exists' });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({ username, phoneNumber, email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid user email or password' });
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            const token = jwt.sign({ userId: user._id }, env.TOKEN_KEY, { expiresIn: '5h' });

            res.json({ token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.protectedRoute = (req, res) => {
    res.json({ message: 'This is a protected route' });
}
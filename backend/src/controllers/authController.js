import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (userId) => jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
);

const publicUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email
});

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) return res.status(409).json({ message: 'Email is already registered' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        res.status(201).json({ user: publicUser(user), token: createToken(user._id.toString()) });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Error creating account' });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email?.trim() || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
        const passwordMatches = user && await bcrypt.compare(password, user.password);
        if (!passwordMatches) return res.status(401).json({ message: 'Invalid email or password' });

        res.status(200).json({ user: publicUser(user), token: createToken(user._id.toString()) });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
}

export async function getCurrentUser(req, res) {
    res.status(200).json({ user: publicUser(req.user) });
}

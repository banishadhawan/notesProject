import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const getTokenFromRequest = (req) => {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) return null;
    return authorization.split(' ')[1];
};

const protect = async (req, res, next) => {
    try {
        const token = getTokenFromRequest(req);
        if (!token) return res.status(401).json({ message: 'Authentication required' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) return res.status(401).json({ message: 'User no longer exists' });

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default protect;

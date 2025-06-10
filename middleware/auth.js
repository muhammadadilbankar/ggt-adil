import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'nexus-club-jwt-secret-key-2024-secure-random-string';

export const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required: Invalid token format' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token: ' + error.message });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    }
    console.error('Auth error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required: Invalid token format' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid admin token: ' + error.message });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Admin token expired' });
    }
    console.error('Admin auth error:', error);
    res.status(500).json({ message: 'Server error during admin authentication' });
  }
}; 
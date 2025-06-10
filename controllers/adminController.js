import jwt from 'jsonwebtoken';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'nexus-club-jwt-secret-key-2024-secure-random-string';

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password match admin credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create JWT token
      const token = jwt.sign(
        { 
          id: 'admin',
          username: ADMIN_USERNAME,
          isAdmin: true 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Send response
      res.json({
        token,
        message: 'Admin logged in successfully'
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 
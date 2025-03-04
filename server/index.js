
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simple in-memory data store for development
const users = [];
let nextId = 1;

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }
};

// User registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }
    
    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        error: 'User with this email already exists' 
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = {
      id: String(nextId++),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    users.push(user);
    
    return res.status(201).json({ 
      success: true 
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error during registration' 
    });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required' 
      });
    }
    
    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'default-secret-key', 
      { expiresIn: '24h' }
    );
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(200).json({ 
      success: true, 
      data: {
        token,
        user: userWithoutPassword
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error during login' 
    });
  }
});

// Get current user
router.get('/users/me', authenticateToken, (req, res) => {
  try {
    const user = users.find(user => user.id === req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    // Return user data without password
    const { password, ...userWithoutPassword } = user;
    
    return res.status(200).json({ 
      success: true, 
      data: userWithoutPassword
    });
    
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error retrieving user data' 
    });
  }
});

// Debug endpoint to list all users (development only)
if (process.env.NODE_ENV !== 'production') {
  router.get('/users', (req, res) => {
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.json({ 
      success: true, 
      data: usersWithoutPasswords 
    });
  });
}

module.exports = router;

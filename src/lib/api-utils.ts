
import { toast } from '@/components/ui/use-toast';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Type definitions
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Initialize local storage if it doesn't exist
const initializeStorage = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
};

// Get all users from local storage
const getUsers = (): User[] => {
  initializeStorage();
  return JSON.parse(localStorage.getItem('users') || '[]');
};

// Save users to local storage
const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Find user by email
const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

// Hash password
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// Compare password
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
};

// Parse JWT (without verification, just for demo)
export const parseToken = (token: string): { userId: string } => {
  try {
    return jwt.verify(token, 'your-secret-key') as { userId: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Register API
export const register = async (data: RegisterData): Promise<ApiResponse<{ user: Omit<User, 'password'> }>> => {
  try {
    // Check if user already exists
    if (findUserByEmail(data.email)) {
      return { 
        success: false, 
        error: 'User already exists with this email' 
      };
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      password: hashedPassword,
      createdAt: new Date()
    };

    // Get existing users and add new user
    const users = getUsers();
    users.push(newUser);
    saveUsers(users);

    // Return success without password
    const { password, ...userWithoutPassword } = newUser;
    return { 
      success: true, 
      data: { user: userWithoutPassword },
      message: 'User registered successfully' 
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: 'Failed to register user' 
    };
  }
};

// Login API
export const login = async (credentials: LoginCredentials): Promise<ApiResponse<{ token: string, user: Omit<User, 'password'> }>> => {
  try {
    // Find user
    const user = findUserByEmail(credentials.email);
    if (!user) {
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    }

    // Compare password
    const isPasswordValid = await comparePassword(credentials.password, user.password);
    if (!isPasswordValid) {
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    }

    // Generate token
    const token = generateToken(user.id);

    // Return success with token
    const { password, ...userWithoutPassword } = user;
    return { 
      success: true, 
      data: { token, user: userWithoutPassword },
      message: 'Login successful' 
    };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: 'Failed to login' 
    };
  }
};

// Get current user
export const getCurrentUser = (): ApiResponse<Omit<User, 'password'>> => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      return { 
        success: false, 
        error: 'Not authenticated' 
      };
    }

    // Parse token
    const { userId } = parseToken(token);

    // Find user
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
      return { 
        success: false, 
        error: 'User not found' 
      };
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return { 
      success: true, 
      data: userWithoutPassword 
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return { 
      success: false, 
      error: 'Failed to get current user' 
    };
  }
};

// Logout
export const logout = (): ApiResponse<null> => {
  localStorage.removeItem('token');
  return { 
    success: true, 
    message: 'Logged out successfully' 
  };
};


import bcrypt from 'bcryptjs';

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

// Mock users database (in-memory storage)
let users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$D4R5Fz/Mjt.2S6GG1hgQ6Ow88aoT6N35QC7FfADVNEyHSYX2qOPFO', // hashed "password123"
    createdAt: new Date().toISOString(),
  },
];

// Simple implementation of token generation (browser-compatible)
const generateToken = (userId: string): string => {
  // In a real app, this would be a proper JWT
  // For this demo, we'll use a simple encoded string
  const payload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
  };
  return btoa(JSON.stringify(payload));
};

// Simple token verification (browser-compatible)
const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = JSON.parse(atob(token));
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return null; // Token expired
    }
    return { userId: decoded.userId };
  } catch (err) {
    return null;
  }
};

// API response type
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Register a new user
export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<null>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Check if email already exists
  if (users.some((user) => user.email === email)) {
    return {
      success: false,
      error: 'Email already in use',
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser: User = {
    id: (users.length + 1).toString(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  // Add user to mock database
  users.push(newUser);

  return {
    success: true,
  };
};

// Login user
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ApiResponse<{ token: string; user: Omit<User, 'password'> }>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Find user by email
  const user = users.find((u) => u.email === email);

  // If user not found or password doesn't match
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      success: false,
      error: 'Invalid email or password',
    };
  }

  // Generate token
  const token = generateToken(user.id);

  // Return user data (without password) and token
  const { password: _, ...userWithoutPassword } = user;
  return {
    success: true,
    data: {
      token,
      user: userWithoutPassword,
    },
  };
};

// Get current user
export const getCurrentUser = (): ApiResponse<Omit<User, 'password'>> => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      success: false,
      error: 'Invalid or expired token',
    };
  }

  const user = users.find((u) => u.id === decoded.userId);

  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  const { password: _, ...userWithoutPassword } = user;
  return {
    success: true,
    data: userWithoutPassword,
  };
};

// Logout user (client-side only)
export const logout = (): void => {
  localStorage.removeItem('token');
};

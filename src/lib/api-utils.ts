
// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

// API base URL - will use environment variable in production or localhost in development
// For production deployed to Render, we can use relative path
const API_URL = '/api';

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
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
};

// Login user
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ApiResponse<{ token: string; user: Omit<User, 'password'> }>> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    // If login successful, store token
    if (data.success && data.data?.token) {
      localStorage.setItem('token', data.data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
};

// Get current user
export const getCurrentUser = async (): Promise<ApiResponse<Omit<User, 'password'>>> => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }
  
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get user error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
};

// Logout user (client-side only)
export const logout = (): void => {
  localStorage.removeItem('token');
};

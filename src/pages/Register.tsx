
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import AnimatedInput from '@/components/AnimatedInput';
import AuthButton from '@/components/AuthButton';
import { register } from '@/lib/api-utils';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { 
      name?: string; 
      email?: string; 
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const response = await register({ name, email, password });
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Your account has been created successfully",
          variant: "default",
        });
        
        // Redirect to login
        navigate('/login');
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to register",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create an account"
      subtitle="Sign up to get started"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatedInput
          id="name"
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />
        
        <AnimatedInput
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        
        <AnimatedInput
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />
        
        <AnimatedInput
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          required
        />
        
        <AuthButton 
          type="submit" 
          className="w-full"
          isLoading={isLoading}
        >
          Create Account
        </AuthButton>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;

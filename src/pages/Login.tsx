
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import AnimatedInput from '@/components/AnimatedInput';
import AuthButton from '@/components/AuthButton';
import { login } from '@/lib/api-utils';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const response = await login({ email, password });
      
      if (response.success && response.data) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        
        toast({
          title: "Success",
          description: "You have successfully logged in",
          variant: "default",
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to login. Please check if your server is running.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please check if your server is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-end"
        >
          <Link 
            to="#" 
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </motion.div>
        
        <AuthButton 
          type="submit" 
          className="w-full"
          isLoading={isLoading}
        >
          Sign in
        </AuthButton>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;

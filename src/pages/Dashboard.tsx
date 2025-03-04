
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser, User } from '@/lib/api-utils';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();
        if (!response.success) {
          toast({
            title: "Authentication Error",
            description: "Please log in to access the dashboard",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }

        setUser(response.data as Omit<User, 'password'>);
      } catch (error) {
        console.error('Authentication error:', error);
        toast({
          title: "Error",
          description: "Failed to authenticate user",
          variant: "destructive",
        });
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden hover-lift">
            <CardHeader className="bg-primary/5 pb-2">
              <CardTitle className="text-xl font-medium text-primary">Profile</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {user && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Member since: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden hover-lift">
            <CardHeader className="bg-green-500/5 pb-2">
              <CardTitle className="text-xl font-medium text-green-600">Authentication</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-4 h-4"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="text-sm">Authenticated successfully</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-4 h-4"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <span className="text-sm">Session active</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-4 h-4"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span className="text-sm">JWT token secured</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden hover-lift">
            <CardHeader className="bg-blue-500/5 pb-2">
              <CardTitle className="text-xl font-medium text-blue-600">API Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs font-mono mb-1 text-slate-500">POST</p>
                  <p className="text-sm font-mono">/register</p>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs font-mono mb-1 text-slate-500">POST</p>
                  <p className="text-sm font-mono">/login</p>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs font-mono mb-1 text-slate-500">GET</p>
                  <p className="text-sm font-mono">/users/me</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-8"
      >
        <Card className="overflow-hidden hover-lift">
          <CardHeader className="bg-primary/5 pb-2">
            <CardTitle className="text-xl font-medium text-primary">API Usage Documentation</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Authentication Flow</h3>
                <p className="text-sm text-muted-foreground">
                  This application demonstrates a complete authentication flow with client-side API simulation:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>User registration with data validation</li>
                  <li>Secure password hashing with bcrypt</li>
                  <li>JWT token generation and verification</li>
                  <li>Protected routes and authentication state management</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">API Endpoints</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-md font-medium">POST /register</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Registers a new user with name, email, and password. Passwords are securely hashed before storage.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium">POST /login</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Authenticates a user and returns a JWT token for subsequent API calls.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium">GET /users/me</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Returns the authenticated user's information (requires authentication token).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;

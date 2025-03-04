
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 text-white"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h1 className="text-xl font-medium">Secure Auth</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-x-4"
          >
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-primary hover:bg-blue-50">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-10 h-10 text-primary"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6"
        >
          Secure Authentication
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Experience a beautiful, minimal authentication system with secure JWT tokens, 
          password hashing, and a sleek, intuitive user interface.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link to="/register">
            <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-xl">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-2 border-gray-200 hover:border-primary bg-transparent text-gray-700 hover:text-primary h-12 px-8 rounded-xl">
              Sign in
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-light text-center mb-16"
        >
          Essential Authentication Features
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover-lift"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Secure Authentication</h3>
            <p className="text-muted-foreground">
              Robust user authentication with secure password hashing and validation.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover-lift"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">User Management</h3>
            <p className="text-muted-foreground">
              Complete user registration, login, and account management functionality.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover-lift"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">JWT Tokens</h3>
            <p className="text-muted-foreground">
              Stateless authentication using secure JWT tokens for API requests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-light mb-6"
          >
            Ready to get started?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Create an account now and experience our beautiful authentication system.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/register">
              <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-10 rounded-xl">
                Create Your Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4 text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Secure Auth</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              A beautiful, minimal authentication system
            </p>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Secure Auth. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;


import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
  children, 
  isLoading = false, 
  variant = 'default',
  className,
  ...props 
}) => {
  return (
    <Button
      {...props}
      className={cn(
        "relative h-12 rounded-xl font-medium transition-all",
        variant === 'default' && "bg-primary hover:bg-primary/90 text-white",
        variant === 'outline' && "border-2 border-gray-200 hover:border-primary bg-transparent text-gray-700 hover:text-primary",
        variant === 'ghost' && "bg-transparent hover:bg-gray-100 text-gray-700",
        className
      )}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
        />
      ) : (
        <motion.div
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
          className="w-full h-full flex items-center justify-center"
        >
          {children}
        </motion.div>
      )}
    </Button>
  );
};

export default AuthButton;

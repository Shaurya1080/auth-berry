
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface AnimatedInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative">
        <Label
          htmlFor={id}
          className={cn(
            "absolute transition-all duration-200 pointer-events-none",
            (isFocused || value) 
              ? "-top-6 left-0 text-xs text-primary" 
              : "top-2 left-3 text-muted-foreground"
          )}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        
        <Input
          id={id}
          type={type}
          placeholder={isFocused ? placeholder : ""}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "h-10 px-3 py-2 transition-all duration-200 border-b focus:border-primary bg-transparent focus:outline-none focus:ring-0 focus:border-b-2",
            error ? "border-red-500" : "border-gray-200",
            isFocused ? "border-primary" : ""
          )}
        />
        
        <motion.div
          initial={false}
          animate={{ 
            scaleX: isFocused ? 1 : 0,
            opacity: isFocused ? 1 : 0
          }}
          className="h-0.5 bg-primary absolute bottom-0 left-0 right-0 origin-left"
          transition={{ duration: 0.2 }}
        />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedInput;

import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = "", type = "button", disabled = false }) => {
  const baseStyle = "w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-green-900/20",
    secondary: "bg-secondary text-white shadow-lg shadow-orange-900/20",
    outline: "border-2 border-gray-200 text-gray-600 bg-transparent hover:bg-gray-50",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      style={{
          backgroundColor: variant === 'primary' ? 'hsl(var(--color-primary))' : 
                          variant === 'secondary' ? 'hsl(var(--color-secondary))' : 'transparent',
          color: variant === 'outline' ? 'hsl(var(--color-text))' : 'white'
      }}
    >
      {children}
    </motion.button>
  );
};

export default Button;

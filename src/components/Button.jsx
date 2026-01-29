import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = "", type = "button", disabled = false }) => {
  const variants = {
    primary: "button--primary",
    secondary: "button--secondary",
    outline: "button--outline",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${variants[variant]} ${className}`}
      data-variant={variant}
    >
      {children}
    </motion.button>
  );
};

export default Button;

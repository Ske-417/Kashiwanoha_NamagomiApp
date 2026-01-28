import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className={`bg-white rounded-2xl shadow-sm p-4 ${className}`}
      style={{
          boxShadow: 'var(--shadow)'
      }}
    >
      {children}
    </motion.div>
  );
};

export default Card;

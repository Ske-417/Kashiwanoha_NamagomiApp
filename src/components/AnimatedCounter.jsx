import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, label, unit, color = "text-primary" }) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline gap-1">
        <motion.span className={`text-3xl font-bold ${color}`} style={{ color: `hsl(var(--color-${color.replace('text-', '')}))` }}>
            {display}
        </motion.span>
        <span className="text-sm font-medium text-gray-500">{unit}</span>
      </div>
      <span className="text-xs text-gray-400 mt-1">{label}</span>
    </div>
  );
};

export default AnimatedCounter;

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, label, unit, color = "primary" }) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <div className="counter">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <motion.span className={`counter-value counter-value--${color}`}>
          {display}
        </motion.span>
        <span style={{ fontSize: '12px', color: 'hsl(var(--text-500))' }}>{unit}</span>
      </div>
      <span className="counter-label">{label}</span>
    </div>
  );
};

export default AnimatedCounter;

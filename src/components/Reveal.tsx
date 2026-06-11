import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function Reveal({ children, delay = 0, direction = 'up', className }: RevealProps) {
  const directions = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: 40, opacity: 0 },
    right: { x: -40, opacity: 0 },
    none: { opacity: 0, scale: 0.95 },
  };

  const hiddenState = directions[direction];

  return (
    <motion.div
      initial={hiddenState}
      whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // cinematic cubic-bezier
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

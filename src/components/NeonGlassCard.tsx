import { ReactNode } from 'react';
import { cn } from '../utils';

interface NeonGlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}

export function NeonGlassCard({ children, className, strong = false }: NeonGlassCardProps) {
  return (
    <div
      className={cn(
        strong ? 'glass-neon-strong' : 'glass-neon',
        'p-6 sm:p-8 transition-all duration-500 hover:border-white/20',
        className
      )}
    >
      {children}
    </div>
  );
}

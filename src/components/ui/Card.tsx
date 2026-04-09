import { cn } from '@/lib/utils';
import type { CardProps } from '@/types';

export function Card({ children, className, variant = 'default', onClick }: CardProps) {
  const variants = {
    default: 'bg-surface border border-border/50',
    elevated: 'bg-surface-elevated shadow-card border border-border/50',
    glass: 'glass border border-white/10',
    outlined: 'bg-transparent border border-border',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl p-5 transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-elevated hover:scale-[1.01] active:scale-[0.99]',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
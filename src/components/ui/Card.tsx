import { cn } from '@/lib/utils';
import type { CardProps } from '@/types';

export function Card({ children, className, variant = 'default', onClick }: CardProps) {
  const variants = {
    default: 'bg-surface border border-border',
    elevated: 'bg-surface-elevated shadow-card border border-border',
    outlined: 'bg-transparent border border-border',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl p-5 transition-all duration-200',
        'hover:shadow-card hover:scale-[1.01]',
        onClick && 'cursor-pointer',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

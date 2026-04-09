import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-background hover:bg-primary/90 active:scale-[0.98] shadow-glow',
    secondary: 'bg-surface-elevated text-text-primary hover:bg-surface-glass active:scale-[0.98] border border-border',
    success: 'bg-success text-background hover:bg-success/90 active:scale-[0.98] shadow-glow-success',
    ghost: 'bg-transparent text-text-muted hover:text-text-primary hover:bg-surface-elevated/50',
    danger: 'bg-danger/20 text-danger hover:bg-danger/30 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2.5 text-sm min-h-[40px]',
    md: 'px-5 py-3 text-sm min-h-[48px]',
    lg: 'px-6 py-4 text-base min-h-[56px]',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-xl font-semibold transition-all duration-200',
        'flex items-center justify-center gap-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}

export function LoadingButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
}: ButtonProps & { loading?: boolean }) {
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </Button>
  );
}
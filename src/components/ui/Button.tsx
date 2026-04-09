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
    primary: 'bg-primary text-white hover:bg-primary-muted active:scale-[0.98]',
    secondary: 'bg-surface-elevated text-text-primary hover:bg-border active:scale-[0.98]',
    ghost: 'bg-transparent text-text-muted hover:bg-surface-elevated hover:text-text-primary',
    danger: 'bg-danger text-white hover:bg-red-600 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-lg font-medium transition-all duration-150',
        'flex items-center justify-center gap-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
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

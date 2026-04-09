import { formatTime, cn } from '@/lib/utils';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface TimerDisplayProps {
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function TimerDisplay({
  totalSeconds,
  remainingSeconds,
  isRunning,
  onPlay,
  onPause,
  onReset,
  size = 'md',
  label,
}: TimerDisplayProps) {
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const sizes = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg className={cn('transform -rotate-90', sizes[size])}>
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-surface-elevated"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-primary transition-all duration-300"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-semibold text-text-primary', textSizes[size])}>
            {formatTime(remainingSeconds)}
          </span>
          {label && (
            <span className="text-xs text-text-muted mt-1">{label}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button variant="primary" size="md" onClick={isRunning ? onPause : onPlay}>
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              Pausar
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {remainingSeconds === totalSeconds ? 'Iniciar' : 'Continuar'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

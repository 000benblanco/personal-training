import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BreathingCircleProps {
  pattern: {
    inhale: number;
    holdIn?: number;
    exhale: number;
    holdOut?: number;
  };
  isActive: boolean;
  onPhaseChange?: (phase: string) => void;
  onComplete?: () => void;
  className?: string;
}

type Phase = 'inhale' | 'hold' | 'exhale' | 'holdEmpty';

const phaseLabels: Record<Phase, string> = {
  inhale: 'Inhala',
  hold: 'Mantén',
  exhale: 'Exhala',
  holdEmpty: 'Pausa',
};

export function BreathingCircle({
  pattern,
  isActive,
  onPhaseChange,
  onComplete,
  className,
}: BreathingCircleProps) {
  const [phase, setPhase] = useState<Phase>('inhale');
  const [timeLeft, setTimeLeft] = useState(pattern.inhale);
  const [cycleCount, setCycleCount] = useState(0);

  const runPhase = useCallback(() => {
    const phases: Phase[] = ['inhale', 'hold', 'exhale', 'holdEmpty'];
    const durations = [
      pattern.inhale,
      pattern.holdIn || 0,
      pattern.exhale,
      pattern.holdOut || 0,
    ].filter((d) => d > 0);

    if (durations.length === 2) {
      setPhase('inhale');
      setTimeLeft(pattern.inhale);
      onPhaseChange?.('inhale');
      return;
    }

    const fullPhases = phases.filter((_, i) => durations[i] > 0);
    let currentPhaseIndex = 0;

    const runNextPhase = () => {
      if (!isActive) return;

      const currentPhase = fullPhases[currentPhaseIndex];
      const duration = durations[currentPhaseIndex];

      setPhase(currentPhase);
      setTimeLeft(duration);
      onPhaseChange?.(currentPhase);

      let remaining = duration;
      const countdown = setInterval(() => {
        remaining -= 1;
        setTimeLeft(remaining);
        if (remaining <= 0) clearInterval(countdown);
      }, 1000);

      setTimeout(
        () => {
          currentPhaseIndex = (currentPhaseIndex + 1) % fullPhases.length;
          if (currentPhaseIndex === 0) {
            setCycleCount((c) => c + 1);
            onComplete?.();
          }
          runNextPhase();
        },
        duration * 1000
      );
    };

    runNextPhase();
  }, [pattern, isActive, onPhaseChange, onComplete]);

  useEffect(() => {
    if (isActive) {
      setTimeLeft(pattern.inhale);
      setPhase('inhale');
      runPhase();
    } else {
      setPhase('inhale');
      setTimeLeft(pattern.inhale);
    }

    return () => {};
  }, [isActive, pattern.inhale, runPhase]);

  const variants = {
    inhale: {
      scale: 1.5,
      opacity: 1,
    },
    hold: {
      scale: 1.5,
      opacity: 1,
    },
    exhale: {
      scale: 1,
      opacity: 0.6,
    },
    holdEmpty: {
      scale: 1,
      opacity: 0.6,
    },
  };

  return (
    <div className={cn('flex flex-col items-center justify-center py-8', className)}>
      <div className="relative w-48 h-48 flex items-center justify-center">
        <motion.div
          animate={phase}
          variants={variants}
          transition={{
            duration: phase === 'inhale' ? pattern.inhale : 
                       phase === 'exhale' ? pattern.exhale : 
                       (pattern.holdIn || pattern.holdOut || 2),
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
        />

        <motion.div
          animate={phase}
          variants={variants}
          transition={{
            duration: phase === 'inhale' ? pattern.inhale : 
                       phase === 'exhale' ? pattern.exhale : 
                       (pattern.holdIn || pattern.holdOut || 2),
            ease: 'easeInOut',
          }}
          className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-primary-muted flex items-center justify-center shadow-glow"
        >
          <div className="text-center">
            <p className="text-3xl font-semibold text-white">{timeLeft}</p>
            <p className="text-xs text-white/70 uppercase tracking-wider mt-1">
              {phaseLabels[phase]}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-text-muted text-sm">{cycleCount} ciclos completados</p>
        <p className="text-text-subtle text-xs mt-1">Sigue el ritmo del círculo con tu respiración</p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { SafetyLevel } from '@/types';

interface ExerciseCardProps {
  name: string;
  description: string;
  duration?: number;
  sets?: number;
  reps?: string;
  adaptations: string[];
  safetyLevel: SafetyLevel;
  howToSteps?: string[];
  tips?: string[];
  isCompleted?: boolean;
  onComplete: () => void;
}

const safetyConfig: Record<SafetyLevel, { color: string; bg: string; label: string }> = {
  safe: { color: 'text-success', bg: 'bg-success/10', label: 'Seguro' },
  caution: { color: 'text-warning', bg: 'bg-warning/10', label: 'Precaución' },
  avoid: { color: 'text-danger', bg: 'bg-danger/10', label: 'Evitar' },
};

export function ExerciseCard({
  name,
  description,
  duration,
  sets,
  reps,
  adaptations,
  safetyLevel,
  howToSteps = [],
  tips = [],
  isCompleted,
  onComplete,
}: ExerciseCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const safety = safetyConfig[safetyLevel];

  return (
    <Card className={cn('relative', isCompleted && 'opacity-60')}>
      {/* Safety badge */}
      <div className={cn('absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-medium', safety.bg, safety.color)}>
        {safety.label}
      </div>

      <div className="flex items-start gap-4">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            isCompleted ? 'bg-success/20' : 'bg-surface-elevated'
          )}
        >
          <Icon
            name={isCompleted ? 'Check' : 'Activity'}
            className={cn('w-5 h-5', isCompleted ? 'text-success' : 'text-text-muted')}
          />
        </div>

        <div className="flex-1 pr-20">
          <h4 className="font-semibold text-text-primary">{name}</h4>
          <p className="text-sm text-text-muted mt-1">{description}</p>

          {(duration || sets) && (
            <div className="flex items-center gap-3 mt-2 text-xs text-text-subtle">
              {duration && (
                <span className="flex items-center gap-1">
                  <Icon name="Clock" className="w-3.5 h-3.5" />
                  {duration} min
                </span>
              )}
              {sets && (
                <span className="flex items-center gap-1">
                  <Icon name="Repeat" className="w-3.5 h-3.5" />
                  {sets} × {reps}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Adaptations section */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Shield" className="w-4 h-4 text-warning" />
          <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
            Adaptaciones para tu férula
          </span>
        </div>
        <ul className="space-y-1">
          {adaptations.map((adaptation, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-text-muted">
              <span className="text-primary mt-0.5">•</span>
              {adaptation}
            </li>
          ))}
        </ul>
      </div>

      {/* How to do it section */}
      {howToSteps.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary-muted transition-colors"
          >
            <Icon name="BookOpen" className="w-4 h-4" />
            {showDetails ? 'Ocultar instrucciones' : 'Cómo hacerlo paso a paso'}
            <Icon name={showDetails ? 'ChevronUp' : 'ChevronDown'} className="w-4 h-4 ml-auto" />
          </button>

          {showDetails && (
            <div className="mt-3 space-y-4 animate-fade-in">
              {/* Step by step */}
              <div>
                <h5 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">
                  Paso a paso
                </h5>
                <ol className="space-y-2">
                  {howToSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step.replace(/^\d+\.\s*/, '')}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              {tips.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">
                    Consejos
                  </h5>
                  <ul className="space-y-1">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-text-muted">
                        <Icon name="Lightbulb" className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={onComplete}
          disabled={isCompleted}
          className={cn(
            'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
            isCompleted
              ? 'bg-success/20 text-success cursor-default'
              : 'bg-primary text-white hover:bg-primary-muted'
          )}
        >
          {isCompleted ? 'Completado' : 'Marcar hecho'}
        </button>
      </div>
    </Card>
  );
}

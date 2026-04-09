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
    <Card className={cn('relative p-5', isCompleted && 'opacity-70')}>
      {/* Safety badge */}
      <div className={cn('absolute top-5 right-5 px-3 py-1.5 rounded-lg text-sm font-semibold', safety.bg, safety.color)}>
        {safety.label}
      </div>

      <div className="flex items-start gap-4">
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
            isCompleted ? 'bg-success/20' : 'bg-surface-elevated'
          )}
        >
          <Icon
            name={isCompleted ? 'Check' : 'Activity'}
            className={cn('w-6 h-6', isCompleted ? 'text-success' : 'text-text-muted')}
          />
        </div>

        <div className="flex-1 pr-24 min-w-0">
          <h4 className="text-lg font-bold text-text-primary">{name}</h4>
          <p className="text-sm text-text-muted mt-1 leading-relaxed">{description}</p>

          {(duration || sets) && (
            <div className="flex items-center gap-4 mt-3 text-sm text-text-subtle">
              {duration && (
                <span className="flex items-center gap-1.5">
                  <Icon name="Clock" className="w-4 h-4" />
                  {duration} min
                </span>
              )}
              {sets && (
                <span className="flex items-center gap-1.5">
                  <Icon name="Repeat" className="w-4 h-4" />
                  {sets} × {reps}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Adaptations section */}
      <div className="mt-5 pt-5 border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Shield" className="w-5 h-5 text-warning" />
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
            Adaptaciones para tu férula
          </span>
        </div>
        <ul className="space-y-2">
          {adaptations.map((adaptation, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-text-muted">
              <span className="text-primary mt-0.5">•</span>
              <span className="leading-relaxed">{adaptation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* How to do it section */}
      {howToSteps.length > 0 && (
        <div className="mt-5">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-muted transition-colors min-h-[44px]"
          >
            <Icon name="BookOpen" className="w-5 h-5" />
            {showDetails ? 'Ocultar instrucciones' : 'Cómo hacerlo paso a paso'}
            <Icon name={showDetails ? 'ChevronUp' : 'ChevronDown'} className="w-5 h-5 ml-auto" />
          </button>

          {showDetails && (
            <div className="mt-4 space-y-5 animate-fade-in">
              {/* Step by step */}
              <div>
                <h5 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                  Paso a paso
                </h5>
                <ol className="space-y-3">
                  {howToSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-text-muted">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step.replace(/^\d+\.\s*/, '')}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              {tips.length > 0 && (
                <div>
                  <h5 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                    Consejos
                  </h5>
                  <ul className="space-y-2">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-text-muted">
                        <Icon name="Lightbulb" className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3 mt-5">
        <Button
          onClick={onComplete}
          disabled={isCompleted}
          variant={isCompleted ? "secondary" : "primary"}
          className="flex-1"
        >
          <Icon name={isCompleted ? 'Check' : 'Circle'} className="w-5 h-5 mr-2" />
          {isCompleted ? 'Completado' : 'Marcar hecho'}
        </Button>
      </div>
    </Card>
  );
}

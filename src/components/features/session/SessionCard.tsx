import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { SessionType, Difficulty } from '@/types';

type SessionTypeConfig = {
  icon: string;
  color: string;
  label: string;
  bgColor: string;
};

const typeConfig: Record<SessionType, SessionTypeConfig> = {
  boxing: { icon: 'Dumbbell', color: 'text-primary', label: 'Boxeo', bgColor: 'bg-primary/10' },
  strength: { icon: 'Armchair', color: 'text-success', label: 'Fuerza', bgColor: 'bg-success/10' },
  yoga: { icon: 'Flower2', color: 'text-warning', label: 'Yoga', bgColor: 'bg-warning/10' },
  breathing: { icon: 'Wind', color: 'text-primary', label: 'Respiración', bgColor: 'bg-primary/10' },
  wellness: { icon: 'Heart', color: 'text-success', label: 'Bienestar', bgColor: 'bg-success/10' },
  mixto: { icon: 'Sparkles', color: 'text-purple-400', label: 'Mixto', bgColor: 'bg-purple-400/10' },
};

const difficultyLabels: Record<Difficulty, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

interface SessionCardProps {
  title: string;
  subtitle: string;
  duration: number;
  type: SessionType;
  difficulty: Difficulty;
  isRecommended?: boolean;
  onStart: () => void;
}

export function SessionCard({
  title,
  subtitle,
  duration,
  type,
  difficulty,
  isRecommended,
  onStart,
}: SessionCardProps) {
  const config = typeConfig[type];

  return (
    <Card
      variant={isRecommended ? 'elevated' : 'default'}
      className={cn(
        'relative overflow-hidden',
        isRecommended && 'ring-1 ring-primary/30'
      )}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-primary/10 px-3 py-1 rounded-bl-lg">
          <span className="text-xs font-medium text-primary">Recomendado</span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', config.bgColor)}>
          <Icon name={config.icon} className={cn('w-6 h-6', config.color)} />
        </div>

        <div className="flex-1">
          <span className="text-xs text-text-muted uppercase tracking-wide">
            {config.label}
          </span>
          <h3 className="text-lg font-semibold text-text-primary mt-1">{title}</h3>
          <p className="text-sm text-text-muted mt-1">{subtitle}</p>

          <div className="flex items-center gap-4 mt-3 text-xs text-text-subtle">
            <span className="flex items-center gap-1">
              <Icon name="Clock" className="w-3.5 h-3.5" />
              {duration} min
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Signal" className="w-3.5 h-3.5" />
              {difficultyLabels[difficulty]}
            </span>
          </div>
        </div>
      </div>

      <Button onClick={onStart} className="w-full mt-4" size="lg">
        Iniciar sesión
        <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  );
}

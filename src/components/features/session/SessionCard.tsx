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
        isRecommended && 'ring-2 ring-primary/30'
      )}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-primary/20 px-4 py-1.5 rounded-bl-xl">
          <span className="text-xs font-semibold text-primary">Recomendado hoy</span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center shrink-0', config.bgColor)}>
          <Icon name={config.icon} className={cn('w-7 h-7', config.color)} />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
            {config.label}
          </span>
          <h3 className="text-lg font-bold text-text-primary mt-1 leading-tight">{title}</h3>
          <p className="text-sm text-text-muted mt-1 leading-relaxed">{subtitle}</p>

          <div className="flex items-center gap-4 mt-4 text-sm text-text-subtle">
            <span className="flex items-center gap-1.5">
              <Icon name="Clock" className="w-4 h-4" />
              {duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="Signal" className="w-4 h-4" />
              {difficultyLabels[difficulty]}
            </span>
          </div>
        </div>
      </div>

      <Button onClick={onStart} className="w-full mt-5" size="lg">
        Iniciar sesión
        <Icon name="ArrowRight" className="w-5 h-5 ml-2" />
      </Button>
    </Card>
  );
}

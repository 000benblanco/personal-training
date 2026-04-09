import { ProgressRing } from '@/components/ui/ProgressRing';
import { cn } from '@/lib/utils';
import type { Badge } from '@/types';
import { Star, Flame, Zap, Trophy, Dumbbell, Flower2, Wind, TrendingUp, Award, Lock, HelpCircle } from 'lucide-react';

interface BadgeCardProps {
  badge: Badge;
  className?: string;
}

const rarityColors: Record<string, string> = {
  common: '#94A3B8',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Star,
  Flame,
  Zap,
  Trophy,
  Dumbbell,
  Flower2,
  Wind,
  TrendingUp,
  Award,
  Lock,
};

export function BadgeCard({ badge, className }: BadgeCardProps) {
  const isUnlocked = !!badge.unlockedAt;
  const color = rarityColors[badge.rarity] || rarityColors.common;
  const IconComponent = iconMap[badge.icon] || HelpCircle;

  return (
    <div
      className={cn(
        'relative bg-surface rounded-xl p-4 text-center transition-all duration-200',
        isUnlocked ? 'opacity-100' : 'opacity-40',
        className
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center',
          isUnlocked ? 'bg-primary/20' : 'bg-surface-elevated'
        )}
        style={{
          boxShadow: isUnlocked ? `0 0 20px ${color}40` : 'none',
        }}
      >
        <div style={{ color: isUnlocked ? color : undefined }}>
          <IconComponent className={cn('w-6 h-6', isUnlocked ? 'text-primary' : 'text-text-subtle')} />
        </div>
      </div>

      <h4 className={cn('text-sm font-medium', isUnlocked ? 'text-text-primary' : 'text-text-muted')}>
        {badge.title}
      </h4>
      <p className="text-xs text-text-subtle mt-1">{badge.description}</p>

      {isUnlocked && (
        <div
          className="absolute top-2 right-2 w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  );
}

interface LevelIndicatorProps {
  level: number;
  xp: number;
  nextLevelXP: number;
  className?: string;
}

export function LevelIndicator({ level, xp, nextLevelXP, className }: LevelIndicatorProps) {
  const progress = ((xp % 500) / 500) * 100;
  const currentLevelXP = xp % 500;

  return (
    <div className={cn('bg-surface rounded-xl p-4', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text-primary">Nivel {level}</span>
        <span className="text-xs text-text-muted">
          {currentLevelXP} / {nextLevelXP} XP
        </span>
      </div>

      <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-muted rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = 'text-primary',
  className,
}: StatCardProps) {
  const IconComponent = iconMap[icon] || HelpCircle;

  return (
    <div className={cn('bg-surface rounded-xl p-4', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
          {subtitle && <p className="text-xs text-text-subtle mt-1">{subtitle}</p>}
        </div>
        <div className={cn('w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center')}>
          {IconComponent && <IconComponent className={cn('w-5 h-5', color)} />}
        </div>
      </div>
    </div>
  );
}

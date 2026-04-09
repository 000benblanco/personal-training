import { useAppStore } from '@/lib/stores/appStore';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SessionCard } from '@/components/features/session/SessionCard';
import { StatCard, LevelIndicator } from '@/components/features/progress/ProgressCards';
import { Icon } from '@/components/ui/Icon';
import { StreakCalendar } from '@/components/ui/StreakCalendar';
import { getRecommendedRoutine } from '@/lib/data/routines';
import { formatDate } from '@/lib/utils';

export function HomePage() {
  const navigate = useNavigate();
  const { progress, userName, settings } = useAppStore();
  
  const today = new Date();
  const weekNumber = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
  const recommendedRoutine = getRecommendedRoutine(weekNumber);

  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const displayName = userName || settings.name || 'Entrenador';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-text-primary">
          {getGreeting()}, {displayName}
        </h1>
        <p className="text-text-muted">
          {today.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Recommended session */}
      <SessionCard
        title={recommendedRoutine.title}
        subtitle={recommendedRoutine.subtitle}
        duration={recommendedRoutine.duration}
        type={recommendedRoutine.type}
        difficulty={recommendedRoutine.difficulty}
        isRecommended={true}
        onStart={() => navigate(`/train/${recommendedRoutine.id}`)}
      />

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
          Rápido
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <QuickAction
            icon="Wind"
            label="Respirar"
            color="text-primary"
            onClick={() => navigate('/breathing')}
          />
          <QuickAction
            icon="Flower2"
            label="Yoga"
            color="text-warning"
            onClick={() => navigate('/yoga')}
          />
          <QuickAction
            icon="Dumbbell"
            label="Fuerza"
            color="text-success"
            onClick={() => navigate('/train?type=strength')}
          />
        </div>
      </div>

      {/* Progress summary */}
      <div>
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
          Tu progreso
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Racha actual"
            value={`${progress.currentStreak}`}
            subtitle="días consecutivos"
            icon="Flame"
            color="text-warning"
          />
          <StatCard
            title="Minutos"
            value={progress.totalMinutes}
            subtitle={`${progress.totalSessions} sesiones`}
            icon="Clock"
            color="text-primary"
          />
        </div>
      </div>

      {/* Level progress */}
      <LevelIndicator
        level={progress.level}
        xp={progress.xp}
        nextLevelXP={500}
      />

      {/* Streak calendar */}
      <StreakCalendar
        currentStreak={progress.currentStreak}
        longestStreak={progress.longestStreak}
        activeDays={progress.activeDays}
      />

      {/* Recent sessions */}
      {progress.totalSessions > 0 && (
        <div>
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
            Últimas sesiones
          </h2>
          <div className="space-y-2">
            {useAppStore.getState().sessions.slice(-3).reverse().map((session) => (
              <Card key={session.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon
                        name={session.type === 'boxing' ? 'Dumbbell' : session.type === 'yoga' ? 'Flower2' : session.type === 'breathing' ? 'Wind' : 'Heart'}
                        className="w-4 h-4 text-primary"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary capitalize">
                        {session.type === 'mixto' ? 'Sesión mixta' : session.type}
                      </p>
                      <p className="text-xs text-text-subtle">{formatDate(session.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">{session.duration} min</p>
                    <p className="text-xs text-text-muted">
                      {session.feeling === 5 ? 'Excelente' : session.feeling === 4 ? 'Bien' : 'Normal'}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface QuickActionProps {
  icon: string;
  label: string;
  color: string;
  onClick: () => void;
}

function QuickAction({ icon, label, color, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-surface rounded-xl hover:bg-surface-elevated transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center">
        <Icon name={icon} className={`w-5 h-5 ${color}`} />
      </div>
      <span className="text-xs text-text-muted">{label}</span>
    </button>
  );
}

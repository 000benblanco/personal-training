import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { StreakCalendar } from '@/components/ui/StreakCalendar';
import { StatCard, LevelIndicator, BadgeCard } from '@/components/features/progress/ProgressCards';
import { useAppStore } from '@/lib/stores/appStore';
import { cn } from '@/lib/utils';

export function ProgressPage() {
  const { progress, sessions } = useAppStore();

  // Calculate weekly stats
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const sessionsThisWeek = sessions.filter(
    (s) => new Date(s.date) >= oneWeekAgo
  );
  const sessionsLastWeek = sessions.filter(
    (s) => new Date(s.date) >= twoWeeksAgo && new Date(s.date) < oneWeekAgo
  );

  const minutesThisWeek = sessionsThisWeek.reduce((acc, s) => acc + s.duration, 0);
  const avgFeeling = sessionsThisWeek.length > 0
    ? sessionsThisWeek.reduce((acc, s) => acc + s.feeling, 0) / sessionsThisWeek.length
    : 0;

  // XP needed for next level
  const xpForCurrentLevel = progress.xp % 500;
  const xpToNextLevel = 500 - xpForCurrentLevel;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Tu Progreso</h1>

      {/* Streak and level */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-warning/20 to-warning/5 border-warning/30">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-warning/20 mx-auto flex items-center justify-center mb-2">
              <Icon name="Flame" className="w-6 h-6 text-warning" />
            </div>
            <p className="text-3xl font-bold text-text-primary">{progress.currentStreak}</p>
            <p className="text-xs text-text-muted">días de racha</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-2">
              <Icon name="Award" className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-text-primary">Nivel {progress.level}</p>
            <p className="text-xs text-text-muted">{progress.xp} XP totales</p>
          </div>
        </Card>
      </div>

      {/* Level progress */}
      <LevelIndicator
        level={progress.level}
        xp={progress.xp}
        nextLevelXP={500}
      />

      {/* Calendar */}
      <StreakCalendar
        currentStreak={progress.currentStreak}
        longestStreak={progress.longestStreak}
        activeDays={progress.activeDays}
      />

      {/* Weekly stats */}
      <div>
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
          Esta semana
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Sesiones"
            value={sessionsThisWeek.length}
            subtitle={sessionsThisWeek.length > sessionsLastWeek.length ? '+ que ayer' : ''}
            icon="Dumbbell"
            color="text-primary"
          />
          <StatCard
            title="Minutos"
            value={minutesThisWeek}
            subtitle="de actividad"
            icon="Clock"
            color="text-success"
          />
          <StatCard
            title="Sensación"
            value={avgFeeling > 0 ? avgFeeling.toFixed(1) : '-'}
            subtitle={avgFeeling > 4 ? '¡Excelente!' : avgFeeling > 3 ? 'Bien' : 'Normal'}
            icon="Smile"
            color="text-warning"
          />
          <StatCard
            title="Mejor racha"
            value={`${progress.longestStreak} días`}
            icon="Trophy"
            color="text-purple-400"
          />
        </div>
      </div>

      {/* Sessions by type */}
      <div>
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
          Distribución por tipo
        </h2>
        <Card>
          <div className="space-y-3">
            {Object.entries(progress.sessionsByType).map(([type, count]) => {
              if (count === 0) return null;
              const percentage = Math.round((count / progress.totalSessions) * 100);
              return (
                <div key={type}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted capitalize">{type}</span>
                    <span className="text-text-subtle">{count} sesiones</span>
                  </div>
                  <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        type === 'boxing' ? 'bg-primary' :
                        type === 'yoga' ? 'bg-warning' :
                        type === 'breathing' ? 'bg-primary' :
                        'bg-success'
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
          Logros ({progress.badges.length})
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {progress.badges.length > 0 ? (
            progress.badges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))
          ) : (
            <>
              <Card className="opacity-40">
                <div className="text-center">
                  <Icon name="Lock" className="w-6 h-6 text-text-subtle mx-auto mb-2" />
                  <p className="text-xs text-text-muted">Primer paso</p>
                </div>
              </Card>
              <Card className="opacity-40">
                <div className="text-center">
                  <Icon name="Lock" className="w-6 h-6 text-text-subtle mx-auto mb-2" />
                  <p className="text-xs text-text-muted">Racha 7 días</p>
                </div>
              </Card>
              <Card className="opacity-40">
                <div className="text-center">
                  <Icon name="Lock" className="w-6 h-6 text-text-subtle mx-auto mb-2" />
                  <p className="text-xs text-text-muted">Nivel 5</p>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

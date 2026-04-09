import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface StreakCalendarProps {
  currentStreak: number;
  longestStreak: number;
  activeDays: string[];
  className?: string;
}

export function StreakCalendar({ currentStreak, longestStreak, activeDays, className }: StreakCalendarProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: { date: Date | null; isActive: boolean }[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, isActive: false });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = date.toISOString().split('T')[0];
      const isActive = activeDays.includes(dateStr);
      days.push({ date, isActive });
    }

    return days;
  }, [currentMonth, currentYear, activeDays]);

  const monthName = today.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

  return (
    <div className={cn('bg-surface rounded-xl p-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
            <Icon name="Flame" className="w-4 h-4 text-warning" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{currentStreak} días</p>
            <p className="text-xs text-text-muted">Racha actual</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-text-primary">{longestStreak} días</p>
          <p className="text-xs text-text-muted">Mejor racha</p>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="mb-2">
        <p className="text-sm text-text-muted capitalize mb-2">{monthName}</p>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center text-xs text-text-subtle py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(({ date, isActive }, index) => (
            <div
              key={index}
              className={cn(
                'aspect-square rounded-md flex items-center justify-center text-xs',
                date
                  ? isActive
                    ? 'bg-primary text-white font-medium'
                    : 'bg-surface-elevated text-text-muted'
                  : 'bg-transparent'
              )}
            >
              {date && date.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

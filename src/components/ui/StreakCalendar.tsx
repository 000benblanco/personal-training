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
    <div className={cn('bg-surface rounded-2xl p-5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
            <Icon name="Flame" className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-base font-semibold text-text-primary">{currentStreak} días</p>
            <p className="text-xs text-text-muted">Racha actual</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold text-text-primary">{longestStreak} días</p>
          <p className="text-xs text-text-muted">Mejor racha</p>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="mb-2">
        <p className="text-sm font-medium text-text-primary capitalize mb-3">{monthName}</p>
        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-text-subtle py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {calendarDays.map(({ date, isActive }, index) => (
            <div
              key={index}
              className={cn(
                'aspect-square rounded-lg flex items-center justify-center text-sm font-medium min-h-[36px]',
                date
                  ? isActive
                    ? 'bg-primary text-white shadow-glow'
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

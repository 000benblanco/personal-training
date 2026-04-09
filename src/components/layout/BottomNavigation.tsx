import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

const navItems = [
  { path: '/', label: 'Hoy', icon: 'Home' },
  { path: '/train', label: 'Entreno', icon: 'Dumbbell' },
  { path: '/yoga', label: 'Yoga', icon: 'Flower2' },
  { path: '/progress', label: 'Progreso', icon: 'TrendingUp' },
  { path: '/settings', label: 'Ajustes', icon: 'Settings' },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors min-w-[64px]',
                isActive ? 'text-primary' : 'text-text-muted hover:text-text-primary'
              )}
            >
              <Icon
                name={item.icon}
                className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  isActive && 'scale-110'
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

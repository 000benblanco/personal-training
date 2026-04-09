import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

const navItems = [
  { path: '/', label: 'Hoy', icon: 'Home' },
  { path: '/train', label: 'Entreno', icon: 'Dumbbell' },
  { path: '/yoga', label: 'Yoga', icon: 'Flower2' },
  { path: '/breathing', label: 'Respiración', icon: 'Wind' },
  { path: '/wellness', label: 'Bienestar', icon: 'Heart' },
  { path: '/progress', label: 'Progreso', icon: 'TrendingUp' },
  { path: '/settings', label: 'Ajustes', icon: 'Settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-surface border-r border-border min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-lg font-semibold text-text-primary">
          Training<span className="text-primary">App</span>
        </h1>
        <p className="text-xs text-text-muted mt-1">Tu entrenamiento personalizado</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:bg-surface-elevated hover:text-text-primary'
              )}
            >
              <Icon name={item.icon} className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-text-subtle text-center">
          v1.0.0 • Personal Training
        </p>
      </div>
    </aside>
  );
}

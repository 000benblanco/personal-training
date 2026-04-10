import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

const navItems = [
  { path: '/', label: 'Inicio', icon: 'home' },
  { path: '/train', label: 'Entreno', icon: 'fitness_center' },
  { path: '/wellness', label: 'Calma', icon: 'self_improvement' },
  { path: '/progress', label: 'Mi Camino', icon: 'auto_graph' },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl rounded-t-[1.5rem] shadow-[-8px_0_32px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around px-4 pb-6 pt-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-6 rounded-full transition-all duration-300',
                'active:scale-95',
                isActive
                  ? 'bg-blue-900/40 text-blue-200'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
              )}
              aria-label={item.label}
            >
              <Icon
                name={item.icon}
                className="mb-1"
                filled={isActive}
              />
              <span className="font-medium tracking-[0.05em] uppercase text-[0.75rem]">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
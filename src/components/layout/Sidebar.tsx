import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

const navItems = [
  { path: '/', label: 'Inicio', icon: 'dashboard' },
  { path: '/train', label: 'Entrenamiento', icon: 'fitness_center' },
  { path: '/wellness', label: 'Calma', icon: 'spa' },
  { path: '/progress', label: 'Mi Camino', icon: 'legend_toggle' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 flex flex-col w-80 bg-surface h-full border-r border-slate-800/50 z-50">
      {/* Logo */}
      <div className="px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
            <Icon name="self_improvement" className="text-secondary text-2xl" />
          </div>
          <div>
            <h4 className="font-bold text-secondary">Sanctuary</h4>
            <p className="text-xs text-on-surface-variant">Tu espacio de calma</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-4 px-6 py-4 transition-all duration-300',
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border-r-4 border-blue-500 font-semibold'
                  : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200'
              )}
            >
              <Icon name={item.icon} className="text-xl" />
              <span className="text-base">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer - Settings */}
      <div className="px-6 py-4 border-t border-slate-800/50">
        <NavLink
          to="/settings"
          className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-slate-800/30 transition-all"
        >
          <Icon name="settings" className="text-xl" />
          <span className="text-base">Ajustes</span>
        </NavLink>
      </div>
    </aside>
  );
}
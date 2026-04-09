import { createElement } from 'react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  name: string;
  className?: string;
  filled?: boolean;
}

// Material Symbols Outlined mappings
const MATERIAL_ICONS: Record<string, string> = {
  // Navigation
  home: 'home',
  fitness_center: 'fitness_center',
  self_improvement: 'self_improvement',
  auto_graph: 'auto_graph',
  menu: 'menu',
  dashboard: 'dashboard',
  // Actions
  play_arrow: 'play_arrow',
  pause: 'pause',
  stop: 'stop',
  skip_next: 'skip_next',
  skip_previous: 'skip_previous',
  add: 'add',
  add_notes: 'add_notes',
  chevron_right: 'chevron_right',
  chevron_left: 'chevron_left',
  arrow_forward: 'arrow_forward',
  arrow_back: 'arrow_back',
  close: 'close',
  settings: 'settings',
  notifications: 'notifications',
  search: 'search',
  // Status
  sentiment_very_satisfied: 'sentiment_very_satisfied',
  sentiment_satisfied: 'sentiment_satisfied',
  sentiment_neutral: 'sentiment_neutral',
  sentiment_dissatisfied: 'sentiment_dissatisfied',
  mood: 'mood',
  // Health/Recovery
  clinical_notes: 'clinical_notes',
  healing: 'healing',
  military_tech: 'military_tech',
  accessibility_new: 'accessibility_new',
  directions_walk: 'directions_walk',
  stairs: 'stairs',
  // Training
  exercise: 'exercise',
  sports_martial_arts: 'sports_martial_arts',
  timer: 'timer',
  // Calm/Breathing
  air: 'air',
  spa: 'spa',
  psychology: 'psychology',
  self_care: 'self_care',
  dynamic_form: 'dynamic_form',
  // Wellness
  headphones: 'headphones',
  volume_up: 'volume_up',
  article: 'article',
  bookmark: 'bookmark',
  // Stats
  trending_up: 'trending_up',
  trending_down: 'trending_down',
  analytics: 'analytics',
  monitor_heart: 'monitor_heart',
  legend_toggle: 'legend_toggle',
  // General
  heart: 'favorite',
  star: 'star',
  schedule: 'schedule',
  format_quote: 'format_quote',
  attach_file: 'attach_file',
  explore: 'explore',
  map: 'map',
  bedtime: 'bedtime',
  // Misc
  straight: 'straighten',
};

export function Icon({ name, className, filled = false }: IconWrapperProps) {
  // Check if it's a Material icon
  const materialIconName = MATERIAL_ICONS[name.toLowerCase()];

  if (materialIconName) {
    return (
      <span
        className={cn('material-symbols-outlined', className)}
        style={{
          fontVariationSettings: filled
            ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
            : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        }}
      >
        {materialIconName}
      </span>
    );
  }

  // Fallback to Lucide icons
  const formattedName = name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');

  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[formattedName];

  if (!icon) {
    console.warn(`Icon "${name}" not found`);
    return createElement(LucideIcons.HelpCircle, { className: cn('w-5 h-5 text-on-surface-variant', className) });
  }

  return createElement(icon, { className: cn('w-5 h-5', className) });
}
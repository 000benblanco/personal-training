import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconWrapperProps) {
  const formattedName = name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[formattedName];

  if (!icon) {
    const Fallback = LucideIcons.HelpCircle;
    return <Fallback className={cn('w-5 h-5', className)} />;
  }

  return icon({ className: cn('w-5 h-5', className) });
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Session, UserProgress, UserSettings, Badge } from '@/types';
import { generateId } from '@/lib/utils';

interface AppState {
  // User settings
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  
  // Sessions
  sessions: Session[];
  addSession: (session: Omit<Session, 'id'>) => void;
  
  // Progress
  progress: UserProgress;
  updateProgress: () => void;
  
  // Current user name
  userName: string;
  setUserName: (name: string) => void;
  
  // XP and level
  addXP: (amount: number) => void;
}

const BADGES: Badge[] = [
  { id: 'first_session', title: 'Primera sesión', description: 'Completa tu primera sesión', icon: 'Star', rarity: 'common' },
  { id: 'week_1', title: 'Primera semana', description: '7 días de ejercicio', icon: 'Flame', rarity: 'common' },
  { id: 'streak_7', title: 'Racha de 7', description: '7 días consecutivos', icon: 'Zap', rarity: 'rare' },
  { id: 'streak_14', title: 'Racha de 14', description: '14 días consecutivos', icon: 'Zap', rarity: 'rare' },
  { id: 'streak_30', title: 'Racha de 30', description: '30 días consecutivos', icon: 'Trophy', rarity: 'epic' },
  { id: 'boxer', title: 'Boxeador', description: '10 sesiones de boxeo', icon: 'Dumbbell', rarity: 'common' },
  { id: 'yogi', title: 'Yogui', description: '10 sesiones de yoga', icon: 'Flower2', rarity: 'common' },
  { id: 'breather', title: 'Maestro respirador', description: '20 sesiones de respiración', icon: 'Wind', rarity: 'rare' },
  { id: 'level_5', title: 'Nivel 5', description: 'Alcanza el nivel 5', icon: 'TrendingUp', rarity: 'common' },
  { id: 'level_10', title: 'Nivel 10', description: 'Alcanza el nivel 10', icon: 'Award', rarity: 'epic' },
];

const INITIAL_PROGRESS: UserProgress = {
  totalSessions: 0,
  totalMinutes: 0,
  currentStreak: 0,
  longestStreak: 0,
  xp: 0,
  level: 1,
  badges: [],
  activeDays: [],
  sessionsByType: {
    boxing: 0,
    strength: 0,
    yoga: 0,
    breathing: 0,
    wellness: 0,
    mixto: 0,
  },
};

const INITIAL_SETTINGS: UserSettings = {
  name: '',
  preferredDuration: 20,
  reminderEnabled: false,
  reminderTime: '09:00',
  hasSeenDisclaimer: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      settings: INITIAL_SETTINGS,
      sessions: [],
      progress: INITIAL_PROGRESS,
      userName: '',
      
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
      
      setUserName: (name) => {
        set({ userName: name });
      },
      
      addSession: (sessionData) => {
        const session: Session = {
          ...sessionData,
          id: generateId(),
        };
        
        set((state) => {
          const newSessions = [...state.sessions, session];
          const today = new Date().toISOString().split('T')[0];
          
          // Check if this is a new active day
          const isNewDay = !state.progress.activeDays.includes(today);
          
          // Calculate streak
          let newStreak = state.progress.currentStreak;
          if (isNewDay) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            if (state.progress.activeDays.includes(yesterdayStr)) {
              newStreak += 1;
            } else {
              newStreak = 1;
            }
          }
          
          // Calculate XP (10 per minute + streak bonus)
          const baseXP = sessionData.duration * 10;
          const streakBonus = Math.min(newStreak * 5, 50);
          const newXP = state.progress.xp + baseXP + streakBonus;
          
          // Calculate level (every 500 XP)
          const newLevel = Math.floor(newXP / 500) + 1;
          
          // Update sessions by type
          const sessionsByType = { ...state.progress.sessionsByType };
          sessionsByType[sessionData.type] += 1;
          
          // Check for new badges
          const newBadges = [...state.progress.badges];
          BADGES.forEach((badge) => {
            const alreadyHas = newBadges.some((b) => b.id === badge.id);
            if (!alreadyHas) {
              let shouldUnlock = false;
              
              if (badge.id === 'first_session' && newSessions.length >= 1) shouldUnlock = true;
              if (badge.id === 'week_1' && newStreak >= 7) shouldUnlock = true;
              if (badge.id === 'streak_7' && newStreak >= 7) shouldUnlock = true;
              if (badge.id === 'streak_14' && newStreak >= 14) shouldUnlock = true;
              if (badge.id === 'streak_30' && newStreak >= 30) shouldUnlock = true;
              if (badge.id === 'boxer' && sessionsByType.boxing >= 10) shouldUnlock = true;
              if (badge.id === 'yogi' && sessionsByType.yoga >= 10) shouldUnlock = true;
              if (badge.id === 'breather' && sessionsByType.breathing >= 20) shouldUnlock = true;
              if (badge.id === 'level_5' && newLevel >= 5) shouldUnlock = true;
              if (badge.id === 'level_10' && newLevel >= 10) shouldUnlock = true;
              
              if (shouldUnlock) {
                newBadges.push({ ...badge, unlockedAt: new Date().toISOString() });
              }
            }
          });
          
          return {
            sessions: newSessions,
            progress: {
              ...state.progress,
              totalSessions: state.progress.totalSessions + 1,
              totalMinutes: state.progress.totalMinutes + sessionData.duration,
              currentStreak: newStreak,
              longestStreak: Math.max(state.progress.longestStreak, newStreak),
              xp: newXP,
              level: newLevel,
              badges: newBadges,
              activeDays: isNewDay ? [...state.progress.activeDays, today] : state.progress.activeDays,
              sessionsByType,
            },
          };
        });
      },
      
      addXP: (amount) => {
        set((state) => {
          const newXP = state.progress.xp + amount;
          const newLevel = Math.floor(newXP / 500) + 1;
          
          return {
            progress: {
              ...state.progress,
              xp: newXP,
              level: newLevel,
            },
          };
        });
      },
      
      updateProgress: () => {
        // This can be used to recalculate progress if needed
      },
    }),
    {
      name: 'personal-training-storage',
    }
  )
);

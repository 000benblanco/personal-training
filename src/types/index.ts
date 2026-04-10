// Tipos principales de la aplicación

export type SessionType = 'boxing' | 'strength' | 'yoga' | 'breathing' | 'wellness' | 'mixto';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type SafetyLevel = 'safe' | 'caution' | 'avoid';
export type BodyPart = 'upper' | 'lower' | 'core' | 'full';

// Sesión completada
export interface Session {
  id: string;
  date: string;
  type: SessionType;
  duration: number;
  exercises: string[];
  feeling: 1 | 2 | 3 | 4 | 5;
  energy: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  streakDay?: number;
}

// Ejercicio individual
export interface Exercise {
  id: string;
  name: string;
  description: string;
  type: SessionType;
  duration?: number;
  sets?: number;
  reps?: string;
  bodyPart: BodyPart;
  equipment: string[];
  adaptations: string[];
  safetyLevel: SafetyLevel;
  instructions: string[];
  howToSteps: string[]; // Pasos detallados paso a paso
  tips?: string[]; // Consejos útiles
  imageUrl?: string; // URL de imagen de referencia (futuro)
}

// Rutina predefinida
export interface Routine {
  id: string;
  title: string;
  subtitle: string;
  type: SessionType;
  difficulty: Difficulty;
  duration: number;
  weekRange: string;
  exercises: RoutineExercise[];
  warmup: string[];
  cooldown: string[];
}

export interface RoutineExercise {
  exerciseId: string;
  sets?: number;
  reps?: string;
  duration?: number;
  order: number;
}

// Técnica de respiración
export interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  pattern: {
    inhale: number;
    holdIn?: number;
    exhale: number;
    holdOut?: number;
  };
  instructions: string[];
  benefits: string[];
  level: Difficulty;
}

// Práctica de bienestar
export interface WellnessPractice {
  id: string;
  name: string;
  description: string;
  type: 'meditation' | 'grounding' | 'visualization' | 'reading';
  duration: number;
  content: string;
  instructions?: string[];
}

// Progreso del usuario
export interface UserProgress {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  xp: number;
  level: number;
  badges: Badge[];
  activeDays: string[];
  sessionsByType: Record<SessionType, number>;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Ajustes del usuario
export interface UserSettings {
  name: string;
  preferredDuration: number;
  reminderEnabled: boolean;
  reminderTime?: string;
  hasSeenDisclaimer: boolean;
  initialWeight?: number; // Peso inicial en kg
  weightReminderDay?: string; // Día de la semana para pesarse (L, M, X, J, V, S, D)
}

// Entrada de peso
export interface WeightEntry {
  id: string;
  date: string; // ISO string
  weight: number; // en kg
  notes?: string;
}

// Props de componentes
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

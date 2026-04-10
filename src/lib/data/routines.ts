import type { Routine } from '@/types';

export const routines: Routine[] = [
  // SEMANAS 1-2: Rutina MIXTA (Boxeo + Respiración + Yoga)
  {
    id: 'week-1-2-mixto',
    title: 'Sanctuary Inicial',
    subtitle: 'Boxeo suave, respiración consciente y movilidad básica',
    type: 'mixto',
    difficulty: 'beginner',
    duration: 25,
    weekRange: '1-2',
    warmup: ['tai-chi-raise-arms', 'cat-cow'],
    exercises: [
      // Boxeo (8 min)
      { exerciseId: 'shadow-jab', sets: 2, reps: '10', order: 1 },
      { exerciseId: 'shadow-cross', sets: 2, reps: '8', order: 2 },
      { exerciseId: 'shadow-combo-1-2', sets: 2, reps: '6', order: 3 },
      // Respiración (5 min)
      { exerciseId: 'breathing-diaphragmatic', duration: 5, order: 4 },
      // Yoga (7 min)
      { exerciseId: 'tadasana', duration: 2, order: 5 },
      { exerciseId: 'bridge-supported', sets: 2, reps: '8', order: 6 },
      { exerciseId: 'supine-twist', duration: 3, order: 7 },
    ],
    cooldown: ['seated-forward-fold', 'tai-chi-raise-arms'],
  },
  // SEMANAS 1-2: Rutinas individuales (alternativas)
  {
    id: 'week-1-2-boxeointro',
    title: 'Primeros Golpes',
    subtitle: 'Aprende la base del jab y cross',
    type: 'boxing',
    difficulty: 'beginner',
    duration: 15,
    weekRange: '1-2',
    warmup: ['shadow-jab', 'shadow-cross'],
    exercises: [
      { exerciseId: 'shadow-jab', sets: 3, reps: '10', order: 1 },
      { exerciseId: 'shadow-cross', sets: 3, reps: '8', order: 2 },
      { exerciseId: 'shadow-combo-1-2', sets: 2, reps: '6', order: 3 },
    ],
    cooldown: ['seated-forward-fold'],
  },
  {
    id: 'week-1-2-breathing',
    title: 'Respiración Fundamental',
    subtitle: 'Aprende a respirar con el diafragma',
    type: 'breathing',
    difficulty: 'beginner',
    duration: 10,
    weekRange: '1-2',
    warmup: ['tai-chi-raise-arms'],
    exercises: [
      { exerciseId: 'breathing-diaphragmatic', duration: 5, order: 1 },
    ],
    cooldown: ['seated-forward-fold'],
  },
  {
    id: 'week-1-2-yoga',
    title: 'Despertar Suave',
    subtitle: 'Movilidad y estiramientos suaves',
    type: 'yoga',
    difficulty: 'beginner',
    duration: 15,
    weekRange: '1-2',
    warmup: ['tai-chi-raise-arms'],
    exercises: [
      { exerciseId: 'tadasana', duration: 2, order: 1 },
      { exerciseId: 'cat-cow', duration: 3, order: 2 },
      { exerciseId: 'bridge-supported', sets: 2, reps: '8', order: 3 },
      { exerciseId: 'supine-twist', duration: 3, order: 4 },
      { exerciseId: 'seated-forward-fold', duration: 3, order: 5 },
    ],
    cooldown: ['tai-chi-raise-arms'],
  },
  
  // SEMANAS 3-4: Rutina MIXTA (Boxeo + Respiración + Yoga)
  {
    id: 'week-3-4-mixto',
    title: 'Sanctuary Progreso',
    subtitle: 'Saco, respiración profunda y fortalecimiento de base',
    type: 'mixto',
    difficulty: 'beginner',
    duration: 30,
    weekRange: '3-4',
    warmup: ['tai-chi-raise-arms', 'cat-cow', 'shadow-jab'],
    exercises: [
      // Boxeo con saco (12 min)
      { exerciseId: 'bag-jab', sets: 3, reps: '10', order: 1 },
      { exerciseId: 'bag-cross', sets: 3, reps: '8', order: 2 },
      { exerciseId: 'shadow-combo-1-2', duration: 3, order: 3 },
      // Respiración (5 min)
      { exerciseId: 'breathing-diaphragmatic', duration: 5, order: 4 },
      // Yoga y fuerza (10 min)
      { exerciseId: 'glute-bridge', sets: 3, reps: '12', order: 5 },
      { exerciseId: 'cat-cow', duration: 3, order: 6 },
      { exerciseId: 'seated-forward-fold', duration: 3, order: 7 },
    ],
    cooldown: ['supine-twist', 'tai-chi-raise-arms'],
  },
  // SEMANAS 3-4: Rutinas individuales (alternativas)
  {
    id: 'week-3-4-boxing',
    title: 'Primer Contacto con el Saco',
    subtitle: 'Lleva tu boxeo al siguiente nivel',
    type: 'boxing',
    difficulty: 'beginner',
    duration: 20,
    weekRange: '3-4',
    warmup: ['shadow-jab', 'shadow-cross', 'shadow-combo-1-2'],
    exercises: [
      { exerciseId: 'bag-jab', sets: 4, reps: '10', order: 1 },
      { exerciseId: 'bag-cross', sets: 4, reps: '8', order: 2 },
      { exerciseId: 'shadow-combo-1-2', duration: 3, order: 3 },
    ],
    cooldown: ['seated-forward-fold', 'supine-twist'],
  },
  {
    id: 'week-3-4-strength',
    title: 'Fortalecer la Base',
    subtitle: 'Ejercicios para miembros inferiores',
    type: 'strength',
    difficulty: 'beginner',
    duration: 20,
    weekRange: '3-4',
    warmup: ['tai-chi-raise-arms', 'cat-cow'],
    exercises: [
      { exerciseId: 'quad-set', duration: 5, order: 1 },
      { exerciseId: 'glute-bridge', sets: 3, reps: '12', order: 2 },
      { exerciseId: 'heel-raise', sets: 3, reps: '15', order: 3 },
    ],
    cooldown: ['seated-forward-fold', 'supine-twist'],
  },
  
  // SEMANAS 5-6: Rutina MIXTA (Boxeo + Respiración + Yoga)
  {
    id: 'week-5-6-mixto',
    title: 'Sanctuary Ritmo',
    subtitle: 'Combinaciones de saco, técnicas de respiración avanzadas y fluidez',
    type: 'mixto',
    difficulty: 'intermediate',
    duration: 35,
    weekRange: '5-6',
    warmup: ['tai-chi-raise-arms', 'tai-chi-cloud-hands', 'shadow-jab', 'shadow-cross'],
    exercises: [
      // Boxeo con saco (15 min)
      { exerciseId: 'bag-jab', sets: 3, reps: '10', order: 1 },
      { exerciseId: 'bag-cross', sets: 3, reps: '8', order: 2 },
      { exerciseId: 'bag-hook', sets: 2, reps: '6', order: 3 },
      { exerciseId: 'bag-combo-basic', sets: 2, reps: '6', order: 4 },
      // Respiración avanzada (8 min)
      { exerciseId: 'breathing-ujjayi', duration: 4, order: 5 },
      { exerciseId: 'breathing-diaphragmatic', duration: 4, order: 6 },
      // Yoga y movilidad (9 min)
      { exerciseId: 'tai-chi-cloud-hands', duration: 4, order: 7 },
      { exerciseId: 'bridge-supported', sets: 3, reps: '10', order: 8 },
      { exerciseId: 'supine-twist', duration: 3, order: 9 },
    ],
    cooldown: ['seated-forward-fold', 'child-pose-modified'],
  },
  // SEMANAS 5-6: Rutinas individuales (alternativas)
  {
    id: 'week-5-6-boxing',
    title: 'Ritmo y Fluidez',
    subtitle: 'Combina más golpes en el saco',
    type: 'boxing',
    difficulty: 'intermediate',
    duration: 25,
    weekRange: '5-6',
    warmup: ['shadow-jab', 'shadow-cross', 'shadow-combo-1-2', 'shadow-combo-1-2-3'],
    exercises: [
      { exerciseId: 'bag-jab', sets: 3, reps: '10', order: 1 },
      { exerciseId: 'bag-cross', sets: 3, reps: '8', order: 2 },
      { exerciseId: 'bag-hook', sets: 2, reps: '6', order: 3 },
      { exerciseId: 'bag-combo-basic', sets: 2, reps: '6', order: 4 },
    ],
    cooldown: ['seated-forward-fold', 'supine-twist'],
  },
  {
    id: 'week-5-6-yoga',
    title: 'Fluir con Gravedad',
    subtitle: 'Secuencia de yoga adaptada',
    type: 'yoga',
    difficulty: 'intermediate',
    duration: 25,
    weekRange: '5-6',
    warmup: ['tai-chi-raise-arms', 'tai-chi-cloud-hands'],
    exercises: [
      { exerciseId: 'tadasana', duration: 2, order: 1 },
      { exerciseId: 'cat-cow', duration: 3, order: 2 },
      { exerciseId: 'bridge-supported', sets: 3, reps: '10', order: 3 },
      { exerciseId: 'supine-twist', duration: 3, order: 4 },
      { exerciseId: 'tai-chi-cloud-hands', duration: 4, order: 5 },
      { exerciseId: 'seated-forward-fold', duration: 3, order: 6 },
    ],
    cooldown: ['child-pose-modified'],
  },
  
  // SEMANAS 7-8: Rutina MIXTA (Boxeo + Respiración + Yoga)
  {
    id: 'week-7-8-mixto',
    title: 'Sanctuary Potencia',
    subtitle: 'Combinaciones avanzadas, respiración vagal y fortalecimiento total',
    type: 'mixto',
    difficulty: 'intermediate',
    duration: 40,
    weekRange: '7-8',
    warmup: ['tai-chi-raise-arms', 'tai-chi-cloud-hands', 'shadow-combo-1-2', 'shadow-combo-1-2-3'],
    exercises: [
      // Boxeo avanzado (18 min)
      { exerciseId: 'bag-combo-basic', sets: 3, reps: '8', order: 1 },
      { exerciseId: 'bag-cross', sets: 4, reps: '8', order: 2 },
      { exerciseId: 'bag-hook', sets: 3, reps: '6', order: 3 },
      { exerciseId: 'shadow-combo-1-2-3', duration: 3, order: 4 },
      // Respiración vagal (10 min)
      { exerciseId: 'breathing-ujjayi', duration: 5, order: 5 },
      { exerciseId: 'breathing-humming', duration: 3, order: 6 },
      { exerciseId: 'breathing-diaphragmatic', duration: 2, order: 7 },
      // Fuerza y yoga (9 min)
      { exerciseId: 'glute-bridge', sets: 4, reps: '12', order: 8 },
      { exerciseId: 'wall-squat', sets: 3, reps: '8', order: 9 },
      { exerciseId: 'cat-cow', duration: 3, order: 10 },
    ],
    cooldown: ['seated-forward-fold', 'supine-twist', 'tai-chi-raise-arms'],
  },
  // SEMANAS 7-8: Rutinas individuales (alternativas)
  {
    id: 'week-7-8-boxing',
    title: 'Potencia Controlada',
    subtitle: 'Trabaja tu fuerza en el saco',
    type: 'boxing',
    difficulty: 'intermediate',
    duration: 30,
    weekRange: '7-8',
    warmup: ['shadow-combo-1-2', 'shadow-combo-1-2-3'],
    exercises: [
      { exerciseId: 'bag-combo-basic', sets: 3, reps: '8', order: 1 },
      { exerciseId: 'bag-cross', sets: 4, reps: '8', order: 2 },
      { exerciseId: 'bag-hook', sets: 3, reps: '6', order: 3 },
      { exerciseId: 'shadow-combo-1-2-3', duration: 3, order: 4 },
    ],
    cooldown: ['seated-forward-fold', 'supine-twist'],
  },
  {
    id: 'week-7-8-strength',
    title: 'Construir Resistencia',
    subtitle: 'Fortalecimiento progresivo',
    type: 'strength',
    difficulty: 'intermediate',
    duration: 25,
    weekRange: '7-8',
    warmup: ['tai-chi-raise-arms', 'cat-cow'],
    exercises: [
      { exerciseId: 'quad-set', duration: 3, order: 1 },
      { exerciseId: 'glute-bridge', sets: 4, reps: '12', order: 2 },
      { exerciseId: 'heel-raise', sets: 4, reps: '15', order: 3 },
      { exerciseId: 'wall-squat', sets: 3, reps: '8', order: 4 },
      { exerciseId: 'band-pull-apart', sets: 3, reps: '12', order: 5 },
    ],
    cooldown: ['seated-forward-fold', 'supine-twist'],
  },
  {
    id: 'week-7-8-breathing',
    title: 'Vaguskaya',
    subtitle: 'Técnicas avanzadas de estimulación vagal',
    type: 'breathing',
    difficulty: 'intermediate',
    duration: 15,
    weekRange: '7-8',
    warmup: ['tai-chi-raise-arms'],
    exercises: [
      { exerciseId: 'breathing-ujjayi', duration: 5, order: 1 },
      { exerciseId: 'breathing-humming', duration: 3, order: 2 },
      { exerciseId: 'breathing-diaphragmatic', duration: 3, order: 3 },
    ],
    cooldown: ['tai-chi-cloud-hands'],
  },
  
  // SEMANAS 9-12: Mantenimiento y progreso
  {
    id: 'week-9-12-boxing',
    title: 'Boxeador Consciente',
    subtitle: 'Integración mente-cuerpo en el ring',
    type: 'boxing',
    difficulty: 'advanced',
    duration: 35,
    weekRange: '9-12',
    warmup: ['tai-chi-raise-arms', 'shadow-combo-1-2', 'shadow-combo-1-2-3'],
    exercises: [
      { exerciseId: 'bag-jab', sets: 4, reps: '10', order: 1 },
      { exerciseId: 'bag-cross', sets: 4, reps: '8', order: 2 },
      { exerciseId: 'bag-hook', sets: 3, reps: '6', order: 3 },
      { exerciseId: 'bag-combo-basic', sets: 3, reps: '8', order: 4 },
    ],
    cooldown: ['seated-forward-fold', 'supine-twist', 'child-pose-modified'],
  },
  {
    id: 'week-9-12-full',
    title: 'Sesión Integrada',
    subtitle: 'Mezcla de todos los elementos',
    type: 'mixto',
    difficulty: 'advanced',
    duration: 40,
    weekRange: '9-12',
    warmup: ['tai-chi-raise-arms', 'tai-chi-cloud-hands'],
    exercises: [
      { exerciseId: 'shadow-combo-1-2-3', duration: 3, order: 1 },
      { exerciseId: 'glute-bridge', sets: 3, reps: '12', order: 2 },
      { exerciseId: 'bag-combo-basic', sets: 2, reps: '6', order: 3 },
      { exerciseId: 'breathing-ujjayi', duration: 5, order: 4 },
      { exerciseId: 'cat-cow', duration: 3, order: 5 },
    ],
    cooldown: ['seated-forward-fold', 'supine-twist'],
  },
];

export function getRoutineById(id: string): Routine | undefined {
  return routines.find((r) => r.id === id);
}

export function getRoutinesByType(type: string): Routine[] {
  return routines.filter((r) => r.type === type);
}

export function getRecommendedRoutine(weekNumber: number): Routine {
  // Devuelve rutina MIXTA por defecto (combina boxeo + respiración + yoga)
  if (weekNumber <= 2) {
    return routines.find((r) => r.id === 'week-1-2-mixto')!;
  } else if (weekNumber <= 4) {
    return routines.find((r) => r.id === 'week-3-4-mixto')!;
  } else if (weekNumber <= 6) {
    return routines.find((r) => r.id === 'week-5-6-mixto')!;
  } else if (weekNumber <= 8) {
    return routines.find((r) => r.id === 'week-7-8-mixto')!;
  } else {
    return routines.find((r) => r.id === 'week-9-12-full')!;
  }
}

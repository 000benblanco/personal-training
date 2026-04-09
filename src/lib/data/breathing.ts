import type { BreathingTechnique } from '@/types';

export const breathingTechniques: BreathingTechnique[] = [
  {
    id: 'breathing-diaphragmatic',
    name: 'Respiración Diafragmática',
    description: 'La base de todas las técnicas de respiración. Activa el sistema parasimpático.',
    pattern: {
      inhale: 4,
      exhale: 6,
    },
    instructions: [
      'Sentado o tumbado con espalda recta',
      'Coloca una mano en el pecho y otra en el abdomen',
      'Inhala por la nariz 4 segundos, el abdomen debe expandirse',
      'El pecho no debe moverse significativamente',
      'Exhala por la boca 6 segundos, el abdomen desciende',
      'Mantén un ritmo de 5-6 respiraciones por minuto',
    ],
    benefits: [
      'Activa el sistema nervioso parasimpático',
      'Reduce cortisol y estrés',
      'Mejora la variabilidad de la frecuencia cardíaca',
      'Disminuye la ansiedad',
    ],
    level: 'beginner',
  },
  {
    id: 'breathing-ujjayi',
    name: 'Ujjayi - Respiración Victoriosa',
    description: 'Técnica de yoga que calma la mente mientras mantiene alerta el cuerpo.',
    pattern: {
      inhale: 5,
      holdIn: 2,
      exhale: 5,
      holdOut: 2,
    },
    instructions: [
      'Respirar por la nariz con la garganta ligeramente contraída',
      'El aire debe rozar la garganta creando un sonido de "marea" suave',
      'Inhala 5 segundos',
      'Mantén 2 segundos',
      'Exhala 5 segundos',
      'Mantén 2 segundos',
      'El abdomen se expande y contrae suavemente',
    ],
    benefits: [
      'Calma el sistema nervioso',
      'Aumenta el tono vagal',
      'Mantiene un estado de alerta serena',
      'Mejora la concentración',
    ],
    level: 'intermediate',
  },
  {
    id: 'breathing-4-7-8',
    name: 'Respiración 4-7-8',
    description: 'Técnica poderosa para reducir la ansiedad y favorecer el sueño.',
    pattern: {
      inhale: 4,
      holdIn: 7,
      exhale: 8,
    },
    instructions: [
      'Siéntate con la espalda recta',
      'Exhala completamente por la boca',
      'Inhala por la nariz 4 segundos',
      'Mantén la respiración 7 segundos',
      'Exhala lentamente por la boca 8 segundos',
      'El sonido del aire al exhalar debe ser audible',
      'Repite 4 ciclos inicialmente',
    ],
    benefits: [
      'Reduce significativamente la ansiedad',
      'Ayuda a conciliar el sueño',
      'Activa el reflejo de inmersión vagal',
      'Reduce la frecuencia cardíaca',
    ],
    level: 'beginner',
  },
  {
    id: 'breathing-humming',
    name: 'Humming - Zumbido',
    description: 'Estimulación del nervio vago mediante la vibración del zumbido.',
    pattern: {
      inhale: 4,
      exhale: 6,
    },
    instructions: [
      'De pie o sentado con la espalda recta',
      'Inhala por la nariz 4 segundos',
      'Cierra la boca y haz un "Mmm" grave',
      'El sonido debe resonar en la cabeza',
      'Siente la vibración en los senos paranasales',
      'Exhala durante 15-20 segundos manteniendo el zumbido',
      'Repite 5 veces',
    ],
    benefits: [
      'Estimula el nervio vago vía transmisión ósea',
      'Aumenta el óxido nítrico鼻腔',
      'Calma el sistema nervioso',
      'Mejora la función endotelial',
    ],
    level: 'beginner',
  },
  {
    id: 'breathing-resonance',
    name: 'Respiración de Resonancia',
    description: 'Optimiza la variabilidad de la frecuencia cardíaca.',
    pattern: {
      inhale: 5,
      holdIn: 0,
      exhale: 5,
      holdOut: 0,
    },
    instructions: [
      'Inhala 5 segundos',
      'Exhala 5 segundos',
      'Sin pausas entre respiraciones',
      'Mantén la respiración superficial y natural',
      'El ritmo debe sentirse cómodo y sostenible',
      'Continúa durante 10-15 minutos',
    ],
    benefits: [
      'Maximiza la variabilidad de la frecuencia cardíaca',
      'Sincroniza el ritmo cardíaco con la respiración',
      'Promueve la calma profunda',
      ' Mejora la regulación autonómica',
    ],
    level: 'intermediate',
  },
  {
    id: 'breathing-sky',
    name: 'Sudarshan Kriya',
    description: 'Secuencia completa de respiración yóguica para reducir estrés profundo.',
    pattern: {
      inhale: 4,
      holdIn: 4,
      exhale: 4,
      holdOut: 4,
    },
    instructions: [
      'Fase 1 - Ujjayi suave: 3 minutos de respiración suave',
      'Fase 2 - Bhastrika rápido: 30 respiraciones cortas y rápidas',
      'Fase 3 - Om chanting: 3 veces exhalando profundamente con "Om"',
      'Fase 4 - Sudarshan Kriya: ciclos de 4-4-4 alternando lento y rápido',
      'TOTAL: 20-30 minutos',
      'Nota: Esta técnica requiere práctica previa con las otras técnicas',
    ],
    benefits: [
      'Reduce significativamente cortisol y estrés oxidativo',
      'Aumenta BDNF y neuroplasticidad',
      'Mejora síntomas de depresión y PTSD',
      'Activa el sistema parasimpático de forma profunda',
    ],
    level: 'advanced',
  },
  {
    id: 'breathing-box',
    name: 'Respiración Cuadrada',
    description: 'Técnica simple para enfocarse y calmar la mente.',
    pattern: {
      inhale: 4,
      holdIn: 4,
      exhale: 4,
      holdOut: 4,
    },
    instructions: [
      'Inhala 4 segundos',
      'Mantén 4 segundos',
      'Exhala 4 segundos',
      'Mantén 4 segundos',
      'Repite',
      'Usa un contador mental si es necesario',
    ],
    benefits: [
      'Ancla la atención en el presente',
      'Reduce la mente errante',
      'Calma rápidamente',
      'Excelente para usar antes de entrenar',
    ],
    level: 'beginner',
  },
];

export function getBreathingTechniqueById(id: string): BreathingTechnique | undefined {
  return breathingTechniques.find((t) => t.id === id);
}

export function getBreathingTechniquesByLevel(level: string): BreathingTechnique[] {
  return breathingTechniques.filter((t) => t.level === level);
}

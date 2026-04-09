import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

const yogaPoses = [
  {
    id: 'tadasana',
    name: 'Tadasana',
    subtitle: 'Postura de la montaña',
    description: 'Postura base de pie, enfoca en alineamiento y propiocepción.',
    duration: 2,
    icon: 'User',
    adaptations: [
      'Usa la pared para apoyo si necesitas equilibrio',
      'La férula proporciona retroalimentación táctil',
      'No hay flexión de rodilla involucrada',
    ],
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow',
    subtitle: 'Flexión y extensión espinal',
    description: 'Movilidad de columna suave, sin carga en rodillas.',
    duration: 3,
    icon: 'Cat',
    adaptations: [
      'En cuatro puntos, la rodilla izquierda apoya pero no carga heavily',
      'La férula no estorba en esta posición',
    ],
  },
  {
    id: 'bridge',
    name: 'Puente de glúteo',
    subtitle: 'Fortalecimiento de glúteos',
    description: 'Versión suave del puente, con soporte para las manos.',
    duration: 3,
    sets: 3,
    reps: '8',
    icon: 'ArrowUp',
    adaptations: [
      'Mantén la férula puesta',
      'Las manos pueden quedar relajadas a los lados',
      'Activa primarily glúteos',
    ],
  },
  {
    id: 'supine-twist',
    name: 'Torsión supina',
    subtitle: 'Rotación suave de columna',
    description: 'Estiramiento suave de espalda y caderas, libera tensión.',
    duration: 3,
    icon: 'RotateCcw',
    adaptations: [
      'La férula no molesta en posición acostada',
      'Mantén ambas rodillas juntas al girar',
    ],
  },
  {
    id: 'child-pose',
    name: 'Balasana',
    subtitle: 'Postura del niño modificado',
    description: 'Estiramiento suave de espalda y caderas. No te pongas de rodillas.',
    duration: 4,
    icon: 'Flower2',
    adaptations: [
      'Usa cojín bajo el torso en lugar de rodillas',
      'Manos hacia adelante o a los lados',
      'La férula no afecta',
    ],
  },
  {
    id: 'seated-forward',
    name: 'Flexión frontal sentada',
    subtitle: 'Estiramiento de isquiotibiales',
    description: 'Estiramiento de isquiotibiales y espalda baja.',
    duration: 3,
    icon: 'ArrowDown',
    adaptations: [
      'Sentado con espalda recta',
      'Las piernas pueden estar más separadas si la férula molesta',
    ],
  },
  {
    id: 'tai-chi-arms',
    name: 'Tai Chi - Levantar brazos',
    subtitle: 'Calentamiento con movimiento fluido',
    description: 'Movimiento circular de brazos, desarrolla coordinación.',
    duration: 3,
    icon: 'Wind',
    adaptations: [
      'Usa la pared para equilibrio si es necesario',
      'Movimientos lentos y controlados',
    ],
  },
  {
    id: 'tai-chi-cloud',
    name: 'Tai Chi - Mover las nubes',
    subtitle: 'Coordinación y flujo',
    description: 'Movimiento circular de brazos, coordinación bilateral.',
    duration: 4,
    icon: 'Cloud',
    adaptations: [
      'La droite stabilise le mouvement',
      'Brazos circulares lentos',
    ],
  },
];

export function YogaPage() {
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [completedPoses, setCompletedPoses] = useState<string[]>([]);

  const activePose = yogaPoses.find((p) => p.id === selectedPose);

  const togglePose = (poseId: string) => {
    setSelectedPose(selectedPose === poseId ? null : poseId);
  };

  const markComplete = (poseId: string) => {
    if (!completedPoses.includes(poseId)) {
      setCompletedPoses([...completedPoses, poseId]);
    }
    setSelectedPose(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Yoga Adaptado</h1>
        <p className="text-text-muted mt-2 leading-relaxed">
          Posturas seguras para tu rodilla. Todas las posturas están adaptadas para usar férula.
        </p>
      </div>

      {/* Poses list */}
      <div className="space-y-4">
        {yogaPoses.map((pose) => (
          <Card
            key={pose.id}
            onClick={() => togglePose(pose.id)}
            className={cn(
              'cursor-pointer transition-all',
              selectedPose === pose.id && 'ring-2 ring-primary',
              completedPoses.includes(pose.id) && 'opacity-70'
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'w-14 h-14 rounded-xl flex items-center justify-center shrink-0',
                  completedPoses.includes(pose.id) ? 'bg-success/20' : 'bg-surface-elevated'
                )}
              >
                <Icon
                  name={completedPoses.includes(pose.id) ? 'Check' : pose.icon}
                  className={cn('w-7 h-7', completedPoses.includes(pose.id) ? 'text-success' : 'text-warning')}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-text-primary">{pose.name}</h3>
                <p className="text-sm text-text-muted">{pose.subtitle}</p>
              </div>
              <div className="text-right text-sm text-text-subtle">
                <span>{pose.duration} min</span>
                {pose.sets && <span> • {pose.sets}×{pose.reps}</span>}
              </div>
            </div>

            {/* Expanded content */}
            {selectedPose === pose.id && (
              <div className="mt-5 pt-5 border-t border-border animate-fade-in">
                <p className="text-sm text-text-muted mb-5 leading-relaxed">{pose.description}</p>

                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-warning uppercase tracking-wide mb-3">
                    Adaptaciones para tu férula
                  </h4>
                  <ul className="space-y-2">
                    {pose.adaptations.map((adaptation, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="leading-relaxed">{adaptation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant={completedPoses.includes(pose.id) ? "secondary" : "primary"}
                    className="flex-1"
                    onClick={() => {
                      markComplete(pose.id);
                    }}
                    disabled={completedPoses.includes(pose.id)}
                  >
                    <Icon name="Check" className="w-5 h-5 mr-2" />
                    {completedPoses.includes(pose.id) ? 'Completado' : 'Marcar hecho'}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Summary */}
      {completedPoses.length > 0 && (
        <Card className="bg-success/10 border-success/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <Icon name="Trophy" className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-base font-semibold text-text-primary">
                {completedPoses.length} de {yogaPoses.length} posturas completadas
              </p>
              <p className="text-sm text-text-muted mt-1">
                ¡Sigue así! El yoga ayuda a mejorar la flexibilidad y reduce el estrés.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BreathingCircle } from '@/components/features/breathing/BreathingCircle';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { breathingTechniques } from '@/lib/data/breathing';

export function BreathingPage() {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  const activeTechnique = breathingTechniques.find((t) => t.id === selectedTechnique);

  const startTechnique = () => {
    setIsActive(true);
    setCompletedCycles(0);
  };

  const stopTechnique = () => {
    setIsActive(false);
  };

  const handleCycleComplete = () => {
    setCompletedCycles((c) => c + 1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Respiración</h1>
      <p className="text-text-muted text-sm">
        Técnicas de estimulación del nervio vago para reducir ansiedad y mejorar tu bienestar.
      </p>

      {/* Techniques list */}
      <div className="space-y-3">
        {breathingTechniques.map((technique) => (
          <Card
            key={technique.id}
            onClick={() => {
              setSelectedTechnique(technique.id);
              setIsActive(false);
            }}
            className={cn(
              'cursor-pointer transition-all',
              selectedTechnique === technique.id && 'ring-2 ring-primary'
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Wind" className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary">{technique.name}</h3>
                <p className="text-xs text-text-muted">{technique.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-subtle">
                  <span>{technique.pattern.inhale}s in</span>
                  {technique.pattern.holdIn && <span>{technique.pattern.holdIn}s hold</span>}
                  <span>{technique.pattern.exhale}s out</span>
                  {technique.pattern.holdOut && <span>{technique.pattern.holdOut}s hold</span>}
                </div>
              </div>
              <div className="text-xs text-text-subtle capitalize bg-surface-elevated px-2 py-1 rounded">
                {technique.level}
              </div>
            </div>

            {/* Expanded content */}
            {selectedTechnique === technique.id && (
              <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                {/* Instructions */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">
                    Instrucciones
                  </h4>
                  <ol className="space-y-1">
                    {technique.instructions.map((instruction, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="text-primary font-medium mt-0.5">{i + 1}.</span>
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">
                    Beneficios
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {technique.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="text-xs bg-surface-elevated px-2 py-1 rounded text-text-muted"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Start/Stop button */}
                <div className="flex gap-2">
                  {!isActive ? (
                    <Button onClick={startTechnique} className="flex-1">
                      <Icon name="Play" className="w-4 h-4 mr-2" />
                      Iniciar práctica
                    </Button>
                  ) : (
                    <Button variant="secondary" onClick={stopTechnique} className="flex-1">
                      <Icon name="Square" className="w-4 h-4 mr-2" />
                      Detener
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Active practice overlay */}
      {isActive && activeTechnique && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold text-text-primary">{activeTechnique.name}</h2>
            <Button variant="ghost" size="sm" onClick={stopTechnique}>
              <Icon name="X" className="w-5 h-5" />
            </Button>
          </div>

          {/* Breathing circle */}
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <BreathingCircle
              pattern={activeTechnique.pattern}
              isActive={isActive}
              onPhaseChange={() => {}}
              onComplete={handleCycleComplete}
            />
          </div>

          {/* Pattern info */}
          <div className="p-4 border-t border-border">
            <div className="flex justify-center gap-4 text-sm text-text-muted">
              <span>Inhala: {activeTechnique.pattern.inhale}s</span>
              {activeTechnique.pattern.holdIn && (
                <span>Mantén: {activeTechnique.pattern.holdIn}s</span>
              )}
              <span>Exhala: {activeTechnique.pattern.exhale}s</span>
              {activeTechnique.pattern.holdOut && (
                <span>Pausa: {activeTechnique.pattern.holdOut}s</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

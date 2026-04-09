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
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Respiración</h1>
        <p className="text-text-muted mt-2 leading-relaxed">
          Técnicas de estimulación del nervio vago para reducir ansiedad y mejorar tu bienestar.
        </p>
      </div>

      {/* Techniques list */}
      <div className="space-y-4">
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
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name="Wind" className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-text-primary">{technique.name}</h3>
                <p className="text-sm text-text-muted">{technique.description}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-text-subtle">
                  <span className="bg-surface-elevated px-2 py-1 rounded-lg">{technique.pattern.inhale}s in</span>
                  {technique.pattern.holdIn && <span className="bg-surface-elevated px-2 py-1 rounded-lg">{technique.pattern.holdIn}s hold</span>}
                  <span className="bg-surface-elevated px-2 py-1 rounded-lg">{technique.pattern.exhale}s out</span>
                  {technique.pattern.holdOut && <span className="bg-surface-elevated px-2 py-1 rounded-lg">{technique.pattern.holdOut}s hold</span>}
                </div>
              </div>
              <div className="text-xs font-medium text-text-subtle capitalize bg-surface-elevated px-3 py-1.5 rounded-lg">
                {technique.level}
              </div>
            </div>

            {/* Expanded content */}
            {selectedTechnique === technique.id && (
              <div className="mt-5 pt-5 border-t border-border animate-fade-in">
                {/* Instructions */}
                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                    Instrucciones
                  </h4>
                  <ol className="space-y-2">
                    {technique.instructions.map((instruction, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                        <span className="text-primary font-semibold mt-0.5 min-w-[20px]">{i + 1}.</span>
                        <span className="leading-relaxed">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Benefits */}
                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                    Beneficios
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {technique.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="text-sm bg-surface-elevated px-3 py-1.5 rounded-lg text-text-muted"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Start/Stop button */}
                <div className="flex gap-3">
                  {!isActive ? (
                    <Button onClick={startTechnique} className="flex-1" size="lg">
                      <Icon name="Play" className="w-5 h-5 mr-2" />
                      Iniciar práctica
                    </Button>
                  ) : (
                    <Button variant="secondary" onClick={stopTechnique} className="flex-1" size="lg">
                      <Icon name="Square" className="w-5 h-5 mr-2" />
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
          <div className="flex items-center justify-between p-6">
            <h2 className="text-xl font-bold text-text-primary">{activeTechnique.name}</h2>
            <Button variant="ghost" size="lg" onClick={stopTechnique}>
              <Icon name="X" className="w-6 h-6" />
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
          <div className="p-6 border-t border-border">
            <div className="flex justify-center gap-4 text-base text-text-muted flex-wrap">
              <span className="bg-surface-elevated px-4 py-2 rounded-lg">Inhala: {activeTechnique.pattern.inhale}s</span>
              {activeTechnique.pattern.holdIn && (
                <span className="bg-surface-elevated px-4 py-2 rounded-lg">Mantén: {activeTechnique.pattern.holdIn}s</span>
              )}
              <span className="bg-surface-elevated px-4 py-2 rounded-lg">Exhala: {activeTechnique.pattern.exhale}s</span>
              {activeTechnique.pattern.holdOut && (
                <span className="bg-surface-elevated px-4 py-2 rounded-lg">Pausa: {activeTechnique.pattern.holdOut}s</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

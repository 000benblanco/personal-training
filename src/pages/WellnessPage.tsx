import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { wellnessPractices, getRandomReading } from '@/lib/data/wellness';
import type { WellnessPractice } from '@/types';

export function WellnessPage() {
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [dailyReading] = useState(getRandomReading);

  const activePractice = wellnessPractices.find((p) => p.id === selectedPractice);

  const practiceTypes = [
    { id: 'meditation', label: 'Meditación', icon: 'Brain' },
    { id: 'grounding', label: 'Grounding', icon: 'Anchor' },
    { id: 'visualization', label: 'Visualización', icon: 'Eye' },
    { id: 'reading', label: 'Lectura', icon: 'BookOpen' },
  ];

  const filteredPractices = selectedPractice
    ? wellnessPractices.filter((p) => p.type === selectedPractice)
    : wellnessPractices;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Bienestar Mental</h1>
      <p className="text-text-muted text-sm">
        Prácticas para reducir ansiedad, mejorar tu estado de ánimo y conectar mente-cuerpo.
      </p>

      {/* Daily reading */}
      <Card className="bg-primary/10 border-primary/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon name="Sparkles" className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-primary">Lectura del día</h3>
            <p className="text-lg font-medium text-text-primary mt-1">{dailyReading.name}</p>
            <p className="text-sm text-text-muted mt-2 italic">"{dailyReading.content}"</p>
            <p className="text-xs text-text-subtle mt-2">— {dailyReading.name}</p>
          </div>
        </div>
      </Card>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedPractice(null)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
            !selectedPractice
              ? 'bg-primary text-white'
              : 'bg-surface text-text-muted hover:bg-surface-elevated'
          )}
        >
          Todos
        </button>
        {practiceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedPractice(type.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              selectedPractice === type.id
                ? 'bg-primary text-white'
                : 'bg-surface text-text-muted hover:bg-surface-elevated'
            )}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Practices list */}
      <div className="space-y-3">
        {filteredPractices.map((practice) => (
          <Card key={practice.id}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Icon
                  name={
                    practice.type === 'meditation'
                      ? 'Brain'
                      : practice.type === 'grounding'
                      ? 'Anchor'
                      : practice.type === 'visualization'
                      ? 'Eye'
                      : 'BookOpen'
                  }
                  className="w-5 h-5 text-success"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary">{practice.name}</h3>
                <p className="text-xs text-text-muted">{practice.description}</p>
              </div>
              <span className="text-xs text-text-subtle">{practice.duration} min</span>
            </div>

            {showContent && activePractice?.id === practice.id && (
              <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                <p className="text-sm text-text-muted whitespace-pre-wrap">{practice.content}</p>
                {practice.instructions && (
                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">
                      Instrucciones
                    </h4>
                    <ol className="space-y-1">
                      {practice.instructions.map((instruction, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                          <span className="text-success font-medium mt-0.5">{i + 1}.</span>
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3"
              onClick={() => setShowContent(!showContent)}
            >
              <Icon name={showContent && activePractice?.id === practice.id ? 'ChevronUp' : 'ChevronDown'} className="w-4 h-4 mr-2" />
              {showContent && activePractice?.id === practice.id ? 'Ocultar' : 'Ver práctica'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Info card */}
      <Card className="bg-surface-elevated">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" className="w-5 h-5 text-warning mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-text-primary">¿Por qué esto funciona?</h3>
            <p className="text-xs text-text-muted mt-1">
              La estimulación del nervio vago a través de estas prácticas activa tu sistema nervioso
              parasimpático, reduciendo la ansiedad y mejorando la regulación emocional. La respiración
              lenta y profunda es una de las formas más efectivas de estimular el vago de forma natural.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

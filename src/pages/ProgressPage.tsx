import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useAppStore } from '@/lib/stores/appStore';

export function ProgressPage() {
  const { progress, weightEntries, settings, updateSettings, addWeightEntry, deleteWeightEntry, getLatestWeight, getWeightChange } = useAppStore();
  const [selectedMood, setSelectedMood] = useState<string>('');
  
  // Weight tracking state
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [showInitialWeightForm, setShowInitialWeightForm] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [weightNotes, setWeightNotes] = useState('');
  const [initialWeightInput, setInitialWeightInput] = useState('');
  
  const latestWeight = getLatestWeight();
  const weightChange = getWeightChange();
  
  const handleAddWeight = () => {
    const weight = parseFloat(newWeight);
    if (!isNaN(weight) && weight > 0) {
      addWeightEntry(weight, weightNotes || undefined);
      setNewWeight('');
      setWeightNotes('');
      setShowWeightForm(false);
    }
  };
  
  const handleSetInitialWeight = () => {
    const weight = parseFloat(initialWeightInput);
    if (!isNaN(weight) && weight > 0) {
      updateSettings({ initialWeight: weight });
      setInitialWeightInput('');
      setShowInitialWeightForm(false);
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };
  
  const getDayName = (dayCode: string) => {
    const days: Record<string, string> = {
      'L': 'Lunes', 'M': 'Martes', 'X': 'Miércoles', 'J': 'Jueves',
      'V': 'Viernes', 'S': 'Sábado', 'D': 'Domingo'
    };
    return days[dayCode] || dayCode;
  };

  // Calculate stats
  const weeklyData = [
    { day: 'L', height: '40%', isHighlight: false },
    { day: 'M', height: '60%', isHighlight: false },
    { day: 'X', height: '55%', isHighlight: false },
    { day: 'J', height: '85%', isHighlight: true },
    { day: 'V', height: '70%', isHighlight: false },
    { day: 'S', height: '45%', isHighlight: false },
    { day: 'D', height: '30%', isHighlight: false },
  ];

  const readings = [
    {
      id: 1,
      category: 'ATENCIÓN PLENA',
      title: 'La Física del Progreso',
      description: 'Entender que el desarrollo no es lineal, sino una serie de micro-ajustes dentro del sistema nervioso.',
      readTime: '4 min de lectura',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7zGR1WUjnRBKceynaOYjJ6DT8GEfCD0KQQkSmHSv9OPxDt8McogNwV3qyHORtB3YQSL64Wij97yeuRQuBoyR-_EhhTsibvoPAYG01p2jo6dHdU1gS6Wc5lgYPdkGvQx_BMwazUGyX65LhQ4BamLLKes_WlUPDQ4hybjkdITK0K3bErjmmnpKaVOw_ECgB6Jysmr-t938YJJvi3rZUB4CPm4YjlZCmIP8zY7lduYbSar7KvLLw56_NrEtaJcXxNb-VhnzOJDJ1AF0'
    },
    {
      id: 2,
      category: 'FISIOLOGÍA',
      title: 'Resiliencia Celular',
      description: 'Cómo los períodos de descanso dirigidos activan la recuperación muscular y la adaptación al entrenamiento.',
      readTime: '6 min de lectura',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl-fILbg5Cz4EEDYkRZLJ-1BGbKVGvYQWtNAtsr1ogc6s8Ejk2B27ecRnbIRaz1XdcQH8HZvamwY-Bs_UlYH7UTsrcvAkjoliivyp2bRl-PDohqpgmfKSwVlSmtj9zV3p3wLCG-573gnOyzPv9yHv9wbQxs1yIrI037r-6R-QcoyD5vcmXVa420Qm1bIqwnCsmdH3c3vg7GgkZEIH769sZQ0xk3GpATWaurq71xC_Cubf1ihz90oPb6CI7Mm63pBTg0rQpLUQyibk'
    },
    {
      id: 3,
      category: 'PSICOLOGÍA',
      title: 'El Atleta Estoico',
      description: 'Abrazar las limitaciones temporales del cuerpo físico para encontrar la soberanía mental.',
      readTime: '3 min de lectura',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYDk6IjaQnwH8NyXGN2b5cEIGmloRAhQy6HvyEkB0kBGFQ_OkMGt3-LPmvs3xFEk0aYFB1c9t3uHWacn2FewWdxgHMxK6bpxbx0nMKoLXHlHRHEjeUcylFX-a94c3Gqezpqbnb89bVD32r8ZePFqOdSNGesV3GFeodO3ifZ4PBnn73sgBXk8Fmh80XIkef3wNULlt5EiQF2lPJQ-tK4sj7_UupH1t1vlLL9PlmmYvSnR3ECSPrOlzVDAQzaPV9ZN-zWbUskFdJ10M'
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero: Mi Camino Evolution */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8">
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-tertiary mb-2">
            Mi Evolución
          </p>
          <h2 className="text-[3.5rem] leading-tight font-black tracking-tighter text-on-surface">
            Mi Camino
          </h2>
          <p className="text-on-surface-variant mt-4 leading-relaxed max-w-xl">
            Un espacio reflexivo para tu viaje de entrenamiento. Rastrea tu progreso, celebra pequeñas victorias y encuentra la fuerza tranquila para seguir avanzando.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <div className="h-1 w-12 rounded-full bg-tertiary"></div>
            <div className="h-1 w-6 rounded-full bg-surface-container-highest"></div>
            <div className="h-1 w-6 rounded-full bg-surface-container-highest"></div>
          </div>
          <span className="text-[0.75rem] font-medium text-on-surface-variant">
            Día {progress.currentStreak > 0 ? progress.currentStreak : 42} de Entrenamiento
          </span>
        </div>
      </section>

      {/* Bento Grid: Evolution Data */}
      <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {/* Sensation Log Action */}
        <div className="md:col-span-2 lg:col-span-2 bg-surface-container-high rounded-xl p-8 flex flex-col justify-between min-h-[320px]">
          <div>
            <h3 className="text-[1.375rem] font-bold text-on-surface mb-2">Registro de Sensaciones</h3>
            <p className="text-on-surface-variant">
              ¿Cómo te sientes después de la sesión de hoy?
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {['sentiment_very_satisfied', 'sentiment_satisfied', 'sentiment_neutral', 'sentiment_dissatisfied'].map((mood, index) => (
                <button
                  key={mood}
                  className={`
                    w-16 h-16 rounded-full bg-surface-container flex items-center justify-center transition-colors
                    ${index === 1 ? 'border-2 border-secondary/20' : 'hover:bg-secondary-container'}
                  `}
                >
                  <Icon 
                    name={mood} 
                    className={`text-2xl ${index === 1 ? 'text-secondary' : 'text-on-surface-variant'}`}
                    filled={index === 1}
                  />
                </button>
              ))}
            </div>
            <button className="w-full h-16 bg-primary text-on-primary font-bold rounded-lg transition-transform active:scale-95 flex items-center justify-center gap-2">
              <Icon name="add" />
              Registrar Estado Post-Sesión
            </button>
          </div>
        </div>

        {/* Feel Chart */}
        <div className="md:col-span-2 lg:col-span-4 bg-surface-container-low rounded-xl p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[1.375rem] font-bold text-on-surface">Resiliencia Semanal</h3>
              <p className="text-[0.75rem] text-tertiary">Niveles de Dolor vs. Movilidad</p>
            </div>
            <div className="text-right">
              <span className="text-[1.75rem] font-black text-secondary">+14%</span>
              <p className="text-[0.75rem] text-on-surface-variant">Progreso</p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-48 w-full flex items-end gap-3 mt-8">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full rounded-t-lg ${
                    day.isHighlight ? 'bg-secondary/60 border-t-4 border-secondary' : 'bg-surface-container-highest'
                  }`}
                  style={{ height: day.height }}
                />
                <span className={`text-[0.75rem] ${day.isHighlight ? 'text-secondary font-bold' : 'text-on-surface-variant opacity-50'}`}>
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Body Composition - Real Weight Tracking */}
        <div className="md:col-span-2 lg:col-span-2 bg-surface-container rounded-xl p-6 overflow-hidden relative group">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[1.125rem] font-bold text-on-surface">Composición Corporal</h3>
              {!settings.initialWeight && (
                <button 
                  onClick={() => setShowInitialWeightForm(true)}
                  className="text-[0.65rem] text-secondary hover:text-secondary/80 font-medium"
                >
                  Fijar inicial
                </button>
              )}
            </div>
            
            {/* Initial Weight Form */}
            {showInitialWeightForm && (
              <div className="mb-4 p-3 bg-surface-container-high rounded-lg">
                <p className="text-[0.75rem] text-on-surface-variant mb-2">Peso inicial (kg)</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={initialWeightInput}
                    onChange={(e) => setInitialWeightInput(e.target.value)}
                    placeholder="Ej: 80.5"
                    className="flex-1 h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm border border-outline-variant/30 focus:border-secondary outline-none"
                  />
                  <button
                    onClick={handleSetInitialWeight}
                    className="h-10 px-3 bg-secondary text-on-secondary rounded-lg text-sm font-medium"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}
            
            {/* Current Weight Display */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[2rem] font-black text-on-surface">
                {latestWeight ? latestWeight.toFixed(1) : '--'}
              </span>
              <span className="text-[1rem] font-medium text-on-surface-variant">kg</span>
            </div>
            
            {/* Weight Change Indicator */}
            {weightChange !== undefined && (
              <div className={`flex items-center gap-2 ${weightChange <= 0 ? 'text-tertiary' : 'text-error'}`}>
                <Icon name={weightChange <= 0 ? 'trending_down' : 'trending_up'} />
                <span className="text-[0.875rem] font-medium">
                  {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)}kg desde inicio
                </span>
              </div>
            )}
            
            {/* Next Weigh-in Reminder */}
            {settings.weightReminderDay && (
              <div className="mt-3 flex items-center gap-2 text-on-surface-variant/70">
                <Icon name="event" className="text-[0.875rem]" />
                <span className="text-[0.75rem]">
                  Próximo: {getDayName(settings.weightReminderDay)}
                </span>
              </div>
            )}
            
            {/* Add Weight Button */}
            <button
              onClick={() => setShowWeightForm(true)}
              className="mt-4 w-full h-11 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/20 rounded-lg text-on-surface font-medium flex items-center justify-center gap-2 transition-all text-sm"
            >
              <Icon name="add" />
              Registrar peso
            </button>
            
            {/* Weight Entry Form */}
            {showWeightForm && (
              <div className="mt-4 p-4 bg-surface-container-high rounded-lg space-y-3">
                <p className="text-[0.75rem] text-on-surface-variant">Nuevo registro (kg)</p>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder="Ej: 79.2"
                  className="w-full h-11 px-3 bg-surface-container-low rounded-lg text-on-surface border border-outline-variant/30 focus:border-secondary outline-none"
                />
                <input
                  type="text"
                  value={weightNotes}
                  onChange={(e) => setWeightNotes(e.target.value)}
                  placeholder="Notas (opcional)"
                  className="w-full h-10 px-3 bg-surface-container-low rounded-lg text-on-surface text-sm border border-outline-variant/30 focus:border-secondary outline-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowWeightForm(false)}
                    className="flex-1 h-10 bg-surface-container-low text-on-surface-variant rounded-lg text-sm font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddWeight}
                    disabled={!newWeight || parseFloat(newWeight) <= 0}
                    className="flex-1 h-10 bg-secondary text-on-secondary rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}
            
            {/* Recent History */}
            {weightEntries.length > 0 && (
              <div className="mt-4 pt-4 border-t border-outline-variant/20">
                <p className="text-[0.65rem] uppercase tracking-wider text-on-surface-variant mb-2">Historial reciente</p>
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  {weightEntries.slice(-3).reverse().map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-on-surface">{entry.weight.toFixed(1)} kg</span>
                        <span className="text-[0.65rem] text-on-surface-variant">{formatDate(entry.date)}</span>
                      </div>
                      <button
                        onClick={() => deleteWeightEntry(entry.id)}
                        className="text-on-surface-variant/50 hover:text-error transition-colors"
                      >
                        <Icon name="delete" className="text-[0.875rem]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
        </div>

        {/* Positive Focus / Gratitude */}
        <div className="md:col-span-2 lg:col-span-4 bg-surface-container-highest rounded-xl p-8 flex items-center gap-8">
          <div className="w-24 h-24 rounded-full border-[12px] border-surface-container flex items-center justify-center border-t-tertiary relative">
            <Icon name="auto_awesome" className="text-tertiary" />
          </div>
          <div className="flex-1">
            <h3 className="text-[1.375rem] font-bold text-on-surface mb-2">Enfoque de Hoy</h3>
            <p className="italic text-on-surface-variant leading-relaxed">
              "Cada sesión de entrenamiento es un punto de partida, no un final. Hoy, estoy más fuerte que ayer."
            </p>
            <p className="text-[0.75rem] text-tertiary mt-4 font-bold tracking-widest uppercase">
              Puntuación de Resiliencia: 92%
            </p>
          </div>
        </div>
      </section>


    </div>
  );
}
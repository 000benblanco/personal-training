import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useAppStore } from '@/lib/stores/appStore';

type Mood = 'energized' | 'balanced' | 'recovering' | 'strained';

export function HomePage() {
  const navigate = useNavigate();
  const { progress } = useAppStore();
  const [selectedMood, setSelectedMood] = useState<Mood>('balanced');

  const moods: { id: Mood; icon: string; label: string }[] = [
    { id: 'energized', icon: 'sentiment_very_satisfied', label: 'Con energía' },
    { id: 'balanced', icon: 'sentiment_satisfied', label: 'Equilibrado' },
    { id: 'recovering', icon: 'sentiment_neutral', label: 'En recuperación' },
    { id: 'strained', icon: 'sentiment_dissatisfied', label: 'Tensionado' },
  ];

  // Datos de ejemplo a cero - se actualizarán con datos reales del usuario
  const weeklyData = [
    { day: 'L', height: 'h-4', color: 'bg-surface-container-highest' },
    { day: 'M', height: 'h-4', color: 'bg-surface-container-highest' },
    { day: 'X', height: 'h-4', color: 'bg-surface-container-highest' },
    { day: 'J', height: 'h-4', color: 'bg-surface-container-highest' },
    { day: 'V', height: 'h-4', color: 'bg-surface-container-highest' },
    { day: 'S', height: 'h-4', color: 'bg-surface-container-highest' },
    { day: 'D', height: 'h-4', color: 'bg-surface-container-highest' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section: Motivation & Mood */}
      <section className="space-y-4">
        <div className="space-y-2">
          <span className="text-[0.75rem] uppercase tracking-[0.05em] text-on-surface-variant font-label">
            Mi Ritual • Hoy
          </span>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-black tracking-tighter leading-tight text-on-surface">
            Sin disciplina no hay resultados.
          </h2>
        </div>

        {/* Mood Selector */}
        <div className="bg-surface-container-low rounded-xl p-5">
          <p className="text-[0.75rem] uppercase tracking-[0.05em] text-on-secondary-container mb-4 font-label">
            ¿Cómo te sientes?
          </p>
          <div className="flex justify-between items-center gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`
                  flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all active:scale-95
                  ${selectedMood === mood.id 
                    ? 'bg-surface-container-highest ring-2 ring-secondary/30' 
                    : 'bg-surface-container-high hover:bg-surface-bright'}
                `}
              >
                <Icon 
                  name={mood.icon} 
                  className={`text-secondary ${selectedMood === mood.id ? '' : 'opacity-60'}`}
                  filled={selectedMood === mood.id}
                />
                <span className={`text-[0.65rem] font-medium text-center ${
                  selectedMood === mood.id ? 'text-on-surface' : 'text-on-surface-variant'
                }`}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid: Main Actions */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Training of the Day Card */}
        <div 
          className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-highest aspect-[16/10] md:aspect-auto md:min-h-[320px] cursor-pointer"
          onClick={() => navigate('/train')}
        >
          <div className="absolute inset-0 opacity-40">
            <img 
              alt="Entrenamiento de boxeo" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJZAfUh1faTqrj9L1xUhW_VB1ioq9ma26Bd5pIp-N-ANU5xbd3gz1xZphhhIKQKj53qGfCKpHtmQLLSN3Wypxzv1BSiFLyXqXqi_BXMdgit6rUcLi_mNePdc_HrE3iH4qyv7Mzh7DtK1-niZ2kdgfWfU1IOl43LZmm8rlqQZsf6PVNdO7IC3xKJlKrZ4-6vgyVRdmON-EEpSKufqMdRR7OaQRqkSRnPKfJU8xUrIkHeRXMDAf1vJz_OdA-pGgTVJSQrTJwGj6T_pg" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-wider font-label">
                Entrenamiento
              </span>
              <span className="text-on-surface-variant font-label text-[0.65rem] uppercase tracking-wider">
                Selecciona tu rutina
              </span>
            </div>
            <h3 className="text-[1.25rem] md:text-[1.5rem] font-bold text-on-surface">
              Boxeo y Estabilidad de Core
            </h3>
            <p className="text-on-surface-variant max-w-md text-sm line-clamp-2">
              Sesión enfocada en técnica de boxeo shadow y ejercicios de estabilidad. Diseñada para proteger la pierna izquierda mientras entrenas.
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('/train'); }}
              className="h-12 w-full md:w-auto px-6 bg-primary text-on-primary rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-fixed-dim active:scale-95 transition-all text-sm"
            >
              <Icon name="play_arrow" filled />
              INICIAR SESIÓN
            </button>
          </div>
        </div>

        {/* Calm Moment Card */}
        <div 
          className="md:col-span-4 group relative overflow-hidden rounded-xl bg-tertiary-container min-h-[280px] md:min-h-0 cursor-pointer"
          onClick={() => navigate('/calm')}
        >
          <div className="absolute inset-0 opacity-40">
            <img 
              alt="Respiración" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://images.unsplash.com/photo-1506126613408-7d7868ed7e1b?w=800&q=80" 
            />
          </div>
          <div className="relative h-full flex flex-col justify-between p-5">
            <div>
              <Icon name="air" className="text-tertiary text-3xl mb-3" />
              <h3 className="text-[1.25rem] font-bold text-tertiary leading-tight">
                Respiración<br/>Relajante
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-on-tertiary-container/80 text-xs font-medium leading-relaxed">
                Resetea tu sistema nervioso después del estrés físico. 8 minutos de respiración profunda.
              </p>
              <button className="h-11 w-full glass border border-tertiary/20 text-tertiary rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-tertiary/10 transition-all text-sm">
                RESPIRAR
              </button>
            </div>
          </div>
        </div>

        {/* Progress Insight Card */}
        <div className="md:col-span-12 bg-surface-container-low rounded-xl p-5 flex flex-col md:flex-row items-center gap-6">
          {/* Progress Ring */}
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-surface-container-highest" cx="72" cy="72" fill="transparent" r="64" stroke="currentColor" strokeWidth="10"></circle>
              <circle className="text-tertiary" cx="72" cy="72" fill="transparent" r="64" stroke="currentColor" strokeDasharray="402" strokeDashoffset="100" strokeLinecap="round" strokeWidth="10"></circle>
              <circle className="text-secondary" cx="72" cy="72" fill="transparent" r="48" stroke="currentColor" strokeDasharray="302" strokeDashoffset="60" strokeLinecap="round" strokeWidth="10"></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-black text-on-surface">0%</span>
              <span className="text-[0.55rem] uppercase tracking-widest text-on-surface-variant font-label">
                Meta Semanal
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h4 className="text-lg font-bold">Comienza tu viaje</h4>
                <p className="text-on-surface-variant text-sm">
                  Completa tu primera sesión para empezar a construir tu progreso.
                </p>
              </div>
              <Icon name="auto_graph" className="text-secondary text-xl" />
            </div>

            {/* Weekly Activity Bars */}
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className={`w-full ${day.height} ${day.color} rounded-md min-h-[2rem]`}></div>
                  <span className="text-[0.6rem] text-on-surface-variant font-label">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
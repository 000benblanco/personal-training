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
    { id: 'energized', icon: 'sentiment_very_satisfied', label: 'Energized' },
    { id: 'balanced', icon: 'sentiment_satisfied', label: 'Balanced' },
    { id: 'recovering', icon: 'sentiment_neutral', label: 'Recovering' },
    { id: 'strained', icon: 'sentiment_dissatisfied', label: 'Strained' },
  ];

  const weeklyData = [
    { day: 'M', height: 'h-12', color: 'bg-tertiary' },
    { day: 'T', height: 'h-20', color: 'bg-tertiary' },
    { day: 'W', height: 'h-16', color: 'bg-tertiary' },
    { day: 'T', height: 'h-24', color: 'bg-secondary' },
    { day: 'F', height: 'h-10', color: 'bg-surface-container-highest' },
    { day: 'S', height: 'h-8', color: 'bg-surface-container-highest' },
    { day: 'S', height: 'h-12', color: 'bg-surface-container-highest' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header Section: Motivation & Mood */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-[0.75rem] uppercase tracking-[0.05em] text-on-surface-variant font-label">
            Mi Ritual • Hoy
          </span>
          <h2 className="text-[3.5rem] font-black tracking-tighter leading-none text-on-surface">
            The strength is in the pause.
          </h2>
        </div>

        {/* Mood Selector */}
        <div className="bg-surface-container-low rounded-xl p-6">
          <p className="text-[0.75rem] uppercase tracking-[0.05em] text-on-secondary-container mb-4 font-label">
            How are you feeling?
          </p>
          <div className="flex justify-between items-center gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`
                  flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all active:scale-95
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
                <span className={`text-[0.75rem] font-medium ${
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
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Training of the Day Card */}
        <div 
          className="md:col-span-8 group relative overflow-hidden rounded-[1.5rem] bg-surface-container-highest aspect-[16/10] md:aspect-auto md:h-[400px] cursor-pointer"
          onClick={() => navigate('/train')}
        >
          <div className="absolute inset-0 opacity-40">
            <img 
              alt="Boxing training" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJZAfUh1faTqrj9L1xUhW_VB1ioq9ma26Bd5pIp-N-ANU5xbd3gz1xZphhhIKQKj53qGfCKpHtmQLLSN3Wypxzv1BSiFLyXqXqi_BXMdgit6rUcLi_mNePdc_HrE3iH4qyv7Mzh7DtK1-niZ2kdgfWfU1IOl43LZmm8rlqQZsf6PVNdO7IC3xKJlKrZ4-6vgyVRdmON-EEpSKufqMdRR7OaQRqkSRnPKfJU8xUrIkHeRXMDAf1vJz_OdA-pGgTVJSQrTJwGj6T_pg" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-[0.7rem] uppercase tracking-wider font-label">
                High Intensity
              </span>
              <span className="text-on-surface-variant font-label text-[0.7rem] uppercase tracking-wider">
                32 MIN
              </span>
            </div>
            <h3 className="text-[1.75rem] font-bold text-on-surface">
              Boxeo & Estabilidad Quads
            </h3>
            <p className="text-on-surface-variant max-w-md text-sm">
              Focused rehabilitation session combining shadow boxing and isometric leg holds to restore resection area strength.
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('/train'); }}
              className="h-16 w-full md:w-auto px-10 bg-primary text-on-primary rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-fixed-dim active:scale-95 transition-all"
            >
              <Icon name="play_arrow" filled />
              START SESSION
            </button>
          </div>
        </div>

        {/* Calm Moment Card */}
        <div 
          className="md:col-span-4 group relative overflow-hidden rounded-[1.5rem] bg-tertiary-container h-[400px] cursor-pointer"
          onClick={() => navigate('/calm')}
        >
          <div className="absolute inset-0 opacity-30">
            <img 
              alt="Meditation" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw6z71jiihL5sw8POoLgvLUkUUirDhZAYG2KpQtBAg_EyiDsk4JA26mkw-A2CqaQ0zPOoAZCGXRTB1kcYOo1frcE1hUcpgfmOlXafWq4rVaDMUxTtfMRpiubzLFBg6QUInWVHGZXwUVDZqmXmJU7FocK0N2lr0pWdUpuAiKVsi_MBxOWlAvHBcR6De53dCu2pG1kBt_c567XIfP1KsqfAjW0z-6DuZ8aZJ6z95wwiyMPXc6OKG5UEL4c0goBARUH7WTDWgPw29EYE" 
            />
          </div>
          <div className="relative h-full flex flex-col justify-between p-8">
            <div>
              <Icon name="self_care" className="text-tertiary text-4xl mb-4" />
              <h3 className="text-[1.5rem] font-bold text-tertiary leading-tight">
                Respiración<br/>Relajante
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-on-tertiary-container/80 text-sm font-medium">
                Reset your nervous system after physical stress. 8 minutes of deep box breathing.
              </p>
              <button className="h-14 w-full glass border border-tertiary/20 text-tertiary rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-tertiary/10 transition-all">
                BREATHE
              </button>
            </div>
          </div>
        </div>

        {/* Progress Insight Card */}
        <div className="md:col-span-12 bg-surface-container-low rounded-[1.5rem] p-8 flex flex-col md:flex-row items-center gap-12">
          {/* Progress Ring */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="84" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="text-tertiary" cx="96" cy="96" fill="transparent" r="84" stroke="currentColor" strokeDasharray="527" strokeDashoffset="132" strokeLinecap="round" strokeWidth="12"></circle>
              <circle className="text-secondary" cx="96" cy="96" fill="transparent" r="64" stroke="currentColor" strokeDasharray="402" strokeDashoffset="80" strokeLinecap="round" strokeWidth="12"></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-on-surface">75%</span>
              <span className="text-[0.6rem] uppercase tracking-widest text-on-surface-variant font-label">
                Weekly Goal
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-6 w-full">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <h4 className="text-xl font-bold">Milestone: Recovery Phase 2</h4>
                <p className="text-on-surface-variant text-sm">
                  You are 3 sessions away from increasing resection load by 5%.
                </p>
              </div>
              <Icon name="auto_graph" className="text-blue-400 text-xl" />
            </div>

            {/* Weekly Activity Bars */}
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className={`w-full ${day.height} ${day.color} rounded-md`}></div>
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
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useAppStore } from '@/lib/stores/appStore';

export function ProgressPage() {
  const { progress, sessions } = useAppStore();
  const [selectedMood, setSelectedMood] = useState<string>('');

  // Calculate stats
  const weeklyData = [
    { day: 'M', height: '40%', isHighlight: false },
    { day: 'T', height: '60%', isHighlight: false },
    { day: 'W', height: '55%', isHighlight: false },
    { day: 'T', height: '85%', isHighlight: true },
    { day: 'F', height: '70%', isHighlight: false },
    { day: 'S', height: '45%', isHighlight: false },
    { day: 'S', height: '30%', isHighlight: false },
  ];

  const readings = [
    {
      id: 1,
      category: 'MINDFULNESS',
      title: 'The Physics of Recovery',
      description: 'Understanding that healing is not linear, but a series of micro-adjustments within the nervous system.',
      readTime: '4 min read',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7zGR1WUjnRBKceynaOYjJ6DT8GEfCD0KQQkSmHSv9OPxDt8McogNwV3qyHORtB3YQSL64Wij97yeuRQuBoyR-_EhhTsibvoPAYG01p2jo6dHdU1gS6Wc5lgYPdkGvQx_BMwazUGyX65LhQ4BamLLKes_WlUPDQ4hybjkdITK0K3bErjmmnpKaVOw_ECgB6Jysmr-t938YJJvi3rZUB4CPm4YjlZCmIP8zY7lduYbSar7KvLLw56_NrEtaJcXxNb-VhnzOJDJ1AF0'
    },
    {
      id: 2,
      category: 'PHYSIOLOGY',
      title: 'Cellular Resilience',
      description: 'How targeted rest periods trigger mitochondrial repair in resected muscle tissue.',
      readTime: '6 min read',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl-fILbg5Cz4EEDYkRZLJ-1BGbKVGvYQWtNAtsr1ogc6s8Ejk2B27ecRnbIRaz1XdcQH8HZvamwY-Bs_UlYH7UTsrcvAkjoliivyp2bRl-PDohqpgmfKSwVlSmtj9zV3p3wLCG-573gnOyzPv9yHv9wbQxs1yIrI037r-6R-QcoyD5vcmXVa420Qm1bIqwnCsmdH3c3vg7GgkZEIH769sZQ0xk3GpATWaurq71xC_Cubf1ihz90oPb6CI7Mm63pBTg0rQpLUQyibk'
    },
    {
      id: 3,
      category: 'PSYCHOLOGY',
      title: 'The Stoic Athlete',
      description: 'Embracing the temporary limitations of the physical body to find mental sovereignty.',
      readTime: '3 min read',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYDk6IjaQnwH8NyXGN2b5cEIGmloRAhQy6HvyEkB0kBGFQ_OkMGt3-LPmvs3xFEk0aYFB1c9t3uHWacn2FewWdxgHMxK6bpxbx0nMKoLXHlHRHEjeUcylFX-a94c3Gqezpqbnb89bVD32r8ZePFqOdSNGesV3GFeodO3ifZ4PBnn73sgBXk8Fmh80XIkef3wNULlt5EiQF2lPJQ-tK4sj7_UupH1t1vlLL9PlmmYvSnR3ECSPrOlzVDAQzaPV9ZN-zWbUskFdJ10M'
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero: Mi Camino Evolution */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8">
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-tertiary mb-2">
            My Evolution
          </p>
          <h2 className="text-[3.5rem] leading-tight font-black tracking-tighter text-on-surface">
            Mi Camino
          </h2>
          <p className="text-on-surface-variant mt-4 leading-relaxed max-w-xl">
            A reflective space for your recovery journey. Track your resilience, celebrate small wins, and find the quiet strength to keep moving forward.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <div className="h-1 w-12 rounded-full bg-tertiary"></div>
            <div className="h-1 w-6 rounded-full bg-surface-container-highest"></div>
            <div className="h-1 w-6 rounded-full bg-surface-container-highest"></div>
          </div>
          <span className="text-[0.75rem] font-medium text-on-surface-variant">
            Day {progress.currentStreak > 0 ? progress.currentStreak : 42} of Recovery
          </span>
        </div>
      </section>

      {/* Bento Grid: Evolution Data */}
      <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {/* Sensation Log Action */}
        <div className="md:col-span-2 lg:col-span-2 bg-surface-container-high rounded-xl p-8 flex flex-col justify-between min-h-[320px]">
          <div>
            <h3 className="text-[1.375rem] font-bold text-on-surface mb-2">Sensation Log</h3>
            <p className="text-on-surface-variant">
              How does your quad feel after today's session?
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
              Log Post-Session Mood
            </button>
          </div>
        </div>

        {/* Feel Chart */}
        <div className="md:col-span-2 lg:col-span-4 bg-surface-container-low rounded-xl p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[1.375rem] font-bold text-on-surface">Weekly Resilience</h3>
              <p className="text-[0.75rem] text-tertiary">Pain Levels vs. Mobility</p>
            </div>
            <div className="text-right">
              <span className="text-[1.75rem] font-black text-secondary">+14%</span>
              <p className="text-[0.75rem] text-on-surface-variant">Progress</p>
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

        {/* Body Composition */}
        <div className="md:col-span-2 lg:col-span-2 bg-surface-container rounded-xl p-8 overflow-hidden relative group">
          <div className="relative z-10">
            <h3 className="text-[1.375rem] font-bold text-on-surface mb-1">Body Composition</h3>
            <p className="text-[0.75rem] text-on-surface-variant mb-6">Stabilizing Post-Surgery</p>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.5rem] font-black text-on-surface">78.4</span>
              <span className="text-[1.375rem] font-medium text-on-surface-variant">kg</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-tertiary">
              <Icon name="trending_down" />
              <span className="text-[1rem] font-medium">-0.8kg this week</span>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
        </div>

        {/* Positive Focus / Gratitude */}
        <div className="md:col-span-2 lg:col-span-4 bg-surface-container-highest rounded-xl p-8 flex items-center gap-8">
          <div className="w-24 h-24 rounded-full border-[12px] border-surface-container flex items-center justify-center border-t-tertiary relative">
            <Icon name="auto_awesome" className="text-tertiary" />
          </div>
          <div className="flex-1">
            <h3 className="text-[1.375rem] font-bold text-on-surface mb-2">Today's Focus</h3>
            <p className="italic text-on-surface-variant leading-relaxed">
              "My quad resection was a point of departure, not an end. Today, I stand taller than I did yesterday."
            </p>
            <p className="text-[0.75rem] text-tertiary mt-4 font-bold tracking-widest uppercase">
              Resilience Score: 92%
            </p>
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-[1.75rem] font-bold text-on-surface">Recovery Library</h2>
            <p className="text-on-surface-variant mt-2">Curated readings for the clinical sanctuary.</p>
          </div>
          <button className="text-secondary font-bold hover:underline flex items-center gap-2">
            View All <Icon name="arrow_forward" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {readings.map((reading) => (
            <article
              key={reading.id}
              className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:bg-surface-container-high transition-colors group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  alt={reading.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={reading.image}
                />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[0.75rem] text-tertiary font-bold tracking-widest uppercase">
                  {reading.category}
                </span>
                <h4 className="text-[1.375rem] font-bold text-on-surface group-hover:text-primary transition-colors">
                  {reading.title}
                </h4>
                <p className="text-on-surface-variant line-clamp-2">
                  {reading.description}
                </p>
                <div className="pt-4 flex items-center gap-2 text-on-surface-variant">
                  <Icon name="schedule" className="text-sm" />
                  <span className="text-[0.75rem]">{reading.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
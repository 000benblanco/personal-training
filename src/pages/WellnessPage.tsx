import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export function WellnessPage() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'wait'>('inhale');

  const meditations = [
    {
      id: 1,
      title: 'Aceptación del Proceso',
      subtitle: 'Voz: Dra. Elena Ruiz • Audio',
      duration: '8 MIN',
      icon: 'headphones',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4SxoD3GYoha1SIsSKVVTURhcrHmSCUzVD796z69ALLgSQEiygOrQ5upkAmCs7p4sOea_xV8cp6v7zBEzYYS8UeiOEkxjB3PTXOj3hAyLKa7q6v16UZ13T5HJw3urhafQ4emi7_PnvptGXbrqiEgRH--DtO43eA7EYIyKKQ0XFu8J96qbzGO1owzccmb86_kI70u1S0chVAIOZt3kZCGgmW3JvkwuhyodJ6Oz0pQZQ7Ui8IBY534fhEZotdF98eCDpJppDtBBnUDg'
    },
    {
      id: 2,
      title: 'Visualización: Caminata en el Bosque',
      subtitle: 'Guía de texto interactiva',
      duration: '5 MIN',
      icon: 'article',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhkrkghq1ynQalplkwJVLQYLXbfE7zot9R2swRVJ2BqBnT1hfHZ8xysKGIYVqoNC8uXshAKO8-aXEECe7Av5d1hZcJ_6xudfJ-lRF-d31_Vs6nrKtNwq6_gUUICKaQXEoWj2KvVVSHkwi6O4jNjXr33DA1Y80tVjIGZ6IM50OjL4uPmtkvfDkaLOeWG7NVjJ7TF5CPS7r6InujbJBRugYMhdEFMNrgQMnLhBPiLjN6XCVz2UwRbzSfNcGUMjV3eXFbjzgl6AJe4sk'
    },
    {
      id: 3,
      title: 'Relajación Profunda',
      subtitle: 'Sonidos binaurales y guía vocal',
      duration: '15 MIN',
      icon: 'headphones',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjNihCKTVYCa9UEA24pm_lLC32k5v3OpD-Kkl3vSWPeRRBMlUIf_t0Qv8ZNAyt6n8Vxpj-GYnLAQ22YIF1Ai8CM1-eNmLDxST69RheLz5nSUWRE72M3ArCfwSYD3Yk1vjTwGiL7IiyL2jN17xbFpCl4A8MKUewdjYoHQBTvYJkmQqlUGzvnK7bNwu1RBy2cDsVUMwuVNPSJpSvG_I2E9iTE-48lxOnI8Xb57ZRDpTqmVkEghaYOV4rQxBuUNBV69Fl7SlTEcQOsCI'
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section: Breathing Guide */}
      <section className="mb-12 bg-surface-container-low rounded-xl p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-l from-secondary to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div>
              <span className="text-tertiary font-label text-[0.75rem] uppercase tracking-[0.2em] font-bold">
                Ejercicio Activo
              </span>
              <h2 className="text-[3.5rem] font-black leading-tight tracking-tighter text-on-surface mt-2">
                Box Breathing
              </h2>
            </div>
            <p className="text-on-surface-variant text-[1rem] leading-relaxed max-w-md">
              Inhala durante 4 segundos, mantén 4, exhala 4 y vuelve a esperar 4. Esta técnica reduce el cortisol y centra tu sistema nervioso.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setIsBreathing(!isBreathing)}
                className="h-[64px] px-8 bg-primary text-on-primary rounded-lg font-bold flex items-center gap-3 active:scale-95 transition-all shadow-lg"
              >
                <Icon name="play_arrow" filled />
                {isBreathing ? 'Pausar' : 'Comenzar Sesión'}
              </button>
              <button className="h-[64px] px-8 bg-surface-container-high text-on-surface rounded-lg font-bold hover:bg-surface-bright transition-colors">
                Configurar
              </button>
            </div>
          </div>

          {/* Breathing Visualizer */}
          <div className="flex justify-center items-center py-12">
            <div className="relative flex justify-center items-center">
              {/* Breathing Circle Animation */}
              <div
                className={cn(
                  'w-48 h-48 rounded-full bg-gradient-to-br from-secondary/40 to-tertiary/40 blur-xl transition-all duration-1000',
                  isBreathing ? 'scale-[1.4]' : 'scale-1'
                )}
              />
              <div className="absolute w-40 h-40 rounded-full border-4 border-secondary/30 flex items-center justify-center">
                <div className={cn(
                  'absolute w-full h-full border-2 border-tertiary rounded-full',
                  isBreathing ? 'animate-ping opacity-20' : ''
                )} />
                <span className="text-secondary font-bold text-2xl">
                  {isBreathing ? '4s' : 'Listo'}
                </span>
              </div>
              {/* Phase Indicators */}
              <div className="absolute -top-12 text-center w-full">
                <span className="text-tertiary font-label text-[0.75rem] uppercase tracking-widest font-bold">
                  {isBreathing ? 'Inhala' : 'Presiona play'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Relaxation & Meditations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Body Scan Guide */}
        <div className="md:col-span-2 bg-surface-container-high rounded-xl p-8 flex flex-col justify-between group cursor-pointer hover:bg-surface-container-highest transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[8rem]">accessibility_new</span>
          </div>
          <div className="relative z-10">
            <span className="text-tertiary font-label text-[0.75rem] uppercase tracking-widest font-bold">
              Relajación Consciente
            </span>
            <h3 className="text-[1.75rem] font-bold text-on-surface mt-2 mb-4">
              Escaneo Corporal Guiado
            </h3>
            <p className="text-on-surface-variant max-w-sm mb-8">
              Libera la tensión acumulada en el cuerpo mediante una atención focalizada.
            </p>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex flex-col">
              <span className="text-[0.75rem] text-outline uppercase font-bold tracking-tighter">Duración</span>
              <span className="text-on-surface font-semibold">12 min</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.75rem] text-outline uppercase font-bold tracking-tighter">Impacto</span>
              <span className="text-tertiary font-semibold">Recuperación Muscular</span>
            </div>
          </div>
        </div>

        {/* Quick Grounding Session */}
        <div className="bg-tertiary-container text-tertiary-fixed rounded-xl p-8 flex flex-col justify-between border border-tertiary/10">
          <div>
            <Icon name="psychology" className="text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Grounding 5-4-3-2-1</h3>
            <p className="text-on-tertiary-container text-sm">
              Técnica rápida para momentos de ansiedad o estrés.
            </p>
          </div>
          <button className="mt-8 py-4 bg-tertiary text-on-tertiary rounded-lg font-bold active:scale-95 transition-transform">
            Iniciar Ahora
          </button>
        </div>
      </div>

      {/* Guided Meditations List */}
      <section className="mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-[1.375rem] font-bold text-on-surface">Biblioteca de Meditación</h3>
            <p className="text-on-surface-variant text-sm mt-1">
              Sesiones diseñadas para tu bienestar mental y físico.
            </p>
          </div>
          <button className="text-secondary font-bold text-sm hover:underline">Ver todo</button>
        </div>

        <div className="space-y-4">
          {meditations.map((meditation) => (
            <div
              key={meditation.id}
              className="flex items-center gap-6 p-4 bg-surface-container-low rounded-xl group hover:bg-surface-container-high transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-lg bg-surface-container-highest flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                <img
                  alt={meditation.title}
                  className="w-full h-full object-cover opacity-60"
                  src={meditation.image}
                />
                <Icon name={meditation.icon} className="absolute text-on-surface" />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-on-surface group-hover:text-secondary transition-colors">
                  {meditation.title}
                </h4>
                <p className="text-sm text-on-surface-variant">{meditation.subtitle}</p>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[0.75rem] text-outline font-bold">{meditation.duration}</span>
                <Icon name="bookmark" className="text-outline group-hover:text-tertiary transition-colors mt-1" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
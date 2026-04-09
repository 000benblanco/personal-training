import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useAppStore } from '@/lib/stores/appStore';
import { getRoutineById, routines } from '@/lib/data/routines';
import { getExerciseById } from '@/lib/data/exercises';
import { cn } from '@/lib/utils';
import type { SessionType, Routine } from '@/types';

export function TrainPage() {
  const { routineId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addSession } = useAppStore();

  const typeParam = searchParams.get('type') as SessionType | null;
  const routine = routineId ? getRoutineById(routineId) : null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRound, setCurrentRound] = useState(3);
  const [totalRounds] = useState(6);
  const [timeRemaining, setTimeRemaining] = useState(165); // 2:45
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const exercises = routine
    ? routine.exercises.map((re) => getExerciseById(re.exerciseId)).filter(Boolean)
    : [];

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsPlaying(false);
      if (currentRound < totalRounds) {
        setCurrentRound((prev) => prev + 1);
        setTimeRemaining(165);
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining, currentRound, totalRounds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = () => {
    setSessionStartTime(new Date());
    setIsPlaying(true);
  };

  const finishSession = () => {
    if (sessionStartTime) {
      const duration = Math.round((new Date().getTime() - sessionStartTime.getTime()) / 60000);
      addSession({
        date: new Date().toISOString(),
        type: routine?.type || typeParam || 'boxing',
        duration,
        exercises: completedExercises,
        feeling: 4,
        energy: 4,
      });
    }
    navigate('/');
  };

  // If no routine selected, show routines list
  if (!routine && !typeParam) {
    return <RoutinesList />;
  }

  // Active Training Session View
  if (routine) {
    return (
      <div className="space-y-12 animate-fade-in">
        {/* Header Section */}
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-secondary text-[0.75rem] uppercase tracking-[0.05em] font-medium font-label">
              Session Active
            </span>
          </div>
          <h1 className="text-[1.75rem] font-bold tracking-tight text-on-surface">
            {routine.title}
          </h1>
          <p className="text-on-surface-variant text-base">
            Boxing & Strength Recovery • Day 14
          </p>
        </header>

        {/* Dynamic Timer Section */}
        <section className="relative overflow-hidden bg-surface-container rounded-xl p-10 flex flex-col items-center justify-center border border-outline-variant/10">
          {/* Ambient glow effects */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[100%] bg-secondary rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-50%] right-[-20%] w-[100%] h-[100%] bg-tertiary rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="text-tertiary font-label text-[0.75rem] uppercase tracking-[0.2em] mb-4">
              Round {currentRound} of {totalRounds}
            </span>
            <div className="text-[3.5rem] md:text-[5rem] font-black tracking-tighter leading-none timer-glow mb-2 text-on-surface"
              style={{ textShadow: '0 0 40px rgba(169, 202, 235, 0.3)' }}
            >
              {formatTime(timeRemaining)}
            </div>
            <div className="flex items-center gap-2 text-secondary mb-10">
              <Icon name="timer" className="text-sm" filled />
              <span className="text-sm font-medium">Work Phase</span>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4 w-full max-w-sm">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 h-16 bg-surface-container-highest text-on-surface rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-bright transition-all active:scale-95"
              >
                <Icon name={isPlaying ? 'pause' : 'play_arrow'} />
                {isPlaying ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={() => {
                  if (currentRound < totalRounds) {
                    setCurrentRound((prev) => prev + 1);
                    setTimeRemaining(165);
                  }
                }}
                className="flex-1 h-16 bg-primary text-on-primary rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-fixed-dim transition-all active:scale-95 shadow-[0_8px_32px_rgba(185,200,222,0.2)]"
              >
                <Icon name="skip_next" />
                Skip
              </button>
            </div>
          </div>
        </section>

        {/* Bento Grid: Routines & Tracker */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Routine Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Personalized Routine</h3>
              <span className="text-sm text-secondary font-medium">
                {exercises.length - currentExerciseIndex} Exercises Left
              </span>
            </div>

            {/* Exercise Cards */}
            {exercises.slice(0, 3).map((exercise, index) => (
              <div
                key={exercise?.id || index}
                className={cn(
                  'p-6 rounded-xl space-y-4 transition-all',
                  index === currentExerciseIndex
                    ? 'bg-surface-container-high'
                    : 'bg-surface-container-low opacity-80'
                )}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-on-surface">{exercise?.name}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {exercise?.description}
                    </p>
                  </div>
                  <span className={cn(
                    'p-3 rounded-lg',
                    index === 0 ? 'bg-primary/10 text-primary' : 
                    index === 1 ? 'bg-tertiary/10 text-tertiary' : 
                    'bg-secondary/10 text-secondary'
                  )}>
                    <Icon name={index === 0 ? 'sports_martial_arts' : index === 1 ? 'fitness_center' : 'exercise'} />
                  </span>
                </div>
                <div className="flex gap-6">
                  <div className="space-y-1">
                    <p className="text-[0.75rem] font-label text-on-surface-variant uppercase tracking-wider">
                      {index === 0 ? 'Duration' : index === 1 ? 'Reps' : 'Weight'}
                    </p>
                    <p className="text-base font-bold">
                      {index === 0 ? '3 x 3:00' : index === 1 ? '15-20 Reps' : '2.5kg / 5lb'}
                    </p>
                  </div>
                  {index !== 2 && (
                    <div className="space-y-1">
                      <p className="text-[0.75rem] font-label text-on-surface-variant uppercase tracking-wider">
                        {index === 0 ? 'Intensity' : 'Sets'}
                      </p>
                      <p className="text-base font-bold text-secondary">
                        {index === 0 ? 'Moderate' : '4 Sets'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobility Tracker Side */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Outdoor Mobility</h3>
            <div className="bg-surface-container-high rounded-xl overflow-hidden">
              <div className="h-48 w-full bg-surface-container-highest relative">
                <img 
                  alt="Map" 
                  className="w-full h-full object-cover opacity-60 grayscale brightness-75" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAurF0L_k9u7qIaaBCbIgUQbUnt0ZlPZqnecZUVDFJf7F_Mv7RPJeK31U2qXTcO_SvWWjMt2zjVZTo4Rw_Bq04X8DcDbJSsUSOalxzF4h5fT-jFxEDckwWZJ6vfJuyr0adDmKzOcPPqNehvoK8hV-ybUbVx-cKHvUiYVVqtMT8FjMBq5yvkt6Wf7RdttCZsKfDh93O8wtR0Wewrt_-KUr0glfedURxeSqNhvbJze0AgzAKKrgdLPlB3SO-BVHkYb4OZEobwNwzlI0c" 
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="bg-surface-dim/80 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface">Tracking</span>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-[0.75rem] font-label text-on-surface-variant uppercase tracking-wider mb-1">Distance</p>
                    <p className="text-2xl font-black">1.2 km</p>
                  </div>
                  <div className="w-px h-10 bg-outline-variant/30"></div>
                  <div className="text-center flex-1">
                    <p className="text-[0.75rem] font-label text-on-surface-variant uppercase tracking-wider mb-1">Pace</p>
                    <p className="text-2xl font-black">14'22"</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Daily Target</span>
                    <span>60%</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full w-[60%]"></div>
                  </div>
                </div>
                <button className="w-full h-14 bg-surface-container-highest border border-outline-variant/20 rounded-lg text-on-surface font-bold flex items-center justify-center gap-2 hover:bg-surface-bright transition-all">
                  <Icon name="explore" />
                  Resume Excursion
                </button>
              </div>
            </div>

            {/* Recovery Insight */}
            <div className="bg-secondary-container p-6 rounded-xl border border-secondary/20">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="healing" className="text-secondary" />
                <h4 className="font-bold text-on-secondary-container">Recovery Insight</h4>
              </div>
              <p className="text-sm text-on-secondary-container/90 leading-relaxed italic">
                "Your cadence during the bag session is 15% more stable today. The quadriceps strain is responding well to the sage-active rest intervals."
              </p>
            </div>
          </div>
        </div>

        {/* Quad-Focus Footer */}
        <div className="fixed bottom-32 left-0 w-full px-6 flex justify-center pointer-events-none">
          <button
            onClick={finishSession}
            className="pointer-events-auto h-16 w-full max-w-md bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Icon name="stop" />
            FINISH WORKOUT
          </button>
        </div>
      </div>
    );
  }

  if (typeParam) {
    return <FilteredRoutines type={typeParam} />;
  }

  return <RoutinesList />;
}

function RoutinesList() {
  const navigate = useNavigate();

  const routinesByWeek: Record<string, { label: string; routines: Routine[] }> = {
    '1-2': { label: 'Semanas 1-2', routines: [] },
    '3-4': { label: 'Semanas 3-4', routines: [] },
    '5-6': { label: 'Semanas 5-6', routines: [] },
    '7-8': { label: 'Semanas 7-8', routines: [] },
    '9-12': { label: 'Semanas 9-12', routines: [] },
  };

  routines.forEach((routine) => {
    const weekRange = routine.weekRange;
    if (weekRange === '1-2') routinesByWeek['1-2'].routines.push(routine);
    else if (weekRange === '3-4') routinesByWeek['3-4'].routines.push(routine);
    else if (weekRange === '5-6') routinesByWeek['5-6'].routines.push(routine);
    else if (weekRange === '7-8') routinesByWeek['7-8'].routines.push(routine);
    else if (weekRange === '9-12') routinesByWeek['9-12'].routines.push(routine);
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Entrenamiento</h1>
        <p className="text-on-surface-variant mt-1">Selecciona tu rutina adaptada</p>
      </div>

      <div className="space-y-8">
        {Object.entries(routinesByWeek).map(([key, { label, routines }]) => (
          routines.length > 0 && (
            <div key={key}>
              <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wide mb-4">{label}</h2>
              <div className="space-y-4">
                {routines.map((routine) => (
                  <div
                    key={routine.id}
                    onClick={() => navigate(`/train/${routine.id}`)}
                    className="bg-surface-container-high rounded-xl p-6 cursor-pointer hover:bg-surface-container-highest transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-on-surface">{routine.title}</h3>
                        <p className="text-sm text-on-surface-variant mt-1">{routine.subtitle}</p>
                      </div>
                      <span className="text-secondary font-medium">{routine.duration} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function FilteredRoutines({ type }: { type: SessionType }) {
  const navigate = useNavigate();

  const filteredRoutines = routines.filter((r) => r.type === type);
  const typeLabels: Record<SessionType, string> = {
    boxing: 'Boxeo',
    strength: 'Fuerza',
    yoga: 'Yoga',
    breathing: 'Respiración',
    wellness: 'Bienestar',
    mixto: 'Mixto',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">{typeLabels[type]}</h1>
        <p className="text-on-surface-variant mt-1">Rutinas disponibles</p>
      </div>

      <div className="space-y-4">
        {filteredRoutines.length > 0 ? (
          filteredRoutines.map((routine) => (
            <div
              key={routine.id}
              onClick={() => navigate(`/train/${routine.id}`)}
              className="bg-surface-container-high rounded-xl p-6 cursor-pointer hover:bg-surface-container-highest transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-on-surface">{routine.title}</h3>
                  <p className="text-sm text-on-surface-variant mt-1">{routine.subtitle}</p>
                </div>
                <span className="text-secondary font-medium">{routine.duration} min</span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-surface-container-high rounded-xl p-8 text-center">
            <Icon name="info" className="w-12 h-12 text-on-surface-variant mx-auto mb-3" />
            <p className="text-on-surface-variant">No hay rutinas disponibles para esta categoría</p>
            <button
              onClick={() => navigate('/train')}
              className="mt-4 h-12 px-6 bg-primary text-on-primary rounded-lg font-bold"
            >
              Ver todas las rutinas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
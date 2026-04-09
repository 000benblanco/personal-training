import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ExerciseCard } from '@/components/features/session/ExerciseCard';
import { TimerDisplay } from '@/components/ui/TimerDisplay';
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

  const [activeSession, setActiveSession] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const exercises = routine
    ? routine.exercises.map((re) => getExerciseById(re.exerciseId)).filter(Boolean)
    : [];

  const startSession = () => {
    setActiveSession(true);
    setSessionStartTime(new Date());
    if (exercises[0]) {
      setTimerSeconds((exercises[0].duration || 3) * 60);
    }
  };

  const handleTimerComplete = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      const nextExercise = exercises[nextIndex];
      if (nextExercise) {
        setTimerSeconds((nextExercise.duration || 3) * 60);
        setIsTimerRunning(false);
      }
    }
  };

  const completeExercise = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
    }
    handleTimerComplete();
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
    setActiveSession(false);
    navigate('/');
  };

  if (!routine && !typeParam) {
    return <RoutinesList />;
  }

  if (activeSession && exercises.length > 0) {
    const currentExercise = exercises[currentExerciseIndex];

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-text-primary">{routine?.title}</h1>
          <span className="text-sm text-text-muted">
            Ejercicio {currentExerciseIndex + 1} de {exercises.length}
          </span>
        </div>

        <Card className="flex flex-col items-center py-8">
          <TimerDisplay
            totalSeconds={timerSeconds}
            remainingSeconds={timerSeconds}
            isRunning={isTimerRunning}
            onPlay={() => setIsTimerRunning(true)}
            onPause={() => setIsTimerRunning(false)}
            onReset={() => setTimerSeconds(timerSeconds)}
            size="lg"
            label={currentExercise?.name}
          />
        </Card>

        {currentExercise && (
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {currentExercise.name}
            </h3>
            <p className="text-text-muted text-sm mb-4">{currentExercise.description}</p>

            <div className="mb-4">
              <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">
                Adaptaciones para tu rodilla
              </h4>
              <ul className="space-y-1">
                {currentExercise.adaptations.map((adaptation, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="text-primary mt-0.5">•</span>
                    {adaptation}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setIsTimerRunning(!isTimerRunning)}>
            {isTimerRunning ? <Icon name="Pause" className="w-4 h-4 mr-2" /> : <Icon name="Play" className="w-4 h-4 mr-2" />}
            {isTimerRunning ? 'Pausar' : 'Continuar'}
          </Button>
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => {
              if (currentExercise) {
                completeExercise(currentExercise.id);
              }
            }}
          >
            Siguiente
            <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <Button variant="danger" className="w-full" onClick={finishSession}>
          Terminar sesión
        </Button>
      </div>
    );
  }

  if (routine) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/train')} className="p-2 hover:bg-surface-elevated rounded-lg">
            <Icon name="ArrowLeft" className="w-5 h-5 text-text-muted" />
          </button>
          <h1 className="text-xl font-semibold text-text-primary">Boxeo</h1>
        </div>

        <SessionCard
          title={routine.title}
          subtitle={routine.subtitle}
          duration={routine.duration}
          type={routine.type}
          difficulty={routine.difficulty}
          isRecommended={true}
          onStart={startSession}
        />

        <div>
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
            Ejercicios
          </h2>
          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <Card key={exercise?.id || index}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-text-primary">{exercise?.name}</h4>
                    <p className="text-xs text-text-muted">
                      {exercise?.duration} min
                      {routine.exercises[index].sets && ` • ${routine.exercises[index].sets} series`}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Entrenamiento</h1>

      <div className="space-y-6">
        {Object.entries(routinesByWeek).map(([key, { label, routines }]) => (
          <div key={key}>
            <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">{label}</h2>
            <div className="space-y-3">
              {routines.map((routine) => (
                <SessionCard
                  key={routine.id}
                  title={routine.title}
                  subtitle={routine.subtitle}
                  duration={routine.duration}
                  type={routine.type}
                  difficulty={routine.difficulty}
                  onStart={() => navigate(`/train/${routine.id}`)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilteredRoutines({ type }: { type: SessionType }) {
  const navigate = useNavigate();

  const filteredRoutines = routines.filter((r) => r.type === type);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary capitalize">{type}</h1>

      <div className="space-y-3">
        {filteredRoutines.map((routine) => (
          <SessionCard
            key={routine.id}
            title={routine.title}
            subtitle={routine.subtitle}
            duration={routine.duration}
            type={routine.type}
            difficulty={routine.difficulty}
            onStart={() => navigate(`/train/${routine.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function SessionCard({
  title,
  subtitle,
  duration,
  type,
  difficulty,
  isRecommended,
  onStart,
}: {
  title: string;
  subtitle: string;
  duration: number;
  type: SessionType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isRecommended?: boolean;
  onStart: () => void;
}) {
  return (
    <Card onClick={onStart} className={cn(isRecommended && 'ring-2 ring-primary/30')}>
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-primary/10 px-3 py-1 rounded-bl-lg">
          <span className="text-xs font-medium text-primary">Recomendado</span>
        </div>
      )}
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <p className="text-sm text-text-muted">{subtitle}</p>
      <p className="text-xs text-text-subtle mt-1">{duration} min • {difficulty}</p>
      <Button className="w-full mt-4" onClick={onStart}>
        Iniciar sesión
      </Button>
    </Card>
  );
}

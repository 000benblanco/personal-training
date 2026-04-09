import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { HomePage } from '@/pages/HomePage';
import { TrainPage } from '@/pages/TrainPage';
import { YogaPage } from '@/pages/YogaPage';
import { BreathingPage } from '@/pages/BreathingPage';
import { WellnessPage } from '@/pages/WellnessPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { SettingsPage } from '@/pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter basename="/personal-training">
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="train" element={<TrainPage />} />
          <Route path="train/:routineId" element={<TrainPage />} />
          <Route path="yoga" element={<YogaPage />} />
          <Route path="breathing" element={<BreathingPage />} />
          <Route path="wellness" element={<WellnessPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

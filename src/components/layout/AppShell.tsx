import { Outlet } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';
import { Sidebar } from './Sidebar';
import { Icon } from '@/components/ui/Icon';

export function AppShell() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Desktop sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile header - glass effect */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4">
            <Icon name="clinical_notes" className="text-blue-400 text-xl" />
            <h1 className="text-xl font-bold tracking-wider text-slate-100">Sanctuary</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/15 overflow-hidden">
            <img 
              alt="User profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpLILgfWSJbmw-_w2o8_bgzf0b01D6D1-DwEIK5g74Y0JUBydVbmeW9K5MBdf-fPyuQSr1sTuXzCJviEmvdoWgmUWxMw_07C4tDEq50Y-gcl57KmkhfEsUxazaGUYPssTMA84clh1M3mJxlczDBHaqb3ZgjSH8R8xochbf_azxcXrMY9Teb318DPhCho-kZVL5HFzv6wyHP7Yp2n9cRQVkfdjAhLk4scnPHDaGUk3N7iqsah17CJTeEwAP1Vfa5LTwmol915HLcRM"
            />
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation - hidden on desktop */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>

      {/* Main content area */}
      <main className="lg:ml-80 pb-24 lg:pb-6 min-h-screen pt-20 lg:pt-6">
        <div className="w-full max-w-5xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
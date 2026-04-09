import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useAppStore } from '@/lib/stores/appStore';

export function SettingsPage() {
  const { settings, updateSettings, userName, setUserName, sessions } = useAppStore();
  const [localName, setLocalName] = useState(userName || settings.name || '');

  const handleSaveName = () => {
    setUserName(localName);
    updateSettings({ name: localName });
  };

  const handleExportData = () => {
    const data = {
      settings,
      sessions,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personal-training-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todos tus datos? Esta acción no se puede deshacer.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary">Ajustes</h1>

      {/* Profile */}
      <Card>
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
          Perfil
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-text-muted mb-2 block">Nombre</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                placeholder="Tu nombre"
                className="flex-1 bg-surface-elevated border border-border rounded-lg px-4 py-2 text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="primary" onClick={handleSaveName}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card>
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
          Preferencias
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-text-muted mb-2 block">Duración preferida de sesión</label>
            <select
              value={settings.preferredDuration}
              onChange={(e) => updateSettings({ preferredDuration: Number(e.target.value) })}
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={10}>10 minutos</option>
              <option value={15}>15 minutos</option>
              <option value={20}>20 minutos</option>
              <option value={25}>25 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={40}>40 minutos</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-primary">Recordatorios</p>
              <p className="text-xs text-text-muted">Recibe un recordatorio diario</p>
            </div>
            <button
              onClick={() => updateSettings({ reminderEnabled: !settings.reminderEnabled })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.reminderEnabled ? 'bg-primary' : 'bg-surface-elevated'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  settings.reminderEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {settings.reminderEnabled && (
            <div>
              <label className="text-sm text-text-muted mb-2 block">Hora del recordatorio</label>
              <input
                type="time"
                value={settings.reminderTime || '09:00'}
                onChange={(e) => updateSettings({ reminderTime: e.target.value })}
                className="bg-surface-elevated border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Data management */}
      <Card>
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
          Gestión de datos
        </h2>
        <div className="space-y-3">
          <Button variant="secondary" className="w-full" onClick={handleExportData}>
            <Icon name="Download" className="w-4 h-4 mr-2" />
            Exportar datos
          </Button>
          <p className="text-xs text-text-subtle text-center">
            Descarga tus datos como archivo JSON para hacer un backup.
          </p>
        </div>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-warning/10 border-warning/30">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" className="w-5 h-5 text-warning mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-text-primary">Aviso médico</h3>
            <p className="text-xs text-text-muted mt-1">
              Esta aplicación no sustituye el consejo médico profesional. Consulta con tu médico o
              fisioterapeuta antes de iniciar cualquier programa de ejercicio. Escucha a tu cuerpo y
              detente si sientes dolor.
            </p>
          </div>
        </div>
      </Card>

      {/* About */}
      <Card>
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
          Sobre la app
        </h2>
        <div className="space-y-2 text-sm text-text-muted">
          <div className="flex justify-between">
            <span>Versión</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Framework</span>
            <span>React + Vite</span>
          </div>
          <div className="flex justify-between">
            <span>Tipo</span>
            <span>PWA (Offline)</span>
          </div>
        </div>
      </Card>

      {/* Reset */}
      <Button variant="danger" className="w-full" onClick={handleResetData}>
        <Icon name="Trash2" className="w-4 h-4 mr-2" />
        Borrar todos los datos
      </Button>
    </div>
  );
}

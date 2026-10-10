import React, { useState } from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  lang: 'es' | 'en';
  currentUser?: { name: string; email: string; role: string } | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  lang,
  currentUser,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userName = currentUser?.name || 'Admin Dispatch';
  const userRole = currentUser?.role || 'Superuser';
  const userEmail = currentUser?.email || 'DouglasVillalobos4@gmail.com';

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/95 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6">
      {/* Search and live status indicator */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="flex items-center gap-2 w-full bg-[#eff4ff] px-3.5 py-2 rounded-lg text-[#3e4a3d] border border-transparent focus-within:border-[#006b2c] focus-within:bg-white transition-all">
          <span className="material-symbols-outlined text-[20px] text-[#565e74]">search</span>
          <input
            className="bg-transparent border-none outline-none w-full text-xs sm:text-sm text-[#0b1c30] placeholder:text-[#565e74]/70"
            placeholder={
              lang === 'es' ? 'Buscar por cliente, VIN, id...' : 'Search by customer, VIN, id...'
            }
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-[#565e74] hover:text-[#0b1c30]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7ffc97]/30 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#006b2c] animate-pulse"></span>
          <span className="text-[11px] text-[#006b2c] font-bold tracking-wide">LIVE</span>
        </div>
      </div>

      {/* Action buttons & User profile */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            aria-label="Notificaciones"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#565e74] hover:bg-[#dce9ff] hover:text-[#0b1c30] transition-colors relative"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0051d5]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#e5eeff] p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#e5eeff] font-semibold text-[#0b1c30]">
                <span>{lang === 'es' ? 'Notificaciones Operativas' : 'Operational Alerts'}</span>
                <span className="text-[10px] bg-[#e5eeff] px-1.5 py-0.5 rounded text-[#0051d5] font-mono">
                  3 Nuevas
                </span>
              </div>
              <div className="space-y-2 mt-2">
                <div className="p-2 bg-[#eff4ff] rounded-lg">
                  <div className="flex items-center justify-between font-semibold text-[#006b2c]">
                    <span>🚗 Lead #428 Aceptado</span>
                    <span className="text-[10px] text-[#565e74]">Hace 12m</span>
                  </div>
                  <p className="text-[11px] text-[#3e4a3d] mt-0.5">
                    Cliente autorizó oferta de $450 en Clayton, NC. Grúa asignada.
                  </p>
                </div>
                <div className="p-2 bg-[#eff4ff] rounded-lg">
                  <div className="flex items-center justify-between font-semibold text-[#0051d5]">
                    <span>👥 Scout Juan Diego</span>
                    <span className="text-[10px] text-[#565e74]">Hace 35m</span>
                  </div>
                  <p className="text-[11px] text-[#3e4a3d] mt-0.5">
                    Entregó 2008 Honda Civic. Comisión de $30.00 pendiente de aprobación.
                  </p>
                </div>
                <div className="p-2 bg-[#fff4e5] rounded-lg">
                  <div className="flex items-center justify-between font-semibold text-[#b45309]">
                    <span>📈 Scrap Index Update</span>
                    <span className="text-[10px] text-[#565e74]">Hoy 08:00 AM</span>
                  </div>
                  <p className="text-[11px] text-[#3e4a3d] mt-0.5">
                    Chatarra ferrosa subió +3.8% en Raleigh-Durham.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Settings */}
        <button
          aria-label="Acciones Rápidas"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#565e74] hover:bg-[#dce9ff] hover:text-[#0b1c30] transition-colors"
          type="button"
          title={lang === 'es' ? 'Ajustes rápidos de despacho' : 'Quick dispatch settings'}
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>

        {/* User profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 pl-2 text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#006b2c] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
            <div className="hidden md:block">
              <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                {userName}
              </span>
              <span className="text-[11px] text-[#565e74] block">{userRole}</span>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#e5eeff] p-2 z-50 text-xs">
              <div className="px-2 py-1.5 font-semibold text-[#0b1c30] border-b border-[#e5eeff]">
                {userName}
                <div className="text-[10px] text-[#565e74] font-mono truncate">{userEmail}</div>
              </div>
              <button
                type="button"
                className="w-full text-left px-2 py-1.5 rounded hover:bg-[#eff4ff] text-[#3e4a3d] mt-1"
              >
                {lang === 'es' ? 'Configuración de Perfil' : 'Profile Settings'}
              </button>
              <button
                type="button"
                className="w-full text-left px-2 py-1.5 rounded hover:bg-[#eff4ff] text-[#3e4a3d]"
              >
                {lang === 'es' ? 'Permisos de Despacho' : 'Dispatch Permissions'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false);
                  onLogout?.();
                }}
                className="w-full text-left px-2 py-1.5 rounded text-red-600 hover:bg-red-50 font-semibold"
              >
                {lang === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

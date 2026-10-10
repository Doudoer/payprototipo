import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: (user: { name: string; email: string; role: string }) => void;
  lang: 'es' | 'en';
  onLangChange: (lang: 'es' | 'en') => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, lang, onLangChange }) => {
  const [email, setEmail] = useState('DouglasVillalobos4@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: email.includes('Douglas') ? 'Douglas Villalobos' : 'Admin Dispatch',
        email,
        role: 'Superuser',
      });
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#0b1c30] text-[#eaf1ff] flex flex-col justify-between relative overflow-hidden select-none">
      {/* Ambient background glows matching design system */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#006b2c]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-[#0051d5]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-[#7ffc97]/10 blur-3xl pointer-events-none"></div>

      {/* Top Bar with Language and Security Badge */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#006b2c] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(22,163,74,0.35)]">
            <span className="material-symbols-outlined text-[22px]">local_shipping</span>
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-tight block leading-tight font-sans">
              PAY4MYJUNK
            </span>
            <span className="font-mono text-xs text-[#7ffc97] block uppercase font-semibold">
              Ops Console V2.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="bg-[#213145]/80 rounded-xl p-1 flex items-center border border-white/10 shadow-sm text-xs">
            <button
              type="button"
              onClick={() => onLangChange('es')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                lang === 'es' ? 'bg-[#006b2c] text-white shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => onLangChange('en')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                lang === 'en' ? 'bg-[#006b2c] text-white shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#7ffc97]">
            <span className="w-2 h-2 rounded-full bg-[#006b2c] animate-pulse"></span>
            <span>RALEIGH-DURHAM GATEWAY</span>
          </div>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-[#213145]/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#7ffc97]/20 text-[#7ffc97] font-mono text-[11px] font-bold uppercase mb-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Acceso de Operaciones</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {lang === 'es' ? 'Iniciar Sesión' : 'Sign In'}
            </h1>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email */}
            <div>
              <label className="block text-white/80 font-semibold mb-1" htmlFor="login-email">
                {lang === 'es' ? 'Correo Corporativo o ID de Despacho' : 'Corporate Email or Dispatch ID'}
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#7ffc97]">
                  badge
                </span>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@radar.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0b1c30] rounded-xl text-xs font-mono text-white outline-none border border-white/10 focus:border-[#006b2c] focus:ring-1 focus:ring-[#006b2c] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-white/80 font-semibold" htmlFor="login-password">
                  {lang === 'es' ? 'Contraseña / Clave de Acceso' : 'Password / Security Key'}
                </label>
                <button
                  type="button"
                  onClick={() => alert('Contacta a Douglas Villalobos o al administrador de sistemas NC.')}
                  className="text-[11px] text-[#7ffc97] hover:underline"
                >
                  {lang === 'es' ? '¿Olvidaste la clave?' : 'Forgot password?'}
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-white/50">
                  key
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#0b1c30] rounded-xl text-xs font-mono text-white outline-none border border-white/10 focus:border-[#006b2c] focus:ring-1 focus:ring-[#006b2c] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-white/50 hover:text-white"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#006b2c] rounded cursor-pointer"
                />
                <span className="text-white/80 text-xs">
                  {lang === 'es' ? 'Mantener sesión iniciada' : 'Keep me signed in'}
                </span>
              </label>
              <span className="text-[11px] text-[#7ffc97] font-mono">256-bit SSL</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs shadow-[0_2px_12px_rgba(0,107,44,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  <span>{lang === 'es' ? 'Autenticando...' : 'Authenticating...'}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>{lang === 'es' ? 'Iniciar Sesión' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full px-6 py-4 text-center text-xs text-white/50 border-t border-white/5">
        <p>
          © 2026 PAY4MYJUNK LLC · NC Salvage Auto Dealer License #NC-77291 · Wake County, Raleigh &amp; Durham Logistics
        </p>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { ScreenId } from '../types';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  lang: 'es' | 'en';
  onLangChange: (lang: 'es' | 'en') => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  lang,
  onLangChange,
  onLogout,
}) => {
  const [cmsOpen, setCmsOpen] = useState(true);

  const isCMS = [
    'hero-section',
    'header-and-logo',
    'beneficios',
    'proceso',
    'preguntas',
    'testimonios',
    'pie-de-pagina',
    'seo-landing',
  ].includes(currentScreen);

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#213145] text-[#eaf1ff] z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#006b2c] flex items-center justify-center text-white shadow-[0_2px_4px_rgba(22,163,74,0.25)]">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <span className="text-[17px] font-bold text-[#eaf1ff] tracking-tight block leading-tight font-sans">
                PAY4MYJUNK
              </span>
              <span className="font-mono text-[11px] text-[#7ffc97] block uppercase font-semibold">
                Ops Console V2.0
              </span>
            </div>
          </div>
        </div>

        {/* Language switcher */}
        <div className="px-5 pb-3">
          <div className="bg-[#0b1c30]/40 rounded-lg p-1 flex items-center justify-between border border-white/5">
            <button
              type="button"
              onClick={() => onLangChange('es')}
              className={`flex-1 py-1 rounded text-xs font-semibold text-center transition-all ${
                lang === 'es'
                  ? 'bg-[#006b2c] text-white shadow-sm'
                  : 'text-[#eaf1ff]/70 hover:text-white'
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => onLangChange('en')}
              className={`flex-1 py-1 rounded text-xs font-semibold text-center transition-all ${
                lang === 'en'
                  ? 'bg-[#006b2c] text-white shadow-sm'
                  : 'text-[#eaf1ff]/70 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3.5 py-2 space-y-1">
          <div className="px-2 py-1">
            <span className="text-[11px] font-semibold text-[#eaf1ff]/60 uppercase tracking-wider">
              {lang === 'es' ? 'Operaciones' : 'Operations'}
            </span>
          </div>

          {/* Cotizaciones & Leads */}
          <button
            type="button"
            onClick={() => onNavigate('cotizaciones-and-leads')}
            className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 rounded-lg transition-all ${
              currentScreen === 'cotizaciones-and-leads'
                ? 'bg-[#00873a] text-white font-semibold shadow-sm'
                : 'text-[#eaf1ff]/80 hover:bg-[#0b1c30]/40 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">request_quote</span>
            <span className="text-sm font-medium">
              {lang === 'es' ? 'Cotizaciones & Leads' : 'Quotes & Leads'}
            </span>
          </button>

          {/* Equipo / Scouts FB */}
          <button
            type="button"
            onClick={() => onNavigate('equipo-scouts-fb')}
            className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 rounded-lg transition-all ${
              currentScreen === 'equipo-scouts-fb'
                ? 'bg-[#00873a] text-white font-semibold shadow-sm'
                : 'text-[#eaf1ff]/80 hover:bg-[#0b1c30]/40 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">groups</span>
            <span className="text-sm font-medium">
              {lang === 'es' ? 'Equipo / Scouts FB' : 'Team / FB Scouts'}
            </span>
          </button>

          {/* Estrategia de Precios */}
          <button
            type="button"
            onClick={() => onNavigate('estrategia-de-precios')}
            className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 rounded-lg transition-all ${
              currentScreen === 'estrategia-de-precios'
                ? 'bg-[#00873a] text-white font-semibold shadow-sm'
                : 'text-[#eaf1ff]/80 hover:bg-[#0b1c30]/40 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span className="text-sm font-medium">
              {lang === 'es' ? 'Estrategia de Precios' : 'Pricing Strategy'}
            </span>
          </button>

          {/* Perfil de Empresa */}
          <button
            type="button"
            onClick={() => onNavigate('perfil-de-empresa')}
            className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 rounded-lg transition-all ${
              currentScreen === 'perfil-de-empresa'
                ? 'bg-[#00873a] text-white font-semibold shadow-sm'
                : 'text-[#eaf1ff]/80 hover:bg-[#0b1c30]/40 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">domain</span>
            <span className="text-sm font-medium">
              {lang === 'es' ? 'Perfil de Empresa' : 'Company Profile'}
            </span>
          </button>

          {/* Brain AI Engine */}
          <button
            type="button"
            onClick={() => onNavigate('brain-ai-engine')}
            className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 rounded-lg transition-all ${
              currentScreen === 'brain-ai-engine'
                ? 'bg-[#00873a] text-white font-semibold shadow-sm'
                : 'text-[#eaf1ff]/80 hover:bg-[#0b1c30]/40 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            <span className="text-sm font-medium">Brain AI Engine</span>
          </button>

          {/* Marketing & CMS Header */}
          <div className="pt-4 pb-1 px-2">
            <span className="text-[11px] font-semibold text-[#eaf1ff]/60 uppercase tracking-wider">
              {lang === 'es' ? 'Marketing & CMS' : 'Marketing & CMS'}
            </span>
          </div>

          {/* CMS Folder */}
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => setCmsOpen(!cmsOpen)}
              className={`flex items-center justify-between w-full px-3.5 py-2 rounded-lg text-left transition-all ${
                isCMS
                  ? 'text-white font-semibold'
                  : 'text-[#eaf1ff]/80 hover:bg-[#0b1c30]/30 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">web</span>
                <span className="text-sm">Editor CMS Landing</span>
              </div>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200">
                {cmsOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {cmsOpen && (
              <div className="pl-7 space-y-0.5 border-l border-white/10 ml-4 py-1">
                {[
                  { id: 'header-and-logo', label: 'Header & Logo' },
                  { id: 'hero-section', label: 'Hero Section' },
                  { id: 'beneficios', label: lang === 'es' ? 'Beneficios' : 'Benefits' },
                  { id: 'proceso', label: lang === 'es' ? 'Proceso' : 'Process' },
                  { id: 'preguntas', label: lang === 'es' ? 'Preguntas' : 'FAQ' },
                  { id: 'testimonios', label: lang === 'es' ? 'Testimonios' : 'Testimonials' },
                  { id: 'pie-de-pagina', label: lang === 'es' ? 'Pie de Página' : 'Footer' },
                  { id: 'seo-landing', label: 'SEO Landing' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id as ScreenId)}
                    className={`block w-full text-left px-3 py-1.5 rounded text-xs transition-all ${
                      currentScreen === item.id
                        ? 'bg-[#00873a] text-white font-semibold shadow-sm'
                        : 'text-[#eaf1ff]/70 hover:bg-[#0b1c30]/40 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Logout button */}
      <div className="p-3.5 border-t border-white/10">
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-lg text-[#eaf1ff]/70 hover:bg-[#ffdad6]/20 hover:text-[#ffdad6] transition-colors text-sm font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>{lang === 'es' ? 'Cerrar Sesión' : 'Sign Out'}</span>
        </button>
      </div>
    </aside>
  );
};

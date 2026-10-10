import React, { useState } from 'react';
import { HeroCMSConfig } from '../types';

interface HeroCMSViewProps {
  cmsConfig: Record<'es' | 'en', HeroCMSConfig>;
  onUpdateConfig: (lang: 'es' | 'en', newConfig: HeroCMSConfig) => void;
  lang: 'es' | 'en';
  onLangChange: (lang: 'es' | 'en') => void;
}

export const HeroCMSView: React.FC<HeroCMSViewProps> = ({
  cmsConfig,
  onUpdateConfig,
  lang,
  onLangChange,
}) => {
  const currentConfig = cmsConfig[lang];
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [isPublishing, setIsPublishing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Wizard simulation inside the preview canvas
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [wizardYear, setWizardYear] = useState('2012');
  const [wizardMake, setWizardMake] = useState('Honda');
  const [wizardModel, setWizardModel] = useState('Civic');
  const [wizardRuns, setWizardRuns] = useState(true);
  const [wizardTitle, setWizardTitle] = useState(true);
  const [wizardZip, setWizardZip] = useState('27604');
  const [wizardCalculatedOffer, setWizardCalculatedOffer] = useState<number | null>(null);

  const updateField = <K extends keyof HeroCMSConfig>(key: K, value: HeroCMSConfig[K]) => {
    onUpdateConfig(lang, {
      ...currentConfig,
      [key]: value,
    });
  };

  const handleReset = () => {
    const defaultConfig: HeroCMSConfig =
      lang === 'es'
        ? {
            badge: 'COMPRAMOS MODELOS 2014 Y ANTERIORES',
            title1: 'Compramos tu Auto Viejo o Chocado',
            highlight: 'Hoy Mismo.',
            highlightColor: '#006B2C',
            subtitle:
              'Sin importar su condición. Recogida gratis en tu ubicación. Recibe el pago el mismo día, sin complicaciones ni trámites lentos.',
            badge1: 'Pago inmediato',
            badge1Enabled: true,
            badge2: 'Grúa gratis',
            badge2Enabled: true,
            ctaWizard: 'Continuar',
            ctaHeader: 'Obtén Cotización',
            conversionRate: '18.4% (+2.1% esta semana)',
            lastDeploy: 'Hoy, 10:42 AM',
          }
        : {
            badge: 'WE BUY VEHICLES 2014 AND OLDER',
            title1: 'We Buy Your Junk or Crashed Car',
            highlight: 'Today.',
            highlightColor: '#006B2C',
            subtitle:
              'No matter the condition. Free towing pickup right at your location. Instant same-day payout with no paperwork hassles.',
            badge1: 'Instant cash payout',
            badge1Enabled: true,
            badge2: 'Free towing included',
            badge2Enabled: true,
            ctaWizard: 'Continue',
            ctaHeader: 'Get Instant Quote',
            conversionRate: '18.4% (+2.1% this week)',
            lastDeploy: 'Today, 10:42 AM',
          };
    onUpdateConfig(lang, defaultConfig);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3800);
    }, 700);
  };

  const handleWizardNext = () => {
    if (wizardStep === 1) {
      setWizardStep(2);
    } else if (wizardStep === 2) {
      setWizardStep(3);
    } else {
      // Calculate
      let offer = 420;
      if (!wizardRuns) offer -= 60;
      if (!wizardTitle) offer -= 80;
      setWizardCalculatedOffer(offer);
    }
  };

  return (
    <div className="flex flex-col w-full pb-16 relative">
      {/* Top Command Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-[#006b2c] font-bold uppercase tracking-wider">
              CMS STUDIO / SECCIÓN HERO
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7ffc97]/40 text-[#005320] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006b2c] animate-pulse"></span>
              Producción Conectada
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0b1c30] tracking-tight">
            Personalización de Contenido: Hero Section
          </h1>
          <p className="text-xs text-[#565e74] mt-0.5">
            Ajusta textos, llamados a la acción y visualiza en tiempo real los cambios para la conversión de leads.
          </p>
        </div>

        {/* Actions & Language Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Language Pill Switcher */}
          <div className="bg-[#eff4ff] rounded-xl p-1 flex items-center shadow-sm border border-[#e5eeff]">
            <button
              type="button"
              onClick={() => onLangChange('es')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                lang === 'es' ? 'bg-white text-[#006b2c] shadow-sm' : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              <span className="text-sm">🇲🇽</span> Español (ES)
            </button>
            <button
              type="button"
              onClick={() => onLangChange('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                lang === 'en' ? 'bg-white text-[#006b2c] shadow-sm' : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              <span className="text-sm">🇺🇸</span> English (EN)
            </button>
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#565e74] hover:text-[#0b1c30] text-xs font-semibold transition-colors flex items-center gap-1.5 border border-[#e5eeff]"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Deshacer</span>
          </button>

          {/* Publish button */}
          <button
            type="button"
            disabled={isPublishing}
            onClick={handlePublish}
            className="px-4 py-2 rounded-xl bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 disabled:opacity-60"
          >
            <span className={`material-symbols-outlined text-[18px] ${isPublishing ? 'animate-spin' : ''}`}>
              {isPublishing ? 'refresh' : 'cloud_sync'}
            </span>
            <span>{isPublishing ? 'Guardando...' : 'Publicar Cambios en Web'}</span>
          </button>
        </div>
      </div>

      {/* Dual-Pane CMS Layout (Form on Left + Live Canvas on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Form Fields & Settings (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Card: Main Headline & Microcopy */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e5eeff]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#7ffc97]/40 flex items-center justify-center text-[#006b2c]">
                  <span className="material-symbols-outlined text-[18px]">title</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#0b1c30]">Copia &amp; Encabezados</h2>
                  <span className="font-mono text-[10px] text-[#565e74] font-semibold">ELEMENTOS PRINCIPALES</span>
                </div>
              </div>
              <span className="text-[11px] text-[#006b2c] font-bold">100% VISIBLE</span>
            </div>

            <div className="space-y-4">
              {/* Badge Pill Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-[#0b1c30] font-bold" htmlFor="input-badge">
                    Insignia Superior (Top Badge)
                  </label>
                  <span className="font-mono text-[10px] text-[#565e74]">ID: badge_hero</span>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#006b2c]">sell</span>
                  <input
                    id="input-badge"
                    type="text"
                    value={currentConfig.badge}
                    onChange={(e) => updateField('badge', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#eff4ff] rounded-lg text-xs text-[#0b1c30] outline-none focus:bg-white focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                  />
                </div>
                <p className="text-[11px] text-[#565e74] mt-1">Texto que aparece como pill translúcido sobre el título.</p>
              </div>

              {/* Title 1 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-[#0b1c30] font-bold" htmlFor="input-title1">
                    Título Principal
                  </label>
                  <span className="font-mono text-[10px] text-[#565e74]">ID: hero_title_1</span>
                </div>
                <input
                  id="input-title1"
                  type="text"
                  value={currentConfig.title1}
                  onChange={(e) => updateField('title1', e.target.value)}
                  className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs text-[#0b1c30] outline-none focus:bg-white focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                />
              </div>

              {/* Title Highlight */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-[#0b1c30] font-bold" htmlFor="input-title-highlight">
                    Frase Resaltada (Callout Color)
                  </label>
                  <span className="font-mono text-[10px] text-[#565e74]">ID: hero_title_highlight</span>
                </div>
                <div className="flex gap-2">
                  <input
                    id="input-title-highlight"
                    type="text"
                    value={currentConfig.highlight}
                    onChange={(e) => updateField('highlight', e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#eff4ff] rounded-lg text-xs font-bold text-[#006b2c] outline-none focus:bg-white focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                  />
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#eff4ff] rounded-lg border border-[#e5eeff]">
                    <span className="w-4 h-4 rounded-full bg-[#006b2c] inline-block"></span>
                    <span className="font-mono text-[11px] text-[#565e74] font-semibold">{currentConfig.highlightColor}</span>
                  </div>
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-[#0b1c30] font-bold" htmlFor="input-subtitle">
                    Subtítulo Descriptivo
                  </label>
                  <span className="font-mono text-[10px] text-[#565e74]">ID: hero_description</span>
                </div>
                <textarea
                  id="input-subtitle"
                  rows={3}
                  value={currentConfig.subtitle}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs text-[#0b1c30] outline-none focus:bg-white focus:ring-2 focus:ring-[#006b2c] transition-all resize-none border border-[#e5eeff]"
                />
              </div>
            </div>
          </div>

          {/* Card: Trust Badges & Call to Action */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e5eeff]">
            <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-[#eff4ff]">
              <div className="w-8 h-8 rounded-lg bg-[#dae2fd] flex items-center justify-center text-[#131b2e]">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#0b1c30]">Garantías &amp; Acción Rápida</h2>
                <span className="font-mono text-[10px] text-[#565e74] font-semibold">CONVERSIÓN INMEDIATA</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Badge 1: Pago Inmediato */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff]">
                <div className="flex items-center gap-2.5 flex-1 mr-2">
                  <span className="material-symbols-outlined text-[#006b2c] text-[20px]">check_circle</span>
                  <div className="flex-1">
                    <label className="text-[11px] text-[#565e74] block font-semibold" htmlFor="input-badge1">
                      Garantía 1
                    </label>
                    <input
                      id="input-badge1"
                      type="text"
                      value={currentConfig.badge1}
                      onChange={(e) => updateField('badge1', e.target.value)}
                      className="bg-transparent text-xs text-[#0b1c30] font-semibold outline-none w-full"
                    />
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentConfig.badge1Enabled}
                    onChange={(e) => updateField('badge1Enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-[#d3e4fe] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006b2c]"></div>
                </label>
              </div>

              {/* Badge 2: Grúa Gratis */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff]">
                <div className="flex items-center gap-2.5 flex-1 mr-2">
                  <span className="material-symbols-outlined text-[#006b2c] text-[20px]">check_circle</span>
                  <div className="flex-1">
                    <label className="text-[11px] text-[#565e74] block font-semibold" htmlFor="input-badge2">
                      Garantía 2
                    </label>
                    <input
                      id="input-badge2"
                      type="text"
                      value={currentConfig.badge2}
                      onChange={(e) => updateField('badge2', e.target.value)}
                      className="bg-transparent text-xs text-[#0b1c30] font-semibold outline-none w-full"
                    />
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentConfig.badge2Enabled}
                    onChange={(e) => updateField('badge2Enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-[#d3e4fe] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006b2c]"></div>
                </label>
              </div>

              {/* CTA Config */}
              <div className="pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#0b1c30] font-bold block mb-1" htmlFor="input-cta-text">
                      Texto Botón Cotizador
                    </label>
                    <input
                      id="input-cta-text"
                      type="text"
                      value={currentConfig.ctaWizard}
                      onChange={(e) => updateField('ctaWizard', e.target.value)}
                      className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs text-[#0b1c30] font-semibold outline-none focus:bg-white focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#0b1c30] font-bold block mb-1" htmlFor="input-cta-header">
                      Texto CTA Header
                    </label>
                    <input
                      id="input-cta-header"
                      type="text"
                      value={currentConfig.ctaHeader}
                      onChange={(e) => updateField('ctaHeader', e.target.value)}
                      className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs text-[#0b1c30] font-semibold outline-none focus:bg-white focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live SEO / Analytics Micro-Widget */}
          <div className="bg-[#eff4ff] rounded-xl p-4 flex items-center justify-between border border-[#e5eeff]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#565e74] text-[22px]">analytics</span>
              <div>
                <span className="text-xs text-[#0b1c30] block font-bold">Tasa Estimada de Conversión Hero</span>
                <span className="font-mono text-xs text-[#006b2c] font-bold">{currentConfig.conversionRate}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006b2c]"></span>
              <span className="text-xs text-[#565e74] font-semibold">A/B Activo</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Live Landing Page Mockup (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-2.5 sticky top-20">
          {/* Device Viewport Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#213145] rounded-t-xl text-[#eaf1ff]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#7ffc97]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#dbe1ff]"></span>
              <span className="font-mono text-xs opacity-60 ml-2">https://pay4myjunkcar.com/</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#7ffc97] uppercase tracking-wider font-bold flex items-center gap-1 font-mono">
                <span className="material-symbols-outlined text-[15px]">visibility</span> Live Canvas
              </span>
              <div className="flex items-center gap-1 bg-white/10 rounded-md p-0.5">
                <button
                  type="button"
                  aria-label="Desktop"
                  onClick={() => setDeviceView('desktop')}
                  className={`p-1 rounded transition-colors ${
                    deviceView === 'desktop' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
                </button>
                <button
                  type="button"
                  aria-label="Mobile"
                  onClick={() => setDeviceView('mobile')}
                  className={`p-1 rounded transition-colors ${
                    deviceView === 'mobile' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">smartphone</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preview Canvas Simulation Container */}
          <div
            className={`relative w-full rounded-b-xl overflow-hidden shadow-2xl bg-[#0b1c30] select-none transition-all duration-300 ${
              deviceView === 'mobile' ? 'max-w-[400px] mx-auto border-4 border-[#213145]' : ''
            }`}
          >
            {/* Mock Nav Header from Public Landing */}
            <div className="w-full bg-white/95 backdrop-blur-md px-5 py-3 flex items-center justify-between z-20 relative border-b border-black/5">
              {/* Logo */}
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#006b2c] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">attach_money</span>
                </div>
                <span className="text-base font-extrabold text-[#0b1c30] tracking-tighter">
                  PAY4MYJUNK<span className="text-[#006b2c] font-normal">CAR</span>
                </span>
              </div>

              {/* Links */}
              {deviceView === 'desktop' && (
                <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-[#565e74]">
                  <span className="hover:text-[#006b2c] cursor-pointer">¿Cómo Funciona?</span>
                  <span className="hover:text-[#006b2c] cursor-pointer">Preguntas</span>
                  <div className="flex items-center gap-1 text-[#0b1c30] font-bold">
                    <span className="material-symbols-outlined text-[#006b2c] text-[14px]">call</span>
                    <span>(984) 274 0781</span>
                  </div>
                </div>
              )}

              {/* Public Header CTA */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold shadow-sm transition-all"
                >
                  {currentConfig.ctaHeader}
                </button>
                <span className="text-xs">{lang === 'es' ? '🇲🇽' : '🇺🇸'}</span>
              </div>
            </div>

            {/* Hero Section Body with Background Image */}
            <div
              className="relative w-full min-h-[460px] flex items-center p-6 md:p-8 bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBseMIvx28kJirJ78APOb8WVTNta7N8ZrFoX59fM-kRdZEQEP_AAyBV0oStQOvAk21ZWKHDazEYTzSupYy2UzRPmu9A7R0Lolv0i9qfJYt5_D_IjNFuQX4DIk8GVnnHnnyGnaKU_ovULRaCRIyOJsq7GKTYMshfJE4FLwXjWh4OFRFR8DRKdGnHUovImDy3IdlFhHkwSG1loQiBfSYFipVDO9ksCnogtLh3JlojwCR4B5KzY49JEBa1yQ')",
              }}
            >
              {/* Gradient Scrim for readable high-contrast text */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/95 via-[#0b1c30]/80 to-[#0b1c30]/40 z-0"></div>

              {/* 2-Column Landing Hero Grid Inside Preview */}
              <div
                className={`relative z-10 w-full grid gap-6 items-center ${
                  deviceView === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'
                }`}
              >
                {/* Left Copy Preview */}
                <div className={`${deviceView === 'mobile' ? '' : 'md:col-span-7'} flex flex-col items-start text-white`}>
                  {/* Dynamic Top Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#006b2c]/30 backdrop-blur-md text-[#7ffc97] font-mono text-[11px] font-bold tracking-wide uppercase mb-3 border border-[#7ffc97]/30">
                    {currentConfig.badge}
                  </div>

                  {/* Main Title Preview */}
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight mb-2">
                    <span>{currentConfig.title1}</span>
                    <span className="text-[#7ffc97] block">{currentConfig.highlight}</span>
                  </h1>

                  {/* Subtitle Preview */}
                  <p className="text-xs sm:text-sm text-[#eff4ff]/90 max-w-md mb-4 leading-relaxed">
                    {currentConfig.subtitle}
                  </p>

                  {/* Trust Indicators Preview */}
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    {currentConfig.badge1Enabled && (
                      <div className="flex items-center gap-1.5 text-white text-xs">
                        <span className="material-symbols-outlined text-[#7ffc97] text-[18px]">verified</span>
                        <span className="font-semibold">{currentConfig.badge1}</span>
                      </div>
                    )}
                    {currentConfig.badge2Enabled && (
                      <div className="flex items-center gap-1.5 text-white text-xs">
                        <span className="material-symbols-outlined text-[#7ffc97] text-[18px]">verified</span>
                        <span className="font-semibold">{currentConfig.badge2}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Interactive 3-Step Valuation Wizard Preview */}
                <div className={`${deviceView === 'mobile' ? 'w-full' : 'md:col-span-5 w-full'}`}>
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/40">
                    <div className="text-center mb-3">
                      <h3 className="text-sm font-bold text-[#0b1c30]">
                        {lang === 'es' ? 'Obtén tu Oferta Instantánea' : 'Get Instant Cash Quote'}
                      </h3>
                      <div className="flex justify-center items-center gap-3 mt-1 text-[11px]">
                        <span className={`font-bold ${wizardStep === 1 ? 'text-[#006b2c]' : 'text-[#565e74]'}`}>
                          1. {lang === 'es' ? 'VEHÍCULO' : 'VEHICLE'}
                        </span>
                        <span className={`font-bold ${wizardStep === 2 ? 'text-[#006b2c]' : 'text-[#565e74]'}`}>
                          2. {lang === 'es' ? 'ESTADO' : 'CONDITION'}
                        </span>
                        <span className={`font-bold ${wizardStep === 3 ? 'text-[#006b2c]' : 'text-[#565e74]'}`}>
                          3. {lang === 'es' ? 'CONTACTO' : 'CONTACT'}
                        </span>
                      </div>
                    </div>

                    {/* Wizard Progress Indicator */}
                    <div className="flex items-center justify-between relative mb-4 px-2">
                      <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#e5eeff] z-0"></div>
                      <button
                        type="button"
                        onClick={() => setWizardStep(1)}
                        className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold z-10 shadow-sm transition-colors ${
                          wizardStep >= 1 ? 'bg-[#006b2c] text-white' : 'bg-[#e5eeff] text-[#565e74]'
                        }`}
                      >
                        1
                      </button>
                      <button
                        type="button"
                        onClick={() => setWizardStep(2)}
                        className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold z-10 shadow-sm transition-colors ${
                          wizardStep >= 2 ? 'bg-[#006b2c] text-white' : 'bg-[#e5eeff] text-[#565e74]'
                        }`}
                      >
                        2
                      </button>
                      <button
                        type="button"
                        onClick={() => setWizardStep(3)}
                        className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold z-10 shadow-sm transition-colors ${
                          wizardStep >= 3 ? 'bg-[#006b2c] text-white' : 'bg-[#e5eeff] text-[#565e74]'
                        }`}
                      >
                        3
                      </button>
                    </div>

                    {wizardStep === 1 && (
                      <>
                        <div className="flex items-center justify-between mb-3 px-1 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#7ffc97]"></div>
                            <span className="font-mono font-semibold text-[#565e74] uppercase">Ingresar VIN</span>
                          </div>
                          <span className="font-mono text-[#006b2c] cursor-pointer hover:underline">
                            O buscar manual
                          </span>
                        </div>

                        {/* Fake Select Fields */}
                        <div className="space-y-2 mb-4">
                          <div className="grid grid-cols-3 gap-1.5">
                            <div>
                              <span className="text-[10px] text-[#565e74] block mb-0.5">Año</span>
                              <select
                                value={wizardYear}
                                onChange={(e) => setWizardYear(e.target.value)}
                                className="w-full bg-[#eff4ff] px-2 py-1.5 rounded-lg text-xs font-semibold text-[#0b1c30] outline-none"
                              >
                                <option>2014</option>
                                <option>2012</option>
                                <option>2008</option>
                                <option>2005</option>
                                <option>1999</option>
                              </select>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#565e74] block mb-0.5">Marca</span>
                              <select
                                value={wizardMake}
                                onChange={(e) => setWizardMake(e.target.value)}
                                className="w-full bg-[#eff4ff] px-2 py-1.5 rounded-lg text-xs font-semibold text-[#0b1c30] outline-none"
                              >
                                <option>Honda</option>
                                <option>Toyota</option>
                                <option>Ford</option>
                                <option>Chevrolet</option>
                                <option>Dodge</option>
                              </select>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#565e74] block mb-0.5">Modelo</span>
                              <select
                                value={wizardModel}
                                onChange={(e) => setWizardModel(e.target.value)}
                                className="w-full bg-[#eff4ff] px-2 py-1.5 rounded-lg text-xs font-semibold text-[#0b1c30] outline-none"
                              >
                                <option>Civic</option>
                                <option>Accord</option>
                                <option>Prius</option>
                                <option>Cruze</option>
                                <option>F-150</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {wizardStep === 2 && (
                      <div className="space-y-2 mb-4 text-xs">
                        <span className="text-[11px] text-[#565e74] font-semibold block mb-1">
                          ¿En qué estado se encuentra el vehículo?
                        </span>
                        <label className="flex items-center justify-between p-2 rounded-lg bg-[#eff4ff] cursor-pointer">
                          <span>¿El motor enciende y camina?</span>
                          <input
                            type="checkbox"
                            checked={wizardRuns}
                            onChange={(e) => setWizardRuns(e.target.checked)}
                            className="accent-[#006b2c]"
                          />
                        </label>
                        <label className="flex items-center justify-between p-2 rounded-lg bg-[#eff4ff] cursor-pointer">
                          <span>¿Tiene título de propiedad limpio?</span>
                          <input
                            type="checkbox"
                            checked={wizardTitle}
                            onChange={(e) => setWizardTitle(e.target.checked)}
                            className="accent-[#006b2c]"
                          />
                        </label>
                      </div>
                    )}

                    {wizardStep === 3 && (
                      <div className="space-y-2 mb-4 text-xs">
                        <span className="text-[11px] text-[#565e74] font-semibold block mb-1">
                          Ingresa tu ubicación para recogida:
                        </span>
                        <div>
                          <label className="text-[10px] text-[#565e74] block mb-0.5">Código Postal / ZIP</label>
                          <input
                            type="text"
                            value={wizardZip}
                            onChange={(e) => setWizardZip(e.target.value)}
                            className="w-full bg-[#eff4ff] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0b1c30] outline-none"
                            placeholder="27604"
                          />
                        </div>
                        {wizardCalculatedOffer !== null && (
                          <div className="p-2.5 rounded-xl bg-[#7ffc97]/30 border border-[#006b2c]/30 text-center">
                            <span className="text-[10px] text-[#005320] font-bold block uppercase">
                              Oferta Calculada Estimada
                            </span>
                            <span className="text-xl font-extrabold text-[#006b2c]">
                              ${wizardCalculatedOffer.toFixed(2)} USD
                            </span>
                            <span className="text-[10px] text-[#005320] block mt-0.5">
                              Grúa gratis incluida en Wake County
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Wizard CTA Button */}
                    <button
                      type="button"
                      onClick={handleWizardNext}
                      className="w-full py-2.5 rounded-xl bg-[#213145] hover:bg-[#0b1c30] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all"
                    >
                      <span>
                        {wizardStep === 3 ? (wizardCalculatedOffer ? 'Solicitar Grúa' : 'Calcular Oferta') : currentConfig.ctaWizard}
                      </span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom preview ribbon */}
            <div className="w-full bg-[#e5eeff] px-4 py-2.5 flex items-center justify-between text-[#565e74] text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#006b2c]">done_all</span>
                <span className="text-[11px]">Sincronizado con versión de despliegue V2.0</span>
              </div>
              <span className="font-mono text-[11px] text-[#0b1c30] font-semibold">
                {deviceView === 'desktop' ? 'VIEWPORT: 1440 × 600 PX' : 'VIEWPORT: 390 × 844 PX'}
              </span>
            </div>
          </div>

          {/* Quick Triage Information Panel below Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e5eeff] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#7ffc97]/30 flex items-center justify-center text-[#006b2c]">
                <span className="material-symbols-outlined text-[20px]">speed</span>
              </div>
              <div>
                <span className="text-[11px] text-[#565e74] block">Tiempo de Carga</span>
                <span className="text-base text-[#0b1c30] font-bold">0.82s</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e5eeff] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#dae2fd] flex items-center justify-center text-[#565e74]">
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </div>
              <div>
                <span className="text-[11px] text-[#565e74] block">Hero Asset Status</span>
                <span className="text-base text-[#006b2c] font-bold">Optimizado</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e5eeff] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#0051d5]">
                <span className="material-symbols-outlined text-[20px]">published_with_changes</span>
              </div>
              <div>
                <span className="text-[11px] text-[#565e74] block">Último Despliegue</span>
                <span className="font-mono text-xs text-[#0b1c30] font-bold">{currentConfig.lastDeploy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#213145] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-bounce">
          <div className="w-7 h-7 rounded-full bg-[#006b2c] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[18px]">check</span>
          </div>
          <div>
            <span className="text-xs font-bold block">¡Cambios publicados con éxito!</span>
            <span className="text-[11px] opacity-80 block">La página de inicio se ha actualizado en el CDN.</span>
          </div>
        </div>
      )}
    </div>
  );
};

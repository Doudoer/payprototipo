import React, { useState, useMemo } from 'react';
import { PricingConfig } from '../types';

interface PreciosViewProps {
  pricingConfig: PricingConfig;
  onUpdatePricing: (config: PricingConfig) => void;
  lang: 'es' | 'en';
}

export const PreciosView: React.FC<PreciosViewProps> = ({
  pricingConfig,
  onUpdatePricing,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'bids' | 'margins' | 'rules'>('bids');
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  // Form local state
  const [config, setConfig] = useState<PricingConfig>(pricingConfig);

  // Simulator test lead conditions
  const [chkNoStart, setChkNoStart] = useState(true);
  const [chkFlatTires, setChkFlatTires] = useState(true);
  const [chkAirbags, setChkAirbags] = useState(false);
  const [chkBodyDamage, setChkBodyDamage] = useState(false);
  const [chkNoTitle, setChkNoTitle] = useState(false);

  const BASE_VEHICLE_VAL = 450.0;

  // Simulator calculation
  const simCalc = useMemo(() => {
    let totalDeductions = 0;

    // 1. Motor no arranca (% of baseline)
    const noStartAmt = chkNoStart ? BASE_VEHICLE_VAL * (config.engineFailPct / 100) : 0;
    totalDeductions += noStartAmt;

    // 2. Llantas desinfladas
    const flatTiresAmt = chkFlatTires ? config.flatTiresFee : 0;
    totalDeductions += flatTiresAmt;

    // 3. Airbags
    const airbagsAmt = chkAirbags ? config.airbagsFee : 0;
    totalDeductions += airbagsAmt;

    // 4. Carrocería (simulated 2 panels)
    const bodyDamageAmt = chkBodyDamage ? config.bodyDamagePerPanelFee * 2 : 0;
    totalDeductions += bodyDamageAmt;

    // 5. Sin título
    const noTitleAmt = chkNoTitle ? config.noTitleFee : 0;
    totalDeductions += noTitleAmt;

    let offer = BASE_VEHICLE_VAL - totalDeductions;
    const isGuaranteeApplied = offer < config.guaranteedMin;
    if (isGuaranteeApplied) {
      offer = config.guaranteedMin;
    }

    return {
      noStartAmt,
      flatTiresAmt,
      airbagsAmt,
      bodyDamageAmt,
      noTitleAmt,
      totalDeductions,
      isGuaranteeApplied,
      finalOffer: offer,
    };
  }, [config, chkNoStart, chkFlatTires, chkAirbags, chkBodyDamage, chkNoTitle]);

  const handleSave = () => {
    onUpdatePricing(config);
    setShowSaveAlert(true);
    setTimeout(() => {
      setShowSaveAlert(false);
    }, 3800);
  };

  const handleResetSim = () => {
    setChkNoStart(true);
    setChkFlatTires(true);
    setChkAirbags(false);
    setChkBodyDamage(false);
    setChkNoTitle(false);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Bar / Breadcrumb & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-[#565e74] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Operaciones</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006b2c]">
              Estrategia de Precios
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0b1c30] flex items-center gap-2.5">
            <span>Configuración de Bids &amp; Algoritmo de Valuación</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7ffc97] text-[#002109] font-mono text-[11px] font-bold">
              ENGINE V2.4
            </span>
          </h1>
        </div>

        {/* Navigation Pills & Save Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#eff4ff] p-1 rounded-xl flex items-center gap-1 shadow-sm border border-[#e5eeff]">
            <button
              type="button"
              onClick={() => setActiveTab('bids')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'bids'
                  ? 'bg-white text-[#006b2c] shadow-sm'
                  : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">payments</span>
              <span>Bids &amp; Service Area</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('margins')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'margins'
                  ? 'bg-white text-[#006b2c] shadow-sm'
                  : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">percent</span>
              <span>Márgenes de Beneficio</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rules')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'rules'
                  ? 'bg-white text-[#006b2c] shadow-sm'
                  : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">rule</span>
              <span>Reglas Automáticas</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {showSaveAlert && (
        <div className="mb-5 p-4 rounded-xl bg-[#7ffc97] text-[#002109] flex items-center justify-between shadow-sm animate-pulse border border-[#006b2c]/20">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#006b2c] text-[20px]">check_circle</span>
            <span className="text-xs sm:text-sm font-bold">
              Parámetros de deducción actualizados exitosamente en tiempo real.
            </span>
          </div>
          <span className="font-mono text-xs font-semibold">Sincronizado con FB Scouts Engine</span>
        </div>
      )}

      {/* Main Asymmetric Layout: Form Engine (7 cols) + Live Simulator & Stats (5 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* LEFT PANEL: Core Condition Discounts Form */}
        <div className="xl:col-span-7 flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5eeff] p-5">
            {/* Section Header */}
            <div className="flex items-start justify-between pb-4 mb-4 bg-[#eff4ff] -mx-5 -mt-5 p-5 rounded-t-2xl border-b border-[#e5eeff]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006b2c] animate-ping"></span>
                  <h2 className="text-sm font-bold text-[#0b1c30]">
                    Cargos por Daño y Condición (Descuentos y Ajustes de Oferta)
                  </h2>
                </div>
                <p className="text-xs text-[#565e74]">
                  Configura las deducciones aplicadas automáticamente a la cotización instantánea según el estado del vehículo declarado por el cliente.
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#7ffc97] flex items-center justify-center text-[#006b2c] shrink-0">
                <span className="material-symbols-outlined text-[22px]">tune</span>
              </div>
            </div>

            {/* Form Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input 1: Motor no arranca */}
              <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col justify-between border border-[#e5eeff]">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#0b1c30] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#565e74] text-[16px]">no_crash</span>
                    Motor no arranca (%)
                  </label>
                  <span className="material-symbols-outlined text-[#565e74] text-[16px] cursor-help" title="Deducción porcentual sobre base de mercado">
                    info
                  </span>
                </div>
                <div className="relative flex items-center mt-1">
                  <input
                    type="number"
                    step="0.5"
                    value={config.engineFailPct}
                    onChange={(e) => setConfig({ ...config, engineFailPct: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white rounded-lg py-2 pl-3.5 pr-8 font-mono text-sm text-[#0b1c30] outline-none focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                  />
                  <span className="absolute right-3 font-mono text-[#565e74] font-bold text-xs">%</span>
                </div>
                <span className="text-[11px] text-[#565e74] mt-1">Impacto relativo sobre base de mercado.</span>
              </div>

              {/* Input 2: Llantas desinfladas */}
              <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col justify-between border border-[#e5eeff]">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#0b1c30] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#565e74] text-[16px]">tire_repair</span>
                    Llantas desinfladas ($)
                  </label>
                  <span className="material-symbols-outlined text-[#565e74] text-[16px] cursor-help" title="Costo logístico de grúa plana">
                    info
                  </span>
                </div>
                <div className="relative flex items-center mt-1">
                  <span className="absolute left-3.5 font-mono text-[#565e74] font-bold text-xs">$</span>
                  <input
                    type="number"
                    step="1"
                    value={config.flatTiresFee}
                    onChange={(e) => setConfig({ ...config, flatTiresFee: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white rounded-lg py-2 pl-8 pr-3.5 font-mono text-sm text-[#0b1c30] outline-none focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                  />
                </div>
                <span className="text-[11px] text-[#565e74] mt-1">Recargo por logística de grúa adicional.</span>
              </div>

              {/* Input 3: Airbags rotos */}
              <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col justify-between border border-[#e5eeff]">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#0b1c30] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#565e74] text-[16px]">warning</span>
                    Airbags rotos / activados ($)
                  </label>
                  <span className="material-symbols-outlined text-[#565e74] text-[16px] cursor-help" title="Descuento directo por sistema SRS detonado">
                    info
                  </span>
                </div>
                <div className="relative flex items-center mt-1">
                  <span className="absolute left-3.5 font-mono text-[#565e74] font-bold text-xs">$</span>
                  <input
                    type="number"
                    step="1"
                    value={config.airbagsFee}
                    onChange={(e) => setConfig({ ...config, airbagsFee: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white rounded-lg py-2 pl-8 pr-3.5 font-mono text-sm text-[#0b1c30] outline-none focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                  />
                </div>
                <span className="text-[11px] text-[#565e74] mt-1">Pérdida de valor en reventa de partes.</span>
              </div>

              {/* Input 4: Daño de motor visual */}
              <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col justify-between border border-[#e5eeff]">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#0b1c30] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#565e74] text-[16px]">build</span>
                    Daño motor visual ($)
                  </label>
                  <span className="material-symbols-outlined text-[#565e74] text-[16px] cursor-help" title="Fugas mayores o partes faltantes">
                    info
                  </span>
                </div>
                <div className="relative flex items-center mt-1">
                  <span className="absolute left-3.5 font-mono text-[#565e74] font-bold text-xs">$</span>
                  <input
                    type="number"
                    step="1"
                    value={config.engineDamageFee}
                    onChange={(e) => setConfig({ ...config, engineDamageFee: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white rounded-lg py-2 pl-8 pr-3.5 font-mono text-sm text-[#0b1c30] outline-none focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                  />
                </div>
                <span className="text-[11px] text-[#565e74] mt-1">Bloque roto o piezas clave removidas.</span>
              </div>

              {/* Input 5: Daño carrocería por panel */}
              <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col justify-between border border-[#e5eeff]">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#0b1c30] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#565e74] text-[16px]">minor_crash</span>
                    Daño carrocería (por panel) ($)
                  </label>
                  <span className="material-symbols-outlined text-[#565e74] text-[16px] cursor-help" title="Multiplicado por cantidad de paneles abollados">
                    info
                  </span>
                </div>
                <div className="relative flex items-center mt-1">
                  <span className="absolute left-3.5 font-mono text-[#565e74] font-bold text-xs">$</span>
                  <input
                    type="number"
                    step="1"
                    value={config.bodyDamagePerPanelFee}
                    onChange={(e) => setConfig({ ...config, bodyDamagePerPanelFee: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white rounded-lg py-2 pl-8 pr-3.5 font-mono text-sm text-[#0b1c30] outline-none focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                  />
                </div>
                <span className="text-[11px] text-[#565e74] mt-1">Abolladuras severas o choques estructurales.</span>
              </div>

              {/* Input 6: Sin título de propiedad con advertencia */}
              <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col justify-between border border-[#e5eeff]">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#0b1c30] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#565e74] text-[16px]">description</span>
                    Sin título de propiedad ($)
                  </label>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
                    LEGAL NC
                  </div>
                </div>
                <div className="relative flex items-center mt-1">
                  <span className="absolute left-3.5 font-mono text-[#565e74] font-bold text-xs">$</span>
                  <input
                    type="number"
                    step="1"
                    value={config.noTitleFee}
                    onChange={(e) => setConfig({ ...config, noTitleFee: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white rounded-lg py-2 pl-8 pr-3.5 font-mono text-sm text-[#0b1c30] outline-none focus:ring-2 focus:ring-[#006b2c] transition-all border border-[#e5eeff]"
                  />
                </div>
                <div className="flex items-center justify-between mt-2 pt-1">
                  <span className="text-[11px] text-[#565e74]">Exigir Declaración Notariada</span>
                  <input
                    type="checkbox"
                    checked={config.requireNotary}
                    onChange={(e) => setConfig({ ...config, requireNotary: e.target.checked })}
                    className="w-4 h-4 accent-[#006b2c] rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Highlighted Input: Oferta Mínima Garantizada */}
            <div className="mt-4 p-5 rounded-xl bg-[#eff4ff] shadow-sm relative overflow-hidden border border-[#e5eeff]">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#7ffc97]/20 blur-xl pointer-events-none"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="max-w-md">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#006b2c] text-white text-[10px] mb-2 uppercase tracking-wide font-bold">
                    Garantía Base de Adquisición
                  </div>
                  <h3 className="text-base font-bold text-[#0b1c30]">Oferta Mínima Garantizada ($)</h3>
                  <p className="text-xs text-[#565e74] mt-1 leading-relaxed">
                    Piso base legal y comercial que garantiza la promesa de marca: ningún auto elegible recibe una cotización menor a este monto, sin importar el desgaste severo o scrap neto.
                  </p>
                </div>
                <div className="w-full md:w-56">
                  <div className="relative flex items-center bg-white rounded-xl p-1 shadow-sm border border-[#e5eeff]">
                    <span className="pl-3 text-2xl text-[#006b2c] font-bold font-mono">$</span>
                    <input
                      type="number"
                      step="5"
                      value={config.guaranteedMin}
                      onChange={(e) => setConfig({ ...config, guaranteedMin: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-transparent py-2 px-2 text-2xl text-[#006b2c] font-extrabold outline-none text-right font-mono"
                    />
                    <span className="pr-3 font-mono text-[#565e74] text-xs font-bold">USD</span>
                  </div>
                  <span className="block text-right text-[11px] text-[#565e74] mt-1">
                    Umbral Payout Cash Inmediato
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Valuation Benchmark Widget */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5eeff] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006b2c]">
                  <span className="material-symbols-outlined text-[18px]">show_chart</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0b1c30]">
                    Curva de Depreciación y Retención de Scrap
                  </h4>
                  <p className="text-xs text-[#565e74]">
                    Comportamiento en adquisiciones recientes de Clayton NC &amp; Wake County
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-[#565e74] font-semibold">Últimos 30 días</span>
            </div>

            {/* Inline SVG Visualization Chart */}
            <div className="w-full bg-[#eff4ff] rounded-xl p-4 flex flex-col gap-2 border border-[#e5eeff]">
              <div className="flex justify-between items-center text-[#565e74] text-xs">
                <span className="font-semibold">Volumen Bids: 248 emitidos</span>
                <span className="text-[#006b2c] font-bold">Tasa de Aceptación: 68.4%</span>
              </div>
              <svg className="w-full h-28 overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 600 100">
                <defs>
                  <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#006b2c" stopOpacity="0.25"></stop>
                    <stop offset="100%" stopColor="#006b2c" stopOpacity="0.0"></stop>
                  </linearGradient>
                </defs>
                <line stroke="#bdcaba" strokeDasharray="3 3" strokeOpacity="0.3" x1="0" x2="600" y1="20" y2="20"></line>
                <line stroke="#bdcaba" strokeDasharray="3 3" strokeOpacity="0.3" x1="0" x2="600" y1="50" y2="50"></line>
                <line stroke="#bdcaba" strokeDasharray="3 3" strokeOpacity="0.3" x1="0" x2="600" y1="80" y2="80"></line>
                <path
                  d="M 0,75 C 60,70 120,40 180,45 C 240,50 300,20 360,25 C 420,30 480,15 540,18 L 600,10 L 600,100 L 0,100 Z"
                  fill="url(#chartGrad)"
                ></path>
                <path
                  d="M 0,75 C 60,70 120,40 180,45 C 240,50 300,20 360,25 C 420,30 480,15 540,18 L 600,10"
                  fill="none"
                  stroke="#006b2c"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
                <circle cx="360" cy="25" fill="#006b2c" r="4" className="animate-pulse"></circle>
                <circle cx="600" cy="10" fill="#006b2c" r="4"></circle>
              </svg>
              <div className="flex justify-between items-center text-[#565e74] font-mono text-[10px] mt-1">
                <span>Sem 1 ($240 avg)</span>
                <span>Sem 2 ($290 avg)</span>
                <span>Sem 3 ($315 avg)</span>
                <span className="text-[#006b2c] font-bold">Sem 4 ($385 avg)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Live Simulator Card (Interactive Sandbox) */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-20 border border-[#e5eeff]">
            {/* Header of Simulator */}
            <div className="bg-[#213145] p-5 text-[#eaf1ff]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7ffc97] animate-ping"></span>
                  <span className="text-xs uppercase tracking-wider text-[#7ffc97] font-mono font-bold">
                    Simulador en Vivo
                  </span>
                </div>
                <span className="font-mono text-[11px] bg-white/10 px-2 py-0.5 rounded text-white/80">
                  SANDBOX TEST
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight text-white">
                Calculadora de Prueba de Cotización
              </h3>
              <p className="text-xs text-white/70 mt-1">
                Prueba cómo interactúan los parámetros configurados frente a un caso real de lead entrante.
              </p>
            </div>

            {/* Vehicle Baseline Banner with Image & Meta */}
            <div className="p-4 bg-[#eff4ff] border-b border-[#e5eeff]">
              <div className="flex items-center gap-3">
                <div className="w-20 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 bg-white">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu054m4SPidUmHbNAPUY9xm2NcIsTnPN88opqUZcybarF1M1nKi_ri66ynjMPNd74b9CEVbaamZRMxD0J5-ZRnRiefMjAg3IeKMlg0xaIei7jEot6XfdpC3uP2ErZEa_8WMlWGkc7WQkqqeU1pDbhdtmDS7IW2WPZgj67d5DahHJi3L-i_ehCrlLUASFm1bhSVASiSoiiUhSDkXGSZi0p95P71B88HebDY3sFuz8mCpsiO-w-kbHyWNA"
                    alt="2008 Honda Civic EX"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-[#006b2c]/10 text-[#006b2c] px-2 py-0.5 rounded-full font-bold">
                      VEHÍCULO MUESTRA
                    </span>
                    <span className="font-mono text-[11px] text-[#565e74]">VIN: 2HGFG...8821</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0b1c30] truncate mt-0.5">2008 Honda Civic EX</h4>
                  <div className="flex items-center gap-2 text-[#565e74] text-xs">
                    <span>Base scrap de mercado:</span>
                    <span className="font-mono font-bold text-[#0b1c30]">${BASE_VEHICLE_VAL.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Checklist of Conditions */}
            <div className="p-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs text-[#565e74] uppercase tracking-wider font-bold">
                  Simular Condiciones del Cliente:
                </span>
                <button
                  type="button"
                  onClick={handleResetSim}
                  className="text-xs text-[#0051d5] hover:underline font-semibold"
                >
                  Restablecer
                </button>
              </div>

              {/* Checkbox 1 */}
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors cursor-pointer border border-[#e5eeff]">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={chkNoStart}
                    onChange={(e) => setChkNoStart(e.target.checked)}
                    className="w-4 h-4 accent-[#006b2c] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#0b1c30] font-bold">Motor no arranca</span>
                    <span className="text-[10px] text-[#565e74]">Deducción porcentual ({config.engineFailPct}%)</span>
                  </div>
                </div>
                <span
                  className={`font-mono text-xs font-bold ${
                    chkNoStart ? 'text-[#ba1a1a]' : 'text-[#565e74]'
                  }`}
                >
                  {chkNoStart ? `-$${simCalc.noStartAmt.toFixed(2)}` : '$0.00'}
                </span>
              </label>

              {/* Checkbox 2 */}
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors cursor-pointer border border-[#e5eeff]">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={chkFlatTires}
                    onChange={(e) => setChkFlatTires(e.target.checked)}
                    className="w-4 h-4 accent-[#006b2c] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#0b1c30] font-bold">Llantas desinfladas</span>
                    <span className="text-[10px] text-[#565e74]">Recargo grúa plana</span>
                  </div>
                </div>
                <span
                  className={`font-mono text-xs font-bold ${
                    chkFlatTires ? 'text-[#ba1a1a]' : 'text-[#565e74]'
                  }`}
                >
                  {chkFlatTires ? `-$${simCalc.flatTiresAmt.toFixed(2)}` : '$0.00'}
                </span>
              </label>

              {/* Checkbox 3 */}
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors cursor-pointer border border-[#e5eeff]">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={chkAirbags}
                    onChange={(e) => setChkAirbags(e.target.checked)}
                    className="w-4 h-4 accent-[#006b2c] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#0b1c30] font-bold">Airbags rotos / activados</span>
                    <span className="text-[10px] text-[#565e74]">SRS desplegado</span>
                  </div>
                </div>
                <span
                  className={`font-mono text-xs font-bold ${
                    chkAirbags ? 'text-[#ba1a1a]' : 'text-[#565e74]'
                  }`}
                >
                  {chkAirbags ? `-$${simCalc.airbagsAmt.toFixed(2)}` : '$0.00'}
                </span>
              </label>

              {/* Checkbox 4 */}
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors cursor-pointer border border-[#e5eeff]">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={chkBodyDamage}
                    onChange={(e) => setChkBodyDamage(e.target.checked)}
                    className="w-4 h-4 accent-[#006b2c] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#0b1c30] font-bold">Daño carrocería (2 paneles)</span>
                    <span className="text-[10px] text-[#565e74]">Guardafangos + Puerta</span>
                  </div>
                </div>
                <span
                  className={`font-mono text-xs font-bold ${
                    chkBodyDamage ? 'text-[#ba1a1a]' : 'text-[#565e74]'
                  }`}
                >
                  {chkBodyDamage ? `-$${simCalc.bodyDamageAmt.toFixed(2)}` : '$0.00'}
                </span>
              </label>

              {/* Checkbox 5 */}
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors cursor-pointer border border-[#e5eeff]">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={chkNoTitle}
                    onChange={(e) => setChkNoTitle(e.target.checked)}
                    className="w-4 h-4 accent-[#006b2c] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#0b1c30] font-bold">Sin título de propiedad</span>
                    <span className="text-[10px] text-[#565e74]">Requiere trámite NC DMV</span>
                  </div>
                </div>
                <span
                  className={`font-mono text-xs font-bold ${
                    chkNoTitle ? 'text-[#ba1a1a]' : 'text-[#565e74]'
                  }`}
                >
                  {chkNoTitle ? `-$${simCalc.noTitleAmt.toFixed(2)}` : '$0.00'}
                </span>
              </label>
            </div>

            {/* Calculation Breakdown Summary */}
            <div className="p-4 bg-[#dce9ff] flex flex-col gap-2 border-t border-[#e5eeff]">
              <div className="flex justify-between items-center text-xs text-[#565e74]">
                <span>Valor Inicial Estimado:</span>
                <span className="font-mono text-[#0b1c30] font-semibold">${BASE_VEHICLE_VAL.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#565e74]">
                <span>Total Deducciones por Estado:</span>
                <span className="font-mono text-[#ba1a1a] font-bold">-${simCalc.totalDeductions.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#565e74]">
                <span>Ajuste por Garantía Mínima:</span>
                <span
                  className={`font-mono font-bold ${
                    simCalc.isGuaranteeApplied ? 'text-[#006b2c]' : 'text-[#565e74]'
                  }`}
                >
                  {simCalc.isGuaranteeApplied
                    ? `Aplicada Base ($${config.guaranteedMin.toFixed(2)})`
                    : `No requerida (>${config.guaranteedMin.toFixed(2)})`}
                </span>
              </div>

              {/* Total Result Big Banner */}
              <div className="mt-1 p-3.5 rounded-xl bg-[#006b2c] text-white flex items-center justify-between shadow-md">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider block text-white/80">
                    Oferta Instantánea al Cliente
                  </span>
                  <span className="text-2xl font-black font-mono leading-none">
                    ${simCalc.finalOffer.toFixed(2)}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#565e74] mt-1 font-semibold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#006b2c]">local_shipping</span>
                  Recogida con grúa gratis incluida
                </span>
                <span className="font-mono text-[#006b2c] font-bold">Payout en Efectivo</span>
              </div>
            </div>
          </div>

          {/* Quick Operator Dispatch Tips */}
          <div className="bg-[#eff4ff] rounded-2xl p-4 flex items-start gap-3 shadow-sm border border-[#e5eeff]">
            <span className="material-symbols-outlined text-[#006b2c] text-[24px] mt-0.5">lightbulb</span>
            <div>
              <h5 className="text-xs font-bold text-[#0b1c30]">Regla de Oro en Compras Scrap</h5>
              <p className="text-xs text-[#565e74] mt-0.5 leading-relaxed">
                Mantener la oferta mínima en ${config.guaranteedMin.toFixed(2)} incrementa la conversión de llamadas en 42% frente a la competencia de Raleigh y Clayton, asegurando volumen para los camiones de ruta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Lead } from '../types';

interface ScoutPortalViewProps {
  onRegisterLead: (lead: Lead) => void;
  onBackToConsole: () => void;
  userName?: string;
  lang?: 'es' | 'en';
}

export const ScoutPortalView: React.FC<ScoutPortalViewProps> = ({
  onRegisterLead,
  onBackToConsole,
  userName = 'Douglas Villalobos',
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'nueva' | 'procesados'>('nueva');
  const [processedFilter, setProcessedFilter] = useState<'todas' | 'activas' | 'canceladas'>('todas');

  // Stepper: 1 | 2 | 3
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Vehicle state
  const [isVinMode, setIsVinMode] = useState(false);
  const [vinInput, setVinInput] = useState('1J4PP2GK5BW556327');
  const [year, setYear] = useState('2012');
  const [make, setMake] = useState('HONDA');
  const [model, setModel] = useState('Civic');
  const [bodyType, setBodyType] = useState('Sedan Compacto / Mediano');
  const [classifiedType, setClassifiedType] = useState('SEDAN (MEDIUM)');

  // Step 2: Condition state
  const [runs, setRuns] = useState(true);
  const [hasTitle, setHasTitle] = useState(true);
  const [goodTires, setGoodTires] = useState(true);
  const [mileageRange, setMileageRange] = useState('100k - 150k Millas');

  // Step 3: Contact state
  const [sellerName, setSellerName] = useState('Cliente de demostracion');
  const [sellerPhone, setSellerPhone] = useState('(919) 555-0100');
  const [sellerZip, setSellerZip] = useState('27704');

  // Offer calculation state
  const [calculatedOffer, setCalculatedOffer] = useState<number | null>(null);
  const [manualOffer, setManualOffer] = useState<number>(300);
  const [copiedFbText, setCopiedFbText] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  // Scout personal leads tracking
  const [myLeads, setMyLeads] = useState<Lead[]>([
    {
      id: '#431',
      phone: '(125) 888-6699',
      zip: '27604',
      city: 'Raleigh',
      vehicle: '1999 HONDA Accord',
      bodyType: 'Sedan (Large)',
      specs: 'Título Limpio · Llaves OK',
      channel: 'Scout FB',
      validation: 'VIN Verificado',
      offer: 305.0,
      tierName: 'Payout Autorizado',
      status: 'Agenda',
      dateCreated: 'Hace 1 hora',
      scoutName: userName,
      customerName: 'Manuel D.',
      vin: '1HGCD5634WA091244',
    },
  ]);

  // Decode VIN mock
  const handleDecodeVin = () => {
    if (vinInput.toUpperCase().includes('1J4')) {
      setYear('2011');
      setMake('JEEP');
      setModel('Grand Cherokee');
      setBodyType('SUV / Crossover');
      setClassifiedType('SUV (FULL)');
    } else {
      setYear('2012');
      setMake('HONDA');
      setModel('Civic');
      setBodyType('Sedan Compacto / Mediano');
      setClassifiedType('SEDAN (MEDIUM)');
    }
  };

  // Calculate live offer
  const handleCalculateOffer = () => {
    let base = 310;
    if (year === '2014') base = 350;
    if (year === '2008') base = 280;
    if (year === '2005' || year === '1999') base = 260;

    let deductions = 0;
    if (!runs) deductions += 40;
    if (!hasTitle) deductions += 60;
    if (!goodTires) deductions += 20;
    if (mileageRange.includes('100k - 150k')) deductions += 10;
    if (mileageRange.includes('150k - 200k') || mileageRange.includes('> 200k')) deductions += 25;

    const finalVal = Math.max(150, base - deductions);
    setCalculatedOffer(finalVal);
    setManualOffer(finalVal);
  };

  // Copy Facebook message to clipboard
  const handleCopyFbResponse = () => {
    const offerVal = manualOffer || calculatedOffer || 300;
    const msg = `¡Hola ${sellerName}! Gracias por tu mensaje. Para tu ${year} ${make} ${model}, podemos ofrecerte $${offerVal} en efectivo con recogida de grúa completamente gratis hoy mismo en tu ubicación (${sellerZip}). ¿A qué hora te quedaría cómodo que pase la grúa?`;
    navigator.clipboard.writeText(msg);
    setCopiedFbText(true);
    setTimeout(() => setCopiedFbText(false), 3000);
  };

  // Register and submit accepted offer
  const handleRegisterAndSubmit = () => {
    const offerVal = manualOffer || calculatedOffer || 300;
    const newLead: Lead = {
      id: `#${Math.floor(440 + Math.random() * 50)}`,
      phone: sellerPhone,
      city: 'Durham',
      zip: sellerZip,
      vehicle: `${year} ${make} ${model}`,
      bodyType: classifiedType,
      specs: `${runs ? 'Arranca' : 'No arranca'} · ${hasTitle ? 'Con título' : 'Sin título'} · ${goodTires ? 'Llantas ok' : 'Ponchadas'}`,
      channel: 'Scout FB',
      validation: isVinMode && vinInput ? 'VIN Verificado' : 'Falta VIN',
      offer: offerVal,
      tierName: 'Scout FB Directo',
      status: 'Aceptadas',
      dateCreated: 'Recién registrada',
      scoutName: userName,
      customerName: sellerName,
      vin: isVinMode ? vinInput : '',
    };

    onRegisterLead(newLead);
    setMyLeads((prev) => [newLead, ...prev]);
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setStep(1);
      setCalculatedOffer(null);
      setActiveTab('procesados');
    }, 1800);
  };

  // Filter processed leads
  const filteredProcessed = useMemo(() => {
    if (processedFilter === 'todas') return myLeads;
    if (processedFilter === 'activas') return myLeads.filter((l) => l.status !== 'Cancelado');
    if (processedFilter === 'canceladas') return myLeads.filter((l) => l.status === 'Cancelado');
    return myLeads;
  }, [myLeads, processedFilter]);

  return (
    <div className="min-h-screen bg-[#070e17] text-[#eaf1ff] p-4 sm:p-6 lg:p-8 select-none font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ba1a1a] flex items-center justify-center text-white font-black text-sm shadow-md">
              FB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {userName}
                </h1>
                <span className="px-2 py-0.5 rounded bg-[#00873a]/30 text-[#62df7d] font-mono text-[11px] font-bold uppercase tracking-wider">
                  SCOUT AGENT
                </span>
              </div>
              <p className="text-xs text-white/60">
                Generador de Prospectos Facebook &amp; Comisiones
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {}}
              className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 border border-white/10"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              <span>Actualizar</span>
            </button>
            <button
              type="button"
              onClick={onBackToConsole}
              className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 border border-white/10"
              title="Volver al panel general de operaciones"
            >
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
              <span>Volver a Dispatch</span>
            </button>
          </div>
        </header>

        {/* 4 KPI Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="rounded-xl bg-[#0f1926] p-5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-white/70 text-xs font-semibold">
              <span className="uppercase tracking-wider text-[11px]">Leads Cotizados</span>
              <span className="material-symbols-outlined text-[#0051d5] text-[18px]">person</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white font-mono">{myLeads.length}</span>
              <span className="block text-xs text-white/50 mt-1">Cotizaciones en Facebook</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-[#0f1926] p-5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-white/70 text-xs font-semibold">
              <span className="uppercase tracking-wider text-[11px]">Vehículos Recogidos</span>
              <span className="material-symbols-outlined text-white/70 text-[18px]">local_shipping</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white font-mono">
                {myLeads.filter((l) => l.status === 'Completado').length}
              </span>
              <span className="block text-xs text-white/50 mt-1">Autos comprados</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-[#0f1926] p-5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-white/70 text-xs font-semibold">
              <span className="uppercase tracking-wider text-[11px]">Saldo por Cobrar</span>
              <span className="material-symbols-outlined text-amber-500 text-[18px]">attach_money</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-amber-400 font-mono">
                ${(myLeads.filter((l) => l.status !== 'Completado').length * 30).toFixed(2)}
              </span>
              <span className="block text-xs text-white/50 mt-1">Comisiones pendientes de pago</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl bg-[#0f1926] p-5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-white/70 text-xs font-semibold">
              <span className="uppercase tracking-wider text-[11px]">Pagado Este Mes</span>
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">$0.00</span>
              <span className="block text-xs text-white/50 mt-1">Se reinicia cada mes</span>
            </div>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-white/10 pb-0 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab('nueva')}
            className={`pb-3 flex items-center gap-2 transition-all ${
              activeTab === 'nueva'
                ? 'border-b-2 border-red-600 text-red-500'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Nueva Cotización Facebook</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('procesados')}
            className={`pb-3 flex items-center gap-2 transition-all ${
              activeTab === 'procesados'
                ? 'border-b-2 border-red-600 text-red-500'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>Mis Leads Procesados ({myLeads.length})</span>
          </button>
        </div>

        {/* Tab 1: Nueva Cotización Facebook */}
        {activeTab === 'nueva' && (
          <div className="space-y-6">
            {/* Main Wizard Card */}
            <div className="rounded-2xl bg-[#0f1926] border border-white/10 p-6 sm:p-7 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Cotizador de Facebook Marketplace
                  </h2>
                  <p className="text-xs text-white/60 mt-0.5">
                    Ingresa los datos proporcionados por el vendedor para generar la oferta formal
                  </p>
                </div>
                <span className="material-symbols-outlined text-amber-400 text-[24px]">auto_awesome</span>
              </div>

              {/* 3-Step Horizontal Stepper */}
              <div className="bg-[#070e17] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold tracking-wider">
                  <span className={step >= 1 ? 'text-red-500' : 'text-white/40'}>1. VEHÍCULO</span>
                  <span className={step >= 2 ? 'text-red-500' : 'text-white/40'}>2. ESTADO</span>
                  <span className={step >= 3 ? 'text-red-500' : 'text-white/40'}>3. CONTACTO</span>
                </div>

                <div className="relative flex items-center justify-between px-2 pt-2">
                  <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 z-0"></div>
                  <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-0.5 bg-red-600 z-0 transition-all duration-300"
                    style={{
                      width: step === 1 ? '0%' : step === 2 ? '50%' : '100%',
                    }}
                  ></div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center z-10 transition-all ${
                      step >= 1 ? 'bg-red-600 text-white shadow-md' : 'bg-[#1b2738] text-white/60'
                    }`}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center z-10 transition-all ${
                      step >= 2 ? 'bg-red-600 text-white shadow-md' : 'bg-[#1b2738] text-white/60'
                    }`}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center z-10 transition-all ${
                      step >= 3 ? 'bg-red-600 text-white shadow-md' : 'bg-[#1b2738] text-white/60'
                    }`}
                  >
                    3
                  </button>
                </div>
              </div>

              {/* STEP 1: VEHÍCULO */}
              {step === 1 && (
                <div className="space-y-5 text-xs">
                  {/* Toggle Mode: Datos vs VIN */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#070e17] border border-white/5">
                    <span className="font-bold uppercase tracking-wider text-white/80">
                      Ingresar Vehículo por Datos
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={isVinMode}
                          onChange={(e) => setIsVinMode(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </div>
                      <span className="font-bold uppercase tracking-wider text-amber-400">
                        Ingresar VIN
                      </span>
                    </label>
                  </div>

                  {isVinMode ? (
                    /* Modo VIN */
                    <div className="space-y-3">
                      <label className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-400">
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        <span>Número VIN del Vehículo (17 caracteres)</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={vinInput}
                          onChange={(e) => setVinInput(e.target.value.toUpperCase())}
                          placeholder="1J4PP2GK5BW556327"
                          className="flex-1 px-3.5 py-3 rounded-xl bg-[#070e17] text-white font-mono text-sm border border-red-600/60 outline-none focus:border-red-500"
                        />
                        <button
                          type="button"
                          onClick={handleDecodeVin}
                          className="px-5 py-3 rounded-xl bg-[#1c2838] hover:bg-[#25364c] text-amber-400 font-bold tracking-wider flex items-center gap-2 transition-colors border border-amber-400/30"
                        >
                          <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                          <span>Decodificar</span>
                        </button>
                      </div>
                      <div className="p-3 bg-[#070e17] rounded-xl border border-white/5 text-white/70">
                        <span>Vehículo detectado: </span>
                        <strong className="text-white">
                          {year} {make} {model} ({classifiedType})
                        </strong>
                      </div>
                    </div>
                  ) : (
                    /* Modo Manual por Datos */
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-white/70 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                            Año
                          </label>
                          <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#070e17] text-white font-semibold border border-white/10 outline-none"
                          >
                            <option>2014</option>
                            <option>2013</option>
                            <option>2012</option>
                            <option>2011</option>
                            <option>2010</option>
                            <option>2008</option>
                            <option>2005</option>
                            <option>1999</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-white/70 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                            Marca
                          </label>
                          <select
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#070e17] text-white font-semibold border border-white/10 outline-none"
                          >
                            <option>HONDA</option>
                            <option>TOYOTA</option>
                            <option>FORD</option>
                            <option>CHEVROLET</option>
                            <option>NISSAN</option>
                            <option>DODGE</option>
                            <option>JEEP</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-white/70 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                            Modelo
                          </label>
                          <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#070e17] text-white font-semibold border border-white/10 outline-none"
                          >
                            <option>Civic</option>
                            <option>Accord</option>
                            <option>Prius</option>
                            <option>Corolla</option>
                            <option>Cruze</option>
                            <option>Dart</option>
                            <option>F-150</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                        <div>
                          <label className="block text-white/70 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                            Tipo de Carrocería
                          </label>
                          <select
                            value={bodyType}
                            onChange={(e) => {
                              setBodyType(e.target.value);
                              setClassifiedType(
                                e.target.value.includes('Compacto')
                                  ? 'SEDAN (MEDIUM)'
                                  : e.target.value.includes('SUV')
                                  ? 'SUV (FULL)'
                                  : 'TRUCK (HEAVY)'
                              );
                            }}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#070e17] text-white font-semibold border border-white/10 outline-none"
                          >
                            <option>Sedan Compacto / Mediano</option>
                            <option>Sedan Grande / Full Size</option>
                            <option>SUV / Crossover</option>
                            <option>Pickup Truck</option>
                            <option>Van / Minivan</option>
                          </select>
                        </div>

                        <div className="p-3 bg-[#070e17] rounded-xl border border-white/5 flex items-center gap-3">
                          <span className="text-xl">🚗</span>
                          <div>
                            <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">
                              Tipo Clasificado
                            </span>
                            <span className="text-xs font-bold text-emerald-400 font-mono">
                              {classifiedType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold tracking-wider uppercase text-xs transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Continuar a Estado</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              )}

              {/* STEP 2: ESTADO */}
              {step === 2 && (
                <div className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Arranca y Camina */}
                    <div>
                      <label className="block text-white/70 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                        ¿Arranca y Camina?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRuns(true)}
                          className={`py-2.5 px-3 rounded-xl font-bold uppercase tracking-wide transition-all ${
                            runs
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50 shadow-sm'
                              : 'bg-[#070e17] text-white/50 border border-white/10'
                          }`}
                        >
                          Sí, Arranca
                        </button>
                        <button
                          type="button"
                          onClick={() => setRuns(false)}
                          className={`py-2.5 px-3 rounded-xl font-bold uppercase tracking-wide transition-all ${
                            !runs
                              ? 'bg-red-950/80 text-red-400 border border-red-500/50 shadow-sm'
                              : 'bg-[#070e17] text-white/50 border border-white/10'
                          }`}
                        >
                          No Arranca
                        </button>
                      </div>
                    </div>

                    {/* Tiene Título */}
                    <div>
                      <label className="block text-white/70 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                        ¿Tiene Título?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setHasTitle(true)}
                          className={`py-2.5 px-3 rounded-xl font-bold uppercase tracking-wide transition-all ${
                            hasTitle
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50 shadow-sm'
                              : 'bg-[#070e17] text-white/50 border border-white/10'
                          }`}
                        >
                          Título Limpio
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasTitle(false)}
                          className={`py-2.5 px-3 rounded-xl font-bold uppercase tracking-wide transition-all ${
                            !hasTitle
                              ? 'bg-amber-950/80 text-amber-400 border border-amber-500/50 shadow-sm'
                              : 'bg-[#070e17] text-white/50 border border-white/10'
                          }`}
                        >
                          Sin Título
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Ruedas Infladas */}
                    <div>
                      <label className="block text-white/70 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                        Ruedas Infladas
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setGoodTires(true)}
                          className={`py-2.5 px-3 rounded-xl font-bold uppercase tracking-wide transition-all ${
                            goodTires
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50 shadow-sm'
                              : 'bg-[#070e17] text-white/50 border border-white/10'
                          }`}
                        >
                          4 Llantas Buenas
                        </button>
                        <button
                          type="button"
                          onClick={() => setGoodTires(false)}
                          className={`py-2.5 px-3 rounded-xl font-bold uppercase tracking-wide transition-all ${
                            !goodTires
                              ? 'bg-red-950/80 text-red-400 border border-red-500/50 shadow-sm'
                              : 'bg-[#070e17] text-white/50 border border-white/10'
                          }`}
                        >
                          Ponchadas
                        </button>
                      </div>
                    </div>

                    {/* Millaje Aprox */}
                    <div>
                      <label className="block text-white/70 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
                        Millaje Aprox.
                      </label>
                      <select
                        value={mileageRange}
                        onChange={(e) => setMileageRange(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#070e17] text-white font-semibold border border-white/10 outline-none"
                      >
                        <option>&lt; 100k Millas</option>
                        <option>100k - 150k Millas</option>
                        <option>150k - 200k Millas</option>
                        <option>&gt; 200k Millas</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3.5 rounded-xl bg-[#1c2838] hover:bg-[#25364c] text-white font-bold tracking-wider uppercase text-xs transition-colors border border-white/10"
                    >
                      Volver
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold tracking-wider uppercase text-xs transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <span>Continuar a Contacto</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACTO */}
              {step === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/70 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                        Nombre del Vendedor
                      </label>
                      <input
                        type="text"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        placeholder="Cliente de demostración"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e17] text-white border border-white/10 outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={sellerPhone}
                        onChange={(e) => setSellerPhone(e.target.value)}
                        placeholder="(919) 555-0100"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e17] text-white border border-white/10 outline-none focus:border-red-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      ZIP Code (Ubicación)
                    </label>
                    <input
                      type="text"
                      value={sellerZip}
                      onChange={(e) => setSellerZip(e.target.value)}
                      placeholder="27704"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e17] text-white border border-red-600/70 outline-none focus:border-red-500 font-mono"
                    />
                  </div>

                  {/* Resumen del vehículo a cotizar */}
                  <div className="p-3.5 bg-[#070e17] rounded-xl border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 block uppercase tracking-wider">
                      Resumen del Vehículo a Cotizar:
                    </span>
                    <div className="text-sm font-bold text-white">
                      {year} {make} {model} ({classifiedType})
                    </div>
                    <div className="text-[11px] text-white/60">
                      {runs ? '✓ Arranca' : '✗ No arranca'} · {hasTitle ? '✓ Con título' : '✗ Sin título'} ·{' '}
                      {goodTires ? '✓ Llantas ok' : '✗ Ponchadas'}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3.5 rounded-xl bg-[#1c2838] hover:bg-[#25364c] text-white font-bold tracking-wider uppercase text-xs transition-colors border border-white/10 flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      <span>Volver</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCalculateOffer}
                      className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold tracking-wider uppercase text-xs transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                      <span>Calcular Oferta en Vivo</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Card: Either Waiting OR Calculated Offer Preview */}
            {calculatedOffer === null ? (
              <div className="rounded-2xl bg-[#0f1926] border border-white/10 p-8 text-center space-y-3 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[#070e17] border border-white/10 mx-auto flex items-center justify-center text-white/50">
                  <span className="material-symbols-outlined text-[24px]">search</span>
                </div>
                <h3 className="text-base font-bold text-white">Esperando Cotización</h3>
                <p className="text-xs text-white/50 max-w-md mx-auto leading-relaxed">
                  Completa los campos del formulario y presiona &quot;Calcular Oferta en Vivo&quot; para ver el precio oficial y el borrador de mensaje.
                </p>
              </div>
            ) : (
              /* OFERTA CALCULADA (VISTA PREVIA) */
              <div className="rounded-2xl bg-[#0f1926] border border-emerald-500/40 p-6 sm:p-7 space-y-5 shadow-2xl">
                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    <span>Oferta Calculada (Vista Previa)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-mono">
                    EN VIVO
                  </span>
                </div>

                {/* Big Offer Banner */}
                <div className="p-6 rounded-xl bg-[#070e17] border border-white/5 text-center space-y-1">
                  <span className="text-[11px] text-white/60 font-bold uppercase tracking-wider block">
                    Monto de Oferta Calculado
                  </span>
                  <div className="text-4xl font-black text-emerald-400 font-mono tracking-tight">
                    ${calculatedOffer}
                  </div>
                  <span className="text-xs text-white/50 font-mono">
                    Rango Aceptado: ${calculatedOffer - 25} - ${calculatedOffer + 25}
                  </span>
                </div>

                {/* Oferta Negociada Manual */}
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-400">
                    <span>💵</span>
                    <span>Oferta Negociada (Monto Manual)</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 font-mono text-emerald-400 font-bold text-sm">$</span>
                    <input
                      type="number"
                      value={manualOffer}
                      onChange={(e) => setManualOffer(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#070e17] text-white font-mono text-sm border border-white/10 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <p className="text-[11px] text-white/50">
                    Deja este valor si se cerró por el precio cotizado, o cámbialo si acordaste otro precio con el cliente.
                  </p>
                </div>

                {/* Desglose Técnico */}
                <div className="p-3.5 rounded-xl bg-[#070e17] border border-white/5 text-[11px] text-white/60 space-y-1 font-mono">
                  <span className="font-bold text-white block">Desglose Técnico:</span>
                  <p>
                    Área de Servicio: Area 5 (Modificador: $0) | Clasificación: {classifiedType} | Cotización Base ({classifiedType} {year}): ${calculatedOffer + 10} | Millaje {mileageRange}: -$10
                  </p>
                </div>

                {/* Action buttons */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyFbResponse}
                    className="w-full py-3 rounded-xl bg-[#1c2838] hover:bg-[#25364c] text-white font-bold tracking-wider text-xs transition-colors border border-white/10 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    <span>{copiedFbText ? '¡Copiado al Portapapeles!' : 'Copiar Respuesta para Facebook'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRegisterAndSubmit}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wider text-xs transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 uppercase"
                  >
                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                    <span>
                      {registeredSuccess ? '¡Lead Registrado en Dispatch!' : '✓ ✓ Oferta Aceptada: Registrar y Enviar'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Mis Leads Procesados */}
        {activeTab === 'procesados' && (
          <div className="rounded-2xl bg-[#0f1926] border border-white/10 p-6 sm:p-7 space-y-5 shadow-xl text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Historial de Mis Leads Cotizados
                </h2>
                <p className="text-xs text-white/60 mt-0.5">
                  Estado operativo en tiempo real sincronizado con los operadores
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-[#070e17] p-1 rounded-xl flex items-center border border-white/5">
                  <button
                    type="button"
                    onClick={() => setProcessedFilter('todas')}
                    className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-all ${
                      processedFilter === 'todas'
                        ? 'bg-[#1c2838] text-white'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    Todas ({myLeads.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setProcessedFilter('activas')}
                    className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-all ${
                      processedFilter === 'activas'
                        ? 'bg-[#1c2838] text-white'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    Activas ({myLeads.filter((l) => l.status !== 'Cancelado').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setProcessedFilter('canceladas')}
                    className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-all ${
                      processedFilter === 'canceladas'
                        ? 'bg-[#1c2838] text-white'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    Canceladas (0)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {}}
                  className="px-3.5 py-2 rounded-lg bg-[#1c2838] hover:bg-[#25364c] text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10"
                >
                  <span className="material-symbols-outlined text-[16px]">sync</span>
                  <span>Actualizar</span>
                </button>
              </div>
            </div>

            {filteredProcessed.length === 0 ? (
              <div className="py-16 text-center text-white/40">
                Aún no has registrado prospectos en esta categoría.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProcessed.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl bg-[#070e17] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-red-500">{lead.id}</span>
                        <span className="font-bold text-white text-sm">{lead.vehicle}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold">
                          {lead.status}
                        </span>
                      </div>
                      <div className="text-xs text-white/60 mt-1 flex flex-wrap gap-3 font-mono">
                        <span>Cliente: {lead.customerName || 'Particular'}</span>
                        <span>Tel: {lead.phone}</span>
                        <span>ZIP: {lead.zip}</span>
                        <span>Specs: {lead.specs}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-emerald-400">
                          ${lead.offer.toFixed(2)}
                        </span>
                        <span className="block text-[10px] text-white/50 font-mono">
                          Comisión estimada: +$30.00
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-emerald-400 text-[20px]">
                        check_circle
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

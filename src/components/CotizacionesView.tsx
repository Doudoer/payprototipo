import React, { useState, useMemo } from 'react';
import { Lead, LeadStatus, ScreenId } from '../types';

interface CotizacionesViewProps {
  leads: Lead[];
  onOpenNewLeadModal: () => void;
  onOpenManageModal: (lead: Lead) => void;
  onNavigate: (screen: ScreenId) => void;
  lang: 'es' | 'en';
}

export const CotizacionesView: React.FC<CotizacionesViewProps> = ({
  leads,
  onOpenNewLeadModal,
  onOpenManageModal,
  onNavigate,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<LeadStatus | 'Todas'>('Nuevas');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [locationFilter, setLocationFilter] = useState('Todos');
  const [tableFilter, setTableFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTowUnit, setActiveTowUnit] = useState<'01' | '02'>('02');

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Tab filter
      if (activeTab !== 'Todas' && lead.status !== activeTab) {
        return false;
      }
      // Type filter
      if (typeFilter !== 'Todos' && !lead.bodyType.toLowerCase().includes(typeFilter.toLowerCase())) {
        return false;
      }
      // Location filter
      if (locationFilter !== 'Todos' && !lead.city.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }
      // Table search
      if (tableFilter.trim()) {
        const query = tableFilter.toLowerCase();
        const match =
          lead.id.toLowerCase().includes(query) ||
          lead.phone.toLowerCase().includes(query) ||
          lead.vehicle.toLowerCase().includes(query) ||
          lead.city.toLowerCase().includes(query) ||
          lead.zip.toLowerCase().includes(query) ||
          lead.tierName.toLowerCase().includes(query);
        if (!match) return false;
      }
      return true;
    });
  }, [leads, activeTab, typeFilter, locationFilter, tableFilter]);

  // Tab counts
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Nuevas: 0,
      Aceptadas: 0,
      Agenda: 0,
      Completado: 0,
      Cancelado: 0,
      Archivadas: 0,
    };
    leads.forEach((l) => {
      if (counts[l.status] !== undefined) {
        counts[l.status]++;
      }
    });
    return counts;
  }, [leads]);

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['ID', 'Telefono', 'Ciudad', 'ZIP', 'Vehiculo', 'Tipo', 'Canal', 'Validacion', 'Oferta', 'Estado'];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.phone}"`,
      `"${l.city}"`,
      l.zip,
      `"${l.vehicle}"`,
      `"${l.bodyType}"`,
      `"${l.channel}"`,
      `"${l.validation}"`,
      l.offer,
      `"${l.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Pay4MyJunk_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Command Ribbon: Breadcrumb & Primary Operational Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#dce9ff] text-[#0b1c30]">
            <span className="font-mono text-xs font-bold text-[#006b2c]">#0</span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#565e74]">ORDERS</span>
          </div>
          <span className="text-[#bdcaba] font-mono">/</span>
          <span className="text-lg font-bold text-[#0b1c30] tracking-tight">
            {lang === 'es' ? 'Cotizaciones & Leads' : 'Quotes & Leads'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#7ffc97]/40 text-[#005320] font-mono text-[11px] font-bold">
            DISPATCH LIVE
          </span>
        </div>

        {/* Quick CTA buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#0b1c30] border border-[#e5eeff] shadow-sm hover:bg-[#eff4ff] transition-colors text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px] text-[#565e74]">file_download</span>
            <span>{lang === 'es' ? 'Exportar CSV' : 'Export CSV'}</span>
          </button>
          <button
            type="button"
            onClick={onOpenNewLeadModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#006b2c] text-white shadow-[0_2px_8px_rgba(0,107,44,0.28)] hover:bg-[#00873a] transition-all text-xs font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>{lang === 'es' ? 'Nueva Cotización' : 'New Quote'}</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Matrix (4 cards with cash-green accents) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {/* KPI 1: Cotizaciones (30D) */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e5eeff] hover:shadow-md transition-shadow flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#565e74] font-semibold">
              {lang === 'es' ? 'Cotizaciones (30D)' : 'Quotes (30D)'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006b2c] group-hover:bg-[#7ffc97]/30 transition-colors">
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0b1c30] tracking-tight">{leads.length > 8 ? '66' : leads.length}</span>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7ffc97]/40 text-[#005320] text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +12.4%
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[#565e74] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006b2c]"></span>
            <span>{lang === 'es' ? '+8 ingresadas en las últimas 24h' : '+8 entered in last 24h'}</span>
          </div>
        </div>

        {/* KPI 2: Tasa de Aceptación */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e5eeff] hover:shadow-md transition-shadow flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#565e74] font-semibold">
              {lang === 'es' ? 'Tasa de Aceptación' : 'Acceptance Rate'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0051d5] group-hover:bg-[#dbe1ff] transition-colors">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0b1c30] tracking-tight">15%</span>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7ffc97]/40 text-[#005320] text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              +4.2%
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[#565e74] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5]"></span>
            <span>{lang === 'es' ? 'Meta mensual 14.5% alcanzada' : 'Monthly goal 14.5% achieved'}</span>
          </div>
        </div>

        {/* KPI 3: Payout Estimado */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e5eeff] hover:shadow-md transition-shadow flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#565e74] font-semibold">
              {lang === 'es' ? 'Payout Estimado' : 'Estimated Payout'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#00873a] group-hover:bg-[#7ffc97]/30 transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#006b2c] tracking-tight">$3,395</span>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7ffc97]/40 text-[#005320] text-xs font-bold">
              Mercado OK
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[#565e74] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006b2c]"></span>
            <span>{lang === 'es' ? 'Promedio por unidad: $308.63' : 'Average per unit: $308.63'}</span>
          </div>
        </div>

        {/* KPI 4: Alertas VIN / Estado */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e5eeff] hover:shadow-md transition-shadow flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#565e74] font-semibold">
              {lang === 'es' ? 'Alertas VIN / Estado' : 'VIN Alerts / Status'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#565e74] group-hover:bg-[#dce9ff] transition-colors">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0b1c30] tracking-tight">0</span>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold">
              {lang === 'es' ? 'Al día' : 'Up to date'}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[#565e74] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006b2c]"></span>
            <span>{lang === 'es' ? 'Sin bloqueos de inspección' : 'No inspection blocks'}</span>
          </div>
        </div>
      </div>

      {/* Pipeline Tabs & Filter Ribbon */}
      <div className="mt-5 bg-white rounded-xl shadow-sm border border-[#e5eeff] p-4 flex flex-col gap-3">
        {/* Pipeline status track */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
          <div className="inline-flex items-center bg-[#eff4ff] p-1 rounded-xl text-[#565e74] gap-1 shrink-0">
            {(
              [
                { id: 'Nuevas', label: 'Nuevas', count: 12 },
                { id: 'Aceptadas', label: 'Aceptadas', count: 34 },
                { id: 'Agenda', label: 'Agenda', count: 8 },
                { id: 'Completado', label: 'Completado', count: 10 },
                { id: 'Cancelado', label: 'Cancelado', count: 2 },
                { id: 'Archivadas', label: 'Archivadas', count: 0 },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as LeadStatus)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#006b2c] text-white shadow-sm'
                      : 'text-[#565e74] hover:text-[#0b1c30] hover:bg-white/70'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-[#00873a] text-white' : 'bg-[#d3e4fe] text-[#565e74]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden xl:flex items-center gap-2 text-[#565e74] text-xs shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#62df7d]"></span>
            <span>
              Tiempo promedio respuesta: <strong className="text-[#0b1c30] font-bold">6.2 min</strong>
            </span>
          </div>
        </div>

        {/* Secondary filters row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1 border-t border-[#eff4ff]">
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            {/* Type selector */}
            <div className="relative inline-block text-left">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold pl-3 pr-8 py-2 rounded-lg outline-none cursor-pointer hover:bg-[#e5eeff] transition-colors border border-transparent focus:border-[#006b2c]"
              >
                <option value="Todos">Todos los tipos</option>
                <option value="Sedan">Sedan (Compact / Mid / Full)</option>
                <option value="SUV">SUV / Crossover</option>
                <option value="Pickup">Pickup Truck</option>
                <option value="Van">Van / Minivan</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-[#565e74] text-[16px]">
                expand_more
              </span>
            </div>

            {/* Location selector */}
            <div className="relative inline-block text-left">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="appearance-none bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold pl-3 pr-8 py-2 rounded-lg outline-none cursor-pointer hover:bg-[#e5eeff] transition-colors border border-transparent focus:border-[#006b2c]"
              >
                <option value="Todos">Ubicación / ZIP (Todos)</option>
                <option value="Raleigh">Raleigh, NC (27604)</option>
                <option value="Durham">Durham, NC (27707)</option>
                <option value="Wake Forest">Wake Forest, NC (27587)</option>
                <option value="Clayton">Clayton, NC (27520)</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-[#565e74] text-[16px]">
                pin_drop
              </span>
            </div>

            {/* Source pill */}
            <div className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#565e74] text-xs font-medium">
              <span>Fuente:</span>
              <span className="font-bold text-[#0b1c30]">Todas (Web + FB)</span>
            </div>
          </div>

          {/* Search table input */}
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-2 text-[#565e74] text-[18px]">
                search
              </span>
              <input
                className="w-full bg-[#eff4ff] text-[#0b1c30] placeholder:text-[#565e74]/70 text-xs pl-9 pr-3 py-2 rounded-lg outline-none focus:bg-white focus:ring-1 focus:ring-[#006b2c] transition-all border border-transparent"
                placeholder={lang === 'es' ? 'Filtrar en tabla...' : 'Filter table...'}
                type="text"
                value={tableFilter}
                onChange={(e) => setTableFilter(e.target.value)}
              />
            </div>
            <button
              aria-label="Restablecer filtros"
              onClick={() => {
                setTypeFilter('Todos');
                setLocationFilter('Todos');
                setTableFilter('');
              }}
              className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#565e74] hover:text-[#0b1c30] hover:bg-[#e5eeff] transition-colors"
              type="button"
              title="Restablecer filtros"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leads Table Card */}
      <div className="mt-4 bg-white rounded-xl shadow-sm border border-[#e5eeff] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eff4ff] text-[#565e74] text-[11px] font-bold tracking-wider uppercase">
                <th className="py-3.5 px-5 font-semibold"># ID / TELÉFONO</th>
                <th className="py-3.5 px-4 font-semibold">VEHÍCULO &amp; ESPECIFICACIONES</th>
                <th className="py-3.5 px-4 font-semibold">CANAL / VALIDACIÓN</th>
                <th className="py-3.5 px-4 font-semibold text-right">OFERTA ESTIMADA</th>
                <th className="py-3.5 px-4 font-semibold text-center">ESTADO EN FLUJO</th>
                <th className="py-3.5 px-5 font-semibold text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5eeff] text-sm">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-[#565e74]">
                    No se encontraron cotizaciones con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#eff4ff]/50 transition-colors group">
                    {/* ID & Phone */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#0b1c30] group-hover:text-[#006b2c] transition-colors">
                          {lead.id}
                        </span>
                        {lead.status === 'Nuevas' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#006b2c] animate-ping"></span>
                        )}
                      </div>
                      <div className="font-mono text-xs text-[#0b1c30] font-semibold mt-0.5">
                        {lead.phone}
                      </div>
                      <div className="font-mono text-[11px] text-[#565e74] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[13px] text-[#006b2c]">location_on</span>
                        ZIP {lead.zip} · {lead.city}
                      </div>
                    </td>

                    {/* Vehicle */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#0b1c30] text-sm leading-tight">
                        {lead.vehicle}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] text-[11px] font-semibold">
                          {lead.bodyType}
                        </span>
                        <span className="text-[#565e74] text-xs">{lead.specs}</span>
                      </div>
                    </td>

                    {/* Channel / Validation */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#dae2fd] text-[#5c647a] font-mono text-[11px] font-bold">
                          <span className="material-symbols-outlined text-[13px]">
                            {lead.channel === 'Scout FB' ? 'share' : lead.channel === 'Web Directa' ? 'bolt' : 'language'}
                          </span>
                          {lead.channel}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            lead.validation === 'Falta VIN'
                              ? 'bg-[#ffdad6] text-[#ba1a1a]'
                              : 'bg-[#7ffc97]/40 text-[#005320]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            {lead.validation === 'Falta VIN' ? 'warning' : 'check'}
                          </span>
                          {lead.validation}
                        </span>
                      </div>
                    </td>

                    {/* Offer */}
                    <td className="py-4 px-4 text-right">
                      <div className="font-bold text-lg text-[#006b2c] tracking-tight">
                        ${lead.offer.toFixed(2)}
                      </div>
                      <span className="text-[11px] text-[#565e74] font-mono block mt-0.5">
                        {lead.tierName}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          lead.status === 'Nuevas'
                            ? 'bg-[#dae2fd] text-[#5c647a]'
                            : lead.status === 'Aceptadas'
                            ? 'bg-[#7ffc97]/40 text-[#005320]'
                            : lead.status === 'Agenda'
                            ? 'bg-[#e5eeff] text-[#0051d5]'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {lead.status === 'Nuevas'
                            ? 'hourglass_top'
                            : lead.status === 'Aceptadas'
                            ? 'task_alt'
                            : lead.status === 'Agenda'
                            ? 'calendar_today'
                            : 'done'}
                        </span>
                        {lead.status === 'Nuevas' ? 'Pendiente' : lead.status === 'Agenda' ? 'En Agenda' : lead.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {lead.status === 'Aceptadas' ? (
                          <button
                            type="button"
                            onClick={() => onOpenManageModal(lead)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#006b2c] text-white text-xs font-bold shadow-sm hover:bg-[#00873a] transition-all"
                          >
                            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                            <span>Asignar Grúa</span>
                          </button>
                        ) : lead.status === 'Agenda' ? (
                          <button
                            type="button"
                            onClick={() => onOpenManageModal(lead)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#dce9ff] text-[#0b1c30] text-xs font-bold hover:bg-[#d3e4fe] transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            <span>Ver Ficha</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onOpenManageModal(lead)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#006b2c] text-white text-xs font-bold shadow-sm hover:bg-[#00873a] transition-all"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit_document</span>
                            <span>Gestionar</span>
                          </button>
                        )}
                        <button
                          aria-label="Más opciones"
                          onClick={() => onOpenManageModal(lead)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#565e74] hover:bg-[#e5eeff] hover:text-[#0b1c30] transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="px-5 py-3.5 bg-[#eff4ff] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-[#e5eeff]">
          <div className="flex items-center gap-2 text-[#565e74]">
            <span>
              Mostrando <strong className="text-[#0b1c30] font-bold">1-{filteredLeads.length}</strong> de{' '}
              <strong className="text-[#0b1c30] font-bold">{leads.length > 8 ? 66 : leads.length}</strong> cotizaciones activas
            </span>
            <span className="text-[#bdcaba]">·</span>
            <span className="font-mono text-[11px]">Sync: hace 22 segundos</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              aria-label="Página anterior"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg bg-white border border-[#e5eeff] flex items-center justify-center text-[#565e74] hover:text-[#0b1c30] hover:bg-[#eff4ff] disabled:opacity-40 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-lg font-bold text-xs ${
                currentPage === 1 ? 'bg-[#006b2c] text-white shadow-sm' : 'bg-white border border-[#e5eeff] text-[#565e74]'
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded-lg font-bold text-xs ${
                currentPage === 2 ? 'bg-[#006b2c] text-white shadow-sm' : 'bg-white border border-[#e5eeff] text-[#565e74]'
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 rounded-lg font-bold text-xs ${
                currentPage === 3 ? 'bg-[#006b2c] text-white shadow-sm' : 'bg-white border border-[#e5eeff] text-[#565e74]'
              }`}
            >
              3
            </button>
            <span className="px-1 text-[#565e74] font-mono text-xs">...</span>
            <button
              type="button"
              onClick={() => setCurrentPage(17)}
              className="w-8 h-8 rounded-lg bg-white border border-[#e5eeff] text-[#565e74] hover:text-[#0b1c30] font-bold text-xs"
            >
              17
            </button>
            <button
              aria-label="Página siguiente"
              onClick={() => setCurrentPage((p) => Math.min(17, p + 1))}
              className="w-8 h-8 rounded-lg bg-white border border-[#e5eeff] flex items-center justify-center text-[#565e74] hover:text-[#0b1c30] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dispatcher Live Assistant & Field Operations Widget (Bottom Grid) */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Dispatch Route Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#7ffc97]/30 text-[#006b2c] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">explore</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0b1c30]">Ruta de Remolques en Curso</h2>
                <p className="text-xs text-[#565e74]">2 unidades de auxilio activas en el corredor US-70 &amp; I-40</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-[#dce9ff] text-[#0b1c30] font-mono text-xs font-bold">
              ETA PROM: 38 MIN
            </span>
          </div>

          {/* Live Location Visual Map Element */}
          <div
            className="w-full h-44 rounded-xl bg-[#eff4ff] relative overflow-hidden flex items-end p-4 shadow-inner mt-2 bg-cover bg-center border border-[#e5eeff]"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwZA6qj6AjC0GQEEypm-0eu5fjCLN_1R9PaOnt5E7h17uPcHqReiXg9gZDd5ZC0ZONTfAZWpp3sojxG8jDrq2Rhigxj7ada2Ujk5UBSQ7FdEhWdq8LInnAdegy_HWrwsVo5ZqVqn8sTavwEqSsivCPPxYB-K5yhvQbs5AlvFad58kXi2L_H0YZEGhGZ362f2-nscf67Mcd4zzMyEqVAtfdXSHtn3l0RVdLZIO7OlCvlQtf1tyLQ3NdTQ')",
            }}
          >
            {/* Interactive Tow Unit Selector Badge */}
            <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-md flex items-center gap-4 border border-[#e5eeff]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006b2c] animate-ping"></span>
                <span className="text-xs font-bold text-[#0b1c30]">
                  {activeTowUnit === '02'
                    ? 'Unidad Grúa #02 (Hino Flatbed)'
                    : 'Unidad Grúa #01 (Ram 5500 Wrecker)'}
                </span>
              </div>
              <span className="text-[#565e74] font-mono text-xs">
                {activeTowUnit === '02' ? 'Destino: Lead #428 · Clayton NC' : 'Destino: Lead #425 · Raleigh NC'}
              </span>
              <button
                type="button"
                onClick={() => setActiveTowUnit(activeTowUnit === '02' ? '01' : '02')}
                className="px-2 py-0.5 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[10px] font-bold text-[#006b2c] ml-auto transition-colors"
              >
                Alternar Grúa
              </button>
            </div>
          </div>
        </div>

        {/* AI Pricing & Auto-Offer Scout Insight */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e5eeff] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#dbe1ff] text-[#0051d5] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#7ffc97]/30 text-[#005320] text-xs font-bold font-mono">
                Brain AI v2.4
              </span>
            </div>
            <h3 className="text-base font-bold text-[#0b1c30] mt-1">Sugerencia de Scrap Rate</h3>
            <p className="text-xs text-[#565e74] mt-1.5 leading-relaxed">
              El precio de chatarra ferrosa en el mercado local subió un{' '}
              <strong className="text-[#006b2c] font-semibold">+3.8% hoy</strong>. Se recomienda mantener payout base en
              $305.00 para maximizar margen de captura.
            </p>
            <div className="mt-4 p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between border border-[#e5eeff]">
              <span className="text-xs text-[#565e74] font-semibold">Margen Estimado por Lead</span>
              <span className="font-mono text-xs font-bold text-[#006b2c]">+$115.00 neto</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('estrategia-de-precios')}
            className="mt-4 w-full py-2.5 rounded-lg bg-[#dce9ff] text-[#0b1c30] hover:bg-[#d3e4fe] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Ajustar Matriz de Precios</span>
          </button>
        </div>
      </div>
    </div>
  );
};

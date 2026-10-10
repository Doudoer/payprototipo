import React, { useState, useMemo } from 'react';
import { Scout, DispatchedVehicle } from '../types';

interface ScoutsViewProps {
  scouts: Scout[];
  dispatchedVehicles: DispatchedVehicle[];
  onOpenCreateScoutModal: () => void;
  onOpenPaymentModal: (scout: Scout) => void;
  onApproveDispatch: (dispatchId: string) => void;
  onBatchSettle: () => void;
  lang: 'es' | 'en';
}

export const ScoutsView: React.FC<ScoutsViewProps> = ({
  scouts,
  dispatchedVehicles,
  onOpenCreateScoutModal,
  onOpenPaymentModal,
  onApproveDispatch,
  onBatchSettle,
  lang,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [tariffFix, setTariffFix] = useState(30);
  const [showTariffModal, setShowTariffModal] = useState(false);

  const filteredScouts = useMemo(() => {
    if (!filterQuery.trim()) return scouts;
    const q = filterQuery.toLowerCase();
    return scouts.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        s.tag.toLowerCase().includes(q)
    );
  }, [scouts, filterQuery]);

  // Aggregate stats
  const totalPending = useMemo(() => {
    return scouts.reduce((acc, s) => acc + s.pendingAmount, 0);
  }, [scouts]);

  const totalPaid = useMemo(() => {
    return scouts.reduce((acc, s) => acc + s.totalPaid, 0);
  }, [scouts]);

  const pendingDispatchesCount = useMemo(() => {
    return scouts.reduce((acc, s) => acc + s.pendingUnits, 0);
  }, [scouts]);

  return (
    <div className="flex flex-col w-full pb-16 space-y-5">
      {/* Top Operational Banner */}
      <div className="relative overflow-hidden rounded-xl bg-[#213145] text-[#eaf1ff] p-5 shadow-md border border-white/5">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#006b2c]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 -bottom-20 w-64 h-64 rounded-full bg-[#0051d5]/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#006b2c]/20 text-[#7ffc97] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">groups</span>
              </div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#0b1c30]/40 text-[#7ffc97] font-mono text-xs uppercase font-semibold">
                <span>FB Marketplace Engine</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7ffc97] animate-ping"></span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {lang === 'es'
                ? 'Gestión de Equipo & Liquidación de Comisiones'
                : 'Team Management & Commission Settlements'}
            </h1>
            <p className="text-xs sm:text-sm text-[#eaf1ff]/80">
              {lang === 'es'
                ? 'Control de pagos a scouts por Zelle/Efectivo, configuración de tarifas y saldos pendientes por autos remolcados.'
                : 'Scout payment control via Zelle/Cash, fee configuration and pending balances for towed vehicles.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowTariffModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#213145]/80 hover:bg-[#0b1c30]/50 text-white text-xs font-semibold transition-all border border-white/10 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Tarifas por Lead (${tariffFix} Fix)</span>
            </button>
            <button
              type="button"
              onClick={onOpenCreateScoutModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold shadow-[0_2px_8px_rgba(0,107,44,0.35)] transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              <span>{lang === 'es' ? 'Crear Nuevo Scout' : 'Create New Scout'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric KPI Cards (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Active Agents */}
        <div className="relative overflow-hidden rounded-xl bg-white p-5 shadow-sm border border-[#e5eeff] hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#565e74] uppercase tracking-wider block">
                Agentes Activos
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#0b1c30]">{scouts.length}</span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-[#006b2c] font-bold">
                  <span className="material-symbols-outlined text-[14px]">bolt</span> 100% ONLINE
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#dae2fd]/40 text-[#565e74] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">badge</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-[#565e74] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#0051d5]">storefront</span>
            Buscadores de leads en Facebook Marketplace &amp; Grupos
          </p>
          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#565e74] border-t border-[#eff4ff]">
            <span className="font-mono">Cuota semanal asignada</span>
            <span className="font-mono text-[#0b1c30] font-bold">15 autos / sem</span>
          </div>
        </div>

        {/* Card 2: Pending Liquidation */}
        <div className="relative overflow-hidden rounded-xl bg-white p-5 shadow-sm border border-[#e5eeff] hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#565e74] uppercase tracking-wider block">
                Comisiones Pendientes por Pagar
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-amber-600">${totalPending.toFixed(2)}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono text-xs font-bold">
                  {pendingDispatchesCount} DISPATCHES
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">pending_actions</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-[#565e74] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-amber-600">schedule</span>
            Por vehículos recogidos formalmente no liquidados
          </p>
          <div className="mt-4 pt-3 flex items-center justify-between text-xs border-t border-[#eff4ff]">
            <span className="font-mono text-[#565e74]">Vía de liquidación prioritaria</span>
            <span className="font-mono font-bold text-[#0051d5]">Zelle Express</span>
          </div>
        </div>

        {/* Card 3: Paid Commissions */}
        <div className="relative overflow-hidden rounded-xl bg-white p-5 shadow-sm border border-[#e5eeff] hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#565e74] uppercase tracking-wider block">
                Comisiones Liquidadas / Pagadas
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#006b2c]">${totalPaid.toFixed(2)}</span>
                <span className="inline-flex items-center text-[#006b2c] font-mono text-xs font-bold">
                  +18.5%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#7ffc97]/30 text-[#006b2c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">payments</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-[#565e74] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#006b2c]">verified</span>
            Total abonado formalmente a Scouts este período fiscal
          </p>
          <div className="mt-4 pt-3 flex items-center justify-between text-xs border-t border-[#eff4ff]">
            <span className="font-mono text-[#565e74]">Comprobantes emitidos</span>
            <span className="font-mono text-[#0b1c30] font-bold">48 recibos</span>
          </div>
        </div>
      </div>

      {/* Mini Metric Grid (4 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Retention */}
        <div className="rounded-xl bg-[#eff4ff] p-4 flex flex-col justify-between border border-[#e5eeff]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#565e74] uppercase tracking-wider">Tasa Retención FB</span>
            <span className="material-symbols-outlined text-[#006b2c] text-[18px]">verified_user</span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#0b1c30]">82.4%</div>
            <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden mt-1">
              <div className="bg-[#006b2c] h-full rounded-full" style={{ width: '82.4%' }}></div>
            </div>
          </div>
          <span className="text-xs text-[#565e74]">De prospecto a grúa confirmada</span>
        </div>

        {/* Standard Fee */}
        <div className="rounded-xl bg-[#eff4ff] p-4 flex flex-col justify-between border border-[#e5eeff]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#565e74] uppercase tracking-wider">Fee Estándar Scout</span>
            <span className="material-symbols-outlined text-[#0051d5] text-[18px]">price_change</span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#0b1c30]">
              ${tariffFix}.00 <span className="text-xs text-[#565e74] font-normal">/ unidad</span>
            </div>
            <div className="flex items-center gap-1 text-[#006b2c] font-mono text-[11px] mt-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> Garantizado por recogida
            </div>
          </div>
          <span className="text-xs text-[#565e74]">Sin deducción por condición</span>
        </div>

        {/* In Route */}
        <div className="rounded-xl bg-[#eff4ff] p-4 flex flex-col justify-between border border-[#e5eeff]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#565e74] uppercase tracking-wider">En Ruta a Patio</span>
            <span className="material-symbols-outlined text-[#0b1c30] text-[18px]">local_shipping</span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-[#0b1c30]">2 Unidades</div>
            <div className="flex items-center gap-1 text-[#0051d5] font-mono text-[11px] mt-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">navigation</span> Dispatch Raleigh &amp; Durham
            </div>
          </div>
          <span className="text-xs text-[#565e74]">Generan comisión en confirmación</span>
        </div>

        {/* Quick Batch Settlement CTA */}
        <div className="rounded-xl bg-[#00873a] p-4 text-white flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7ffc97]">Liquidación Rápida</span>
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
          </div>
          <div className="my-1.5">
            <div className="text-base font-bold">Liquidación Masiva</div>
            <p className="text-xs opacity-90 mt-0.5">Pagar todo el saldo pendiente por Zelle en 1 clic.</p>
          </div>
          <button
            type="button"
            onClick={onBatchSettle}
            className="w-full py-2 rounded-lg bg-white text-[#006b2c] text-xs font-bold hover:bg-[#eff4ff] transition-colors shadow-sm text-center"
          >
            Liquidar Saldo (${totalPending.toFixed(2)})
          </button>
        </div>
      </div>

      {/* Agent Liquidations Table Card */}
      <div className="rounded-xl bg-white shadow-sm border border-[#e5eeff] overflow-hidden">
        {/* Toolbar / Table Header */}
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#eff4ff]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-[#0b1c30]">
                Lista de Agentes y Control de Liquidación
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#dae2fd]/50 text-[#565e74] font-mono text-xs font-bold">
                {scouts.length} Registrados
              </span>
            </div>
            <p className="text-xs text-[#565e74]">
              Supervisión de rendimiento directo, liquidaciones de comisiones aprobadas y auditoría de prospectos.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative min-w-[220px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#565e74]">
                search
              </span>
              <input
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs outline-none placeholder:text-[#565e74]/60 focus:bg-white border border-[#e5eeff]"
                placeholder="Filtrar por agente o email..."
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setFilterQuery('')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold transition-colors border border-[#e5eeff]"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              <span>Actualizar</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eff4ff] text-[#565e74] text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-5">Agente / Email</th>
                <th className="py-3 px-4 text-center">Vehículos Recogidos</th>
                <th className="py-3 px-4">Pendiente de Pago</th>
                <th className="py-3 px-4">Total Pagado</th>
                <th className="py-3 px-4">Total Histórico</th>
                <th className="py-3 px-5 text-right">Acciones Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff] text-sm text-[#0b1c30]">
              {filteredScouts.map((scout) => (
                <tr key={scout.id} className="hover:bg-[#eff4ff]/50 transition-colors group">
                  {/* Name / Avatar / Email */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#dae2fd] text-[#131b2e] font-bold text-sm flex items-center justify-center shrink-0">
                        {scout.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#0b1c30] truncate">
                            {scout.name}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold ${
                              scout.tag === 'PRO SCOUT'
                                ? 'bg-[#7ffc97]/40 text-[#006b2c]'
                                : scout.tag === 'TOP SCORER'
                                ? 'bg-[#dce9ff] text-[#565e74]'
                                : 'bg-[#dbe1ff] text-[#0051d5]'
                            }`}
                          >
                            {scout.tag}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#565e74] block truncate">
                          {scout.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Picked Vehicles */}
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] font-bold text-sm text-[#0b1c30]">
                      <span className="material-symbols-outlined text-[16px] text-[#006b2c]">local_shipping</span>
                      {scout.pickedVehicles}
                    </div>
                    <span className="block font-mono text-[10px] text-[#565e74] mt-0.5">
                      {scout.pendingUnits > 0
                        ? `${scout.pickedVehicles - scout.pendingUnits} pagados + ${scout.pendingUnits} pendiente`
                        : `${scout.pickedVehicles} liquidados`}
                    </span>
                  </td>

                  {/* Pending Amount */}
                  <td className="py-4 px-4">
                    {scout.pendingAmount > 0 ? (
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-mono text-sm font-bold border border-amber-200">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                          ${scout.pendingAmount.toFixed(2)}
                        </span>
                        <span className="block font-mono text-[11px] text-amber-700 mt-1">
                          {scout.pendingUnits} {scout.pendingUnits === 1 ? 'auto' : 'autos'} x ${tariffFix}.00
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7ffc97]/30 text-[#006b2c] font-mono text-sm font-bold">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          $0.00
                        </span>
                        <span className="block font-mono text-[11px] text-[#006b2c] mt-1 font-semibold">Al Día</span>
                      </div>
                    )}
                  </td>

                  {/* Total Paid */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-sm text-[#006b2c]">
                      ${scout.totalPaid.toFixed(2)}
                    </span>
                    <span className="block font-mono text-[11px] text-[#565e74] mt-1">
                      {scout.totalPaid > 0 ? `${scout.pickedVehicles - scout.pendingUnits} dispersiones OK` : 'Sin dispersiones'}
                    </span>
                  </td>

                  {/* Historical Total */}
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm text-[#0b1c30] font-bold">
                      ${scout.totalHistorical.toFixed(2)}
                    </span>
                    <span className="block font-mono text-[11px] text-[#565e74] mt-1">
                      {scout.pendingAmount > 0 ? 'Con saldo activo' : 'Histórico completo'}
                    </span>
                  </td>

                  {/* Quick Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-2 justify-end">
                      {scout.pendingAmount > 0 ? (
                        <button
                          type="button"
                          onClick={() => onOpenPaymentModal(scout)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold shadow-sm transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">payments</span>
                          <span>Pagar Comisión (${scout.pendingAmount.toFixed(2)})</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenPaymentModal(scout)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold transition-all border border-[#e5eeff]"
                        >
                          <span className="material-symbols-outlined text-[16px]">history</span>
                          <span>Ver Historial</span>
                        </button>
                      )}
                      <button
                        type="button"
                        className="w-8 h-8 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#565e74] hover:text-[#0b1c30] flex items-center justify-center transition-colors border border-[#e5eeff]"
                        title="Ver detalle"
                        onClick={() => onOpenPaymentModal(scout)}
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#565e74] border-t border-[#eff4ff]">
          <div className="flex items-center gap-2">
            <span>Mostrando {scouts.length} de {scouts.length} scouts registrados</span>
            <span className="w-1 h-1 rounded-full bg-[#bdcaba]"></span>
            <span className="text-[#006b2c] font-mono font-bold">Liquidación media: 12 horas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#00873a] text-white font-bold">1</span>
          </div>
        </div>
      </div>

      {/* Operational Activity & Dispatched Tow Verification Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Dispatches Pending Review */}
        <div className="lg:col-span-2 rounded-xl bg-white p-5 shadow-sm border border-[#e5eeff] space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006b2c] text-[20px]">local_shipping</span>
                <h3 className="text-base font-bold text-[#0b1c30]">
                  Últimos Vehículos Retirados Vinculados a Scouts
                </h3>
              </div>
              <p className="text-xs text-[#565e74]">
                Auditoría en tiempo real para autorizar pagos automáticos al verificar la firma de recibo.
              </p>
            </div>
            <span className="font-mono text-xs text-[#006b2c] font-bold bg-[#7ffc97]/30 px-2.5 py-1 rounded-full">
              SYNC ACTIVO
            </span>
          </div>

          <div className="space-y-2.5">
            {dispatchedVehicles.map((disp) => (
              <div
                key={disp.id}
                className="p-3.5 rounded-xl bg-[#eff4ff] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#e5eeff]/70 transition-all border border-[#e5eeff]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-[#dae2fd] text-[#565e74] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">directions_car</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0b1c30] truncate">{disp.vehicleName}</span>
                      <span
                        className={`px-2 py-0.2 rounded-full font-mono text-[10px] font-bold ${
                          disp.status === 'Liquidado'
                            ? 'bg-[#dae2fd] text-[#131b2e]'
                            : 'bg-[#7ffc97]/40 text-[#006b2c]'
                        }`}
                      >
                        {disp.deliveredBadge}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-[#565e74] flex flex-wrap items-center gap-3 mt-0.5">
                      <span>VIN: {disp.vin}</span>
                      <span>Scout: {disp.scoutName}</span>
                      <span>Ubicación: {disp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
                  <div className="text-right">
                    <span
                      className={`text-sm font-bold block ${
                        disp.status === 'Liquidado' ? 'text-[#006b2c]' : 'text-amber-700'
                      }`}
                    >
                      {disp.status === 'Liquidado' ? `$${disp.commission.toFixed(2)}` : `+$${disp.commission.toFixed(2)}`}
                    </span>
                    <span className="font-mono text-[10px] text-[#565e74] block">
                      {disp.status === 'Liquidado' ? 'Pagado por Zelle' : 'Comisión pendiente'}
                    </span>
                  </div>

                  {disp.status === 'Comisión pendiente' ? (
                    <button
                      type="button"
                      onClick={() => onApproveDispatch(disp.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#006b2c] text-white hover:bg-[#00873a] text-xs font-bold transition-colors shadow-sm"
                    >
                      Aprobar
                    </button>
                  ) : (
                    <span className="material-symbols-outlined text-[#006b2c] text-[22px]">task_alt</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Payment Instructions & Policy */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-[#e5eeff] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#0051d5] text-[22px]">policy</span>
              <h3 className="text-base font-bold text-[#0b1c30]">Protocolo de Liquidación</h3>
            </div>
            <p className="text-xs text-[#565e74] leading-relaxed">
              Las reglas y tiempos para autorizar compensación a los buscadores de vehículos:
            </p>
            <ul className="mt-4 space-y-3 text-xs text-[#0b1c30]">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#006b2c] text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>
                  <strong>Grúa completada:</strong> La comisión de ${tariffFix}.00 se activa sólo cuando el auto ingresa al corralón o patio de chatarrización.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#006b2c] text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>
                  <strong>Método Zelle:</strong> Transferencia directa al correo o teléfono registrado del Scout sin deducción de comisiones bancarias.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0 mt-0.5">warning</span>
                <span>
                  <strong>Títulos Limpios / Gravamen:</strong> No se liquida comisión en vehículos retenidos por falta de documentación o disputas de titularidad.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-[#eff4ff] space-y-1.5 border border-[#e5eeff]">
            <div className="flex items-center justify-between text-[#565e74] text-[11px] uppercase font-bold">
              <span>Contacto Soporte Dispatch</span>
              <span className="text-[#006b2c]">Disponible</span>
            </div>
            <p className="text-xs text-[#0b1c30] font-semibold font-mono">
              (984) 274 0781 • pay4myjunkcar@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Quick Tariff Modal */}
      {showTariffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-[#e5eeff] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0b1c30]">Configurar Tarifa Scout</h3>
              <button
                type="button"
                onClick={() => setShowTariffModal(false)}
                className="text-[#565e74] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#565e74]">
              Define la compensación fija garantizada por cada vehículo remolcado con éxito.
            </p>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-sm font-bold text-[#565e74]">$</span>
              <input
                type="number"
                value={tariffFix}
                onChange={(e) => setTariffFix(Number(e.target.value))}
                className="w-full bg-[#eff4ff] pl-7 pr-3 py-2 rounded-lg text-sm font-bold text-[#0b1c30] outline-none"
              />
              <span className="absolute right-3 font-mono text-xs text-[#565e74]">USD</span>
            </div>
            <button
              type="button"
              onClick={() => setShowTariffModal(false)}
              className="w-full py-2 bg-[#006b2c] text-white font-bold text-xs rounded-lg hover:bg-[#00873a]"
            >
              Aplicar Tarifa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

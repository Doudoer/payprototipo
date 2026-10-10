import React, { useState } from 'react';
import { Lead, LeadStatus } from '../../types';

interface ManageLeadModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLead: (updated: Lead) => void;
}

export const ManageLeadModal: React.FC<ManageLeadModalProps> = ({
  lead,
  isOpen,
  onClose,
  onUpdateLead,
}) => {
  if (!isOpen || !lead) return null;

  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [vin, setVin] = useState(lead.vin || '');
  const [offer, setOffer] = useState(lead.offer);
  const [assignedTow, setAssignedTow] = useState(lead.assignedTow || 'Unidad Grúa #02 (Hino Flatbed)');
  const [notes, setNotes] = useState('Cliente confirmó disponibilidad para recogida esta tarde.');

  const handleSave = () => {
    const updated: Lead = {
      ...lead,
      status,
      vin,
      offer,
      assignedTow,
      validation: vin.trim().length >= 11 ? 'VIN Verificado' : lead.validation,
    };
    onUpdateLead(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-[#e5eeff] space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center font-bold font-mono">
              {lead.id}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0b1c30]">{lead.vehicle}</h3>
              <span className="text-xs text-[#565e74]">
                {lead.customerName || 'Cliente'} · {lead.phone}
              </span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-[#565e74] hover:text-[#0b1c30]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-3.5 text-xs">
          {/* Status selector */}
          <div>
            <label className="block text-[#565e74] font-semibold mb-1">Estado en Pipeline</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Nuevas', 'Aceptadas', 'Agenda', 'Completado', 'Cancelado', 'Archivadas'] as const).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                      status === st
                        ? 'bg-[#006b2c] text-white shadow-sm'
                        : 'bg-[#eff4ff] text-[#565e74] hover:bg-[#e5eeff]'
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Offer & VIN */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Oferta Autorizada ($)</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-sm font-bold text-[#006b2c]">$</span>
                <input
                  type="number"
                  value={offer}
                  onChange={(e) => setOffer(Number(e.target.value))}
                  className="w-full bg-[#eff4ff] pl-7 pr-3 py-2 rounded-lg text-sm font-bold text-[#006b2c] outline-none border border-[#e5eeff]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Número de VIN</label>
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                placeholder="1HGCR2F83HA..."
                className="w-full bg-[#eff4ff] px-3 py-2 rounded-lg font-mono text-xs text-[#0b1c30] outline-none border border-[#e5eeff]"
              />
            </div>
          </div>

          {/* Tow Truck Assignment */}
          <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#e5eeff] space-y-2">
            <span className="font-bold text-[#0b1c30] block flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#006b2c]">local_shipping</span>
              Asignación Logística de Grúa
            </span>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`p-2 rounded-lg border cursor-pointer flex flex-col gap-1 ${
                  assignedTow.includes('#02')
                    ? 'border-[#006b2c] bg-white shadow-sm'
                    : 'border-transparent bg-white/50'
                }`}
              >
                <input
                  type="radio"
                  name="towUnit"
                  checked={assignedTow.includes('#02')}
                  onChange={() => setAssignedTow('Unidad Grúa #02 (Hino Flatbed)')}
                  className="sr-only"
                />
                <span className="font-bold text-[#0b1c30]">Unidad Grúa #02</span>
                <span className="text-[10px] text-[#565e74]">Hino Flatbed (Clayton / Raleigh)</span>
              </label>

              <label
                className={`p-2 rounded-lg border cursor-pointer flex flex-col gap-1 ${
                  assignedTow.includes('#01')
                    ? 'border-[#006b2c] bg-white shadow-sm'
                    : 'border-transparent bg-white/50'
                }`}
              >
                <input
                  type="radio"
                  name="towUnit"
                  checked={assignedTow.includes('#01')}
                  onChange={() => setAssignedTow('Unidad Grúa #01 (Ram 5500)')}
                  className="sr-only"
                />
                <span className="font-bold text-[#0b1c30]">Unidad Grúa #01</span>
                <span className="text-[10px] text-[#565e74]">Ram 5500 (Durham / Wake Forest)</span>
              </label>
            </div>
          </div>

          {/* Dispatcher Notes */}
          <div>
            <label className="block text-[#565e74] font-semibold mb-1">Notas de Despacho</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#eff4ff] px-3 py-2 rounded-lg text-xs text-[#0b1c30] outline-none border border-[#e5eeff] resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#eff4ff]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#565e74] font-semibold"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-[#006b2c] hover:bg-[#00873a] text-white font-bold shadow-sm"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Lead, PricingConfig } from '../../types';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Lead) => void;
  pricingConfig: PricingConfig;
}

export const NewLeadModal: React.FC<NewLeadModalProps> = ({
  isOpen,
  onClose,
  onAddLead,
  pricingConfig,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Raleigh');
  const [zip, setZip] = useState('27604');
  const [year, setYear] = useState('2010');
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('Corolla');
  const [bodyType, setBodyType] = useState('Sedan (Medium)');
  const [specs, setSpecs] = useState('Gasolina · 165k mi');
  const [channel, setChannel] = useState<'Web Orgánica' | 'Scout FB' | 'Web Directa'>('Web Directa');
  const [vin, setVin] = useState('');
  const [runs, setRuns] = useState(true);
  const [hasTitle, setHasTitle] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Auto-calculate offer based on pricing config
    let base = 400;
    if (!runs) base -= (base * pricingConfig.engineFailPct) / 100;
    if (!hasTitle) base -= pricingConfig.noTitleFee;
    if (base < pricingConfig.guaranteedMin) base = pricingConfig.guaranteedMin;

    const newLead: Lead = {
      id: `#${Math.floor(440 + Math.random() * 50)}`,
      phone: phone || '(919) 555-0199',
      city,
      zip: zip || '27604',
      vehicle: `${year} ${make.toUpperCase()} ${model}`,
      bodyType,
      specs: `${specs} ${runs ? '· Enciende' : '· No arranca'}`,
      channel,
      validation: vin.trim().length >= 11 ? 'VIN Verificado' : 'Falta VIN',
      offer: Math.round(base),
      tierName: base > 350 ? 'Oferta Premium VIP' : 'Scrap Rate Tier A',
      status: 'Nuevas',
      dateCreated: 'Recién ingresada',
      customerName: customerName || 'Cliente Particular',
      vin,
    };

    onAddLead(newLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-[#e5eeff] space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <h3 className="text-base font-bold text-[#0b1c30]">Nueva Cotización / Lead</h3>
          </div>
          <button type="button" onClick={onClose} className="text-[#565e74] hover:text-[#0b1c30]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Nombre del Cliente</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej: David Hernandez"
                className="w-full px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] outline-none focus:bg-white border border-[#e5eeff]"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Teléfono</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(919) 456-7890"
                className="w-full px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] outline-none focus:bg-white border border-[#e5eeff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Ciudad</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] outline-none border border-[#e5eeff] font-semibold"
              >
                <option value="Raleigh">Raleigh, NC</option>
                <option value="Durham">Durham, NC</option>
                <option value="Wake Forest">Wake Forest, NC</option>
                <option value="Clayton">Clayton, NC</option>
                <option value="Cary">Cary, NC</option>
              </select>
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">ZIP Code</label>
              <input
                type="text"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="27604"
                className="w-full px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] outline-none border border-[#e5eeff]"
              />
            </div>
          </div>

          <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#e5eeff] space-y-2.5">
            <span className="font-bold text-[#0b1c30] block">Datos del Vehículo</span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-[#565e74] block mb-0.5">Año</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-2 py-1.5 rounded bg-white text-[#0b1c30] border border-[#e5eeff]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#565e74] block mb-0.5">Marca</label>
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full px-2 py-1.5 rounded bg-white text-[#0b1c30] border border-[#e5eeff]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#565e74] block mb-0.5">Modelo</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-2 py-1.5 rounded bg-white text-[#0b1c30] border border-[#e5eeff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[10px] text-[#565e74] block mb-0.5">Tipo Carrocería</label>
                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="w-full px-2 py-1.5 rounded bg-white text-[#0b1c30] border border-[#e5eeff]"
                >
                  <option>Sedan (Compact)</option>
                  <option>Sedan (Medium)</option>
                  <option>Sedan (Large)</option>
                  <option>SUV / Crossover</option>
                  <option>Pickup Truck</option>
                  <option>Van / Minivan</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-[#565e74] block mb-0.5">Canal de Entrada</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded bg-white text-[#0b1c30] border border-[#e5eeff]"
                >
                  <option value="Web Directa">Web Directa</option>
                  <option value="Web Orgánica">Web Orgánica</option>
                  <option value="Scout FB">Scout FB</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[#565e74] block mb-0.5">Número de VIN (Opcional)</label>
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                placeholder="1HGCR2F83HA..."
                className="w-full px-2.5 py-1.5 rounded bg-white font-mono text-[#0b1c30] border border-[#e5eeff]"
              />
            </div>

            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={runs}
                  onChange={(e) => setRuns(e.target.checked)}
                  className="accent-[#006b2c]"
                />
                <span className="text-[11px] font-semibold text-[#0b1c30]">Motor enciende</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTitle}
                  onChange={(e) => setHasTitle(e.target.checked)}
                  className="accent-[#006b2c]"
                />
                <span className="text-[11px] font-semibold text-[#0b1c30]">Título de propiedad OK</span>
              </label>
            </div>
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
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#006b2c] hover:bg-[#00873a] text-white font-bold shadow-sm"
            >
              Guardar y Cotizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

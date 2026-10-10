import React, { useState } from 'react';
import { Scout } from '../../types';

interface NewScoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddScout: (scout: Scout) => void;
}

export const NewScoutModal: React.FC<NewScoutModalProps> = ({
  isOpen,
  onClose,
  onAddScout,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rate, setRate] = useState(30);
  const [fbUrl, setFbUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'SC';

    const newScout: Scout = {
      id: `scout-${Date.now()}`,
      name,
      email,
      phone: phone || '(919) 000-0000',
      tag: 'ACTIVE',
      initials,
      pickedVehicles: 0,
      pendingUnits: 0,
      pendingAmount: 0,
      totalPaid: 0,
      totalHistorical: 0,
      ratePerCar: rate,
      fbProfileUrl: fbUrl || 'https://facebook.com/marketplace',
      status: 'online',
    };

    onAddScout(newScout);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4 border border-[#e5eeff]">
        <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#006b2c]/20 text-[#006b2c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
            </div>
            <h3 className="text-base font-bold text-[#0b1c30]">Alta de Nuevo Scout FB</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#565e74] hover:text-[#0b1c30] hover:bg-[#eff4ff]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#565e74] font-semibold mb-1">Nombre Completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Carlos Alberto Mendoza"
              className="w-full px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] outline-none focus:bg-white border border-[#e5eeff]"
            />
          </div>

          <div>
            <label className="block text-[#565e74] font-semibold mb-1">
              Correo Electrónico (Para Zelle y Notificaciones)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@gmail.com"
              className="w-full px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] outline-none focus:bg-white border border-[#e5eeff]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Teléfono Móvil</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(984) 000-0000"
                className="w-full px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] outline-none focus:bg-white border border-[#e5eeff]"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Comisión por Carro ($)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] outline-none focus:bg-white border border-[#e5eeff] font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#565e74] font-semibold mb-1">
              ID Perfil de Facebook / Enlace Marketplace
            </label>
            <input
              type="text"
              value={fbUrl}
              onChange={(e) => setFbUrl(e.target.value)}
              placeholder="https://facebook.com/..."
              className="w-full px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] outline-none focus:bg-white border border-[#e5eeff]"
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
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#006b2c] hover:bg-[#00873a] text-white font-bold shadow-sm"
            >
              Guardar y Habilitar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

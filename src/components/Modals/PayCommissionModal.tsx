import React, { useState } from 'react';
import { Scout } from '../../types';

interface PayCommissionModalProps {
  scout: Scout | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (scoutId: string, amount: number, method: string, refCode: string) => void;
}

export const PayCommissionModal: React.FC<PayCommissionModalProps> = ({
  scout,
  isOpen,
  onClose,
  onConfirmPayment,
}) => {
  if (!isOpen || !scout) return null;

  const [payoutMethod, setPayoutMethod] = useState<'zelle' | 'cash'>('zelle');
  const [refCode, setRefCode] = useState(
    `ZLL-${Math.floor(1000000000 + Math.random() * 9000000000)}`
  );

  const amountToPay = scout.pendingAmount > 0 ? scout.pendingAmount : scout.ratePerCar;

  const handleConfirm = () => {
    onConfirmPayment(scout.id, amountToPay, payoutMethod, refCode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4 border border-[#e5eeff]">
        <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7ffc97]/30 text-[#006b2c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <h3 className="text-base font-bold text-[#0b1c30]">Confirmar Pago de Comisión</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#565e74] hover:text-[#0b1c30] hover:bg-[#eff4ff]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scout Summary Card */}
        <div className="p-4 rounded-xl bg-[#eff4ff] space-y-2 border border-[#e5eeff] text-xs">
          <div className="flex justify-between items-center">
            <span className="text-[#565e74]">Scout Beneficiario:</span>
            <span className="font-bold text-[#0b1c30]">{scout.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#565e74]">Email Registrado:</span>
            <span className="font-mono text-[#0b1c30]">{scout.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#565e74]">Volumen Liquidado:</span>
            <span className="font-mono font-semibold text-[#0b1c30]">
              {scout.pendingUnits > 0 ? `${scout.pendingUnits} autos` : '1 auto'}
            </span>
          </div>
          <div className="pt-2 border-t border-[#dce9ff] flex justify-between items-center">
            <span className="text-sm font-bold text-[#0b1c30]">Monto a Enviar:</span>
            <span className="text-2xl font-extrabold text-[#006b2c] font-mono">
              ${amountToPay.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Disbursement Method */}
        <div className="space-y-2 text-xs">
          <label className="block text-[#565e74] font-semibold">Vía de Desembolso</label>
          <div className="grid grid-cols-2 gap-2">
            <label
              className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                payoutMethod === 'zelle'
                  ? 'border-[#006b2c] bg-[#eff4ff] text-[#006b2c]'
                  : 'border-[#e5eeff] bg-white text-[#565e74]'
              }`}
            >
              <input
                type="radio"
                name="payout-method"
                value="zelle"
                checked={payoutMethod === 'zelle'}
                onChange={() => setPayoutMethod('zelle')}
                className="accent-[#006b2c]"
              />
              <span className="font-bold text-xs text-[#0b1c30]">Zelle Instantáneo</span>
            </label>
            <label
              className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                payoutMethod === 'cash'
                  ? 'border-[#006b2c] bg-[#eff4ff] text-[#006b2c]'
                  : 'border-[#e5eeff] bg-white text-[#565e74]'
              }`}
            >
              <input
                type="radio"
                name="payout-method"
                value="cash"
                checked={payoutMethod === 'cash'}
                onChange={() => setPayoutMethod('cash')}
                className="accent-[#006b2c]"
              />
              <span className="font-bold text-xs text-[#0b1c30]">Efectivo / Mano</span>
            </label>
          </div>
        </div>

        {/* Ref code input */}
        <div className="text-xs">
          <label className="block text-[#565e74] font-semibold mb-1">
            Código de Referencia / Comprobante Zelle
          </label>
          <input
            type="text"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] font-mono outline-none border border-[#e5eeff]"
            placeholder="Ej: ZLL-9038472910"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#eff4ff]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#565e74] text-xs font-semibold"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 rounded-lg bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold shadow-sm transition-all"
          >
            Confirmar y Emitir Recibo
          </button>
        </div>
      </div>
    </div>
  );
};

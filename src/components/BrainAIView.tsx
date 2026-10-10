import React from 'react';
import { ScreenId } from '../types';

export const BrainAIView: React.FC<{
  onNavigate: (screen: ScreenId) => void;
  lang: 'es' | 'en';
}> = ({ onNavigate, lang }) => {
  return (
    <div className="flex flex-col w-full pb-16 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#565e74] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Operaciones</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006b2c]">
              Brain AI Engine
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0b1c30] flex items-center gap-2.5">
            <span>Brain AI Engine v2.4</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#7ffc97] text-[#002109] font-mono text-xs font-bold">
              FERROUS SCRAP INTELLIGENCE
            </span>
          </h1>
          <p className="text-xs text-[#565e74] mt-0.5">
            Monitoreo en tiempo real de precios de chatarra ferrosa, metales preciosos (catalizadores) y sugerencia algorítmica de bids.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('estrategia-de-precios')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span>Sincronizar con Matriz de Precios</span>
        </button>
      </div>

      {/* Commodity price tickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-sm">
          <div className="flex justify-between items-center text-xs text-[#565e74] font-semibold">
            <span>Chatarra Ferrosa HMS #1</span>
            <span className="text-[#006b2c] font-bold font-mono">+3.8% hoy</span>
          </div>
          <div className="text-2xl font-extrabold text-[#0b1c30] mt-1 font-mono">$242.50</div>
          <span className="text-[11px] text-[#565e74]">USD por tonelada métrica (Raleigh)</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-sm">
          <div className="flex justify-between items-center text-xs text-[#565e74] font-semibold">
            <span>Carrocería Auto Shredded</span>
            <span className="text-[#006b2c] font-bold font-mono">+2.1% hoy</span>
          </div>
          <div className="text-2xl font-extrabold text-[#0b1c30] mt-1 font-mono">$218.00</div>
          <span className="text-[11px] text-[#565e74]">USD por tonelada neta</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-sm">
          <div className="flex justify-between items-center text-xs text-[#565e74] font-semibold">
            <span>Catalizador OEM Promedio</span>
            <span className="text-[#0051d5] font-bold font-mono">+1.4%</span>
          </div>
          <div className="text-2xl font-extrabold text-[#0b1c30] mt-1 font-mono">$115.00</div>
          <span className="text-[11px] text-[#565e74]">Platino / Paladio / Rodio index</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-sm">
          <div className="flex justify-between items-center text-xs text-[#565e74] font-semibold">
            <span>Margen Neto Estimado / Lead</span>
            <span className="text-[#006b2c] font-bold font-mono">Óptimo</span>
          </div>
          <div className="text-2xl font-extrabold text-[#006b2c] mt-1 font-mono">+$115.00</div>
          <span className="text-[11px] text-[#565e74]">Retorno después de grúa y scouting</span>
        </div>
      </div>

      {/* Main AI Insights Box */}
      <div className="bg-white rounded-xl border border-[#e5eeff] p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#dbe1ff] text-[#0051d5] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">psychology</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0b1c30]">
              Recomendación Automática para Despacho de Hoy
            </h3>
            <p className="text-xs text-[#565e74]">
              Modelado predictivo de oferta vs tasa de conversión en los condados de Wake, Durham y Johnston.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#e5eeff] space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#006b2c]">
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span>Aumento en precio de compra recomendado: +$15.00 a +$20.00 en Sedanes Medianos</span>
          </div>
          <p className="text-[#3e4a3d] leading-relaxed">
            Dado el repunte del 3.8% en los molinos de Greensboro y Charlotte, pagar $305.00 - $310.00 por unidades como Toyota Prius (2007) u Honda Accord (1999) captura el 68.4% de las llamadas de los clientes antes de que llamen a la competencia de Pick-n-Pull, garantizando $115.00 neto de margen al compactar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-white rounded-lg border border-[#e5eeff]">
            <span className="text-[11px] text-[#565e74] font-semibold block">Sedanes Compactos</span>
            <span className="text-sm font-bold text-[#0b1c30]">Oferta sugerida: $280 - $320</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-[#e5eeff]">
            <span className="text-[11px] text-[#565e74] font-semibold block">SUVs &amp; Crossovers</span>
            <span className="text-sm font-bold text-[#0b1c30]">Oferta sugerida: $360 - $430</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-[#e5eeff]">
            <span className="text-[11px] text-[#565e74] font-semibold block">Trucks / F-150 / Silverado</span>
            <span className="text-sm font-bold text-[#0b1c30]">Oferta sugerida: $450 - $550</span>
          </div>
        </div>
      </div>
    </div>
  );
};

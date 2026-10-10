import React, { useState } from 'react';

export const PerfilEmpresaView: React.FC<{ lang: 'es' | 'en' }> = ({ lang }) => {
  const [companyName, setCompanyName] = useState('PAY4MYJUNK LLC');
  const [legalName, setLegalName] = useState('Pay4MyJunk Auto Salvage & Logistics NC');
  const [licenseNumber, setLicenseNumber] = useState('NC-SALVAGE-77291');
  const [phone, setPhone] = useState('(984) 274 0781');
  const [email, setEmail] = useState('pay4myjunkcar@gmail.com');
  const [mainYard, setMainYard] = useState('4200 Capital Blvd, Raleigh, NC 27604');
  const [secondaryYard, setSecondaryYard] = useState('1805 E Pettigrew St, Durham, NC 27703');
  const [zelleBusiness, setZelleBusiness] = useState('pay4myjunk-disburse@chase.com');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#565e74] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Operaciones</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006b2c]">
              Perfil de Empresa
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0b1c30]">
            {lang === 'es' ? 'Perfil Operativo de Empresa & Flota' : 'Company & Fleet Operational Profile'}
          </h1>
          <p className="text-xs text-[#565e74] mt-0.5">
            Licencias comerciales de Carolina del Norte, patios de acopio, contactos y flota de remolque activa.
          </p>
        </div>

        {saved && (
          <div className="px-3.5 py-1.5 rounded-lg bg-[#7ffc97]/40 text-[#005320] text-xs font-bold flex items-center gap-1.5 animate-pulse">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Guardado exitosamente</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <form onSubmit={handleSave} className="lg:col-span-8 bg-white p-5 rounded-xl border border-[#e5eeff] shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-[#eff4ff]">
            <span className="material-symbols-outlined text-[#006b2c]">domain</span>
            <h2 className="text-sm font-bold text-[#0b1c30]">Datos Fiscales &amp; Licencias NC</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Nombre Comercial</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-bold border border-[#e5eeff] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Razón Social Registrada</label>
              <input
                type="text"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] border border-[#e5eeff] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Licencia NC DMV Scrap</label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-mono font-semibold border border-[#e5eeff] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Línea Telefónica Dispatch</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-mono border border-[#e5eeff] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Email Oficial de Soporte</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-mono border border-[#e5eeff] outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-[#565e74] font-semibold mb-1">Corralón / Patio Principal (Raleigh)</label>
            <input
              type="text"
              value={mainYard}
              onChange={(e) => setMainYard(e.target.value)}
              className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] border border-[#e5eeff] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#565e74] font-semibold mb-1">Corralón Secundario (Durham)</label>
            <input
              type="text"
              value={secondaryYard}
              onChange={(e) => setSecondaryYard(e.target.value)}
              className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] border border-[#e5eeff] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#565e74] font-semibold mb-1">Cuenta Zelle Corporativa para Dispersiones</label>
            <input
              type="text"
              value={zelleBusiness}
              onChange={(e) => setZelleBusiness(e.target.value)}
              className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-mono font-semibold border border-[#e5eeff] outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold rounded-lg shadow-sm"
            >
              Guardar Perfil de Empresa
            </button>
          </div>
        </form>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
              <h3 className="text-sm font-bold text-[#0b1c30] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006b2c] text-[18px]">local_shipping</span>
                Flota de Grúas Activa
              </h3>
              <span className="text-[10px] bg-[#7ffc97]/30 text-[#005320] px-2 py-0.5 rounded-full font-bold">
                2 en ruta
              </span>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#e5eeff] space-y-1 text-xs">
              <div className="flex justify-between font-bold text-[#0b1c30]">
                <span>Unidad #02 · Hino Flatbed</span>
                <span className="text-[#006b2c]">Activa</span>
              </div>
              <p className="text-[11px] text-[#565e74]">Chofer: Hector R. • Corredor US-70 / Clayton</p>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#e5eeff] space-y-1 text-xs">
              <div className="flex justify-between font-bold text-[#0b1c30]">
                <span>Unidad #01 · Ram 5500 Wrecker</span>
                <span className="text-[#006b2c]">Activa</span>
              </div>
              <p className="text-[11px] text-[#565e74]">Chofer: Marcos T. • I-40 / Raleigh &amp; Cary</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#e5eeff] space-y-1 text-xs opacity-70">
              <div className="flex justify-between font-bold text-[#0b1c30]">
                <span>Unidad #03 · Freightliner M2</span>
                <span className="text-[#565e74]">Mantenimiento</span>
              </div>
              <p className="text-[11px] text-[#565e74]">En revisión preventiva de frenos</p>
            </div>
          </div>

          <div className="bg-[#213145] text-white p-5 rounded-xl shadow-sm space-y-2 text-xs">
            <span className="text-[11px] font-mono text-[#7ffc97] uppercase font-bold">
              Cumplimiento Regulatorio NC
            </span>
            <p className="text-white/80 leading-relaxed">
              PAY4MYJUNK cumple con las regulaciones de la División de Vehículos Motorizados de Carolina del Norte para chatarrización, retención de títulos (MVR-4) y reporte al National Motor Vehicle Title Information System (NMVTIS).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

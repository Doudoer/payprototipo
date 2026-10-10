import React, { useState } from 'react';
import { ScreenId } from '../types';

interface CMSSectionEditorProps {
  sectionId: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  lang: 'es' | 'en';
}

export const CMSSectionEditor: React.FC<CMSSectionEditorProps> = ({
  sectionId,
  onNavigate,
  lang,
}) => {
  const [saved, setSaved] = useState(false);

  // Section 1: Header & Logo state
  const [brandTitle, setBrandTitle] = useState('PAY4MYJUNK');
  const [phoneContact, setPhoneContact] = useState('(984) 274 0781');
  const [headerCta, setHeaderCta] = useState('Obtén Cotización');
  const [navLinks, setNavLinks] = useState('Beneficios, Cómo Funciona, Preguntas, Cobertura');

  // Section 2: Beneficios state
  const [benefits, setBenefits] = useState([
    {
      icon: 'payments',
      title: 'Efectivo en Mano',
      desc: 'Pago inmediato en cash o Zelle en el momento exacto en que la grúa engancha el carro.',
    },
    {
      icon: 'local_shipping',
      title: 'Grúa 100% Gratis',
      desc: 'Servicio de remolque sin cargos ocultos en todo Raleigh, Durham y Wake County.',
    },
    {
      icon: 'verified_user',
      title: 'Compramos con o sin Título',
      desc: 'Asesoría y trámite legal según las normativas del DMV de Carolina del Norte.',
    },
    {
      icon: 'car_crash',
      title: 'Cualquier Condición',
      desc: 'Autos chocados, con motor desbielado, sin llaves, desvalijados o abandonados.',
    },
  ]);

  // Section 3: Proceso state
  const [steps, setSteps] = useState([
    {
      step: '1',
      title: 'Cotiza en 2 minutos',
      desc: 'Ingresa el año, marca y condición de tu vehículo para recibir una oferta instantánea.',
    },
    {
      step: '2',
      title: 'Agenda la Grúa',
      desc: 'Coordinamos la hora de recogida que te sea más conveniente, hoy mismo o mañana.',
    },
    {
      step: '3',
      title: 'Recibe tu Dinero',
      desc: 'El chofer revisa el vehículo, te entrega el efectivo o comprobante Zelle y se lo lleva.',
    },
  ]);

  // Section 4: FAQ state
  const [faqs, setFaqs] = useState([
    {
      q: '¿Compran autos sin título en Carolina del Norte?',
      a: 'Sí. Para vehículos de más de 10 años, la ley de NC permite la compra con registro vencido y verificación de propiedad mediante declaración jurada.',
      open: true,
    },
    {
      q: '¿El servicio de grúa tiene algún costo para mí?',
      a: 'No, la recogida y el remolque son 100% gratuitos dentro de nuestra área de cobertura.',
      open: false,
    },
    {
      q: '¿Qué tan rápido pueden recoger el auto?',
      a: 'Generalmente recogemos el mismo día si confirmas antes de las 2:00 PM, o en menos de 24 horas.',
      open: false,
    },
    {
      q: '¿Qué pasa si mi auto no arranca o no tiene ruedas?',
      a: 'Nuestras grúas de plataforma están equipadas con winches para subir autos inmóviles o sin ruedas.',
      open: false,
    },
  ]);

  // Section 5: Testimonios state
  const [testimonials, setTestimonials] = useState([
    {
      name: 'Carlos Mendoza',
      city: 'Raleigh, NC',
      car: '2004 Honda Civic',
      stars: 5,
      text: 'Llamé en la mañana y a las 3 de la tarde ya había venido la grúa. Me pagaron los $280 acordados sin regatear.',
    },
    {
      name: 'Sarah Jenkins',
      city: 'Durham, NC',
      car: '2008 Ford Explorer',
      stars: 5,
      text: 'Tenía un SUV ocupando espacio en el garaje sin arrancar. Excelente servicio, muy amables y puntuales.',
    },
    {
      name: 'Miguel Ángel R.',
      city: 'Clayton, NC',
      car: '2001 Toyota Corolla',
      stars: 5,
      text: 'No tenía el título original a mano y me explicaron el procedimiento legal sin rodeos. Muy confiables.',
    },
  ]);

  // Section 6: Footer state
  const [footerPhone, setFooterPhone] = useState('(984) 274 0781');
  const [footerAddress, setFooterAddress] = useState('Capital Blvd, Raleigh, NC 27604 / Pettigrew St, Durham, NC');
  const [footerHours, setFooterHours] = useState('Lunes a Sábado: 7:00 AM – 8:00 PM | Domingo: 8:00 AM – 4:00 PM');
  const [licenseText, setLicenseText] = useState('NC Salvage Dealer License #NC-77291 · Asegurado & Certificado');

  // Section 7: SEO state
  const [seoTitle, setSeoTitle] = useState('Dinero por Autos Viejos y Chatarra en Raleigh & Durham NC | PAY4MYJUNK');
  const [seoDesc, setSeoDesc] = useState('Vendemos autos usados, descompuestos y chatarra en Carolina del Norte. Pago en efectivo inmediato y grúa gratis en Raleigh, Durham y Wake County.');
  const [seoKeywords, setSeoKeywords] = useState('junk cars raleigh nc, cash for junk cars durham, vender carro chatarra, dinero por autos viejos');

  const titles: Record<string, { title: string; desc: string }> = {
    'header-and-logo': {
      title: 'Header & Logo Navigation',
      desc: 'Configuración del logotipo comercial, enlaces de navegación, número de contacto (984) 274 0781 y botón de cotización.',
    },
    beneficios: {
      title: 'Sección de Beneficios (Por Qué Elegirnos)',
      desc: 'Pago en efectivo inmediato, grúa gratuita sin cargos ocultos, gestión de título y compra de modelos 2014 y anteriores.',
    },
    proceso: {
      title: 'Proceso en 3 Pasos (Cómo Funciona)',
      desc: 'Paso 1: Solicita tu cotización en 2 minutos. Paso 2: Agenda la recogida con grúa. Paso 3: Recibe tu dinero en mano.',
    },
    preguntas: {
      title: 'Preguntas Frecuentes (FAQ Accordion)',
      desc: 'Respuestas sobre títulos perdidos en Carolina del Norte, autos chocados sin llaves, y documentación requerida.',
    },
    testimonios: {
      title: 'Testimonios & Reseñas de Clientes',
      desc: 'Calificaciones de 5 estrellas en Raleigh, Durham, Wake Forest y Clayton de clientes que vendieron sus autos viejos.',
    },
    'pie-de-pagina': {
      title: 'Pie de Página (Footer & Legal)',
      desc: 'Enlaces legales, zonas de cobertura en Wake County, horarios de atención y advertencia de derechos reservados.',
    },
    'seo-landing': {
      title: 'SEO Landing & Meta Tags',
      desc: 'Optimización de títulos para Google Search, OpenGraph, palabras clave "junk cars raleigh", "dinero por autos chocados".',
    },
  };

  const current = titles[sectionId] || {
    title: 'Personalización de Contenido',
    desc: 'Editor CMS en tiempo real para la landing page.',
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-6 font-sans">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#565e74] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Marketing &amp; CMS</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006b2c]">
              {current.title}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0b1c30] tracking-tight">{current.title}</h1>
          <p className="text-xs text-[#565e74] mt-0.5">{current.desc}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('hero-section')}
            className="px-3.5 py-2 bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-bold rounded-lg border border-[#e5eeff] flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>Ver Hero Section Principal</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>{saved ? '¡Guardado en CDN!' : 'Guardar y Publicar'}</span>
          </button>
        </div>
      </div>

      {/* Connection badge */}
      <div className="p-3.5 bg-white rounded-xl border border-[#e5eeff] shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[#006b2c] font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#006b2c] animate-pulse"></span>
          <span>Editor en Tiempo Real Sincronizado con CDN de Landing Page</span>
        </div>
        <div className="flex items-center gap-2 text-[#565e74] font-mono text-[11px]">
          <span>Idioma: {lang === 'es' ? 'Español (ES)' : 'English (EN)'}</span>
          <span>·</span>
          <span>Estado: Publicado</span>
        </div>
      </div>

      {/* ================= SECTION: HEADER & LOGO ================= */}
      {sectionId === 'header-and-logo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#e5eeff] p-6 shadow-sm space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#0b1c30]">Ajustes de Navegación y Logotipo</h3>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Nombre Comercial de la Marca</label>
              <input
                type="text"
                value={brandTitle}
                onChange={(e) => setBrandTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-bold border border-[#e5eeff] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Teléfono Hotline Directo</label>
              <input
                type="text"
                value={phoneContact}
                onChange={(e) => setPhoneContact(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-mono font-semibold border border-[#e5eeff] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Texto del Botón CTA Principal</label>
              <input
                type="text"
                value={headerCta}
                onChange={(e) => setHeaderCta(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-semibold border border-[#e5eeff] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Enlaces del Menú Superior</label>
              <input
                type="text"
                value={navLinks}
                onChange={(e) => setNavLinks(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#eff4ff] rounded-lg text-[#0b1c30] border border-[#e5eeff] outline-none"
              />
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-[#0b1c30] rounded-xl border border-white/10 p-6 shadow-md text-white space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] text-[#7ffc97] font-mono uppercase tracking-wider block">
                VISTA PREVIA DEL NAVBAR
              </span>
              <div className="bg-[#213145] p-4 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#006b2c] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white tracking-tight">{brandTitle}</span>
                    <span className="block text-[10px] text-[#7ffc97] font-mono">RALEIGH - DURHAM</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-3 text-xs text-white/80">
                  <span className="hover:text-white cursor-pointer">Beneficios</span>
                  <span className="hover:text-white cursor-pointer">Proceso</span>
                  <span className="hover:text-white cursor-pointer">Preguntas</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${phoneContact.replace(/\D/g, '')}`}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold"
                  >
                    {phoneContact}
                  </a>
                  <button className="px-3 py-1.5 rounded-lg bg-[#006b2c] text-white text-xs font-bold shadow-sm">
                    {headerCta}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-white/50">
              Esta barra se renderiza en la parte superior fija de la landing page pública para conversión telefónica instantánea.
            </p>
          </div>
        </div>
      )}

      {/* ================= SECTION: BENEFICIOS ================= */}
      {sectionId === 'beneficios' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#e5eeff] p-6 shadow-sm space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#0b1c30]">Tarjetas de Beneficios Destacados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((b, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#eff4ff] border border-[#e5eeff] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#006b2c] text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">{b.icon}</span>
                      </div>
                      <input
                        type="text"
                        value={b.title}
                        onChange={(e) => {
                          const updated = [...benefits];
                          updated[idx].title = e.target.value;
                          setBenefits(updated);
                        }}
                        className="font-bold text-xs bg-transparent border-b border-transparent focus:border-[#006b2c] outline-none text-[#0b1c30]"
                      />
                    </div>
                    <span className="font-mono text-[11px] text-[#565e74]">Item #{idx + 1}</span>
                  </div>
                  <textarea
                    rows={2}
                    value={b.desc}
                    onChange={(e) => {
                      const updated = [...benefits];
                      updated[idx].desc = e.target.value;
                      setBenefits(updated);
                    }}
                    className="w-full text-xs text-[#565e74] bg-white p-2 rounded-lg border border-[#e5eeff] outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION: PROCESO ================= */}
      {sectionId === 'proceso' && (
        <div className="bg-white rounded-xl border border-[#e5eeff] p-6 shadow-sm space-y-6 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30]">Cómo Funciona el Proceso en 3 Pasos</h3>
              <p className="text-xs text-[#565e74] mt-0.5">Edita las 3 etapas que guían al cliente desde la cotización hasta el cobro en efectivo.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((st, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#eff4ff] border border-[#e5eeff] space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-[#006b2c] text-white font-black text-sm flex items-center justify-center">
                  {st.step}
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#565e74] uppercase mb-1">Título del Paso</label>
                  <input
                    type="text"
                    value={st.title}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].title = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full px-3 py-2 bg-white rounded-lg font-bold text-[#0b1c30] border border-[#e5eeff] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#565e74] uppercase mb-1">Descripción</label>
                  <textarea
                    rows={3}
                    value={st.desc}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].desc = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full p-2 bg-white rounded-lg text-xs text-[#565e74] border border-[#e5eeff] outline-none resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION: PREGUNTAS (FAQ) ================= */}
      {sectionId === 'preguntas' && (
        <div className="bg-white rounded-xl border border-[#e5eeff] p-6 shadow-sm space-y-5 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30]">Preguntas Frecuentes (Acordeón FAQ)</h3>
              <p className="text-xs text-[#565e74] mt-0.5">Respuestas clave sobre compras de chatarra, títulos perdidos en Carolina del Norte y pagos.</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFaqs([
                  ...faqs,
                  {
                    q: 'Nueva pregunta frecuente',
                    a: 'Respuesta detallada para resolver dudas del cliente de NC.',
                    open: false,
                  },
                ])
              }
              className="px-3 py-1.5 bg-[#eff4ff] hover:bg-[#e5eeff] text-[#006b2c] font-bold rounded-lg flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Añadir Pregunta</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-[#e5eeff] overflow-hidden bg-[#eff4ff]">
                <div
                  onClick={() => {
                    const updated = [...faqs];
                    updated[idx].open = !updated[idx].open;
                    setFaqs(updated);
                  }}
                  className="p-3.5 flex items-center justify-between cursor-pointer bg-white"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#006b2c]/10 text-[#006b2c] font-bold text-xs flex items-center justify-center">
                      Q
                    </span>
                    <input
                      type="text"
                      value={faq.q}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        const updated = [...faqs];
                        updated[idx].q = e.target.value;
                        setFaqs(updated);
                      }}
                      className="font-bold text-[#0b1c30] text-xs bg-transparent border-b border-transparent focus:border-[#006b2c] outline-none w-80 sm:w-96"
                    />
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#565e74]">
                    {faq.open ? 'expand_less' : 'expand_more'}
                  </span>
                </div>

                {faq.open && (
                  <div className="p-4 bg-[#eff4ff] border-t border-[#e5eeff] space-y-2">
                    <label className="block text-[11px] font-bold text-[#565e74]">Respuesta mostrada al desplegar:</label>
                    <textarea
                      rows={2}
                      value={faq.a}
                      onChange={(e) => {
                        const updated = [...faqs];
                        updated[idx].a = e.target.value;
                        setFaqs(updated);
                      }}
                      className="w-full p-2 bg-white rounded-lg text-xs text-[#565e74] border border-[#e5eeff] outline-none resize-none"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION: TESTIMONIOS ================= */}
      {sectionId === 'testimonios' && (
        <div className="bg-white rounded-xl border border-[#e5eeff] p-6 shadow-sm space-y-5 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30]">Testimonios &amp; Reseñas de Clientes</h3>
              <p className="text-xs text-[#565e74] mt-0.5">Prueba social verificada en Raleigh, Durham, Clayton y Wake Forest.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#eff4ff] border border-[#e5eeff] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 text-sm">
                    {'★'.repeat(t.stars)}
                  </div>
                  <span className="text-[10px] font-mono text-[#006b2c] font-bold">VERIFICADO</span>
                </div>
                <textarea
                  rows={3}
                  value={t.text}
                  onChange={(e) => {
                    const updated = [...testimonials];
                    updated[idx].text = e.target.value;
                    setTestimonials(updated);
                  }}
                  className="w-full p-2 bg-white rounded-lg text-xs text-[#0b1c30] border border-[#e5eeff] outline-none resize-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#565e74] font-semibold">Cliente</label>
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[idx].name = e.target.value;
                        setTestimonials(updated);
                      }}
                      className="w-full px-2 py-1 bg-white rounded border border-[#e5eeff] font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#565e74] font-semibold">Ubicación</label>
                    <input
                      type="text"
                      value={t.city}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[idx].city = e.target.value;
                        setTestimonials(updated);
                      }}
                      className="w-full px-2 py-1 bg-white rounded border border-[#e5eeff] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION: PIE DE PÁGINA ================= */}
      {sectionId === 'pie-de-pagina' && (
        <div className="bg-white rounded-xl border border-[#e5eeff] p-6 shadow-sm space-y-5 text-xs">
          <h3 className="text-sm font-bold text-[#0b1c30]">Pie de Página, Ubicaciones y Aviso Legal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Teléfono Principal de Operaciones</label>
              <input
                type="text"
                value={footerPhone}
                onChange={(e) => setFooterPhone(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg font-mono font-bold text-[#0b1c30] border border-[#e5eeff]"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Horarios de Despacho de Grúas</label>
              <input
                type="text"
                value={footerHours}
                onChange={(e) => setFooterHours(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] border border-[#e5eeff]"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Dirección de Corralones / Patios</label>
              <input
                type="text"
                value={footerAddress}
                onChange={(e) => setFooterAddress(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] border border-[#e5eeff]"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Texto de Licencia Legal NC DMV</label>
              <input
                type="text"
                value={licenseText}
                onChange={(e) => setLicenseText(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-mono border border-[#e5eeff]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION: SEO LANDING ================= */}
      {sectionId === 'seo-landing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#e5eeff] p-6 shadow-sm space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#0b1c30]">Configuración de Meta Tags y Google Search</h3>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Meta Title (Título para Buscadores)</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-bold border border-[#e5eeff] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Meta Description (Snippet de Resultados)</label>
              <textarea
                rows={3}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] border border-[#e5eeff] outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Palabras Clave (Keywords)</label>
              <input
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-mono border border-[#e5eeff] outline-none"
              />
            </div>
          </div>

          {/* Google Preview Snippet */}
          <div className="bg-white rounded-xl border border-[#e5eeff] p-6 shadow-sm space-y-2 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#565e74]">
              Vista Previa en Google Search:
            </span>
            <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#e5eeff] space-y-1">
              <span className="text-[11px] text-[#202124] block">https://pay4myjunk.com</span>
              <h4 className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer">
                {seoTitle}
              </h4>
              <p className="text-xs text-[#4d5156] leading-relaxed">{seoDesc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
    <div className="flex flex-col w-full pb-16 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#565e74] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Marketing &amp; CMS</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006b2c]">
              {current.title}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0b1c30]">{current.title}</h1>
          <p className="text-xs text-[#565e74] mt-0.5">{current.desc}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('hero-section')}
            className="px-3.5 py-2 bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-bold rounded-lg border border-[#e5eeff] flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>Ver Hero Section Principal</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>{saved ? 'Guardado en CDN!' : 'Guardar y Publicar'}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e5eeff] p-6 shadow-sm space-y-4 text-xs">
        <div className="p-3.5 bg-[#eff4ff] rounded-lg border border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#006b2c] font-bold">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Módulo conectado con CDN de Producción</span>
          </div>
          <span className="font-mono text-[11px] text-[#565e74]">Status: Sincronizado</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[#565e74] font-semibold mb-1">Título de Sección</label>
            <input
              type="text"
              defaultValue={current.title}
              className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-semibold border border-[#e5eeff] outline-none"
            />
          </div>
          <div>
            <label className="block text-[#565e74] font-semibold mb-1">Descripción / Texto Principal</label>
            <textarea
              rows={3}
              defaultValue={current.desc}
              className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] border border-[#e5eeff] outline-none resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Visibilidad en Landing</label>
              <select className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-[#0b1c30] font-semibold border border-[#e5eeff] outline-none">
                <option>Activo (100% visible)</option>
                <option>Oculto temporalmente</option>
                <option>A/B Test Variant B</option>
              </select>
            </div>
            <div>
              <label className="block text-[#565e74] font-semibold mb-1">Idioma Asignado</label>
              <input
                type="text"
                disabled
                value={lang === 'es' ? 'Español (ES)' : 'English (EN)'}
                className="w-full px-3 py-2 bg-gray-100 rounded-lg text-[#565e74] font-semibold border border-[#e5eeff]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

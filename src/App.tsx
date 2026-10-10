/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, Lead, Scout, DispatchedVehicle, PricingConfig, HeroCMSConfig } from './types';
import {
  INITIAL_LEADS,
  INITIAL_SCOUTS,
  INITIAL_DISPATCHED_VEHICLES,
  INITIAL_PRICING_CONFIG,
  INITIAL_HERO_CMS,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CotizacionesView } from './components/CotizacionesView';
import { HeroCMSView } from './components/HeroCMSView';
import { ScoutsView } from './components/ScoutsView';
import { PreciosView } from './components/PreciosView';
import { PerfilEmpresaView } from './components/PerfilEmpresaView';
import { BrainAIView } from './components/BrainAIView';
import { CMSSectionEditor } from './components/CMSSectionEditor';
import { LoginView } from './components/LoginView';
import { NewLeadModal } from './components/Modals/NewLeadModal';
import { ManageLeadModal } from './components/Modals/ManageLeadModal';
import { NewScoutModal } from './components/Modals/NewScoutModal';
import { PayCommissionModal } from './components/Modals/PayCommissionModal';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('pay4myjunk_auth_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Douglas Villalobos',
          email: 'DouglasVillalobos4@gmail.com',
          role: 'Superuser',
        };
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenId>('cotizaciones-and-leads');
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [searchTerm, setSearchTerm] = useState('');

  // Persistent or stateful collections
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('pay4myjunk_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [scouts, setScouts] = useState<Scout[]>(() => {
    const saved = localStorage.getItem('pay4myjunk_scouts');
    return saved ? JSON.parse(saved) : INITIAL_SCOUTS;
  });

  const [dispatchedVehicles, setDispatchedVehicles] = useState<DispatchedVehicle[]>(() => {
    const saved = localStorage.getItem('pay4myjunk_dispatches');
    return saved ? JSON.parse(saved) : INITIAL_DISPATCHED_VEHICLES;
  });

  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(() => {
    const saved = localStorage.getItem('pay4myjunk_pricing');
    return saved ? JSON.parse(saved) : INITIAL_PRICING_CONFIG;
  });

  const [heroCms, setHeroCms] = useState<Record<'es' | 'en', HeroCMSConfig>>(() => {
    const saved = localStorage.getItem('pay4myjunk_herocms');
    return saved ? JSON.parse(saved) : INITIAL_HERO_CMS;
  });

  // Modal states
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [managingLead, setManagingLead] = useState<Lead | null>(null);
  const [isNewScoutModalOpen, setIsNewScoutModalOpen] = useState(false);
  const [payingScout, setPayingScout] = useState<Scout | null>(null);

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pay4myjunk_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('pay4myjunk_scouts', JSON.stringify(scouts));
  }, [scouts]);

  useEffect(() => {
    localStorage.setItem('pay4myjunk_dispatches', JSON.stringify(dispatchedVehicles));
  }, [dispatchedVehicles]);

  useEffect(() => {
    localStorage.setItem('pay4myjunk_pricing', JSON.stringify(pricingConfig));
  }, [pricingConfig]);

  useEffect(() => {
    localStorage.setItem('pay4myjunk_herocms', JSON.stringify(heroCms));
  }, [heroCms]);

  // Lead handlers
  const handleAddLead = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
    showToast(`Cotización ${newLead.id} para ${newLead.vehicle} creada exitosamente.`);
  };

  const handleUpdateLead = (updated: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    showToast(`Lead ${updated.id} actualizado a estado "${updated.status}".`);
  };

  // Scout handlers
  const handleAddScout = (newScout: Scout) => {
    setScouts((prev) => [...prev, newScout]);
    showToast(`Scout ${newScout.name} habilitado en el equipo FB.`);
  };

  const handleConfirmScoutPayment = (
    scoutId: string,
    amount: number,
    method: string,
    refCode: string
  ) => {
    setScouts((prev) =>
      prev.map((s) => {
        if (s.id === scoutId) {
          return {
            ...s,
            pendingAmount: 0,
            pendingUnits: 0,
            totalPaid: s.totalPaid + amount,
            totalHistorical: s.totalHistorical + (s.pendingAmount === 0 ? amount : 0),
          };
        }
        return s;
      })
    );
    showToast(
      `Liquidación de $${amount.toFixed(2)} USD procesada por ${method.toUpperCase()} (${refCode}).`
    );
  };

  const handleBatchSettle = () => {
    const total = scouts.reduce((acc, s) => acc + s.pendingAmount, 0);
    if (total === 0) {
      showToast('No hay comisiones pendientes por liquidar.');
      return;
    }
    setScouts((prev) =>
      prev.map((s) => ({
        ...s,
        totalPaid: s.totalPaid + s.pendingAmount,
        pendingAmount: 0,
        pendingUnits: 0,
      }))
    );
    showToast(`Dispersión masiva de $${total.toFixed(2)} USD completada en Zelle Express.`);
  };

  const handleApproveDispatch = (dispatchId: string) => {
    setDispatchedVehicles((prev) =>
      prev.map((d) =>
        d.id === dispatchId
          ? {
              ...d,
              status: 'Liquidado',
              deliveredBadge: 'LIQUIDADO',
              receiptCode: `#ZLL-${Math.floor(1000 + Math.random() * 9000)}`,
            }
          : d
      )
    );
    showToast('Vehículo aprobado y liquidación autorizada al Scout.');
  };

  const handleUpdatePricing = (newConfig: PricingConfig) => {
    setPricingConfig(newConfig);
    showToast('Estrategia de precios y umbrales mínimos guardados.');
  };

  const handleUpdateHeroCMS = (l: 'es' | 'en', newConfig: HeroCMSConfig) => {
    setHeroCms((prev) => ({
      ...prev,
      [l]: newConfig,
    }));
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('pay4myjunk_auth_user', JSON.stringify(user));
    showToast(`Bienvenido al sistema, ${user.name} (${user.role}).`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pay4myjunk_auth_user');
    showToast('Sesión cerrada correctamente.');
  };

  if (!currentUser) {
    return <LoginView onLogin={handleLogin} lang={lang} onLangChange={setLang} />;
  }

  const isCMSSubScreen = [
    'header-and-logo',
    'beneficios',
    'proceso',
    'preguntas',
    'testimonios',
    'pie-de-pagina',
    'seo-landing',
  ].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        lang={lang}
        onLangChange={setLang}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="pl-72 flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          lang={lang}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* Dynamic Screen Container */}
        <main className="w-full pt-16 px-6 bg-[#f8f9ff] min-h-screen flex-1">
          {currentScreen === 'cotizaciones-and-leads' && (
            <CotizacionesView
              leads={leads}
              onOpenNewLeadModal={() => setIsNewLeadModalOpen(true)}
              onOpenManageModal={(lead) => setManagingLead(lead)}
              onNavigate={setCurrentScreen}
              lang={lang}
            />
          )}

          {currentScreen === 'hero-section' && (
            <HeroCMSView
              cmsConfig={heroCms}
              onUpdateConfig={handleUpdateHeroCMS}
              lang={lang}
              onLangChange={setLang}
            />
          )}

          {currentScreen === 'equipo-scouts-fb' && (
            <ScoutsView
              scouts={scouts}
              dispatchedVehicles={dispatchedVehicles}
              onOpenCreateScoutModal={() => setIsNewScoutModalOpen(true)}
              onOpenPaymentModal={(scout) => setPayingScout(scout)}
              onApproveDispatch={handleApproveDispatch}
              onBatchSettle={handleBatchSettle}
              lang={lang}
            />
          )}

          {currentScreen === 'estrategia-de-precios' && (
            <PreciosView
              pricingConfig={pricingConfig}
              onUpdatePricing={handleUpdatePricing}
              lang={lang}
            />
          )}

          {currentScreen === 'perfil-de-empresa' && <PerfilEmpresaView lang={lang} />}

          {currentScreen === 'brain-ai-engine' && (
            <BrainAIView onNavigate={setCurrentScreen} lang={lang} />
          )}

          {isCMSSubScreen && (
            <CMSSectionEditor
              sectionId={currentScreen}
              onNavigate={setCurrentScreen}
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <NewLeadModal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
        onAddLead={handleAddLead}
        pricingConfig={pricingConfig}
      />

      <ManageLeadModal
        lead={managingLead}
        isOpen={Boolean(managingLead)}
        onClose={() => setManagingLead(null)}
        onUpdateLead={handleUpdateLead}
      />

      <NewScoutModal
        isOpen={isNewScoutModalOpen}
        onClose={() => setIsNewScoutModalOpen(false)}
        onAddScout={handleAddScout}
      />

      <PayCommissionModal
        scout={payingScout}
        isOpen={Boolean(payingScout)}
        onClose={() => setPayingScout(null)}
        onConfirmPayment={handleConfirmScoutPayment}
      />

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#213145] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-bounce text-xs">
          <div className="w-6 h-6 rounded-full bg-[#006b2c] flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[16px]">info</span>
          </div>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

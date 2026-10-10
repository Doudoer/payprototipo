export type ScreenId =
  | 'cotizaciones-and-leads'
  | 'equipo-scouts-fb'
  | 'estrategia-de-precios'
  | 'perfil-de-empresa'
  | 'brain-ai-engine'
  | 'scout-portal'
  | 'hero-section'
  | 'header-and-logo'
  | 'beneficios'
  | 'proceso'
  | 'preguntas'
  | 'testimonios'
  | 'pie-de-pagina'
  | 'seo-landing';

export type LeadStatus = 'Nuevas' | 'Aceptadas' | 'Agenda' | 'Completado' | 'Cancelado' | 'Archivadas';

export interface Lead {
  id: string; // e.g. '#436'
  phone: string;
  zip: string;
  city: string;
  vehicle: string; // '2007 TOYOTA Prius'
  bodyType: string; // 'Sedan (Medium)'
  specs: string; // 'Híbrido · 184k mi'
  channel: 'Web Orgánica' | 'Scout FB' | 'Web Directa' | 'Llamada';
  validation: 'Falta VIN' | 'VIN Verificado' | 'Docs Validados' | 'Revisión Manual';
  offer: number; // e.g. 310.00
  tierName: string; // 'Scrap Rate Tier A'
  status: LeadStatus;
  dateCreated: string;
  assignedTow?: string;
  scoutName?: string;
  vin?: string;
  customerName?: string;
}

export interface Scout {
  id: string;
  name: string;
  email: string;
  phone: string;
  tag: string; // 'PRO SCOUT' | 'TOP SCORER' | 'ACTIVE'
  initials: string;
  pickedVehicles: number;
  pendingUnits: number;
  pendingAmount: number;
  totalPaid: number;
  totalHistorical: number;
  ratePerCar: number;
  fbProfileUrl?: string;
  status: 'online' | 'offline';
}

export interface DispatchedVehicle {
  id: string;
  vehicleName: string;
  vin: string;
  scoutName: string;
  location: string;
  commission: number;
  status: 'Comisión pendiente' | 'Liquidado';
  deliveredBadge: string;
  receiptCode?: string;
}

export interface PricingConfig {
  engineFailPct: number; // 5.0
  flatTiresFee: number; // 5.0
  airbagsFee: number; // 5.0
  engineDamageFee: number; // 5.0
  bodyDamagePerPanelFee: number; // 5.0
  noTitleFee: number; // 5.0
  requireNotary: boolean; // true
  guaranteedMin: number; // 150.0
  baseScrapRateTon: number; // 240.0
}

export interface HeroCMSConfig {
  badge: string;
  title1: string;
  highlight: string;
  highlightColor: string;
  subtitle: string;
  badge1: string;
  badge1Enabled: boolean;
  badge2: string;
  badge2Enabled: boolean;
  ctaWizard: string;
  ctaHeader: string;
  conversionRate: string;
  lastDeploy: string;
}

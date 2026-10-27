// Analytics helper for Google Analytics 4 (GA4)
// Tracks user interactions with zero PII collection.

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type AnalyticsEvent =
  | { name: 'hero_cta_click'; params: { cta_type: 'diagnosis' | 'cases'; label: string } }
  | { name: 'sticky_cta_click'; params: { location: string } }
  | { name: 'intermediate_cta_click'; params: { location: string } }
  | { name: 'more_cases_expand'; params: { total_cases: number } }
  | { name: 'case_open'; params: { case_id: string; case_title: string } }
  | { name: 'case_video_play'; params: { case_id: string; video_url?: string } }
  | { name: 'whatsapp_click'; params: { source: string } }
  | { name: 'email_click'; params: { source: string } }
  | { name: 'time_diagnosis_cta_click'; params: { location: string } }
  | { name: 'diagnosis_start'; params: { source: string } }
  | { name: 'diagnosis_step_answered'; params: { step: number; length: number } }
  | { name: 'diagnosis_completed'; params: { total_steps: number; id: string } }
  | { name: 'diagnosis_restarted'; params: Record<string, never> }
  | { name: 'diagnosis_whatsapp_cta'; params: { id: string } }
  | { name: 'lead_form_start'; params: { caminho: string } }
  | { name: 'lead_form_submit'; params: { caminho: string; faixa_horas: string } }
  | { name: 'lead_form_whatsapp_click'; params: Record<string, never> };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event.name, event.params);
  }
}

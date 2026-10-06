// Chatwoot website widget (crm.sadei.nl), loaded only when the visitor clicks "Chat met Stephen".
// Nothing from crm.sadei.nl loads, and no chat cookie is set, before that click (privacy statement v1.6).
export const CHATWOOT_BASE = 'https://crm.sadei.nl';
export const SDK_ID = 'chatwoot-sdk';

type ChatWindow = Window & {
  chatwootSettings?: Record<string, unknown>;
  chatwootSDK?: { run(o: { websiteToken: string; baseUrl: string }): void };
  $chatwoot?: { toggle(state?: 'open' | 'close'): void; setLocale?(l: string): void; setCustomAttributes?(a: Record<string, string>): void };
};

/** Inject the SDK once and open the widget when it is ready. `onFail` fires on a load error or after `timeoutMs`. */
export function openChat(
  websiteToken: string,
  locale: string,
  onFail: () => void,
  timeoutMs = 5000,
  w: ChatWindow = window as ChatWindow,
  d: Document = document,
): void {
  if (w.$chatwoot) {
    w.$chatwoot.toggle('open');
    return;
  }
  if (d.getElementById(SDK_ID)) return; // still loading
  w.chatwootSettings = { locale, hideMessageBubble: true, position: 'right' };
  const s = d.createElement('script');
  const ready = () => {
    clearTimeout(timer);
    // page_locale lets the reply side match the holding message to the page language
    w.$chatwoot?.setLocale?.(locale);
    w.$chatwoot?.setCustomAttributes?.({ page_locale: locale });
    w.$chatwoot?.toggle('open');
  };
  const fail = () => {
    clearTimeout(timer);
    w.removeEventListener('chatwoot:ready', ready);
    s.remove();
    onFail();
  };
  const timer = setTimeout(fail, timeoutMs);
  w.addEventListener('chatwoot:ready', ready, { once: true });
  s.id = SDK_ID;
  s.src = `${CHATWOOT_BASE}/packs/js/sdk.js`;
  s.async = true;
  s.onload = () => w.chatwootSDK?.run({ websiteToken, baseUrl: CHATWOOT_BASE });
  s.onerror = fail;
  d.head.appendChild(s);
}

'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { contact } from '@stephenadei/business-config';
import { openChat } from '@/lib/chatwoot';

// Chatwoot website inbox "Stephen Adei" (inbox 4). Website tokens are public by design.
const WEBSITE_TOKEN = 'KHyjs9QCCjDdoEuE9JDRZVyT';

export default function ChatLauncher() {
  const t = useTranslations('Common');
  const locale = useLocale();
  const [failed, setFailed] = useState(false);
  if (!WEBSITE_TOKEN) return null;
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {failed && (
        <p role="status" className="max-w-xs rounded-lg border border-emerald-700/30 bg-emerald-950 px-4 py-3 text-sm text-emerald-100">
          {t('chatUnavailable')}{' '}
          <a href={contact.whatsapp(contact.phone.primary.number)} className="underline">WhatsApp</a>
          {' · '}
          <a href={`mailto:${contact.email.primary}`} className="underline">{contact.email.primary}</a>
        </p>
      )}
      <button
        type="button"
        onClick={() => { setFailed(false); openChat(WEBSITE_TOKEN, locale, () => setFailed(true)); }}
        className="flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-emerald-600"
      >
        <MessageCircle aria-hidden="true" className="h-4 w-4" />
        {t('chatLabel')}
      </button>
    </div>
  );
}

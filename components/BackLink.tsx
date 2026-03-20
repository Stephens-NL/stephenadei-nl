'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function BackLink() {
  const t = useTranslations('Common');
  return (
    <Link href="/" className="inline-block mb-8 text-emerald-300 hover:text-emerald-100 transition-colors">
      {t('backToHome')}
    </Link>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { contact } from '@stephen/business-config';
import SectionHeading from './SectionHeading';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const [showPhone, setShowPhone] = useState(false);

  const contactLinks = [
    { href: `mailto:${contact.email.primary}`, icon: Mail, label: t('email') },
    { href: contact.whatsapp(contact.phone.primary.number), icon: Phone, label: t('whatsapp') },
    { href: contact.social.linkedin, icon: Linkedin, label: t('linkedin') },
    { href: contact.social.github, icon: Github, label: t('github') },
  ];

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <SectionHeading title={t('title')} />
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-emerald-100 mb-1">{t('subtitle')}</h3>
        <p className="text-emerald-300 mb-8">{t('role')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-emerald-800/30 border border-emerald-700/30 hover:border-emerald-500/50 hover:bg-emerald-800/50 transition-all text-emerald-200 hover:text-white">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
        <div className="mb-6">
          {showPhone ? (
            <a href={`tel:${contact.phone.primary.number}`} className="text-emerald-200 hover:text-white transition-colors">
              {contact.phone.primary.display}
            </a>
          ) : (
            <button onClick={() => setShowPhone(true)} className="text-sm text-emerald-400 hover:text-emerald-200 transition-colors underline underline-offset-2">
              {t('showPhone')}
            </button>
          )}
        </div>
        <p className="text-sm text-emerald-300/70">{t('available')}</p>
      </div>
    </section>
  );
}

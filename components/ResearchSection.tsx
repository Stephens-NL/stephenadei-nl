import { getTranslations } from 'next-intl/server';
import { Download, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { theses, education } from '@/data/research';
import SectionHeading from './SectionHeading';

export default async function ResearchSection() {
  const t = await getTranslations('Research');
  return (
    <section id="research" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <SectionHeading title={t('title')} />
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-emerald-100 mb-6">{t('education.title')}</h3>
        <div className="border-l-2 border-emerald-700/50 pl-6 space-y-6">
          {education.map((edu) => (
            <div key={edu.key} className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-950" />
              <h4 className="text-lg font-semibold text-emerald-100">{t(`education.${edu.key}.title`)}</h4>
              <p className="text-sm text-emerald-300">{t(`education.${edu.key}.institution`)} · {t(`education.${edu.key}.years`)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-emerald-100 mb-6">{t('outputs.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {theses.map((thesis) => (
            <div key={thesis.key} className="rounded-lg p-5 bg-emerald-800/30 border border-emerald-700/30">
              <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-1">{t(`outputs.theses.${thesis.key}.type`)}</p>
              <h4 className="text-lg font-semibold text-emerald-100 mb-2">{t(`outputs.theses.${thesis.key}.title`)}</h4>
              <p className="text-sm text-emerald-200/80 mb-3">{t(`outputs.theses.${thesis.key}.description`)}</p>
              {thesis.file && (
                <a href={`/academic-works/${thesis.file}`} download className="inline-flex items-center gap-1.5 text-sm text-emerald-300 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />{t('downloadPdf')}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-6 bg-gradient-to-br from-emerald-800/40 to-emerald-900/40 border border-emerald-600/30 mb-8">
        <h3 className="text-2xl font-bold text-emerald-100 mb-3">{t('plukDeData.title')}</h3>
        <p className="text-emerald-200/80 mb-2">{t('plukDeData.description')}</p>
        <p className="text-sm text-emerald-300 mb-4">{t('plukDeData.role')}</p>
        <div className="flex flex-wrap gap-3">
          <a href="https://www.youtube.com/watch?v=NAvG24xGFHU" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
            <ExternalLink className="w-4 h-4" />{t('plukDeData.watchVideo')}
          </a>
          <a href="https://www.hva.nl/onderzoeksresultaten/2025/6/computational-thinking-pluk-de-data" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 border border-emerald-500 text-emerald-200 rounded-lg hover:bg-emerald-500/10 transition-colors text-sm font-medium">
            <ExternalLink className="w-4 h-4" />{t('plukDeData.visitProject')}
          </a>
        </div>
      </div>
      <div className="rounded-lg p-5 bg-emerald-800/30 border border-emerald-700/30">
        <h4 className="text-lg font-semibold text-emerald-100 mb-2">{t('archive.title')}</h4>
        <p className="text-sm text-emerald-200/80">{t('archive.description')}</p>
      </div>
      <div className="mt-8 text-center">
        <Link href="/research" className="text-emerald-300 hover:text-white transition-colors font-medium">{t('viewFullPage')}</Link>
      </div>
    </section>
  );
}

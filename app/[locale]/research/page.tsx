import { getTranslations } from 'next-intl/server';
import { Download, ExternalLink } from 'lucide-react';
import BackLink from '@/components/BackLink';
import SectionHeading from '@/components/SectionHeading';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { theses, education } from '@/data/research';

export async function generateMetadata() {
  return {
    title: 'Research — Stephen Adei',
    description: 'Academic research, theses, and projects in mathematics, quantum computing, and computational thinking.',
  };
}

export default async function ResearchPage() {
  const t = await getTranslations('Research');
  return (
    <main className="min-h-screen bg-emerald-950 text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackLink />
        <SectionHeading title={t('title')} />

        {/* Featured video */}
        <div className="mb-16">
          <YouTubeEmbed videoId="NAvG24xGFHU" title={t('plukDeData.title')} />
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-emerald-100 mb-8">{t('education.title')}</h3>
          <div className="border-l-2 border-emerald-700/50 pl-8 space-y-8">
            {education.map((edu) => (
              <div key={edu.key} className="relative">
                <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-950" />
                <h4 className="text-xl font-semibold text-emerald-100">{t(`education.${edu.key}.title`)}</h4>
                <p className="text-emerald-300 mt-1">{t(`education.${edu.key}.institution`)} · {t(`education.${edu.key}.years`)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-emerald-100 mb-8">{t('outputs.title')}</h3>
          <div className="space-y-6">
            {theses.map((thesis) => (
              <div key={thesis.key} className="rounded-xl p-6 bg-emerald-800/30 border border-emerald-700/30">
                <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">{t(`outputs.theses.${thesis.key}.type`)}</p>
                <h4 className="text-xl font-semibold text-emerald-100 mb-3">{t(`outputs.theses.${thesis.key}.title`)}</h4>
                <p className="text-emerald-200/80 mb-4">{t(`outputs.theses.${thesis.key}.description`)}</p>
                {thesis.file && (
                  <a href={`/academic-works/${thesis.file}`} download className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />{t('downloadPdf')}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Pluk de Data */}
        <div className="mb-16">
          <div className="rounded-xl p-8 bg-gradient-to-br from-emerald-800/40 to-emerald-900/40 border border-emerald-600/30">
            <h3 className="text-2xl font-bold text-emerald-100 mb-4">{t('plukDeData.title')}</h3>
            <p className="text-emerald-200/80 mb-3">{t('plukDeData.description')}</p>
            <p className="text-sm text-emerald-300 mb-6">{t('plukDeData.role')}</p>
            <a href="https://www.hva.nl/onderzoeksresultaten/2025/6/computational-thinking-pluk-de-data" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors">
              <ExternalLink className="w-4 h-4" />{t('plukDeData.visitProject')}
            </a>
          </div>
        </div>

        <div className="rounded-xl p-6 bg-emerald-800/30 border border-emerald-700/30">
          <h4 className="text-xl font-semibold text-emerald-100 mb-3">{t('archive.title')}</h4>
          <p className="text-emerald-200/80">{t('archive.description')}</p>
        </div>
      </div>
    </main>
  );
}

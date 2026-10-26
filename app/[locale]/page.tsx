import { getTranslations } from 'next-intl/server';
import { buildOpenGraph } from '@/lib/seo';
import Hero from '@/components/Hero';
import ServicesStrip from '@/components/ServicesStrip';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import ResearchSection from '@/components/ResearchSection';
import TechStack from '@/components/TechStack';
import CreativeStack from '@/components/CreativeStack';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Hero' });
  return buildOpenGraph({
    locale: params.locale,
    path: '/',
    title: 'Stephen Adei — Data Engineering, Mathematics, Education',
    description: t('headline'),
  });
}

export default function Home() {
  return (
    <main className="min-h-screen bg-emerald-950 text-white">
      <Hero />
      <ServicesStrip />
      <ProjectsShowcase />
      <ResearchSection />
      <TechStack />
      <CreativeStack />
      <AboutSection />
      <ContactSection />
    </main>
  );
}

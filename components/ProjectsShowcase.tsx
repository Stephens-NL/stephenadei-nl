import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { projects } from '@/data/projects';
import SectionHeading from './SectionHeading';
import TechBadge from './TechBadge';

export default async function ProjectsShowcase() {
  const t = await getTranslations('Projects');
  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <SectionHeading title={t('title')} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group rounded-xl p-6 bg-emerald-800/30 backdrop-blur-sm border border-emerald-700/30 hover:border-emerald-500/50 hover:bg-emerald-800/50 transition-all">
            <h3 className="text-xl font-bold text-emerald-100 mb-2 group-hover:text-white transition-colors">{t(project.titleKey)}</h3>
            <p className="text-sm text-emerald-200/80 mb-4 leading-relaxed">{t(project.descriptionKey)}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (<TechBadge key={tech} label={tech} />))}
              {project.techStack.length > 4 && (<span className="text-xs text-emerald-400 self-center">+{project.techStack.length - 4}</span>)}
            </div>
            <span className="text-sm font-medium text-emerald-300 group-hover:text-emerald-200 transition-colors">{t('learnMore')}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

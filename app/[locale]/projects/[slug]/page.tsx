import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ProjectPage from '@/components/ProjectPage';
import { projectContent } from '@/lib/projects';
import { buildOpenGraph } from '@/lib/seo';


const validSlugs = Object.keys(projectContent);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    validSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const project = projectContent[params.slug];
  if (!project) return {};
  return buildOpenGraph({
    locale: params.locale,
    path: `/projects/${params.slug}`,
    project: params.slug,
    title: `${project.title} — Stephen Adei`,
    description: project.description,
  });
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projectContent[slug];
  if (!project) notFound();

  const t = await getTranslations('Common');

  return (
    <ProjectPage
      title={project.title}
      description={project.description}
      techStack={project.techStack}
      url={project.url}
      visitLabel={t('visitLiveSite')}
    >
      <MDXRemote source={project.content} />
    </ProjectPage>
  );
}

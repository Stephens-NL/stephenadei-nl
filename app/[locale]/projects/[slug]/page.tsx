import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTranslations } from 'next-intl/server';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import ProjectPage from '@/components/ProjectPage';

const validSlugs = ['sa3', 'privelessen-dashboard', 'aantekeningen-app', 'platform-api', 'stephenstat'];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return {};
  const source = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(source);
  return { title: `${data.title} — Stephen Adei`, description: data.description };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  if (!validSlugs.includes(slug)) notFound();
  const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();
  const source = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(source);
  const t = await getTranslations('Common');
  return (
    <ProjectPage title={data.title} description={data.description} techStack={data.techStack} url={data.url} visitLabel={t('visitLiveSite')}>
      <MDXRemote source={content} />
    </ProjectPage>
  );
}

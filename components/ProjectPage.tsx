import BackLink from './BackLink';
import TechBadge from './TechBadge';
import { ExternalLink } from 'lucide-react';

interface ProjectPageProps {
  title: string;
  description: string;
  techStack: string[];
  url?: string;
  visitLabel?: string;
  children: React.ReactNode;
}

export default function ProjectPage({ title, description, techStack, url, visitLabel, children }: ProjectPageProps) {
  return (
    <main className="min-h-screen bg-emerald-950 text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackLink />
        <h1 className="text-4xl sm:text-5xl font-bold text-emerald-100 mb-4">{title}</h1>
        <p className="text-lg text-emerald-200/80 mb-6">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (<TechBadge key={tech} label={tech} />))}
        </div>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors mb-8">
            <ExternalLink className="w-4 h-4" />{visitLabel}
          </a>
        )}
        <div className="prose prose-invert prose-emerald max-w-none mt-8">{children}</div>
      </div>
    </main>
  );
}

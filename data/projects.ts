export interface Project {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  techStack: string[];
  url?: string;
  image?: string;
}

export const projects: Project[] = [
  { slug: 'sa3', titleKey: 'sa3.title', descriptionKey: 'sa3.description', techStack: ['Next.js', 'React', 'Prisma', 'AWS', 'Terraform', 'Docker'], url: 'https://sa3.stephensprive.app' },
  { slug: 'privelessen-dashboard', titleKey: 'privelessenDashboard.title', descriptionKey: 'privelessenDashboard.description', techStack: ['Next.js', 'Prisma', 'Stripe', 'Google Calendar', 'Chatwoot'], url: 'https://dash.stephensprivelessen.nl' },
  { slug: 'aantekeningen-app', titleKey: 'aantekeningenApp.title', descriptionKey: 'aantekeningenApp.description', techStack: ['Next.js', 'LangChain', 'OpenAI', 'AWS S3', 'Prisma'] },
  { slug: 'platform-api', titleKey: 'platformApi.title', descriptionKey: 'platformApi.description', techStack: ['Express', 'TypeScript', 'AWS S3', 'Prisma', 'Glue', 'Athena'], url: 'https://upload.stephensprive.app' },
  { slug: 'stephenstat', titleKey: 'stephenstat.title', descriptionKey: 'stephenstat.description', techStack: ['Next.js', 'Recharts', 'jstat', 'TypeScript'], url: 'https://stephenstat.stephensprive.app' },
];

export interface StackGroup { labelKey: string; items: string[]; }
export const techStackGroups: StackGroup[] = [
  { labelKey: 'languages', items: ['TypeScript', 'Python', 'Next.js', 'React', 'Express', 'Flask', 'LaTeX'] },
  { labelKey: 'dataCloud', items: ['AWS S3', 'Glue', 'Athena', 'Lambda', 'Step Functions', 'EventBridge', 'Terraform'] },
  { labelKey: 'databases', items: ['PostgreSQL', 'Prisma', 'Redis', 'Docker', 'GitHub Actions'] },
  { labelKey: 'aiMl', items: ['LangChain', 'OpenAI', 'PyTorch', 'Embeddings'] },
];

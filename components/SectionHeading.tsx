interface SectionHeadingProps { title: string; id?: string; }

export default function SectionHeading({ title, id }: SectionHeadingProps) {
  return (
    <h2 id={id} className="text-4xl font-bold mb-8 text-emerald-100 scroll-mt-20">
      {title}
    </h2>
  );
}

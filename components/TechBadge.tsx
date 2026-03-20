interface TechBadgeProps { label: string; }

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-emerald-800/50 text-emerald-200 border border-emerald-700/50">
      {label}
    </span>
  );
}

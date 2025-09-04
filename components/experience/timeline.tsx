import { formatDateRange } from "@/lib/utils";

type Item = {
  company: string;
  role: string;
  start: string;
  end?: string;
  bullets: string[];
  tech: string[];
};

export default function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="relative border-l border-border pl-6">
      {items.map((i, idx) => (
        <li key={idx} className="mb-10">
          <span className="absolute -left-[6px] mt-1 h-3 w-3 rounded-full bg-primary" />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">
              {i.role} — {i.company}
            </h3>
            <span className="text-xs text-muted-foreground">{formatDateRange(i.start, i.end)}</span>
          </div>
          <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground space-y-1">
            {i.bullets.map((b, k) => (
              <li key={k}>{b}</li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {i.tech.map(t => (
              <span key={t} className="rounded border px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

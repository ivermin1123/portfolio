
export default function Section({
  id,
  title,
  subtitle,
  children
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="container py-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {subtitle ? <p className="mt-2 text-muted-foreground">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

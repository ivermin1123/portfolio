import { Section } from "@/components";

export default function ResumePage() {
  return (
    <Section title="Resume">
      <div className="aspect-[1/1.414] w-full overflow-hidden rounded-2xl border h-[80vh]">
        <iframe src="/HoangLe_CV_Frontend.pdf" className="h-[80vh] w-full" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        If the embedded PDF doesn&apos;t load,{" "}
        <a className="underline" href="/HoangLe_CV_Frontend.pdf" target="_blank">
          open it directly
        </a>
        .
      </p>
    </Section>
  );
}

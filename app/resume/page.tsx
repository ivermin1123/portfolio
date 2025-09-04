import { Section } from "@/components";

export default function ResumePage() {
  return (
    <Section title="Resume">
      <div className="aspect-[1/1.414] w-full overflow-hidden rounded-2xl border h-[80vh]">
        <object
          data="/HoangLe_CV_Frontend.pdf"
          type="application/pdf"
          className="h-[80vh] w-full"
          aria-label="Resume PDF"
        >
          <div className="flex h-full items-center justify-center bg-gray-50">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Your browser doesn&apos;t support PDF preview.</p>
              <a
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                href="/HoangLe_CV_Frontend.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open PDF in New Tab
              </a>
            </div>
          </div>
        </object>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        If the embedded PDF doesn&apos;t load,{" "}
        <a
          className="underline"
          href="/HoangLe_CV_Frontend.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          open it directly
        </a>
        .
      </p>
    </Section>
  );
}

import { PDFViewer, Section } from "@/components";

export default function ResumePage() {
  return (
    <Section title="Resume">
      <PDFViewer file="/HoangLe_CV_Frontend.pdf" />

      <div className="mt-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          Use the controls above to navigate, zoom, and interact with the PDF.{" "}
          <a
            className="underline hover:text-blue-600 transition-colors"
            href="/HoangLe_CV_Frontend.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>{" "}
          for offline viewing.
        </p>
        <p className="text-xs text-muted-foreground">
          Features: Zoom in/out, rotate, navigate pages, and download functionality.
        </p>
      </div>
    </Section>
  );
}

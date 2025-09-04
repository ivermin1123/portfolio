"use client";

import { useEffect, useState } from "react";

import { Section } from "@/components";

export default function ResumePage() {
  const [pdfError, setPdfError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useIframe, setUseIframe] = useState(false);

  useEffect(() => {
    // Set a timeout to detect if PDF fails to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handlePdfError = () => {
    setPdfError(true);
    setIsLoading(false);
  };

  const handlePdfLoad = () => {
    setIsLoading(false);
    setPdfError(false);
  };

  const handleIframeError = () => {
    setUseIframe(false);
    setPdfError(true);
    setIsLoading(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setPdfError(false);
  };

  return (
    <Section title="Resume">
      <div className="aspect-[1/1.414] w-full overflow-hidden rounded-2xl border h-[80vh] relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading PDF...</p>
            </div>
          </div>
        )}

        {!pdfError ? (
          useIframe ? (
            <iframe
              src="/HoangLe_CV_Frontend.pdf#toolbar=1&navpanes=1&scrollbar=1"
              className="h-[80vh] w-full border-0"
              title="Resume PDF"
              onError={handleIframeError}
              onLoad={handleIframeLoad}
            />
          ) : (
            <object
              data="/HoangLe_CV_Frontend.pdf"
              type="application/pdf"
              className="h-[80vh] w-full"
              aria-label="Resume PDF"
              onError={() => {
                setUseIframe(true);
                setIsLoading(true);
              }}
              onLoad={handlePdfLoad}
            >
              <div className="flex h-full items-center justify-center bg-gray-50">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Your browser doesn&apos;t support PDF preview.
                  </p>
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
          )
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-50">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                PDF preview is not available in this environment.
              </p>
              <div className="space-y-3">
                <a
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  href="/HoangLe_CV_Frontend.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open PDF in New Tab
                </a>
                <div className="text-sm text-gray-500">
                  <p>Alternative viewing options:</p>
                  <div className="mt-2 space-x-4">
                    <a
                      href="https://docs.google.com/viewer?url=https://hoangle.xyz/HoangLe_CV_Frontend.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google Docs Viewer
                    </a>
                    <a
                      href="https://mozilla.github.io/pdf.js/web/viewer.html?file=https://hoangle.xyz/HoangLe_CV_Frontend.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      PDF.js Viewer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          If the embedded PDF doesn&apos;t load,{" "}
          <a
            className="underline hover:text-blue-600 transition-colors"
            href="/HoangLe_CV_Frontend.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            open it directly
          </a>
          .
        </p>
        <p className="text-xs text-muted-foreground">
          Note: Some browsers and environments may block PDF embedding for security reasons.
        </p>
      </div>
    </Section>
  );
}

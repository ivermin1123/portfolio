"use client";

import { useState } from "react";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Download } from "lucide-react";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewerProps {
  file: string;
  className?: string;
}

export function PDFViewer({ file, className = "" }: PDFViewerProps) {
  const [error, setError] = useState<string | null>(null);

  // Create default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: defaultTabs => [
      defaultTabs[0], // Thumbnail tab
      defaultTabs[1], // Bookmark tab
    ],
  });

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = "HoangLe_CV_Frontend.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-gray-50 rounded-2xl border">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
            <div className="text-sm text-gray-500">
              <p>Alternative viewing options:</p>
              <div className="mt-2 space-x-4">
                <a
                  href={`https://docs.google.com/viewer?url=${window.location.origin}${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Docs Viewer
                </a>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Open in New Tab
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-[80vh] bg-white rounded-2xl border overflow-hidden ${className}`}>
      {/* Custom Download Button */}
      <div className="flex justify-end p-2 border-b bg-gray-50">
        <button
          onClick={downloadPDF}
          className="flex items-center space-x-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          aria-label="Download PDF"
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="h-[calc(100%-3rem)]">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
          <Viewer
            fileUrl={file}
            plugins={[defaultLayoutPluginInstance]}
            onDocumentLoad={() => {
              setError(null);
            }}
          />
        </Worker>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

import { Download, ExternalLink, FileText } from "lucide-react";

interface PDFViewerProps {
  file: string;
  className?: string;
}

export function PDFViewer({ file, className = "" }: PDFViewerProps) {
  const [viewMode, setViewMode] = useState<"embed" | "google" | "download">("embed");
  const [googleViewerError, setGoogleViewerError] = useState(false);
  const [googleViewerLoading, setGoogleViewerLoading] = useState(false);
  const [googleViewerAttempts, setGoogleViewerAttempts] = useState(0);

  // Add timeout for Google Docs Viewer
  useEffect(() => {
    if (viewMode === "google" && !googleViewerError) {
      setGoogleViewerLoading(true);
      const timeout = setTimeout(() => {
        if (googleViewerLoading) {
          setGoogleViewerError(true);
          setGoogleViewerLoading(false);
        }
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    }
  }, [viewMode, googleViewerError, googleViewerLoading]);

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = "HoangLe_CV_Frontend.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(file, "_blank", "noopener,noreferrer");
  };

  const openGoogleViewer = () => {
    const fullUrl = window.location.origin + file;
    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`;
    window.open(googleViewerUrl, "_blank", "noopener,noreferrer");
  };

  const getGoogleViewerUrl = () => {
    // Ensure we have a proper URL
    let fullUrl;
    if (file.startsWith("http")) {
      fullUrl = file;
    } else {
      fullUrl = window.location.origin + file;
    }

    // Try different Google Docs Viewer URL formats
    const attempts = [
      `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`,
      `https://docs.google.com/gview?url=${encodeURIComponent(fullUrl)}&embedded=true`,
      `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true&chrome=false`,
    ];

    const currentAttempt = attempts[googleViewerAttempts] || attempts[0];
    return currentAttempt;
  };

  const switchViewMode = (mode: "embed" | "google" | "download") => {
    setViewMode(mode);
    setGoogleViewerError(false);
    setGoogleViewerLoading(false);
    setGoogleViewerAttempts(0);
  };

  return (
    <div className={`h-[80vh] bg-white rounded-2xl border overflow-hidden ${className}`}>
      {/* Header with Controls */}
      <div className="flex justify-between items-center p-3 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">CV Preview</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => switchViewMode("embed")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                viewMode === "embed"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Embed
            </button>
            <button
              onClick={() => switchViewMode("google")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                viewMode === "google"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Google
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={openInNewTab}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open</span>
          </button>

          <button
            onClick={downloadPDF}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            title="Download PDF"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="h-[calc(100%-4rem)]">
        {viewMode === "embed" && (
          <div className="h-full">
            <iframe
              src={file}
              className="w-full h-full border-0"
              title="CV Preview"
              onError={() => setViewMode("google")}
            />
          </div>
        )}

        {viewMode === "google" && (
          <div className="h-full">
            {googleViewerError ? (
              <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto p-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Google Viewer Unavailable
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Google Docs Viewer couldn&apos;t load the PDF. Please try an alternative viewing
                    option.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setGoogleViewerError(false);
                        setGoogleViewerAttempts(0);
                        setGoogleViewerLoading(true);
                      }}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Retry Google Viewer
                    </button>
                    <button
                      onClick={() => switchViewMode("embed")}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Browser Viewer
                    </button>
                    <button
                      onClick={openInNewTab}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Open in New Tab
                    </button>
                    <button
                      onClick={downloadPDF}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full relative">
                {googleViewerLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">Loading Google Docs Viewer...</p>
                    </div>
                  </div>
                )}
                <iframe
                  key={`google-viewer-${googleViewerAttempts}`}
                  src={getGoogleViewerUrl()}
                  className="w-full h-full border-0"
                  title="CV Preview - Google Viewer"
                  onError={() => {
                    if (googleViewerAttempts < 2) {
                      // Try next URL format
                      setGoogleViewerAttempts(prev => prev + 1);
                      setGoogleViewerLoading(false);
                    } else {
                      // All attempts failed
                      setGoogleViewerError(true);
                      setGoogleViewerLoading(false);
                    }
                  }}
                  onLoad={() => {
                    // Reset error state if iframe loads successfully
                    setGoogleViewerError(false);
                    setGoogleViewerLoading(false);
                  }}
                />
              </div>
            )}
          </div>
        )}

        {viewMode === "download" && (
          <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md mx-auto p-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Download CV</h3>
              <p className="text-gray-600 mb-6">
                Click the download button above to save the CV to your device, or use one of the
                other viewing options.
              </p>
              <div className="space-y-3">
                <button
                  onClick={downloadPDF}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setViewMode("embed")}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Try Browser Viewer
                </button>
                <button
                  onClick={openGoogleViewer}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Open in Google Viewer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with additional options */}
      <div className="border-t bg-gray-50 px-3 py-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>CV - Hoang Le - Frontend Developer</span>
          <div className="flex items-center space-x-4">
            <button onClick={openInNewTab} className="hover:text-gray-700 transition-colors">
              Open in new tab
            </button>
            <button onClick={openGoogleViewer} className="hover:text-gray-700 transition-colors">
              Google Docs Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

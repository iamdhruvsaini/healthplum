import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Processing() {
  const [loadingDots, setLoadingDots] = useState("");
  const [progressWidth, setProgressWidth] = useState(0);

  // Animate the loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Animate the progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressWidth((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md bg-gray-50 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Processing ...
            <span className="text-blue-600 inline-block w-12">
              {loadingDots}
            </span>
          </h2>

          <p className="text-gray-500 text-center mb-6">
            Please wait while we verify your credentials
          </p>

          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>Verifying credentials</span>
            <span>{progressWidth}%</span>
          </div>
        </div>

        <div className="px-8 py-4 bg-blue-600 border-t border-gray-100">
          <p className="text-xs text-center text-white">
            This may take a moment. Please don't close your browser.
          </p>
        </div>
      </div>
    </div>
  );
}

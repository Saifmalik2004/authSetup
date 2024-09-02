import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100 p-6">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />

        {/* Loading Text */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Loading...</h1>
        <p className="text-lg text-gray-600">Please wait while we load your content.</p>
      </div>
    </div>
  );
}

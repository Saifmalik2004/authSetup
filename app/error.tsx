'use client'

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-red-100 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4 animate-bounce">
          Something Went Wrong
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          {error.message}
        </p>
        <Button
          onClick={() => reset()}
          className="px-6 py-3 text-lg font-semibold bg-red-500 text-white rounded-md shadow-lg hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}

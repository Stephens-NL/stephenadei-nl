'use client';

export default function GlobalError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="p-6 max-w-sm mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Er is iets misgegaan
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Probeer het opnieuw
            </p>
            <button
              onClick={() => reset()}
              className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Opnieuw laden
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 
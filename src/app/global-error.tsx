'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full text-center border border-red-100">
            <span className="text-5xl block mb-4">⚠️</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
            <p className="text-gray-600 mb-6 text-sm">
              An unexpected error occurred. Our team has been notified.
              {process.env.NODE_ENV === 'development' && (
                <span className="block mt-2 text-xs text-red-500 bg-red-50 p-2 rounded text-left overflow-auto">
                  {error.message}
                </span>
              )}
            </p>
            <button
              onClick={() => reset()}
              className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-red-600 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

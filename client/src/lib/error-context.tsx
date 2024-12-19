import React, { createContext, useState } from 'react';

export type ErrorContextType = {
  showError: (errors: Array<string>) => void;
};
export const ErrorContext = createContext<ErrorContextType | null>(null);

type ErrorProviderProps = {
  children: React.ReactNode;
};
export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [error, setError] = useState<Array<string>>([]);

  const showError = (message: Array<string>) => setError(message);
  const hideError = () => setError([]);

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {error && !!error.length && (
        <div
          role="button"
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={hideError}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') hideError();
          }}
          tabIndex={0}
        >
          <div
            role="button"
            className="max-w-sm rounded-lg bg-white p-6 text-center shadow-lg"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
            }}
            tabIndex={0}
          >
            <h2 className="mb-4 text-lg font-bold text-black">Error</h2>
            <ul className="text-red-600">
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
            <button
              className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={hideError}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ErrorContext.Provider>
  );
};

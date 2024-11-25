import { useEffect, useState } from 'react';

export const LoadingPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Stop animation when progress reaches 100
          return 100;
        }
        return prev + 1; // Increment progress
      });
    }, 300);
  });

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-primaryColor to-secondaryColor">
      <div className="animate-fade-in text-center">
        <div className="mb-4">
          <h1 className="mb-4  text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
            Welcome to Canvas Room!
          </h1>
        </div>
        <div className="flex justify-center">
          <progress
            className="progress  w-56 rounded-lg"
            value={progress}
            max="100"
          ></progress>
        </div>
      </div>
    </div>
  );
};

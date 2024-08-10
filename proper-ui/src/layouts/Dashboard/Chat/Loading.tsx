import React, { useEffect, useState } from "react";

const randomLoadingTexts = [
  "Please wait...",
  "We're cooking up something...",
  "Just a moment...",
  "Fusing all knowlegdges together...",
  "Traveling through the internet...",
  "Loading...",
  "Just a sec...",
];

const Loading = () => {
  const [loadingText, setLoadingText] = useState(
    randomLoadingTexts[Math.floor(Math.random() * randomLoadingTexts.length)]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingText(
        randomLoadingTexts[
          Math.floor(Math.random() * randomLoadingTexts.length)
        ]
      );
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-16">
      <img
        src="/RMIT_logo_red.png"
        alt=""
        className="h-56 w-56 animate-bounce"
      />
      <p className="text-lg font-semibold text-center mt-4 opacity-60">
        {loadingText}
      </p>
    </div>
  );
};

export default Loading;

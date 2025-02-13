import React, { useRef, useEffect, useState } from "react";
import Pixel from "@/components/Pixel";

const WhatIsDiffusion = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null); // Reference to the scrollable content

  const [scrollLevel, setScrollLevel] = useState(0);
  const [scrollThresholds] = useState(() =>
    new Array(32 * 32).fill(0).map(() => Math.random() * 100)
  );

  const calculateScrollPercentage = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      const percentage = (scrollTop / clientHeight) * 100;
      setScrollLevel(percentage);
    }
  };

  // Event listener to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      calculateScrollPercentage();
    };

    const scrollableElement = scrollableRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      <div
        ref={scrollableRef}
        className="flex-1 bg-slate-950 md:h-screen md:flex-none md:w-1/2 overflow-y-scroll max-h-screen"
      >
        {new Array(100).fill(0).map((_, i) => (
          <div
            key={i}
            className="p-4 border-2 border-slate-200 m-4 rounded-xl bg-gray-950"
          >
            <h1>Test</h1>
          </div>
        ))}
      </div>
      <div className="relative h-[75vw] w-screen md:h-screen md:flex-1 md:w-auto">
        <div
          ref={containerRef}
          className="absolute bottom-0 top-0 left-0 right-0 bg-slate-950 flex items-center justify-center"
        >
          {/* We want to make a grid with rows which are flex-col */}
          <div>
            {new Array(32).fill(0).map((_, i) => (
              <div key={i} className="flex flex-row">
                {new Array(32).fill(0).map((_, j) => (
                  <Pixel
                    key={j}
                    scrollValue={scrollLevel}
                    scrollThreshold={scrollThresholds[i * 32 + j]}
                    pixelIdx={i * 32 + j}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsDiffusion;

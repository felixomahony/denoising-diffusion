import React, { useState, useEffect } from "react";

const Pixel = ({
  scrollValue,
  scrollThreshold,
  pixelIdx,
}: {
  scrollValue: number;
  scrollThreshold: number;
  pixelIdx: number;
}) => {
  const randomColor = () => Math.floor(Math.random() * 256);
  const [initialColor, setInitialColor] = useState<string | null>(null);
  const [finalColor, setFinalColor] = useState<string | null>(null);
  const [jsonData, setJsonData] = useState<any>(null);

  useEffect(() => {
    const r_color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    setInitialColor(r_color);

    // Fetch the JSON file
    fetch("/automobile4.json")
      .then((response) => response.json())
      .then((data) =>
        setFinalColor(
          `rgb(${data[pixelIdx][0]},${data[pixelIdx][1]},${data[pixelIdx][2]})`
        )
      )
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  const color = scrollValue > scrollThreshold ? finalColor : initialColor;
  if (!color) {
    return null; // or a placeholder
  }

  return <div className="w-4 h-4" style={{ backgroundColor: color }} />;
};

export default Pixel;

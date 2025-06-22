import React from "react";

const CircleProgressBar = ({ progress = 0, size = 16, strokeWidth = 2 }) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      {/* Background circle */}
      <div
        className="absolute inset-0 rounded-full bg-gray-300"
        style={{
          width: size,
          height: size,
          clipPath: "circle(50%)",
        }}
      ></div>

      {/* Progress circle using conic gradient */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(#10898F ${normalizedProgress}%, transparent ${normalizedProgress}%)`,
          clipPath: "circle(50%)",
        }}
      ></div>

      {/* Inner circle (creates the donut effect) */}
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          top: strokeWidth,
          left: strokeWidth,
          clipPath: "circle(50%)",
        }}
      ></div>
    </div>
  );
};

export default CircleProgressBar;

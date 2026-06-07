import React from 'react';

interface SindoLogoProps {
  className?: string;
  size?: number; // Size in pixels for width/height
}

export default function SindoLogo({ className = '', size = 44 }: SindoLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Sindo Engineering Logo"
    >
      <defs>
        {/* Transparent background friendly shadow for perfect contrast on light and dark bgs */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.25" />
        </filter>

        {/* Outer Circular Swirl Gradient - Sky Blue to Deep Corporate Azure */}
        <linearGradient id="outerSwirlGrad" x1="85%" y1="15%" x2="15%" y2="85%">
          <stop offset="0%" stopColor="#00a3e0" />
          <stop offset="50%" stopColor="#0069a1" />
          <stop offset="100%" stopColor="#004475" />
        </linearGradient>

        {/* Inner Accent Swirl Gradient - Electric Cyan */}
        <linearGradient id="innerSwirlGrad" x1="30%" y1="20%" x2="30%" y2="80%">
          <stop offset="0%" stopColor="#00d2ff" />
          <stop offset="100%" stopColor="#00a3e0" />
        </linearGradient>

        {/* Letter 'S' Gradient - Rich Cyan to Vibrant Blue */}
        <linearGradient id="sGrad" x1="30%" y1="30%" x2="60%" y2="70%">
          <stop offset="0%" stopColor="#00c6ff" />
          <stop offset="100%" stopColor="#0072ff" />
        </linearGradient>

        {/* Letter 'E' Gradient - Professional Deep/Midnight Solid Blue */}
        <linearGradient id="eGrad" x1="50%" y1="30%" x2="50%" y2="70%">
          <stop offset="0%" stopColor="#01528f" />
          <stop offset="100%" stopColor="#003560" />
        </linearGradient>
      </defs>

      {/* 1. Outer Swirling Crescent (sweeps around top, left, bottom) */}
      <path
        d="M 78 32 C 73 24 64 19 54 18 C 30 16 14 36 12 60 C 10 78 24 90 44 91 C 60 92 73 84 81 72 C 82 71 80 72 78 72 C 60 78 40 76 28 66 C 18 56 16 38 26 26 C 36 14 55 12 68 18 C 74 21 78 26 78 32 Z"
        fill="url(#outerSwirlGrad)"
        filter="url(#logoShadow)"
      />

      {/* 2. Inner Tapered Left Accent Swirl */}
      <path
        d="M 33 28 C 22 40 22 62 33 76 C 30 73 24 58 26 44 C 28 30 33 28 33 28 Z"
        fill="url(#innerSwirlGrad)"
        opacity="0.95"
      />

      {/* 3. Bold, Stylized Letters Group with slight italic tilt */}
      <g transform="skewX(-8) translate(8, 0)" filter="url(#logoShadow)">
        {/* Styled Letter S */}
        <text
          x="22"
          y="62"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="33"
          fill="url(#sGrad)"
          letterSpacing="-1.5"
          className="tracking-tighter select-none font-sans"
        >
          S
        </text>

        {/* Styled Letter E */}
        <text
          x="42"
          y="62"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="33"
          fill="url(#eGrad)"
          className="select-none font-sans"
        >
          E
        </text>
      </g>
    </svg>
  );
}

import React from "react";

import { useId } from "react";

// SVG-based decorative patterns for each banner type
export default function BannerPattern({ pattern, opacity = 0.18 }) {
  const uid = useId().replace(/:/g, "");
  const style = { position: "absolute", inset: 0, width: "100%", height: "100%", opacity };

  switch (pattern) {
    case "dots":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-dots`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-dots)`} />
        </svg>
      );

    case "zigzag":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-zigzag`} x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
              <polyline points="0,10 5,0 10,10 15,0 20,10" fill="none" stroke="white" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-zigzag)`} />
        </svg>
      );

    case "diamonds":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-diamonds`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <polygon points="8,1 15,8 8,15 1,8" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-diamonds)`} />
        </svg>
      );

    case "waves":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-waves`} x="0" y="0" width="30" height="12" patternUnits="userSpaceOnUse">
              <path d="M0,6 C5,0 10,12 15,6 C20,0 25,12 30,6" fill="none" stroke="white" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-waves)`} />
        </svg>
      );

    case "lines":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-lines`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="white" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-lines)`} />
        </svg>
      );

    case "crosshatch":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-crosshatch`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="10" y2="10" stroke="white" strokeWidth="1" />
              <line x1="10" y1="0" x2="0" y2="10" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-crosshatch)`} />
        </svg>
      );

    case "stars":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-stars`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1" fill="white" />
              <circle cx="16" cy="14" r="1.5" fill="white" />
              <circle cx="20" cy="5" r="0.8" fill="white" />
              <circle cx="9" cy="19" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-stars)`} />
        </svg>
      );

    case "pulse":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-pulse`} x="0" y="0" width="40" height="14" patternUnits="userSpaceOnUse">
              <polyline points="0,7 6,7 9,2 12,12 15,7 40,7" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-pulse)`} />
        </svg>
      );

    case "cracks":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-cracks`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M5,0 L10,8 L6,14 L14,22 L10,30" fill="none" stroke="white" strokeWidth="1" />
              <path d="M20,5 L25,13 L18,20" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-cracks)`} />
        </svg>
      );

    case "ripples":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-ripples`} x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 C10,0 20,20 40,10" fill="none" stroke="white" strokeWidth="1.2" />
              <path d="M0,18 C10,8 20,28 40,18" fill="none" stroke="white" strokeWidth="0.7" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-ripples)`} />
        </svg>
      );

    case "aurora":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-aurora`} x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 Q15,0 30,10 Q45,20 60,10" fill="none" stroke="white" strokeWidth="2" />
              <path d="M0,14 Q15,4 30,14 Q45,24 60,14" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-aurora)`} />
        </svg>
      );

    case "crown":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-crown`} x="0" y="0" width="24" height="16" patternUnits="userSpaceOnUse">
              <polyline points="0,14 4,6 8,12 12,2 16,12 20,6 24,14" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="4" cy="5" r="1" fill="white" />
              <circle cx="12" cy="1.5" r="1.2" fill="white" />
              <circle cx="20" cy="5" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-crown)`} />
        </svg>
      );

    default:
      return null;
  }
}
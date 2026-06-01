import React, { useId } from "react";

/**
 * High-fidelity SVG-based background overlay filters.
 * Injects complex layout geometries right above gradient layers.
 */
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
            <pattern id={`${uid}-diamonds`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M12,0 L24,12 L12,24 L0,12 Z" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="12" cy="12" r="2" fill="white" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-diamonds)`} />
        </svg>
      );

    case "crosshatch":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-cross`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M0,0 L16,16 M16,0 L0,16" fill="none" stroke="white" strokeWidth="1" opacity="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-cross)`} />
        </svg>
      );

    case "cracks":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-cracks`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0,10 L20,15 L25,0 M20,15 L35,40 L60,35 M35,40 L15,60" fill="none" stroke="white" strokeWidth="1.2" />
              <path d="M40,0 L45,15 L60,10 M0,45 L15,35 L10,60" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-cracks)`} />
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

    case "cyber_circuit":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-cyber`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15" />
              <path d="M10,10 L30,10 L40,20 L40,40 M25,10 L25,30 L15,40" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M0,35 L10,35 L20,45 L45,45" fill="none" stroke="white" strokeWidth="0.8" opacity="0.6" strokeDasharray="3,2" />
              <circle cx="10" cy="10" r="2.5" fill="white" />
              <circle cx="40" cy="40" r="2" fill="none" stroke="white" strokeWidth="1" />
              <rect x="13" y="38" width="4" height="4" fill="white" transform="rotate(45 15 40)" opacity="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-cyber)`} />
        </svg>
      );

    case "royal_damask":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-royal`} x="0" y="0" width="40" height="60" patternUnits="userSpaceOnUse">
              <path d="M20,5 Q10,15 10,25 T20,45 Q30,35 30,25 T20,5 Z" fill="none" stroke="white" strokeWidth="1.2" />
              <path d="M20,15 Q15,22 15,28 T20,40 Q25,34 25,28 T20,15 Z" fill="none" stroke="white" strokeWidth="0.7" opacity="0.5" />
              <path d="M0,30 Q8,20 20,25 M40,30 Q32,20 20,25" fill="none" stroke="white" strokeWidth="1" opacity="0.8" />
              <path d="M0,5 Q10,0 20,5 T40,5 M0,55 Q10,60 20,55 T40,55" fill="none" stroke="white" strokeWidth="0.6" opacity="0.4" />
              <circle cx="20" cy="27" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-royal)`} />
        </svg>
      );

    case "matrix_glitch":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-glitch`} x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="8" x2="80" y2="8" stroke="white" strokeWidth="2" opacity="0.25" />
              <line x1="10" y1="18" x2="70" y2="18" stroke="white" strokeWidth="0.6" strokeDasharray="15,4,2,8" />
              <line x1="0" y1="28" x2="80" y2="28" stroke="white" strokeWidth="1.5" opacity="0.4" strokeDasharray="5,20,10,5" />
              <rect x="5" y="4" width="12" height="6" fill="white" opacity="0.6" />
              <rect x="45" y="22" width="18" height="4" fill="white" opacity="0.5" />
              <rect x="25" y="12" width="6" height="14" fill="white" opacity="0.15" />
              <rect x="65" y="2" width="8" height="8" fill="none" stroke="white" strokeWidth="0.8" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-glitch)`} />
        </svg>
      );

    case "sacred_geometry":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-sacred`} x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
              <circle cx="35" cy="35" r="30" fill="none" stroke="white" strokeWidth="0.8" opacity="0.4" />
              <circle cx="35" cy="35" r="20" fill="none" stroke="white" strokeWidth="1.2" />
              <circle cx="35" cy="35" r="10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.6" strokeDasharray="2,2" />
              <path d="M35,0 L35,70 M0,35 L70,35" fill="none" stroke="white" strokeWidth="0.6" opacity="0.3" />
              <path d="M13.8,13.8 L56.2,56.2 M13.8,56.2 L56.2,13.8" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
              <polygon points="35,5 65,35 35,65 5,35" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5" />
              <circle cx="35" cy="5" r="1.5" fill="white" />
              <circle cx="65" cy="35" r="1.5" fill="white" />
              <circle cx="35" cy="65" r="1.5" fill="white" />
              <circle cx="5" cy="35" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-sacred)`} />
        </svg>
      );

    case "exquisite_crowns":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${uid}-crowns`} x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
              <path d="M28,0 L56,24 L28,48 L0,24 Z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15" />
              <line x1="28" y1="0" x2="28" y2="48" stroke="white" strokeWidth="0.5" opacity="0.1" strokeDasharray="2,4" />
              
              <g transform="translate(14, 14)" fill="none" stroke="white" strokeLinejoin="round" strokeLinecap="round">
                <path d="M 2,16 L 26,16 L 24,19 L 4,19 Z" strokeWidth="1.2" opacity="0.8" />
                <line x1="6" y1="17.5" x2="22" y2="17.5" strokeWidth="0.8" opacity="0.5" strokeDasharray="1,2" />
                <path d="M 2,16 L 0,6 L 7,11 L 14,2 L 21,11 L 28,6 L 26,16" strokeWidth="1.5" opacity="0.75" />
                <path d="M 4,16 Q 14,8 24,16" strokeWidth="0.75" opacity="0.35" />
                <circle cx="0" cy="5" r="1.2" fill="white" />
                <circle cx="7" cy="10" r="1" fill="white" />
                <circle cx="14" cy="1.5" r="1.5" fill="white" />
                <circle cx="21" cy="10" r="1" fill="white" />
                <circle cx="28" cy="5" r="1.2" fill="white" />
              </g>

              <circle cx="28" cy="6" r="1" fill="white" opacity="0.4" />
              <circle cx="28" cy="42" r="1" fill="white" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-crowns)`} />
        </svg>
      );

    case "meme_nice_67":
      return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            {/* Highly frequent background grid pattern layout */}
            <pattern id={`${uid}-meme67`} x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="36" height="36" fill="none" stroke="white" strokeWidth="0.5" opacity="0.08" />
              
              {/* INCREASED VISIBILITY: Boosted stroke width to 1.8px and opacity to 0.65 */}
              <g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" opacity="0.65">
                {/* Background micro '6' */}
                <path d="M 18,10 C 13,11 10,14 10,18 C 10,22 13,24 16,24 C 19,24 21,22 21,18 C 21,15 19,14 16,14 C 13,14 11,16 10,18" strokeWidth="1.8" />
                {/* Background micro '7' */}
                <path d="M 23,11 L 29,11 L 24,24" strokeWidth="1.8" />
              </g>
            </pattern>

            {/* Glowing filter configuration */}
            <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background tiling layer */}
          <rect width="100%" height="100%" fill={`url(#${uid}-meme67)`} />

          {/* Core Central Design Emblem */}
          <g transform="translate(200, 50)" filter={`url(#${uid}-glow)`}>
            <circle cx="0" cy="0" r="34" fill="black" fillOpacity="0.25" stroke="white" strokeWidth="0.75" strokeDasharray="4,4" opacity="0.4" />
            <circle cx="0" cy="0" r="27" fill="none" stroke="white" strokeWidth="1.5" opacity="0.15" />
            
            <g fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              {/* UNMISTAKABLE GEOMETRIC '6' */}
              <path d="M -6,-15 L -23,-1 L -23,10 Q -23,23 -10,23 Q 4,23 4,10 Q 4,-2 -10,-2 Q -23,-2 -23,10" />
              
              {/* SHARP MILITARY TANK-STYLE '7' WITH HASH */}
              <path d="M 14,-13 L 34,-13 L 17,25" />
              <line x1="17" y1="5" x2="30" y2="5" strokeWidth="4.5" />
            </g>
          </g>
        </svg>
      );

    default:
      return null;
  }
}
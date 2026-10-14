import React from 'react';

export type BackgroundScreenType = 'welcome' | 'signup' | 'login' | 'presentation';

interface ShadowBackgroundDesignProps {
  screenType: BackgroundScreenType;
  className?: string;
  intensity?: 'vivid' | 'soft';
}

/**
 * 4-Point Anime / Manga Sparkle Star SVG
 */
export const MangaSparkleStar: React.FC<{
  size?: number;
  color?: string;
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({ size = 16, color = '#FFFFFF', glow = true, className = '', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 pointer-events-none select-none ${className}`}
    style={{
      filter: glow ? `drop-shadow(0 0 ${Math.max(2, size * 0.25)}px ${color})` : undefined,
      ...style,
    }}
  >
    <path
      d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
      fill={color}
    />
  </svg>
);

/**
 * Manga Twinkle Dot (small diamond / circle)
 */
export const MangaTwinkleDot: React.FC<{
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ size = 5, color = 'rgba(255,255,255,0.85)', className = '', style }) => (
  <span
    className={`inline-block rounded-full pointer-events-none select-none ${className}`}
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      boxShadow: `0 0 ${size}px ${color}`,
      ...style,
    }}
  />
);

/**
 * Glowing Crescent Moon Decoration
 */
export const CelestialMoon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    <defs>
      <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="moonBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EDE9FE" />
        <stop offset="70%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    {/* Ambient Glow */}
    <circle cx="24" cy="24" r="22" fill="url(#moonGlow)" />
    {/* Crescent Moon */}
    <path
      d="M28 8C20 8 13.5 14.5 13.5 22.5C13.5 30.5 20 37 28 37C32.5 37 36.5 35 39 31.8C30 32.5 22 25 22.8 15.8C24.2 11.5 28 8 28 8Z"
      fill="url(#moonBody)"
      filter="drop-shadow(0 0 6px rgba(168,85,247,0.5))"
    />
  </svg>
);

/**
 * Botanical Plant / Leaf Silhouette
 */
export const BotanicalPlantAccent: React.FC<{
  className?: string;
  width?: number;
  height?: number;
  flipped?: boolean;
}> = ({ className = '', width = 80, height = 120, flipped = false }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 80 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none opacity-25 ${className}`}
    style={{ transform: flipped ? 'scaleX(-1)' : undefined }}
  >
    <path
      d="M40 120 C40 85 45 45 42 10"
      stroke="#A855F7"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path
      d="M41 90 C25 80 20 65 24 55 C33 58 39 74 41 90 Z"
      fill="#7E22CE"
      opacity="0.6"
    />
    <path
      d="M41 75 C55 65 60 50 56 40 C47 43 41 59 41 75 Z"
      fill="#9333EA"
      opacity="0.6"
    />
    <path
      d="M42 55 C28 45 25 32 30 24 C37 28 41 42 42 55 Z"
      fill="#A855F7"
      opacity="0.5"
    />
    <path
      d="M42 38 C53 28 55 18 51 12 C45 15 41 27 42 38 Z"
      fill="#C084FC"
      opacity="0.5"
    />
  </svg>
);

/**
 * Abstract Flowing Purple Waves SVG
 */
export const AbstractPurpleWaves: React.FC<{
  variant?: 'welcome' | 'signup' | 'login';
}> = ({ variant = 'welcome' }) => {
  if (variant === 'welcome') {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        preserveAspectRatio="none"
        viewBox="0 0 360 740"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#25134A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1E103E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#120A27" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B1875" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#26104F" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#140A2B" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="centerOrb" cx="50%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#4C1D95" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0D0A1C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient radial glow in upper third */}
        <rect width="360" height="740" fill="url(#centerOrb)" />

        {/* Diagonal sweeping wave 1 */}
        <path
          d="M-40 280 Q100 210 220 300 T420 260 L420 540 Q280 580 160 510 T-40 560 Z"
          fill="url(#waveGrad1)"
        />

        {/* Layered wave 2 */}
        <path
          d="M-30 420 Q110 360 250 430 T420 390 L420 690 Q290 730 140 660 T-30 710 Z"
          fill="url(#waveGrad2)"
        />

        {/* Subtle contour lines */}
        <path
          d="M-20 270 Q120 200 240 290 T400 250"
          stroke="#7C3AED"
          strokeWidth="1.2"
          strokeOpacity="0.3"
          strokeDasharray="4 4"
        />
        <path
          d="M-10 410 Q130 350 270 420 T410 380"
          stroke="#A855F7"
          strokeWidth="1"
          strokeOpacity="0.25"
        />
      </svg>
    );
  }

  // signup & login wave patterns
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      preserveAspectRatio="none"
      viewBox="0 0 360 740"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveTop" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#2E165B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#140B29" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="waveBottom" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#321663" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#150C2A" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="topGlow" cx="50%" cy="15%" r="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0B081A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="360" height="740" fill="url(#topGlow)" />
      <path
        d="M-40 140 Q90 190 230 130 T420 160 L420 0 L-40 0 Z"
        fill="url(#waveTop)"
      />
      <path
        d="M-40 560 Q120 500 260 580 T420 540 L420 740 L-40 740 Z"
        fill="url(#waveBottom)"
      />
      <path
        d="M-20 550 Q140 490 280 570 T410 530"
        stroke="#8B5CF6"
        strokeWidth="1"
        strokeOpacity="0.2"
      />
    </svg>
  );
};

/**
 * Main ShadowBackgroundDesign Component
 * Produces the near-black navy-purple atmospheric canvas with abstract purple waves,
 * celestial stars, crescent moon, and botanical plant silhouettes.
 */
export const ShadowBackgroundDesign: React.FC<ShadowBackgroundDesignProps> = ({
  screenType,
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      style={{
        background:
          screenType === 'presentation'
            ? 'linear-gradient(135deg, #090616 0%, #110B27 50%, #080514 100%)'
            : 'linear-gradient(180deg, #0D0A1C 0%, #140E2D 45%, #0B0818 100%)',
      }}
    >
      {/* 1. Abstract Flowing Waves */}
      <AbstractPurpleWaves
        variant={screenType === 'welcome' ? 'welcome' : screenType === 'signup' ? 'signup' : 'login'}
      />

      {/* 2. Celestial Moon (Welcome & Login) */}
      {screenType === 'welcome' && (
        <div className="absolute top-12 right-6">
          <CelestialMoon size={42} />
        </div>
      )}

      {screenType === 'login' && (
        <div className="absolute top-10 right-8">
          <CelestialMoon size={36} />
        </div>
      )}

      {screenType === 'signup' && (
        <div className="absolute top-9 left-7">
          <CelestialMoon size={32} />
        </div>
      )}

      {/* 3. Small Stars & Sparkles */}
      {screenType === 'welcome' && (
        <>
          <div className="absolute top-16 left-8 animate-pulse" style={{ animationDuration: '4s' }}>
            <MangaSparkleStar size={14} color="#EDE9FE" glow={true} />
          </div>
          <div className="absolute top-28 left-20">
            <MangaTwinkleDot size={4} color="#C4B5FD" />
          </div>
          <div className="absolute top-44 right-12">
            <MangaSparkleStar size={10} color="#DDD6FE" glow={true} />
          </div>
          <div className="absolute top-72 left-6">
            <MangaSparkleStar size={12} color="#FFFFFF" glow={true} />
          </div>
          <div className="absolute top-80 right-8">
            <MangaTwinkleDot size={5} color="#A78BFA" />
          </div>
          <div className="absolute bottom-56 left-10">
            <MangaSparkleStar size={11} color="#C4B5FD" glow={true} />
          </div>
          <div className="absolute bottom-40 right-14">
            <MangaTwinkleDot size={4} color="#E9D5FF" />
          </div>
        </>
      )}

      {screenType === 'signup' && (
        <>
          <div className="absolute top-16 right-10">
            <MangaSparkleStar size={12} color="#DDD6FE" glow={true} />
          </div>
          <div className="absolute top-36 left-6">
            <MangaTwinkleDot size={4} color="#C4B5FD" />
          </div>
          <div className="absolute top-48 right-7">
            <MangaSparkleStar size={10} color="#FFFFFF" glow={true} />
          </div>
          <div className="absolute bottom-60 right-8">
            <MangaSparkleStar size={13} color="#C4B5FD" glow={true} />
          </div>
          <div className="absolute bottom-36 right-20">
            <MangaTwinkleDot size={4} color="#A78BFA" />
          </div>
        </>
      )}

      {screenType === 'login' && (
        <>
          <div className="absolute top-16 left-8">
            <MangaSparkleStar size={12} color="#DDD6FE" glow={true} />
          </div>
          <div className="absolute top-40 right-6">
            <MangaTwinkleDot size={5} color="#C4B5FD" />
          </div>
          <div className="absolute top-52 left-10">
            <MangaSparkleStar size={11} color="#FFFFFF" glow={true} />
          </div>
          <div className="absolute bottom-64 left-8">
            <MangaSparkleStar size={13} color="#C4B5FD" glow={true} />
          </div>
          <div className="absolute bottom-40 left-16">
            <MangaTwinkleDot size={4} color="#A78BFA" />
          </div>
        </>
      )}

      {/* 4. Plant / Botanical Accents */}
      {screenType === 'welcome' && (
        <div className="absolute bottom-0 right-2">
          <BotanicalPlantAccent width={70} height={100} flipped={true} />
        </div>
      )}

      {screenType === 'signup' && (
        <div className="absolute bottom-0 right-3">
          <BotanicalPlantAccent width={65} height={95} flipped={false} />
        </div>
      )}

      {screenType === 'login' && (
        <div className="absolute bottom-0 left-2">
          <BotanicalPlantAccent width={65} height={95} flipped={false} />
        </div>
      )}

      {/* Presentation ambient sparkles */}
      {screenType === 'presentation' && (
        <>
          <div className="absolute top-12 left-16 opacity-60">
            <MangaSparkleStar size={18} color="#C084FC" glow={true} />
          </div>
          <div className="absolute top-24 right-24 opacity-70">
            <MangaSparkleStar size={22} color="#EDE9FE" glow={true} />
          </div>
          <div className="absolute bottom-20 left-1/4 opacity-50">
            <MangaSparkleStar size={16} color="#A78BFA" glow={true} />
          </div>
          <div className="absolute bottom-16 right-1/3 opacity-60">
            <MangaSparkleStar size={14} color="#DDD6FE" glow={true} />
          </div>
        </>
      )}
    </div>
  );
};

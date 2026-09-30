import React, { useState, useEffect, useRef } from 'react';

export type ShadowRankType = 'PAWN' | 'KNIGHT' | 'BISHOP' | 'ROOK' | 'QUEEN' | 'KING';

export interface PawnRankBadgeProps {
  rank?: ShadowRankType;
  variant?: 'profile' | 'compact' | 'coin' | 'badge' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isDark?: boolean;
  onClick?: (e?: any) => void;
  className?: string;
  showSubtitle?: boolean;
  isPromoting?: boolean;
}

/**
 * Classic Chess Coin (Instagram-style verification coin badge)
 * Supports both PAWN and KNIGHT with clean, uncluttered prestige mark.
 */
export const ChessCoin: React.FC<{
  rank?: ShadowRankType;
  size?: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}> = ({
  rank = 'PAWN',
  size = 15,
  className = '',
  onClick,
  title,
}) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const coinGradId = `chessCoinGrad_${uniqueId}`;
  const rimGradId = `chessCoinRim_${uniqueId}`;
  const defaultTitle = `Shadow Rank: ${rank} (${rank === 'KNIGHT' ? 'Rank II' : 'Rank I'})`;

  return (
    <span
      onClick={onClick}
      title={title || defaultTitle}
      className={`inline-flex items-center justify-center shrink-0 align-middle select-none transition-transform duration-200 ${
        onClick ? 'cursor-pointer hover:scale-125 active:scale-90' : 'cursor-default'
      } ${className}`}
      style={{ width: size, height: size }}
      role={onClick ? 'button' : undefined}
      aria-label={title || defaultTitle}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-[0_1.5px_4px_rgba(255,10,120,0.4)]"
      >
        <defs>
          <linearGradient id={coinGradId} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            {rank === 'KNIGHT' ? (
              <>
                <stop offset="0%" stopColor="#C026D3" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#06B6D4" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FF1879" />
                <stop offset="50%" stopColor="#C026D3" />
                <stop offset="100%" stopColor="#7C3AED" />
              </>
            )}
          </linearGradient>

          <linearGradient id={rimGradId} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            {rank === 'KNIGHT' ? (
              <>
                <stop offset="0%" stopColor="#E879F9" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#38BDF8" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FF94C8" />
                <stop offset="45%" stopColor="#FF0A78" />
                <stop offset="100%" stopColor="#A855F7" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* 8-lobed Verified Rosette Coin Shape */}
        <path
          d="M19.965 8.521C19.988 8.347 20 8.173 20 8C20 5.621 17.857 3.712 15.479 4.035C14.786 2.802 13.466 2 12 2C10.534 2 9.214 2.802 8.521 4.035C6.143 3.712 4 5.621 4 8C4 8.173 4.012 8.347 4.035 8.521C2.802 9.214 2 10.534 2 12C2 13.466 2.802 14.786 4.035 15.479C4.012 15.653 4 15.827 4 16C4 18.379 6.143 20.288 8.521 19.965C9.214 21.198 10.534 22 12 22C13.466 22 14.786 21.198 15.479 19.965C17.857 20.288 20 18.379 20 16C20 15.827 19.988 15.653 19.965 15.479C21.198 14.786 22 13.466 22 12C22 10.534 21.198 9.214 19.965 8.521Z"
          fill={`url(#${coinGradId})`}
          stroke={`url(#${rimGradId})`}
          strokeWidth="0.5"
        />

        {/* Delicate inner coin bevel ring */}
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.5"
          strokeDasharray="1.2 1.2"
        />

        {rank === 'KNIGHT' ? (
          /* Solid White Chess Knight (Equestrian Steed) Motif */
          <path
            d="M9 16.5H15V15H14.2C14.2 13.8 14.6 13 15.2 12C15.6 11.3 15.4 10.1 14.6 9.4L13.8 8.7C13.8 8.1 13.5 7.6 13.1 7.2L12.5 6.5C12.3 6.3 12 6.4 12 6.7V7.5C11.5 7.4 10.8 7.6 10.3 8.1L9.2 9.2C8.7 9.7 8.6 10.5 9 11.1L9.7 12.1C9.4 12.7 9.2 13.4 9 14.2V16.5Z"
            fill="#FFFFFF"
          />
        ) : (
          /* Solid White Chess Pawn Motif */
          <>
            <circle cx="12" cy="7.2" r="2.2" fill="#FFFFFF" />
            <ellipse cx="12" cy="10.4" rx="2.5" ry="0.7" fill="#FFFFFF" />
            <path
              d="M10.1 14.3C10.4 12.6 11 11.6 11.3 10.8H12.7C13 11.6 13.6 12.6 13.9 14.3H10.1Z"
              fill="#FFFFFF"
            />
            <path
              d="M8.8 15.2C8.8 14.75 9.15 14.4 9.6 14.4H14.4C14.85 14.4 15.2 14.75 15.2 15.2V16.4C15.2 16.7 14.95 16.9 14.65 16.9H9.35C9.05 16.9 8.8 16.7 8.8 16.4V15.2Z"
              fill="#FFFFFF"
            />
          </>
        )}
      </svg>
    </span>
  );
};

/**
 * Premium Sculpted Pawn Emblem SVG
 */
export const PremiumPawnInsignia: React.FC<{
  size?: number;
  className?: string;
  glow?: boolean;
}> = ({ size = 28, className = '', glow = true }) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const gradId = `pawnGrad_${uniqueId}`;
  const rimGradId = `rimGrad_${uniqueId}`;
  const glowGradId = `glowGrad_${uniqueId}`;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-45 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255,10,120,0.8) 0%, rgba(153,27,234,0.4) 60%, transparent 100%)',
          }}
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative drop-shadow-[0_2px_8px_rgba(255,10,120,0.4)]"
      >
        <defs>
          <linearGradient id={gradId} x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF2A85" />
            <stop offset="45%" stopColor="#C026D3" />
            <stop offset="85%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          <linearGradient id={rimGradId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF77B8" />
            <stop offset="35%" stopColor="#FF0A78" />
            <stop offset="70%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <radialGradient id={glowGradId} cx="24" cy="20" r="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B154C" />
            <stop offset="65%" stopColor="#120D22" />
            <stop offset="100%" stopColor="#080711" />
          </radialGradient>
        </defs>

        {/* 1. Medallion Base */}
        <path
          d="M24 2.5L39.5 9L46 24.5L39.5 40L24 46.5L8.5 40L2 24.5L8.5 9L24 2.5Z"
          fill={`url(#glowGradId)`}
          stroke={`url(#rimGradId)`}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* 2. Concentric Shield Ring */}
        <circle
          cx="24"
          cy="24.5"
          r="16.5"
          stroke={`url(#gradId)`}
          strokeWidth="1"
          strokeDasharray="1.5 2.5"
          strokeOpacity="0.65"
        />

        {/* 3. Radial glint */}
        <circle cx="24" cy="24.5" r="12" fill="#FF0A78" fillOpacity="0.08" />

        {/* 4. Sculpted Pawn Base */}
        <path
          d="M13.5 37.5C13.5 36.67 14.17 36 15 36H33C33.83 36 34.5 36.67 34.5 37.5C34.5 38.33 33.83 39 33 39H15C14.17 39 13.5 38.33 13.5 37.5Z"
          fill={`url(#gradId)`}
        />
        <path
          d="M16 33.5C16 32.95 16.45 32.5 17 32.5H31C31.55 32.5 32 32.95 32 33.5V35.5H16V33.5Z"
          fill={`url(#gradId)`}
          fillOpacity="0.9"
        />

        {/* 5. Fluted Stem */}
        <path
          d="M18.2 31.5C18.8 28.2 20.2 25.5 21 23H27C27.8 25.5 29.2 28.2 29.8 31.5H18.2Z"
          fill={`url(#gradId)`}
        />

        {/* 6. Collar Ring */}
        <ellipse cx="24" cy="21.5" rx="5.5" ry="1.8" fill={`url(#rimGradId)`} />

        {/* 7. Crown Orb */}
        <circle cx="24" cy="14" r="5.2" fill={`url(#gradId)`} />

        {/* 8. Light Glint */}
        <ellipse cx="22.2" cy="12.2" rx="1.8" ry="1.2" transform="rotate(-30 22.2 12.2)" fill="#FFFFFF" fillOpacity="0.85" />

        {/* 9. Front Facets */}
        <path
          d="M24 19V32M22.5 24C21.8 26.2 20.8 28.5 20.2 31M25.5 24C26.2 26.2 27.2 28.5 27.8 31"
          stroke="#FFFFFF"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
};

/**
 * Premium Sculpted Knight Emblem SVG
 * Features the equestrian steed with cyber-metallic gradients, alert ears,
 * fluted mane crest, and specular cyan/violet lighting.
 */
export const PremiumKnightInsignia: React.FC<{
  size?: number;
  className?: string;
  glow?: boolean;
}> = ({ size = 28, className = '', glow = true }) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const gradId = `knightGrad_${uniqueId}`;
  const rimGradId = `knightRim_${uniqueId}`;
  const glowGradId = `knightGlow_${uniqueId}`;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(168,85,247,0.85) 0%, rgba(6,182,212,0.45) 60%, transparent 100%)',
          }}
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative drop-shadow-[0_2px_10px_rgba(168,85,247,0.5)]"
      >
        <defs>
          <linearGradient id={gradId} x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C026D3" />
            <stop offset="40%" stopColor="#7C3AED" />
            <stop offset="80%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <linearGradient id={rimGradId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="30%" stopColor="#A855F7" />
            <stop offset="70%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>

          <radialGradient id={glowGradId} cx="24" cy="20" r="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#251240" />
            <stop offset="65%" stopColor="#0C1024" />
            <stop offset="100%" stopColor="#050711" />
          </radialGradient>
        </defs>

        {/* 1. Medallion Base (Shield Shape) */}
        <path
          d="M24 2.5L39.5 9L46 24.5L39.5 40L24 46.5L8.5 40L2 24.5L8.5 9L24 2.5Z"
          fill={`url(#glowGradId)`}
          stroke={`url(#rimGradId)`}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* 2. Concentric Shield Ring with Cyan/Violet Energy */}
        <circle
          cx="24"
          cy="24.5"
          r="16.5"
          stroke={`url(#rimGradId)`}
          strokeWidth="1"
          strokeDasharray="2 3"
          strokeOpacity="0.75"
        />

        {/* 3. Radial glint */}
        <circle cx="24" cy="24.5" r="12" fill="#8B5CF6" fillOpacity="0.12" />

        {/* 4. Knight Pedestal Base */}
        <path
          d="M13 38C13 37.17 13.67 36.5 14.5 36.5H33.5C34.33 36.5 35 37.17 35 38C35 38.83 34.33 39.5 33.5 39.5H14.5C13.67 39.5 13 38.83 13 38Z"
          fill={`url(#gradId)`}
        />
        <path
          d="M16 34C16 33.45 16.45 33 17 33H31C31.55 33 32 33.45 32 34V36H16V34Z"
          fill={`url(#gradId)`}
          fillOpacity="0.9"
        />

        {/* 5. Sculpted Equestrian Knight Body & Mane */}
        <path
          d="M17.5 32.5C17.5 32.5 17 28 19 25C19.5 24.2 20.5 23.5 21 22.5C21.5 21.5 21.2 20 20 18.5L18.5 16.5C18 15.8 18.2 14.8 19 14.2L21 12.8C21.8 12.2 22.8 12.4 23.5 13.1L24.5 14.1C25.2 13 26.5 11.5 27.5 10C28.2 8.8 29.8 8.5 30.8 9.5L31.5 10.2C32.2 10.9 32.3 12 31.8 12.8C31 14.2 30.2 16 30.5 17.5C30.8 19 32 20.2 32.5 21.8C33.2 24.5 32.5 28.5 30.5 32.5H17.5Z"
          fill={`url(#gradId)`}
        />

        {/* 6. Mane Flutes (Back Ridges) */}
        <path
          d="M28 12C29.5 13.5 30 16 29.5 18M27 15C28.2 16.5 28.8 19 28.2 21M26 19C27.5 21 28 24 27.5 26.5"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />

        {/* 7. Steed Eye Jewel (Cyan/Diamond Specular glint) */}
        <circle cx="23" cy="16.5" r="1.3" fill="#38BDF8" />
        <circle cx="22.7" cy="16.2" r="0.5" fill="#FFFFFF" />

        {/* 8. Specular Highlights on Muzzle */}
        <path
          d="M20 17.5L21.5 19.5"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />

        {/* 9. Apex Crystal Pip */}
        <polygon points="24,42 25.5,44 24,46 22.5,44" fill="#06B6D4" fillOpacity="0.95" />
      </svg>
    </div>
  );
};

export const PawnRankBadge: React.FC<PawnRankBadgeProps> = ({
  rank = 'PAWN',
  variant = 'profile',
  size = 'md',
  isDark = true,
  onClick,
  className = '',
  showSubtitle = true,
  isPromoting = false,
}) => {
  const [internalPromoting, setInternalPromoting] = useState(false);
  const prevRankRef = useRef(rank);

  // Detect rank change and trigger smooth promotion animation
  useEffect(() => {
    if (prevRankRef.current === 'PAWN' && rank === 'KNIGHT') {
      setInternalPromoting(true);
      const timer = setTimeout(() => setInternalPromoting(false), 1400);
      return () => clearTimeout(timer);
    }
    prevRankRef.current = rank;
  }, [rank]);

  const activePromotion = isPromoting || internalPromoting;
  const isKnight = rank === 'KNIGHT';

  // Pure Chess Coin Variant (Classic & simple Instagram-style badge without text)
  if (variant === 'compact' || variant === 'coin' || variant === 'icon') {
    const coinSizes = { sm: 13, md: 15, lg: 18 };
    return (
      <ChessCoin
        rank={rank}
        size={coinSizes[size]}
        onClick={onClick}
        className={className}
      />
    );
  }

  // Simple Badge Variant
  if (variant === 'badge') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 ${
          onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-95' : ''
        } ${activePromotion ? 'ring-2 ring-cyan-400/60 shadow-[0_0_24px_rgba(6,182,212,0.4)]' : ''} ${className}`}
        style={{
          background: isKnight
            ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(6, 182, 212, 0.14) 100%)'
            : isDark
            ? 'linear-gradient(135deg, rgba(255, 10, 120, 0.15) 0%, rgba(153, 27, 234, 0.12) 50%, rgba(79, 70, 229, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255, 10, 120, 0.1) 0%, rgba(153, 27, 234, 0.07) 100%)',
          borderColor: isKnight ? 'rgba(168, 85, 247, 0.5)' : 'rgba(255, 10, 120, 0.38)',
          boxShadow: isKnight
            ? '0 4px 20px rgba(168, 85, 247, 0.25)'
            : '0 4px 16px rgba(255, 10, 120, 0.16)',
        }}
      >
        <div className={`transition-transform duration-500 ${activePromotion ? 'scale-110 rotate-12' : ''}`}>
          {isKnight ? <PremiumKnightInsignia size={22} glow={true} /> : <PremiumPawnInsignia size={22} glow={true} />}
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-black tracking-[0.12em] text-transparent bg-clip-text ${
                isKnight
                  ? 'bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300'
                  : 'bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-300'
              }`}
            >
              {rank}
            </span>
            <span
              className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border ${
                isKnight
                  ? 'bg-purple-500/25 text-purple-200 border-purple-500/40'
                  : 'bg-pink-500/25 text-pink-200 border border-pink-500/30'
              }`}
            >
              {isKnight ? 'RANK II' : 'RANK I'}
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[9px] text-slate-400 font-medium tracking-tight">
              {isKnight ? 'Vanguard Tier' : 'Reputation Status'}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Profile Flagship Variant with promotion transition animation
  return (
    <div
      onClick={onClick}
      className={`group relative flex-1 flex items-center justify-between gap-3 p-2.5 rounded-2xl border transition-all duration-500 select-none overflow-hidden ${
        onClick ? 'cursor-pointer hover:scale-[1.015] active:scale-[0.985]' : ''
      } ${
        activePromotion
          ? 'scale-[1.02] ring-2 ring-cyan-400/70 shadow-[0_0_32px_rgba(6,182,212,0.45)]'
          : ''
      } ${className}`}
      style={{
        background: isKnight
          ? isDark
            ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.22) 0%, rgba(6, 182, 212, 0.16) 45%, rgba(18, 16, 36, 0.98) 100%)'
            : 'linear-gradient(135deg, rgba(168, 85, 247, 0.14) 0%, rgba(6, 182, 212, 0.10) 50%, rgba(248, 250, 252, 0.95) 100%)'
          : isDark
          ? 'linear-gradient(135deg, rgba(255, 10, 120, 0.18) 0%, rgba(153, 27, 234, 0.14) 40%, rgba(20, 23, 38, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255, 10, 120, 0.12) 0%, rgba(153, 27, 234, 0.08) 50%, rgba(248, 250, 252, 0.95) 100%)',
        borderColor: isKnight ? 'rgba(168, 85, 247, 0.55)' : 'rgba(255, 10, 120, 0.4)',
        boxShadow: isKnight
          ? isDark
            ? '0 6px 24px -2px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(6, 182, 212, 0.15) inset'
            : '0 4px 18px -2px rgba(168, 85, 247, 0.2)'
          : isDark
          ? '0 6px 20px -2px rgba(255, 10, 120, 0.22), 0 0 0 1px rgba(255, 10, 120, 0.1) inset'
          : '0 4px 16px -2px rgba(255, 10, 120, 0.15)',
      }}
      title={`Shadow Identity Rank: ${rank} (${isKnight ? 'Rank II · Vanguard Tier' : 'Rank I · Starting Reputation Tier'})`}
    >
      {/* Promotion Luminous Energy Sheen Wave */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          isKnight
            ? 'from-transparent via-cyan-400/25 to-transparent'
            : 'from-transparent via-white/10 to-transparent'
        } pointer-events-none transition-transform duration-1000 ease-out ${
          activePromotion ? 'translate-x-full duration-700' : '-translate-x-full group-hover:translate-x-full'
        }`}
      />

      {/* Floating Micro-Glints during Promotion */}
      {activePromotion && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-around z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping [animation-delay:0.1s]" />
          <span className="w-2 h-2 rounded-full bg-fuchsia-300 animate-ping [animation-delay:0.25s]" />
          <span className="w-1 h-1 rounded-full bg-white animate-ping [animation-delay:0.4s]" />
        </div>
      )}

      {/* Left side: Premium Sculpted Emblem & Identity Status Text */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`transition-all duration-700 ${
            activePromotion
              ? 'scale-115 rotate-[360deg] duration-700'
              : 'group-hover:scale-105'
          }`}
        >
          {isKnight ? (
            <PremiumKnightInsignia size={34} glow={true} />
          ) : (
            <PremiumPawnInsignia size={34} glow={true} />
          )}
        </div>

        <div className="flex flex-col text-left min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[13px] font-black tracking-[0.14em] text-transparent bg-clip-text transition-all duration-500 ${
                isKnight
                  ? 'bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-300 drop-shadow-sm'
                  : 'bg-gradient-to-r from-pink-400 via-fuchsia-300 to-white drop-shadow-sm'
              }`}
            >
              {rank}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-[8.5px] font-black uppercase px-1.5 py-0.5 rounded-full transition-all duration-300 ${
                isKnight
                  ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 text-cyan-200 border border-cyan-400/40'
                  : 'bg-gradient-to-r from-pink-500/25 to-purple-500/25 text-pink-200 border border-pink-500/35'
              } tracking-wider`}
            >
              <span
                className={`w-1 h-1 rounded-full animate-pulse ${
                  isKnight ? 'bg-cyan-300' : 'bg-pink-400'
                }`}
              />
              {isKnight ? 'RANK II' : 'RANK I'}
            </span>
          </div>

          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[9.5px] text-slate-300 font-semibold truncate">
              {isKnight ? 'Vanguard Status' : 'Foundation Status'}
            </span>
            <span className={`text-[8px] font-mono ${isKnight ? 'text-cyan-400/90' : 'text-pink-400/80'}`}>
              ✦
            </span>
            <span className="text-[8.5px] text-slate-400 truncate">
              {isKnight ? 'Tier 02' : 'Tier 01'}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Mini luxury crest pip with promotion indicator */}
      <div className="flex flex-col items-end shrink-0 pl-1">
        <div
          className={`px-2 py-0.5 rounded-md border text-[8px] font-mono font-bold tracking-wider transition-all duration-300 ${
            isKnight
              ? 'bg-purple-500/15 border-cyan-500/30 text-cyan-300 shadow-sm shadow-cyan-500/20'
              : 'bg-white/5 border-white/10 text-pink-300'
          }`}
        >
          {isKnight ? 'TIER 02' : 'TIER 01'}
        </div>
      </div>
    </div>
  );
};

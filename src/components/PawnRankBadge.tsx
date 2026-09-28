import React from 'react';

interface PawnRankBadgeProps {
  variant?: 'profile' | 'compact' | 'coin' | 'badge' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isDark?: boolean;
  onClick?: (e?: any) => void;
  className?: string;
  showSubtitle?: boolean;
}

/**
 * Classic and Simple Chess Coin (Instagram-style verification coin badge)
 * Rendered just like the Instagram verified badge (blue tick / Bluetooth), but uniquely
 * styled with the Shadow cyber-metallic gradient and a crisp white chess pawn silhouette.
 * It contains NO text, providing an authentic, uncluttered, classic prestige mark for feed & reels.
 */
export const ChessCoin: React.FC<{
  size?: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}> = ({
  size = 15,
  className = '',
  onClick,
  title = 'Shadow Rank: PAWN (Rank I)',
}) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const coinGradId = `chessCoinGrad_${uniqueId}`;
  const rimGradId = `chessCoinRim_${uniqueId}`;

  return (
    <span
      onClick={onClick}
      title={title}
      className={`inline-flex items-center justify-center shrink-0 align-middle select-none transition-transform duration-200 ${
        onClick ? 'cursor-pointer hover:scale-125 active:scale-90' : 'cursor-default'
      } ${className}`}
      style={{
        width: size,
        height: size,
      }}
      role={onClick ? 'button' : undefined}
      aria-label={title}
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
          {/* Signature Shadow Neon Metallic Gradient */}
          <linearGradient id={coinGradId} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF1879" />
            <stop offset="50%" stopColor="#C026D3" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          {/* Specular Bezel Rim Gradient */}
          <linearGradient id={rimGradId} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF94C8" />
            <stop offset="45%" stopColor="#FF0A78" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>

        {/* Authentic 8-lobed Verified Rosette Coin Shape (Identical to classic verified badge geometry) */}
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

        {/* Clean, classic, perfectly proportioned Solid White Chess Pawn Coin Motif */}
        {/* 1. Pawn Orb Head */}
        <circle cx="12" cy="7.2" r="2.2" fill="#FFFFFF" />

        {/* 2. Beveled Collar */}
        <ellipse cx="12" cy="10.4" rx="2.5" ry="0.7" fill="#FFFFFF" />

        {/* 3. Sculpted Stem */}
        <path
          d="M10.1 14.3C10.4 12.6 11 11.6 11.3 10.8H12.7C13 11.6 13.6 12.6 13.9 14.3H10.1Z"
          fill="#FFFFFF"
        />

        {/* 4. Weighted Plinth & Base */}
        <path
          d="M8.8 15.2C8.8 14.75 9.15 14.4 9.6 14.4H14.4C14.85 14.4 15.2 14.75 15.2 15.2V16.4C15.2 16.7 14.95 16.9 14.65 16.9H9.35C9.05 16.9 8.8 16.7 8.8 16.4V15.2Z"
          fill="#FFFFFF"
        />
      </svg>
    </span>
  );
};

/**
 * Premium Sculpted Pawn Emblem SVG
 * Features a multi-layered, faceted, metallic crest with specular highlights
 * specifically crafted as an authentic Shadow reputation status insignia.
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
  const metalGradId = `metalGrad_${uniqueId}`;

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
          {/* Main neon metallic linear gradient */}
          <linearGradient id={gradId} x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF2A85" />
            <stop offset="45%" stopColor="#C026D3" />
            <stop offset="85%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          {/* Crest Rim metallic gradient */}
          <linearGradient id={rimGradId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF77B8" />
            <stop offset="35%" stopColor="#FF0A78" />
            <stop offset="70%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Obsidian Disc Inner Glow */}
          <radialGradient id={glowGradId} cx="24" cy="20" r="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B154C" />
            <stop offset="65%" stopColor="#120D22" />
            <stop offset="100%" stopColor="#080711" />
          </radialGradient>

          {/* Specular White-Pink Highlight */}
          <linearGradient id={metalGradId} x1="18" y1="8" x2="30" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#FFB3D9" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#FF2A85" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* 1. Outer Faceted Octagonal / Diamond Medallion Base */}
        <path
          d="M24 2.5L39.5 9L46 24.5L39.5 40L24 46.5L8.5 40L2 24.5L8.5 9L24 2.5Z"
          fill={`url(#glowGradId)`}
          stroke={`url(#rimGradId)`}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* 2. Concentric Inner Shield Ring */}
        <circle
          cx="24"
          cy="24.5"
          r="16.5"
          stroke={`url(#gradId)`}
          strokeWidth="1"
          strokeDasharray="1.5 2.5"
          strokeOpacity="0.65"
        />

        {/* 3. Subtle background radial energy glint */}
        <circle cx="24" cy="24.5" r="12" fill="#FF0A78" fillOpacity="0.08" />

        {/* 4. Sculpted Pawn Silhouette: Pedestal Base */}
        {/* Tier 1 bottom foundation bar */}
        <path
          d="M13.5 37.5C13.5 36.67 14.17 36 15 36H33C33.83 36 34.5 36.67 34.5 37.5C34.5 38.33 33.83 39 33 39H15C14.17 39 13.5 38.33 13.5 37.5Z"
          fill={`url(#gradId)`}
        />
        {/* Tier 2 beveled base plinth */}
        <path
          d="M16 33.5C16 32.95 16.45 32.5 17 32.5H31C31.55 32.5 32 32.95 32 33.5V35.5H16V33.5Z"
          fill={`url(#gradId)`}
          fillOpacity="0.9"
        />

        {/* 5. Fluted Stem & Torso */}
        <path
          d="M18.2 31.5C18.8 28.2 20.2 25.5 21 23H27C27.8 25.5 29.2 28.2 29.8 31.5H18.2Z"
          fill={`url(#gradId)`}
        />

        {/* 6. Sculpted Collar Ring */}
        <ellipse cx="24" cy="21.5" rx="5.5" ry="1.8" fill={`url(#rimGradId)`} />

        {/* 7. Crown Orb (Head of the Pawn) */}
        <circle cx="24" cy="14" r="5.2" fill={`url(#gradId)`} />

        {/* 8. Specular 3D Light Glint on Head */}
        <ellipse cx="22.2" cy="12.2" rx="1.8" ry="1.2" transform="rotate(-30 22.2 12.2)" fill="#FFFFFF" fillOpacity="0.85" />

        {/* 9. Front Facet Highlights */}
        <path
          d="M24 19V32M22.5 24C21.8 26.2 20.8 28.5 20.2 31M25.5 24C26.2 26.2 27.2 28.5 27.8 31"
          stroke="#FFFFFF"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />

        {/* 10. Micro Jewel pip at bottom apex */}
        <polygon points="24,42 25.5,44 24,46 22.5,44" fill="#38BDF8" fillOpacity="0.9" />
      </svg>
    </div>
  );
};

export const PawnRankBadge: React.FC<PawnRankBadgeProps> = ({
  variant = 'profile',
  size = 'md',
  isDark = true,
  onClick,
  className = '',
  showSubtitle = true,
}) => {
  // Pure Chess Coin Variant (Classic & simple Instagram-style badge without text)
  if (variant === 'compact' || variant === 'coin' || variant === 'icon') {
    const coinSizes = { sm: 13, md: 15, lg: 18 };
    return (
      <ChessCoin
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
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
          onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-95' : ''
        } ${className}`}
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(255, 10, 120, 0.15) 0%, rgba(153, 27, 234, 0.12) 50%, rgba(79, 70, 229, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255, 10, 120, 0.1) 0%, rgba(153, 27, 234, 0.07) 100%)',
          borderColor: 'rgba(255, 10, 120, 0.38)',
          boxShadow: '0 4px 16px rgba(255, 10, 120, 0.16)',
        }}
      >
        <PremiumPawnInsignia size={22} glow={true} />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-300">
              PAWN
            </span>
            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-pink-500/25 text-pink-200 border border-pink-500/30">
              RANK I
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[9px] text-slate-400 font-medium tracking-tight">
              Reputation Status
            </span>
          )}
        </div>
      </div>
    );
  }

  // Profile Flagship Variant (Scales proportionally with the card/UI, luxury status indicator)
  return (
    <div
      onClick={onClick}
      className={`group relative flex-1 flex items-center justify-between gap-3 p-2.5 rounded-2xl border transition-all duration-300 select-none overflow-hidden ${
        onClick ? 'cursor-pointer hover:scale-[1.015] active:scale-[0.985]' : ''
      } ${className}`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(255, 10, 120, 0.18) 0%, rgba(153, 27, 234, 0.14) 40%, rgba(20, 23, 38, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255, 10, 120, 0.12) 0%, rgba(153, 27, 234, 0.08) 50%, rgba(248, 250, 252, 0.95) 100%)',
        borderColor: 'rgba(255, 10, 120, 0.4)',
        boxShadow: isDark
          ? '0 6px 20px -2px rgba(255, 10, 120, 0.22), 0 0 0 1px rgba(255, 10, 120, 0.1) inset'
          : '0 4px 16px -2px rgba(255, 10, 120, 0.15)',
      }}
      title="Shadow Identity Rank: PAWN (Rank I · Starting Reputation Tier)"
    >
      {/* Ambient subtle light sweep sheen across badge */}
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent rotate-45 pointer-events-none group-hover:translate-x-full transition-transform duration-1000 ease-out" />

      {/* Left side: Premium Sculpted Emblem & Identity Status Text */}
      <div className="flex items-center gap-2.5 min-w-0">
        <PremiumPawnInsignia size={34} glow={true} />

        <div className="flex flex-col text-left min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[13px] font-black tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-white drop-shadow-sm">
              PAWN
            </span>
            <span className="inline-flex items-center gap-1 text-[8.5px] font-black uppercase px-1.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500/25 to-purple-500/25 text-pink-200 border border-pink-500/35 tracking-wider">
              <span className="w-1 h-1 rounded-full bg-pink-400 animate-pulse" />
              RANK I
            </span>
          </div>

          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[9.5px] text-slate-300 font-semibold truncate">
              Foundation Status
            </span>
            <span className="text-[8px] text-pink-400/80 font-mono">✦</span>
            <span className="text-[8.5px] text-slate-400 truncate">
              Identity Tier
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Mini luxury crest pip */}
      <div className="hidden sm:flex flex-col items-end shrink-0 pl-1">
        <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-mono font-bold text-pink-300 tracking-wider">
          TIER 01
        </div>
      </div>
    </div>
  );
};

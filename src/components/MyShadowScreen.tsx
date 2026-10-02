import React, { useState } from 'react';
import {
  ChevronLeft,
  Copy,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Lock,
  CheckCircle2,
  TrendingUp,
  Activity,
  Award,
  Wallet,
  DollarSign,
  Briefcase,
  Eye,
  EyeOff,
  Sliders,
  Cpu,
  Radio,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PawnRankBadge, ShadowRankType, PremiumPawnInsignia, PremiumKnightInsignia } from './PawnRankBadge';

export interface MyShadowScreenProps {
  onBack: () => void;
  isDark: boolean;
  currentUser?: {
    name: string;
    username: string;
    shadowId: string;
    rank: ShadowRankType;
    isVerified: boolean;
    avatarGradient: string;
  };
  onToast: (msg: string, icon?: 'sparkles' | 'bookmark') => void;
}

export const MyShadowScreen: React.FC<MyShadowScreenProps> = ({
  onBack,
  isDark,
  currentUser = {
    name: 'Mauricio Lopez',
    username: 'maoo.lopez',
    shadowId: 'shdw_mlopez89',
    rank: 'PAWN',
    isVerified: true,
    avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
  },
  onToast,
}) => {
  // Navigation tabs for sub-sections to keep the UI clean and avoid cognitive overload
  const [activeSection, setActiveSection] = useState<'overview' | 'reputation' | 'monetization' | 'ecosystem'>('overview');

  // UI State toggles for Settings & Privacy section (UI state only - no backend logic)
  const [monetizationOptIn, setMonetizationOptIn] = useState(true);
  const [isPublicShadow, setIsPublicShadow] = useState(true);
  const [telemetryShield, setTelemetryShield] = useState(false);

  // Expandable sections for clean mobile UX
  const [expandedTiers, setExpandedTiers] = useState(false);
  const [selectedActivityTab, setSelectedActivityTab] = useState<'activity' | 'reputation_shifts' | 'milestones' | 'influence' | 'achievements'>('activity');

  const handleCopyId = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(currentUser.shadowId);
      }
    } catch {
      // Fallback
    }
    onToast(`Shadow ID copied: ${currentUser.shadowId}`, 'sparkles');
  };

  const RANK_TIERS = [
    { rank: 'PAWN', level: 'Rank I', label: 'Foundation Status', isCurrent: currentUser.rank === 'PAWN', symbol: '♙' },
    { rank: 'KNIGHT', level: 'Rank II', label: 'Vanguard Status', isCurrent: currentUser.rank === 'KNIGHT', symbol: '♘' },
    { rank: 'BISHOP', level: 'Rank III', label: 'Strategic Status', isCurrent: false, symbol: '♗' },
    { rank: 'ROOK', level: 'Rank IV', label: 'Fortress Status', isCurrent: false, symbol: '♖' },
    { rank: 'QUEEN', level: 'Rank V', label: 'Sovereign Status', isCurrent: false, symbol: '♕' },
    { rank: 'KING', level: 'Rank VI', label: 'Apex Status', isCurrent: false, symbol: '♔' },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-32">
      {/* ======================================================== */}
      {/* A. CONCEPT-STYLE HEADER                                  */}
      {/* ======================================================== */}
      <header
        className={`sticky top-0 z-20 h-13 px-4 flex items-center justify-between shrink-0 backdrop-blur-xl border-b transition-colors ${
          isDark
            ? 'bg-[#0B0C14]/90 border-white/10 text-white'
            : 'bg-white/90 border-black/5 text-[#12131D]'
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-slate-800'
            }`}
            title="Return to Home Feed"
            aria-label="Back to Home Feed"
          >
            <ChevronLeft size={22} />
          </button>
          <div>
            <h1 className="text-base font-extrabold tracking-tight leading-tight flex items-center gap-1.5">
              <span>My Shadow</span>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/30">
                Hub
              </span>
            </h1>
          </div>
        </div>

        {/* Right Action: Copy Shadow ID */}
        <button
          onClick={handleCopyId}
          className="flex items-center gap-1 font-mono text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all cursor-pointer active:scale-95"
          title="Copy Shadow ID"
        >
          <span className="text-pink-400 font-bold">ID</span>
          <Copy size={11} className="text-slate-400 ml-0.5" />
        </button>
      </header>

      {/* Main Content Area */}
      <div className="px-4 pt-3 space-y-4">
        {/* ======================================================== */}
        {/* B. SHADOW IDENTITY — HERO SECTION                        */}
        {/* ======================================================== */}
        <div
          className={`relative rounded-[32px] p-5 overflow-hidden border shadow-2xl transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-b from-[#181A2E]/95 via-[#121424]/95 to-[#0D0F1B]/95 border-white/15 shadow-black/50'
              : 'bg-gradient-to-b from-slate-50 via-white to-slate-100/90 border-slate-200/90 shadow-slate-200/60'
          }`}
        >
          {/* Specular Top Rim Reflection */}
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-full"
          />

          {/* Ambient Cyber Aura Glow Behind Digital Avatar */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,10,120,0.8) 0%, rgba(153,27,234,0.6) 50%, rgba(6,182,212,0.4) 100%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Holographic Persona Insignia / Digital Aura Avatar */}
            <div className="relative mb-3.5">
              {/* Outer Layer: Orbiting Energy Rings */}
              <div
                className="w-24 h-24 rounded-full p-[3px] shadow-2xl relative flex items-center justify-center"
                style={{ background: currentUser.avatarGradient }}
              >
                {/* Middle Obsidian Rim */}
                <div className={`w-full h-full rounded-full p-[2.5px] ${isDark ? 'bg-[#0B0C14]' : 'bg-white'}`}>
                  {/* Inner Digital Persona Core with Sculpted Insignia */}
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #3B154C 0%, #171126 60%, #0B0A14 100%)',
                    }}
                  >
                    {currentUser.rank === 'KNIGHT' ? (
                      <PremiumKnightInsignia size={42} glow={false} />
                    ) : (
                      <PremiumPawnInsignia size={42} glow={false} />
                    )}
                  </div>
                </div>
              </div>

              {/* Verified Shield Badge Floating on Avatar Rim */}
              <div
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/50 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-md"
                title="Cryptographically Verified Digital Persona"
              >
                {currentUser.isVerified ? (
                  <ShieldCheck size={15} className="fill-emerald-500/20 text-emerald-400" />
                ) : (
                  <ShieldAlert size={15} className="text-amber-400" />
                )}
              </div>
            </div>

            {/* Display Name & Handle */}
            <div className="mb-1">
              <h2 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {currentUser.name}
              </h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                @{currentUser.username}
              </p>
            </div>

            {/* Shadow ID Capsule with Click-to-Copy */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-mono mt-1.5 mb-3.5 shadow-xs">
              <span className="text-pink-400 font-bold uppercase tracking-wider text-[9.5px]">SHADOW ID</span>
              <span className="text-white font-medium">{currentUser.shadowId}</span>
              <button
                onClick={handleCopyId}
                className="text-slate-400 hover:text-white p-0.5 cursor-pointer transition-colors"
                title="Copy Shadow ID"
              >
                <Copy size={11} />
              </button>
            </div>

            {/* Current Active Rank Badge */}
            <div className="w-full max-w-[280px]">
              <PawnRankBadge
                rank={currentUser.rank}
                variant="profile"
                isDark={isDark}
                onClick={() => onToast(`Shadow Rank: ${currentUser.rank} (Rank I · Starting Reputation Tier)`)}
              />
            </div>

            {/* Protocol Meta Bar */}
            <div className="w-full grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5 text-[10px]">
              <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400">Anchor:</span>
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {currentUser.isVerified ? 'Protocol Verified' : 'Standard Node'}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded-xl bg-white/[0.03] border border-white/5">
                <Sparkles size={11} className="text-cyan-400" />
                <span className="text-slate-400">Status:</span>
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Genesis Identity
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs: Clean Architecture */}
        <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 gap-1 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'overview', label: 'Rank & Path' },
              { id: 'reputation', label: 'Reputation' },
              { id: 'monetization', label: 'Earning & Brands' },
              { id: 'ecosystem', label: 'Privacy & Hardware' },
            ] as const
          ).map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* C. CURRENT RANK — DEDICATED SECTION                      */}
        {/* ======================================================== */}
        {(activeSection === 'overview' || activeSection === 'reputation') && (
          <div
            className={`rounded-[28px] p-4.5 border transition-all duration-300 ${
              isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-500/35 text-pink-400 flex items-center justify-center">
                  <span className="text-sm font-bold">♙</span>
                </div>
                <div>
                  <h3 className={`text-sm font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Current Rank
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Active Shadow Standing: {currentUser.rank}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 text-pink-300 border border-pink-400/35 text-[11px] font-black tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                Current: {currentUser.rank}
              </div>
            </div>

            {/* Rank Identity Callout */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md text-xl">
                  {currentUser.rank === 'KNIGHT' ? '♘' : '♙'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-black tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {currentUser.rank}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-bold">
                      {currentUser.rank === 'KNIGHT' ? 'Rank II' : 'Rank I'}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    {currentUser.rank === 'KNIGHT' ? 'Vanguard Status · Tier 02' : 'Foundation Status · Tier 01'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Protocol Tier</span>
                <span className="text-xs font-mono font-bold text-pink-400">Baseline</span>
              </div>
            </div>

            <p className="text-[10.5px] text-slate-400 mt-3 pt-2 border-t border-white/5 leading-relaxed">
              Conceptual progression: <span className="font-mono text-slate-300">PAWN → KNIGHT → BISHOP → ROOK → QUEEN → KING</span>. Promotion mechanics will be governed by upcoming protocol algorithms.
            </p>
          </div>
        )}

        {/* ======================================================== */}
        {/* E. SHADOW EVOLUTION / PROGRESS                           */}
        {/* ======================================================== */}
        {(activeSection === 'overview' || activeSection === 'reputation') && (
          <div
            className={`rounded-[28px] p-4.5 border transition-all duration-300 ${
              isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            {/* Header row */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/35 text-purple-400 flex items-center justify-center">
                  <TrendingUp size={15} />
                </div>
                <div>
                  <h3 className={`text-sm font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Shadow Evolution
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Evolution Path: Pawn to King
                  </p>
                </div>
              </div>

              <button
                onClick={() => setExpandedTiers(!expandedTiers)}
                className="flex items-center gap-1 text-[10px] text-purple-400 hover:text-purple-300 font-bold px-2 py-0.5 rounded-lg bg-white/5 cursor-pointer"
              >
                <span>{expandedTiers ? 'Collapse Tiers' : 'All Tiers'}</span>
                {expandedTiers ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>

            {/* Visual Horizontal Progression Track: Pawn → Knight → Bishop → Rook → Queen → King */}
            <div className="py-2.5 px-1 mb-3">
              <div className="flex items-center justify-between relative">
                {/* Connecting track line behind pills */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-pink-500/40 via-purple-500/20 to-white/10 pointer-events-none rounded-full"
                />

                {RANK_TIERS.map((tier, idx) => {
                  const isCurrent = tier.isCurrent;
                  const isPast = idx < RANK_TIERS.findIndex((t) => t.rank === currentUser.rank);

                  return (
                    <div key={tier.rank} className="relative z-10 flex flex-col items-center group">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-mono transition-all duration-300 border ${
                          isCurrent
                            ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white border-pink-300 shadow-md shadow-pink-500/40 scale-110 ring-2 ring-pink-500/40'
                            : isPast
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : isDark
                            ? 'bg-[#0E101D] text-slate-500 border-white/10'
                            : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}
                        title={`${tier.rank} - ${tier.label}`}
                      >
                        {tier.symbol}
                      </div>
                      <span
                        className={`text-[8.5px] font-extrabold uppercase mt-1.5 transition-colors ${
                          isCurrent
                            ? 'text-pink-400 font-black'
                            : isPast
                            ? 'text-emerald-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {tier.rank}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stepper / Hierarchy Rail Details (always shows current + expandable) */}
            <div className="space-y-2 mt-2">
              {RANK_TIERS.filter((tier) => expandedTiers || tier.isCurrent).map((tier, idx) => {
                const isPast = idx < RANK_TIERS.findIndex((t) => t.rank === currentUser.rank);
                const isCurrent = tier.isCurrent;

                return (
                  <div
                    key={tier.rank}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? isDark
                          ? 'bg-gradient-to-r from-purple-500/25 via-pink-500/20 to-cyan-500/15 border-purple-500/50 text-white shadow-xs'
                          : 'bg-purple-50/80 border-purple-300 text-purple-950 font-bold'
                        : isPast
                        ? isDark
                          ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : isDark
                        ? 'bg-white/[0.02] border-white/5 text-slate-500 opacity-60'
                        : 'bg-slate-50 border-slate-200/60 text-slate-400 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-mono border ${
                          isCurrent
                            ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white border-white/20 shadow-sm'
                            : isPast
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : isDark
                            ? 'bg-white/5 text-slate-500 border-white/5'
                            : 'bg-slate-200 text-slate-500 border-slate-300'
                        }`}
                      >
                        {tier.symbol}
                      </div>

                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-black tracking-wide ${isCurrent ? (isDark ? 'text-white' : 'text-slate-900') : ''}`}>
                            {tier.rank}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {tier.level}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight">
                          {tier.label}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-black uppercase px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-300 border border-pink-400/40 tracking-wider animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                          ACTIVE
                        </span>
                      ) : isPast ? (
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 size={10} />
                          Unlocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-slate-500 border border-white/5">
                          <Lock size={9} />
                          Locked Tier
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Informational Subtext */}
            <p className="text-[10.5px] text-slate-400 text-center mt-3 pt-2.5 border-t border-white/5">
              Rank evolution logic and unlocking thresholds will activate in upcoming protocol releases.
            </p>
          </div>
        )}

        {/* ======================================================== */}
        {/* D. REPUTATION / SHADOW STATUS                            */}
        {/* ======================================================== */}
        {(activeSection === 'overview' || activeSection === 'reputation') && (
          <div
            className={`rounded-[28px] p-4.5 border transition-all duration-300 ${
              isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/5">
              <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/35 text-cyan-400 flex items-center justify-center">
                <ShieldCheck size={15} />
              </div>
              <div>
                <h3 className={`text-sm font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Reputation Standing
                </h3>
                <p className="text-[10px] text-slate-400">
                  Protocol Status & Trust Framework
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                  Standing
                </span>
                <span className={`text-xs font-black mt-1 block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Foundation (Tier 01)
                </span>
                <span className="text-[9.5px] text-slate-500 mt-0.5 block">
                  Starting Protocol Baseline
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                  Node Authority
                </span>
                <span className="text-xs font-black mt-1 block text-pink-400">
                  Protocol Core
                </span>
                <span className="text-[9.5px] text-slate-500 mt-0.5 block">
                  Backend Authority Anchor
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                  Verification
                </span>
                <span className="text-xs font-black mt-1 block text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>Verified Identity</span>
                </span>
                <span className="text-[9.5px] text-slate-500 mt-0.5 block">
                  Cryptographic Badge Active
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                  Network Anchor
                </span>
                <span className={`text-xs font-black mt-1 block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Genesis Block
                </span>
                <span className="text-[9.5px] text-slate-500 mt-0.5 block">
                  Primary Node Registered
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* F. ACTIVITY / STATISTICS PLACEHOLDER                     */}
        {/* ======================================================== */}
        {(activeSection === 'overview' || activeSection === 'reputation') && (
          <div
            className={`rounded-[28px] p-4.5 border transition-all duration-300 ${
              isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            {/* Header row */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-500/35 text-pink-400 flex items-center justify-center">
                  <Activity size={15} />
                </div>
                <div>
                  <h3 className={`text-sm font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Shadow Chronicle
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Activity & Milestone Records
                  </p>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/5 overflow-x-auto no-scrollbar max-w-[210px]">
                {(
                  [
                    { id: 'activity', label: 'Activity' },
                    { id: 'reputation_shifts', label: 'Reputation' },
                    { id: 'milestones', label: 'Milestones' },
                    { id: 'influence', label: 'Influence' },
                    { id: 'achievements', label: 'Badges' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedActivityTab(tab.id)}
                    className={`px-2 py-0.5 rounded-md text-[9px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedActivityTab === tab.id
                        ? 'bg-pink-500 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Neutral Structured Empty State */}
            <div className="py-6 flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
                {selectedActivityTab === 'activity' ? (
                  <Activity size={22} className="text-pink-400" />
                ) : selectedActivityTab === 'reputation_shifts' ? (
                  <ShieldCheck size={22} className="text-cyan-400" />
                ) : selectedActivityTab === 'milestones' ? (
                  <TrendingUp size={22} className="text-purple-400" />
                ) : selectedActivityTab === 'influence' ? (
                  <Sparkles size={22} className="text-amber-400" />
                ) : (
                  <Award size={22} className="text-emerald-400" />
                )}
              </div>
              <h4 className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {selectedActivityTab === 'activity'
                  ? 'Activity Chronicle Initializing'
                  : selectedActivityTab === 'reputation_shifts'
                  ? 'Zero Reputation Alterations'
                  : selectedActivityTab === 'milestones'
                  ? 'Milestone Index Inactive'
                  : selectedActivityTab === 'influence'
                  ? 'Network Influence & Contribution Index'
                  : 'Genesis Identity Badge Granted'}
              </h4>
              <p className="text-[10.5px] text-slate-400 max-w-[270px] mt-1 leading-relaxed">
                {selectedActivityTab === 'activity'
                  ? 'Shadow identity operations, posts, and feed engagements will be chronicle-logged here.'
                  : selectedActivityTab === 'reputation_shifts'
                  ? 'Historical trust adjustments, peer validations, and tier progressions will appear in this ledger.'
                  : selectedActivityTab === 'milestones'
                  ? 'Key digital milestones (such as rank evolutions, node longevity, and tenure) will be permanently stamped here.'
                  : selectedActivityTab === 'influence'
                  ? 'Decentralized influence calculations and community contribution metrics will register here once live.'
                  : 'Genesis Node Identity badge active. Next archetype awards unlock when advancement modules deploy.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* G. EARNINGS SECTION (UI PLACEHOLDER)                     */}
        {/* ======================================================== */}
        {(activeSection === 'overview' || activeSection === 'monetization') && (
          <div
            className={`rounded-[28px] p-4.5 border transition-all duration-300 ${
              isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/35 text-emerald-400 flex items-center justify-center">
                  <Wallet size={15} />
                </div>
                <div>
                  <h3 className={`text-sm font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Shadow Earnings
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Monetization & Value Hub
                  </p>
                </div>
              </div>

              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                Phase 2
              </span>
            </div>

            {/* 4 Neutral Subsections (No fabricated money values) */}
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Estimated
                </span>
                <span className={`text-sm font-mono font-extrabold mt-1 block ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  — —
                </span>
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  Calculation engine pending
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Pending
                </span>
                <span className={`text-sm font-mono font-extrabold mt-1 block ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  — —
                </span>
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  Awaiting settlement phase
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Available Balance
                </span>
                <span className={`text-sm font-mono font-extrabold mt-1 block ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  — —
                </span>
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  Payout channels offline
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Payout History
                </span>
                <span className="text-xs font-bold text-slate-400 mt-1 block truncate">
                  No records
                </span>
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  Zero past transfers
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              Monetization logic and automated creator payouts will be configured in upcoming protocol milestones.
            </p>
          </div>
        )}

        {/* ======================================================== */}
        {/* H. CAMPAIGNS & SPONSORSHIPS (UI PLACEHOLDER)             */}
        {/* ======================================================== */}
        {(activeSection === 'overview' || activeSection === 'monetization') && (
          <div
            className={`rounded-[28px] p-4.5 border transition-all duration-300 ${
              isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-500/35 text-pink-400 flex items-center justify-center">
                  <Briefcase size={15} />
                </div>
                <div>
                  <h3 className={`text-sm font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Campaigns & Sponsorships
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Brand Collaborations & Creator Quests
                  </p>
                </div>
              </div>

              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-400">
                0 Active
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 mb-2">
                <Briefcase size={18} />
              </div>
              <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                No Active Sponsorship Campaigns
              </h4>
              <p className="text-[10.5px] text-slate-400 max-w-[270px] mt-1 leading-relaxed">
                Brand collaborations, creator grants, and sponsored tasks will be broadcast to eligible Shadows once campaign matching begins.
              </p>
              <div className="mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9.5px] text-slate-300 font-semibold">
                Campaign Eligibility: Rank I+ Shadows
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* I. PRIVACY & MONETIZATION SETTINGS                       */}
        {/* ======================================================== */}
        {(activeSection === 'overview' || activeSection === 'ecosystem') && (
          <div
            className={`rounded-[28px] p-4.5 border transition-all duration-300 ${
              isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/5">
              <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/35 text-purple-400 flex items-center justify-center">
                <Sliders size={15} />
              </div>
              <div>
                <h3 className={`text-sm font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Shadow Controls & Privacy
                </h3>
                <p className="text-[10px] text-slate-400">
                  Identity Governance & Permissions
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* Toggle 1: Monetization Opt-In */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex-1 pr-3">
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Shadow Monetization Participation
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                    Authorize your Shadow identity to be eligible for future rewards and campaigns.
                  </span>
                </div>
                <button
                  onClick={() => {
                    const next = !monetizationOptIn;
                    setMonetizationOptIn(next);
                    onToast(next ? 'Monetization participation enabled' : 'Monetization participation paused');
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    monetizationOptIn ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-white/10'
                  }`}
                  aria-label="Toggle monetization"
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform absolute top-1 ${
                      monetizationOptIn ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2: Public Shadow Profile */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex-1 pr-3">
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Public Shadow Visibility
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                    Allow other community members to view your digital persona and rank insignia.
                  </span>
                </div>
                <button
                  onClick={() => {
                    const next = !isPublicShadow;
                    setIsPublicShadow(next);
                    onToast(next ? 'Public Shadow visibility on' : 'Shadow visibility set to private');
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    isPublicShadow ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-white/10'
                  }`}
                  aria-label="Toggle visibility"
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform absolute top-1 ${
                      isPublicShadow ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3: Telemetry Shield */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex-1 pr-3">
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Telemetry Shield (Privacy Mode)
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                    Obfuscate direct usage telemetry while maintaining cryptographic rank anchor.
                  </span>
                </div>
                <button
                  onClick={() => {
                    const next = !telemetryShield;
                    setTelemetryShield(next);
                    onToast(next ? 'Telemetry shield activated' : 'Telemetry shield deactivated');
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    telemetryShield ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-white/10'
                  }`}
                  aria-label="Toggle telemetry shield"
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform absolute top-1 ${
                      telemetryShield ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* J. FUTURE HARDWARE / DEVICE EVOLUTION AREA               */}
        {/* ======================================================== */}
        {(activeSection === 'overview' || activeSection === 'ecosystem') && (
          <div
            className={`rounded-[28px] p-4.5 border transition-all duration-300 ${
              isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/35 text-cyan-400 flex items-center justify-center">
                  <Cpu size={15} />
                </div>
                <div>
                  <h3 className={`text-sm font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Hardware & Node Anchors
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Physical Devices & Ambient Hardware
                  </p>
                </div>
              </div>

              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
                0 Connected
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 mb-2">
                <Radio size={18} className="text-cyan-400" />
              </div>
              <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Hardware Device Integration Ready
              </h4>
              <p className="text-[10.5px] text-slate-400 max-w-[270px] mt-1 leading-relaxed">
                Connect decentralized physical nodes, biometric wearables, or Shadow Keys to anchor your digital persona in hardware.
              </p>
              <button
                onClick={() => onToast('Hardware device pairing will activate in upcoming release')}
                className="mt-3 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-cyan-300 font-bold border border-cyan-400/30 transition-all cursor-pointer active:scale-95"
              >
                + Pair Hardware Device
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

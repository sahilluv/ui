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
  const [activeSection, setActiveSection] = useState<'overview' | 'reputation' | 'monetization' | 'ecosystem'>('overview');
  const [monetizationOptIn, setMonetizationOptIn] = useState(true);
  const [isPublicShadow, setIsPublicShadow] = useState(true);
  const [telemetryShield, setTelemetryShield] = useState(false);

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
      {/* A. HEADER                                                */}
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
              <div
                className="w-24 h-24 rounded-full p-[3px] shadow-2xl relative flex items-center justify-center"
                style={{ background: currentUser.avatarGradient }}
              >
                <div className={`w-full h-full rounded-full p-[2.5px] ${isDark ? 'bg-[#0B0C14]' : 'bg-white'}`}>
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

        {/* Section Navigation Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 gap-1 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'overview', label: 'Evolution' },
              { id: 'reputation', label: 'Reputation' },
              { id: 'monetization', label: 'Monetization' },
              { id: 'ecosystem', label: 'Ecosystem' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 min-w-[70px] py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* C. SECTION 1: EVOLUTION & TIERS                          */}
        {/* ======================================================== */}
        {activeSection === 'overview' && (
          <div className="space-y-3">
            <div
              className={`rounded-[24px] p-4 border ${
                isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-pink-500" />
                  <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Shadow Evolution Stepper
                  </h3>
                </div>
                <span className="text-[10px] text-pink-400 font-bold">PAWN → KING</span>
              </div>

              <div className="space-y-2">
                {RANK_TIERS.map((tier) => (
                  <div
                    key={tier.rank}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      tier.isCurrent
                        ? 'bg-pink-500/10 border-pink-500/40 text-pink-300'
                        : isDark
                        ? 'bg-white/[0.02] border-white/5 text-slate-400'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base select-none">{tier.symbol}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-extrabold ${tier.isCurrent ? 'text-white' : ''}`}>
                            {tier.rank}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 font-bold uppercase">
                            {tier.level}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{tier.label}</span>
                      </div>
                    </div>
                    {tier.isCurrent ? (
                      <span className="text-[10px] font-black text-pink-400 px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/30">
                        ACTIVE
                      </span>
                    ) : (
                      <Lock size={12} className="text-slate-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* D. SECTION 2: REPUTATION                                 */}
        {/* ======================================================== */}
        {activeSection === 'reputation' && (
          <div className="space-y-3">
            <div
              className={`rounded-[24px] p-4 border ${
                isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-cyan-400" />
                <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Authority & Verification Metrics
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Peer Trust Mark</span>
                  <span className="text-lg font-black text-emerald-400">98.4%</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Decentralized Nodes</span>
                  <span className="text-lg font-black text-pink-400">12 Nodes</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Artifact Integrity</span>
                  <span className="text-lg font-black text-cyan-400">100% Cryptographic</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Network Score</span>
                  <span className="text-lg font-black text-purple-400">742 / 1000</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* E. SECTION 3: MONETIZATION                               */}
        {/* ======================================================== */}
        {activeSection === 'monetization' && (
          <div className="space-y-3">
            <div
              className={`rounded-[24px] p-4 border ${
                isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-emerald-400" />
                  <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Shadow Protocol Monetization
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setMonetizationOptIn(!monetizationOptIn);
                    onToast(monetizationOptIn ? 'Monetization paused' : 'Monetization active');
                  }}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                    monetizationOptIn
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-white/5 text-slate-400 border-white/10'
                  }`}
                >
                  {monetizationOptIn ? 'ENABLED' : 'PAUSED'}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-3">
                <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-extrabold block">
                  Est. Creator Pool Share
                </span>
                <span className="text-2xl font-black text-white">$1,480.50 USD</span>
                <span className="text-[10px] text-emerald-300 block mt-0.5">+14.2% from last cycle</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* F. SECTION 4: ECOSYSTEM & PRIVACY                        */}
        {/* ======================================================== */}
        {activeSection === 'ecosystem' && (
          <div className="space-y-3">
            <div
              className={`rounded-[24px] p-4 border ${
                isDark ? 'bg-[#151726]/90 border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Cpu size={16} className="text-purple-400" />
                <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Decentralized Node Governance
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2">
                    <Radio size={14} className="text-pink-400" />
                    <div>
                      <span className="text-xs font-bold block">Public Shadow Persona</span>
                      <span className="text-[10px] text-slate-400">Discoverable across Shadow network</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsPublicShadow(!isPublicShadow);
                      onToast(`Persona visibility: ${!isPublicShadow ? 'Public' : 'Private'}`);
                    }}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      isPublicShadow ? 'bg-pink-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isPublicShadow ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2">
                    <Sliders size={14} className="text-cyan-400" />
                    <div>
                      <span className="text-xs font-bold block">Telemetry Shield</span>
                      <span className="text-[10px] text-slate-400">Zero log peer communication</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setTelemetryShield(!telemetryShield);
                      onToast(`Telemetry shield: ${!telemetryShield ? 'Enabled' : 'Disabled'}`);
                    }}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      telemetryShield ? 'bg-cyan-500' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${telemetryShield ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Heart,
  Users,
  MoreVertical,
  Globe,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  UserCheck,
  PartyPopper,
  Share2,
  Copy,
  QrCode,
  ShieldCheck,
  Check,
  Search,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { ChessCoin, PawnRankBadge, ShadowRankType } from './PawnRankBadge';
import claireGreenAvatar from '../assets/images/claire_green_profile_1790960159362.jpg';

export interface RankUpgradeItem {
  id: string;
  creator: {
    name: string;
    username: string;
    country: string;
    flag: string;
    avatarGradient: string;
    photoUrl?: string;
  };
  fromRank: ShadowRankType;
  toRank: ShadowRankType;
  timeAgo: string;
  milestoneReason: string;
  congratulationsCount: number;
  hasCongratulated: boolean;
  isFollowing: boolean;
  isWorld: boolean;
  isFollowingFeed: boolean;
}

interface ShadowProfileViewProps {
  isDark: boolean;
  onBack?: () => void;
  onToast: (msg: string, icon?: 'sparkles' | 'bookmark') => void;
  onNavigateTab?: (tab: string) => void;
  customLikesCount?: string;
  customFollowersCount?: string;
}

export const ShadowProfileView: React.FC<ShadowProfileViewProps> = ({
  isDark,
  onBack,
  onToast,
  onNavigateTab,
  customLikesCount = '1.5m',
  customFollowersCount = '15,375',
}) => {
  // Current user / profile state (Claire Green)
  const [profileName] = useState('Claire Green');
  const [profileUsername] = useState('claire.green.official');
  const [profileLikes] = useState(customLikesCount);
  const [profileFollowers, setProfileFollowers] = useState(customFollowersCount);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [profileRank, setProfileRank] = useState<ShadowRankType>('KNIGHT');
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Active section view: 'world' (All Over The World), 'following' (People You Follow), or 'both'
  const [activeSection, setActiveSection] = useState<'world' | 'following' | 'both'>('world');

  // Interactive mock dataset for rank upgrades
  const [rankUpgrades, setRankUpgrades] = useState<RankUpgradeItem[]>([
    // WORLDWIDE RANK UPGRADES (All Over The World)
    {
      id: 'upg_tokyo',
      creator: {
        name: 'Kaito Tanaka',
        username: 'kaito.craft',
        country: 'Tokyo, Japan',
        flag: '🇯🇵',
        avatarGradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      },
      fromRank: 'PAWN',
      toRank: 'KNIGHT',
      timeAgo: 'Just now',
      milestoneReason: 'Curated 15 holographic 3D sculptures & achieved 10k peer endorsements.',
      congratulationsCount: 184,
      hasCongratulated: false,
      isFollowing: false,
      isWorld: true,
      isFollowingFeed: false,
    },
    {
      id: 'upg_berlin',
      creator: {
        name: 'Elena Rostova',
        username: 'elena.art',
        country: 'Berlin, Germany',
        flag: '🇩🇪',
        avatarGradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #FB7185 100%)',
      },
      fromRank: 'KNIGHT',
      toRank: 'BISHOP',
      timeAgo: '3m ago',
      milestoneReason: 'Unlocked Strategic Vanguard status with 100k views on Cyber Noir series.',
      congratulationsCount: 429,
      hasCongratulated: true,
      isFollowing: true,
      isWorld: true,
      isFollowingFeed: true,
    },
    {
      id: 'upg_seoul',
      creator: {
        name: 'Min-Jun Park',
        username: 'minjun.visuals',
        country: 'Seoul, South Korea',
        flag: '🇰🇷',
        avatarGradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
      },
      fromRank: 'BISHOP',
      toRank: 'ROOK',
      timeAgo: '14m ago',
      milestoneReason: 'Established the Neo-Seoul Creative Guild & earned Fortress reputation rank.',
      congratulationsCount: 612,
      hasCongratulated: false,
      isFollowing: false,
      isWorld: true,
      isFollowingFeed: false,
    },
    {
      id: 'upg_paris',
      creator: {
        name: 'Camille Laurent',
        username: 'camille.paris',
        country: 'Paris, France',
        flag: '🇫🇷',
        avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #E11D48 100%)',
      },
      fromRank: 'PAWN',
      toRank: 'KNIGHT',
      timeAgo: '32m ago',
      milestoneReason: 'Verified Genesis digital persona & reached 15,000 community interactions.',
      congratulationsCount: 295,
      hasCongratulated: false,
      isFollowing: false,
      isWorld: true,
      isFollowingFeed: false,
    },
    {
      id: 'upg_dubai',
      creator: {
        name: 'Zara Al-Mansoor',
        username: 'zara.am',
        country: 'Dubai, UAE',
        flag: '🇦🇪',
        avatarGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      },
      fromRank: 'ROOK',
      toRank: 'QUEEN',
      timeAgo: '1h ago',
      milestoneReason: 'Attained Sovereign Tier after curating the Middle East digital art biennial.',
      congratulationsCount: 1420,
      hasCongratulated: false,
      isFollowing: false,
      isWorld: true,
      isFollowingFeed: false,
    },
    {
      id: 'upg_sf',
      creator: {
        name: 'Marcus Chen',
        username: 'marcus.v',
        country: 'San Francisco, USA',
        flag: '🇺🇸',
        avatarGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
      fromRank: 'KNIGHT',
      toRank: 'BISHOP',
      timeAgo: '2h ago',
      milestoneReason: 'Deployed open-source spatial shaders with over 25,000 community bookmarks.',
      congratulationsCount: 388,
      hasCongratulated: false,
      isFollowing: false,
      isWorld: true,
      isFollowingFeed: false,
    },
    {
      id: 'upg_saopaulo',
      creator: {
        name: 'Thiago Santos',
        username: 'thiago.raw',
        country: 'São Paulo, Brazil',
        flag: '🇧🇷',
        avatarGradient: 'linear-gradient(135deg, #FB923C 0%, #EA580C 100%)',
      },
      fromRank: 'PAWN',
      toRank: 'KNIGHT',
      timeAgo: '3h ago',
      milestoneReason: 'Completed 30-day street architecture sprint with viral reel series.',
      congratulationsCount: 512,
      hasCongratulated: false,
      isFollowing: false,
      isWorld: true,
      isFollowingFeed: false,
    },

    // PEOPLE YOU FOLLOW (Following Feed)
    {
      id: 'upg_eliott',
      creator: {
        name: 'Eliott Johnson',
        username: 'eliott.j',
        country: 'Madrid, Spain',
        flag: '🇪🇸',
        avatarGradient: 'linear-gradient(135deg, #4A154B 0%, #791DA6 100%)',
      },
      fromRank: 'PAWN',
      toRank: 'KNIGHT',
      timeAgo: '6m ago',
      milestoneReason: 'Surpassed 2,400 saves on Madrid Brutalism reels & verified creator persona.',
      congratulationsCount: 318,
      hasCongratulated: true,
      isFollowing: true,
      isWorld: true,
      isFollowingFeed: true,
    },
    {
      id: 'upg_christian',
      creator: {
        name: 'Christian Lue',
        username: 'christian.lue',
        country: 'Ghent, Belgium',
        flag: '🇧🇪',
        avatarGradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
      },
      fromRank: 'KNIGHT',
      toRank: 'BISHOP',
      timeAgo: '45m ago',
      milestoneReason: 'Published Obsidian Case architecture studies; achieved Strategic Rank status.',
      congratulationsCount: 540,
      hasCongratulated: false,
      isFollowing: true,
      isWorld: true,
      isFollowingFeed: true,
    },
    {
      id: 'upg_sofia',
      creator: {
        name: 'Sofia Martinez',
        username: 'sofia.mtz',
        country: 'Reykjavik, Iceland',
        flag: '🇮🇸',
        avatarGradient: 'linear-gradient(135deg, #0F766E 0%, #2DD4BF 100%)',
      },
      fromRank: 'KNIGHT',
      toRank: 'BISHOP',
      timeAgo: '2h ago',
      milestoneReason: 'Teal Aurora series featured in Global Discovery & collected 50k applause.',
      congratulationsCount: 890,
      hasCongratulated: false,
      isFollowing: true,
      isWorld: true,
      isFollowingFeed: true,
    },
    {
      id: 'upg_marco',
      creator: {
        name: 'Marco Rossi',
        username: 'marco.visuals',
        country: 'Milan, Italy',
        flag: '🇮🇹',
        avatarGradient: 'linear-gradient(135deg, #374151 0%, #6B7280 100%)',
      },
      fromRank: 'PAWN',
      toRank: 'KNIGHT',
      timeAgo: '4h ago',
      milestoneReason: 'Completed Prismatic Void series and gained 1,900 new community peers.',
      congratulationsCount: 420,
      hasCongratulated: false,
      isFollowing: true,
      isWorld: true,
      isFollowingFeed: true,
    },
  ]);

  const handleToggleCongratulate = (id: string) => {
    setRankUpgrades((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = !item.hasCongratulated;
          return {
            ...item,
            hasCongratulated: newStatus,
            congratulationsCount: newStatus
              ? item.congratulationsCount + 1
              : item.congratulationsCount - 1,
          };
        }
        return item;
      })
    );
    const item = rankUpgrades.find((u) => u.id === id);
    if (item && !item.hasCongratulated) {
      onToast(`Celebrated ${item.creator.name}'s promotion to ${item.toRank}! 🎉`, 'sparkles');
    }
  };

  const handleToggleFollow = (id: string) => {
    setRankUpgrades((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = !item.isFollowing;
          return {
            ...item,
            isFollowing: newStatus,
            isFollowingFeed: newStatus || item.isFollowingFeed,
          };
        }
        return item;
      })
    );
    const item = rankUpgrades.find((u) => u.id === id);
    if (item) {
      onToast(
        item.isFollowing ? `Unfollowed @${item.creator.username}` : `Following @${item.creator.username} ✨`,
        'sparkles'
      );
    }
  };

  const handleElevateSelfRank = () => {
    const nextRank = profileRank === 'PAWN' ? 'KNIGHT' : profileRank === 'KNIGHT' ? 'BISHOP' : 'PAWN';
    setProfileRank(nextRank);

    // Prepend a live upgrade entry for Claire Green to both feeds
    const selfUpgrade: RankUpgradeItem = {
      id: `self_upg_${Date.now()}`,
      creator: {
        name: profileName,
        username: profileUsername,
        country: 'Global Citizen',
        flag: '✨',
        avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
        photoUrl: claireGreenAvatar,
      },
      fromRank: profileRank,
      toRank: nextRank,
      timeAgo: 'Just now',
      milestoneReason: `Elevated to ${nextRank} Rank with 1.5m community likes and Genesis verification.`,
      congratulationsCount: 1,
      hasCongratulated: true,
      isFollowing: true,
      isWorld: true,
      isFollowingFeed: true,
    };

    setRankUpgrades((prev) => [selfUpgrade, ...prev]);
    onToast(`✦ You elevated your Shadow Rank to ${nextRank}!`, 'sparkles');
  };

  // Filter lists based on selected tab and search query
  const normalizedSearch = searchFilter.trim().toLowerCase();
  const worldList = rankUpgrades.filter(
    (u) =>
      u.isWorld &&
      (u.creator.name.toLowerCase().includes(normalizedSearch) ||
        u.creator.username.toLowerCase().includes(normalizedSearch) ||
        u.creator.country.toLowerCase().includes(normalizedSearch) ||
        u.toRank.toLowerCase().includes(normalizedSearch))
  );

  const followingList = rankUpgrades.filter(
    (u) =>
      u.isFollowingFeed &&
      (u.creator.name.toLowerCase().includes(normalizedSearch) ||
        u.creator.username.toLowerCase().includes(normalizedSearch) ||
        u.creator.country.toLowerCase().includes(normalizedSearch) ||
        u.toRank.toLowerCase().includes(normalizedSearch))
  );

  const renderUpgradeCard = (item: RankUpgradeItem) => {
    const isKnight = item.toRank === 'KNIGHT';
    const isBishop = item.toRank === 'BISHOP';
    const isRook = item.toRank === 'ROOK';
    const isQueen = item.toRank === 'QUEEN';

    const rankGradient = isQueen
      ? 'from-amber-400 via-pink-500 to-purple-600'
      : isRook
      ? 'from-indigo-400 via-purple-500 to-pink-500'
      : isBishop
      ? 'from-violet-400 to-fuchsia-500'
      : isKnight
      ? 'from-pink-500 to-purple-600'
      : 'from-slate-400 to-slate-600';

    return (
      <div
        key={item.id}
        className={`rounded-[24px] p-4 transition-all duration-300 border ${
          isDark
            ? 'bg-[#151726]/90 border-white/10 hover:border-pink-500/30 hover:bg-[#181B2E]'
            : 'bg-white border-slate-200/80 shadow-md shadow-slate-100 hover:border-pink-300'
        }`}
      >
        {/* Creator Info Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Squircle Avatar with Flag overlay */}
            <div className="relative shrink-0">
              <div
                className="w-11 h-11 rounded-[14px] p-[2px] shadow-sm flex items-center justify-center overflow-hidden"
                style={{ background: item.creator.avatarGradient }}
              >
                {item.creator.photoUrl ? (
                  <img
                    src={item.creator.photoUrl}
                    alt={item.creator.name}
                    className="w-full h-full rounded-[12px] object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full rounded-[12px] flex items-center justify-center font-extrabold text-xs text-white ${
                      isDark ? 'bg-[#0B0C14]' : 'bg-slate-900'
                    }`}
                  >
                    {item.creator.name[0]}
                  </div>
                )}
              </div>
              <span
                className="absolute -bottom-1 -right-1 text-xs select-none shadow-xs"
                title={item.creator.country}
              >
                {item.creator.flag}
              </span>
            </div>

            {/* Name, Handle & Location */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className={`text-xs font-black truncate ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {item.creator.name}
                </span>
                <ChessCoin rank={item.toRank} size={14} />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <span>@{item.creator.username}</span>
                <span>·</span>
                <span className="truncate max-w-[120px]">{item.creator.country}</span>
              </div>
            </div>
          </div>

          {/* Time Ago & Follow Button */}
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="text-[10px] text-slate-400 font-mono">{item.timeAgo}</span>
            <button
              onClick={() => handleToggleFollow(item.id)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all active:scale-90 cursor-pointer ${
                item.isFollowing
                  ? 'border border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs'
              }`}
            >
              {item.isFollowing ? 'Following' : '+ Follow'}
            </button>
          </div>
        </div>

        {/* The Rank Upgrade Transition Visual Banner */}
        <div
          className={`rounded-[18px] p-3 mb-3 border relative overflow-hidden flex items-center justify-between ${
            isDark
              ? 'bg-black/40 border-white/5'
              : 'bg-slate-50 border-slate-200/60'
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 75% 50%, #FF0A78 0%, #991BEA 60%, transparent 100%)`,
            }}
          />

          {/* Previous Rank */}
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-8 h-8 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center">
              <ChessCoin rank={item.fromRank} size={16} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                From
              </span>
              <span className="text-[11px] font-extrabold text-slate-400">
                {item.fromRank}
              </span>
            </div>
          </div>

          {/* Upgrade Arrow with animated shimmer */}
          <div className="flex flex-col items-center justify-center px-2 relative z-10">
            <div className="flex items-center gap-1 text-pink-500 font-bold text-[9px] uppercase tracking-wider mb-0.5 animate-pulse">
              <span>Upgraded</span>
            </div>
            <div className="w-12 h-6 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-sm">
              <ArrowRight size={14} className="stroke-[2.5]" />
            </div>
          </div>

          {/* New Upgraded Rank (Highlighted) */}
          <div className="flex items-center gap-2 relative z-10 text-right">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-pink-400 font-black block">
                Elevated To
              </span>
              <span
                className={`text-[12px] font-black bg-gradient-to-r ${rankGradient} bg-clip-text text-transparent`}
              >
                {item.toRank}
              </span>
            </div>
            <div className="w-9 h-9 rounded-[11px] bg-gradient-to-tr from-pink-500/20 to-purple-500/30 border border-pink-400/50 flex items-center justify-center shadow-md shadow-pink-500/20">
              <ChessCoin rank={item.toRank} size={18} />
            </div>
          </div>
        </div>

        {/* Milestone Reason / Achievement */}
        <p
          className={`text-[11px] leading-relaxed mb-3 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {item.milestoneReason}
        </p>

        {/* Actions Row: Congratulate Button */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <button
            onClick={() => handleToggleCongratulate(item.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer ${
              item.hasCongratulated
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30'
                : isDark
                ? 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-black/5'
            }`}
          >
            <PartyPopper size={13} className={item.hasCongratulated ? 'text-yellow-300' : 'text-pink-500'} />
            <span>
              {item.hasCongratulated ? 'Congratulated!' : 'Congratulate'} ({item.congratulationsCount})
            </span>
          </button>

          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Sparkles size={11} className="text-pink-400" />
            <span>Rank Verified</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-32">
      {/* ======================================================== */}
      {/* 1. TOP HEADER: Cursive "Shadow" script (Mirroring image) */}
      {/* ======================================================== */}
      <header
        className={`sticky top-0 z-30 px-5 pt-3 pb-2 flex items-center justify-between backdrop-blur-xl transition-colors ${
          isDark
            ? 'bg-[#0B0C14]/90 border-b border-white/10 text-white'
            : 'bg-white/90 border-b border-black/5 text-[#12131D]'
        }`}
      >
        <div className="w-8">
          {onBack && (
            <button
              onClick={onBack}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-slate-800'
              }`}
              title="Return"
              aria-label="Back"
            >
              <ChevronLeft size={22} />
            </button>
          )}
        </div>

        {/* Centered Cursive Script Logo: Exactly like the reference image's Instagram script */}
        <div className="flex items-center justify-center flex-1">
          <h1 className="text-3xl font-shadow-script tracking-wide text-[#E1306C] drop-shadow-xs select-none">
            Shadow
          </h1>
        </div>

        {/* 3-dots more menu icon on top right */}
        <div className="w-8 flex justify-end relative">
          <button
            onClick={() => setShowOptionsMenu(!showOptionsMenu)}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-black/5 text-slate-700'
            }`}
            title="Options"
            aria-label="Options"
          >
            <MoreVertical size={20} />
          </button>

          {/* Options Dropdown Menu */}
          {showOptionsMenu && (
            <div
              className={`absolute top-9 right-0 z-50 w-48 rounded-2xl p-1.5 shadow-2xl border animate-in fade-in zoom-in-95 duration-150 ${
                isDark
                  ? 'bg-[#151726] border-white/15 text-white'
                  : 'bg-white border-black/10 text-slate-900'
              }`}
            >
              <button
                onClick={() => {
                  setShowOptionsMenu(false);
                  onToast('Profile URL copied to clipboard!', 'bookmark');
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                }`}
              >
                <Copy size={14} className="text-pink-500" />
                <span>Copy Profile Link</span>
              </button>
              <button
                onClick={() => {
                  setShowOptionsMenu(false);
                  onToast('QR Identity Code generated', 'sparkles');
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                }`}
              >
                <QrCode size={14} className="text-purple-500" />
                <span>QR Identity Card</span>
              </button>
              <button
                onClick={() => {
                  setShowOptionsMenu(false);
                  handleElevateSelfRank();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                }`}
              >
                <Sparkles size={14} className="text-cyan-400" />
                <span>Elevate My Rank</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. PROFILE HEADER (Layout exactly matching user's image)  */}
      {/* ======================================================== */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-4">
          {/* Avatar on Left: Claire Green portrait with stylish squircle ring */}
          <div className="relative shrink-0">
            <div
              className="w-20 h-20 rounded-full p-[2.5px] shadow-xl flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 60%, #6366F1 100%)',
              }}
            >
              <div
                className={`w-full h-full rounded-full p-[2px] ${
                  isDark ? 'bg-[#0B0C14]' : 'bg-white'
                }`}
              >
                <img
                  src={claireGreenAvatar}
                  alt={profileName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Rank Insignia Coin floating on avatar corner */}
            <div
              onClick={handleElevateSelfRank}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-transform"
              title="Click to elevate rank"
            >
              <ChessCoin rank={profileRank} size={15} />
            </div>
          </div>

          {/* Right Info: Name, Username, Likes & Followers */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className={`text-base font-extrabold tracking-tight truncate ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {profileName}
                </h2>
                <span className="text-xs text-slate-400 font-medium block truncate">
                  @{profileUsername}
                </span>
              </div>
            </div>

            {/* Stats row with icons matching screenshot */}
            <div className="flex items-center gap-4 mt-2">
              {/* 1.5m likes */}
              <div className="flex items-center gap-1.5">
                <Heart size={15} className="fill-[#FF0A78] text-[#FF0A78] shrink-0" />
                <span
                  className={`text-xs font-bold ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {profileLikes} likes
                </span>
              </div>

              {/* 15,375 followers */}
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#FF0A78] flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF0A78]" />
                </div>
                <span
                  className={`text-xs font-bold ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {profileFollowers} followers
                </span>
              </div>
            </div>

            {/* Action Buttons: Follow / Elevate */}
            <div className="flex items-center gap-2 mt-2.5">
              <button
                onClick={() => {
                  const newFollow = !isFollowingProfile;
                  setIsFollowingProfile(newFollow);
                  setProfileFollowers(newFollow ? '15,376' : '15,375');
                  onToast(newFollow ? 'Followed @claire.green.official' : 'Unfollowed @claire.green.official');
                }}
                className={`flex-1 py-1 px-3 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                  isFollowingProfile
                    ? 'border border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                }`}
              >
                {isFollowingProfile ? 'Following' : 'Follow'}
              </button>

              <button
                onClick={handleElevateSelfRank}
                className="py-1 px-2.5 rounded-full text-[11px] font-bold border border-pink-500/30 text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 transition-all flex items-center gap-1 cursor-pointer"
                title="Elevate Rank"
              >
                <Sparkles size={11} className="text-cyan-400 animate-pulse" />
                <span>{profileRank}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. SECTION SELECTOR:                                     */}
      {/* Section 1: "All Over The World"                          */}
      {/* Section 2: "People You Follow"                           */}
      {/* (NO image section included!)                             */}
      {/* ======================================================== */}
      <div className="px-5 pt-3 pb-2">
        <div
          className={`flex items-center p-1 rounded-2xl border transition-all ${
            isDark ? 'bg-[#151726] border-white/10' : 'bg-slate-100 border-black/5'
          }`}
        >
          {/* Tab 1: All Over The World */}
          <button
            onClick={() => setActiveSection('world')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSection === 'world'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe size={13} />
            <span>Worldwide</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeSection === 'world' ? 'bg-white/25 text-white' : 'bg-white/10 text-slate-400'
              }`}
            >
              {worldList.length}
            </span>
          </button>

          {/* Tab 2: People You Follow */}
          <button
            onClick={() => setActiveSection('following')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSection === 'following'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users size={13} />
            <span>Following</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeSection === 'following' ? 'bg-white/25 text-white' : 'bg-white/10 text-slate-400'
              }`}
            >
              {followingList.length}
            </span>
          </button>

          {/* Tab 3: Both Sections */}
          <button
            onClick={() => setActiveSection('both')}
            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'both'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="View both sections together"
          >
            All
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="px-5 mb-2">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
            isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-black/5 text-slate-800'
          }`}
        >
          <Search size={13} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter rank upgrades by name, rank, or country..."
            className="w-full bg-transparent text-xs focus:outline-none placeholder-slate-400"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. FEED CONTENT AREA                                     */}
      {/* ======================================================== */}
      <div className="px-5 space-y-4 pt-1">
        {/* VIEW A: Worldwide Upgrades Section */}
        {(activeSection === 'world' || activeSection === 'both') && (
          <div>
            <div className="flex items-center justify-between mb-2.5 px-1">
              <div className="flex items-center gap-2">
                <Globe size={15} className="text-pink-500" />
                <h3
                  className={`text-xs font-extrabold uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  People Upgrading Ranks All Over The World
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {worldList.length} upgrades
              </span>
            </div>

            {worldList.length === 0 ? (
              <div
                className={`p-6 rounded-[22px] text-center border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-black/5'
                }`}
              >
                <p className="text-xs text-slate-400">No worldwide rank upgrades found matching "{searchFilter}".</p>
              </div>
            ) : (
              <div className="space-y-3">
                {worldList.map((item) => renderUpgradeCard(item))}
              </div>
            )}
          </div>
        )}

        {/* VIEW B: Following Upgrades Section */}
        {(activeSection === 'following' || activeSection === 'both') && (
          <div className={activeSection === 'both' ? 'pt-4 border-t border-white/10' : ''}>
            <div className="flex items-center justify-between mb-2.5 px-1">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-purple-500" />
                <h3
                  className={`text-xs font-extrabold uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Rank Upgrades From People You Follow
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {followingList.length} following
              </span>
            </div>

            {followingList.length === 0 ? (
              <div
                className={`p-6 rounded-[22px] text-center border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-black/5'
                }`}
              >
                <p className="text-xs text-slate-400">No upgrades from people you follow yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {followingList.map((item) => renderUpgradeCard(item))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

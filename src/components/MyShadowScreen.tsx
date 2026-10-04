import React, { useState, useMemo, useEffect } from 'react';
import {
  ChevronLeft,
  Copy,
  ShieldCheck,
  ShieldAlert,
  Flame,
  Heart,
  Globe,
  Users,
  Trophy,
  ArrowRight,
  TrendingUp,
  Share2,
  CheckCircle2,
  Lock,
  Search,
  RefreshCw,
  Crown,
  MoreVertical,
  SlidersHorizontal,
} from 'lucide-react';
import { PawnRankBadge, ShadowRankType } from './PawnRankBadge';

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

export interface WorldRankedUser {
  rankPosition: number;
  id: string;
  name: string;
  username: string;
  shadowId: string;
  location: string;
  flag: string;
  avatarBg: string;
  avatarSymbol: string;
  isVerified: boolean;
  shadowRank: ShadowRankType;
  shadowStatus: string;
  tierLevel: string;
  reputation: number;
  streakDays: number;
  nodesActive: number;
  likesCount: number;
  cheerCount: number;
  hasCheered: boolean;
  isFollowing: boolean;
  statusQuote: string;
}

export interface RankUpgradePerson {
  id: string;
  name: string;
  username: string;
  location: string;
  flag: string;
  avatarBg: string;
  avatarSymbol: string;
  isVerified: boolean;
  fromRank: ShadowRankType;
  toRank: ShadowRankType;
  fromTier: string;
  toTier: string;
  streakDays: number;
  repGained: number;
  congratsCount: number;
  hasCongratulated: boolean;
  isFollowing: boolean;
  timeAgo: string;
  achievementSummary: string;
}

// Clean, realistic World Rankings dataset with clean, non-neon styling
const INITIAL_WORLD_RANKINGS: WorldRankedUser[] = [
  {
    rankPosition: 1,
    id: 'wr_1',
    name: 'David Chen',
    username: 'dchen.ai',
    shadowId: 'shdw_dchen01',
    location: 'Singapore',
    flag: '🇸🇬',
    avatarBg: '#D97706',
    avatarSymbol: '♔',
    isVerified: true,
    shadowRank: 'KING',
    shadowStatus: 'Apex Status',
    tierLevel: 'Rank VI',
    reputation: 34500,
    streakDays: 280,
    nodesActive: 128,
    likesCount: 14200,
    cheerCount: 1250,
    hasCheered: false,
    isFollowing: false,
    statusQuote: 'Apex King of the genesis mesh. Orchestrating cross-continental consensus channels.',
  },
  {
    rankPosition: 2,
    id: 'wr_2',
    name: 'Sofia Lindqvist',
    username: 'sofia.design',
    shadowId: 'shdw_slind92',
    location: 'Stockholm, Sweden',
    flag: '🇸🇪',
    avatarBg: '#E1306C',
    avatarSymbol: '♕',
    isVerified: true,
    shadowRank: 'QUEEN',
    shadowStatus: 'Sovereign Status',
    tierLevel: 'Rank V',
    reputation: 27800,
    streakDays: 194,
    nodesActive: 96,
    likesCount: 11400,
    cheerCount: 890,
    hasCheered: true,
    isFollowing: false,
    statusQuote: 'Leading regional decentralization and high-dimensional interface synthesis.',
  },
  {
    rankPosition: 3,
    id: 'wr_3',
    name: 'Jin-Woo Park',
    username: 'jinwoo.core',
    shadowId: 'shdw_jpark88',
    location: 'Seoul, South Korea',
    flag: '🇰🇷',
    avatarBg: '#6366F1',
    avatarSymbol: '♕',
    isVerified: true,
    shadowRank: 'QUEEN',
    shadowStatus: 'Sovereign Status',
    tierLevel: 'Rank V',
    reputation: 25400,
    streakDays: 165,
    nodesActive: 84,
    likesCount: 9800,
    cheerCount: 740,
    hasCheered: false,
    isFollowing: false,
    statusQuote: 'Orchestrating high-throughput data sharding pipelines across 100 shadow nodes.',
  },
  {
    rankPosition: 4,
    id: 'wr_4',
    name: 'Marcus Vance',
    username: 'marcus.vance',
    shadowId: 'shdw_mvance44',
    location: 'San Francisco, USA',
    flag: '🇺🇸',
    avatarBg: '#0284C7',
    avatarSymbol: '♖',
    isVerified: true,
    shadowRank: 'ROOK',
    shadowStatus: 'Fortress Status',
    tierLevel: 'Rank IV',
    reputation: 19200,
    streakDays: 112,
    nodesActive: 64,
    likesCount: 7600,
    cheerCount: 520,
    hasCheered: false,
    isFollowing: false,
    statusQuote: 'Established Fortress Node authority. Processed over 500,000 protocol attestations.',
  },
  {
    rankPosition: 5,
    id: 'wr_5',
    name: 'Zara Al-Mansoor',
    username: 'zara.am',
    shadowId: 'shdw_zalm33',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    avatarBg: '#0D9488',
    avatarSymbol: '♖',
    isVerified: true,
    shadowRank: 'ROOK',
    shadowStatus: 'Fortress Status',
    tierLevel: 'Rank IV',
    reputation: 18100,
    streakDays: 98,
    nodesActive: 58,
    likesCount: 6900,
    cheerCount: 460,
    hasCheered: true,
    isFollowing: true,
    statusQuote: 'Deployed multi-region consensus relayer and unlocked prime Fortress status.',
  },
  {
    rankPosition: 6,
    id: 'wr_6',
    name: 'Kenji Sato',
    username: 'kenji.sato',
    shadowId: 'shdw_ksato77',
    location: 'Kyoto, Japan',
    flag: '🇯🇵',
    avatarBg: '#7C3AED',
    avatarSymbol: '♗',
    isVerified: true,
    shadowRank: 'BISHOP',
    shadowStatus: 'Strategic Status',
    tierLevel: 'Rank III',
    reputation: 14300,
    streakDays: 76,
    nodesActive: 42,
    likesCount: 5200,
    cheerCount: 380,
    hasCheered: true,
    isFollowing: true,
    statusQuote: 'Authored 14 protocol governance standards and strategic zero-knowledge relays.',
  },
  {
    rankPosition: 7,
    id: 'wr_7',
    name: 'Liam O’Connor',
    username: 'liam.eth',
    shadowId: 'shdw_locon12',
    location: 'Dublin, Ireland',
    flag: '🇮🇪',
    avatarBg: '#2563EB',
    avatarSymbol: '♗',
    isVerified: true,
    shadowRank: 'BISHOP',
    shadowStatus: 'Strategic Status',
    tierLevel: 'Rank III',
    reputation: 13800,
    streakDays: 68,
    nodesActive: 38,
    likesCount: 4800,
    cheerCount: 310,
    hasCheered: false,
    isFollowing: false,
    statusQuote: 'Published open source reputation auditor smart contract for the shadow mesh.',
  },
  {
    rankPosition: 8,
    id: 'wr_8',
    name: 'Mateo Fernandez',
    username: 'mateo.f',
    shadowId: 'shdw_mfern55',
    location: 'Barcelona, Spain',
    flag: '🇪🇸',
    avatarBg: '#EA580C',
    avatarSymbol: '♗',
    isVerified: true,
    shadowRank: 'BISHOP',
    shadowStatus: 'Strategic Status',
    tierLevel: 'Rank III',
    reputation: 12900,
    streakDays: 55,
    nodesActive: 35,
    likesCount: 4400,
    cheerCount: 290,
    hasCheered: false,
    isFollowing: false,
    statusQuote: 'European node validator group leader with over 5,000 peer affirmations.',
  },
  {
    rankPosition: 9,
    id: 'wr_9',
    name: 'Elena Rostova',
    username: 'elena.rostova',
    shadowId: 'shdw_erost81',
    location: 'Tokyo, Japan',
    flag: '🇯🇵',
    avatarBg: '#E1306C',
    avatarSymbol: '♘',
    isVerified: true,
    shadowRank: 'KNIGHT',
    shadowStatus: 'Vanguard Status',
    tierLevel: 'Rank II',
    reputation: 9400,
    streakDays: 48,
    nodesActive: 24,
    likesCount: 3600,
    cheerCount: 240,
    hasCheered: true,
    isFollowing: true,
    statusQuote: 'Vanguard node operator with 48 days of flawless telemetry sync.',
  },
  {
    rankPosition: 10,
    id: 'wr_10',
    name: 'Chloe Dubois',
    username: 'chloe.shadow',
    shadowId: 'shdw_cdub67',
    location: 'Paris, France',
    flag: '🇫🇷',
    avatarBg: '#DC2626',
    avatarSymbol: '♘',
    isVerified: true,
    shadowRank: 'KNIGHT',
    shadowStatus: 'Vanguard Status',
    tierLevel: 'Rank II',
    reputation: 8900,
    streakDays: 42,
    nodesActive: 22,
    likesCount: 3200,
    cheerCount: 215,
    hasCheered: true,
    isFollowing: true,
    statusQuote: 'Certified Vanguard node operator with zero dispute history.',
  },
];

const INITIAL_UPGRADES: RankUpgradePerson[] = [
  {
    id: 'upg_1',
    name: 'Elena Rostova',
    username: 'elena.rostova',
    location: 'Tokyo, Japan',
    flag: '🇯🇵',
    avatarBg: '#E1306C',
    avatarSymbol: '♘',
    isVerified: true,
    fromRank: 'PAWN',
    toRank: 'KNIGHT',
    fromTier: 'Rank I',
    toTier: 'Rank II',
    streakDays: 48,
    repGained: 450,
    congratsCount: 142,
    hasCongratulated: false,
    isFollowing: true,
    timeAgo: '2m ago',
    achievementSummary: 'Completed Vanguard Trial and 40 consecutive days of cryptographic verification.',
  },
  {
    id: 'upg_2',
    name: 'Kenji Sato',
    username: 'kenji.sato',
    location: 'Kyoto, Japan',
    flag: '🇯🇵',
    avatarBg: '#7C3AED',
    avatarSymbol: '♗',
    isVerified: true,
    fromRank: 'KNIGHT',
    toRank: 'BISHOP',
    fromTier: 'Rank II',
    toTier: 'Rank III',
    streakDays: 76,
    repGained: 850,
    congratsCount: 231,
    hasCongratulated: true,
    isFollowing: true,
    timeAgo: '14m ago',
    achievementSummary: 'Authored 12 protocol governance proposals and reached strategic threshold.',
  },
  {
    id: 'upg_3',
    name: 'Marcus Vance',
    username: 'marcus.vance',
    location: 'San Francisco, USA',
    flag: '🇺🇸',
    avatarBg: '#0284C7',
    avatarSymbol: '♖',
    isVerified: true,
    fromRank: 'BISHOP',
    toRank: 'ROOK',
    fromTier: 'Rank III',
    toTier: 'Rank IV',
    streakDays: 112,
    repGained: 1500,
    congratsCount: 389,
    hasCongratulated: false,
    isFollowing: false,
    timeAgo: '35m ago',
    achievementSummary: 'Established Fortress Node authority and processed over 50,000 protocol blocks.',
  },
  {
    id: 'upg_4',
    name: 'Amara Okafor',
    username: 'amara.okafor',
    location: 'Lagos, Nigeria',
    flag: '🇳🇬',
    avatarBg: '#059669',
    avatarSymbol: '♘',
    isVerified: true,
    fromRank: 'PAWN',
    toRank: 'KNIGHT',
    fromTier: 'Rank I',
    toTier: 'Rank II',
    streakDays: 35,
    repGained: 450,
    congratsCount: 89,
    hasCongratulated: false,
    isFollowing: true,
    timeAgo: '1h ago',
    achievementSummary: 'Mastered peer validation protocol and earned community endorsement.',
  },
  {
    id: 'upg_5',
    name: 'Sofia Lindqvist',
    username: 'sofia.design',
    location: 'Stockholm, Sweden',
    flag: '🇸🇪',
    avatarBg: '#E1306C',
    avatarSymbol: '♕',
    isVerified: true,
    fromRank: 'ROOK',
    toRank: 'QUEEN',
    fromTier: 'Rank IV',
    toTier: 'Rank V',
    streakDays: 194,
    repGained: 3200,
    congratsCount: 612,
    hasCongratulated: false,
    isFollowing: false,
    timeAgo: '2h ago',
    achievementSummary: 'Ascended to Sovereign status after leading regional decentralization initiative.',
  },
];

export const MyShadowScreen: React.FC<MyShadowScreenProps> = ({
  onBack,
  isDark,
  currentUser = {
    name: 'Mauricio Lopez',
    username: 'maoo.lopez',
    shadowId: 'shdw_mlopez89',
    rank: 'PAWN',
    isVerified: true,
    avatarGradient: 'linear-gradient(135deg, #E1306C 0%, #C13584 100%)',
  },
  onToast,
}) => {
  // Navigation Tabs: 'rankings' (World Rankings) | 'world' (World Upgrades) | 'following' | 'all'
  const [activeMainTab, setActiveMainTab] = useState<'rankings' | 'world' | 'following' | 'all'>('rankings');

  // World Rankings state
  const [worldRankings, setWorldRankings] = useState<WorldRankedUser[]>(INITIAL_WORLD_RANKINGS);
  const [isFetchingRankings, setIsFetchingRankings] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');

  // Live Upgrades state
  const [upgrades, setUpgrades] = useState<RankUpgradePerson[]>(INITIAL_UPGRADES);

  // Local simulated rank for Mauricio
  const [localRank, setLocalRank] = useState<ShadowRankType>(currentUser.rank || 'PAWN');
  const [isPromoting, setIsPromoting] = useState(false);
  const [showEvolutionModal, setShowEvolutionModal] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('ALL');

  // Fetch function for World Rankings
  const fetchWorldRankings = (silent: boolean = false) => {
    setIsFetchingRankings(true);
    setTimeout(() => {
      setWorldRankings((prev) =>
        prev.map((user) => ({
          ...user,
          reputation: user.reputation + Math.floor(Math.random() * 15),
        }))
      );
      setIsFetchingRankings(false);
      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      if (!silent) {
        onToast('World Rankings synchronized', 'sparkles');
      }
    }, 450);
  };

  useEffect(() => {
    fetchWorldRankings(true);
  }, []);

  const handleCopyId = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(currentUser.shadowId);
      }
    } catch {}
    onToast(`Shadow ID copied: ${currentUser.shadowId}`, 'sparkles');
  };

  const handleTogglePromote = () => {
    setIsPromoting(true);
    const nextRank: ShadowRankType = localRank === 'PAWN' ? 'KNIGHT' : 'PAWN';
    setTimeout(() => {
      setLocalRank(nextRank);
      setIsPromoting(false);
      onToast(
        nextRank === 'KNIGHT' ? 'Promoted to KNIGHT (Vanguard Status)' : 'Reverted to PAWN (Foundation Status)',
        'sparkles'
      );
    }, 350);
  };

  const handleToggleCheerRanking = (id: string) => {
    setWorldRankings((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          const nextState = !user.hasCheered;
          const nextCount = nextState ? user.cheerCount + 1 : user.cheerCount - 1;
          if (nextState) {
            onToast(`Cheered for #${user.rankPosition} @${user.username}`, 'sparkles');
          }
          return {
            ...user,
            hasCheered: nextState,
            cheerCount: nextCount,
          };
        }
        return user;
      })
    );
  };

  const handleToggleFollowRanking = (id: string) => {
    setWorldRankings((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          const nextFollowing = !user.isFollowing;
          onToast(nextFollowing ? `Following @${user.username}` : `Unfollowed @${user.username}`);
          return {
            ...user,
            isFollowing: nextFollowing,
          };
        }
        return user;
      })
    );
  };

  const handleToggleCongratulate = (id: string) => {
    setUpgrades((prev) =>
      prev.map((person) => {
        if (person.id === id) {
          const nextState = !person.hasCongratulated;
          const nextCount = nextState ? person.congratsCount + 1 : person.congratsCount - 1;
          if (nextState) {
            onToast(`Congratulated @${person.username} on upgrading to ${person.toRank}`, 'sparkles');
          }
          return {
            ...person,
            hasCongratulated: nextState,
            congratsCount: nextCount,
          };
        }
        return person;
      })
    );
  };

  const handleToggleFollowUpgrade = (id: string) => {
    setUpgrades((prev) =>
      prev.map((person) => {
        if (person.id === id) {
          const nextFollowing = !person.isFollowing;
          onToast(nextFollowing ? `Following @${person.username}` : `Unfollowed @${person.username}`);
          return {
            ...person,
            isFollowing: nextFollowing,
          };
        }
        return person;
      })
    );
  };

  // Filtered lists
  const displayRankings = useMemo(() => {
    return worldRankings.filter((user) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          user.name.toLowerCase().includes(q) ||
          user.username.toLowerCase().includes(q) ||
          user.location.toLowerCase().includes(q) ||
          user.shadowRank.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (filterTier !== 'ALL' && user.shadowRank !== filterTier) return false;
      return true;
    });
  }, [worldRankings, searchQuery, filterTier]);

  const displayUpgrades = useMemo(() => {
    return upgrades.filter((person) => {
      if (activeMainTab === 'following' && !person.isFollowing) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          person.name.toLowerCase().includes(q) ||
          person.username.toLowerCase().includes(q) ||
          person.location.toLowerCase().includes(q) ||
          person.toRank.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (filterTier !== 'ALL' && person.toRank !== filterTier) return false;
      return true;
    });
  }, [upgrades, activeMainTab, searchQuery, filterTier]);

  return (
    <div
      className={`flex flex-col h-full overflow-y-auto no-scrollbar pb-32 transition-colors ${
        isDark ? 'bg-[#121316] text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      {/* ======================================================== */}
      {/* A. HEADER (MATCHING THE REFERENCE IMAGE EXACT WORDMARK)  */}
      {/* Clean white background, Rose Pink script wordmark       */}
      {/* ======================================================== */}
      <header
        className={`sticky top-0 z-30 h-14 px-4 flex items-center justify-between shrink-0 border-b transition-colors ${
          isDark
            ? 'bg-[#121316]/95 border-gray-800 text-white'
            : 'bg-white/95 border-gray-100 text-gray-900'
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer active:scale-95 ${
              isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
            title="Return to Home Feed"
            aria-label="Back to Home Feed"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        {/* Center cursive script brand wordmark matching the reference image */}
        <div className="flex items-center justify-center">
          <h1
            className="text-2xl font-bold tracking-tight select-none cursor-pointer"
            style={{
              fontFamily: "'Dancing Script', 'Satisfy', cursive",
              color: '#E1306C',
            }}
          >
            Shadow
          </h1>
        </div>

        {/* Right Action: Clean Copy ID & Refresh */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchWorldRankings(false)}
            disabled={isFetchingRankings}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer active:scale-95 ${
              isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Refresh Rankings"
          >
            <RefreshCw size={15} className={isFetchingRankings ? 'animate-spin text-[#E1306C]' : ''} />
          </button>
          <button
            onClick={() => onToast('More options', 'bookmark')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer active:scale-95 ${
              isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Options"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* B. PROFILE SECTION (LAYOUT MATCHING REFERENCE IMAGE)     */}
      {/* Circular Avatar on Left | Name, Handle, Stats on Right  */}
      {/* ======================================================== */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start gap-4">
          {/* Circular Avatar on the left matching Claire Green in the reference image */}
          <div className="relative shrink-0">
            <div
              className={`w-20 h-20 rounded-full p-[2.5px] transition-transform hover:scale-102 flex items-center justify-center ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}
              style={{
                boxShadow: isDark
                  ? '0 4px 14px rgba(0,0,0,0.5)'
                  : '0 4px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div
                className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden border ${
                  isDark ? 'bg-[#1E2028] border-gray-700' : 'bg-[#FAFAFA] border-gray-200'
                }`}
              >
                {/* Chess piece glyph */}
                <span
                  className="text-3xl select-none"
                  style={{ color: isDark ? '#F3F4F6' : '#1F2937' }}
                >
                  {localRank === 'KNIGHT' ? '♘' : '♙'}
                </span>
              </div>
            </div>

            {/* Small Verified Badge */}
            <div
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-emerald-600 shadow-xs"
              title="Verified Shadow Identity"
            >
              <ShieldCheck size={13} className="text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
            </div>
          </div>

          {/* Right Column: Name, Handle, Stats & Shadow ID */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center justify-between">
              <h2
                className={`text-lg font-bold tracking-tight truncate ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {currentUser.name}
              </h2>
            </div>

            <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
              @{currentUser.username}
            </p>

            {/* Stats row stacked cleanly as in reference image: Likes & Streaks */}
            <div className="flex items-center gap-4 mt-2.5">
              {/* Likes with clean red heart */}
              <div className="flex items-center gap-1.5">
                <Heart size={14} className="fill-[#E1306C] text-[#E1306C]" />
                <span className={`text-xs font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  1.2k likes
                </span>
              </div>

              {/* Streaks count replacing followers as instructed */}
              <div className="flex items-center gap-1.5">
                <Flame size={14} className="fill-amber-500 text-amber-500" />
                <span className={`text-xs font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  48 streaks
                </span>
              </div>

              {/* Post count */}
              <div className="text-xs text-gray-500 font-medium">
                735 posts
              </div>
            </div>

            {/* Shadow ID Capsule with copy button */}
            <div className="flex items-center gap-2 mt-2.5">
              <button
                onClick={handleCopyId}
                className={`inline-flex items-center gap-1.5 font-mono text-[10.5px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer active:scale-95 ${
                  isDark
                    ? 'bg-gray-800/80 hover:bg-gray-800 text-gray-300 border-gray-700'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
                title="Click to copy Shadow ID"
              >
                <span className="font-bold text-[#E1306C]">ID</span>
                <span>{currentUser.shadowId}</span>
                <Copy size={10} className="text-gray-400 ml-0.5" />
              </button>

              <button
                onClick={handleTogglePromote}
                disabled={isPromoting}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-semibold border transition-colors cursor-pointer active:scale-95 ${
                  localRank === 'KNIGHT'
                    ? isDark
                      ? 'bg-purple-950/40 border-purple-800/60 text-purple-300'
                      : 'bg-purple-50 border-purple-200 text-purple-700'
                    : isDark
                    ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-200'
                    : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-800'
                }`}
                title="Simulate rank promotion"
              >
                {localRank === 'KNIGHT' ? 'Knight (Vanguard)' : 'Pawn (Foundation)'}
              </button>
            </div>
          </div>
        </div>

        {/* Clean bio */}
        <div className="mt-3.5 pt-3 border-t border-gray-100 dark:border-gray-800/80">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            UI/UX Design & Photography · Digital Shadow Identity · Zihuatanejo, Mexico
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* C. NAVIGATION TABS (CLEAN, MINIMALIST, ROSE ACCENT)     */}
      {/* ======================================================== */}
      <div
        className={`sticky top-14 z-20 border-y transition-colors ${
          isDark ? 'bg-[#121316]/95 border-gray-800' : 'bg-white/95 border-gray-200'
        }`}
      >
        <div className="flex px-2 text-xs font-semibold">
          {/* Tab 1: World Rankings */}
          <button
            onClick={() => setActiveMainTab('rankings')}
            className={`flex-1 py-3 text-center relative transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMainTab === 'rankings'
                ? isDark
                  ? 'text-white font-bold'
                  : 'text-gray-900 font-bold'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Crown
              size={14}
              className={activeMainTab === 'rankings' ? 'text-[#E1306C]' : 'text-gray-400'}
            />
            <span className="truncate">World Rankings</span>
            {activeMainTab === 'rankings' && (
              <div
                className="absolute bottom-0 inset-x-3 h-[2px] rounded-full"
                style={{ backgroundColor: '#E1306C' }}
              />
            )}
          </button>

          {/* Tab 2: World Upgrades */}
          <button
            onClick={() => setActiveMainTab('world')}
            className={`flex-1 py-3 text-center relative transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMainTab === 'world'
                ? isDark
                  ? 'text-white font-bold'
                  : 'text-gray-900 font-bold'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Globe
              size={14}
              className={activeMainTab === 'world' ? 'text-[#E1306C]' : 'text-gray-400'}
            />
            <span className="truncate">Upgrades ({upgrades.length})</span>
            {activeMainTab === 'world' && (
              <div
                className="absolute bottom-0 inset-x-3 h-[2px] rounded-full"
                style={{ backgroundColor: '#E1306C' }}
              />
            )}
          </button>

          {/* Tab 3: Following Upgrades */}
          <button
            onClick={() => setActiveMainTab('following')}
            className={`flex-1 py-3 text-center relative transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMainTab === 'following'
                ? isDark
                  ? 'text-white font-bold'
                  : 'text-gray-900 font-bold'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Users
              size={14}
              className={activeMainTab === 'following' ? 'text-[#E1306C]' : 'text-gray-400'}
            />
            <span className="truncate">
              Following ({upgrades.filter((u) => u.isFollowing).length})
            </span>
            {activeMainTab === 'following' && (
              <div
                className="absolute bottom-0 inset-x-3 h-[2px] rounded-full"
                style={{ backgroundColor: '#E1306C' }}
              />
            )}
          </button>
        </div>

        {/* Clean, minimalist search & tier filters */}
        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, rank, city..."
              className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border outline-none transition-colors ${
                isDark
                  ? 'bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:border-[#E1306C]'
                  : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#E1306C]'
              }`}
            />
          </div>

          <div className="flex items-center gap-1 shrink-0 overflow-x-auto no-scrollbar">
            {['ALL', 'KING', 'QUEEN', 'ROOK', 'BISHOP', 'KNIGHT'].map((tier) => (
              <button
                key={tier}
                onClick={() => setFilterTier(tier)}
                className={`px-2 py-1 text-[10px] font-semibold rounded-md transition-colors cursor-pointer ${
                  filterTier === tier
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : isDark
                    ? 'text-gray-400 hover:text-white bg-gray-800/40'
                    : 'text-gray-600 hover:text-gray-900 bg-gray-100'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* D. WORLD RANKINGS FEED (CLEAN, EDITORIAL CONCEPT CARDS) */}
      {/* ======================================================== */}
      {activeMainTab === 'rankings' && (
        <div className="px-4 pt-3.5 space-y-3">
          {/* Top 3 Clean Podium Overview */}
          {searchQuery === '' && filterTier === 'ALL' && !isFetchingRankings && (
            <div className="grid grid-cols-3 gap-2.5 pb-1">
              {/* #2 Sofia Lindqvist */}
              {worldRankings[1] && (
                <div
                  onClick={() => onToast(`Rank #2: @${worldRankings[1].username}`, 'sparkles')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer hover:border-gray-400 ${
                    isDark ? 'bg-[#181A22] border-gray-800' : 'bg-white border-gray-200 shadow-xs'
                  }`}
                >
                  <span className="text-[10px] font-bold text-gray-400 block mb-1">
                    🥈 #2
                  </span>
                  <div
                    className="w-11 h-11 rounded-full mx-auto flex items-center justify-center text-white text-base font-bold mb-1.5 shadow-xs"
                    style={{ backgroundColor: worldRankings[1].avatarBg }}
                  >
                    {worldRankings[1].avatarSymbol}
                  </div>
                  <span
                    className={`text-xs font-bold block truncate ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    @{worldRankings[1].username}
                  </span>
                  <span className="text-[10px] font-semibold text-[#E1306C] block">
                    {worldRankings[1].shadowRank}
                  </span>
                  <span className="text-[9.5px] font-mono text-gray-500 block mt-0.5">
                    {(worldRankings[1].reputation / 1000).toFixed(1)}k REP
                  </span>
                </div>
              )}

              {/* #1 David Chen */}
              {worldRankings[0] && (
                <div
                  onClick={() => onToast(`Rank #1: @${worldRankings[0].username}`, 'sparkles')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer -mt-1 ${
                    isDark
                      ? 'bg-[#1C1F2A] border-amber-500/40 ring-1 ring-amber-500/30'
                      : 'bg-[#FFFDF7] border-amber-300 ring-1 ring-amber-300/40 shadow-xs'
                  }`}
                >
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block mb-1">
                    👑 #1
                  </span>
                  <div
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white text-lg font-bold mb-1.5 shadow-xs"
                    style={{ backgroundColor: worldRankings[0].avatarBg }}
                  >
                    {worldRankings[0].avatarSymbol}
                  </div>
                  <span
                    className={`text-xs font-extrabold block truncate ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    @{worldRankings[0].username}
                  </span>
                  <span className="text-[10.5px] font-bold text-amber-600 dark:text-amber-400 block">
                    KING
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 block mt-0.5">
                    {(worldRankings[0].reputation / 1000).toFixed(1)}k REP
                  </span>
                </div>
              )}

              {/* #3 Jin-Woo Park */}
              {worldRankings[2] && (
                <div
                  onClick={() => onToast(`Rank #3: @${worldRankings[2].username}`, 'sparkles')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer hover:border-gray-400 ${
                    isDark ? 'bg-[#181A22] border-gray-800' : 'bg-white border-gray-200 shadow-xs'
                  }`}
                >
                  <span className="text-[10px] font-bold text-gray-400 block mb-1">
                    🥉 #3
                  </span>
                  <div
                    className="w-11 h-11 rounded-full mx-auto flex items-center justify-center text-white text-base font-bold mb-1.5 shadow-xs"
                    style={{ backgroundColor: worldRankings[2].avatarBg }}
                  >
                    {worldRankings[2].avatarSymbol}
                  </div>
                  <span
                    className={`text-xs font-bold block truncate ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    @{worldRankings[2].username}
                  </span>
                  <span className="text-[10px] font-semibold text-[#E1306C] block">
                    {worldRankings[2].shadowRank}
                  </span>
                  <span className="text-[9.5px] font-mono text-gray-500 block mt-0.5">
                    {(worldRankings[2].reputation / 1000).toFixed(1)}k REP
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Skeleton loading state */}
          {isFetchingRankings && (
            <div className="space-y-3 py-2">
              {[1, 2, 3].map((sk) => (
                <div
                  key={sk}
                  className={`p-4 rounded-2xl border animate-pulse ${
                    isDark ? 'bg-gray-800/40 border-gray-800' : 'bg-gray-100 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <div className="flex-1 space-y-2">
                      <div className="w-24 h-3 rounded bg-gray-300 dark:bg-gray-700" />
                      <div className="w-32 h-2 rounded bg-gray-300 dark:bg-gray-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clean Concept UI Ranked User Cards */}
          {!isFetchingRankings &&
            displayRankings.map((user) => {
              const isTopRank = user.rankPosition === 1;

              return (
                <div
                  key={user.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#181A22] border-gray-800/90 hover:border-gray-700'
                      : 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                  }`}
                >
                  {/* Top Row: Rank position, Circular avatar, Name, Username, Flag & Follow */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Rank Position Badge */}
                      <div
                        className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-mono font-bold text-xs border ${
                          isTopRank
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                            : user.rankPosition <= 3
                            ? isDark
                              ? 'bg-gray-800 text-gray-200 border-gray-700'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                            : isDark
                            ? 'bg-gray-900 text-gray-400 border-gray-800'
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                      >
                        {isTopRank ? '👑' : `#${user.rankPosition}`}
                      </div>

                      {/* Clean Circular Avatar */}
                      <div
                        className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-xs border border-white/20"
                        style={{ backgroundColor: user.avatarBg }}
                      >
                        {user.avatarSymbol}
                      </div>

                      {/* Name & Username */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4
                            className={`text-xs font-bold truncate ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {user.name}
                          </h4>
                          <span className="text-[11px] font-semibold text-[#E1306C] truncate">
                            @{user.username}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10.5px] text-gray-500 mt-0.5">
                          <span>{user.flag}</span>
                          <span className="truncate max-w-[80px]">{user.location.split(',')[0]}</span>
                          <span>•</span>
                          {/* Prominent Shadow ID with copy */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              try {
                                navigator.clipboard.writeText(user.shadowId);
                              } catch {}
                              onToast(`Copied Shadow ID: ${user.shadowId}`, 'sparkles');
                            }}
                            className={`inline-flex items-center gap-1 font-mono text-[9.5px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                              isDark
                                ? 'bg-gray-800/80 hover:bg-gray-800 text-gray-300 border-gray-700'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                            }`}
                            title="Copy Shadow ID"
                          >
                            <span className="font-bold text-[#E1306C]">ID:</span>
                            <span>{user.shadowId}</span>
                            <Copy size={9} className="text-gray-400 ml-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Follow button */}
                    <button
                      onClick={() => handleToggleFollowRanking(user.id)}
                      className={`px-3 py-1 rounded-full text-[10.5px] font-semibold transition-all active:scale-95 cursor-pointer shrink-0 ${
                        user.isFollowing
                          ? isDark
                            ? 'bg-gray-800 text-gray-300 border border-gray-700'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                          : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      }`}
                    >
                      {user.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>

                  {/* Status & Tier Bar */}
                  <div
                    className={`mt-3 p-2.5 rounded-xl flex items-center justify-between border ${
                      isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-50/80 border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-500">
                        {user.avatarSymbol}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-xs font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
                          >
                            RANK: {user.shadowRank}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            ({user.tierLevel})
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500">{user.shadowStatus}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                        Reputation
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100">
                        {user.reputation.toLocaleString()} REP
                      </span>
                    </div>
                  </div>

                  {/* Status Quote */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2.5 leading-relaxed">
                    {user.statusQuote}
                  </p>

                  {/* Footer Metrics & Cheer button */}
                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-gray-100 dark:border-gray-800/80 text-[11px]">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
                        <Flame size={13} className="fill-amber-500 text-amber-500" />
                        <span>{user.streakDays}d streak</span>
                      </div>
                      <div className="inline-flex items-center gap-1 text-gray-500">
                        <Globe size={12} />
                        <span>{user.nodesActive} nodes</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleCheerRanking(user.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                        user.hasCheered
                          ? 'bg-[#E1306C]/10 border-[#E1306C]/30 text-[#E1306C]'
                          : isDark
                          ? 'bg-gray-800/60 hover:bg-gray-800 border-gray-700 text-gray-300'
                          : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                      }`}
                      title="Cheer for this ranked user"
                    >
                      <Heart
                        size={12}
                        className={
                          user.hasCheered ? 'fill-[#E1306C] text-[#E1306C]' : 'text-gray-400'
                        }
                      />
                      <span>{user.cheerCount}</span>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* ======================================================== */}
      {/* E. LIVE RANK UPGRADES (CLEAN, MINIMALIST CARDS)          */}
      {/* ======================================================== */}
      {activeMainTab !== 'rankings' && (
        <div className="px-4 pt-3.5 space-y-3">
          {displayUpgrades.map((person) => {
            return (
              <div
                key={person.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#181A22] border-gray-800/90 hover:border-gray-700'
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                }`}
              >
                {/* Header: User avatar, name, handle, location & follow */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-xs"
                      style={{ backgroundColor: person.avatarBg }}
                    >
                      {person.avatarSymbol}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-bold truncate ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {person.name}
                        </span>
                        <span className="text-[11px] font-semibold text-[#E1306C] truncate">
                          @{person.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10.5px] text-gray-500 mt-0.5">
                        <span>{person.flag}</span>
                        <span className="truncate max-w-[85px]">{person.location.split(',')[0]}</span>
                        <span>•</span>
                        <span>{person.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleFollowUpgrade(person.id)}
                    className={`px-3 py-1 rounded-full text-[10.5px] font-semibold transition-all active:scale-95 cursor-pointer shrink-0 ${
                      person.isFollowing
                        ? isDark
                          ? 'bg-gray-800 text-gray-300 border border-gray-700'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                        : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    }`}
                  >
                    {person.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>

                {/* Rank Evolution Pill */}
                <div
                  className={`mt-3 p-2.5 rounded-xl border flex items-center justify-between ${
                    isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-50/80 border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs font-mono">
                      {person.fromRank === 'PAWN' ? '♙' : '♘'}
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                        Was
                      </span>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {person.fromRank}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <ArrowRight size={13} className="text-[#E1306C]" />
                    <span className="text-[8px] font-bold text-[#E1306C] uppercase tracking-wider mt-0.5">
                      Promoted
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                        Now
                      </span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {person.toRank}
                      </span>
                    </div>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-xs"
                      style={{ backgroundColor: '#E1306C' }}
                    >
                      {person.toRank === 'KNIGHT'
                        ? '♘'
                        : person.toRank === 'BISHOP'
                        ? '♗'
                        : person.toRank === 'ROOK'
                        ? '♖'
                        : '♕'}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2.5 leading-relaxed">
                  {person.achievementSummary}
                </p>

                {/* Footer metrics & Congratulate */}
                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-gray-100 dark:border-gray-800/80 text-[11px]">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
                      <Flame size={13} className="fill-amber-500 text-amber-500" />
                      <span>{person.streakDays}d streak</span>
                    </div>
                    <span className="text-gray-500 font-mono">+{person.repGained} REP</span>
                  </div>

                  <button
                    onClick={() => handleToggleCongratulate(person.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                      person.hasCongratulated
                        ? 'bg-[#E1306C]/10 border-[#E1306C]/30 text-[#E1306C]'
                        : isDark
                        ? 'bg-gray-800/60 hover:bg-gray-800 border-gray-700 text-gray-300'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                    }`}
                  >
                    <Heart
                      size={12}
                      className={
                        person.hasCongratulated ? 'fill-[#E1306C] text-[#E1306C]' : 'text-gray-400'
                      }
                    />
                    <span>{person.congratsCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

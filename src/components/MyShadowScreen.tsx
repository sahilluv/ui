import React, { useState, useMemo, useEffect } from 'react';
import {
  ChevronLeft,
  Copy,
  ShieldCheck,
  Heart,
  Flame,
  Globe,
  Users,
  Search,
  MoreVertical,
  Trophy,
  ArrowRight,
  UserPlus,
  UserCheck,
  Sparkles,
  RefreshCw,
  Crown,
  Sun,
  Moon,
  Radio,
} from 'lucide-react';
import {
  PawnRankBadge,
  ShadowRankType,
  PremiumPawnInsignia,
  PremiumKnightInsignia,
  getRankMeta,
} from './PawnRankBadge';

export interface MyShadowScreenProps {
  onBack: () => void;
  isDark?: boolean;
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
    cheerCount: 460,
    hasCheered: true,
    isFollowing: true,
    statusQuote: 'Deployed multi-region consensus relayer and unlocked prime Fortress status.',
  },
  {
    rankPosition: 6,
    id: 'wr_6',
    name: 'Hannes Meyer',
    username: 'hannes.vibe',
    shadowId: 'shdw_hmeyer23',
    location: 'Berlin, Germany',
    flag: '🇩🇪',
    avatarBg: '#2563EB',
    avatarSymbol: '♖',
    isVerified: true,
    shadowRank: 'ROOK',
    shadowStatus: 'Fortress Status',
    tierLevel: 'Rank IV',
    reputation: 15200,
    streakDays: 105,
    nodesActive: 48,
    cheerCount: 395,
    hasCheered: false,
    isFollowing: false,
    statusQuote: 'Validated Central Europe node cluster with 99.98% uptime in zero-knowledge relay trials.',
  },
  {
    rankPosition: 7,
    id: 'wr_7',
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
    cheerCount: 380,
    hasCheered: true,
    isFollowing: true,
    statusQuote: 'Authored 14 protocol governance standards and strategic zero-knowledge relays.',
  },
  {
    rankPosition: 8,
    id: 'wr_8',
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
    cheerCount: 310,
    hasCheered: false,
    isFollowing: false,
    statusQuote: 'Published open source reputation auditor smart contract for the shadow mesh.',
  },
  {
    rankPosition: 9,
    id: 'wr_9',
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
    cheerCount: 290,
    hasCheered: false,
    isFollowing: false,
    statusQuote: 'European node validator group leader with over 5,000 peer affirmations.',
  },
  {
    rankPosition: 10,
    id: 'wr_10',
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
    cheerCount: 240,
    hasCheered: true,
    isFollowing: true,
    statusQuote: 'Vanguard node operator with 48 days of flawless telemetry synchronization.',
  },
  {
    rankPosition: 11,
    id: 'wr_11',
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
    cheerCount: 215,
    hasCheered: true,
    isFollowing: true,
    statusQuote: 'Certified Vanguard node operator with zero dispute history across Paris nodes.',
  },
  {
    rankPosition: 12,
    id: 'wr_12',
    name: 'Amara Okafor',
    username: 'amara.okafor',
    shadowId: 'shdw_aokafor55',
    location: 'Lagos, Nigeria',
    flag: '🇳🇬',
    avatarBg: '#059669',
    avatarSymbol: '♘',
    isVerified: true,
    shadowRank: 'KNIGHT',
    shadowStatus: 'Vanguard Status',
    tierLevel: 'Rank II',
    reputation: 7800,
    streakDays: 35,
    nodesActive: 18,
    cheerCount: 185,
    hasCheered: false,
    isFollowing: true,
    statusQuote: 'Mastered peer validation protocol and earned community endorsement across African nodes.',
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
    achievementSummary: 'Completed Vanguard Trial and 48 consecutive days of cryptographic verification.',
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
    achievementSummary: 'Authored 12 protocol governance proposals and reached strategic consensus threshold.',
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
    achievementSummary: 'Established Fortress Node authority and processed over 500,000 protocol blocks.',
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
    achievementSummary: 'Mastered peer validation protocol and earned community endorsement across African nodes.',
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
    achievementSummary: 'Ascended to Sovereign status after leading Nordic regional decentralization initiative.',
  },
  {
    id: 'upg_6',
    name: 'David Chen',
    username: 'dchen.ai',
    location: 'Singapore',
    flag: '🇸🇬',
    avatarBg: '#D97706',
    avatarSymbol: '♔',
    isVerified: true,
    fromRank: 'QUEEN',
    toRank: 'KING',
    fromTier: 'Rank V',
    toTier: 'Rank VI',
    streakDays: 280,
    repGained: 6500,
    congratsCount: 1250,
    hasCongratulated: false,
    isFollowing: true,
    timeAgo: '3h ago',
    achievementSummary: 'Apex King of the genesis mesh. Orchestrated cross-continental consensus channels.',
  },
  {
    id: 'upg_7',
    name: 'Chloe Dubois',
    username: 'chloe.shadow',
    location: 'Paris, France',
    flag: '🇫🇷',
    avatarBg: '#DC2626',
    avatarSymbol: '♘',
    isVerified: true,
    fromRank: 'PAWN',
    toRank: 'KNIGHT',
    fromTier: 'Rank I',
    toTier: 'Rank II',
    streakDays: 42,
    repGained: 450,
    congratsCount: 167,
    hasCongratulated: false,
    isFollowing: false,
    timeAgo: '4h ago',
    achievementSummary: 'Certified Vanguard node operator with flawless telemetry synchronization record.',
  },
  {
    id: 'upg_8',
    name: 'Zara Al-Mansoor',
    username: 'zara.am',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    avatarBg: '#0D9488',
    avatarSymbol: '♖',
    isVerified: true,
    fromRank: 'BISHOP',
    toRank: 'ROOK',
    fromTier: 'Rank III',
    toTier: 'Rank IV',
    streakDays: 98,
    repGained: 1650,
    congratsCount: 460,
    hasCongratulated: true,
    isFollowing: true,
    timeAgo: '5h ago',
    achievementSummary: 'Deployed multi-region consensus relayer and unlocked prime Fortress status.',
  },
];

export const MyShadowScreen: React.FC<MyShadowScreenProps> = ({
  onBack,
  isDark = false,
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
  // Use pure reference image color mode (#FFFFFF, #E1306C, #262626, #8E8E8E, #ED4956)
  const [usePureReferenceTheme, setUsePureReferenceTheme] = useState(true);

  // When usePureReferenceTheme is true, strictly render the reference image's color scheme:
  const isDarkTheme = usePureReferenceTheme ? false : isDark;

  // Navigation Tabs: 'rankings' (👑 World Rankings) | 'world' (World Upgrades) | 'following' | 'all'
  const [activeMainTab, setActiveMainTab] = useState<'rankings' | 'world' | 'following' | 'all'>('rankings');

  // World Rankings state
  const [worldRankings, setWorldRankings] = useState<WorldRankedUser[]>(INITIAL_WORLD_RANKINGS);
  const [isFetchingRankings, setIsFetchingRankings] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');

  // Live Upgrades state
  const [upgrades, setUpgrades] = useState<RankUpgradePerson[]>(INITIAL_UPGRADES);

  // Local simulated rank for Mauricio (PAWN ↔ KNIGHT)
  const [localRank, setLocalRank] = useState<ShadowRankType>(currentUser.rank || 'PAWN');
  const [isPromoting, setIsPromoting] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('ALL');

  // Asynchronous Fetch & Consensus Sync
  const fetchWorldRankings = (silent: boolean = false) => {
    setIsFetchingRankings(true);
    setTimeout(() => {
      setWorldRankings((prev) =>
        prev.map((user) => ({
          ...user,
          reputation: user.reputation + Math.floor(Math.random() * 25),
        }))
      );
      setIsFetchingRankings(false);
      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      if (!silent) {
        onToast('Consensus state synchronized with decentralized nodes!', 'sparkles');
      }
    }, 450);
  };

  useEffect(() => {
    fetchWorldRankings(true);
  }, []);

  // Copy Shadow ID
  const handleCopyId = (idToCopy: string = currentUser.shadowId) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(idToCopy);
      }
    } catch {
      // Fallback
    }
    onToast(`Shadow ID copied: ${idToCopy}`, 'sparkles');
  };

  // Toggle simulated rank promotion (PAWN ↔ KNIGHT)
  const handleTogglePromote = () => {
    setIsPromoting(true);
    const nextRank: ShadowRankType = localRank === 'PAWN' ? 'KNIGHT' : 'PAWN';
    setTimeout(() => {
      setLocalRank(nextRank);
      setIsPromoting(false);
      onToast(
        nextRank === 'KNIGHT'
          ? 'Promoted to KNIGHT (Vanguard Status)'
          : 'Reverted to PAWN (Foundation Status)',
        'sparkles'
      );
    }, 350);
  };

  // Cheer / Heart reaction on World Ranking Cards
  const handleToggleCheerRanking = (id: string) => {
    setWorldRankings((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          const nextState = !user.hasCheered;
          const nextCount = nextState ? user.cheerCount + 1 : Math.max(0, user.cheerCount - 1);
          if (nextState) {
            onToast(`Cheered for #${user.rankPosition} @${user.username}! ❤️`, 'sparkles');
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

  // Follow / Unfollow on World Rankings
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

  // Congratulate on Rank Upgrades Feed
  const handleToggleCongratulate = (id: string) => {
    setUpgrades((prev) =>
      prev.map((person) => {
        if (person.id === id) {
          const nextState = !person.hasCongratulated;
          const nextCount = nextState ? person.congratsCount + 1 : Math.max(0, person.congratsCount - 1);
          if (nextState) {
            onToast(`Congratulated @${person.username} on upgrading to ${person.toRank}! 🎉`, 'sparkles');
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

  // Follow / Unfollow on Upgrades Feed (dynamically syncs with Following tab)
  const handleToggleFollowUpgrade = (id: string) => {
    setUpgrades((prev) =>
      prev.map((person) => {
        if (person.id === id) {
          const nextFollowing = !person.isFollowing;
          onToast(nextFollowing ? `Now following @${person.username}` : `Unfollowed @${person.username}`);
          return {
            ...person,
            isFollowing: nextFollowing,
          };
        }
        return person;
      })
    );
  };

  // Filtered World Rankings
  const filteredRankings = useMemo(() => {
    return worldRankings.filter((user) => {
      if (filterTier !== 'ALL' && user.shadowRank !== filterTier) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = user.name.toLowerCase().includes(q);
        const matchesUsername = user.username.toLowerCase().includes(q);
        const matchesLocation = user.location.toLowerCase().includes(q);
        const matchesRank = user.shadowRank.toLowerCase().includes(q);
        const matchesId = user.shadowId.toLowerCase().includes(q);
        if (!matchesName && !matchesUsername && !matchesLocation && !matchesRank && !matchesId) {
          return false;
        }
      }
      return true;
    });
  }, [worldRankings, searchQuery, filterTier]);

  // Filtered Upgrades
  const filteredUpgrades = useMemo(() => {
    return upgrades.filter((person) => {
      if (activeMainTab === 'following' && !person.isFollowing) {
        return false;
      }
      if (filterTier !== 'ALL' && person.toRank !== filterTier) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = person.name.toLowerCase().includes(q);
        const matchesUsername = person.username.toLowerCase().includes(q);
        const matchesLocation = person.location.toLowerCase().includes(q);
        const matchesRank = person.toRank.toLowerCase().includes(q) || person.fromRank.toLowerCase().includes(q);
        if (!matchesName && !matchesUsername && !matchesLocation && !matchesRank) {
          return false;
        }
      }
      return true;
    });
  }, [upgrades, activeMainTab, filterTier, searchQuery]);

  // Shadow highlights list with natural reference editorial tones
  const SHADOW_HIGHLIGHTS = [
    { id: 'streaks', label: 'Streaks 🔥', icon: '🔥', gradient: 'linear-gradient(135deg, #FF6B4A 0%, #FF2A55 100%)' },
    { id: 'genesis', label: 'Genesis ♙', icon: '♙', gradient: 'linear-gradient(135deg, #E1306C 0%, #991BEA 100%)' },
    { id: 'ranks', label: 'Ranks ♘', icon: '♘', gradient: 'linear-gradient(135deg, #C89B7B 0%, #8A5A36 100%)' },
    { id: 'nodes', label: 'Nodes 🌐', icon: '🌐', gradient: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)' },
    { id: 'badges', label: 'Badges 🏆', icon: '🏆', gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' },
  ];

  return (
    <div
      className={`flex flex-col h-full overflow-y-auto no-scrollbar pb-32 transition-colors ${
        isDarkTheme ? 'bg-[#0B0C14] text-white' : 'bg-[#FFFFFF] text-[#262626]'
      }`}
    >
      {/* ======================================================== */}
      {/* 1. HEADER (Exact Reference UI Background & Rose Wordmark) */}
      {/* Pure White Background (#FFFFFF) + Signature #E1306C script*/}
      {/* ======================================================== */}
      <header
        className={`sticky top-0 z-30 h-13 px-4 flex items-center justify-between shrink-0 border-b transition-colors ${
          isDarkTheme
            ? 'bg-[#0B0C14]/95 border-white/10 text-white'
            : 'bg-[#FFFFFF]/95 border-[#EFEFEF] text-[#262626]'
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isDarkTheme ? 'hover:bg-white/10 text-white' : 'hover:bg-[#F2F2F2] text-[#262626]'
            }`}
            title="Return to Home Feed"
            aria-label="Back to Home Feed"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        {/* Center cursive script brand wordmark in signature reference rose pink (#E1306C) */}
        <div className="flex items-center justify-center">
          <h1
            className="text-3xl font-shadow-script font-bold tracking-wide select-none cursor-pointer"
            style={{
              color: '#E1306C',
            }}
          >
            Shadow
          </h1>
        </div>

        {/* Right Action: Sync Consensus, Theme Toggle, & Options */}
        <div className="flex items-center gap-1">
          {/* Theme Mode Toggle (defaults to Reference White #FFFFFF) */}
          <button
            onClick={() => setUsePureReferenceTheme((prev) => !prev)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isDarkTheme ? 'hover:bg-white/10 text-yellow-300' : 'hover:bg-[#F2F2F2] text-[#737373]'
            }`}
            title={usePureReferenceTheme ? 'Switch to Dark Mode' : 'Switch to Reference UI Colors'}
          >
            {usePureReferenceTheme ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <button
            onClick={() => fetchWorldRankings(false)}
            disabled={isFetchingRankings}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isDarkTheme ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-[#F2F2F2] text-[#262626]'
            }`}
            title="Sync Consensus State"
          >
            <RefreshCw
              size={15}
              className={`text-[#E1306C] ${isFetchingRankings ? 'animate-spin' : ''}`}
            />
          </button>

          <button
            onClick={() => onToast('Profile options', 'bookmark')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isDarkTheme ? 'hover:bg-white/10 text-white' : 'hover:bg-[#F2F2F2] text-[#262626]'
            }`}
            title="More options"
          >
            <MoreVertical size={19} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="px-4 pt-3.5 space-y-4">
        {/* ======================================================== */}
        {/* 2. PROFILE SECTION (DIRECT REFERENCE MATCH)              */}
        {/* Circular Avatar on Left | Details & Exact Stats on Right */}
        {/* Pure White Surface + Clean Crisp Editorial Typography    */}
        {/* ======================================================== */}
        <div
          className={`p-4 rounded-[24px] border transition-all ${
            isDarkTheme
              ? 'bg-[#121422] border-white/10 shadow-black/40'
              : 'bg-[#FFFFFF] border-[#EFEFEF] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Circular Avatar on Left (Matching Claire Green in reference) */}
            <div className="relative shrink-0">
              <div
                className={`w-20 h-20 rounded-full p-[2px] shadow-sm flex items-center justify-center ${
                  isDarkTheme ? 'ring-2 ring-pink-500/40' : 'ring-2 ring-[#EFEFEF]'
                }`}
                style={{
                  background: isDarkTheme
                    ? 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)'
                    : 'linear-gradient(135deg, #E5C3A6 0%, #C89B7B 60%, #E1306C 100%)',
                }}
              >
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden ${
                    isDarkTheme ? 'bg-[#0B0C14]' : 'bg-[#FAFAFA]'
                  }`}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: isDarkTheme
                        ? 'radial-gradient(circle at 35% 35%, #3B154C 0%, #171126 60%, #0B0A14 100%)'
                        : 'radial-gradient(circle at 35% 35%, #F4ECE1 0%, #E5D5C5 60%, #D8C3AE 100%)',
                    }}
                  >
                    {localRank === 'KNIGHT' ? (
                      <PremiumKnightInsignia size={38} glow={false} className={isDarkTheme ? 'text-white' : 'text-[#3E2723]'} />
                    ) : (
                      <PremiumPawnInsignia size={38} glow={false} className={isDarkTheme ? 'text-white' : 'text-[#3E2723]'} />
                    )}
                  </div>
                </div>
              </div>

              {/* Verified Shield Badge on Avatar Rim */}
              <div
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/50 backdrop-blur-md flex items-center justify-center text-emerald-500 shadow-sm"
                title="Cryptographically Verified Digital Persona"
              >
                <ShieldCheck size={13} className="fill-emerald-500/20 text-emerald-500" />
              </div>
            </div>

            {/* Right Column: Name, Handle & Exact Reference Stats Stack */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between">
                <h2 className={`text-base font-extrabold tracking-tight truncate ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                  {currentUser.name}
                </h2>
              </div>
              <p className={`text-xs font-semibold truncate mt-0.5 ${isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E]'}`}>
                @{currentUser.username}
              </p>

              {/* Clean Stats Stack Matching Reference UI:
                  ❤️ 1.2k likes (Exact Red-Pink #ED4956)
                  🔥 48 streaks (Replaces followers count)
                  735 posts (#262626 bold) */}
              <div className="flex items-center gap-4 mt-3">
                {/* 1. Post Count */}
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-extrabold ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                    735
                  </span>
                  <span className={`text-[11px] font-medium ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
                    posts
                  </span>
                </div>

                {/* 2. Streaks Count (Replaces followers) */}
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-extrabold ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                    48
                  </span>
                  <span className={`text-[11px] font-medium flex items-center gap-0.5 ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
                    streaks <Flame size={12} className="fill-[#FF8500] text-[#FF8500]" />
                  </span>
                </div>

                {/* 3. Likes Count (Exact Instagram Red-Pink #ED4956) */}
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-extrabold ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                    1.2k
                  </span>
                  <span className={`text-[11px] font-medium flex items-center gap-0.5 ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
                    likes <Heart size={11} className="fill-[#ED4956] text-[#ED4956]" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shadow ID Capsule, Rank Badge & Progression Control */}
          <div
            className={`mt-4 pt-3.5 border-t ${
              isDarkTheme ? 'border-white/10' : 'border-[#EFEFEF]'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              {/* Shadow ID Capsule with Click-to-Copy */}
              <button
                onClick={() => handleCopyId(currentUser.shadowId)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-mono transition-all cursor-pointer active:scale-95 ${
                  isDarkTheme
                    ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    : 'bg-[#FAFAFA] border-[#EFEFEF] text-[#262626] hover:bg-[#F2F2F2]'
                }`}
                title="Click to copy Shadow ID"
              >
                <span className="text-[#E1306C] font-extrabold text-[10px]">ID:</span>
                <span>{currentUser.shadowId}</span>
                <Copy size={11} className={isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E] ml-0.5'} />
              </button>

              {/* Simulated Rank Progression Toggle Button (PAWN ↔ KNIGHT) */}
              <button
                onClick={handleTogglePromote}
                disabled={isPromoting}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer active:scale-95 ${
                  localRank === 'KNIGHT'
                    ? isDarkTheme
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                      : 'bg-purple-50 border-purple-200 text-purple-700'
                    : isDarkTheme
                    ? 'bg-pink-500/15 border-pink-500/30 text-pink-400 hover:bg-pink-500/20'
                    : 'bg-[#FFF0F5] border-pink-200 text-[#E1306C] hover:bg-[#FFE4EE]'
                }`}
                title="Advance from Foundation to Vanguard status"
              >
                <Sparkles size={12} className={isPromoting ? 'animate-spin' : ''} />
                <span>{localRank === 'KNIGHT' ? 'Knight (Vanguard)' : 'Pawn (Foundation)'}</span>
                <span className={`text-[9px] uppercase tracking-wider ${isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E]'}`}>Toggle</span>
              </button>
            </div>

            {/* PawnRankBadge with periodic sheen */}
            <PawnRankBadge
              rank={localRank}
              variant="profile"
              isDark={isDarkTheme}
              isPromoting={isPromoting}
              periodicSheen={true}
              onClick={handleTogglePromote}
            />

            {/* Bio & Tagline */}
            <p className={`text-xs leading-relaxed mt-2.5 ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
              UI/UX Design & Photography · Digital Shadow Identity · Zihuatanejo, Mexico
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {['#ShadowGenesis', '#CreativeMesh', '#RankUpgrade'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-[#E1306C] hover:underline cursor-pointer"
                  onClick={() => onToast(`Filter tag: ${tag}`)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. SHADOW HIGHLIGHTS (Squircle Story Highlights)         */}
        {/* Streaks 🔥 | Genesis ♙ | Ranks ♘ | Nodes 🌐 | Badges 🏆  */}
        {/* ======================================================== */}
        <div className="space-y-1.5">
          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E]'}`}>
            Shadow Highlights
          </span>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-1">
            {SHADOW_HIGHLIGHTS.map((item) => (
              <button
                key={item.id}
                onClick={() => onToast(`Viewing highlight: ${item.label}`, 'sparkles')}
                className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
              >
                <div
                  className="w-14 h-14 rounded-[18px] p-[2px] transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-sm"
                  style={{ background: item.gradient }}
                >
                  <div
                    className={`w-full h-full rounded-[16px] flex items-center justify-center text-xl shadow-inner ${
                      isDarkTheme ? 'bg-[#151726]' : 'bg-[#FFFFFF]'
                    }`}
                  >
                    <span>{item.icon}</span>
                  </div>
                </div>
                <span className={`text-[10.5px] font-bold tracking-tight text-center ${isDarkTheme ? 'text-slate-300' : 'text-[#262626]'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. PRIMARY NAVIGATION TABS (Clean White Reference UI)    */}
        {/* 👑 World Rankings (Primary) | World Upgrades | Following */}
        {/* ======================================================== */}
        <div
          className={`sticky top-13 z-20 pt-2 pb-2 rounded-[22px] border transition-colors ${
            isDarkTheme
              ? 'bg-[#121422]/95 border-white/10 shadow-xl'
              : 'bg-[#FFFFFF]/95 border-[#EFEFEF] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
          }`}
        >
          {/* Main 4 Navigation Tabs */}
          <div className="flex px-2 text-xs font-bold gap-1 overflow-x-auto no-scrollbar">
            {/* Primary Prominent Tab: World Rankings */}
            <button
              onClick={() => setActiveMainTab('rankings')}
              className={`flex-1 min-w-[110px] py-2.5 text-center relative rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeMainTab === 'rankings'
                  ? 'bg-gradient-to-r from-[#E1306C] to-[#C13584] text-white shadow-md'
                  : isDarkTheme
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'bg-[#FAFAFA] text-[#737373] hover:text-[#262626] border border-[#EFEFEF]'
              }`}
            >
              <Crown size={14} className={activeMainTab === 'rankings' ? 'text-amber-200' : ''} />
              <span className="truncate">World Rankings</span>
            </button>

            {/* Tab 2: World Upgrades */}
            <button
              onClick={() => setActiveMainTab('world')}
              className={`flex-1 min-w-[90px] py-2.5 text-center relative rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeMainTab === 'world'
                  ? 'bg-gradient-to-r from-[#E1306C] to-[#C13584] text-white shadow-md'
                  : isDarkTheme
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'bg-[#FAFAFA] text-[#737373] hover:text-[#262626] border border-[#EFEFEF]'
              }`}
            >
              <Globe size={14} />
              <span className="truncate">Upgrades ({upgrades.length})</span>
            </button>

            {/* Tab 3: People You Follow */}
            <button
              onClick={() => setActiveMainTab('following')}
              className={`flex-1 min-w-[85px] py-2.5 text-center relative rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeMainTab === 'following'
                  ? 'bg-gradient-to-r from-[#E1306C] to-[#C13584] text-white shadow-md'
                  : isDarkTheme
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'bg-[#FAFAFA] text-[#737373] hover:text-[#262626] border border-[#EFEFEF]'
              }`}
            >
              <Users size={14} />
              <span className="truncate">
                Following ({upgrades.filter((u) => u.isFollowing).length})
              </span>
            </button>

            {/* Tab 4: All */}
            <button
              onClick={() => setActiveMainTab('all')}
              className={`py-2.5 px-3 text-center relative rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeMainTab === 'all'
                  ? 'bg-gradient-to-r from-[#E1306C] to-[#C13584] text-white shadow-md'
                  : isDarkTheme
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'bg-[#FAFAFA] text-[#737373] hover:text-[#262626] border border-[#EFEFEF]'
              }`}
            >
              <Trophy size={14} />
              <span className="truncate">All</span>
            </button>
          </div>

          {/* Search Bar & Tier Filters */}
          <div className="px-3 pt-2.5 space-y-2">
            <div className="flex items-center gap-2">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search size={13} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E]'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    activeMainTab === 'rankings'
                      ? 'Search rank, @username, city, ID...'
                      : 'Search creator, city, or rank...'
                  }
                  className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border outline-none transition-colors ${
                    isDarkTheme
                      ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-pink-500'
                      : 'bg-[#FAFAFA] border-[#EFEFEF] text-[#262626] placeholder-[#8E8E8E] focus:border-[#E1306C]'
                  }`}
                />
              </div>

              {/* Last Synced Indicator */}
              {activeMainTab === 'rankings' && (
                <div className="shrink-0 text-[10px] font-mono hidden sm:inline-flex items-center gap-1 text-[#8E8E8E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Synced: {lastSyncedTime}</span>
                </div>
              )}
            </div>

            {/* Tier Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {['ALL', 'KING', 'QUEEN', 'ROOK', 'BISHOP', 'KNIGHT'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setFilterTier(tier)}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer shrink-0 ${
                    filterTier === tier
                      ? 'bg-[#E1306C] text-white border-[#E1306C] shadow-xs'
                      : isDarkTheme
                      ? 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                      : 'bg-[#FAFAFA] text-[#737373] border-[#EFEFEF] hover:text-[#262626]'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. TAB 1: DEDICATED WORLD RANKINGS LEADERBOARD           */}
        {/* ======================================================== */}
        {activeMainTab === 'rankings' && (
          <div className="space-y-3.5">
            {/* A. PINNED: YOUR WORLD STANDING CARD */}
            {searchQuery === '' && filterTier === 'ALL' && (
              <div
                className={`relative rounded-[24px] p-4 border shadow-sm overflow-hidden transition-all ${
                  isDarkTheme
                    ? 'bg-gradient-to-r from-[#17192C] via-[#121422] to-[#1A182E] border-pink-500/30 shadow-black/50'
                    : 'bg-gradient-to-r from-pink-50/50 via-white to-purple-50/40 border-[#EFEFEF]'
                }`}
              >
                {/* Specular Top Rim */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent pointer-events-none"
                />

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFF0F5] text-[#E1306C] border border-pink-200">
                      Your Global Standing
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E]'}`}>
                      {localRank === 'KNIGHT' ? 'TOP 25%' : 'TOP 40%'}
                    </span>
                  </div>

                  <span className="text-xs font-black text-[#E1306C] font-mono">
                    Global Position: #48
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-11 h-11 rounded-full p-[2px] shadow-sm shrink-0 flex items-center justify-center"
                      style={{
                        background: isDarkTheme
                          ? currentUser.avatarGradient
                          : 'linear-gradient(135deg, #E5C3A6 0%, #C89B7B 60%, #E1306C 100%)',
                      }}
                    >
                      <div className={`w-full h-full rounded-full flex items-center justify-center ${isDarkTheme ? 'bg-black' : 'bg-[#FAFAFA]'}`}>
                        {localRank === 'KNIGHT' ? (
                          <PremiumKnightInsignia size={24} glow={false} className={isDarkTheme ? 'text-white' : 'text-[#3E2723]'} />
                        ) : (
                          <PremiumPawnInsignia size={24} glow={false} className={isDarkTheme ? 'text-white' : 'text-[#3E2723]'} />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-black truncate ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                          {currentUser.name}
                        </span>
                        <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#E1306C] block truncate">
                        @{currentUser.username}
                      </span>
                    </div>
                  </div>

                  {/* Copyable ID */}
                  <button
                    onClick={() => handleCopyId(currentUser.shadowId)}
                    className={`inline-flex items-center gap-1 font-mono text-[10px] px-2.5 py-1 rounded-lg border transition-colors shrink-0 ${
                      isDarkTheme
                        ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        : 'bg-[#FAFAFA] border-[#EFEFEF] text-[#262626] hover:bg-[#F2F2F2]'
                    }`}
                    title="Copy Shadow ID"
                  >
                    <span className="text-[#E1306C] font-bold">ID:</span>
                    <span>{currentUser.shadowId}</span>
                    <Copy size={10} className="text-[#8E8E8E] ml-0.5" />
                  </button>
                </div>

                {/* Progression Stepper Trigger */}
                <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-xs ${isDarkTheme ? 'border-white/5' : 'border-[#EFEFEF]'}`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] flex items-center gap-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
                      <Flame size={12} className="fill-[#FF8500] text-[#FF8500]" />
                      48 streaks
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[11px] text-[#E1306C] font-bold">
                      {localRank === 'KNIGHT' ? 'Vanguard Status Active' : 'Foundation Status'}
                    </span>
                  </div>

                  <button
                    onClick={handleTogglePromote}
                    disabled={isPromoting}
                    className="text-[10px] font-bold text-[#E1306C] hover:underline cursor-pointer"
                  >
                    {localRank === 'KNIGHT' ? 'Revert to Pawn' : 'Advance to Knight'}
                  </button>
                </div>
              </div>
            )}

            {/* B. TOP 3 GLOBAL PODIUM CARD (Editorial Reference Styling) */}
            {searchQuery === '' && filterTier === 'ALL' && (
              <div
                className={`p-4 rounded-[24px] border relative overflow-hidden transition-all ${
                  isDarkTheme
                    ? 'bg-[#121422] border-white/10 shadow-lg'
                    : 'bg-[#FFFFFF] border-[#EFEFEF] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-amber-500" />
                    <h3 className={`text-xs font-black uppercase tracking-wider ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                      Global Consensus Leaders (Top 3)
                    </h3>
                  </div>
                  <span className={`text-[10px] font-mono ${isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E]'}`}>
                    Apex Tier
                  </span>
                </div>

                {/* 3 Podium Pillars */}
                <div className="grid grid-cols-3 gap-2.5 items-end pt-1 pb-1">
                  {/* #2 Sofia Lindqvist (Silver) */}
                  {worldRankings[1] && (
                    <div
                      onClick={() => onToast(`Rank #2: @${worldRankings[1].username} · ${worldRankings[1].shadowStatus}`, 'sparkles')}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer hover:scale-[1.02] ${
                        isDarkTheme
                          ? 'bg-white/[0.03] border-slate-400/30'
                          : 'bg-[#FAFAFA] border-[#EFEFEF] shadow-xs'
                      }`}
                    >
                      <span className={`text-[10px] font-black block mb-1 ${isDarkTheme ? 'text-slate-300' : 'text-[#737373]'}`}>
                        🥈 #2 Silver
                      </span>
                      <div
                        className="w-11 h-11 rounded-full mx-auto flex items-center justify-center text-white text-lg font-bold mb-1.5 shadow-sm ring-2 ring-slate-300"
                        style={{ backgroundColor: worldRankings[1].avatarBg }}
                      >
                        {worldRankings[1].avatarSymbol}
                      </div>
                      <span className={`text-xs font-bold block truncate ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                        {worldRankings[1].name}
                      </span>
                      <span className="text-[10.5px] font-extrabold text-[#E1306C] block truncate">
                        @{worldRankings[1].username}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyId(worldRankings[1].shadowId);
                        }}
                        className={`text-[9.5px] font-mono mt-1 block truncate mx-auto ${isDarkTheme ? 'text-slate-400 hover:text-white' : 'text-[#8E8E8E] hover:text-[#262626]'}`}
                      >
                        {worldRankings[1].shadowId}
                      </button>
                      <span className={`text-[10px] font-black block mt-1 ${isDarkTheme ? 'text-slate-300' : 'text-[#262626]'}`}>
                        {(worldRankings[1].reputation / 1000).toFixed(1)}k REP
                      </span>
                    </div>
                  )}

                  {/* #1 David Chen (Gold Centerpiece) */}
                  {worldRankings[0] && (
                    <div
                      onClick={() => onToast(`Rank #1: @${worldRankings[0].username} · ${worldRankings[0].shadowStatus}`, 'sparkles')}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer hover:scale-[1.02] -mt-2 ${
                        isDarkTheme
                          ? 'bg-gradient-to-b from-amber-500/15 via-[#1E1C28] to-[#141420] border-amber-500/50 ring-1 ring-amber-500/30 shadow-xl'
                          : 'bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30 border-amber-300 shadow-sm ring-1 ring-amber-200'
                      }`}
                    >
                      <span className="text-[10px] font-black text-amber-600 block mb-1">
                        👑 #1 Gold
                      </span>
                      <div
                        className="w-13 h-13 rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold mb-1.5 shadow-md ring-3 ring-amber-400"
                        style={{ backgroundColor: worldRankings[0].avatarBg }}
                      >
                        {worldRankings[0].avatarSymbol}
                      </div>
                      <span className={`text-xs font-black block truncate ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                        {worldRankings[0].name}
                      </span>
                      <span className="text-[11px] font-extrabold text-amber-600 block truncate">
                        @{worldRankings[0].username}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyId(worldRankings[0].shadowId);
                        }}
                        className={`text-[9.5px] font-mono mt-1 block truncate mx-auto ${isDarkTheme ? 'text-slate-400 hover:text-amber-300' : 'text-[#8E8E8E] hover:text-[#262626]'}`}
                      >
                        {worldRankings[0].shadowId}
                      </button>
                      <span className="text-[10.5px] font-black text-amber-600 block mt-1">
                        {(worldRankings[0].reputation / 1000).toFixed(1)}k REP
                      </span>
                    </div>
                  )}

                  {/* #3 Jin-Woo Park (Bronze) */}
                  {worldRankings[2] && (
                    <div
                      onClick={() => onToast(`Rank #3: @${worldRankings[2].username} · ${worldRankings[2].shadowStatus}`, 'sparkles')}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer hover:scale-[1.02] ${
                        isDarkTheme
                          ? 'bg-white/[0.03] border-amber-700/30'
                          : 'bg-[#FAFAFA] border-[#EFEFEF] shadow-xs'
                      }`}
                    >
                      <span className="text-[10px] font-black text-amber-700 block mb-1">
                        🥉 #3 Bronze
                      </span>
                      <div
                        className="w-11 h-11 rounded-full mx-auto flex items-center justify-center text-white text-lg font-bold mb-1.5 shadow-sm ring-2 ring-amber-600/40"
                        style={{ backgroundColor: worldRankings[2].avatarBg }}
                      >
                        {worldRankings[2].avatarSymbol}
                      </div>
                      <span className={`text-xs font-bold block truncate ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                        {worldRankings[2].name}
                      </span>
                      <span className="text-[10.5px] font-extrabold text-[#E1306C] block truncate">
                        @{worldRankings[2].username}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyId(worldRankings[2].shadowId);
                        }}
                        className={`text-[9.5px] font-mono mt-1 block truncate mx-auto ${isDarkTheme ? 'text-slate-400 hover:text-white' : 'text-[#8E8E8E] hover:text-[#262626]'}`}
                      >
                        {worldRankings[2].shadowId}
                      </button>
                      <span className="text-[10px] font-black text-amber-700 block mt-1">
                        {(worldRankings[2].reputation / 1000).toFixed(1)}k REP
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* C. LOADING SKELETONS DURING ASYNC SYNC */}
            {isFetchingRankings && (
              <div className="space-y-3 py-1">
                {[1, 2, 3].map((sk) => (
                  <div
                    key={sk}
                    className={`p-4 rounded-[24px] border animate-pulse ${
                      isDarkTheme ? 'bg-[#121422] border-white/5' : 'bg-[#FFFFFF] border-[#EFEFEF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${isDarkTheme ? 'bg-white/10' : 'bg-slate-100'}`} />
                      <div className="flex-1 space-y-2">
                        <div className={`w-1/3 h-3.5 rounded ${isDarkTheme ? 'bg-white/10' : 'bg-slate-100'}`} />
                        <div className={`w-1/4 h-2.5 rounded ${isDarkTheme ? 'bg-white/10' : 'bg-slate-100'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* D. CONCEPT UI RANKING CARDS LIST (Clean White Editorial Style) */}
            {!isFetchingRankings && (
              <div className="space-y-3">
                {filteredRankings.length === 0 ? (
                  <div
                    className={`p-8 rounded-[24px] border text-center ${
                      isDarkTheme ? 'bg-[#121422] border-white/10' : 'bg-[#FFFFFF] border-[#EFEFEF]'
                    }`}
                  >
                    <Crown size={32} className="mx-auto text-slate-400 mb-2 opacity-50" />
                    <h3 className={`text-sm font-bold ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                      No Node Operators Match Your Query
                    </h3>
                    <p className={`text-xs mt-1 max-w-xs mx-auto ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
                      Try adjusting the search query or selecting ALL from the rank filter pills.
                    </p>
                  </div>
                ) : (
                  filteredRankings.map((user) => {
                    return (
                      <div
                        key={user.id}
                        className={`relative rounded-[24px] p-4 border transition-all hover:border-pink-300 ${
                          isDarkTheme
                            ? 'bg-[#121422] border-white/10 shadow-black/40'
                            : 'bg-[#FFFFFF] border-[#EFEFEF] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
                        }`}
                      >
                        {/* Specular Top Rim */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none"
                        />

                        {/* Top Meta Bar: Global Position Badge & Shadow Rank Callout Bar */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {/* Global Position Metallic Pill */}
                            <span
                              className={`text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                                user.rankPosition === 1
                                  ? 'bg-amber-100/70 text-amber-800 border border-amber-300'
                                  : user.rankPosition === 2
                                  ? 'bg-slate-100 text-slate-700 border border-slate-300'
                                  : user.rankPosition === 3
                                  ? 'bg-amber-50 text-amber-800 border border-amber-300'
                                  : isDarkTheme
                                  ? 'bg-white/5 text-slate-300 border border-white/10'
                                  : 'bg-[#FAFAFA] text-[#262626] border border-[#EFEFEF]'
                              }`}
                            >
                              {user.rankPosition === 1 && '👑'}
                              {user.rankPosition === 2 && '🥈'}
                              {user.rankPosition === 3 && '🥉'}
                              <span>#{user.rankPosition}</span>
                            </span>

                            {/* Shadow Status Rank Callout Bar */}
                            <span className={`text-[10.5px] font-bold ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
                              RANK: <span className="text-[#E1306C] font-extrabold">{user.shadowRank}</span> · {user.shadowStatus}
                            </span>
                          </div>

                          <span className={`text-[10px] font-mono uppercase tracking-wider ${isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E]'}`}>
                            {user.tierLevel}
                          </span>
                        </div>

                        {/* Creator Row: Avatar, Username, Location & Follow Button */}
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Circular Avatar */}
                            <div className="relative shrink-0">
                              <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-sm"
                                style={{ backgroundColor: user.avatarBg }}
                              >
                                {user.avatarSymbol}
                              </div>
                              {user.isVerified && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 backdrop-blur-md flex items-center justify-center text-emerald-500">
                                  <ShieldCheck size={10} className="fill-emerald-500/20 text-emerald-500" />
                                </div>
                              )}
                            </div>

                            {/* Name, @username & Location */}
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h4 className={`text-xs font-black truncate ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                                  {user.name}
                                </h4>
                              </div>
                              <span className="text-xs font-black text-[#E1306C] block truncate">
                                @{user.username}
                              </span>
                              <div className={`flex items-center gap-1 text-[10.5px] mt-0.5 ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
                                <span>{user.flag}</span>
                                <span className="truncate">{user.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Interactive Follow / Following Toggle Button */}
                          <button
                            onClick={() => handleToggleFollowRanking(user.id)}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10.5px] font-bold border transition-all cursor-pointer active:scale-95 shrink-0 ${
                              user.isFollowing
                                ? isDarkTheme
                                  ? 'bg-white/10 border-white/20 text-emerald-400'
                                  : 'bg-[#FAFAFA] border-[#E0E0E0] text-[#262626]'
                                : 'bg-[#262626] border-[#262626] text-white shadow-xs hover:opacity-90'
                            }`}
                          >
                            {user.isFollowing ? (
                              <>
                                <UserCheck size={11} />
                                <span>Following</span>
                              </>
                            ) : (
                              <>
                                <UserPlus size={11} />
                                <span>Follow</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Dedicated Shadow ID Capsule on Every Card */}
                        <div className="mb-3">
                          <button
                            onClick={() => handleCopyId(user.shadowId)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-[11px] font-mono transition-all cursor-pointer active:scale-95 ${
                              isDarkTheme
                                ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                : 'bg-[#FAFAFA] border-[#EFEFEF] text-[#262626] hover:bg-[#F2F2F2]'
                            }`}
                            title="Click to copy Shadow ID"
                          >
                            <span className="text-[#E1306C] font-extrabold text-[10px]">ID:</span>
                            <span>{user.shadowId}</span>
                            <Copy size={11} className={isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E] ml-0.5'} />
                          </button>
                        </div>

                        {/* Status Quote */}
                        <p className={`text-xs leading-relaxed mb-3 ${isDarkTheme ? 'text-slate-300' : 'text-[#737373]'}`}>
                          "{user.statusQuote}"
                        </p>

                        {/* Protocol Metrics & Interactive Cheer Heart Reaction */}
                        <div className={`flex items-center justify-between pt-2.5 border-t ${isDarkTheme ? 'border-white/5' : 'border-[#EFEFEF]'}`}>
                          {/* Protocol Metrics Pills */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-mono font-black ${
                              isDarkTheme ? 'bg-pink-500/15 border border-pink-500/30 text-pink-400' : 'bg-[#FFF0F3] border border-pink-200 text-[#E1306C]'
                            }`}>
                              <span>{user.reputation.toLocaleString()} REP</span>
                            </div>

                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-bold ${
                              isDarkTheme ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400' : 'bg-[#FFFBEB] border border-amber-200 text-[#D97706]'
                            }`}>
                              <Flame size={11} className="fill-[#FF8500] text-[#FF8500]" />
                              <span>{user.streakDays}d Streak</span>
                            </div>

                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-bold hidden sm:inline-flex ${
                              isDarkTheme ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400' : 'bg-[#F0F9FF] border border-sky-200 text-[#0284C7]'
                            }`}>
                              <Radio size={10} />
                              <span>{user.nodesActive} Nodes</span>
                            </div>
                          </div>

                          {/* Interactive Cheer Button with Animated Heart Reactions */}
                          <button
                            onClick={() => handleToggleCheerRanking(user.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer active:scale-95 ${
                              user.hasCheered
                                ? isDarkTheme
                                  ? 'bg-pink-500/20 border-pink-500/50 text-[#FF2A55] shadow-sm'
                                  : 'bg-[#FFF0F3] border-pink-200 text-[#ED4956] shadow-xs'
                                : isDarkTheme
                                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                                : 'bg-[#FAFAFA] hover:bg-[#F2F2F2] border-[#EFEFEF] text-[#262626]'
                            }`}
                            title="Cheer for this operator"
                          >
                            <Heart
                              size={13}
                              className={`transition-transform ${
                                user.hasCheered
                                  ? 'fill-[#ED4956] text-[#ED4956] scale-110 animate-bounce'
                                  : isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E]'
                              }`}
                            />
                            <span>{user.cheerCount}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* 6. TAB 2, 3, 4: LIVE RANK UPGRADES ACTIVITY FEEDS         */}
        {/* World Upgrades | Following | All                         */}
        {/* ======================================================== */}
        {activeMainTab !== 'rankings' && (
          <div className="space-y-3">
            {filteredUpgrades.length === 0 ? (
              <div
                className={`p-8 rounded-[24px] border text-center ${
                  isDarkTheme ? 'bg-[#121422] border-white/10' : 'bg-[#FFFFFF] border-[#EFEFEF]'
                }`}
              >
                <Users size={32} className="mx-auto text-slate-400 mb-2 opacity-50" />
                <h3 className={`text-sm font-bold ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                  {activeMainTab === 'following'
                    ? 'No Upgrades From Followed Creators Yet'
                    : 'No Upgrades Match Your Filter'}
                </h3>
                <p className={`text-xs mt-1 max-w-xs mx-auto ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
                  {activeMainTab === 'following'
                    ? 'Follow creators from the World Rankings or Upgrades feed to track their rank promotions in real time.'
                    : 'Try clearing your search query or selecting a different rank tier.'}
                </p>
                {activeMainTab === 'following' && (
                  <button
                    onClick={() => setActiveMainTab('world')}
                    className="mt-3 px-4 py-1.5 rounded-full bg-[#E1306C] text-white text-xs font-bold shadow-md cursor-pointer hover:opacity-95"
                  >
                    Explore World Feed
                  </button>
                )}
              </div>
            ) : (
              filteredUpgrades.map((person) => {
                const toMeta = getRankMeta(person.toRank);
                const fromMeta = getRankMeta(person.fromRank);

                return (
                  <div
                    key={person.id}
                    className={`p-4 rounded-[24px] border transition-all hover:border-pink-300 ${
                      isDarkTheme
                        ? 'bg-[#121422] border-white/10 shadow-black/40'
                        : 'bg-[#FFFFFF] border-[#EFEFEF] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
                    }`}
                  >
                    {/* Card Header: Creator Row & Follow Toggle */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm shrink-0"
                          style={{ backgroundColor: person.avatarBg }}
                        >
                          <span>{person.avatarSymbol}</span>
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className={`text-xs font-black truncate ${isDarkTheme ? 'text-white' : 'text-[#262626]'}`}>
                              {person.name}
                            </h4>
                            {person.isVerified && (
                              <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
                            )}
                          </div>
                          <div className={`flex items-center gap-1 text-[11px] ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
                            <span className="text-[#E1306C] font-bold">@{person.username}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <span>{person.flag}</span>
                              <span className="truncate">{person.location}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Follow / Following Toggle */}
                      <button
                        onClick={() => handleToggleFollowUpgrade(person.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10.5px] font-bold border transition-all cursor-pointer active:scale-95 shrink-0 ${
                          person.isFollowing
                            ? isDarkTheme
                              ? 'bg-white/10 border-white/20 text-emerald-400'
                              : 'bg-[#FAFAFA] border-[#E0E0E0] text-[#262626]'
                            : 'bg-[#262626] border-[#262626] text-white shadow-xs hover:opacity-90'
                        }`}
                      >
                        {person.isFollowing ? (
                          <>
                            <UserCheck size={11} />
                            <span>Following</span>
                          </>
                        ) : (
                          <>
                            <UserPlus size={11} />
                            <span>Follow</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Rank Evolution Pill: PAWN ➔ KNIGHT */}
                    <div
                      className={`p-2.5 rounded-2xl border mb-3 flex items-center justify-between ${
                        isDarkTheme ? 'bg-white/[0.03] border-white/5' : 'bg-[#FAFAFA] border-[#EFEFEF]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-base select-none">{fromMeta.symbol}</span>
                        <span className={`text-xs font-bold ${isDarkTheme ? 'text-slate-400' : 'text-[#737373]'}`}>
                          {person.fromRank}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[#E1306C]">
                        <ArrowRight size={14} className="animate-pulse" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-base select-none">{toMeta.symbol}</span>
                        <span
                          className="text-xs font-black uppercase px-2 py-0.5 rounded-full text-white shadow-xs"
                          style={{
                            background: 'linear-gradient(135deg, #E1306C 0%, #C13584 100%)',
                          }}
                        >
                          {person.toRank}
                        </span>
                        <span className={`text-[10px] font-mono ${isDarkTheme ? 'text-slate-400' : 'text-[#8E8E8E]'}`}>
                          ({person.toTier})
                        </span>
                      </div>
                    </div>

                    {/* Achievement Summary */}
                    <p className={`text-xs leading-relaxed mb-3 ${isDarkTheme ? 'text-slate-300' : 'text-[#737373]'}`}>
                      {person.achievementSummary}
                    </p>

                    {/* Card Footer: Streak Days, Rep Gained, & Congratulate Button */}
                    <div className={`flex items-center justify-between pt-2 border-t ${isDarkTheme ? 'border-white/5' : 'border-[#EFEFEF]'}`}>
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-bold ${
                          isDarkTheme ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400' : 'bg-[#FFFBEB] border border-amber-200 text-[#D97706]'
                        }`}>
                          <Flame size={12} className="fill-[#FF8500] text-[#FF8500]" />
                          <span>{person.streakDays}d Streak</span>
                        </div>

                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-mono font-bold ${
                          isDarkTheme ? 'bg-pink-500/15 border border-pink-500/30 text-pink-400' : 'bg-[#FFF0F3] border border-pink-200 text-[#E1306C]'
                        }`}>
                          <span>+{person.repGained} REP</span>
                        </div>
                      </div>

                      {/* Interactive Congratulate / Cheer Button */}
                      <button
                        onClick={() => handleToggleCongratulate(person.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer active:scale-95 ${
                          person.hasCongratulated
                            ? isDarkTheme
                              ? 'bg-pink-500/20 border-pink-500/50 text-pink-400 shadow-sm'
                              : 'bg-[#FFF0F3] border-pink-200 text-[#E1306C] shadow-xs'
                            : isDarkTheme
                            ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                            : 'bg-[#FAFAFA] hover:bg-[#F2F2F2] border-[#EFEFEF] text-[#262626]'
                        }`}
                        title="Cheer and congratulate on rank promotion"
                      >
                        <span className={person.hasCongratulated ? 'animate-bounce' : ''}>🎉</span>
                        <span>{person.congratsCount}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

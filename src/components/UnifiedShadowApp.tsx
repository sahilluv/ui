import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  Plus,
  Send,
  Grid,
  Bookmark,
  Tv,
  ShoppingBag,
  Moon,
  Sun,
  X,
  Play,
  Pause,
  Check,
  LogOut,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Copy,
  Layers,
  Sparkles,
  Volume2,
  VolumeX,
  Camera,
  Music,
  Disc,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Bell,
} from 'lucide-react';
import { PawnRankBadge, ShadowRankType } from './PawnRankBadge';
import { ReelCommentsDrawer } from './ReelCommentsDrawer';
import { PullUpRefresh } from './PullUpRefresh';
import { MyShadowScreen } from './MyShadowScreen';
import { darkColors, lightColors, shadowGradients, ThemeColors } from '../../expo-code/src/theme';

export type UnifiedTab = 'home' | 'explore' | 'reels' | 'create' | 'notifications' | 'profile';

export interface FeedPost {
  id: string;
  authorName: string;
  username: string;
  avatarGradient: [string, string, ...string[]];
  timeAgo: string;
  imageGradient: [string, string, ...string[]];
  content: string;
  captionTitle?: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

const INITIAL_STORIES = [
  { id: 'user_story', username: 'Your story', isCurrentUser: true, gradient: ['#FF0A78', '#991BEA', '#7928CA'] },
  { id: 's1', username: 'Ezequias', gradient: ['#FF6B4A', '#FF3366', '#C026D3'] },
  { id: 's2', username: 'Alice_002', gradient: ['#C026D3', '#7928CA', '#3B82F6'] },
  { id: 's3', username: 'Paulette_R', gradient: ['#FF2D55', '#B026FF', '#4F46E5'] },
  { id: 's4', username: 'Carlos_v', gradient: ['#06B6D4', '#3B82F6', '#6366F1'] },
];

const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post_1',
    authorName: 'Maoo Lopez',
    username: 'maoo.lopez',
    avatarGradient: ['#FF0A78', '#991BEA', '#6366F1'],
    timeAgo: '20m ago',
    imageGradient: ['#4E137D', '#791DA6', '#C724B1', '#FF3B8A'],
    content: 'This photomanipulation inspired by generative biology and organic surrealism. What do you think of this color palette?',
    captionTitle: 'SACRIFICE | VIRUS',
    likesCount: 4558,
    commentsCount: 300,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'post_2',
    authorName: 'Eliott Johnson',
    username: 'eliott.j',
    avatarGradient: ['#6366F1', '#8B5CF6', '#EC4899'],
    timeAgo: '2h ago',
    imageGradient: ['#7A58E6', '#B77DE8', '#F5A7C4', '#FCD5B5'],
    content: 'Central campus library west wing is open 24/7 during finals sprint. Plenty of charging stations on the 3rd floor!',
    captionTitle: 'CAMPUS SPACES',
    likesCount: 2420,
    commentsCount: 175,
    isLiked: true,
    isSaved: true,
  },
  {
    id: 'post_3',
    authorName: 'Sofia Reyes',
    username: 'sofia.design',
    avatarGradient: ['#06B6D4', '#3B82F6', '#6366F1'],
    timeAgo: '4h ago',
    imageGradient: ['#0A3A40', '#0E626B', '#13928E', '#20C997'],
    content: 'Looking for 2 UI developers for our upcoming inter-college hackathon build. Drop a comment if interested!',
    captionTitle: 'HACKATHON COLLAB',
    likesCount: 1890,
    commentsCount: 94,
    isLiked: false,
    isSaved: false,
  },
];

const EXPLORE_CATEGORIES = [
  { id: 'igtv', title: 'IGTV', icon: Tv, gradient: ['#7928CA', '#A855F7', '#C084FC'] },
  { id: 'campus', title: 'CAMPUS', icon: ShoppingBag, gradient: ['#EC4899', '#F43F5E', '#FB7185'] },
  { id: 'viajes', title: 'TRAVEL', icon: Sparkles, gradient: ['#06B6D4', '#0EA5E9', '#3B82F6'] },
  { id: 'wellness', title: 'WELLNESS', icon: Heart, gradient: ['#F97316', '#FB923C', '#F43F5E'] },
];

const EXPLORE_CARDS = [
  { id: 'm1', height: 210, gradient: ['#283344', '#1A222E', '#0E131A'], title: 'Deep Obsidian' },
  { id: 'm2', height: 140, gradient: ['#581C87', '#7E22CE', '#9333EA'], title: 'Midnight Ultraviolet' },
  { id: 'm3', height: 160, gradient: ['#1E1B4B', '#312E81', '#4338CA'], title: 'Electric Indigo' },
  { id: 'm4', height: 230, gradient: ['#0E7490', '#155E75', '#083344'], title: 'Teal Study #04' },
  { id: 'm5', height: 150, gradient: ['#7A58E6', '#B77DE8', '#F5A7C4'], title: 'Pastel Sunrise' },
  { id: 'm6', height: 180, gradient: ['#4E137D', '#791DA6', '#C724B1'], title: 'Neon Bloom' },
];

export interface ReelData {
  id: string;
  author: string;
  username: string;
  location: string;
  gradient: string[];
  likes: string;
  likesCount: number;
  comments: string;
  commentsCount: number;
  bookmarksCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isFollowing?: boolean;
  caption: string;
  tags: string[];
  audioTrack: string;
  avatarGradient: string[];
}

const REELS_DATA: ReelData[] = [
  {
    id: 'reel_1',
    author: 'Eliott Johnson',
    username: 'eliott.j',
    location: 'Madrid, Spain',
    gradient: ['#796A9E', '#AA86B7', '#DCAABF', '#F4CCD8'],
    likes: '2.4k',
    likesCount: 2400,
    comments: '175',
    commentsCount: 175,
    bookmarksCount: 89,
    isLiked: true,
    isSaved: false,
    isFollowing: true,
    caption: 'Architectural Brutalism & sunset reflections across Madrid 🏛️✨',
    tags: ['#campus', '#architecture', '#design', '#madrid'],
    audioTrack: 'Eliott Johnson • Sunset Echoes (Original Audio)',
    avatarGradient: ['#3A3B4D', '#2B2C3B', '#1E1F2A'],
  },
  {
    id: 'reel_2',
    author: 'Christian Lue',
    username: 'christian.lue',
    location: 'Ghent, Belgium',
    gradient: ['#1A2B4C', '#2C4A7A', '#4A72B0', '#7AA5E0'],
    likes: '3.8k',
    likesCount: 3820,
    comments: '290',
    commentsCount: 290,
    bookmarksCount: 142,
    isLiked: false,
    isSaved: true,
    isFollowing: false,
    caption: 'Late night design studio session in Ghent ☕️💻 Crafting new Shadow interactions',
    tags: ['#creativestudio', '#shadowapp', '#nightshift'],
    audioTrack: 'Lofi Beats • Studio Chill Vol. 3',
    avatarGradient: ['#1B2A4A', '#283E6B', '#3B5998'],
  },
  {
    id: 'reel_3',
    author: 'Sofia Martinez',
    username: 'sofia.mtz',
    location: 'Tokyo, Japan',
    gradient: ['#1A365D', '#2B6CB0', '#4299E1', '#90CDF4'],
    likes: '5.1k',
    likesCount: 5120,
    comments: '412',
    commentsCount: 412,
    bookmarksCount: 320,
    isLiked: false,
    isSaved: false,
    isFollowing: true,
    caption: 'Neon reflections across Shibuya crossing under midnight rain 🌧️⚡️',
    tags: ['#tokyo', '#cyberpunk', '#streetphotography'],
    audioTrack: 'Sofia Martinez • Tokyo Rain (Ambient Mix)',
    avatarGradient: ['#1A2536', '#131C2A', '#0D1420'],
  },
  {
    id: 'reel_4',
    author: 'Mauricio Lopez',
    username: 'mauricio.lopez',
    location: 'Valencia, Spain',
    gradient: ['#4E137D', '#791DA6', '#C724B1', '#FF3B8A'],
    likes: '4.2k',
    likesCount: 4210,
    comments: '330',
    commentsCount: 330,
    bookmarksCount: 195,
    isLiked: true,
    isSaved: true,
    isFollowing: false,
    caption: 'Shadow Dynamic Lighting & Concept Component System preview 🔮🎨',
    tags: ['#shadowcampus', '#uidesign', '#minimalism'],
    audioTrack: 'Mauricio Lopez • Shadow Pulse',
    avatarGradient: ['#FF0A78', '#991BEA', '#6366F1'],
  },
];

const NOTIFICATIONS_DATA = [
  {
    id: 'n1',
    user: 'Elena Rostova',
    username: 'elena.art',
    gradient: ['#EC4899', '#F43F5E', '#FB7185'],
    action: 'liked your post "SACRIFICE | VIRUS"',
    time: '5m ago',
    unread: true,
  },
  {
    id: 'n2',
    user: 'Carlos Valenzuela',
    username: 'carlos_v',
    gradient: ['#06B6D4', '#3B82F6', '#6366F1'],
    action: 'commented: "The color palette and composition are incredible 🔥"',
    time: '23m ago',
    unread: true,
  },
  {
    id: 'n3',
    user: 'Sofia Mendez',
    username: 'sofia_art',
    gradient: ['#F59E0B', '#D97706', '#78350F'],
    action: 'started following you.',
    time: '2h ago',
    unread: false,
  },
];

interface UnifiedShadowAppProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const UnifiedShadowApp: React.FC<UnifiedShadowAppProps> = ({
  isDark,
  onToggleTheme,
}) => {
  const colors = isDark ? darkColors : lightColors;

  // Active screen tab
  const [currentTab, setCurrentTab] = useState<UnifiedTab>('home');
  const [isViewingMyShadow, setIsViewingMyShadow] = useState(false);

  const handleTabChange = (tab: UnifiedTab) => {
    setIsViewingMyShadow(false);
    setCurrentTab(tab);
  };

  // Transparent Offline-First Cache for Unified Feed & Reels
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem('unified_shadow_feed_v1');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch (_e) {
      // Ignore
    }
    return INITIAL_FEED_POSTS;
  });

  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  const [reels, setReels] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem('unified_shadow_reels_v1');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch (_e) {
      // Ignore
    }
    return REELS_DATA;
  });

  // Background persistence
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('unified_shadow_feed_v1', JSON.stringify(feedPosts));
      }
    } catch (_e) {
      // Ignore
    }
  }, [feedPosts]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('unified_shadow_reels_v1', JSON.stringify(reels));
      }
    } catch (_e) {
      // Ignore
    }
  }, [reels]);

  // Transparent background revalidation
  useEffect(() => {
    const revalidate = async () => {
      try {
        await fetch('/api/feed');
        await fetch('/api/reels');
      } catch (_e) {
        // Silently handled: offline-first cache continues serving
      }
    };
    void revalidate();
    window.addEventListener('online', revalidate);
    return () => window.removeEventListener('online', revalidate);
  }, []);

  // Authenticated User State (Real Shadow Identity)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: 'Mauricio Lopez',
    username: 'maoo.lopez',
    email: 'mauricio@shadow.campus',
    bio: 'Visual Designer & Photography - Campus Community',
    shadowId: 'sh_89f02a91',
    shadowRank: 'PAWN' as ShadowRankType,
    verification: 'VERIFIED',
    postsCount: 12,
    followersCount: 876,
    followingCount: 568,
  });

  // Create Post Form State
  const [createTitle, setCreateTitle] = useState('');
  const [createBody, setCreateBody] = useState('');
  const [selectedGradientIndex, setSelectedGradientIndex] = useState(0);

  // Share & Comments Modals
  const [selectedSharePost, setSelectedSharePost] = useState<FeedPost | null>(null);
  const [activeReelComments, setActiveReelComments] = useState<any | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToastMsg(text);
    setTimeout(() => setToastMsg(null), 2400);
  };

  const handleToggleLike = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likesCount: nextLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1),
          };
        }
        return p;
      })
    );
  };

  // Scroll-Responsive Bottom Navigation State
  const [isCompactNav, setIsCompactNav] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [pausedReels, setPausedReels] = useState<Record<string, boolean>>({});
  const [heartPopReelId, setHeartPopReelId] = useState<string | null>(null);

  const reelsScrollRef = useRef<HTMLDivElement>(null);
  const feedScrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevFeedScrollTop = useRef(0);
  const prevReelsScrollTop = useRef(0);

  const handleFeedScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const diff = scrollTop - prevFeedScrollTop.current;

    if (scrollTop <= 15) {
      setIsCompactNav(false);
    } else if (diff > 4) {
      setIsCompactNav(true);
    } else if (diff < -4) {
      // Smoothly restore full size when scrolling up
      setIsCompactNav(false);
    }

    prevFeedScrollTop.current = scrollTop;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsCompactNav(false);
    }, 1000);
  };

  const handleReelsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const diff = scrollTop - prevReelsScrollTop.current;

    if (scrollTop <= 15) {
      setIsCompactNav(false);
    } else if (diff > 4) {
      setIsCompactNav(true);
    } else if (diff < -4) {
      // Smoothly restore full size when scrolling up
      setIsCompactNav(false);
    }

    prevReelsScrollTop.current = scrollTop;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsCompactNav(false);
    }, 1000);
  };

  // Horizontal swipe-to-navigate in Reels view (Swipe Left -> Profile, Swipe Right -> Feed)
  const [reelSwipeStartX, setReelSwipeStartX] = useState<number | null>(null);
  const [reelSwipeStartY, setReelSwipeStartY] = useState<number | null>(null);
  const [reelSwipeDeltaX, setReelSwipeDeltaX] = useState<number>(0);
  const [isSwipingReels, setIsSwipingReels] = useState(false);

  const handleReelsTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if ('button' in e && e.button !== 0) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setReelSwipeStartX(clientX);
    setReelSwipeStartY(clientY);
    setReelSwipeDeltaX(0);
    setIsSwipingReels(true);
  };

  const handleReelsTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwipingReels || reelSwipeStartX === null || reelSwipeStartY === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diffX = clientX - reelSwipeStartX;
    const diffY = clientY - reelSwipeStartY;

    // Engaged when horizontal movement is greater than vertical movement
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
      setReelSwipeDeltaX(diffX);
    }
  };

  const handleReelsTouchEnd = () => {
    if (!isSwipingReels) return;
    setIsSwipingReels(false);

    // If swipe threshold passed (> 50px)
    if (reelSwipeDeltaX < -50) {
      // SWIPE LEFT: Navigate to Profile page
      showToast('Swiped to Profile');
      setCurrentTab('profile');
    } else if (reelSwipeDeltaX > 50) {
      // SWIPE RIGHT: Return to Feed
      showToast('Returned to Feed');
      setCurrentTab('home');
    }

    setReelSwipeDeltaX(0);
    setReelSwipeStartX(null);
    setReelSwipeStartY(null);
  };

  const handleToggleReelLike = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) =>
        r.id === reelId
          ? {
              ...r,
              isLiked: !r.isLiked,
              likesCount: r.isLiked ? r.likesCount - 1 : r.likesCount + 1,
            }
          : r
      )
    );
  };

  const handleToggleReelSave = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const nextSaved = !r.isSaved;
          showToast(nextSaved ? 'Saved Reel to your collection' : 'Removed Reel from saved');
          return {
            ...r,
            isSaved: nextSaved,
            bookmarksCount: nextSaved ? r.bookmarksCount + 1 : Math.max(0, r.bookmarksCount - 1),
          };
        }
        return r;
      })
    );
  };

  const handleToggleFollow = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const nextFollow = !r.isFollowing;
          showToast(nextFollow ? `Following ${r.author}` : `Unfollowed ${r.author}`);
          return { ...r, isFollowing: nextFollow };
        }
        return r;
      })
    );
  };

  const handleReelDoubleClick = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => (r.id === reelId && !r.isLiked ? { ...r, isLiked: true, likesCount: r.likesCount + 1 } : r))
    );
    setHeartPopReelId(reelId);
    setTimeout(() => setHeartPopReelId(null), 900);
  };

  const handleTogglePlayPause = (reelId: string) => {
    setPausedReels((prev) => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createBody.trim() && !createTitle.trim()) {
      showToast('Please write something to post.');
      return;
    }

    const gradientPresets = [
      shadowGradients.mainFeed,
      shadowGradients.softPastel,
      shadowGradients.deepMoody,
      shadowGradients.tealCyan,
      shadowGradients.warmBronze,
    ];

    const newPost: FeedPost = {
      id: `post_${Date.now()}`,
      authorName: currentUser.name,
      username: currentUser.name.toLowerCase().replace(/\s+/g, '.'),
      avatarGradient: ['#FF0A78', '#991BEA', '#6366F1'],
      timeAgo: 'Just now',
      imageGradient: gradientPresets[selectedGradientIndex] as any,
      content: createBody.trim() || 'Shared via Shadow Mobile',
      captionTitle: createTitle.trim() || 'NEW POST',
      likesCount: 1,
      commentsCount: 0,
      isLiked: true,
      isSaved: false,
    };

    setFeedPosts([newPost, ...feedPosts]);
    setCurrentUser((prev) => ({ ...prev, postsCount: prev.postsCount + 1 }));
    setCreateTitle('');
    setCreateBody('');
    setCurrentTab('home');
    showToast('Successfully posted to Shadow feed!');
  };

  const unreadNotifsCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="w-full flex justify-center py-4 px-2 sm:px-4">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 z-50 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-2xl animate-fade-in flex items-center gap-2">
          <Sparkles size={14} />
          {toastMsg}
        </div>
      )}

      {/* Concept Phone Frame */}
      <div
        className="w-full max-w-[420px] min-h-[780px] h-[830px] rounded-[52px] p-3 shadow-[0_25px_65px_-15px_rgba(0,0,0,0.85)] border-[7px] border-[#25283D] flex flex-col relative overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: isDark ? '#080910' : '#E2E5EE' }}
      >
        {/* Dynamic Island Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#05060A] rounded-full z-40 flex items-center justify-center pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#181926] mr-3" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#10111A]" />
        </div>

        {/* Chassis Screen Content */}
        <div
          className="flex-1 rounded-[42px] overflow-hidden flex flex-col relative transition-colors duration-300"
          style={{ backgroundColor: colors.background, color: colors.text }}
        >
          {/* Status Bar */}
          <div
            className={`h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-bold select-none shrink-0 z-40 transition-colors ${
              currentTab === 'reels' ? 'absolute top-0 left-0 right-0 text-white pointer-events-none drop-shadow-md' : ''
            }`}
            style={{ color: currentTab === 'reels' ? '#FFFFFF' : colors.text }}
          >
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div
                className="w-5 h-2.5 border rounded-[3px] p-0.5 flex items-center"
                style={{ borderColor: colors.text }}
              >
                <div
                  className="w-full h-full rounded-[1px]"
                  style={{ backgroundColor: colors.text }}
                />
              </div>
            </div>
          </div>

          {/* MAIN SCREEN SWITCHER (For Home, Explore, Create, Notifications, Profile) */}
          <div
            ref={feedScrollRef}
            onScroll={handleFeedScroll}
            className="flex-1 overflow-y-auto no-scrollbar pb-20"
          >
            {isViewingMyShadow ? (
              <MyShadowScreen
                onBack={() => setIsViewingMyShadow(false)}
                isDark={isDark}
                currentUser={{
                  name: currentUser.name,
                  username: currentUser.username,
                  shadowId: currentUser.shadowId,
                  rank: currentUser.shadowRank,
                  isVerified: currentUser.verification === 'VERIFIED',
                  avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
                }}
                onToast={(msg) => showToast(msg)}
              />
            ) : (
              <>
            {/* 1. HOME SCREEN (Real Feed + Concept Stories & Visual PostCards) */}
            {currentTab === 'home' && (
              <div>
                {/* Concept Shadow Header with Cursive Wordmark */}
                <div
                  className="h-14 px-5 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md"
                  style={{ backgroundColor: colors.background + 'EE' }}
                >
                  {/* Left Action: Direct Shadow Navigation Tab Icon on Home Feed */}
                  <button
                    onClick={() => setIsViewingMyShadow(true)}
                    className="relative group p-0.5 rounded-full transition-transform active:scale-90 cursor-pointer"
                    title="My Shadow Dashboard"
                    aria-label="Open My Shadow directly from Home Feed"
                  >
                    <div
                      className="w-9 h-9 rounded-full p-[1.5px] shadow-md shadow-pink-500/25 flex items-center justify-center transition-all group-hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
                      }}
                    >
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center transition-colors"
                        style={{ backgroundColor: colors.background }}
                      >
                        <span className="text-sm font-bold text-pink-400">♙</span>
                      </div>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B0C14] shadow-xs" />
                  </button>

                  <h1
                    className="font-shadow-script text-3xl font-semibold tracking-wide select-none"
                    style={{ color: colors.text }}
                  >
                    Shadow
                  </h1>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onToggleTheme}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: colors.inputBackground }}
                    >
                      {isDark ? (
                        <Sun size={15} className="text-yellow-400" />
                      ) : (
                        <Moon size={15} className="text-purple-400" />
                      )}
                    </button>

                    <button
                      onClick={() => setCurrentTab('notifications')}
                      className="relative w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <Heart size={20} style={{ color: colors.text }} />
                      {unreadNotifsCount > 0 && (
                        <span
                          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border border-white"
                          style={{ backgroundColor: colors.badgeBackground }}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Concept Story Carousel */}
                <div className="py-2 px-4 border-b overflow-x-auto no-scrollbar flex items-center gap-3" style={{ borderColor: colors.border }}>
                  {INITIAL_STORIES.map((story) => (
                    <div
                      key={story.id}
                      className="flex flex-col items-center gap-1 shrink-0 cursor-pointer"
                      onClick={() => showToast(`Viewing story by ${story.username}`)}
                    >
                      <div
                        className="w-16 h-16 rounded-[20px] p-0.5 shadow-md flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${story.gradient.join(', ')})`,
                        }}
                      >
                        <div
                          className="w-full h-full rounded-[18px] p-0.5 flex items-center justify-center"
                          style={{ backgroundColor: colors.background }}
                        >
                          <div
                            className="w-full h-full rounded-[16px] flex items-center justify-center text-white text-xs font-bold"
                            style={{
                              background: `linear-gradient(135deg, ${story.gradient.join(', ')})`,
                            }}
                          >
                            {story.isCurrentUser ? '+' : story.username[0].toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium truncate w-16 text-center" style={{ color: colors.secondaryText }}>
                        {story.username}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Real Feed Posts Styled with Concept Cards */}
                <div className="p-4 space-y-5">
                  {feedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-3xl overflow-hidden shadow-lg border transition-all"
                      style={{
                        backgroundColor: colors.surface,
                        borderColor: colors.cardBorder,
                      }}
                    >
                      {/* Post Header */}
                      <div className="p-3.5 flex items-center justify-between">
                        <div
                          className="flex items-center gap-2.5 cursor-pointer"
                          onClick={() => setCurrentTab('profile')}
                        >
                          <div
                            className="w-9 h-9 rounded-[11px] p-0.5 flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${post.avatarGradient.join(', ')})`,
                            }}
                          >
                            <div
                              className="w-full h-full rounded-[9px] flex items-center justify-center text-white text-xs font-extrabold"
                              style={{
                                background: `linear-gradient(135deg, ${post.avatarGradient.join(', ')})`,
                              }}
                            >
                              {post.authorName[0]}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-bold block" style={{ color: colors.text }}>
                              {post.username}
                            </span>
                            <span className="text-[10px]" style={{ color: colors.secondaryText }}>
                              {post.timeAgo}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedSharePost(post)}
                          className="p-1.5 hover:opacity-75"
                          style={{ color: colors.text }}
                        >
                          <Send size={16} />
                        </button>
                      </div>

                      {/* Cinematic Gradient Media Card with Post Content */}
                      <div className="px-3">
                        <div
                          className="w-full h-64 rounded-2xl p-4 flex flex-col justify-end shadow-inner relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${post.imageGradient.join(', ')})`,
                          }}
                        >
                          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                            {post.captionTitle && (
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-300 block mb-1">
                                {post.captionTitle}
                              </span>
                            )}
                            <p className="text-xs text-white leading-relaxed font-medium">
                              {post.content}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Post Actions */}
                      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleLike(post.id)}
                            className="flex items-center gap-1 hover:scale-110 active:scale-95 transition-transform"
                          >
                            <Heart
                              size={20}
                              className={post.isLiked ? 'fill-[#FF2A55] text-[#FF2A55]' : ''}
                              style={{ color: post.isLiked ? '#FF2A55' : colors.text }}
                            />
                          </button>

                          <button
                            onClick={() => showToast('Opening post comments...')}
                            className="hover:scale-110 active:scale-95 transition-transform"
                          >
                            <MessageCircle size={20} style={{ color: colors.text }} />
                          </button>

                          <button
                            onClick={() => setSelectedSharePost(post)}
                            className="hover:scale-110 active:scale-95 transition-transform"
                          >
                            <Share2 size={19} style={{ color: colors.text }} />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            setFeedPosts((prev) =>
                              prev.map((p) =>
                                p.id === post.id ? { ...p, isSaved: !p.isSaved } : p
                              )
                            );
                            showToast(post.isSaved ? 'Removed from saved items' : 'Saved to your collection');
                          }}
                          className="hover:scale-110 active:scale-95 transition-transform"
                        >
                          <Bookmark
                            size={20}
                            className={post.isSaved ? 'fill-white' : ''}
                            style={{ color: colors.text }}
                          />
                        </button>
                      </div>

                      {/* Likes Count & Text */}
                      <div className="px-4 pb-3 pt-1">
                        <span className="text-xs font-bold block" style={{ color: colors.text }}>
                          {post.likesCount.toLocaleString()} likes
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pull Up to Refresh Feed */}
                <div className="pt-2 pb-4 flex justify-center">
                  <PullUpRefresh
                    onRefresh={async () => {
                      await new Promise((r) => setTimeout(r, 850));
                      showToast('Shadow feed synced with fresh updates!');
                    }}
                    isDark={isDark}
                    label="Pull up to refresh feed"
                  />
                </div>
              </div>
            )}

            {/* 2. EXPLORE SCREEN (Concept Asymmetric Grid) */}
            {currentTab === 'explore' && (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold" style={{ color: colors.text }}>
                    Explore
                  </h2>
                  <button
                    onClick={onToggleTheme}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.inputBackground }}
                  >
                    {isDark ? <Sun size={15} className="text-yellow-400" /> : <Moon size={15} />}
                  </button>
                </div>

                {/* Concept Search Bar */}
                <div
                  className="rounded-2xl px-3.5 py-2.5 flex items-center gap-2 border"
                  style={{ backgroundColor: colors.inputBackground, borderColor: colors.border }}
                >
                  <Search size={16} style={{ color: colors.secondaryText }} />
                  <input
                    type="text"
                    placeholder="Search creators, topics, or campus..."
                    className="w-full text-xs bg-transparent focus:outline-none placeholder:text-slate-400"
                    style={{ color: colors.text }}
                  />
                </div>

                {/* Categories */}
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                  {EXPLORE_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => showToast(`Filtering by ${cat.title}`)}
                        className="px-3 py-1.5 rounded-full border flex items-center gap-2 shrink-0 transition-all hover:opacity-90"
                        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                          style={{
                            background: `linear-gradient(135deg, ${cat.gradient.join(', ')})`,
                          }}
                        >
                          <Icon size={11} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: colors.text }}>
                          {cat.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Staggered Media Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {EXPLORE_CARDS.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => showToast(`Exploring ${card.title}`)}
                      className="rounded-2xl p-3 flex flex-col justify-end shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
                      style={{
                        height: card.height,
                        background: `linear-gradient(135deg, ${card.gradient.join(', ')})`,
                      }}
                    >
                      <span className="text-xs font-extrabold text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg self-start">
                        {card.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CREATE SCREEN (Concept Media Composer Wired to Real Post Action) */}
            {currentTab === 'create' && (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <button
                    onClick={() => setCurrentTab('home')}
                    className="text-xs font-semibold hover:opacity-80"
                    style={{ color: colors.secondaryText }}
                  >
                    Cancel
                  </button>
                  <h2 className="text-base font-bold" style={{ color: colors.text }}>
                    Create Post
                  </h2>
                  <button
                    onClick={handleCreatePost}
                    className="text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-md hover:opacity-95"
                    style={{ backgroundColor: colors.accent }}
                  >
                    Publish
                  </button>
                </div>

                {/* Media Preview Card */}
                <div
                  className="w-full h-44 rounded-2xl p-4 flex flex-col justify-end shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${[
                      shadowGradients.mainFeed,
                      shadowGradients.softPastel,
                      shadowGradients.deepMoody,
                      shadowGradients.tealCyan,
                      shadowGradients.warmBronze,
                    ][selectedGradientIndex].join(', ')})`,
                  }}
                >
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl p-2.5">
                    <span className="text-[11px] font-bold text-white block">
                      {createTitle.trim() || 'TITLE PREVIEW'}
                    </span>
                    <span className="text-[10px] text-slate-200 block truncate">
                      {createBody.trim() || 'Write your content below to preview...'}
                    </span>
                  </div>
                </div>

                {/* Palette Selector */}
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider block mb-2" style={{ color: colors.secondaryText }}>
                    Visual Gradient
                  </label>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {['Cyber Violet', 'Pastel Dusk', 'Moody Blue', 'Teal Aurora', 'Bronze'].map(
                      (name, i) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => setSelectedGradientIndex(i)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedGradientIndex === i
                              ? 'border-pink-500 bg-pink-500/20 text-pink-400'
                              : 'border-white/10 text-slate-400'
                          }`}
                        >
                          {name}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Title Input */}
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider block mb-1.5" style={{ color: colors.secondaryText }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={createTitle}
                    onChange={(e) => setCreateTitle(e.target.value)}
                    placeholder="Featured title..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none"
                    style={{
                      backgroundColor: colors.inputBackground,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  />
                </div>

                {/* Description Body Input */}
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider block mb-1.5" style={{ color: colors.secondaryText }}>
                    Content / Description
                  </label>
                  <textarea
                    rows={4}
                    value={createBody}
                    onChange={(e) => setCreateBody(e.target.value)}
                    placeholder="What are you creating or sharing on campus today?..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none resize-none"
                    style={{
                      backgroundColor: colors.inputBackground,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  />
                </div>
              </div>
            )}

            {/* 5. NOTIFICATIONS SCREEN (Concept Activity Center) */}
            {currentTab === 'notifications' && (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold" style={{ color: colors.text }}>
                    Notifications
                  </h2>
                  <button
                    onClick={() => {
                      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
                      showToast('All marked as read');
                    }}
                    className="text-xs font-bold text-pink-400 hover:underline"
                  >
                    Mark as read
                  </button>
                </div>

                <div className="space-y-2.5">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        setNotifications((prev) =>
                          prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
                        );
                      }}
                      className="p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors"
                      style={{
                        backgroundColor: notif.unread ? colors.surface : colors.inputBackground,
                        borderColor: notif.unread ? colors.accent + '40' : colors.border,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-extrabold shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${notif.gradient.join(', ')})`,
                          }}
                        >
                          {notif.user[0]}
                        </div>
                        <div>
                          <p className="text-xs" style={{ color: colors.text }}>
                            <strong className="font-bold">{notif.user}</strong> {notif.action}
                          </p>
                          <span className="text-[10px]" style={{ color: colors.secondaryText }}>
                            {notif.time}
                          </span>
                        </div>
                      </div>

                      {notif.unread && (
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: colors.accent }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. PROFILE SCREEN (Concept Layout + Real Shadow Identity & User Data) */}
            {currentTab === 'profile' && (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTabChange('create')}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                      style={{ borderColor: colors.border, borderWidth: 1 }}
                      title="Create Post (+)"
                      aria-label="Create Post"
                    >
                      <Plus size={16} style={{ color: colors.text }} />
                    </button>
                    <h2 className="text-xl font-extrabold" style={{ color: colors.text }}>
                      Profile
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onToggleTheme}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.inputBackground }}
                    >
                      {isDark ? <Sun size={15} className="text-yellow-400" /> : <Moon size={15} />}
                    </button>
                    <button
                      onClick={() => {
                        showToast('Logged out');
                        setIsAuthenticated(false);
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/10"
                      title="Log out"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                </div>

                {/* Profile Header Avatar Section */}
                <div className="flex flex-col items-center text-center pt-2">
                  <div
                    className="w-20 h-20 rounded-[26px] p-1 shadow-xl flex items-center justify-center mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
                    }}
                  >
                    <div
                      className="w-full h-full rounded-[22px] p-1 flex items-center justify-center"
                      style={{ backgroundColor: colors.background }}
                    >
                      <div
                        className="w-full h-full rounded-[19px] flex items-center justify-center text-white text-xl font-extrabold"
                        style={{
                          background: 'linear-gradient(135deg, #FF0A78 0%, #7928CA 100%)',
                        }}
                      >
                        {currentUser.name
                          .split(' ')
                          .map((p) => p[0])
                          .join('')}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold" style={{ color: colors.text }}>
                    {currentUser.name}
                  </h3>
                  <span className="text-xs font-semibold text-pink-400 mt-0.5">
                    {currentUser.email}
                  </span>
                  <p className="text-xs mt-1 max-w-xs" style={{ color: colors.secondaryText }}>
                    {currentUser.bio}
                  </p>

                  {/* Real Shadow Identity Card */}
                  <div
                    className="w-full mt-3.5 p-3 rounded-[24px] border"
                    style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                  >
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b" style={{ borderColor: colors.border }}>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                        <span className="text-[10px] font-extrabold tracking-wider uppercase" style={{ color: colors.secondaryText }}>
                          Shadow Identity
                        </span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10" style={{ color: colors.text }}>
                        <span className="text-pink-400 font-bold">ID:</span>
                        <span>{currentUser.shadowId}</span>
                      </div>
                    </div>

                    {/* Primary Premium Status Indicator: Distinct Proportional Rank Badge with Visual Transition */}
                    <div className="mb-2.5">
                      <PawnRankBadge
                        rank={currentUser.shadowRank as any}
                        variant="profile"
                        isDark={isDark}
                        onClick={() => {
                          const nextRank = currentUser.shadowRank === 'PAWN' ? 'KNIGHT' : 'PAWN';
                          setCurrentUser((prev) => ({ ...prev, shadowRank: nextRank }));
                          showToast(nextRank === 'KNIGHT' ? '✦ Rank Elevated: KNIGHT (Rank II)' : '✦ Rank Reverted: PAWN (Rank I)');
                        }}
                      />
                    </div>

                    {/* Secondary Row: Verification & Authority + Rank Elevation Toggle */}
                    <div className="flex items-center justify-between gap-2 pt-1 border-t" style={{ borderColor: colors.border }}>
                      <button
                        onClick={() => {
                          const nextRank = currentUser.shadowRank === 'PAWN' ? 'KNIGHT' : 'PAWN';
                          setCurrentUser((prev) => ({ ...prev, shadowRank: nextRank }));
                          showToast(nextRank === 'KNIGHT' ? '✦ Rank Elevated: KNIGHT (Rank II)' : '✦ Rank Reverted: PAWN (Rank I)');
                        }}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[9.5px] font-extrabold transition-all cursor-pointer ${
                          currentUser.shadowRank === 'PAWN'
                            ? 'bg-purple-500/15 border-purple-500/35 text-purple-300'
                            : 'bg-pink-500/15 border-pink-500/35 text-pink-300'
                        }`}
                        title="Simulate Shadow Rank Progression: PAWN ↔ KNIGHT"
                      >
                        <Sparkles size={11} className={currentUser.shadowRank === 'PAWN' ? 'text-cyan-400' : 'text-pink-400'} />
                        <span>{currentUser.shadowRank === 'PAWN' ? 'Elevate to KNIGHT' : 'Revert to PAWN'}</span>
                      </button>

                      <button
                        onClick={() => {
                          const nextStatus = currentUser.verification === 'VERIFIED' ? 'UNVERIFIED' : 'VERIFIED';
                          setCurrentUser((prev) => ({ ...prev, verification: nextStatus }));
                          showToast(`Verification: ${nextStatus} (Rank stays PAWN)`);
                        }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                          currentUser.verification === 'VERIFIED'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}
                        title="Independent Verification Status - Click to toggle"
                      >
                        {currentUser.verification === 'VERIFIED' ? (
                          <ShieldCheck size={12} />
                        ) : (
                          <ShieldAlert size={12} />
                        )}
                        <span className="text-[9.5px] font-extrabold tracking-wider">
                          {currentUser.verification}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-around w-full mt-4 py-2">
                    <div>
                      <span className="text-base font-extrabold block" style={{ color: colors.text }}>
                        {currentUser.postsCount}
                      </span>
                      <span className="text-[10px] uppercase font-bold" style={{ color: colors.secondaryText }}>
                        Posts
                      </span>
                    </div>
                    <div>
                      <span className="text-base font-extrabold block" style={{ color: colors.text }}>
                        {currentUser.followersCount}
                      </span>
                      <span className="text-[10px] uppercase font-bold" style={{ color: colors.secondaryText }}>
                        Followers
                      </span>
                    </div>
                    <div>
                      <span className="text-base font-extrabold block" style={{ color: colors.text }}>
                        {currentUser.followingCount}
                      </span>
                      <span className="text-[10px] uppercase font-bold" style={{ color: colors.secondaryText }}>
                        Following
                      </span>
                    </div>
                  </div>

                  {/* Action Follow/Edit + Create Post Button */}
                  <div className="flex items-center gap-2 w-full mt-3">
                    <button
                      onClick={() => showToast('Profile updated')}
                      className="flex-1 py-2.5 rounded-full font-bold text-xs text-white shadow-lg transition-transform active:scale-95 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
                      }}
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => handleTabChange('create')}
                      className="px-4 py-2.5 rounded-full font-bold text-xs border border-pink-500/40 text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      title="Create Post (+)"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                      <span>Post</span>
                    </button>
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider block mb-2" style={{ color: colors.secondaryText }}>
                    Highlights
                  </span>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar">
                    {['Best shots', 'My travels', 'Autumn', 'Food'].map((title, i) => (
                      <div key={title} className="flex flex-col items-center gap-1 shrink-0">
                        <div
                          className="w-14 h-14 rounded-[18px] p-0.5"
                          style={{
                            background: 'linear-gradient(135deg, #164E63 0%, #06B6D4 100%)',
                          }}
                        >
                          <div
                            className="w-full h-full rounded-[16px] flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: colors.background }}
                          >
                            {title[0]}
                          </div>
                        </div>
                        <span className="text-[10px]" style={{ color: colors.secondaryText }}>
                          {title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            </>
          )}
        </div>

          {/* 7. FLOATING 5-DESTINATION CONCEPT BOTTOM NAVIGATION (Scroll-Responsive Sizing) */}
          <div
            className={`absolute left-0 right-0 z-30 flex justify-center pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isCompactNav ? 'bottom-2' : 'bottom-3'
            }`}
          >
            <div
              className={`pointer-events-auto rounded-full border flex items-center justify-around transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl ${
                isCompactNav
                  ? 'h-10 w-[272px] px-2.5 shadow-lg'
                  : 'h-14 w-[355px] px-4 shadow-2xl'
              }`}
              style={{
                backgroundColor: isDark
                  ? (isCompactNav ? 'rgba(18, 20, 32, 0.88)' : 'rgba(18, 20, 32, 0.94)')
                  : (isCompactNav ? 'rgba(255, 255, 255, 0.90)' : 'rgba(255, 255, 255, 0.95)'),
                borderColor: colors.border,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Home */}
              <button
                onClick={() => handleTabChange('home')}
                className="flex flex-col items-center justify-center p-1.5 relative hover:opacity-80 transition-opacity"
              >
                <span
                  className={`font-semibold leading-none transition-all duration-300 ${
                    isCompactNav ? 'text-base' : 'text-xl'
                  }`}
                  style={{
                    color: currentTab === 'home'
                      ? colors.tabActive
                      : (currentTab === 'reels' ? '#94A3B8' : colors.tabInactive),
                  }}
                >
                  ⌂
                </span>
                {currentTab === 'home' && (
                  <div
                    className={`rounded-full absolute bottom-0.5 transition-all duration-300 ${
                      isCompactNav ? 'w-2 h-0.5' : 'w-3 h-0.5'
                    }`}
                    style={{ backgroundColor: colors.text }}
                  />
                )}
              </button>

              {/* Explore */}
              <button
                onClick={() => handleTabChange('explore')}
                className="flex flex-col items-center justify-center p-1.5 relative hover:opacity-80 transition-opacity"
              >
                <Search
                  size={isCompactNav ? 16 : 19}
                  className="transition-all duration-300"
                  style={{
                    color: currentTab === 'explore'
                      ? colors.tabActive
                      : (currentTab === 'reels' ? '#94A3B8' : colors.tabInactive),
                  }}
                />
                {currentTab === 'explore' && (
                  <div
                    className={`rounded-full absolute bottom-0.5 transition-all duration-300 ${
                      isCompactNav ? 'w-2 h-0.5' : 'w-3 h-0.5'
                    }`}
                    style={{ backgroundColor: colors.text }}
                  />
                )}
              </button>



              {/* Create */}
              <button
                onClick={() => handleTabChange('create')}
                className="flex flex-col items-center justify-center p-1.5 relative hover:opacity-80 transition-opacity"
              >
                <Plus
                  size={isCompactNav ? 17 : 20}
                  className="transition-all duration-300"
                  style={{
                    color: currentTab === 'create'
                      ? colors.tabActive
                      : (currentTab === 'reels' ? '#94A3B8' : colors.tabInactive),
                  }}
                />
                {currentTab === 'create' && (
                  <div
                    className={`rounded-full absolute bottom-0.5 transition-all duration-300 ${
                      isCompactNav ? 'w-2 h-0.5' : 'w-3 h-0.5'
                    }`}
                    style={{ backgroundColor: colors.text }}
                  />
                )}
              </button>

              {/* Notifications / Activity */}
              <button
                onClick={() => handleTabChange('notifications')}
                className="flex flex-col items-center justify-center p-1.5 relative hover:opacity-80 transition-opacity"
                title="Notifications"
              >
                <Bell
                  size={isCompactNav ? 16 : 19}
                  className="transition-all duration-300"
                  style={{
                    color: currentTab === 'notifications'
                      ? colors.tabActive
                      : (currentTab === 'reels' ? '#94A3B8' : colors.tabInactive),
                  }}
                />
                {currentTab === 'notifications' && (
                  <div
                    className={`rounded-full absolute bottom-0.5 transition-all duration-300 ${
                      isCompactNav ? 'w-2 h-0.5' : 'w-3 h-0.5'
                    }`}
                    style={{ backgroundColor: colors.text }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reel Comments Drawer Integration */}
      <ReelCommentsDrawer
        isOpen={!!activeReelComments}
        onClose={() => setActiveReelComments(null)}
        reel={activeReelComments ? {
          id: activeReelComments.id,
          author: {
            name: activeReelComments.author,
            username: activeReelComments.username,
            location: activeReelComments.location,
            avatarGradient: activeReelComments.avatarGradient?.join(', ') || '#3A3B4D, #2B2C3B',
          },
          gradient: activeReelComments.gradient,
          likes: activeReelComments.likes,
          likesCount: activeReelComments.likesCount,
          comments: activeReelComments.comments,
          commentsCount: activeReelComments.commentsCount,
          isLiked: activeReelComments.isLiked,
          isSaved: activeReelComments.isSaved,
        } as any : null}
        isDark={isDark}
        onCommentAdded={(reelId, text) => {
          setReels((prev) =>
            prev.map((r) => (r.id === reelId ? { ...r, commentsCount: r.commentsCount + 1 } : r))
          );
        }}
      />
    </div>
  );
};

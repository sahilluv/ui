import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  Heart,
  Search,
  Send,
  Share2,
  Bookmark,
  MessageCircle,
  Tv,
  ShoppingBag,
  Plane,
  Dumbbell,
  Scan,
  Sparkles,
  Check,
  Globe,
  Users,
  Star,
  Moon,
  Sun,
  X,
  MoreVertical,
  Play,
  RotateCw,
  UserPlus,
  UserCheck,
  CheckCheck,
  Bell,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Info,
  Copy,
  Paperclip,
  Smile,
  Mic,
  Phone,
  Video,
  Hash,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Camera,
} from 'lucide-react';
import { PawnRankBadge, PremiumPawnInsignia, PremiumKnightInsignia, ShadowRankType } from './PawnRankBadge';
import { BottomNavigation } from './BottomNavigation';
import { StoryCameraOverlay } from './StoryCameraOverlay';
import {
  useOfflineFeed,
  useOfflineReels,
  persistFeedCache,
  persistReelsCache,
} from '../utils/offlineDataClient';
import {
  loadCachedFollowedAuthors,
  saveFollowedAuthorsToCache,
} from '../utils/feedCache';

export const PawnGlyph = ({
  size = 14,
  className = 'fill-current',
}: {
  size?: number;
  className?: string;
}) => (
  <PremiumPawnInsignia size={size} className={className} glow={false} />
);
import {
  INITIAL_STORIES,
  INITIAL_POSTS,
  INITIAL_REELS,
  CATEGORIES,
  EXPLORE_CARDS,
  HIGHLIGHTS,
  NOTIFICATIONS_DATA,
  StoryItem,
  PostItem,
  ReelItem,
} from '../data/mockData';
import { ShareSheetModal } from './ShareSheetModal';
import { ReelCommentsDrawer } from './ReelCommentsDrawer';
import { PullUpRefresh } from './PullUpRefresh';
import { ReelCard } from './ReelCard';
import { useReelIntersectionObserver } from '../hooks/useReelIntersectionObserver';
import { MyShadowScreen } from './MyShadowScreen';

export type TabType = 'home' | 'explore' | 'reels' | 'shop' | 'chat' | 'create' | 'notifications' | 'profile';

export interface MockExploreProfile {
  id: string;
  name: string;
  username: string;
  avatarGradient: string;
  pawnRank: string;
  verified: boolean;
  bio: string;
  followers: string;
  postsCount: number;
}

export interface MockTrendingTag {
  id: string;
  tag: string;
  postsCount: string;
  category: string;
  growth: string;
}

export const MOCK_EXPLORE_PROFILES: MockExploreProfile[] = [
  {
    id: 'mauricio',
    name: 'Mauricio Lopez',
    username: 'Maoo.lopez',
    avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #7928CA 60%, #4338CA 100%)',
    pawnRank: 'Rank I',
    verified: true,
    bio: 'Founder @Shadow · Neo-digital design & dark aesthetics',
    followers: '24.5K',
    postsCount: 128,
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    username: 'Elena.art',
    avatarGradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #FB7185 100%)',
    pawnRank: 'Rank I',
    verified: true,
    bio: 'Creative Director · 3D motion, Octane nodes & lighting',
    followers: '18.2K',
    postsCount: 94,
  },
  {
    id: 'sofia',
    name: 'Sofia Martinez',
    username: 'sofia.mtz',
    avatarGradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    pawnRank: 'Rank II',
    verified: true,
    bio: 'Motion Designer @CyberVibe · Glitch art & visual experiments',
    followers: '12.9K',
    postsCount: 67,
  },
  {
    id: 'marco',
    name: 'Marco Rossi',
    username: 'marco.rossi',
    avatarGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    pawnRank: 'Rank III',
    verified: false,
    bio: 'Photographer & Visual Artist · Tokyo cyber nightscapes',
    followers: '8.4K',
    postsCount: 42,
  },
  {
    id: 'aria',
    name: 'Aria Chen',
    username: 'aria.lens',
    avatarGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    pawnRank: 'Rank I',
    verified: true,
    bio: 'Editorial Stylist & Art Director · Milan & New York',
    followers: '31.0K',
    postsCount: 156,
  },
  {
    id: 'kai',
    name: 'Kai Tanaka',
    username: 'kai.zenith',
    avatarGradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
    pawnRank: 'Rank II',
    verified: true,
    bio: 'Shader Architect · WebGL real-time cloth & liquid dynamics',
    followers: '15.6K',
    postsCount: 81,
  },
  {
    id: 'nyx',
    name: 'Nyx Vane',
    username: 'nyx.shadow',
    avatarGradient: 'linear-gradient(135deg, #8B5CF6 0%, #C026D3 100%)',
    pawnRank: 'Rank I',
    verified: true,
    bio: 'Obsidian Minimalist & Sound Designer · Dark ambient sets',
    followers: '42.1K',
    postsCount: 203,
  },
  {
    id: 'lucas',
    name: 'Lucas Vance',
    username: 'lucas.cinema',
    avatarGradient: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
    pawnRank: 'Rank III',
    verified: false,
    bio: 'Anamorphic Cinematographer · 35mm film emulation',
    followers: '9.7K',
    postsCount: 53,
  },
];

export const MOCK_TRENDING_TAGS: MockTrendingTag[] = [
  { id: 't1', tag: 'cyberpunk', postsCount: '184.2K', category: 'Digital Art', growth: '+28%' },
  { id: 't2', tag: 'shadowart', postsCount: '142.8K', category: 'Aesthetics', growth: '+45%' },
  { id: 't3', tag: 'octanerender', postsCount: '98.4K', category: '3D Motion', growth: '+19%' },
  { id: 't4', tag: 'motiondesign', postsCount: '76.1K', category: 'Animation', growth: '+12%' },
  { id: 't5', tag: 'darkmode', postsCount: '64.9K', category: 'UI & Craft', growth: '+33%' },
  { id: 't6', tag: 'neonnoir', postsCount: '52.3K', category: 'Photography', growth: '+15%' },
  { id: 't7', tag: 'pawnrank', postsCount: '41.7K', category: 'Community', growth: '+62%' },
  { id: 't8', tag: 'generativeart', postsCount: '38.5K', category: 'Creative Code', growth: '+24%' },
  { id: 't9', tag: 'tokyonights', postsCount: '29.4K', category: 'Urban Mood', growth: '+11%' },
  { id: 't10', tag: 'glitcheffect', postsCount: '21.0K', category: 'VFX', growth: '+18%' },
];

interface PhoneSimulatorProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  onSelectStory?: (story: StoryItem) => void;
  standalone?: boolean;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  isDark,
  onToggleTheme,
  activeTab: externalTab,
  onTabChange: externalOnTabChange,
  onSelectStory,
  standalone = true,
}) => {
  const [internalTab, setInternalTab] = useState<TabType>('home');
  const currentTab = externalTab ?? internalTab;

  // Scroll-responsive compact/shrink state for BottomNavigation
  const [isNavShrunk, setIsNavShrunk] = useState(false);
  const prevScrollTopRef = useRef(0);
  const scrollStopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isViewingMyShadow, setIsViewingMyShadow] = useState(false);

  const handleTabChange = (tab: TabType) => {
    setIsNavShrunk(false);
    if (tab !== 'profile') {
      setIsViewingMyShadow(false);
    }
    if (externalOnTabChange) {
      externalOnTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  useEffect(() => {
    return () => {
      if (scrollStopTimeoutRef.current) {
        clearTimeout(scrollStopTimeoutRef.current);
      }
    };
  }, []);

  const handleViewportScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollTop = e.currentTarget.scrollTop;
    const diff = currentScrollTop - prevScrollTopRef.current;

    // Apply scroll-responsive shrinking for Feed ('home') and Reels ('reels')
    if (currentTab === 'home' || currentTab === 'reels') {
      if (currentScrollTop <= 15) {
        // At or near top -> expand back to normal full size
        setIsNavShrunk(false);
      } else if (diff > 4) {
        // Scrolling down -> shrink into compact/minimized navigation
        setIsNavShrunk(true);
      } else if (diff < -4) {
        // Scrolling upward -> smoothly animate back to normal full-size state
        setIsNavShrunk(false);
      }

      // When user stops scrolling, smoothly animate back to normal full-size state after brief pause
      if (scrollStopTimeoutRef.current) {
        clearTimeout(scrollStopTimeoutRef.current);
      }
      scrollStopTimeoutRef.current = setTimeout(() => {
        setIsNavShrunk(false);
      }, 1000);
    } else {
      if (isNavShrunk) setIsNavShrunk(false);
    }

    prevScrollTopRef.current = currentScrollTop;
  };

  // Transparent Offline-First Data Strategy (Service Worker + Cache Storage API + LocalStorage)
  const {
    posts,
    setPosts,
    refreshFeed,
    toggleLikePost,
    toggleSavePost,
    addNewPost,
  } = useOfflineFeed();

  const {
    reels,
    setReels,
    refreshReels,
    toggleLikeReel,
    toggleSaveReel,
    incrementReelComments,
  } = useOfflineReels();

  // State for stories, likes, followers
  const [stories, setStories] = useState<StoryItem[]>(INITIAL_STORIES);
  const [isCameraOverlayOpen, setIsCameraOverlayOpen] = useState(false);
  const [activeReelComments, setActiveReelComments] = useState<ReelItem | null>(null);
  const [isFollowingMauricio, setIsFollowingMauricio] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'posts' | 'tags' | 'igtv'>('posts');
  const [notifFilter, setNotifFilter] = useState<'all' | 'likes' | 'comments' | 'follows'>('all');
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);
  const [notificationsList, setNotificationsList] = useState(NOTIFICATIONS_DATA);
  const [isRefreshingReels, setIsRefreshingReels] = useState(false);
  const [shareModalPost, setShareModalPost] = useState<PostItem | null>(null);
  const [postSlidePages, setPostSlidePages] = useState<Record<string, number>>({ post_maoo: 1 });
  const [selectedCategory, setSelectedCategory] = useState<string>('igtv');

  // Performance-Optimized Reel Preloader & Intersection Observer:
  // Monitors currently viewed reel in viewport and pre-loads next reel media in background
  const {
    activeIndex: activeReelIndex,
    isNextPreloaded,
    preloadedStatusMap,
    registerReelRef,
  } = useReelIntersectionObserver({
    containerRef: viewportRef,
    reels,
    threshold: 0.6,
  });

  const handlePublishNewStory = (newStoryData: {
    gradient: string;
    imageUrl?: string;
    caption?: string;
    sticker?: string;
  }) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.isCurrentUser) {
          return {
            ...s,
            gradient: newStoryData.gradient,
            storyImageUrl: newStoryData.imageUrl,
            storyCaption: newStoryData.caption,
            storySticker: newStoryData.sticker,
            storyTimestamp: 'Just now',
            hasUnseen: true,
          };
        }
        return s;
      })
    );
    triggerToast('New 24-hour story published! ✨', 'sparkles');
  };

  // Explore Search & Discovery Overlay State
  const [exploreSearchQuery, setExploreSearchQuery] = useState('');
  const [isExploreSearchFocused, setIsExploreSearchFocused] = useState(false);
  const [exploreSearchFilter, setExploreSearchFilter] = useState<'all' | 'accounts' | 'tags'>('all');

  // Conversable Chat System State & Data
  const CHAT_USERS = [
    {
      id: 'elena',
      name: 'Elena Rostova',
      username: 'elena.art',
      avatarGradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #FB7185 100%)',
      online: true,
      lastSeen: 'Active now',
      status: 'Creative Director · 3D Specialist',
      verified: true,
      unread: true,
    },
    {
      id: 'sofia',
      name: 'Sofia Martinez',
      username: 'sofia.cyber',
      avatarGradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      online: true,
      lastSeen: 'Active 8m ago',
      status: 'Motion Designer @CyberVibe',
      verified: true,
      unread: false,
    },
    {
      id: 'marco',
      name: 'Marco Rossi',
      username: 'marco.rossi',
      avatarGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      online: false,
      lastSeen: 'Active 2h ago',
      status: 'Photographer & Visual Artist',
      verified: false,
      unread: false,
    },
    {
      id: 'aria',
      name: 'Aria Chen',
      username: 'aria.lens',
      avatarGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      online: true,
      lastSeen: 'Active now',
      status: 'Editorial Stylist · Milan',
      verified: true,
      unread: false,
    },
  ];

  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [chatInputText, setChatInputText] = useState('');
  const [isTypingReply, setIsTypingReply] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Record<string, Array<{ id: string; sender: 'me' | 'other'; text: string; time: string }>>
  >({
    elena: [
      { id: 'm1', sender: 'other', text: 'Hey Mauricio! Loved your latest post "SACRIFICE | VIRUS" ♟️', time: '10:42 AM' },
      { id: 'm2', sender: 'other', text: 'The neon gradient and chess rank badge styling look incredible.', time: '10:43 AM' },
      { id: 'm3', sender: 'me', text: 'Thank you Elena! I dialed in the cyber aesthetic and rank badge yesterday.', time: '10:45 AM' },
      { id: 'm4', sender: 'other', text: 'Are you working on any 3D motion graphics for the next drop?', time: '10:48 AM' },
    ],
    sofia: [
      { id: 's1', sender: 'other', text: 'Sent the 3D render files over. Check them out when you get a chance!', time: 'Yesterday' },
      { id: 's2', sender: 'me', text: 'Got them Sofia! The metallic reflections are unreal.', time: 'Yesterday' },
    ],
    marco: [
      { id: 'r1', sender: 'other', text: 'Are you going to the Shadow Creator Summit next week?', time: '2d ago' },
      { id: 'r2', sender: 'me', text: 'Yes! I will be presenting the brand concept on Wednesday.', time: '2d ago' },
    ],
    aria: [
      { id: 'a1', sender: 'other', text: 'That color palette in your carousel is insane 🔥', time: '3d ago' },
      { id: 'a2', sender: 'me', text: 'Thanks Aria! Inspired by cyberpunk Tokyo nighttime lighting.', time: '3d ago' },
    ],
  });

  const handleSendChatMessage = (textToSend?: string) => {
    const text = (textToSend ?? chatInputText).trim();
    if (!text || !activeChatUserId) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      sender: 'me' as const,
      text,
      time: 'Just now',
    };

    setChatMessages((prev) => ({
      ...prev,
      [activeChatUserId]: [...(prev[activeChatUserId] || []), newMessage],
    }));
    setChatInputText('');

    // Trigger simulated conversational response after brief delay
    setIsTypingReply(true);
    setTimeout(() => {
      setIsTypingReply(false);
      const responses: Record<string, string[]> = {
        elena: [
          "Absolutely! Let's collaborate on the next creative project.",
          "I'm rendering a new high-contrast preview right now, will share shortly!",
          "That sounds like a winning direction. Shadow's aesthetic fits it perfectly.",
          "Awesome! I'll tag you as soon as the render finishes compiling.",
          "Yes, exactly! I love the direction we're taking with the pawn rank badge.",
        ],
        sofia: [
          "Glad you like the textures! I used octane shader nodes for the neon glow.",
          "Let me know if you need higher resolution exports.",
        ],
        marco: [
          "Awesome, let's grab coffee at the summit stage!",
          "I'll save you a seat near the panel discussion.",
        ],
        aria: [
          "Thanks! The cyan and magenta contrast is my favorite palette.",
          "Can't wait to see your next carousel story!",
        ],
      };
      const candidateList = responses[activeChatUserId] || responses.elena;
      const replyText = candidateList[Math.floor(Math.random() * candidateList.length)];

      const replyMessage = {
        id: `reply_${Date.now()}`,
        sender: 'other' as const,
        text: replyText,
        time: 'Just now',
      };

      setChatMessages((prev) => ({
        ...prev,
        [activeChatUserId]: [...(prev[activeChatUserId] || []), replyMessage],
      }));
      const userObj = CHAT_USERS.find((u) => u.id === activeChatUserId);
      triggerToast(`New message from ${userObj?.name || 'Creator'}`, 'sparkles');
    }, 1100);
  };

  // Shadow Identity & Rank system states
  const [mauricioRank, setMauricioRank] = useState<ShadowRankType>('PAWN');
  const [isRankTransitioning, setIsRankTransitioning] = useState(false);
  const [isMauricioVerified, setIsMauricioVerified] = useState(true);
  const [showRankHierarchyModal, setShowRankHierarchyModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handlePromoteRank = () => {
    setIsRankTransitioning(true);
    const nextRank = mauricioRank === 'PAWN' ? 'KNIGHT' : 'PAWN';
    setMauricioRank(nextRank);
    triggerToast(
      nextRank === 'KNIGHT'
        ? '✦ Shadow Identity Elevated: KNIGHT (Rank II)'
        : '✦ Shadow Identity Reverted: PAWN (Rank I)',
      'sparkles'
    );
    setTimeout(() => setIsRankTransitioning(false), 1400);
  };

  // Pull Up Refresh states
  const [isPullUpRefreshing, setIsPullUpRefreshing] = useState(false);
  const [pullUpDistance, setPullUpDistance] = useState(0);
  const touchStartYRef = useRef(0);
  const isPullingUpRef = useRef(false);

  // Pool of fresh content to inject on pull-up refresh
  const FRESH_POSTS_POOL: PostItem[] = [
    {
      id: 'post_cyber_noir',
      author: {
        name: 'Elena Rostova',
        username: 'Elena.art',
        avatarGradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #FB7185 100%)',
        location: 'Berlin, Germany',
      },
      timeAgo: 'Just now',
      gradient: 'linear-gradient(180deg, #090B14 0%, #1E1B4B 45%, #4C1D95 75%, #FF0A78 100%)',
      likesCount: 3120,
      commentsCount: 245,
      likedByText: 'maoo.lopez and 3,119 others',
      captionTitle: 'CYBERNETIC CHROMA',
      captionBody: 'Night street reflections after summer neon rain in Mitte.',
      totalPages: 1,
      currentPage: 1,
      isLiked: false,
      isSaved: false,
    },
    {
      id: 'post_aurora_drift',
      author: {
        name: 'Sofia Martinez',
        username: 'sofia.mtz',
        avatarGradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
        location: 'Reykjavik, Iceland',
      },
      timeAgo: '1m ago',
      gradient: 'linear-gradient(145deg, #022C22 0%, #065F46 40%, #0D9488 75%, #2DD4BF 100%)',
      likesCount: 5210,
      commentsCount: 412,
      likedByText: 'eliott.j and 5,209 others',
      captionTitle: 'TEAL AURORA DREAMS',
      captionBody: 'Chasing geomagnetic solar ribbons above volcanic basalt.',
      totalPages: 2,
      currentPage: 1,
      isLiked: true,
      isSaved: false,
    },
    {
      id: 'post_monolith',
      author: {
        name: 'Marco Rossi',
        username: 'marco.visuals',
        avatarGradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
        location: 'Milan, Italy',
      },
      timeAgo: '3m ago',
      gradient: 'linear-gradient(145deg, #18181B 0%, #3F3F46 45%, #71717A 80%, #E4E4E7 100%)',
      likesCount: 1980,
      commentsCount: 88,
      likedByText: 'Alice_002 and 1,979 others',
      captionTitle: 'PRISMATIC VOID',
      captionBody: 'High-contrast monochrome brutalist structure in morning fog.',
      totalPages: 1,
      currentPage: 1,
      isLiked: false,
      isSaved: true,
    },
  ];

  const handlePullUpRefresh = async () => {
    if (isPullUpRefreshing) return;
    setIsPullUpRefreshing(true);

    try {
      await refreshFeed();
    } catch (_err) {
      // Handled transparently by offline cache
    }

    setIsPullUpRefreshing(false);
    setPullUpDistance(0);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = viewportRef.current;
    // Activate drag tracker when user is within 35px of bottom
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 35;
    if (isAtBottom) {
      touchStartYRef.current = e.touches[0].clientY;
      isPullingUpRef.current = true;
    } else {
      isPullingUpRef.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPullingUpRef.current || isPullUpRefreshing || !viewportRef.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartYRef.current - currentY; // positive when dragging upwards

    if (deltaY > 0) {
      // Elastic resistance curve
      const resistedDistance = Math.min(Math.pow(deltaY, 0.82) * 1.6, 115);
      setPullUpDistance(resistedDistance);
    } else {
      setPullUpDistance(0);
    }
  };

  const handleTouchEnd = () => {
    if (isPullingUpRef.current) {
      isPullingUpRef.current = false;
      if (pullUpDistance >= 50 && !isPullUpRefreshing) {
        void handlePullUpRefresh();
      } else {
        setPullUpDistance(0);
      }
    }
  };

  // Floating toast alert state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIconType, setToastIconType] = useState<'sparkles' | 'bookmark'>('sparkles');
  const triggerToast = (msg: string, icon: 'sparkles' | 'bookmark' = 'sparkles') => {
    setToastMessage(msg);
    setToastIconType(icon);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Follow states for authors across feeds & reels (hydrated from cache)
  const [followedAuthors, setFollowedAuthors] = useState<Record<string, boolean>>(() => {
    return (
      loadCachedFollowedAuthors() ?? {
        'Maoo.lopez': false,
        'eliott.j': false,
        'christian.lue': false,
        'sofia.mtz': false,
      }
    );
  });

  useEffect(() => {
    saveFollowedAuthorsToCache(followedAuthors);
  }, [followedAuthors]);

  const handleToggleFollowAuthor = (username: string) => {
    setFollowedAuthors((prev) => {
      const nextState = !prev[username];
      triggerToast(nextState ? `Followed @${username}!` : `Unfollowed @${username}`);
      return { ...prev, [username]: nextState };
    });
  };

  // Double-tap & heart burst states
  const [lastPostTap, setLastPostTap] = useState<{ id: string; time: number }>({ id: '', time: 0 });
  const [heartBurstPostId, setHeartBurstPostId] = useState<string | null>(null);

  const [lastReelTap, setLastReelTap] = useState<{ id: string; time: number }>({ id: '', time: 0 });
  const [heartBurstReelId, setHeartBurstReelId] = useState<string | null>(null);
  const [poppingBookmarkReelId, setPoppingBookmarkReelId] = useState<string | null>(null);

  const handlePostMediaClick = (post: PostItem) => {
    const now = Date.now();
    if (lastPostTap.id === post.id && now - lastPostTap.time < 320) {
      // Double tap detected!
      if (!post.isLiked) {
        handleLikePost(post.id);
      }
      setHeartBurstPostId(post.id);
      setTimeout(() => setHeartBurstPostId(null), 950);
      setLastPostTap({ id: '', time: 0 });
      return;
    }
    setLastPostTap({ id: post.id, time: now });

    // Single tap advances page
    const current = postSlidePages[post.id] || 1;
    const next = current < (post.totalPages || 3) ? current + 1 : 1;
    setPostSlidePages((prev) => ({ ...prev, [post.id]: next }));
  };

  const handleReelCardClick = (reel: ReelItem) => {
    const now = Date.now();
    if (lastReelTap.id === reel.id && now - lastReelTap.time < 320) {
      // Double tap detected!
      if (!reel.isLiked) {
        handleToggleReelLike(reel.id, true);
      }
      setHeartBurstReelId(reel.id);
      setTimeout(() => setHeartBurstReelId(null), 950);
      setLastReelTap({ id: '', time: 0 });
      return;
    }
    setLastReelTap({ id: reel.id, time: now });
  };

  // Horizontal swipe state for Reels navigation (Swipe Left -> Creator Profile, Swipe Right -> Feed)
  const [reelSwipeStartX, setReelSwipeStartX] = useState<number | null>(null);
  const [reelSwipeStartY, setReelSwipeStartY] = useState<number | null>(null);
  const [reelSwipeDeltaX, setReelSwipeDeltaX] = useState<number>(0);
  const [isSwipingReel, setIsSwipingReel] = useState(false);

  const handleReelTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    // Only handle primary left click if mouse event
    if ('button' in e && e.button !== 0) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setReelSwipeStartX(clientX);
    setReelSwipeStartY(clientY);
    setReelSwipeDeltaX(0);
    setIsSwipingReel(true);
  };

  const handleReelTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwipingReel || reelSwipeStartX === null || reelSwipeStartY === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diffX = clientX - reelSwipeStartX;
    const diffY = clientY - reelSwipeStartY;

    // Only engage horizontal drag if horizontal motion exceeds vertical motion
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
      setReelSwipeDeltaX(diffX);
    } else if (Math.abs(diffY) > 8) {
      // Vertical scrolling gesture in Reels:
      if (diffY < -8) {
        // Dragging up / scrolling down to next reel -> shrink navigation
        setIsNavShrunk(true);
      } else if (diffY > 8) {
        // Dragging down / scrolling up -> restore full navigation
        setIsNavShrunk(false);
      }
    }
  };

  const handleReelTouchEnd = (reel: ReelItem) => {
    if (!isSwipingReel) return;
    setIsSwipingReel(false);

    // If scrolling stops, restore full navigation smoothly after 1 second
    if (scrollStopTimeoutRef.current) {
      clearTimeout(scrollStopTimeoutRef.current);
    }
    scrollStopTimeoutRef.current = setTimeout(() => {
      setIsNavShrunk(false);
    }, 1000);

    // If swipe threshold passed (> 50px)
    if (reelSwipeDeltaX < -50) {
      // SWIPE LEFT: view creator's profile page
      triggerToast(`Viewing @${reel.author.username}'s profile`);
      handleTabChange('profile');
    } else if (reelSwipeDeltaX > 50) {
      // SWIPE RIGHT: return to feed
      triggerToast('Returned to Feed');
      handleTabChange('home');
    } else {
      // Tap / double-tap detection if gesture had minimal movement
      if (Math.abs(reelSwipeDeltaX) < 10) {
        handleReelCardClick(reel);
      }
    }

    setReelSwipeDeltaX(0);
    setReelSwipeStartX(null);
    setReelSwipeStartY(null);
  };

  const getPostGradient = (postId: string, fallback: string) => {
    if (postId === 'post_maoo') {
      const page = postSlidePages[postId] || 1;
      if (page === 1) return 'linear-gradient(180deg, #531B82 0%, #7622B3 35%, #A81EBF 65%, #FF0A78 100%)';
      if (page === 2) return 'linear-gradient(180deg, #3A0CA3 0%, #7209B7 40%, #F72585 100%)';
      if (page === 3) return 'linear-gradient(180deg, #180033 0%, #5E118A 50%, #FF007F 100%)';
    }
    return fallback;
  };

  // Pull-to-refresh reels handler
  const handleRefreshReels = async () => {
    if (isRefreshingReels) return;
    setIsRefreshingReels(true);
    try {
      await refreshReels();
    } catch (_e) {
      // Handled transparently
    }
    setIsRefreshingReels(false);
  };

  const handleToggleReelLike = (id: string, _forceLike = false) => {
    toggleLikeReel(id);
  };

  const handleToggleReelSave = (id: string) => {
    toggleSaveReel(id);
    const target = reels.find((r) => r.id === id);
    if (target && !target.isSaved) {
      setPoppingBookmarkReelId(id);
      setTimeout(() => setPoppingBookmarkReelId(null), 850);
      triggerToast('Reel saved to collection', 'bookmark');
    } else {
      triggerToast('Reel removed from saved', 'bookmark');
    }
  };

  const handleReelCommentAdded = (reelId: string, _text: string) => {
    incrementReelComments(reelId);
  };

  // Create Screen State
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newType, setNewType] = useState<'feed' | 'story' | 'igtv'>('feed');
  const [newVisibility, setNewVisibility] = useState<'public' | 'followers' | 'close_friends'>('public');
  const [selectedGradientIndex, setSelectedGradientIndex] = useState(0);

  const gradientPresets = [
    { id: 'neon_violet', name: 'Cyber Violet', gradient: 'linear-gradient(135deg, #4A154B 0%, #791DA6 35%, #C724B1 70%, #FF3B8A 100%)' },
    { id: 'pastel_rose', name: 'Pastel Dusk', gradient: 'linear-gradient(135deg, #7A58E6 0%, #B77DE8 35%, #F5A7C4 70%, #FCD5B5 100%)' },
    { id: 'deep_obsidian', name: 'Dark Obsidian', gradient: 'linear-gradient(145deg, #2A364B 0%, #17202E 60%, #0D121B 100%)' },
    { id: 'teal_aurora', name: 'Teal Aurora', gradient: 'linear-gradient(145deg, #0F766E 0%, #14B8A6 50%, #2DD4BF 100%)' },
  ];

  const handleLikePost = (postId: string) => {
    toggleLikePost(postId);
  };

  const handlePublishPost = () => {
    if (!newTitle.trim() && !newCaption.trim()) return;

    const createdPost: PostItem = {
      id: `post_${Date.now()}`,
      author: {
        name: 'Mauricio Lopez',
        username: 'Maoo.lopez',
        avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
      },
      timeAgo: 'Justo ahora',
      gradient: gradientPresets[selectedGradientIndex].gradient,
      likesCount: 1,
      commentsCount: 0,
      likedByText: 'Te gusta a ti',
      captionTitle: newTitle.trim() || 'NEW CREATION',
      captionBody: newCaption.trim() || 'Explorando nuevas fronteras visuales en Shadow.',
      totalPages: 1,
      currentPage: 1,
      isLiked: true,
    };

    addNewPost(createdPost);
    setNewTitle('');
    setNewCaption('');
    handleTabChange('home');
  };

  // Category Icon helper
  const renderCategoryIcon = (name: string) => {
    switch (name) {
      case 'Tv':
        return <Tv size={18} className="text-white" />;
      case 'ShoppingBag':
        return <ShoppingBag size={18} className="text-white" />;
      case 'Plane':
        return <Plane size={18} className="text-white" />;
      case 'Dumbbell':
        return <Dumbbell size={18} className="text-white" />;
      default:
        return <Sparkles size={18} className="text-white" />;
    }
  };

  return (
    <div
      className={`relative w-[360px] sm:w-[380px] h-[780px] rounded-[44px] shadow-2xl flex flex-col overflow-hidden border transition-all duration-300 select-none ${
        isDark
          ? 'bg-[#0B0C14] text-white border-white/10 shadow-purple-950/20'
          : 'bg-white text-[#12131D] border-black/10 shadow-slate-300/40'
      }`}
    >
      {/* Floating Feedback Toast for Follows & Saves */}
      {toastMessage && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#121422]/95 backdrop-blur-md text-white text-xs font-semibold shadow-2xl border border-white/15 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-none whitespace-nowrap">
          {toastIconType === 'bookmark' ? (
            <Bookmark size={14} className="fill-[#991BEA] text-[#991BEA]" />
          ) : (
            <Sparkles size={14} className="text-[#FF0A78]" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Phone Top Notch & Status Bar (9:41, Icons) */}
      <div
        className={`pt-3 pb-1 px-7 flex items-center justify-between text-xs font-semibold ${
          currentTab === 'reels'
            ? 'absolute top-0 left-0 right-0 z-30 pointer-events-none text-slate-900 drop-shadow-xs'
            : 'relative z-20 shrink-0'
        }`}
      >
        <span className={currentTab === 'reels' ? 'text-slate-900 font-bold' : isDark ? 'text-white' : 'text-slate-900'}>
          9:41
        </span>
        <div className="w-24 h-4 bg-black/80 rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <div className={`flex items-center gap-1.5 opacity-80 ${currentTab === 'reels' ? 'text-slate-900' : ''}`}>
          {/* Signal */}
          <div className="flex items-end gap-0.5 h-2.5">
            <span className="w-0.5 h-1 bg-current rounded-xs" />
            <span className="w-0.5 h-1.5 bg-current rounded-xs" />
            <span className="w-0.5 h-2 bg-current rounded-xs" />
            <span className="w-0.5 h-2.5 bg-current rounded-xs" />
          </div>
          {/* Battery */}
          <div className="w-5 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
            <div className="w-3 h-1.5 bg-current rounded-xs" />
          </div>
        </div>
      </div>

      {/* 2. Top Header (Shared between main screens) */}
      {currentTab !== 'create' && currentTab !== 'reels' && !isViewingMyShadow && (
        <header className="h-13 px-5 flex items-center justify-between shrink-0 z-10">
          {/* Left Action: Dedicated Shadow navigation tab on Home feed, Plus (+) ONLY on Profile */}
          {currentTab === 'home' ? (
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
                  className={`w-full h-full rounded-full flex items-center justify-center transition-colors ${
                    isDark ? 'bg-[#0F111D]' : 'bg-white'
                  }`}
                >
                  <PremiumPawnInsignia
                    size={16}
                    glow={false}
                    className={isDark ? 'text-pink-400 group-hover:text-pink-300' : 'text-purple-600'}
                  />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B0C14] shadow-xs" />
            </button>
          ) : currentTab === 'profile' ? (
            <button
              onClick={() => handleTabChange('create')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${
                isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#12131D]'
              }`}
              title="Create Post (+)"
              aria-label="Create Post"
            >
              <div className="w-6.5 h-6.5 rounded-full border-2 border-current flex items-center justify-center">
                <Plus size={14} strokeWidth={2.8} />
              </div>
            </button>
          ) : (
            <div className="w-9 h-9" aria-hidden="true" />
          )}

          {/* Center Brand: "Shadow" cursive script (hidden on profile to match reference image) */}
          <div className="flex items-center justify-center">
            {currentTab !== 'profile' && (
              <h1
                className={`text-3xl font-shadow-script tracking-wide ${
                  isDark
                    ? 'text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                    : 'text-[#12131D]'
                }`}
              >
                Shadow
              </h1>
            )}
          </div>

          {/* Right Actions: Theme switch (ONLY ON PROFILE PAGE) + Profile Button */}
          <div className="flex items-center gap-1.5">
            {currentTab === 'profile' && (
              <button
                onClick={onToggleTheme}
                className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            )}

            {/* Switched: Profile Button (Circular avatar with vibrant gradient ring) */}
            <button
              onClick={() => handleTabChange('profile')}
              className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${
                currentTab === 'profile' ? 'scale-105' : 'hover:scale-105'
              }`}
              title="Perfil de Usuario"
            >
              <div
                className={`w-7.5 h-7.5 rounded-full p-[1.5px] transition-all ${
                  currentTab === 'profile'
                    ? 'ring-2 ring-pink-500 shadow-md shadow-pink-500/50'
                    : ''
                }`}
                style={{
                  background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
                }}
              >
                <div
                  className={`w-full h-full rounded-full p-[1px] ${
                    isDark ? 'bg-[#0B0C14]' : 'bg-white'
                  }`}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #FF0A78 0%, #7928CA 100%)',
                    }}
                  />
                </div>
              </div>
              {currentTab === 'profile' && (
                <div
                  className={`absolute -bottom-1.5 w-2.5 h-[2px] rounded-full ${
                    isDark ? 'bg-white' : 'bg-[#12131D]'
                  }`}
                />
              )}
            </button>
          </div>
        </header>
      )}

      {/* 3. Screen Viewport */}
      <div
        ref={viewportRef}
        onScroll={handleViewportScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`no-scrollbar relative ${
          currentTab === 'reels'
            ? 'absolute inset-0 z-10 w-full h-full overflow-y-auto snap-y snap-mandatory scroll-smooth'
            : 'flex-1 overflow-y-auto'
        }`}
      >
        {isViewingMyShadow ? (
          <MyShadowScreen
            onBack={() => setIsViewingMyShadow(false)}
            isDark={isDark}
            currentUser={{
              name: 'Mauricio Lopez',
              username: 'maoo.lopez',
              shadowId: 'shdw_mlopez89',
              rank: mauricioRank,
              isVerified: isMauricioVerified,
              avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
            }}
            onToast={triggerToast}
          />
        ) : (
          <>
            {/* ======================================= */}
            {/* SCREEN 1: HOME / FEED                   */}
            {/* ======================================= */}
        {currentTab === 'home' && (
          <div className="pb-28">
            {/* Stories Row */}
            <div className="pt-2 pb-3 px-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
              {stories.map((story) => {
                const hasActiveStory = !!(story.hasUnseen || story.storyImageUrl || story.storyCaption);

                return (
                  <div
                    key={story.id}
                    onClick={() => {
                      if (story.isCurrentUser && !hasActiveStory) {
                        setIsCameraOverlayOpen(true);
                      } else {
                        onSelectStory?.(story);
                      }
                    }}
                    className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                    title={
                      story.isCurrentUser
                        ? hasActiveStory
                          ? 'View your story or tap + to open camera'
                          : 'Open Camera · Create 24h Story'
                        : `View @${story.username}'s story`
                    }
                  >
                    <div className="relative">
                      {/* Multi-stop gradient story ring */}
                      <div
                        className={`w-16 h-16 rounded-full p-[2.5px] transition-transform group-hover:scale-105 ${
                          story.hasUnseen || (story.isCurrentUser && hasActiveStory)
                            ? 'shadow-md shadow-pink-500/40 ring-1 ring-pink-500/60'
                            : ''
                        }`}
                        style={{
                          background:
                            story.isCurrentUser && !hasActiveStory
                              ? isDark
                                ? 'linear-gradient(135deg, rgba(255,10,120,0.5) 0%, rgba(153,27,234,0.4) 100%)'
                                : 'linear-gradient(135deg, rgba(255,10,120,0.4) 0%, rgba(153,27,234,0.3) 100%)'
                              : story.gradient,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full p-[2px] ${
                            isDark ? 'bg-[#0B0C14]' : 'bg-white'
                          }`}
                        >
                          <div
                            className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative"
                            style={{ background: story.avatarGradient }}
                          >
                            {story.storyImageUrl ? (
                              <img
                                src={story.storyImageUrl}
                                alt="Current user story thumbnail"
                                className="w-full h-full object-cover"
                              />
                            ) : story.isCurrentUser && !hasActiveStory ? (
                              <Camera size={19} className="text-white/90 drop-shadow-sm" />
                            ) : null}
                          </div>
                        </div>
                      </div>

                      {/* Integrated Camera / Plus Creation Badge for Current User */}
                      {story.isCurrentUser && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsCameraOverlayOpen(true);
                          }}
                          className="absolute bottom-0 right-0 w-5.5 h-5.5 rounded-full flex items-center justify-center text-white border-2 text-[10px] font-bold shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                          style={{
                            background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 100%)',
                            borderColor: isDark ? '#0B0C14' : '#FFFFFF',
                          }}
                          title="Open Camera · Create 24h Story"
                        >
                          <Plus size={12} strokeWidth={3.2} />
                        </div>
                      )}
                    </div>

                    <span
                      className={`text-[11px] font-medium tracking-tight text-center max-w-[66px] truncate ${
                        story.hasUnseen || (story.isCurrentUser && hasActiveStory)
                          ? 'text-pink-400 font-bold'
                          : isDark
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      }`}
                    >
                      {story.username}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explorar Section & Search Control */}
            <div className="px-5 my-2 flex items-center justify-between gap-3">
              <h2
                className={`text-xl font-extrabold tracking-tight ${
                  isDark ? 'text-white' : 'text-[#12131D]'
                }`}
              >
                Explorar
              </h2>
              <div
                className={`flex-1 h-9.5 px-3.5 rounded-full flex items-center gap-2 border transition-colors ${
                  isDark
                    ? 'bg-[#161826] border-white/5 text-slate-300'
                    : 'bg-[#F2F4F8] border-black/5 text-slate-700'
                }`}
              >
                <Search size={15} className="opacity-50 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-full bg-transparent text-xs focus:outline-none placeholder-slate-400"
                />
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6 mt-3">
              {posts.map((post) => (
                <div key={post.id} className="px-4">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <div
                      className="flex items-center gap-2.5 cursor-pointer"
                      onClick={() => handleTabChange('profile')}
                    >
                      <div
                        className="w-9 h-9 rounded-full p-[2px]"
                        style={{ background: post.author.avatarGradient }}
                      >
                        <div
                          className={`w-full h-full rounded-full p-[1.5px] ${
                            isDark ? 'bg-[#0B0C14]' : 'bg-white'
                          }`}
                        >
                          <div
                            className="w-full h-full rounded-full"
                            style={{ background: post.author.avatarGradient }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p
                            className={`text-xs font-bold leading-tight ${
                              isDark ? 'text-white' : 'text-[#12131D]'
                            }`}
                          >
                            {post.author.username}
                          </p>
                          <PawnRankBadge
                            variant="compact"
                            onClick={(e) => {
                              e?.stopPropagation?.();
                              triggerToast('Shadow Rank: PAWN (Rank I)', 'sparkles');
                            }}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFollowAuthor(post.author.username);
                            }}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all active:scale-90 cursor-pointer ${
                              followedAuthors[post.author.username]
                                ? 'border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                                : 'bg-gradient-to-r from-[#FF0A78] to-[#991BEA] text-white shadow-xs hover:opacity-95'
                            }`}
                          >
                            {followedAuthors[post.author.username] ? (
                              <>
                                <UserCheck size={10} />
                                <span>Following</span>
                              </>
                            ) : (
                              <>
                                <UserPlus size={10} />
                                <span>Follow</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                          {post.author.location ? `${post.author.location} • ` : ''}
                          {post.timeAgo}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setShareModalPost(post)}
                        className="p-1.5 hover:scale-110 active:scale-95 transition-all text-current cursor-pointer rounded-full hover:bg-white/10"
                        title="Share post"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Rounded Media Card (Cinematic Gradient Artwork with Double-Tap to Like) */}
                  <div
                    onClick={() => handlePostMediaClick(post)}
                    className="relative w-full h-[360px] rounded-[32px] overflow-hidden shadow-2xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 select-none"
                    style={{ background: getPostGradient(post.id, post.gradient) }}
                  >
                    {/* Big Blooming Heart Burst on Double Tap */}
                    {heartBurstPostId === post.id && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <Heart
                          size={96}
                          className="fill-[#FF2A55] text-white animate-heart-burst drop-shadow-[0_0_24px_rgba(255,42,85,0.85)]"
                        />
                      </div>
                    )}

                    {/* Top right "1/3" page indicator */}
                    {(post.totalPages || 3) > 1 && (
                      <div className="self-end bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold border border-white/10 select-none">
                        {postSlidePages[post.id] || post.currentPage || 1}/{post.totalPages || 3}
                      </div>
                    )}

                    {/* Floating Bottom Engagement Controls */}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      {/* Red Heart Like Pill */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikePost(post.id);
                        }}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-white text-xs font-bold shadow-lg shadow-pink-600/40 active:scale-95 transition-transform cursor-pointer ${
                          post.isLiked ? 'bg-[#FF2A55]' : 'bg-[#FF2A55]'
                        }`}
                      >
                        <Heart
                          size={14}
                          className={post.isLiked ? 'fill-white text-white scale-110' : 'fill-white text-white'}
                        />
                        <span>{post.likesCount.toLocaleString()}</span>
                      </button>

                      {/* Pagination Dots (Interactive) */}
                      <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                        {[1, 2, 3].map((dot) => {
                          const activePage = postSlidePages[post.id] || post.currentPage || 1;
                          const isActive = activePage === dot;
                          return (
                            <button
                              key={dot}
                              onClick={(e) => {
                                e.stopPropagation();
                                setPostSlidePages((prev) => ({ ...prev, [post.id]: dot }));
                              }}
                              className={`transition-all duration-300 ${
                                isActive
                                  ? 'w-3.5 h-1.5 rounded-full bg-white shadow-sm'
                                  : 'w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/70'
                              }`}
                            />
                          );
                        })}
                      </div>

                      {/* Floating Circle Button (White circle with chat bubble icon) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveReelComments({
                            id: post.id,
                            author: {
                              name: post.author.name,
                              username: post.author.username,
                              location: post.author.location || 'Shadow Studio',
                              avatarGradient: post.author.avatarGradient,
                            },
                            gradient: getPostGradient(post.id, post.gradient),
                            likes: `${post.likesCount}`,
                            likesCount: post.likesCount,
                            comments: `${post.commentsCount}`,
                            commentsCount: post.commentsCount,
                            isLiked: post.isLiked,
                            isSaved: post.isSaved,
                          });
                        }}
                        className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg active:scale-95 hover:scale-105 transition-all cursor-pointer"
                        title="View comments"
                      >
                        <MessageCircle size={17} className="text-slate-900" />
                      </button>
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <div className="mt-2.5 px-1 space-y-1">
                    <p
                      className={`text-xs ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Liked by{' '}
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        danieldelax
                      </span>{' '}
                      and{' '}
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {post.likesCount.toLocaleString()} others
                      </span>
                    </p>

                    <p className="text-xs leading-relaxed">
                      <span
                        className={`font-black mr-1 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {post.captionTitle}
                      </span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {post.captionBody}
                      </span>
                    </p>

                    <button
                      className={`text-xs block mt-1 hover:underline ${
                        isDark ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      View all {post.commentsCount} comments
                    </button>

                    {/* Exact comment from reference Image 2 */}
                    <p className="text-xs leading-relaxed mt-0.5">
                      <span className={`font-bold mr-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Perla_Pipol
                      </span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        This edit is so incredible, pure genius!!
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pull Up Refresh Component at Bottom of Home Feed */}
            <div className="pt-2 pb-6 flex justify-center">
              <PullUpRefresh
                onRefresh={handlePullUpRefresh}
                isRefreshing={isPullUpRefreshing}
                pullDistance={pullUpDistance}
                threshold={50}
                isDark={isDark}
                label="Pull up to refresh feed"
              />
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* SCREEN 2: DISCOVER / EXPLORE            */}
        {/* ======================================= */}
        {currentTab === 'explore' && (
          <div className="pb-28">
            {/* Horizontal Categories Row: IGTV, TIENDA, VIAJES, FITNESS */}
            <div className="px-4 py-2 flex items-center gap-3 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (cat.id === 'igtv') handleTabChange('reels');
                    else if (cat.id === 'tienda') handleTabChange('shop');
                  }}
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                >
                  <div
                    className={`w-18 h-18 rounded-[20px] shadow-md flex flex-col items-center justify-center p-2 gap-1.5 group-hover:scale-105 active:scale-95 transition-all ${
                      selectedCategory === cat.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0B0C14]' : ''
                    }`}
                    style={{ background: cat.gradient }}
                  >
                    {renderCategoryIcon(cat.iconName)}
                    <span className="text-white text-[10px] font-black tracking-wider uppercase">
                      {cat.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Search Bar with Live Controlled Input, Scan & Cancel */}
            <div className="px-5 my-3">
              <div className="flex items-center gap-2">
                <div
                  className={`h-11 px-4 rounded-full flex items-center justify-between border transition-all flex-1 ${
                    isDark
                      ? 'bg-[#161826] border-white/10 text-slate-300 focus-within:border-pink-500/50 focus-within:ring-1 focus-within:ring-pink-500/30'
                      : 'bg-[#F2F4F8] border-black/5 text-slate-700 focus-within:border-pink-500/50 focus-within:ring-1 focus-within:ring-pink-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <Search size={16} className="opacity-50 shrink-0" />
                    <input
                      type="text"
                      value={exploreSearchQuery}
                      onChange={(e) => setExploreSearchQuery(e.target.value)}
                      onFocus={() => setIsExploreSearchFocused(true)}
                      placeholder="Search creators, #tags, aesthetics..."
                      className="w-full bg-transparent text-xs focus:outline-none placeholder-slate-400"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-1">
                    {exploreSearchQuery.length > 0 && (
                      <button
                        onClick={() => setExploreSearchQuery('')}
                        className="p-1 rounded-full hover:bg-white/10 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                        title="Clear search"
                      >
                        <X size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => triggerToast('AR Lens & QR scanner activated', 'sparkles')}
                      className="p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                      title="Scan QR or AR Marker"
                    >
                      <Scan size={17} />
                    </button>
                  </div>
                </div>

                {(isExploreSearchFocused || exploreSearchQuery.length > 0) && (
                  <button
                    onClick={() => {
                      setExploreSearchQuery('');
                      setIsExploreSearchFocused(false);
                    }}
                    className="text-xs font-semibold text-pink-500 hover:text-pink-400 px-1 py-2 cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* ======================================================== */}
            {/* SEARCH RESULTS OVERLAY (Active when user types or focuses) */}
            {/* ======================================================== */}
            {exploreSearchQuery.trim().length > 0 ? (
              (() => {
                const normalizedQuery = exploreSearchQuery.trim().toLowerCase().replace(/^#/, '');
                const matchingProfiles = MOCK_EXPLORE_PROFILES.filter(
                  (p) =>
                    p.name.toLowerCase().includes(normalizedQuery) ||
                    p.username.toLowerCase().includes(normalizedQuery) ||
                    p.bio.toLowerCase().includes(normalizedQuery)
                );
                const matchingTags = MOCK_TRENDING_TAGS.filter(
                  (t) =>
                    t.tag.toLowerCase().includes(normalizedQuery) ||
                    t.category.toLowerCase().includes(normalizedQuery)
                );
                const hasResults = matchingProfiles.length > 0 || matchingTags.length > 0;

                return (
                  <div className="px-4 pb-6 animate-in fade-in duration-200">
                    {/* Search Category Filter Pills */}
                    <div className="flex items-center gap-2 mb-3 px-1 overflow-x-auto no-scrollbar">
                      {(
                        [
                          { id: 'all', label: 'All', count: matchingProfiles.length + matchingTags.length },
                          { id: 'accounts', label: 'Accounts', count: matchingProfiles.length },
                          { id: 'tags', label: 'Tags', count: matchingTags.length },
                        ] as const
                      ).map((tab) => {
                        const isSelected = exploreSearchFilter === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setExploreSearchFilter(tab.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                                : isDark
                                ? 'bg-[#161826] text-slate-400 hover:text-white border border-white/5'
                                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-black/5'
                            }`}
                          >
                            <span>{tab.label}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                isSelected ? 'bg-white/25 text-white' : 'bg-white/10 text-slate-400'
                              }`}
                            >
                              {tab.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {!hasResults ? (
                      /* No Results Empty State */
                      <div
                        className={`rounded-3xl p-6 text-center border my-4 ${
                          isDark ? 'bg-[#151726]/80 border-white/10' : 'bg-slate-50 border-black/5'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center mx-auto mb-3">
                          <Search size={22} />
                        </div>
                        <h4
                          className={`text-sm font-bold mb-1 ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          No results for "{exploreSearchQuery}"
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          Try searching for creators like "Elena", "Sofia", or popular tags like #cyberpunk.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-1.5">
                          {['#cyberpunk', '#shadowart', 'elena.art', '#octanerender'].map((suggested) => (
                            <button
                              key={suggested}
                              onClick={() => setExploreSearchQuery(suggested)}
                              className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                                isDark
                                  ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {suggested}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* 1. MOCK USER PROFILES */}
                        {(exploreSearchFilter === 'all' || exploreSearchFilter === 'accounts') &&
                          matchingProfiles.length > 0 && (
                            <div>
                              <div className="flex items-center justify-between px-1 mb-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                  Creators & Accounts ({matchingProfiles.length})
                                </span>
                              </div>

                              <div className="divide-y divide-white/5 space-y-1">
                                {matchingProfiles.map((profile) => {
                                  const isFollowing = !!followedAuthors[profile.username];

                                  return (
                                    <div
                                      key={profile.id}
                                      className={`p-3 rounded-2xl flex items-center justify-between gap-3 transition-colors ${
                                        isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                                      }`}
                                    >
                                      {/* Avatar and Info */}
                                      <div
                                        className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                                        onClick={() => {
                                          if (profile.id === 'mauricio') {
                                            handleTabChange('profile');
                                          } else {
                                            triggerToast(
                                              `Viewing @${profile.username}'s portfolio`,
                                              'sparkles'
                                            );
                                          }
                                        }}
                                      >
                                        <div className="relative shrink-0">
                                          <div
                                            className="w-11 h-11 rounded-full p-[2px]"
                                            style={{ background: profile.avatarGradient }}
                                          >
                                            <div
                                              className={`w-full h-full rounded-full ${
                                                isDark ? 'bg-[#0B0C14]' : 'bg-white'
                                              }`}
                                            />
                                          </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-1.5">
                                            <span
                                              className={`text-xs font-bold truncate ${
                                                isDark ? 'text-white' : 'text-slate-900'
                                              }`}
                                            >
                                              {profile.name}
                                            </span>
                                            {profile.verified && (
                                              <PawnRankBadge variant="coin" size="sm" />
                                            )}
                                          </div>
                                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                            <span>@{profile.username}</span>
                                            <span>·</span>
                                            <span className="font-semibold text-pink-400">
                                              {profile.followers}
                                            </span>
                                          </div>
                                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                                            {profile.bio}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Action Controls: Follow & Direct Message */}
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <button
                                          onClick={() => {
                                            handleTabChange('chat');
                                            setActiveChatUserId(profile.id);
                                            triggerToast(`Chat with @${profile.username}`, 'sparkles');
                                          }}
                                          className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                                            isDark
                                              ? 'border-white/10 hover:bg-white/10 text-slate-300'
                                              : 'border-black/5 hover:bg-black/5 text-slate-700'
                                          }`}
                                          title="Direct Message"
                                        >
                                          <MessageCircle size={14} />
                                        </button>

                                        <button
                                          onClick={() => handleToggleFollowAuthor(profile.username)}
                                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                                            isFollowing
                                              ? 'border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                                              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs hover:opacity-95'
                                          }`}
                                        >
                                          {isFollowing ? 'Following' : 'Follow'}
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                        {/* 2. TRENDING TAGS */}
                        {(exploreSearchFilter === 'all' || exploreSearchFilter === 'tags') &&
                          matchingTags.length > 0 && (
                            <div>
                              <div className="flex items-center justify-between px-1 mb-2 mt-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                  Trending Tags ({matchingTags.length})
                                </span>
                              </div>

                              <div className="space-y-1 pb-28">
                                {matchingTags.map((tag) => (
                                  <div
                                    key={tag.id}
                                    onClick={() => {
                                      setExploreSearchQuery(`#${tag.tag}`);
                                      triggerToast(`Showing #${tag.tag} feed`, 'sparkles');
                                    }}
                                    className={`p-2.5 rounded-2xl flex items-center justify-between transition-colors cursor-pointer group ${
                                      isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm transition-transform group-hover:scale-105 ${
                                          isDark
                                            ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
                                            : 'bg-pink-50 text-pink-600 border border-pink-200'
                                        }`}
                                      >
                                        <Hash size={16} />
                                      </div>
                                      <div>
                                        <span
                                          className={`text-xs font-bold group-hover:text-pink-500 transition-colors block ${
                                            isDark ? 'text-white' : 'text-slate-900'
                                          }`}
                                        >
                                          #{tag.tag}
                                        </span>
                                        <span className="text-[10px] text-slate-400">
                                          {tag.postsCount} posts · {tag.category}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                                      <TrendingUp size={13} />
                                      <span>{tag.growth}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                );
              })()
            ) : isExploreSearchFocused ? (
              /* FOCUSED RECENT / TRENDING DISCOVERY */
              <div className="px-5 pb-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Trending Right Now
                  </span>
                  <span className="text-[10px] text-pink-500 font-semibold">Live</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {MOCK_TRENDING_TAGS.slice(0, 6).map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => setExploreSearchQuery(`#${tag.tag}`)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        isDark
                          ? 'bg-[#161826] border-white/10 text-slate-300 hover:border-pink-500/50 hover:text-white'
                          : 'bg-white border-black/5 text-slate-700 hover:border-pink-500/50 hover:text-slate-900 shadow-xs'
                      }`}
                    >
                      <Hash size={12} className="text-pink-400" />
                      <span>{tag.tag}</span>
                      <span className="text-[10px] text-slate-400">{tag.postsCount}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Suggested Creators
                  </span>
                </div>

                <div className="space-y-1">
                  {MOCK_EXPLORE_PROFILES.slice(1, 4).map((creator) => (
                    <div
                      key={creator.id}
                      onClick={() => {
                        handleTabChange('chat');
                        setActiveChatUserId(creator.id);
                        triggerToast(`Chat with @${creator.username}`, 'sparkles');
                      }}
                      className={`p-2 rounded-2xl flex items-center justify-between cursor-pointer transition-colors ${
                        isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-8 h-8 rounded-full p-[1.5px]"
                          style={{ background: creator.avatarGradient }}
                        >
                          <div
                            className={`w-full h-full rounded-full ${
                              isDark ? 'bg-[#0B0C14]' : 'bg-white'
                            }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-bold truncate ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {creator.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">@{creator.username}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-pink-500">Connect</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* REGULAR EXPLORE MEDIA GRID */
              <>
                {/* Popular Heading */}
                <div className="px-5 mt-2 mb-3">
                  <h2
                    className={`text-xl font-extrabold tracking-tight ${
                      isDark ? 'text-white' : 'text-[#12131D]'
                    }`}
                  >
                    Popular
                  </h2>
                </div>

                {/* Asymmetric Media Grid (Exact Replica from Image 3) */}
                <div className="px-4 grid grid-cols-2 gap-3">
                  {/* Left Column (3 cards) */}
                  <div className="flex flex-col gap-3">
                    <div
                      className="w-full h-44 rounded-[24px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                      style={{ background: EXPLORE_CARDS[0].gradient }}
                    />
                    <div
                      className="w-full h-38 rounded-[24px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                      style={{ background: EXPLORE_CARDS[1].gradient }}
                    />
                    <div
                      className="w-full h-40 rounded-[24px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                      style={{ background: EXPLORE_CARDS[2].gradient }}
                    />
                  </div>

                  {/* Right Column (4 cards) */}
                  <div className="flex flex-col gap-3">
                    <div
                      className="w-full h-36 rounded-[24px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                      style={{ background: EXPLORE_CARDS[3].gradient }}
                    />
                    <div
                      className="w-full h-50 rounded-[24px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                      style={{ background: EXPLORE_CARDS[4].gradient }}
                    />
                    <div
                      className="w-full h-32 rounded-[24px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                      style={{ background: EXPLORE_CARDS[5].gradient }}
                    />
                    <div
                      className="w-full h-36 rounded-[24px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                      style={{ background: EXPLORE_CARDS[6].gradient }}
                    />
                  </div>
                </div>

                {/* Pull Up Refresh Component at Bottom of Explore */}
                <div className="pt-3 pb-4 flex justify-center">
                  <PullUpRefresh
                    onRefresh={async () => {
                      await new Promise((r) => setTimeout(r, 700));
                      triggerToast('Explorar synced with trending creative posts!', 'sparkles');
                    }}
                    isDark={isDark}
                    label="Pull up to refresh explore"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* ======================================= */}
        {/* SCREEN: REELS (Full-Screen Immersive Snapping Feed with Background Preloading) */}
        {/* ======================================= */}
        {currentTab === 'reels' && (
          <div className="w-full h-full">
            {reels.map((reel, index) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={index}
                isActive={activeReelIndex === index}
                isNext={activeReelIndex + 1 === index}
                preloadStatus={preloadedStatusMap.get(reel.id)}
                isNavShrunk={isNavShrunk}
                isDark={isDark}
                isFollowing={!!followedAuthors[reel.author.username]}
                poppingBookmarkId={poppingBookmarkReelId}
                heartBurstId={heartBurstReelId}
                isSwipingReel={isSwipingReel}
                reelSwipeDeltaX={reelSwipeDeltaX}
                onTouchStart={handleReelTouchStart}
                onTouchMove={handleReelTouchMove}
                onTouchEnd={() => handleReelTouchEnd(reel)}
                onTouchLeave={() => {
                  if (isSwipingReel) {
                    setIsSwipingReel(false);
                    setReelSwipeDeltaX(0);
                    setReelSwipeStartX(null);
                    setReelSwipeStartY(null);
                  }
                }}
                registerRef={registerReelRef}
                onToggleLike={handleToggleReelLike}
                onToggleSave={handleToggleReelSave}
                onToggleFollow={handleToggleFollowAuthor}
                onOpenComments={setActiveReelComments}
                onOpenShare={(r) => {
                  setShareModalPost({
                    id: r.id,
                    author: {
                      name: r.author.name,
                      username: r.author.username,
                      location: r.author.location,
                      avatarGradient: r.author.avatarGradient,
                    },
                    timeAgo: 'Just now',
                    gradient: r.gradient,
                    likesCount: r.likesCount,
                    commentsCount: r.commentsCount,
                    likedByText: `${r.likes} likes`,
                    captionTitle: r.caption || r.author.name,
                    captionBody: r.author.location,
                    totalPages: 1,
                    currentPage: 1,
                    isLiked: r.isLiked,
                    isSaved: r.isSaved,
                  });
                }}
                onNavigateProfile={() => handleTabChange('profile')}
                onToast={triggerToast}
              />
            ))}
          </div>
        )}

        {/* ======================================= */}
        {/* SCREEN: SHOP / TIENDA                   */}
        {/* ======================================= */}
        {currentTab === 'shop' && (
          <div className="pb-8 px-4 pt-2">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2
                className={`text-xl font-extrabold tracking-tight ${
                  isDark ? 'text-white' : 'text-[#12131D]'
                }`}
              >
                Shadow Shop
              </h2>
              <span className="text-xs font-semibold text-pink-500">Collections</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Cyber Hoodie', price: '$85', grad: 'linear-gradient(135deg, #FF0A78 0%, #7928CA 100%)' },
                { title: 'Prism Print #01', price: '$40', grad: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)' },
                { title: 'Obsidian Case', price: '$35', grad: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)' },
                { title: 'Neon Sculpture', price: '$220', grad: 'linear-gradient(135deg, #F97316 0%, #FB7185 100%)' },
              ].map((prod, i) => (
                <div
                  key={i}
                  className="rounded-[22px] overflow-hidden border border-white/10 shadow-md flex flex-col p-3 gap-2"
                  style={{ background: isDark ? '#161826' : '#FFFFFF' }}
                >
                  <div
                    className="w-full h-32 rounded-[16px] shadow-inner"
                    style={{ background: prod.grad }}
                  />
                  <div>
                    <h4 className="text-xs font-bold truncate">{prod.title}</h4>
                    <p className="text-xs font-extrabold text-pink-500">{prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* SCREEN 3: CREATE / COMPOSER             */}
        {/* ======================================= */}
        {currentTab === 'create' && (
          <div className="p-5 flex flex-col h-full justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <button
                  onClick={() => handleTabChange('home')}
                  className="p-1 hover:opacity-70"
                >
                  <X size={20} />
                </button>
                <h2 className="text-base font-bold">Create Post</h2>
                <button
                  onClick={handlePublishPost}
                  className="text-xs font-bold text-pink-500 hover:text-pink-400"
                >
                  Publish
                </button>
              </div>

              {/* Media Card Preview */}
              <div
                className="w-full h-48 rounded-[24px] shadow-xl p-3.5 flex flex-col justify-end mb-4 border border-white/10"
                style={{ background: gradientPresets[selectedGradientIndex].gradient }}
              >
                <div className="flex items-center gap-1.5 self-start bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-medium">
                  <Sparkles size={12} />
                  <span>{gradientPresets[selectedGradientIndex].name}</span>
                </div>
              </div>

              {/* Gradient Selector */}
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Art Palette
              </p>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-4">
                {gradientPresets.map((preset, idx) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedGradientIndex(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium shrink-0 transition-all ${
                      selectedGradientIndex === idx
                        ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                        : 'border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ background: preset.gradient }}
                    />
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Artwork Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: SACRIFICE | VIRUS"
                    className={`w-full h-10 px-3.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-[#161826] border-white/5 text-white'
                        : 'bg-[#F2F4F8] border-black/5 text-[#12131D]'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Inspiration & Description
                  </label>
                  <textarea
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    rows={3}
                    placeholder="Describe the visual concept of your artwork..."
                    className={`w-full p-3 rounded-xl border text-xs focus:outline-none transition-colors resize-none ${
                      isDark
                        ? 'bg-[#161826] border-white/5 text-white'
                        : 'bg-[#F2F4F8] border-black/5 text-[#12131D]'
                    }`}
                  />
                </div>

                {/* Post Format Tabs */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Format
                  </label>
                  <div className="flex gap-2">
                    {(['feed', 'story', 'igtv'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setNewType(type)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                          newType === type
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                            : isDark
                            ? 'bg-[#161826] text-slate-400'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {type === 'feed' ? 'Feed' : type === 'story' ? 'Story' : 'IGTV'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visibility */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Audience
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: 'public', label: 'Public', icon: Globe },
                      { id: 'followers', label: 'Followers', icon: Users },
                      { id: 'close_friends', label: 'Close Friends', icon: Star },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSel = newVisibility === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setNewVisibility(item.id as any)}
                          className={`flex-1 py-2 px-2 rounded-xl border flex items-center justify-center gap-1.5 text-[11px] font-semibold transition-colors ${
                            isSel
                              ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                              : isDark
                              ? 'border-white/5 bg-[#161826] text-slate-400'
                              : 'border-black/5 bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Icon size={13} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Primary Button */}
            <button
              onClick={handlePublishPost}
              className="w-full h-12 rounded-full font-bold text-white text-sm shadow-xl shadow-pink-500/30 flex items-center justify-center transition-transform active:scale-98 mt-4"
              style={{
                background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
              }}
            >
              Share to Shadow
            </button>
          </div>
        )}

        {/* ======================================= */}
        {/* SCREEN 4: CHAT & DIRECT MESSAGES        */}
        {/* ======================================= */}
        {(currentTab === 'chat' || currentTab === 'shop') && (
          <div className="flex flex-col h-full pb-4">
            {activeChatUserId ? (
              // ACTIVE CHAT THREAD (Fully Conversable)
              (() => {
                const activeContact = CHAT_USERS.find((u) => u.id === activeChatUserId) || CHAT_USERS[0];
                const messages = chatMessages[activeContact.id] || [];

                return (
                  <div className="flex flex-col h-full">
                    {/* Chat Thread Header */}
                    <div
                      className={`px-4 py-2.5 flex items-center justify-between border-b shrink-0 ${
                        isDark ? 'border-white/10 bg-[#0F111D]/80 backdrop-blur-md' : 'border-black/5 bg-white/80 backdrop-blur-md'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          onClick={() => setActiveChatUserId(null)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                            isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-slate-800'
                          }`}
                          title="Back to conversations"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <div className="relative shrink-0">
                          <div
                            className="w-9 h-9 rounded-full p-[1.5px]"
                            style={{ background: activeContact.avatarGradient }}
                          >
                            <div className={`w-full h-full rounded-full ${isDark ? 'bg-[#0B0C14]' : 'bg-white'}`} />
                          </div>
                          {activeContact.online && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B0C14]" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className={`text-xs font-extrabold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {activeContact.name}
                            </span>
                            {activeContact.verified && (
                              <PawnRankBadge variant="coin" size="sm" />
                            )}
                          </div>
                          <span className="text-[10px] text-emerald-400 font-semibold block leading-tight">
                            {activeContact.online ? '● Active now' : activeContact.lastSeen}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-80 text-current">
                        <button
                          onClick={() => triggerToast(`Calling ${activeContact.name}...`, 'sparkles')}
                          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                          title="Voice Call"
                        >
                          <Phone size={15} />
                        </button>
                        <button
                          onClick={() => triggerToast(`Starting video with ${activeContact.name}...`, 'sparkles')}
                          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                          title="Video Call"
                        >
                          <Video size={16} />
                        </button>
                        <button
                          onClick={() => triggerToast(`${activeContact.name} is a verified Shadow artist`, 'sparkles')}
                          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                        >
                          <Info size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Messages Scroll Area */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
                      {/* Security / Encryption Pill */}
                      <div className="flex justify-center my-1">
                        <span className="text-[9px] font-semibold text-slate-400 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Shield size={10} className="text-pink-400" />
                          End-to-end encrypted · Shadow Peer
                        </span>
                      </div>

                      {messages.map((m) => {
                        const isMe = m.sender === 'me';
                        return (
                          <div
                            key={m.id}
                            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-1 duration-200`}
                          >
                            <div
                              className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed select-text shadow-sm ${
                                isMe
                                  ? 'text-white rounded-br-xs font-medium'
                                  : isDark
                                  ? 'bg-[#181A2A] text-slate-200 border border-white/10 rounded-bl-xs'
                                  : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-xs'
                              }`}
                              style={
                                isMe
                                  ? {
                                      background:
                                        'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
                                    }
                                  : {}
                              }
                            >
                              {m.text}
                            </div>
                            <span className="text-[9px] text-slate-400 mt-0.5 px-1 font-mono">
                              {m.time} {isMe ? '✓✓' : ''}
                            </span>
                          </div>
                        );
                      })}

                      {/* Responsive Typing Indicator */}
                      {isTypingReply && (
                        <div className="flex items-center gap-1.5 py-1 px-3 rounded-2xl bg-white/5 border border-white/5 text-slate-400 w-fit animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.15s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.3s]" />
                          <span className="text-[10px] ml-1 font-semibold">{activeContact.name} is typing...</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Smart Suggestion Chips */}
                    <div className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                      {[
                        "Love this! 🔥",
                        "Let's collab ✨",
                        "Can you send the 3D model?",
                        "Check my new post ♟️",
                      ].map((promptText) => (
                        <button
                          key={promptText}
                          onClick={() => handleSendChatMessage(promptText)}
                          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap border shrink-0 transition-transform active:scale-95 cursor-pointer ${
                            isDark
                              ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                              : 'bg-slate-100 hover:bg-slate-200 border-black/5 text-slate-700'
                          }`}
                        >
                          {promptText}
                        </button>
                      ))}
                    </div>

                    {/* Chat Input Field */}
                    <div
                      className={`p-2.5 border-t shrink-0 ${
                        isDark ? 'border-white/10 bg-[#0B0C14]' : 'border-black/5 bg-white'
                      }`}
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendChatMessage();
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                          isDark
                            ? 'bg-[#151726] border-white/10 focus-within:border-pink-500/50'
                            : 'bg-slate-100 border-black/5 focus-within:border-pink-500/50'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => triggerToast('Emoji reactions opened', 'sparkles')}
                          className="text-slate-400 hover:text-pink-400 transition-colors cursor-pointer"
                        >
                          <Smile size={16} />
                        </button>

                        <input
                          type="text"
                          value={chatInputText}
                          onChange={(e) => setChatInputText(e.target.value)}
                          placeholder={`Message ${activeContact.name}...`}
                          className={`flex-1 bg-transparent text-xs focus:outline-none ${
                            isDark ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
                          }`}
                        />

                        <button
                          type="button"
                          onClick={() => triggerToast('Attach media (Photo / 3D model)', 'sparkles')}
                          className="text-slate-400 hover:text-purple-400 transition-colors cursor-pointer"
                        >
                          <Paperclip size={15} />
                        </button>

                        <button
                          type="submit"
                          disabled={!chatInputText.trim()}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                            chatInputText.trim()
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30 scale-100'
                              : 'text-slate-500 opacity-60'
                          }`}
                          title="Send Message"
                        >
                          <Send size={13} className="ml-0.5" />
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })()
            ) : (
              // CONVERSATIONS INBOX LIST
              <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
                {/* Inbox Header */}
                <div className="px-5 pt-1 pb-3 flex items-center justify-between">
                  <div>
                    <h2
                      className={`text-xl font-extrabold tracking-tight ${
                        isDark ? 'text-white' : 'text-[#12131D]'
                      }`}
                    >
                      Direct Messages
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Real-time peer chat with Shadow creators
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-pink-500/20 text-pink-400 border border-pink-500/30">
                    4 Active
                  </span>
                </div>

                {/* Search Bar */}
                <div className="px-5 mb-3">
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs ${
                      isDark
                        ? 'bg-[#151726] border-white/10 text-slate-300'
                        : 'bg-slate-100 border-black/5 text-slate-700'
                    }`}
                  >
                    <Search size={14} className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={chatSearchQuery}
                      onChange={(e) => setChatSearchQuery(e.target.value)}
                      placeholder="Search conversations..."
                      className="bg-transparent w-full focus:outline-none placeholder-slate-400 text-xs"
                    />
                  </div>
                </div>

                {/* Active Now Row (Story-like circles) */}
                <div className="px-5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Active Creators
                  </span>
                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
                    {CHAT_USERS.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => setActiveChatUserId(user.id)}
                        className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                      >
                        <div className="relative">
                          <div
                            className="w-12 h-12 rounded-full p-[2px] transition-transform group-hover:scale-105"
                            style={{ background: user.avatarGradient }}
                          >
                            <div className={`w-full h-full rounded-full ${isDark ? 'bg-[#0B0C14]' : 'bg-white'}`} />
                          </div>
                          {user.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0B0C14]" />
                          )}
                        </div>
                        <span className="text-[10px] font-semibold text-slate-300 max-w-[48px] truncate">
                          {user.name.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversation Threads List */}
                <div className="divide-y divide-white/5 px-2 pb-28">
                  {CHAT_USERS.filter(
                    (u) =>
                      u.name.toLowerCase().includes(chatSearchQuery.toLowerCase()) ||
                      u.username.toLowerCase().includes(chatSearchQuery.toLowerCase())
                  ).map((user) => {
                    const userMsgs = chatMessages[user.id] || [];
                    const lastMsg = userMsgs[userMsgs.length - 1];

                    return (
                      <div
                        key={user.id}
                        onClick={() => setActiveChatUserId(user.id)}
                        className={`px-3 py-3 rounded-2xl flex items-center gap-3 transition-all cursor-pointer ${
                          isDark ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-black/5 active:bg-black/10'
                        }`}
                      >
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          <div
                            className="w-12 h-12 rounded-full p-[2px]"
                            style={{ background: user.avatarGradient }}
                          >
                            <div className={`w-full h-full rounded-full ${isDark ? 'bg-[#0B0C14]' : 'bg-white'}`} />
                          </div>
                          {user.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0B0C14]" />
                          )}
                        </div>

                        {/* Name & Last Message */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span
                                className={`text-xs font-bold truncate ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                }`}
                              >
                                {user.name}
                              </span>
                              {user.verified && <PawnRankBadge variant="coin" size="sm" />}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono shrink-0">
                              {lastMsg?.time || 'Just now'}
                            </span>
                          </div>

                          <p
                            className={`text-xs truncate ${
                              user.unread ? 'font-bold text-pink-400' : 'text-slate-400'
                            }`}
                          >
                            {lastMsg ? (
                              <span>
                                {lastMsg.sender === 'me' ? 'You: ' : ''}
                                {lastMsg.text}
                              </span>
                            ) : (
                              user.status
                            )}
                          </p>
                        </div>

                        {/* Unread dot */}
                        {user.unread && (
                          <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-sm shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================= */}
        {/* SCREEN 5: NOTIFICATIONS & ACTIVITY      */}
        {/* ======================================= */}
        {currentTab === 'notifications' && (
          <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-28">
            {/* Notifications Header */}
            <div className="px-5 pt-2 pb-3 flex items-center justify-between shrink-0">
              <div>
                <h2 className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Activity
                </h2>
                <p className="text-[11px] text-slate-400">
                  {notificationsList.filter((n) => !n.isRead).length > 0
                    ? `${notificationsList.filter((n) => !n.isRead).length} new updates`
                    : 'All caught up'}
                </p>
              </div>

              {notificationsList.some((n) => !n.isRead) && (
                <button
                  onClick={() => {
                    setNotificationsList((prev) => prev.map((n) => ({ ...n, isRead: true })));
                    setHasUnreadNotifs(false);
                    triggerToast('Marked all notifications as read', 'sparkles');
                  }}
                  className="flex items-center gap-1 text-[11px] font-bold text-pink-400 hover:text-pink-300 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 transition-all cursor-pointer"
                >
                  <CheckCheck size={13} />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="px-5 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              {(['all', 'likes', 'comments', 'follows'] as const).map((filter) => {
                const isActive = notifFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setNotifFilter(filter)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer capitalize shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                        : isDark
                        ? 'bg-white/5 hover:bg-white/10 text-slate-400'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Notifications List */}
            <div className="px-3 space-y-1">
              {notificationsList
                .filter((item) => {
                  if (notifFilter === 'likes') return item.actionType === 'like';
                  if (notifFilter === 'comments') return item.actionType === 'comment';
                  if (notifFilter === 'follows') return item.actionType === 'follow';
                  return true;
                })
                .map((notif) => {
                  return (
                    <div
                      key={notif.id}
                      onClick={() => {
                        setNotificationsList((prev) =>
                          prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
                        );
                        triggerToast(`Viewed notification from @${notif.user.username}`);
                      }}
                      className={`p-2.5 rounded-2xl flex items-center gap-3 transition-colors cursor-pointer border ${
                        !notif.isRead
                          ? isDark
                            ? 'bg-pink-500/[0.08] hover:bg-pink-500/[0.12] border-pink-500/20'
                            : 'bg-pink-50/70 hover:bg-pink-50 border-pink-200/50'
                          : isDark
                          ? 'hover:bg-white/[0.04] border-transparent'
                          : 'hover:bg-slate-50 border-transparent'
                      }`}
                    >
                      {/* Avatar with Action Icon Badge */}
                      <div className="relative shrink-0">
                        <div
                          className="w-10 h-10 rounded-full p-[2px]"
                          style={{ background: notif.user.avatarGradient }}
                        >
                          <div
                            className={`w-full h-full rounded-full ${
                              isDark ? 'bg-[#0B0C14]' : 'bg-white'
                            }`}
                          />
                        </div>

                        {/* Action Icon Badge */}
                        <div
                          className={`absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center text-white text-[9px] shadow-sm ${
                            notif.actionType === 'like'
                              ? 'bg-gradient-to-tr from-[#FF0A78] to-[#FF2D55]'
                              : notif.actionType === 'comment'
                              ? 'bg-gradient-to-tr from-[#06B6D4] to-[#3B82F6]'
                              : 'bg-gradient-to-tr from-[#991BEA] to-[#6366F1]'
                          }`}
                        >
                          {notif.actionType === 'like' ? (
                            <Heart size={9} className="fill-white" />
                          ) : notif.actionType === 'comment' ? (
                            <MessageCircle size={9} className="fill-white" />
                          ) : (
                            <UserPlus size={9} />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs leading-snug ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          <strong className="font-bold">{notif.user.name}</strong>{' '}
                          <span className={!notif.isRead ? (isDark ? 'text-white' : 'text-slate-900') : 'text-slate-400'}>
                            {notif.content}
                          </span>
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                          {notif.timeAgo}
                        </span>
                      </div>

                      {/* Right Accessory: Follow Button or Post Thumbnail */}
                      {notif.actionType === 'follow' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFollowAuthor(notif.user.username);
                          }}
                          className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all shrink-0 cursor-pointer ${
                            followedAuthors[notif.user.username]
                              ? isDark
                                ? 'bg-white/10 text-white'
                                : 'bg-slate-200 text-slate-800'
                              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                          }`}
                        >
                          {followedAuthors[notif.user.username] ? 'Following' : 'Follow'}
                        </button>
                      ) : notif.postThumbnailGradient ? (
                        <div
                          className="w-9 h-9 rounded-xl shrink-0 shadow-sm border border-white/10"
                          style={{ background: notif.postThumbnailGradient }}
                        />
                      ) : null}

                      {!notif.isRead && (
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* SCREEN 6: PROFILE (Mauricio Lopez)      */}
        {/* ======================================= */}
        {currentTab === 'profile' && (
          <div className="pb-28">
              {/* Top Avatar & Info */}
              <div className="flex flex-col items-center px-6 pt-3">
                {/* Large Centered Avatar with vibrant gradient ring */}
                <div
                  className="w-22 h-22 rounded-full p-[3.5px] shadow-xl mb-3.5"
                  style={{
                    background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
                  }}
                >
                  <div
                    className={`w-full h-full rounded-full p-[3px] ${
                      isDark ? 'bg-[#0B0C14]' : 'bg-white'
                    }`}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #FF0A78 0%, #7928CA 60%, #4338CA 100%)',
                      }}
                    />
                  </div>
                </div>

                {/* Mauricio Lopez Title & Username */}
                <h2
                  className={`text-xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-[#12131D]'
                  }`}
                >
                  Mauricio Lopez
                </h2>
                <span className="text-[11px] font-semibold text-slate-400 mb-2">
                  @maoo.lopez
                </span>

                {/* Shadow Identity & Pawn Rank Card */}
                <div
                  className={`w-full max-w-[325px] rounded-[24px] p-3 mb-2.5 border transition-all duration-300 ${
                    isDark
                      ? 'bg-[#151726]/95 border-white/10 shadow-xl shadow-black/40'
                      : 'bg-white/95 border-slate-200/90 shadow-lg shadow-slate-200/50'
                  }`}
                >
                  {/* Header row: Shadow Identity label + Shadow ID */}
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                      <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                        Shadow Identity
                      </span>
                    </div>
                    <button
                      onClick={() => triggerToast('Shadow ID copied: shdw_mlopez89')}
                      className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors cursor-pointer"
                      title="Click to copy Shadow ID"
                    >
                      <span className="text-pink-400 font-bold">ID:</span>
                      <span>shdw_mlopez89</span>
                      <Copy size={10} className="text-slate-400 ml-0.5" />
                    </button>
                  </div>

                  {/* Primary Premium Status Indicator: Distinct Proportional Rank Badge with Visual Transition */}
                  <div className="mb-2.5">
                    <PawnRankBadge
                      rank={mauricioRank}
                      variant="profile"
                      isDark={isDark}
                      isPromoting={isRankTransitioning}
                      onClick={() => setShowRankHierarchyModal(true)}
                    />
                  </div>

                  {/* Secondary Row: Independent Verification Status + Rank Progression Demo Button */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                    {/* Rank Elevate Trigger Button */}
                    <button
                      onClick={handlePromoteRank}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[9.5px] font-extrabold transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                        mauricioRank === 'PAWN'
                          ? 'bg-purple-500/15 border-purple-500/35 text-purple-300 hover:bg-purple-500/25 shadow-xs shadow-purple-500/20'
                          : 'bg-pink-500/15 border-pink-500/35 text-pink-300 hover:bg-pink-500/25 shadow-xs shadow-pink-500/20'
                      }`}
                      title="Simulate Shadow Rank Progression: PAWN ↔ KNIGHT"
                    >
                      <Sparkles size={11} className={mauricioRank === 'PAWN' ? 'text-cyan-400 animate-pulse' : 'text-pink-400'} />
                      <span>{mauricioRank === 'PAWN' ? 'Elevate to KNIGHT' : 'Revert to PAWN'}</span>
                    </button>

                    {/* Verification Status (Independent from Rank) */}
                    <button
                      onClick={() => setShowVerificationModal(true)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                        isMauricioVerified
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      }`}
                      title="Independent Verification Status - Tap to toggle & inspect"
                    >
                      {isMauricioVerified ? (
                        <ShieldCheck size={12} className="shrink-0" />
                      ) : (
                        <ShieldAlert size={12} className="shrink-0" />
                      )}
                      <span className="text-[9.5px] font-extrabold tracking-wider">
                        {isMauricioVerified ? 'VERIFIED' : 'UNVERIFIED'}
                      </span>
                    </button>
                  </div>
                </div>

              <p
                className={`text-xs text-center max-w-[290px] mb-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                UI/UX Design & Photography · Zihuatanejo, Mexico
              </p>

              <p className="text-xs text-[#FF0A78] font-bold text-center mb-4 tracking-tight">
                #Life Style #Design #Photography #Urban #Art
              </p>

              {/* 3 Stats: 735 post | 876 seguidores | 568 seguidos */}
              <div className="w-full flex items-center justify-around px-4 mb-4">
                <div className="text-center">
                  <span
                    className={`block text-base font-extrabold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    735
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Post</span>
                </div>

                <div className="text-center">
                  <span
                    className={`block text-base font-extrabold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {isFollowingMauricio ? 877 : 876}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Followers</span>
                </div>

                <div className="text-center">
                  <span
                    className={`block text-base font-extrabold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    568
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Following</span>
                </div>
              </div>

              {/* Follow Button */}
              <button
                onClick={() => setIsFollowingMauricio(!isFollowingMauricio)}
                className={`w-full max-w-[260px] h-10 rounded-full font-bold text-sm shadow-lg flex items-center justify-center transition-all active:scale-95 mb-5 cursor-pointer ${
                  isFollowingMauricio
                    ? isDark
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                    : 'text-white shadow-pink-500/40 hover:opacity-95'
                }`}
                style={
                  isFollowingMauricio
                    ? {}
                    : {
                        background:
                          'linear-gradient(135deg, #FF0A78 0%, #E11D48 100%)',
                      }
                }
              >
                {isFollowingMauricio ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Story Highlights */}
            <div className="px-5 flex items-center gap-3.5 overflow-x-auto no-scrollbar mb-4">
              {HIGHLIGHTS.map((hl) => (
                <div
                  key={hl.id}
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                >
                  <div className="relative">
                    <div
                      className="w-15 h-15 rounded-full p-[2px] transition-transform group-hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #FF0A78 0%, #7928CA 100%)',
                      }}
                    >
                      <div
                        className={`w-full h-full rounded-full p-[2px] ${
                          isDark ? 'bg-[#0B0C14]' : 'bg-white'
                        }`}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{ background: hl.gradient }}
                        />
                      </div>
                    </div>

                    {hl.isAdd && (
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full text-white flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm"
                        style={{
                          background: 'linear-gradient(135deg, #A855F7 0%, #7928CA 100%)',
                        }}
                      >
                        <Plus size={10} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-medium text-center truncate max-w-[56px] ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {hl.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Profile Tabs: Posts, Tagged, IGTV */}
            <div
              className={`flex border-b text-xs font-semibold px-4 mb-3 ${
                isDark ? 'border-white/10' : 'border-black/5'
              }`}
            >
              {(['posts', 'tags', 'igtv'] as const).map((tab) => {
                const isSelected = activeProfileTab === tab;
                const label = tab === 'posts' ? 'Posts' : tab === 'tags' ? 'Tagged' : 'IGTV';
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveProfileTab(tab)}
                    className={`flex-1 py-3 text-center relative transition-colors ${
                      isSelected
                        ? isDark
                          ? 'text-white'
                          : 'text-slate-900 font-bold'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {label}
                    {isSelected && (
                      <div
                        className="absolute bottom-0 left-1/4 right-1/4 h-[2.5px] rounded-full bg-[#FF0A78]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Profile Media Grid (Teal-cyan and deep blue rounded cards) */}
            <div className="px-4 grid grid-cols-2 gap-3">
              <div
                className="w-full h-44 rounded-[22px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, #0E7490 0%, #155E75 60%, #083344 100%)',
                }}
              />
              <div
                className="w-full h-44 rounded-[22px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, #334155 0%, #1E293B 60%, #0F172A 100%)',
                }}
              />
              <div
                className="w-full h-44 rounded-[22px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, #4E137D 0%, #791DA6 60%, #C724B1 100%)',
                }}
              />
              <div
                className="w-full h-44 rounded-[22px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, #7A58E6 0%, #B77DE8 60%, #F5A7C4 100%)',
                }}
              />
            </div>
          </div>
        )}
      </>
    )}
  </div>

      {/* 4. Modular BottomNavigation with Notification button in place of duplicate profile button */}
      {(!activeChatUserId || (currentTab !== 'chat' && currentTab !== 'shop')) && (
        <BottomNavigation
          currentTab={currentTab === 'shop' ? 'explore' : currentTab}
          onTabChange={(tab) => {
            if (tab === 'notifications') {
              setHasUnreadNotifs(false);
            }
            handleTabChange(tab);
          }}
          isDark={isDark}
          isShrunk={isNavShrunk}
          unreadCount={activeChatUserId ? 0 : 2}
          unreadNotificationsCount={hasUnreadNotifs ? 3 : 0}
        />
      )}

      {/* Slide-Up Reel Comments Drawer matching Shadow UI aesthetic */}
      <ReelCommentsDrawer
        isOpen={!!activeReelComments}
        onClose={() => setActiveReelComments(null)}
        reel={activeReelComments}
        isDark={isDark}
        onCommentAdded={handleReelCommentAdded}
      />

      {/* Custom Share Sheet Modal (Slide up from bottom with Copy Link, Share to Story, Direct Messages, External Apps) */}
      <ShareSheetModal
        isOpen={!!shareModalPost}
        onClose={() => setShareModalPost(null)}
        post={shareModalPost}
        isDark={isDark}
        onShareToStory={(p) => {
          handlePublishNewStory({
            gradient: p.gradient,
            caption: p.captionTitle,
            sticker: '🎨 Artwork',
          });
        }}
      />

      {/* Shadow Rank Hierarchy Modal (Explains Pawn rank as reputation hierarchy) */}
      {showRankHierarchyModal && (
        <div
          className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end p-3 animate-in fade-in duration-200"
          onClick={() => setShowRankHierarchyModal(false)}
        >
          <div
            className={`w-full rounded-[28px] p-5 shadow-2xl border transition-all ${
              isDark
                ? 'bg-[#151726] border-white/10 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  mauricioRank === 'KNIGHT'
                    ? 'bg-purple-500/20 border border-purple-500/40 text-cyan-300'
                    : 'bg-pink-500/20 border border-pink-500/40 text-pink-400'
                }`}>
                  {mauricioRank === 'KNIGHT' ? <PremiumKnightInsignia size={20} glow={false} /> : <PawnGlyph size={18} />}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-tight">
                    Shadow Reputation Rank
                  </h3>
                  <p className="text-[10px] text-pink-400 font-semibold">
                    Current Identity: {mauricioRank} ({mauricioRank === 'KNIGHT' ? 'Rank II' : 'Rank I'})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowRankHierarchyModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Core Rules Callout */}
            <div className="mt-3 p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1.5 text-left">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-400">
                <Sparkles size={12} />
                <span>Identity Status · Not A Chess Game</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Shadow uses chess-piece ranks as social reputation status levels.
                Every newly registered Shadow identity atomically starts as <strong className="text-white">PAWN</strong>.
                Rank is strictly backend-controlled and independent from identity verification.
              </p>
            </div>

            {/* Rank Hierarchy List */}
            <div className="mt-3 space-y-1.5">
              {[
                { name: 'PAWN', level: 'Rank I', status: 'Starting Rank', isCurrent: mauricioRank === 'PAWN', canToggle: true },
                { name: 'KNIGHT', level: 'Rank II', status: 'Vanguard Status', isCurrent: mauricioRank === 'KNIGHT', canToggle: true },
                { name: 'BISHOP', level: 'Rank III', status: 'Future Reputation Tier', isCurrent: false, canToggle: false },
                { name: 'ROOK', level: 'Rank IV', status: 'Future Reputation Tier', isCurrent: false, canToggle: false },
                { name: 'QUEEN', level: 'Rank V', status: 'Future Reputation Tier', isCurrent: false, canToggle: false },
                { name: 'KING', level: 'Rank VI', status: 'Apex Reputation Tier', isCurrent: false, canToggle: false },
              ].map((tier) => (
                <div
                  key={tier.name}
                  onClick={() => {
                    if (tier.canToggle && tier.name !== mauricioRank) {
                      handlePromoteRank();
                    }
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                    tier.isCurrent
                      ? 'bg-gradient-to-r from-purple-500/25 via-pink-500/20 to-cyan-500/20 border border-purple-500/50 text-white font-bold shadow-xs'
                      : tier.canToggle
                      ? 'bg-white/[0.05] hover:bg-white/[0.08] text-slate-300 border border-white/10 cursor-pointer'
                      : 'bg-white/[0.02] text-slate-500 border border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-center font-mono text-[11px]">
                      {tier.name === 'KNIGHT' ? '♘' : tier.name === 'PAWN' ? '♙' : '○'}
                    </span>
                    <span className={tier.isCurrent ? 'text-white font-extrabold' : ''}>
                      {tier.name}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300 font-mono">
                      {tier.level}
                    </span>
                  </div>
                  <span className={`text-[10px] ${tier.isCurrent ? 'text-cyan-300 font-bold' : 'text-slate-500'}`}>
                    {tier.isCurrent ? 'ACTIVE' : tier.canToggle ? 'Tap to switch' : tier.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowRankHierarchyModal(false)}
              className="w-full mt-4 h-10 rounded-full font-bold text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 cursor-pointer active:scale-95 transition-all"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Shadow Verification Independence Modal */}
      {showVerificationModal && (
        <div
          className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end p-3 animate-in fade-in duration-200"
          onClick={() => setShowVerificationModal(false)}
        >
          <div
            className={`w-full rounded-[28px] p-5 shadow-2xl border transition-all ${
              isDark
                ? 'bg-[#151726] border-white/10 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isMauricioVerified
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                      : 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                  }`}
                >
                  {isMauricioVerified ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-tight">
                    Shadow Verification System
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Independent from Shadow Rank
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Explanation */}
            <div className="mt-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                <Info size={13} />
                <span>Rank and Verification are Separate</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                A user can be <strong className="text-white">Rank: PAWN</strong> and either <strong className="text-emerald-400">VERIFIED</strong> or <strong className="text-amber-400">UNVERIFIED</strong>. Verification does not alter rank, and rank does not imply verification.
              </p>
            </div>

            {/* Live Interactive State Inspector */}
            <div className="mt-3 p-3 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-mono uppercase text-slate-400">
                  Current Identity State
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-bold text-pink-400">Rank: PAWN</span>
                  <span className="text-slate-500">•</span>
                  <span
                    className={`text-xs font-bold ${
                      isMauricioVerified ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    Verification: {isMauricioVerified ? 'VERIFIED' : 'UNVERIFIED'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsMauricioVerified(!isMauricioVerified);
                  triggerToast(
                    !isMauricioVerified
                      ? 'Status: VERIFIED (Rank remains PAWN)'
                      : 'Status: UNVERIFIED (Rank remains PAWN)',
                  );
                }}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${
                  isMauricioVerified
                    ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
                }`}
              >
                Switch to {isMauricioVerified ? 'UNVERIFIED' : 'VERIFIED'}
              </button>
            </div>

            <button
              onClick={() => setShowVerificationModal(false)}
              className="w-full mt-4 h-10 rounded-full font-bold text-xs bg-white/10 hover:bg-white/20 text-white cursor-pointer active:scale-95 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 24-Hour Story Camera Overlay (Photo Capture & Gradient Story Creator) */}
      <StoryCameraOverlay
        isOpen={isCameraOverlayOpen}
        onClose={() => setIsCameraOverlayOpen(false)}
        onPublishStory={handlePublishNewStory}
        isDark={isDark}
      />

      {/* 5. Bottom Home Indicator Bar */}
      <div className="pb-1.5 pt-0.5 flex justify-center shrink-0">
        <div
          className={`w-32 h-1 rounded-full ${
            isDark ? 'bg-white/20' : 'bg-black/20'
          }`}
        />
      </div>
    </div>
  );
};

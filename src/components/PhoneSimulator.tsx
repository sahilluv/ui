import React, { useState } from 'react';
import {
  Plus,
  Heart,
  Search,
  Send,
  Grid,
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
} from 'lucide-react';
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

export type TabType = 'home' | 'explore' | 'reels' | 'shop' | 'create' | 'notifications' | 'profile';

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

  const handleTabChange = (tab: TabType) => {
    if (externalOnTabChange) {
      externalOnTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  // State for posts, likes, followers
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);
  const [reels, setReels] = useState<ReelItem[]>(INITIAL_REELS);
  const [activeReelComments, setActiveReelComments] = useState<ReelItem | null>(null);
  const [isFollowingMauricio, setIsFollowingMauricio] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'posts' | 'tags' | 'igtv'>('posts');
  const [notifFilter, setNotifFilter] = useState<'all' | 'likes' | 'comments'>('all');
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);
  const [isRefreshingReels, setIsRefreshingReels] = useState(false);
  const [shareModalPost, setShareModalPost] = useState<PostItem | null>(null);

  // Pull-to-refresh reels handler
  const handleRefreshReels = () => {
    if (isRefreshingReels) return;
    setIsRefreshingReels(true);
    setTimeout(() => {
      const newReel: ReelItem = {
        id: `reel_${Date.now()}`,
        author: {
          name: 'Elena Rostova',
          username: 'elena.lens',
          location: 'Reykjavik, Iceland',
          avatarGradient: 'linear-gradient(135deg, #065F46 0%, #10B981 100%)',
        },
        gradient: 'linear-gradient(180deg, #042F2E 0%, #0D9488 40%, #2DD4BF 80%, #99F6E4 100%)',
        likes: '5,2k',
        likesCount: 5200,
        comments: '412',
        commentsCount: 412,
        isLiked: false,
        isSaved: false,
      };
      setReels((prev) => [newReel, ...prev.filter((r) => r.id !== newReel.id)]);
      setIsRefreshingReels(false);
    }, 1200);
  };

  const handleToggleReelLike = (id: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextLiked = !r.isLiked;
          return {
            ...r,
            isLiked: nextLiked,
            likes: nextLiked ? '2,4k' : '2,3k',
            likesCount: nextLiked ? r.likesCount + 1 : r.likesCount - 1,
          };
        }
        return r;
      })
    );
  };

  const handleToggleReelSave = (id: string) => {
    setReels((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isSaved: !r.isSaved } : r))
    );
  };

  const handleReelCommentAdded = (reelId: string, text: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const nextCount = r.commentsCount + 1;
          return {
            ...r,
            commentsCount: nextCount,
            comments: String(nextCount),
          };
        }
        return r;
      })
    );
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
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likesCount: nextLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
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

    setPosts([createdPost, ...posts]);
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
      {/* 1. Phone Top Notch & Status Bar (9:41, Icons) */}
      <div className="relative pt-3 pb-1 px-7 flex items-center justify-between z-20 text-xs font-semibold shrink-0">
        <span className={isDark ? 'text-white' : 'text-slate-900'}>9:41</span>
        <div className="w-24 h-4 bg-black/80 rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <div className="flex items-center gap-1.5 opacity-80">
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
      {currentTab !== 'create' && (
        <header className="h-13 px-5 flex items-center justify-between shrink-0 z-10">
          {/* Left Action: Circle with Plus (+) matching reference exactly */}
          <button
            onClick={() => handleTabChange('create')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
              isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#12131D]'
            }`}
            title="Crear Publicación (+)"
          >
            <div className="w-6.5 h-6.5 rounded-full border-2 border-current flex items-center justify-center">
              <Plus size={14} strokeWidth={2.8} />
            </div>
          </button>

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

          {/* Right Actions: Theme switch + Speech bubble message icon */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleTheme}
              className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-colors ${
                isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Direct Messages / Chat Speech Bubble with Red '2' Badge */}
            <button
              onClick={() => {
                setHasUnreadNotifs(false);
                handleTabChange('notifications');
              }}
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
                isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#12131D]'
              }`}
              title="Mensajes & Notificaciones"
            >
              {/* Speech bubble SVG matching reference exactly */}
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-none stroke-current"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>

              {/* Red Badge with '2' on Home screen */}
              {hasUnreadNotifs && currentTab === 'home' && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-[#FF2E63] text-white text-[10px] font-bold flex items-center justify-center shadow-sm leading-none">
                  2
                </span>
              )}
            </button>
          </div>
        </header>
      )}

      {/* 3. Screen Viewport */}
      <div
        className={`flex-1 no-scrollbar relative ${
          currentTab === 'reels'
            ? 'overflow-y-auto snap-y snap-mandatory scroll-smooth'
            : 'overflow-y-auto'
        }`}
      >
        {/* ======================================= */}
        {/* SCREEN 1: HOME / FEED                   */}
        {/* ======================================= */}
        {currentTab === 'home' && (
          <div className="pb-8">
            {/* Stories Row */}
            <div className="pt-2 pb-3 px-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
              {INITIAL_STORIES.map((story) => (
                <div
                  key={story.id}
                  onClick={() => onSelectStory?.(story)}
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                >
                  <div className="relative">
                    {/* Multi-stop gradient story ring */}
                    <div
                      className="w-16 h-16 rounded-full p-[2.5px] transition-transform group-hover:scale-105"
                      style={{ background: story.gradient }}
                    >
                      <div
                        className={`w-full h-full rounded-full p-[2px] ${
                          isDark ? 'bg-[#0B0C14]' : 'bg-white'
                        }`}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{ background: story.avatarGradient }}
                        />
                      </div>
                    </div>

                    {/* User Story Plus Badge */}
                    {story.isCurrentUser && (
                      <div
                        className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-white border-2 text-[10px] font-bold shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 100%)',
                          borderColor: isDark ? '#0B0C14' : '#FFFFFF',
                        }}
                      >
                        <Plus size={11} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium tracking-tight text-center max-w-[62px] truncate ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {story.username}
                  </span>
                </div>
              ))}
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
                        <p
                          className={`text-xs font-bold leading-tight ${
                            isDark ? 'text-white' : 'text-[#12131D]'
                          }`}
                        >
                          {post.author.username}
                        </p>
                        <p className="text-[10px] text-slate-400 leading-tight">
                          {post.author.location ? `${post.author.location} • ` : ''}
                          {post.timeAgo}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-80">
                      <button
                        onClick={() => setShareModalPost(post)}
                        className="p-1 hover:opacity-100 hover:scale-110 active:scale-95 transition-all text-current cursor-pointer"
                        title="Compartir publicación"
                      >
                        <Send size={18} />
                      </button>
                      <button className="p-1 hover:opacity-100 transition-opacity">
                        <Grid size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Rounded Media Card (Cinematic Gradient Artwork) */}
                  <div
                    className="relative w-full h-[360px] rounded-[28px] overflow-hidden shadow-xl p-4 flex flex-col justify-between"
                    style={{ background: post.gradient }}
                  >
                    {/* Top right "1/2" page indicator */}
                    {post.totalPages && post.totalPages > 1 && (
                      <div className="self-end bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-semibold">
                        {post.currentPage || 1}/{post.totalPages}
                      </div>
                    )}

                    {/* Floating Bottom Engagement Controls */}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      {/* Red Heart Like Pill */}
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF2A55] text-white text-xs font-bold shadow-lg shadow-pink-600/40 active:scale-95 transition-transform"
                      >
                        <Heart
                          size={14}
                          className={post.isLiked ? 'fill-white' : ''}
                        />
                        <span>{post.likesCount.toLocaleString()}</span>
                      </button>

                      {/* Pagination Dots */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-3.5 h-1.5 rounded-full bg-white" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      </div>

                      {/* Floating Circle Button (White circle with chat/heart) */}
                      <button className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md active:scale-95 transition-transform">
                        <MessageCircle size={17} />
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
          </div>
        )}

        {/* ======================================= */}
        {/* SCREEN 2: DISCOVER / EXPLORE            */}
        {/* ======================================= */}
        {currentTab === 'explore' && (
          <div className="pb-8">
            {/* Horizontal Categories Row: IGTV, TIENDA, VIAJES, FITNESS */}
            <div className="px-4 py-2 flex items-center gap-3 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                >
                  <div
                    className={`w-18 h-18 rounded-[20px] shadow-md flex flex-col items-center justify-center p-2 gap-1.5 group-hover:scale-105 transition-all ${
                      cat.id === 'igtv' ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0B0C14]' : ''
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

            {/* Search Bar with Scan Icon */}
            <div className="px-5 my-3">
              <div
                className={`h-11 px-4 rounded-full flex items-center justify-between border transition-colors ${
                  isDark
                    ? 'bg-[#161826] border-white/5 text-slate-300'
                    : 'bg-[#F2F4F8] border-black/5 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 flex-1">
                  <Search size={16} className="opacity-50 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-transparent text-xs focus:outline-none placeholder-slate-400"
                  />
                </div>
                <button className="opacity-60 hover:opacity-100">
                  <Scan size={17} />
                </button>
              </div>
            </div>

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
          </div>
        )}

        {/* ======================================= */}
        {/* SCREEN: REELS (Cinematic Snapping Feed) */}
        {/* ======================================= */}
        {currentTab === 'reels' && (
          <div className="p-3 pb-8 space-y-4">
            {/* Pull-to-Refresh Interactive Control & Refreshing Indicator */}
            <div className="flex items-center justify-between px-2 pt-0.5">
              <span className="text-[11px] font-semibold tracking-wider uppercase opacity-60">
                Reels · Vertical Snap
              </span>
              <button
                onClick={handleRefreshReels}
                disabled={isRefreshingReels}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/15 text-white active:bg-white/20'
                    : 'bg-black/5 hover:bg-black/10 text-slate-800 active:bg-black/15'
                }`}
                title="Swipe or click to refresh reels"
              >
                <RotateCw
                  size={12}
                  className={`${isRefreshingReels ? 'animate-spin text-[#FF0A78]' : 'text-current'}`}
                />
                <span className={isRefreshingReels ? 'text-[#FF0A78] font-bold' : ''}>
                  {isRefreshingReels ? 'Refreshing...' : 'Refresh'}
                </span>
              </button>
            </div>

            {/* Refreshing Loading Banner */}
            {isRefreshingReels && (
              <div className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF0A78]/20 via-[#7928CA]/20 to-[#06B6D4]/20 border border-[#FF0A78]/30 flex items-center justify-center gap-2 text-xs font-semibold animate-pulse shadow-sm">
                <RotateCw size={13} className="animate-spin text-[#FF0A78]" />
                <span className={isDark ? 'text-white' : 'text-slate-900'}>
                  Fetching new cinematic reels...
                </span>
              </div>
            )}

            {reels.map((reel) => (
              <div
                key={reel.id}
                className="snap-start shrink-0 relative w-full h-[540px] rounded-[36px] overflow-hidden shadow-2xl p-5 flex flex-col justify-between border border-white/10"
                style={{ background: reel.gradient }}
              >
                {/* Top Author Row */}
                <div className="flex items-center justify-between z-10">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => handleTabChange('profile')}
                  >
                    <div
                      className="w-11 h-11 rounded-full p-0.5 shadow-md flex items-center justify-center"
                      style={{ background: reel.author.avatarGradient }}
                    >
                      <div className="w-full h-full rounded-full bg-black/30" />
                    </div>
                    <div>
                      <h3 className="text-white text-base font-bold tracking-tight drop-shadow-sm leading-tight">
                        {reel.author.name}
                      </h3>
                      <p className="text-white/80 text-xs font-medium leading-tight">
                        {reel.author.location}
                      </p>
                    </div>
                  </div>

                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-black/20 transition-colors">
                    <MoreVertical size={19} />
                  </button>
                </div>

                {/* Center Touch / Play Indicator */}
                <div className="self-center w-16 h-16 rounded-full bg-black/20 backdrop-blur-xs flex items-center justify-center text-white/60 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <Play size={24} className="fill-white/60 ml-1" />
                </div>

                {/* Floating Bottom Engagement Pill (Exact Replica from Attachment) */}
                <div className="self-center z-10 mb-2">
                  <div className="bg-white rounded-full px-5 py-2.5 shadow-2xl flex items-center gap-3.5 border border-black/5">
                    {/* Heart + Count */}
                    <button
                      onClick={() => handleToggleReelLike(reel.id)}
                      className="flex items-center gap-2 group cursor-pointer active:scale-90 transition-transform"
                    >
                      <Heart
                        size={18}
                        className={
                          reel.isLiked
                            ? 'fill-[#FF2A55] text-[#FF2A55]'
                            : 'text-[#12131D] group-hover:text-[#FF2A55]'
                        }
                      />
                      <span className="text-xs font-black text-[#12131D]">
                        {reel.likes}
                      </span>
                    </button>

                    {/* Divider 1 */}
                    <span className="w-[1px] h-4 bg-slate-200" />

                    {/* Comment + Count */}
                    <button
                      onClick={() => setActiveReelComments(reel)}
                      className="flex items-center gap-2 group cursor-pointer active:scale-90 transition-transform"
                    >
                      <MessageCircle
                        size={17}
                        className="text-[#12131D] group-hover:text-purple-600"
                      />
                      <span className="text-xs font-black text-[#12131D]">
                        {reel.comments}
                      </span>
                    </button>

                    {/* Divider 2 */}
                    <span className="w-[1px] h-4 bg-slate-200" />

                    {/* Bookmark */}
                    <button
                      onClick={() => handleToggleReelSave(reel.id)}
                      className="cursor-pointer active:scale-90 transition-transform"
                    >
                      <Bookmark
                        size={17}
                        className={
                          reel.isSaved
                            ? 'fill-purple-600 text-purple-600'
                            : 'text-[#12131D] hover:text-purple-600'
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
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
        {/* SCREEN 4: NOTIFICATIONS                 */}
        {/* ======================================= */}
        {currentTab === 'notifications' && (
          <div className="pb-8">
            <div className="px-5 py-2 flex items-center justify-between">
              <h2
                className={`text-xl font-extrabold tracking-tight ${
                  isDark ? 'text-white' : 'text-[#12131D]'
                }`}
              >
                Activity
              </h2>
              <button className="text-xs font-semibold text-pink-500 hover:underline">
                Mark as read
              </button>
            </div>

            {/* Filters Row */}
            <div className="px-5 py-2 flex items-center gap-2">
              {(['all', 'likes', 'comments'] as const).map((filter) => {
                const isSelected = notifFilter === filter;
                const label = filter === 'all' ? 'All' : filter === 'likes' ? 'Likes' : 'Comments';
                return (
                  <button
                    key={filter}
                    onClick={() => setNotifFilter(filter)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                        : isDark
                        ? 'bg-[#161826] text-slate-400 hover:text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Notification Rows */}
            <div className="divide-y divide-white/5 mt-2">
              {NOTIFICATIONS_DATA.filter((n) => {
                if (notifFilter === 'likes') return n.actionType === 'like';
                if (notifFilter === 'comments') return n.actionType === 'comment';
                return true;
              }).map((item) => (
                <div
                  key={item.id}
                  className={`px-5 py-3.5 flex items-center gap-3 transition-colors ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}
                >
                  {/* User Avatar with action badge */}
                  <div className="relative shrink-0">
                    <div
                      className="w-11 h-11 rounded-full p-[2px]"
                      style={{ background: item.user.avatarGradient }}
                    >
                      <div
                        className={`w-full h-full rounded-full ${
                          isDark ? 'bg-[#0B0C14]' : 'bg-white'
                        }`}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[9px] border-2 border-current">
                      <Heart size={9} className="fill-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      <span
                        className={`font-bold mr-1 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {item.user.username}
                      </span>
                      {item.content}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.timeAgo}</p>
                  </div>

                  {/* Thumbnail */}
                  {item.postThumbnailGradient && (
                    <div
                      className="w-10 h-10 rounded-xl shrink-0 shadow-sm"
                      style={{ background: item.postThumbnailGradient }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* SCREEN 5: PROFILE (Mauricio Lopez)      */}
        {/* ======================================= */}
        {currentTab === 'profile' && (
          <div className="pb-8">
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

              {/* Mauricio Lopez Title */}
              <h2
                className={`text-xl font-bold tracking-tight mb-0.5 ${
                  isDark ? 'text-white' : 'text-[#12131D]'
                }`}
              >
                Mauricio Lopez
              </h2>

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
                    876
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
                className={`w-full max-w-[260px] h-10 rounded-full font-bold text-sm shadow-lg shadow-pink-500/30 flex items-center justify-center transition-transform active:scale-95 mb-5 ${
                  isFollowingMauricio
                    ? 'bg-slate-700 text-white'
                    : 'text-white'
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
      </div>

      {/* 4. Compact Floating Bottom Navigation Bar (Matching Attachment Exactly) */}
      <div className="px-4 pb-2 pt-1 z-20 shrink-0">
        <nav
          className={`h-14 px-5 rounded-full flex items-center justify-between shadow-xl border transition-all ${
            isDark
              ? 'bg-[#151726] border-white/10 text-slate-400'
              : 'bg-white border-black/5 text-slate-700 shadow-slate-300/40'
          }`}
        >
          {/* Tab 1: Home */}
          <button
            onClick={() => handleTabChange('home')}
            className={`flex flex-col items-center justify-center relative cursor-pointer group transition-colors ${
              currentTab === 'home'
                ? isDark
                  ? 'text-white'
                  : 'text-[#12131D]'
                : 'hover:text-slate-300'
            }`}
            title="Feed"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
              </svg>
            </div>
            {currentTab === 'home' && (
              <div
                className={`absolute -bottom-2 w-3.5 h-[2.5px] rounded-full ${
                  isDark ? 'bg-white' : 'bg-[#12131D]'
                }`}
              />
            )}
          </button>

          {/* Tab 2: Discover / Search */}
          <button
            onClick={() => handleTabChange('explore')}
            className={`flex flex-col items-center justify-center relative cursor-pointer transition-colors ${
              currentTab === 'explore'
                ? isDark
                  ? 'text-white'
                  : 'text-[#12131D]'
                : 'hover:text-slate-300'
            }`}
            title="Explore"
          >
            <Search size={21} strokeWidth={currentTab === 'explore' ? 2.5 : 2} />
            {currentTab === 'explore' && (
              <div
                className={`absolute -bottom-2 w-3.5 h-[2.5px] rounded-full ${
                  isDark ? 'bg-white' : 'bg-[#12131D]'
                }`}
              />
            )}
          </button>

          {/* Tab 3: Reels Section (TV Monitor with Play Triangle) */}
          <button
            onClick={() => handleTabChange('reels')}
            className={`flex flex-col items-center justify-center relative cursor-pointer transition-colors ${
              currentTab === 'reels'
                ? isDark
                  ? 'text-white'
                  : 'text-[#12131D]'
                : 'hover:text-slate-300'
            }`}
            title="Reels Section"
          >
            <div className="relative flex items-center justify-center">
              {/* TV monitor outline with play button */}
              <div
                className={`w-6 h-5 rounded-[5px] border-2 flex items-center justify-center ${
                  currentTab === 'reels' ? 'border-current' : 'border-current'
                }`}
              >
                <div
                  className="w-0 h-0 border-y-[3px] border-y-transparent border-l-[5px] border-l-current ml-0.5"
                />
              </div>
              {/* TV base stand */}
              <div className="absolute -bottom-1 w-2.5 h-[1.5px] bg-current rounded-full" />
            </div>
            {currentTab === 'reels' && (
              <div
                className={`absolute -bottom-2 w-3.5 h-[2.5px] rounded-full ${
                  isDark ? 'bg-white' : 'bg-[#12131D]'
                }`}
              />
            )}
          </button>

          {/* Tab 4: Shop / Basket (Basket matching reference image) */}
          <button
            onClick={() => handleTabChange('shop')}
            className={`flex flex-col items-center justify-center relative cursor-pointer transition-colors ${
              currentTab === 'shop'
                ? isDark
                  ? 'text-white'
                  : 'text-[#12131D]'
                : 'hover:text-slate-300'
            }`}
            title="Tienda"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current"
                strokeWidth={currentTab === 'shop' ? '2.3' : '1.8'}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h16l-2 10H6L4 10z" />
                <path d="M9 10V6a3 3 0 0 1 6 0v4" />
                <line x1="8" y1="14" x2="16" y2="14" />
              </svg>
            </div>
            {currentTab === 'shop' && (
              <div
                className={`absolute -bottom-2 w-3.5 h-[2.5px] rounded-full ${
                  isDark ? 'bg-white' : 'bg-[#12131D]'
                }`}
              />
            )}
          </button>

          {/* Tab 5: Profile (Circular avatar with vibrant gradient ring) */}
          <button
            onClick={() => handleTabChange('profile')}
            className="flex flex-col items-center justify-center relative cursor-pointer"
            title="Perfil"
          >
            <div
              className={`w-7 h-7 rounded-full p-[1.5px] transition-transform ${
                currentTab === 'profile' ? 'scale-110 shadow-sm shadow-purple-500/50' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
              }}
            >
              <div
                className={`w-full h-full rounded-full p-[1px] ${
                  isDark ? 'bg-[#151726]' : 'bg-white'
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
                className={`absolute -bottom-2 w-3.5 h-[2.5px] rounded-full ${
                  isDark ? 'bg-white' : 'bg-[#12131D]'
                }`}
              />
            )}
          </button>
        </nav>
      </div>

      {/* Slide-Up Reel Comments Drawer matching Shadow UI aesthetic */}
      <ReelCommentsDrawer
        isOpen={!!activeReelComments}
        onClose={() => setActiveReelComments(null)}
        reel={activeReelComments}
        isDark={isDark}
        onCommentAdded={handleReelCommentAdded}
      />

      {/* Custom Share Sheet Modal (Slide up from bottom with Copy Link, Share to Story, Send to Friends) */}
      <ShareSheetModal
        isOpen={!!shareModalPost}
        onClose={() => setShareModalPost(null)}
        post={shareModalPost}
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

import React, { useState } from 'react';
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
  Check,
  LogOut,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
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

const REELS_DATA = [
  {
    id: 'reel_1',
    author: 'Eliott Johnson',
    username: 'eliott.j',
    location: 'Madrid, Spain',
    gradient: ['#796A9E', '#AA86B7', '#DCAABF', '#F4CCD8'],
    likes: '2.4k',
    likesCount: 2400,
    comments: '175',
    isLiked: true,
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
    isLiked: false,
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
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(INITIAL_FEED_POSTS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [reels, setReels] = useState(REELS_DATA);

  // Authenticated User State (Real Shadow Identity)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: 'Mauricio Lopez',
    email: 'mauricio@shadow.campus',
    bio: 'Visual Designer & Photography - Campus Community',
    shadowId: 'sh_89f02a91',
    shadowRank: 'PAWN',
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
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-bold select-none shrink-0 z-30">
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

          {/* MAIN SCREEN SWITCHER */}
          <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
            {/* 1. HOME SCREEN (Real Feed + Concept Stories & Visual PostCards) */}
            {currentTab === 'home' && (
              <div>
                {/* Concept Shadow Header with Cursive Wordmark */}
                <div
                  className="h-14 px-5 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md"
                  style={{ backgroundColor: colors.background + 'EE' }}
                >
                  <button
                    onClick={() => setCurrentTab('create')}
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{ borderColor: colors.border, borderWidth: 1 }}
                  >
                    <Plus size={18} style={{ color: colors.text }} />
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
                        className="w-16 h-16 rounded-full p-0.5 shadow-md flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${story.gradient.join(', ')})`,
                        }}
                      >
                        <div
                          className="w-full h-full rounded-full p-0.5 flex items-center justify-center"
                          style={{ backgroundColor: colors.background }}
                        >
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold"
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
                            className="w-9 h-9 rounded-full p-0.5 flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${post.avatarGradient.join(', ')})`,
                            }}
                          >
                            <div
                              className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-extrabold"
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

            {/* 3. REELS SCREEN (Snapping Video Cards) */}
            {currentTab === 'reels' && (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <h2 className="text-xl font-extrabold tracking-tight" style={{ color: colors.text }}>
                    Reels
                  </h2>
                  <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                    Live
                  </span>
                </div>

                {reels.map((reel) => (
                  <div
                    key={reel.id}
                    className="w-full h-[480px] rounded-3xl p-5 flex flex-col justify-end shadow-2xl relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${reel.gradient.join(', ')})`,
                    }}
                  >
                    <div className="flex items-end justify-between z-10">
                      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-3 max-w-[70%]">
                        <span className="text-xs font-extrabold text-white block">
                          {reel.author}
                        </span>
                        <span className="text-[11px] text-slate-300 block">
                          {reel.location}
                        </span>
                      </div>

                      {/* Reel Right Actions */}
                      <div className="flex flex-col items-center gap-3">
                        <button
                          onClick={() => handleToggleReelLike(reel.id)}
                          className="flex flex-col items-center gap-0.5 text-white"
                        >
                          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                            <Heart
                              size={20}
                              className={reel.isLiked ? 'fill-[#FF2A55] text-[#FF2A55]' : ''}
                            />
                          </div>
                          <span className="text-[10px] font-bold">{reel.likesCount}</span>
                        </button>

                        <button
                          onClick={() => showToast('Opening Reel comments...')}
                          className="flex flex-col items-center gap-0.5 text-white"
                        >
                          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                            <MessageCircle size={20} />
                          </div>
                          <span className="text-[10px] font-bold">{reel.comments}</span>
                        </button>

                        <button
                          onClick={() => showToast('Reel shared')}
                          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
                        >
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                  <h2 className="text-xl font-extrabold" style={{ color: colors.text }}>
                    Profile
                  </h2>
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
                    className="w-20 h-20 rounded-full p-1 shadow-xl flex items-center justify-center mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full p-1 flex items-center justify-center"
                      style={{ backgroundColor: colors.background }}
                    >
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center text-white text-xl font-extrabold"
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
                    className="w-full mt-4 p-3 rounded-2xl border flex items-center justify-around"
                    style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <Shield size={13} />
                      <span>{currentUser.shadowRank}</span>
                    </div>
                    <div className="h-4 w-[1px]" style={{ backgroundColor: colors.border }} />
                    <div className="text-[11px] font-mono" style={{ color: colors.secondaryText }}>
                      ID: <span style={{ color: colors.text }}>{currentUser.shadowId}</span>
                    </div>
                    <div className="h-4 w-[1px]" style={{ backgroundColor: colors.border }} />
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {currentUser.verification}
                    </span>
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

                  {/* Action Follow/Edit Button */}
                  <button
                    onClick={() => showToast('Profile updated')}
                    className="w-full mt-3 py-2.5 rounded-full font-bold text-xs text-white shadow-lg transition-transform active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
                    }}
                  >
                    Edit Profile
                  </button>
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
                          className="w-14 h-14 rounded-full p-0.5"
                          style={{
                            background: 'linear-gradient(135deg, #164E63 0%, #06B6D4 100%)',
                          }}
                        >
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold"
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
          </div>

          {/* 7. FLOATING 5-DESTINATION CONCEPT BOTTOM NAVIGATION */}
          <div className="absolute bottom-2 left-4 right-4 z-30">
            <div
              className="h-14 rounded-full border px-4 flex items-center justify-around shadow-2xl backdrop-blur-xl"
              style={{
                backgroundColor: isDark ? 'rgba(18, 20, 32, 0.92)' : 'rgba(255, 255, 255, 0.92)',
                borderColor: colors.border,
              }}
            >
              {/* Home */}
              <button
                onClick={() => setCurrentTab('home')}
                className="flex flex-col items-center justify-center p-2 relative hover:opacity-80 transition-opacity"
              >
                <div className="relative">
                  <span className="text-xl" style={{ color: currentTab === 'home' ? colors.tabActive : colors.tabInactive }}>
                    ⌂
                  </span>
                </div>
                {currentTab === 'home' && (
                  <div
                    className="w-3 h-0.5 rounded-full absolute bottom-1"
                    style={{ backgroundColor: colors.text }}
                  />
                )}
              </button>

              {/* Explore */}
              <button
                onClick={() => setCurrentTab('explore')}
                className="flex flex-col items-center justify-center p-2 relative hover:opacity-80 transition-opacity"
              >
                <Search
                  size={19}
                  style={{ color: currentTab === 'explore' ? colors.tabActive : colors.tabInactive }}
                />
                {currentTab === 'explore' && (
                  <div
                    className="w-3 h-0.5 rounded-full absolute bottom-1"
                    style={{ backgroundColor: colors.text }}
                  />
                )}
              </button>

              {/* Reels */}
              <button
                onClick={() => setCurrentTab('reels')}
                className="flex flex-col items-center justify-center p-2 relative hover:opacity-80 transition-opacity"
              >
                <Play
                  size={19}
                  style={{ color: currentTab === 'reels' ? colors.tabActive : colors.tabInactive }}
                />
                {currentTab === 'reels' && (
                  <div
                    className="w-3 h-0.5 rounded-full absolute bottom-1"
                    style={{ backgroundColor: colors.text }}
                  />
                )}
              </button>

              {/* Create */}
              <button
                onClick={() => setCurrentTab('create')}
                className="flex flex-col items-center justify-center p-2 relative hover:opacity-80 transition-opacity"
              >
                <Plus
                  size={20}
                  style={{ color: currentTab === 'create' ? colors.tabActive : colors.tabInactive }}
                />
                {currentTab === 'create' && (
                  <div
                    className="w-3 h-0.5 rounded-full absolute bottom-1"
                    style={{ backgroundColor: colors.text }}
                  />
                )}
              </button>

              {/* Profile Avatar Ring */}
              <button
                onClick={() => setCurrentTab('profile')}
                className="flex flex-col items-center justify-center p-1 relative hover:opacity-80 transition-opacity"
              >
                <div
                  className="w-7 h-7 rounded-full p-0.5 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
                  }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-white text-[10px] font-extrabold"
                    style={{ backgroundColor: colors.surface }}
                  >
                    {currentUser.name[0]}
                  </div>
                </div>
                {currentTab === 'profile' && (
                  <div
                    className="w-3 h-0.5 rounded-full absolute bottom-0.5"
                    style={{ backgroundColor: colors.text }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

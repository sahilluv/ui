import React, { useState } from 'react';
import {
  X,
  Heart,
  Send,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { ReelItem } from '../data/mockData';

export interface ReelComment {
  id: string;
  reelId: string;
  author: {
    name: string;
    username: string;
    avatarGradient: string;
  };
  text: string;
  timeAgo: string;
  likesCount: number;
  isLiked?: boolean;
}

const DEFAULT_COMMENTS: ReelComment[] = [
  {
    id: 'c1',
    reelId: 'reel_eliott',
    author: {
      name: 'Marco Rossi',
      username: 'marco.visuals',
      avatarGradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
    },
    text: 'The natural light and color palette in Madrid are stunning! Unreal shot 🔥',
    timeAgo: '15m',
    likesCount: 24,
    isLiked: false,
  },
  {
    id: 'c2',
    reelId: 'reel_eliott',
    author: {
      name: 'Clara Design',
      username: 'clara_design',
      avatarGradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
    },
    text: 'What lens and camera did you use for that smooth transition? Looks cinematic.',
    timeAgo: '42m',
    likesCount: 18,
    isLiked: true,
  },
  {
    id: 'c3',
    reelId: 'reel_eliott',
    author: {
      name: 'Sofia Martinez',
      username: 'sofia.mtz',
      avatarGradient: 'linear-gradient(135deg, #FF6B4A 0%, #FF3366 100%)',
    },
    text: 'That combination of violet and golden tones is pure visual poetry ✨🙌',
    timeAgo: '2h',
    likesCount: 9,
    isLiked: false,
  },
  {
    id: 'c4',
    reelId: 'reel_christian',
    author: {
      name: 'Lucas Vane',
      username: 'lucas.vane',
      avatarGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    },
    text: 'Ghent in autumn has such an unmatched atmosphere. Great earthy tones 🤎',
    timeAgo: '1h',
    likesCount: 14,
    isLiked: false,
  },
];

const QUICK_EMOJIS = ['❤️', '🔥', '👏', '🙌', '✨', '😍'];

interface ReelCommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reel: ReelItem | null;
  isDark?: boolean;
  onCommentAdded?: (reelId: string, text: string) => void;
}

export const ReelCommentsDrawer: React.FC<ReelCommentsDrawerProps> = ({
  isOpen,
  onClose,
  reel,
  isDark = true,
  onCommentAdded,
}) => {
  const [comments, setComments] = useState<ReelComment[]>(DEFAULT_COMMENTS);
  const [commentText, setCommentText] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isOpen || !reel) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleToggleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextLiked = !c.isLiked;
          return {
            ...c,
            isLiked: nextLiked,
            likesCount: nextLiked ? c.likesCount + 1 : c.likesCount - 1,
          };
        }
        return c;
      })
    );
  };

  const handleAddComment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed) return;

    const newComment: ReelComment = {
      id: `comment_${Date.now()}`,
      reelId: reel.id,
      author: {
        name: 'You',
        username: 'your.profile',
        avatarGradient: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #7928CA 100%)',
      },
      text: trimmed,
      timeAgo: 'Just now',
      likesCount: 0,
      isLiked: false,
    };

    setComments((prev) => [newComment, ...prev]);
    onCommentAdded?.(reel.id, trimmed);
    setCommentText('');
    showToast('Comment posted!');
  };

  const handleAppendEmoji = (emoji: string) => {
    setCommentText((prev) => prev + emoji);
  };

  const reelComments = comments.filter(
    (c) => c.reelId === reel.id || c.reelId === 'reel_eliott' || c.reelId === 'reel_1'
  );

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-60 px-4 py-2 rounded-full bg-[#12131D]/90 backdrop-blur-md text-white text-xs font-semibold shadow-2xl border border-white/10 flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <Sparkles size={14} className="text-[#FF0A78]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-Up Sheet */}
      <div
        className={`relative w-full max-h-[82%] rounded-t-[32px] p-5 shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-300 ${
          isDark
            ? 'bg-[#121422] text-white border-t border-white/10'
            : 'bg-white text-slate-900 border-t border-black/5'
        }`}
      >
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-slate-400/40 self-center mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{
                background:
                  'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #7928CA 100%)',
              }}
            >
              <MessageCircle size={15} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold tracking-tight">Comments</h4>
              <p className="text-[11px] text-slate-400">
                @{reel.author.username} • {reel.comments} comments
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-white/10 text-slate-400 hover:text-white hover:bg-white/15'
                : 'bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <X size={15} />
          </button>
        </div>

        {/* Comments Scrollable Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-2 space-y-3.5 pr-1">
          {reelComments.map((item) => (
            <div key={item.id} className="flex items-start gap-3 group">
              <div
                className="w-8 h-8 rounded-full shrink-0 shadow-sm"
                style={{ background: item.author.avatarGradient }}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold truncate">
                    {item.author.username}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.timeAgo}
                  </span>
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  {item.text}
                </p>
              </div>

              {/* Like comment button */}
              <button
                onClick={() => handleToggleLike(item.id)}
                className="flex flex-col items-center gap-0.5 shrink-0 pt-1 text-slate-400 hover:text-[#FF2A55] transition-colors"
              >
                <Heart
                  size={14}
                  className={
                    item.isLiked
                      ? 'fill-[#FF2A55] text-[#FF2A55]'
                      : 'hover:text-[#FF2A55]'
                  }
                />
                {item.likesCount > 0 && (
                  <span
                    className={`text-[9px] font-bold ${
                      item.isLiked ? 'text-[#FF2A55]' : 'text-slate-400'
                    }`}
                  >
                    {item.likesCount}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Quick Emoji Reaction Bar */}
        <div
          className={`flex items-center justify-between py-2 border-t px-1 ${
            isDark ? 'border-white/10' : 'border-slate-100'
          }`}
        >
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleAppendEmoji(emoji)}
              className="text-lg hover:scale-125 active:scale-95 transition-transform p-1 cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleAddComment}
          className={`flex items-center gap-2 pt-2 border-t ${
            isDark ? 'border-white/10' : 'border-slate-100'
          }`}
        >
          <div
            className="w-7 h-7 rounded-full shrink-0 shadow-sm"
            style={{
              background:
                'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #7928CA 100%)',
            }}
          />
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className={`flex-1 h-9 px-3.5 rounded-full text-xs focus:outline-none border transition-colors ${
              isDark
                ? 'bg-black/30 border-white/10 text-white placeholder-slate-500 focus:border-[#FF0A78]'
                : 'bg-slate-100 border-black/5 text-[#12131D] placeholder-slate-400 focus:border-[#FF0A78]'
            }`}
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              commentText.trim()
                ? 'bg-gradient-to-r from-[#FF0A78] to-[#7928CA] text-white shadow-md active:scale-90 cursor-pointer'
                : isDark
                ? 'bg-white/10 text-slate-500 cursor-not-allowed'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReelCommentsDrawer;

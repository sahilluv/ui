import React, { useState } from 'react';
import {
  X,
  Link as LinkIcon,
  Check,
  Send,
  PlusCircle,
  Share2,
  Sparkles,
} from 'lucide-react';
import { PostItem } from '../data/mockData';

interface ShareSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostItem | null;
  isDark?: boolean;
  onShareToStory?: (post: PostItem) => void;
}

interface Friend {
  id: string;
  name: string;
  username: string;
  avatarGradient: string;
}

const RECENT_FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: 'Ezequias',
    username: 'ezequias.art',
    avatarGradient: 'linear-gradient(135deg, #FF6B4A 0%, #FF3366 50%, #C026D3 100%)',
  },
  {
    id: 'f2',
    name: 'Alice',
    username: 'alice_002',
    avatarGradient: 'linear-gradient(135deg, #C026D3 0%, #7928CA 50%, #3B82F6 100%)',
  },
  {
    id: 'f3',
    name: 'Paulette',
    username: 'paulette_r',
    avatarGradient: 'linear-gradient(135deg, #FF2D55 0%, #B026FF 50%, #4F46E5 100%)',
  },
  {
    id: 'f4',
    name: 'Carlos',
    username: 'carlos_v',
    avatarGradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #6366F1 100%)',
  },
];

export const ShareSheetModal: React.FC<ShareSheetModalProps> = ({
  isOpen,
  onClose,
  post,
  isDark = true,
  onShareToStory,
}) => {
  const [copied, setCopied] = useState(false);
  const [sharedToStory, setSharedToStory] = useState(false);
  const [sentFriends, setSentFriends] = useState<{ [id: string]: boolean }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen || !post) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(
        `https://shadow.app/p/${post.id}`
      );
    } catch {
      // Fallback
    }
    setCopied(true);
    showToast('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareToStory = () => {
    setSharedToStory(true);
    showToast('Post added to your story!');
    onShareToStory?.(post);
    setTimeout(() => {
      setSharedToStory(false);
      onClose();
    }, 1300);
  };

  const handleToggleSendFriend = (friend: Friend) => {
    const isCurrentlySent = !!sentFriends[friend.id];
    setSentFriends((prev) => ({
      ...prev,
      [friend.id]: !isCurrentlySent,
    }));
    if (!isCurrentlySent) {
      showToast(`Sent to @${friend.username}`);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-60 px-4 py-2 rounded-full bg-[#12131D]/90 backdrop-blur-md text-white text-xs font-semibold shadow-2xl border border-white/10 flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <Sparkles size={14} className="text-[#FF0A78]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-up Sheet Container */}
      <div
        className={`relative w-full max-h-[85%] rounded-t-[32px] p-5 shadow-2xl flex flex-col z-10 transition-transform transform translate-y-0 duration-300 ${
          isDark
            ? 'bg-[#121422] text-white border-t border-white/10'
            : 'bg-white text-slate-900 border-t border-black/5'
        }`}
      >
        {/* Top Drag Indicator Handle */}
        <div className="w-10 h-1 rounded-full bg-slate-400/40 self-center mb-3" />

        {/* Sheet Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-[#FF0A78]" />
            <h3 className="font-extrabold text-base tracking-tight">
              Share Post
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? 'hover:bg-white/10 text-slate-400 hover:text-white'
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Post Preview Snippet */}
        <div
          className={`flex items-center gap-3 p-2.5 rounded-2xl mb-4 border transition-colors ${
            isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-slate-50 border-black/5'
          }`}
        >
          <div
            className="w-12 h-12 rounded-xl shrink-0 shadow-sm"
            style={{ background: post.gradient }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">@{post.author.username}</p>
            <p className="text-[11px] text-slate-400 truncate">
              {post.captionTitle} — {post.captionBody}
            </p>
          </div>
        </div>

        {/* Primary Action Buttons: Copy Link, Share to Story, Send to Friends */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {/* Option 1: Copy Link */}
          <button
            onClick={handleCopyLink}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all active:scale-95 group cursor-pointer ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border border-white/5'
                : 'bg-slate-100 hover:bg-slate-200 border border-black/5'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : isDark
                  ? 'bg-[#1E2235] text-white group-hover:scale-105'
                  : 'bg-white text-slate-800 group-hover:scale-105'
              }`}
            >
              {copied ? <Check size={20} /> : <LinkIcon size={20} />}
            </div>
            <span
              className={`text-[11px] font-bold tracking-tight text-center ${
                copied ? 'text-emerald-500' : ''
              }`}
            >
              {copied ? 'Copied!' : 'Copy link'}
            </span>
          </button>

          {/* Option 2: Share to Story */}
          <button
            onClick={handleShareToStory}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all active:scale-95 group cursor-pointer ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border border-white/5'
                : 'bg-slate-100 hover:bg-slate-200 border border-black/5'
            }`}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform"
              style={{
                background:
                  'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #7928CA 100%)',
              }}
            >
              {sharedToStory ? <Check size={20} /> : <PlusCircle size={22} />}
            </div>
            <span
              className={`text-[11px] font-bold tracking-tight text-center ${
                sharedToStory ? 'text-[#FF0A78]' : ''
              }`}
            >
              {sharedToStory ? 'Published!' : 'Your story'}
            </span>
          </button>

          {/* Option 3: Send to Friends */}
          <button
            onClick={() => {
              const firstFriend = RECENT_FRIENDS[0];
              handleToggleSendFriend(firstFriend);
            }}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all active:scale-95 group cursor-pointer ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border border-white/5'
                : 'bg-slate-100 hover:bg-slate-200 border border-black/5'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform shadow-sm group-hover:scale-105 ${
                isDark ? 'bg-[#1E2235] text-white' : 'bg-white text-slate-800'
              }`}
            >
              <Send size={19} className="ml-0.5" />
            </div>
            <span className="text-[11px] font-bold tracking-tight text-center">
              Send to friends
            </span>
          </button>
        </div>

        {/* Quick Send to Friends Section */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
            Recent friends
          </p>
          <div className="space-y-2">
            {RECENT_FRIENDS.map((friend) => {
              const isSent = !!sentFriends[friend.id];
              return (
                <div
                  key={friend.id}
                  className={`flex items-center justify-between p-2 rounded-2xl transition-colors ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full p-[2px] shadow-sm"
                      style={{ background: friend.avatarGradient }}
                    >
                      <div
                        className={`w-full h-full rounded-full ${
                          isDark ? 'bg-[#121422]' : 'bg-white'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">
                        {friend.name}
                      </p>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        @{friend.username}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleSendFriend(friend)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                      isSent
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : isDark
                        ? 'bg-white/10 hover:bg-white/15 text-[#0EA5E9]'
                        : 'bg-slate-200 hover:bg-slate-300 text-[#0EA5E9]'
                    }`}
                  >
                    {isSent ? 'Sent' : 'Send'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSheetModal;

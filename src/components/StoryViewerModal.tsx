import React, { useEffect, useState } from 'react';
import { X, Heart, Send } from 'lucide-react';
import { StoryItem } from '../data/mockData';

interface StoryViewerModalProps {
  story: StoryItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  story,
  onClose,
  onNext,
  onPrev,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!story) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onNext ? onNext() : onClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story, onNext, onClose]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[380px] h-[680px] rounded-[36px] overflow-hidden shadow-2xl flex flex-col justify-between p-5 border border-white/10"
        style={{ background: story.gradient }}
      >
        {/* Render Captured Story Photo Background if available */}
        {story.storyImageUrl && (
          <img
            src={story.storyImageUrl}
            alt="Story snapshot"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Subtle Dark Gradient Overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 z-0 pointer-events-none" />

        {/* Progress Bar */}
        <div className="w-full bg-white/30 h-1 rounded-full overflow-hidden mb-3 z-10">
          <div
            className="bg-white h-full transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full border-2 border-white/80 p-0.5 flex items-center justify-center shadow-md"
              style={{ background: story.avatarGradient }}
            >
              <div className="w-full h-full rounded-full bg-black/20" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-white text-sm font-bold tracking-tight drop-shadow-sm">{story.username}</p>
                {story.isCurrentUser && (
                  <span className="text-[9px] font-black bg-pink-500/80 text-white px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                    24h
                  </span>
                )}
              </div>
              <p className="text-white/70 text-xs">{story.storyTimestamp || 'Just now'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Center Touch navigation zones */}
        <div className="absolute inset-0 flex z-5">
          <div className="w-1/3 h-full cursor-pointer" onClick={onPrev} />
          <div className="w-2/3 h-full cursor-pointer" onClick={onNext} />
        </div>

        {/* Story visual center badge / Caption / Sticker */}
        <div className="self-center text-center z-10 pointer-events-none my-auto max-w-[90%]">
          {story.storySticker && (
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-xl mb-3">
              {story.storySticker}
            </div>
          )}

          {story.storyCaption ? (
            <div className="inline-block px-5 py-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/25 shadow-2xl">
              <p className="text-white text-base font-extrabold tracking-wide drop-shadow-md">
                {story.storyCaption}
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-white text-3xl font-extrabold tracking-tight drop-shadow-md">
                SHADOW STORIES
              </h2>
              <p className="text-white/80 text-xs uppercase tracking-widest mt-1">Visual Art & Sound</p>
            </>
          )}
        </div>

        {/* Bottom reply bar */}
        <div className="flex items-center gap-3 z-10 pt-4">
          <div className="flex-1 bg-white/20 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/20">
            <input
              type="text"
              placeholder={`Reply to ${story.username}...`}
              className="w-full bg-transparent text-white placeholder-white/60 text-xs focus:outline-none"
            />
          </div>
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-pink-600 text-white flex items-center justify-center transition-colors">
            <Heart size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white flex items-center justify-center transition-colors">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

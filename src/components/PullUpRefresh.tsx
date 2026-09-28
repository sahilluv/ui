import React, { useState, useEffect } from 'react';
import { ArrowUp, RotateCw, Check, Sparkles } from 'lucide-react';

interface PullUpRefreshProps {
  onRefresh: () => Promise<void> | void;
  isRefreshing?: boolean;
  pullDistance?: number;
  maxPullDistance?: number;
  threshold?: number;
  isDark?: boolean;
  className?: string;
  hasMore?: boolean;
  label?: string;
}

export const PullUpRefresh: React.FC<PullUpRefreshProps> = ({
  onRefresh,
  isRefreshing = false,
  pullDistance = 0,
  threshold = 60,
  isDark = true,
  className = '',
  hasMore = true,
  label = 'Pull up to refresh feed',
}) => {
  const [internalRefreshing, setInternalRefreshing] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const activeRefreshing = isRefreshing || internalRefreshing;
  const isTriggered = pullDistance >= threshold;
  const progressRatio = Math.min(Math.max(pullDistance / threshold, 0), 1);

  const handleManualTrigger = async () => {
    if (activeRefreshing) return;
    setInternalRefreshing(true);
    try {
      await onRefresh();
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 1800);
    } finally {
      setInternalRefreshing(false);
    }
  };

  useEffect(() => {
    if (!isRefreshing && activeRefreshing) {
      setJustCompleted(true);
      const timer = setTimeout(() => setJustCompleted(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [isRefreshing]);

  return (
    <div
      onClick={handleManualTrigger}
      className={`w-full py-4 px-4 flex flex-col items-center justify-center transition-all select-none cursor-pointer group ${className}`}
      style={{
        minHeight: Math.max(56, Math.min(pullDistance, 120)),
      }}
    >
      <div
        className={`w-full max-w-[320px] rounded-2xl p-3 border flex items-center justify-between gap-3 transition-all duration-200 ${
          activeRefreshing
            ? 'border-pink-500/50 shadow-lg shadow-pink-500/20'
            : isTriggered
            ? 'border-purple-500/60 shadow-md shadow-purple-500/20 scale-[1.02]'
            : isDark
            ? 'border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
        }`}
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(21, 23, 38, 0.95) 0%, rgba(27, 21, 40, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
        }}
      >
        {/* Left side Icon with animated rotation & states */}
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
              activeRefreshing
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                : justCompleted
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : isTriggered
                ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 rotate-180'
                : 'bg-white/5 text-slate-400 border border-white/10 group-hover:text-pink-400 group-hover:border-pink-500/30'
            }`}
          >
            {activeRefreshing ? (
              <RotateCw size={15} className="animate-spin text-pink-400" />
            ) : justCompleted ? (
              <Check size={16} className="text-emerald-400" />
            ) : (
              <ArrowUp
                size={15}
                className="transition-transform duration-200"
                style={{
                  transform: `rotate(${progressRatio * 180}deg)`,
                }}
              />
            )}
          </div>

          <div className="flex flex-col text-left">
            <span
              className={`text-xs font-bold leading-tight transition-colors ${
                activeRefreshing
                  ? 'text-pink-400'
                  : justCompleted
                  ? 'text-emerald-400'
                  : isTriggered
                  ? 'text-purple-300'
                  : isDark
                  ? 'text-slate-200 group-hover:text-white'
                  : 'text-slate-800'
              }`}
            >
              {activeRefreshing
                ? 'Refreshing Shadow feed...'
                : justCompleted
                ? 'Feed refreshed!'
                : isTriggered
                ? 'Release to refresh feed'
                : label}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              {activeRefreshing
                ? 'Loading fresh stories & posts'
                : justCompleted
                ? 'New content loaded'
                : 'Drag upward or tap to load fresh posts'}
            </span>
          </div>
        </div>

        {/* Right side Badge / Trigger button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div
            className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider transition-all ${
              activeRefreshing
                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                : justCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-gradient-to-r from-pink-500/15 to-purple-600/15 text-pink-400 border border-pink-500/25 group-hover:scale-105'
            }`}
          >
            {activeRefreshing ? (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                SYNC
              </span>
            ) : justCompleted ? (
              'SYNCED'
            ) : (
              <span className="flex items-center gap-1">
                <Sparkles size={9} />
                PULL UP
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic pull indicator line during drag */}
      {pullDistance > 10 && !activeRefreshing && (
        <div className="w-full max-w-[200px] mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-75"
            style={{ width: `${progressRatio * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Search, Tv, MessageCircle, Home, Bell } from 'lucide-react';
import { TabType } from './PhoneSimulator';

interface BottomNavigationProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  isDark: boolean;
  isShrunk?: boolean;
  unreadCount?: number;
  unreadNotificationsCount?: number;
  userAvatarGradient?: string;
}

interface TabItem {
  id: TabType;
  label: string;
  icon: (active: boolean, isShrunk: boolean) => React.ReactNode;
  badge?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onTabChange,
  isDark,
  isShrunk = false,
  unreadCount = 2,
  unreadNotificationsCount = 2,
}) => {
  const tabs: TabItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: (active, shrunk) => (
        <svg
          viewBox="0 0 24 24"
          className={`${shrunk ? 'w-4 h-4' : 'w-5 h-5'} fill-current transition-transform duration-300`}
        >
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
        </svg>
      ),
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: (active, shrunk) => (
        <Search
          size={shrunk ? 17 : 21}
          strokeWidth={active ? 2.5 : 2}
          className="transition-transform duration-300"
        />
      ),
    },
    {
      id: 'reels',
      label: 'Reels',
      icon: (active, shrunk) => (
        <div className="relative flex items-center justify-center">
          <div
            className={`${
              shrunk ? 'w-5 h-4 rounded-[4px]' : 'w-6 h-5 rounded-[5px]'
            } border-2 flex items-center justify-center border-current transition-all duration-300`}
          >
            <div
              className={`w-0 h-0 ${
                shrunk ? 'border-y-[2.5px] border-l-[4px]' : 'border-y-[3px] border-l-[5px]'
              } border-y-transparent border-l-current ml-0.5 transition-all duration-300`}
            />
          </div>
          <div
            className={`absolute ${
              shrunk ? '-bottom-0.5 w-2 h-[1px]' : '-bottom-1 w-2.5 h-[1.5px]'
            } bg-current rounded-full transition-all duration-300`}
          />
        </div>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      badge: unreadNotificationsCount,
      icon: (active, shrunk) => (
        <div className="relative flex items-center justify-center">
          <Bell
            size={shrunk ? 18 : 22}
            strokeWidth={active ? 2.5 : 2}
            className={`transition-all duration-300 ${
              active ? 'fill-current text-[#FF0A78] scale-105 drop-shadow-[0_0_8px_rgba(255,10,120,0.4)]' : ''
            }`}
          />
        </div>
      ),
    },
    {
      id: 'chat',
      label: 'Chat',
      badge: unreadCount,
      icon: (active, shrunk) => (
        <div className="relative flex items-center justify-center">
          <MessageCircle
            size={shrunk ? 18 : 22}
            strokeWidth={active ? 2.5 : 2}
            className="transition-all duration-300"
          />
        </div>
      ),
    },
  ];

  return (
    <div
      className={`px-4 ${
        isShrunk ? 'pb-1' : 'pb-2'
      } pt-1 shrink-0 z-30 transition-all duration-300`}
    >
      <nav
        className={`relative rounded-full flex items-center justify-between p-1.5 transition-all duration-300 select-none backdrop-blur-2xl backdrop-saturate-200 ${
          isShrunk
            ? 'h-11 px-2 max-w-[310px] mx-auto shadow-lg'
            : 'h-15 px-2.5 w-full shadow-2xl'
        } ${
          isDark
            ? 'bg-[#0B0C16]/75 border border-white/12 shadow-[0_16px_36px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)] text-slate-400'
            : 'bg-white/70 border border-white/60 shadow-[0_14px_34px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)] text-slate-600'
        }`}
      >
        {/* Top Rim Specular Glare (iPhone Dynamic Glass refraction) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none rounded-full"
        />

        {/* ======================================================== */}
        {/* FLUID GLASS TAB BUTTONS (iPhone Liquid Glass Morphic)     */}
        {/* ======================================================== */}
        {tabs.map((tab) => {
          const isActive = tab.id === currentTab;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 relative flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-[0.88] select-none ${
                isShrunk ? 'h-8 rounded-full' : 'h-11 rounded-[20px]'
              } ${
                isActive
                  ? isDark
                    ? 'bg-white/16 border border-white/25 text-white shadow-[0_4px_14px_rgba(0,0,0,0.35),inset_0_1px_0.5px_rgba(255,255,255,0.45),inset_0_-1px_0.5px_rgba(0,0,0,0.25)] backdrop-blur-xl'
                    : 'bg-white/90 border border-white/80 text-slate-900 shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_0.5px_rgba(255,255,255,1),inset_0_-1px_0.5px_rgba(0,0,0,0.04)] backdrop-blur-xl'
                  : isDark
                  ? 'hover:bg-white/8 hover:text-slate-200 text-slate-400 border border-transparent'
                  : 'hover:bg-black/5 hover:text-slate-800 text-slate-500 border border-transparent'
              }`}
              title={tab.label}
              aria-label={tab.label}
              aria-selected={isActive}
            >
              {/* Fluid Glass Top Specular Glare Reflection on Active Button */}
              {isActive && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-2.5 top-[1px] h-[1px] bg-gradient-to-r from-transparent via-white/55 to-transparent rounded-full pointer-events-none"
                />
              )}

              {/* Icon Container */}
              <div
                className={`relative flex items-center justify-center transition-transform duration-200 ${
                  isActive ? 'scale-105' : 'group-hover:scale-105'
                }`}
              >
                {tab.icon(isActive, isShrunk)}

                {/* Badge (e.g. Chat Unread Count) */}
                {tab.badge && tab.badge > 0 && (
                  <span
                    className={`absolute ${
                      isShrunk
                        ? '-top-1 -right-1 min-w-3.5 h-3.5 px-0.5 text-[8px]'
                        : '-top-1 -right-2 min-w-4 h-4 px-1 text-[9px]'
                    } rounded-full bg-gradient-to-r from-[#FF0A78] to-[#E11D48] text-white font-black flex items-center justify-center shadow-md shadow-pink-500/50 leading-none border-2 ${
                      isDark ? 'border-[#151726]' : 'border-white'
                    } transition-transform duration-300 ${
                      isActive ? 'scale-90' : 'animate-pulse'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

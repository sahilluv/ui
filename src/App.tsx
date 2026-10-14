/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Smartphone,
  Columns3,
  LayoutGrid,
  Code,
  Moon,
  Sun,
  Sparkles,
  LogIn,
} from 'lucide-react';
import { PhoneSimulator, TabType } from './components/PhoneSimulator';
import { StoryViewerModal } from './components/StoryViewerModal';
import { ExpoCodeViewer } from './components/ExpoCodeViewer';
import { ShadowAuthScreen } from './components/ShadowAuthScreen';
import { ShadowBackgroundDesign } from './components/ShadowBackgroundDesign';
import { StoryItem, INITIAL_STORIES } from './data/mockData';

type AppViewMode = 'single' | 'side-by-side' | 'gallery' | 'code' | 'shadow-auth';

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('shadow-auth');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [currentTab, setCurrentTab] = useState<TabType>('home');

  const showAppToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleNextStory = () => {
    if (!activeStory) return;
    const currentIndex = INITIAL_STORIES.findIndex((s) => s.id === activeStory.id);
    if (currentIndex < INITIAL_STORIES.length - 1) {
      setActiveStory(INITIAL_STORIES[currentIndex + 1]);
    } else {
      setActiveStory(null);
    }
  };

  const handlePrevStory = () => {
    if (!activeStory) return;
    const currentIndex = INITIAL_STORIES.findIndex((s) => s.id === activeStory.id);
    if (currentIndex > 0) {
      setActiveStory(INITIAL_STORIES[currentIndex - 1]);
    } else {
      setActiveStory(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0F17] text-white">
      {/* 1. Global Navigation Bar */}
      <header className="h-16 px-4 sm:px-8 border-b border-white/10 bg-[#0F111D]/95 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-2xl p-0.5 shadow-md shadow-pink-500/30 flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
            }}
          >
            <div className="w-full h-full rounded-[14px] bg-[#0F111D] flex items-center justify-center">
              <span className="font-shadow-script text-xl text-pink-400">S</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-shadow-script text-2xl text-white tracking-wide">
                Shadow
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 uppercase tracking-wider hidden sm:inline-flex items-center gap-1">
                <Sparkles size={10} />
                Pixel-Perfect UI
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl gap-1">
          <button
            onClick={() => setViewMode('shadow-auth')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'shadow-auth'
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-md shadow-purple-500/25'
                : 'text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20'
            }`}
          >
            <Sparkles size={14} className={viewMode === 'shadow-auth' ? 'text-pink-300' : 'text-purple-400'} />
            <span className="hidden sm:inline">Shadow Auth (3 Screens)</span>
            <span className="sm:hidden">Auth UI</span>
          </button>

          <button
            onClick={() => setViewMode('single')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'single'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span className="hidden sm:inline">Interactive Phone</span>
            <span className="sm:hidden">Single</span>
          </button>

          <button
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns3 size={14} />
            <span className="hidden sm:inline">3 App Mockups</span>
            <span className="sm:hidden">3 Phones</span>
          </button>

          <button
            onClick={() => setViewMode('gallery')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'gallery'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={14} />
            <span className="hidden sm:inline">All 5 Screens Gallery</span>
            <span className="sm:hidden">All 5</span>
          </button>

          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'code'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code size={14} />
            <span className="hidden sm:inline">Monorepo Code</span>
            <span className="sm:hidden">Code</span>
          </button>
        </div>

        {/* Global Brand Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
            Shadow v1.0
          </span>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* VIEW 1: SINGLE INTERACTIVE PHONE */}
        {viewMode === 'single' && (
          <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-gradient-to-b from-[#111320] via-[#0E0F1A] to-[#0A0B12]">
            <div className="max-w-md w-full mb-3 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-400 text-xs font-semibold">
                <Sparkles size={12} />
                Live Interactive Shadow Experience
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Feed, Stories, Explore, Reels, and Profile. Tap like buttons, reels, follow, and themes.
              </p>

              {/* Quick Tab Jump Chips */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: 'home', label: 'Feed' },
                  { id: 'explore', label: 'Explore' },
                  { id: 'reels', label: '🎬 Reels' },
                  { id: 'chat', label: 'Messages' },
                  { id: 'profile', label: 'Profile' },
                  { id: 'auth', label: '🔐 Shadow Login' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id as any)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      currentTab === tab.id
                        ? 'bg-gradient-to-r from-[#FF0A78] to-[#9900FF] text-white shadow-lg shadow-pink-500/25 scale-105'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <PhoneSimulator
              isDark={isDark}
              onToggleTheme={toggleTheme}
              activeTab={currentTab}
              onTabChange={setCurrentTab}
              onSelectStory={setActiveStory}
            />
          </div>
        )}

        {/* VIEW 2: 3 DEVICES SIDE-BY-SIDE (MATCHING SCREENSHOT 1) */}
        {viewMode === 'side-by-side' && (
          <div className="flex-1 overflow-x-auto p-4 sm:p-8 bg-gradient-to-b from-[#111320] via-[#0E0F1A] to-[#0A0B12]">
            <div className="min-w-fit mx-auto flex items-start justify-center gap-6 sm:gap-10 pb-12">
              {/* Phone 1: Feed / Home (Light Mode) */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  Feed / Home (Light Mode)
                </span>
                <PhoneSimulator
                  isDark={false}
                  onToggleTheme={toggleTheme}
                  activeTab="home"
                  onSelectStory={setActiveStory}
                />
              </div>

              {/* Phone 2: Feed / Home (Dark Mode) */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  Feed / Home (Dark Mode)
                </span>
                <PhoneSimulator
                  isDark={true}
                  onToggleTheme={toggleTheme}
                  activeTab="home"
                  onSelectStory={setActiveStory}
                />
              </div>

              {/* Phone 3: Profile Mauricio Lopez (Light Mode) */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                  Profile Mauricio Lopez (Light Mode)
                </span>
                <PhoneSimulator
                  isDark={false}
                  onToggleTheme={toggleTheme}
                  activeTab="profile"
                  onSelectStory={setActiveStory}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ALL 5 SCREENS GALLERY (MATCHING SCREENSHOTS 1, 2, 3) */}
        {viewMode === 'gallery' && (
          <div className="flex-1 overflow-x-auto p-4 sm:p-8 bg-gradient-to-b from-[#111320] via-[#0E0F1A] to-[#0A0B12]">
            <div className="min-w-fit mx-auto flex items-start justify-center gap-6 sm:gap-8 pb-12">
              {/* Screen 1: Feed Light */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Feed / Home (Light Mode)
                </span>
                <PhoneSimulator
                  isDark={false}
                  onToggleTheme={toggleTheme}
                  activeTab="home"
                  onSelectStory={setActiveStory}
                />
              </div>

              {/* Screen 2: Feed Dark */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Feed / Home (Dark Mode)
                </span>
                <PhoneSimulator
                  isDark={true}
                  onToggleTheme={toggleTheme}
                  activeTab="home"
                  onSelectStory={setActiveStory}
                />
              </div>

              {/* Screen 3: Explore Dark (Screenshot 2) */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Explore / Discover (Dark Mode)
                </span>
                <PhoneSimulator
                  isDark={true}
                  onToggleTheme={toggleTheme}
                  activeTab="explore"
                  onSelectStory={setActiveStory}
                />
              </div>

              {/* Screen 4: TV Videos Light (Screenshot 3) */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-pink-400" />
                  TV / Videos (Light Mode)
                </span>
                <PhoneSimulator
                  isDark={false}
                  onToggleTheme={toggleTheme}
                  activeTab="reels"
                  onSelectStory={setActiveStory}
                />
              </div>

              {/* Screen 5: Profile Mauricio Lopez Light */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-pink-400" />
                  Profile Mauricio Lopez (Light Mode)
                </span>
                <PhoneSimulator
                  isDark={false}
                  onToggleTheme={toggleTheme}
                  activeTab="profile"
                  onSelectStory={setActiveStory}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: MONOREPO & EXPO CODE EXPLORER */}
        {viewMode === 'code' && (
          <div className="flex-1 p-4 sm:p-8 bg-gradient-to-b from-[#111320] via-[#0E0F1A] to-[#0A0B12]">
            <ExpoCodeViewer />
          </div>
        )}

        {/* VIEW 5: SHADOW AUTH EXPERIENCE (EXACT 3 SCREENS MATCHING REFERENCE IMAGE) */}
        {viewMode === 'shadow-auth' && (
          <div
            className="relative flex-1 overflow-x-auto p-4 sm:p-8 min-h-[calc(100vh-4rem)] flex flex-col justify-start"
            style={{
              background: 'linear-gradient(180deg, #090616 0%, #120C29 45%, #080514 100%)',
            }}
          >
            {/* Atmospheric Celestial Presentation Backdrop */}
            <ShadowBackgroundDesign screenType="presentation" />

            <div className="relative z-10 max-w-4xl mx-auto mb-6 text-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-purple-500/30 text-white text-xs font-bold shadow-lg">
                <Sparkles size={13} className="text-purple-300" />
                Shadow Authentication Experience • 3 Rebuilt Screens
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2 tracking-tight drop-shadow-md">
                Welcome, Sign Up, and Log In Screens
              </h2>
              <p className="text-xs text-purple-200/90 mt-1 max-w-lg mx-auto font-medium drop-shadow-sm">
                Near-black navy-purple canvas, handwritten italic purple Shadow logo, purple gradient buttons with circular arrows, mint-green accents, and pen-and-ink manga illustrations.
              </p>

              {/* Controls bar: Navigation and simulator links */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  onClick={() => {
                    setViewMode('single');
                    setCurrentTab('auth');
                    showAppToast('Switched to Single Interactive Phone');
                  }}
                  className="px-4 py-1.5 rounded-full bg-black hover:bg-neutral-900 active:scale-95 text-white text-xs font-black shadow-xl flex items-center gap-1.5 transition-all cursor-pointer border border-white/15"
                >
                  <Smartphone size={13} />
                  <span>Test Single Interactive Phone</span>
                </button>

                <button
                  onClick={() => {
                    setViewMode('single');
                    setCurrentTab('home');
                    showAppToast('Opening Shadow Feed & Community Mesh');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-purple-900/40 hover:bg-purple-800/50 backdrop-blur-md border border-purple-500/30 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <span>Explore Shadow App →</span>
                </button>
              </div>
            </div>

            <div className="relative z-10 min-w-fit mx-auto flex items-start justify-center gap-6 sm:gap-8 pb-12">
              {/* Screen 1: Welcome To Shadow */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/30 text-white text-xs font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Screen 1: Welcome To Shadow
                </span>
                <div className="w-[360px] h-[740px] rounded-[46px] border-[8px] border-[#181924] shadow-[0_30px_70px_rgba(5,3,15,0.9)] overflow-hidden flex flex-col bg-[#0B081A] relative">
                  <ShadowAuthScreen
                    lockedStep="welcome"
                    showStatusBar={true}
                    brandName="Shadow"
                    onToast={showAppToast}
                    onAuthSuccess={(user) => {
                      showAppToast(`Welcome to Shadow! Signed in as @${user.username} 🎉`);
                    }}
                  />
                </div>
              </div>

              {/* Screen 2: Sign up to Shadow */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/30 text-white text-xs font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Screen 2: Sign up to Shadow
                </span>
                <div className="w-[360px] h-[740px] rounded-[46px] border-[8px] border-[#181924] shadow-[0_30px_70px_rgba(5,3,15,0.9)] overflow-hidden flex flex-col bg-[#0B081A] relative">
                  <ShadowAuthScreen
                    lockedStep="signup"
                    showStatusBar={true}
                    brandName="Shadow"
                    onToast={showAppToast}
                    onAuthSuccess={(user) => {
                      showAppToast(`Account created! Welcome to Shadow, @${user.username} ✨`);
                    }}
                  />
                </div>
              </div>

              {/* Screen 3: Log in to Shadow */}
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/30 text-white text-xs font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Screen 3: Log in to Shadow
                </span>
                <div className="w-[360px] h-[740px] rounded-[46px] border-[8px] border-[#181924] shadow-[0_30px_70px_rgba(5,3,15,0.9)] overflow-hidden flex flex-col bg-[#0B081A] relative">
                  <ShadowAuthScreen
                    lockedStep="login"
                    showStatusBar={true}
                    brandName="Shadow"
                    onToast={showAppToast}
                    onAuthSuccess={(user) => {
                      showAppToast(`Welcome back to Shadow, @${user.username} 🚀`);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles size={14} className="text-pink-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3. Interactive Fullscreen Story Viewer Modal */}
      <StoryViewerModal
        story={activeStory}
        stories={INITIAL_STORIES}
        onClose={() => setActiveStory(null)}
        onNext={handleNextStory}
        onPrev={handlePrevStory}
      />
    </div>
  );
}

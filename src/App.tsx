/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Smartphone,
  Layers,
  Code,
  Moon,
  Sun,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import { UnifiedShadowApp } from './components/UnifiedShadowApp';
import { ConceptOverview } from './components/ConceptOverview';
import { ExpoCodeViewer } from './components/ExpoCodeViewer';
import { StoryViewerModal } from './components/StoryViewerModal';
import { StoryItem, INITIAL_STORIES } from './data/mockData';

type AppViewMode = 'app' | 'code' | 'overview';

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('app');
  const [isDark, setIsDark] = useState(true);
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

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
    <div className="min-h-screen flex flex-col bg-[#0B0C14] text-white">
      {/* 1. Global Navigation Bar */}
      <header className="h-16 px-4 sm:px-8 border-b border-white/10 bg-[#0F101C]/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-2xl p-0.5 shadow-md shadow-pink-500/30 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FF0A78 0%, #991BEA 50%, #6366F1 100%)',
            }}
          >
            <div className="w-full h-full rounded-[14px] bg-[#0F101C] flex items-center justify-center">
              <span className="font-shadow-script text-xl text-pink-400">S</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-shadow-script text-2xl text-white tracking-wide">
                Shadow
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 uppercase tracking-wider flex items-center gap-1">
                <GitBranch size={10} />
                Unified App
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl gap-1">
          <button
            onClick={() => setViewMode('app')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'app'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span className="hidden sm:inline">Shadow App (Nuevo UI + Datos Reales)</span>
            <span className="sm:hidden">App</span>
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
            <span className="hidden sm:inline">Código Monorepo</span>
            <span className="sm:hidden">Código</span>
          </button>

          <button
            onClick={() => setViewMode('overview')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'overview'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span className="hidden sm:inline">Concept Overview</span>
            <span className="sm:hidden">Diseño</span>
          </button>
        </div>

        {/* Theme and Action Group */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold transition-all text-slate-300"
            title="Alternar tema de Shadow"
          >
            {isDark ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} className="text-purple-400" />}
            <span className="hidden md:inline">{isDark ? 'Modo Oscuro' : 'Modo Claro'}</span>
          </button>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* VIEW 1: ONE Unified Shadow Application */}
        {viewMode === 'app' && (
          <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-gradient-to-b from-[#111320] via-[#0E0F1A] to-[#0A0B12]">
            <div className="max-w-md w-full mb-3 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-400 text-xs font-semibold">
                <Sparkles size={12} />
                Nuevo Sistema Visual Concept + Funcionalidad Real Shadow
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Feed interactivo, creación de publicaciones, historias, reels y perfil con Shadow Identity.
              </p>
            </div>

            <UnifiedShadowApp
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          </div>
        )}

        {/* VIEW 2: Monorepo Code Viewer */}
        {viewMode === 'code' && <ExpoCodeViewer />}

        {/* VIEW 3: Concept Overview */}
        {viewMode === 'overview' && (
          <ConceptOverview
            onSelectStory={setActiveStory}
            onFocusDevice={() => {
              setViewMode('app');
            }}
          />
        )}
      </main>

      {/* 3. Interactive Fullscreen Story Viewer Modal */}
      <StoryViewerModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onNext={handleNextStory}
        onPrev={handlePrevStory}
      />
    </div>
  );
}

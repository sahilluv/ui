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
  ExternalLink,
  Heart,
  Search,
  Plus,
  User,
  Bell,
} from 'lucide-react';
import { PhoneSimulator, TabType } from './components/PhoneSimulator';
import { ConceptOverview } from './components/ConceptOverview';
import { ExpoCodeViewer } from './components/ExpoCodeViewer';
import { StoryViewerModal } from './components/StoryViewerModal';
import { StoryItem, INITIAL_STORIES } from './data/mockData';

type AppViewMode = 'simulator' | 'overview' | 'code';

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('simulator');
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('home');
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
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 uppercase tracking-wider">
                Expo SDK 51
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl gap-1">
          <button
            onClick={() => setViewMode('simulator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'simulator'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span className="hidden sm:inline">Simulador Interactivo</span>
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
            <span className="hidden sm:inline">Concepto (Imagen de Referencia)</span>
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
            <span className="hidden sm:inline">Código React Native</span>
          </button>
        </div>

        {/* Theme and Action Group */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold transition-all text-slate-300"
            title="Alternar tema del simulador"
          >
            {isDark ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} className="text-purple-400" />}
            <span className="hidden md:inline">{isDark ? 'Modo Oscuro' : 'Modo Claro'}</span>
          </button>
        </div>
      </header>

      {/* 2. Main Content Area according to active view mode */}
      <main className="flex-1 flex flex-col">
        {/* VIEW 1: Interactive Device Simulator */}
        {viewMode === 'simulator' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-[#131422] via-[#0E0F1A] to-[#0A0B12]">
            {/* Quick Screen Selector Pills */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar max-w-full px-2">
              <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Pantalla:</span>
              {[
                { id: 'home', label: '1. Home / Feed', icon: Smartphone },
                { id: 'explore', label: '2. Explorar', icon: Search },
                { id: 'reels', label: '3. Reels (Nuevo UI)', icon: Sparkles },
                { id: 'shop', label: '4. Tienda', icon: Layers },
                { id: 'profile', label: '5. Perfil Mauricio', icon: User },
                { id: 'notifications', label: 'Actividad (Top Corazón)', icon: Heart },
                { id: 'create', label: 'Crear (Top +)', icon: Plus },
              ].map((item) => {
                const isSelected = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                      isSelected
                        ? 'bg-white text-slate-950 shadow-md shadow-white/10'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={12} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* The Live Interactive Phone Chassis */}
            <div className="transition-transform duration-300">
              <PhoneSimulator
                isDark={isDark}
                onToggleTheme={toggleTheme}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSelectStory={setActiveStory}
                standalone={true}
              />
            </div>

            {/* Hint / Feature note */}
            <p className="text-[11px] text-slate-400 mt-6 text-center max-w-sm leading-relaxed">
              Toca las historias para ver el visor a pantalla completa, dale <span className="text-pink-400 font-bold">Me gusta</span> a las fotos o prueba el botón <span className="text-purple-400 font-bold">Seguir</span> en el perfil.
            </p>
          </div>
        )}

        {/* VIEW 2: Concept Overview Replicating Reference Screenshot */}
        {viewMode === 'overview' && (
          <ConceptOverview
            onSelectStory={setActiveStory}
            onFocusDevice={(tab, dark) => {
              setActiveTab(tab);
              setIsDark(dark);
              setViewMode('simulator');
            }}
          />
        )}

        {/* VIEW 3: React Native + Expo Source Code Viewer */}
        {viewMode === 'code' && <ExpoCodeViewer />}
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

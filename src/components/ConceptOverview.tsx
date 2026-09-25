import React from 'react';
import { PhoneSimulator, TabType } from './PhoneSimulator';
import { StoryItem } from '../data/mockData';

interface ConceptOverviewProps {
  onSelectStory: (story: StoryItem) => void;
  onFocusDevice?: (tab: TabType, isDark: boolean) => void;
}

export const ConceptOverview: React.FC<ConceptOverviewProps> = ({
  onSelectStory,
  onFocusDevice,
}) => {
  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#181926] via-[#1F2133] to-[#12131D]">
      {/* Title & Concept Header matching reference screenshot */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
          Shadow — Concept UI
        </h1>
        <p className="text-xs sm:text-sm text-slate-300/80 mt-2 font-medium max-w-lg mx-auto leading-relaxed">
          Feed, explorar y perfil en modo claro y oscuro. Todas las pantallas son interactivas: toca las historias, los tabs, el botón seguir y los me gusta.
        </p>
      </div>

      {/* Main Responsive Grid Layout replicating the reference screenshot */}
      <div className="w-full max-w-7xl flex flex-col items-center gap-12">
        {/* Row 1: Center Top - Dark Mode Explore */}
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-[11px] font-semibold text-purple-200">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Explorar / Discover (Modo Oscuro)
          </div>
          <div className="transform hover:scale-[1.01] transition-transform duration-300">
            <PhoneSimulator
              isDark={true}
              onToggleTheme={() => {}}
              activeTab="explore"
              onSelectStory={onSelectStory}
              standalone={false}
            />
          </div>
        </div>

        {/* Row 2: Side-by-Side arrangement (Light Feed | Dark Feed | Light Profile) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center items-start">
          {/* Left Column: Light Mode Feed */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-slate-800/80 border border-white/10 text-[11px] font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              Feed / Home (Modo Claro)
            </div>
            <div className="transform hover:scale-[1.01] transition-transform duration-300">
              <PhoneSimulator
                isDark={false}
                onToggleTheme={() => {}}
                activeTab="home"
                onSelectStory={onSelectStory}
                standalone={false}
              />
            </div>
          </div>

          {/* Center Column: Dark Mode Feed */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-slate-900/90 border border-purple-500/20 text-[11px] font-semibold text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Feed / Home (Modo Oscuro)
            </div>
            <div className="transform hover:scale-[1.01] transition-transform duration-300">
              <PhoneSimulator
                isDark={true}
                onToggleTheme={() => {}}
                activeTab="home"
                onSelectStory={onSelectStory}
                standalone={false}
              />
            </div>
          </div>

          {/* Right Column: Light Mode Profile */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-[11px] font-semibold text-pink-200">
              <span className="w-2 h-2 rounded-full bg-pink-400" />
              Perfil Mauricio Lopez (Modo Claro)
            </div>
            <div className="transform hover:scale-[1.01] transition-transform duration-300">
              <PhoneSimulator
                isDark={false}
                onToggleTheme={() => {}}
                activeTab="profile"
                onSelectStory={onSelectStory}
                standalone={false}
              />
            </div>
          </div>
        </div>

        {/* Row 3: Reels UI (Matching Reference Screenshot - Eliott Johnson & Christian Lue) */}
        <div className="flex flex-col items-center mt-6">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-pink-500/30 text-[11px] font-semibold text-pink-200">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            Reels Section (Eliott Johnson & Christian Lue)
          </div>
          <div className="transform hover:scale-[1.01] transition-transform duration-300">
            <PhoneSimulator
              isDark={false}
              onToggleTheme={() => {}}
              activeTab="reels"
              onSelectStory={onSelectStory}
              standalone={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

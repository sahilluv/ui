import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Folder,
  FileCode,
  Terminal,
  Download,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { EXPO_SOURCE_FILES, SourceFile } from '../data/expoSourceFiles';

export const ExpoCodeViewer: React.FC = () => {
  const [activeFileIndex, setActiveFileIndex] = useState(1); // default to App.tsx
  const [copiedFile, setCopiedFile] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const activeFile: SourceFile = EXPO_SOURCE_FILES[activeFileIndex];

  const handleCopyFile = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleCopyAll = () => {
    const allCode = EXPO_SOURCE_FILES.map(
      (f) => `// ==================================================\n// FILE: ${f.path}\n// ==================================================\n\n${f.code}\n\n`
    ).join('\n');
    navigator.clipboard.writeText(allCode);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const expoCommand = `npx create-expo-app shadow-app --template blank-typescript\ncd shadow-app\nnpx expo install expo-linear-gradient @expo/vector-icons react-native-safe-area-context expo-status-bar\nnpx expo start`;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(expoCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  // Group files by category
  const categories = ['Root', 'Theme', 'Types', 'Components', 'Screens'] as const;

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-[#151726] border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold mb-3">
              <Code size={13} />
              React Native + Expo SDK 51 TypeScript Source
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Código Fuente Completo de Shadow Mobile
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Todos los archivos y componentes listados a continuación están listos para ser copiados directamente en tu proyecto Expo. Cumplen estrictamente con React Native puro y TypeScript, sin HTML/CSS web.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 hover:opacity-95 active:scale-95 transition-all"
            >
              {copiedAll ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedAll ? '¡Todo Copiado!' : 'Copiar Todos los Archivos'}</span>
            </button>

            <button
              onClick={handleCopyCommand}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all"
            >
              {copiedCommand ? <Check size={15} /> : <Terminal size={15} />}
              <span>{copiedCommand ? 'Comandos Copiados' : 'Comandos de Instalación'}</span>
            </button>
          </div>
        </div>

        {/* Terminal Setup Instructions Drawer */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="bg-[#0D0E17] rounded-2xl p-4 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-300 overflow-x-auto no-scrollbar w-full sm:w-auto">
              <span className="text-pink-400 select-none">$</span>
              <span className="text-purple-300">npx expo install</span>
              <span className="text-slate-300">expo-linear-gradient @expo/vector-icons react-native-safe-area-context expo-status-bar</span>
            </div>
            <button
              onClick={handleCopyCommand}
              className="text-pink-400 hover:text-pink-300 shrink-0 text-xs font-sans font-bold flex items-center gap-1.5"
            >
              {copiedCommand ? <Check size={14} /> : <Copy size={14} />}
              Copiar comandos
            </button>
          </div>
        </div>
      </div>

      {/* Main File Explorer & Code Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#131422] border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-[640px]">
        {/* Sidebar: File Tree */}
        <div className="lg:col-span-4 bg-[#0F101C] p-4 border-r border-white/10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="px-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Folder size={14} className="text-pink-400" />
                Explorador de Archivos
              </h3>
            </div>

            <div className="space-y-4">
              {categories.map((category) => {
                const categoryFiles = EXPO_SOURCE_FILES.filter(
                  (f) => f.category === category
                );
                if (categoryFiles.length === 0) return null;

                return (
                  <div key={category} className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 px-2 block uppercase tracking-wider">
                      {category}
                    </span>
                    <div className="space-y-0.5">
                      {categoryFiles.map((file) => {
                        const globalIdx = EXPO_SOURCE_FILES.findIndex(
                          (f) => f.path === file.path
                        );
                        const isActive = globalIdx === activeFileIndex;

                        return (
                          <button
                            key={file.path}
                            onClick={() => setActiveFileIndex(globalIdx)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-left transition-colors ${
                              isActive
                                ? 'bg-pink-500/15 text-pink-300 font-bold border border-pink-500/30'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileCode
                                size={14}
                                className={isActive ? 'text-pink-400' : 'text-slate-500'}
                              />
                              <span className="truncate">{file.path}</span>
                            </div>
                            {isActive && <ChevronRight size={13} className="text-pink-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 mt-4 px-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>{EXPO_SOURCE_FILES.length} archivos en total</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              TypeScript 100%
            </span>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="lg:col-span-8 flex flex-col bg-[#0A0B12]">
          {/* File Tab Header */}
          <div className="h-14 px-6 border-b border-white/10 flex items-center justify-between bg-[#0F101C]/80 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <FileCode size={15} className="text-pink-400" />
                <span className="font-bold text-white">{activeFile.path}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {activeFile.description}
              </p>
            </div>

            <button
              onClick={handleCopyFile}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 active:scale-95 shrink-0"
            >
              {copiedFile ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedFile ? 'Copiado' : 'Copiar Archivo'}</span>
            </button>
          </div>

          {/* Code Text with Syntax Look */}
          <div className="p-6 flex-1 overflow-auto max-h-[640px] font-mono text-xs text-slate-300 leading-relaxed select-text">
            <pre className="whitespace-pre">
              <code>{activeFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

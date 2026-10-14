import React, { useState } from 'react';
import {
  ArrowRight,
  Eye,
  EyeOff,
  User,
  AtSign,
  Mail,
  Lock,
  Wifi,
  Battery,
  Check,
} from 'lucide-react';
import {
  shadowGirlReading,
  shadowBoyPhone,
  shadowGirlGlassesBun,
} from '../assets/images';
import { MangaArtwork } from './MangaArtwork';
import { ShadowBackgroundDesign } from './ShadowBackgroundDesign';

export type ShadowAuthStep = 'welcome' | 'signup' | 'login';

export interface ShadowAuthScreenProps {
  /** Force an exact screen view (e.g., when displayed side-by-side) */
  lockedStep?: ShadowAuthStep;
  /** Initial step if interactive navigation is enabled */
  initialStep?: ShadowAuthStep;
  /** Callback when user finishes authenticating */
  onAuthSuccess?: (user: { name: string; username: string; email: string }) => void;
  /** Callback for toast feedback notifications */
  onToast?: (message: string) => void;
  /** Whether to show the simulated iPhone status bar at the top */
  showStatusBar?: boolean;
  /** Brand name displayed across screens ('Shadow') */
  brandName?: string;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Simulated iPhone Status Bar (9:41, Cellular, Wi-Fi, Battery)
 */
export const ShadowStatusBar: React.FC<{ time?: string }> = ({ time = '9:41' }) => (
  <div className="w-full pt-3 px-6 pb-2 flex items-center justify-between text-white/90 text-xs font-semibold select-none z-30 shrink-0">
    <span className="tracking-tight text-[13px] font-bold text-white drop-shadow-sm">{time}</span>
    {/* Dynamic Island / Speaker Pill */}
    <div className="w-24 h-4 bg-black/80 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
      <div className="w-2.5 h-2.5 rounded-full bg-[#110D24] border border-white/10 mr-1" />
      <div className="w-2 h-2 rounded-full bg-indigo-950" />
    </div>
    <div className="flex items-center gap-1.5 drop-shadow-sm">
      {/* Cellular Signal Bars */}
      <div className="flex items-end gap-0.5 h-3">
        <span className="w-0.5 h-1 bg-white rounded-full" />
        <span className="w-0.5 h-1.5 bg-white rounded-full" />
        <span className="w-0.5 h-2 bg-white rounded-full" />
        <span className="w-0.5 h-2.5 bg-white rounded-full" />
      </div>
      <Wifi size={13} className="text-white ml-0.5" />
      <Battery size={15} className="text-white" />
    </div>
  </div>
);

/**
 * Google Multi-color Icon
 */
const GoogleColorIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

/**
 * Handwritten Italic Expressive Purple Shadow Logo
 * Designed with flowing cursive typography (Caveat / Pacifico)
 * Perfectly sized to prevent clipping while retaining artistic flair.
 */
export const HandwrittenShadowLogo: React.FC<{
  size?: 'normal' | 'large';
  className?: string;
}> = ({ size = 'large', className = '' }) => {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Decorative accent dynamic motion lines (top right) */}
      <div className="absolute -top-3 -right-4 flex items-center gap-1 opacity-70 pointer-events-none">
        <span className="w-1.5 h-4 bg-purple-400 rounded-full rotate-45 transform" />
        <span className="w-1.5 h-3 bg-purple-300 rounded-full rotate-45 transform" />
        <span className="w-1 h-2 bg-pink-300 rounded-full rotate-45 transform" />
      </div>

      {/* Main Handwritten Logo Text */}
      <h1
        className={`font-shadow-script italic font-bold tracking-normal leading-none drop-shadow-[0_4px_16px_rgba(168,85,247,0.45)] ${
          size === 'large'
            ? 'text-[54px] sm:text-[60px] py-1 px-3'
            : 'text-[42px] sm:text-[46px] py-1 px-2'
        }`}
        style={{
          background: 'linear-gradient(135deg, #E9D5FF 0%, #C084FC 30%, #A855F7 65%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 25px rgba(168, 85, 247, 0.35)',
        }}
      >
        Shadow
      </h1>

      {/* Subtle organic purple underline flourish */}
      <svg
        className="w-36 h-3 -mt-1 text-purple-400 opacity-60 pointer-events-none"
        viewBox="0 0 140 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 8C35 2 95 3 137 7"
          stroke="url(#underlineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

/**
 * Rebuilt Shadow Authentication Screen
 * Fully implements the three screens (Welcome, Sign Up, Login)
 * with near-black navy-purple aesthetics, mint-green accents,
 * purple gradients, pill-shaped inputs, and monochrome manga illustrations.
 */
export const ShadowAuthScreen: React.FC<ShadowAuthScreenProps> = ({
  lockedStep,
  initialStep = 'welcome',
  onAuthSuccess,
  onToast,
  showStatusBar = true,
  brandName = 'Shadow',
  className = '',
}) => {
  const [internalStep, setInternalStep] = useState<ShadowAuthStep>(initialStep);
  const activeStep: ShadowAuthStep = lockedStep || internalStep;

  // Form State
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const notify = (msg: string) => {
    if (onToast) onToast(msg);
  };

  const handleStepChange = (step: ShadowAuthStep) => {
    if (lockedStep) {
      notify(`Navigation locked to ${step.toUpperCase()} screen in multi-phone review`);
      return;
    }
    setInternalStep(step);
  };

  const handleGoogleAuth = () => {
    notify('Connecting securely to Google Account...');
    setTimeout(() => {
      notify('Signed in with Google! Welcome to Shadow.');
      if (onAuthSuccess) {
        onAuthSuccess({
          name: 'Alex Rivera',
          username: 'alex_rivera',
          email: 'alex.rivera@example.com',
        });
      }
    }, 800);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      notify('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }
    const finalName = name.trim() || 'Shadow Citizen';
    const finalUsername = username.trim() || 'shadow_runner';
    const finalEmail = email.trim() || 'user@shadow.community';

    notify(`Account created successfully! Welcome to Shadow, @${finalUsername}`);
    if (onAuthSuccess) {
      onAuthSuccess({
        name: finalName,
        username: finalUsername,
        email: finalEmail,
      });
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = loginIdentifier.trim() || 'shadow_user';
    notify(`Welcome back to Shadow, @${cleanId}!`);
    if (onAuthSuccess) {
      onAuthSuccess({
        name: 'Shadow Member',
        username: cleanId,
        email: cleanId.includes('@') ? cleanId : `${cleanId}@shadow.community`,
      });
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden text-white font-sans ${className}`}
      style={{
        background: 'linear-gradient(180deg, #0B081A 0%, #120D28 45%, #090616 100%)',
      }}
    >
      {/* 1. Simulated iPhone Status Bar */}
      {showStatusBar && <ShadowStatusBar />}

      {/* ========================================================= */}
      {/* SCREEN 1: WELCOME TO SHADOW                               */}
      {/* ========================================================= */}
      {activeStep === 'welcome' && (
        <div className="relative flex-1 flex flex-col justify-between p-6 z-10">
          <ShadowBackgroundDesign screenType="welcome" />

          {/* Top Branding Section */}
          <div className="relative z-10 flex flex-col items-center text-center mt-6">
            <h2 className="text-white text-3xl sm:text-[34px] font-black tracking-tight drop-shadow-sm">
              Welcome To
            </h2>

            {/* Handwritten Italic Expressive Purple Logo */}
            <div className="mt-1">
              <HandwrittenShadowLogo size="large" />
            </div>

            {/* Subtitle */}
            <p className="text-purple-200/90 text-sm font-medium tracking-wide mt-2 drop-shadow-sm max-w-[260px]">
              A Hub Where Whispers Echo Loudest
            </p>
          </div>

          {/* Middle Spacer / Art Anchor */}
          <div className="relative z-10 flex-1 flex items-end justify-center pb-2">
            {/* Black-and-white anime illustration of a girl reading a book in armchair */}
            <div className="relative w-64 h-64 -mb-4 flex items-center justify-center">
              <MangaArtwork
                src={shadowGirlReading}
                alt="Anime girl peacefully reading a book in an armchair"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Bottom Action Section */}
          <div className="relative z-20 flex flex-col gap-3.5 mb-2">
            {/* Large Purple Gradient Sign Up Button with Circular Arrow */}
            <button
              onClick={() => handleStepChange('signup')}
              className="w-full py-4 px-6 rounded-full font-bold text-white text-base tracking-wide flex items-center justify-between shadow-xl shadow-purple-950/60 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer border border-purple-400/30"
              style={{
                background: 'linear-gradient(90deg, #9333EA 0%, #A855F7 50%, #7E22CE 100%)',
              }}
            >
              <span className="pl-2 font-bold tracking-wide">Sign up</span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-sm">
                <ArrowRight size={16} className="text-white" />
              </div>
            </button>

            {/* Footer Link: Already have an account? Login */}
            <div className="text-center text-xs text-purple-200/80 font-medium">
              Already have an account?{' '}
              <button
                onClick={() => handleStepChange('login')}
                className="text-[#34D399] hover:underline font-bold transition-colors cursor-pointer ml-1"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 2: SIGN UP TO SHADOW                               */}
      {/* ========================================================= */}
      {activeStep === 'signup' && (
        <div className="relative flex-1 flex flex-col justify-between p-6 z-10">
          <ShadowBackgroundDesign screenType="signup" />

          {/* Form Content */}
          <div className="relative z-10 flex flex-col gap-3.5 mt-2">
            {/* Header Title */}
            <h2 className="text-white text-2xl font-black text-center tracking-tight drop-shadow-sm pt-1">
              Sign up to Shadow
            </h2>

            {/* Google Signup Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full py-3 px-5 rounded-full bg-[#181236]/90 hover:bg-[#201848] border border-purple-500/25 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md shadow-black/30 active:scale-[0.99]"
            >
              <GoogleColorIcon size={18} />
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-0.5">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-purple-500/30" />
              <span className="text-[11px] font-medium text-purple-300/70 tracking-wide uppercase">
                Or continue with Email
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/30 via-purple-500/30 to-transparent" />
            </div>

            {/* Input Fields */}
            <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-2.5">
              {/* Name field */}
              <div className="relative flex items-center">
                <User size={15} className="absolute left-4 text-purple-300/60 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-3 pl-11 pr-4 rounded-full bg-[#181236]/90 border border-purple-500/25 text-white placeholder:text-purple-300/50 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all"
                />
              </div>

              {/* Username field */}
              <div className="relative flex items-center">
                <AtSign size={15} className="absolute left-4 text-purple-300/60 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-3 pl-11 pr-4 rounded-full bg-[#181236]/90 border border-purple-500/25 text-white placeholder:text-purple-300/50 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all"
                />
              </div>

              {/* Email field */}
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-4 text-purple-300/60 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 pl-11 pr-4 rounded-full bg-[#181236]/90 border border-purple-500/25 text-white placeholder:text-purple-300/50 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all"
                />
              </div>

              {/* Password field with toggle */}
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-4 text-purple-300/60 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 pl-11 pr-11 rounded-full bg-[#181236]/90 border border-purple-500/25 text-white placeholder:text-purple-300/50 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-purple-300/60 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2.5 mt-1 cursor-pointer select-none">
                <div
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center border transition-all ${
                    agreeTerms
                      ? 'bg-[#10B981] border-[#10B981] text-black'
                      : 'border-purple-400/40 bg-black/40'
                  }`}
                >
                  {agreeTerms && <Check size={12} strokeWidth={3} className="text-[#090616]" />}
                </div>
                <span className="text-[11px] text-purple-200/80 leading-tight">
                  I agree to the{' '}
                  <span className="text-[#34D399] font-medium hover:underline">Terms of Service</span> and{' '}
                  <span className="text-[#34D399] font-medium hover:underline">Privacy Policy</span>.
                </span>
              </label>

              {/* Purple Gradient Create Account Button with Circular Arrow */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-full font-bold text-white text-sm tracking-wide flex items-center justify-between shadow-xl shadow-purple-950/60 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer border border-purple-400/30"
                style={{
                  background: 'linear-gradient(90deg, #9333EA 0%, #A855F7 50%, #7E22CE 100%)',
                }}
              >
                <span className="pl-2 font-bold tracking-wide">Create Account</span>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-sm">
                  <ArrowRight size={15} className="text-white" />
                </div>
              </button>
            </form>
          </div>

          {/* Bottom Section with Manga Boy with phone at bottom left & footer */}
          <div className="relative z-10 flex flex-col justify-end mt-2">
            {/* Anime Character: Boy holding phone (positioned bottom left) */}
            <div className="absolute -bottom-1 -left-3 w-40 h-40 pointer-events-none select-none z-0 opacity-90">
              <MangaArtwork
                src={shadowBoyPhone}
                alt="Anime boy holding smartphone"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Footer Link: Already have an account? Login */}
            <div className="relative z-10 text-right pr-2 pb-1 text-xs text-purple-200/80 font-medium">
              Already have an account?{' '}
              <button
                onClick={() => handleStepChange('login')}
                className="text-[#34D399] hover:underline font-bold transition-colors cursor-pointer ml-1"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCREEN 3: LOG IN TO SHADOW                                */}
      {/* ========================================================= */}
      {activeStep === 'login' && (
        <div className="relative flex-1 flex flex-col justify-between p-6 z-10">
          <ShadowBackgroundDesign screenType="login" />

          {/* Form Content */}
          <div className="relative z-10 flex flex-col gap-3.5 mt-2">
            {/* Header Title */}
            <h2 className="text-white text-2xl font-black text-center tracking-tight drop-shadow-sm pt-1">
              Log in to Shadow
            </h2>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full py-3 px-5 rounded-full bg-[#181236]/90 hover:bg-[#201848] border border-purple-500/25 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md shadow-black/30 active:scale-[0.99]"
            >
              <GoogleColorIcon size={18} />
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-0.5">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-purple-500/30" />
              <span className="text-[11px] font-medium text-purple-300/70 tracking-wide uppercase">
                Or log in with Email
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/30 via-purple-500/30 to-transparent" />
            </div>

            {/* Input Fields */}
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-2.5">
              {/* Username or Email field */}
              <div className="relative flex items-center">
                <AtSign size={15} className="absolute left-4 text-purple-300/60 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Username or email"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full py-3 pl-11 pr-4 rounded-full bg-[#181236]/90 border border-purple-500/25 text-white placeholder:text-purple-300/50 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all"
                />
              </div>

              {/* Password field with visibility toggle */}
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-4 text-purple-300/60 pointer-events-none" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full py-3 pl-11 pr-11 rounded-full bg-[#181236]/90 border border-purple-500/25 text-white placeholder:text-purple-300/50 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-4 text-purple-300/60 hover:text-white transition-colors cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Mint-green Forgot? Link */}
              <div className="flex justify-end pr-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => notify('Password recovery instructions sent to your email.')}
                  className="text-[#34D399] hover:underline text-xs font-semibold cursor-pointer transition-colors"
                >
                  Forgot?
                </button>
              </div>

              {/* Purple Gradient Log In Button with Circular Arrow */}
              <button
                type="submit"
                className="w-full mt-1.5 py-3.5 px-6 rounded-full font-bold text-white text-sm tracking-wide flex items-center justify-between shadow-xl shadow-purple-950/60 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer border border-purple-400/30"
                style={{
                  background: 'linear-gradient(90deg, #9333EA 0%, #A855F7 50%, #7E22CE 100%)',
                }}
              >
                <span className="pl-2 font-bold tracking-wide">Log in</span>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-sm">
                  <ArrowRight size={15} className="text-white" />
                </div>
              </button>
            </form>
          </div>

          {/* Bottom Section with Manga Girl with glasses at bottom right & footer */}
          <div className="relative z-10 flex flex-col justify-end mt-2">
            {/* Anime Character: Girl with glasses and hair bun (positioned bottom right) */}
            <div className="absolute -bottom-1 -right-3 w-40 h-40 pointer-events-none select-none z-0 opacity-90">
              <MangaArtwork
                src={shadowGirlGlassesBun}
                alt="Anime girl with glasses and hair bun"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Footer Link: Don't have an account? Sign up */}
            <div className="relative z-10 text-left pl-2 pb-1 text-xs text-purple-200/80 font-medium">
              Don't have an account?{' '}
              <button
                onClick={() => handleStepChange('signup')}
                className="text-[#34D399] hover:underline font-bold transition-colors cursor-pointer ml-1"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShadowAuthScreen;

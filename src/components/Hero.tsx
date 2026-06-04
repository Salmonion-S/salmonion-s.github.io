/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Compass, Sparkles, Network } from "lucide-react";

interface HeroProps {
  onNavigate: (view: "home" | "contact" | "404", anchorId?: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const phrases = [
    "IT Enthusiast",
    "Junior Network Specialist",
    "Junior Mikrotik",
    "Junior Fiber Optic",
    "Junior Prompt Engineer",
    "Junior Engineer",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // High-performance typed hook (safely cycles through the user's customized phrases)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = phrases[phraseIndex];

    const tick = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        setTypingSpeed(120);

        if (displayText === currentFullText) {
          setIsDeleting(true);
          setTypingSpeed(2000); // Wait on complete phrase
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        setTypingSpeed(60);

        if (displayText === "") {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          setTypingSpeed(450); // Pause before next phrase
        }
      }
    };

    timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, typingSpeed]);

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden md:px-6"
    >
      {/* Immersive background soft glow blobs */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl saturate-150 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/12 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl saturate-150 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center px-4">
        {/* Featured Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center space-x-2 bg-white/5 border border-white/10 px-4.5 py-1.5 rounded-full backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
            Network & Junior IT
          </span>
        </motion.div>

        {/* Profile Image with Golden Ratio Dimensions (192px/w x 192px/h is exactly w-48 h-48) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mb-8"
        >
          {/* Glass Specular Outlining Rings */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-sky-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-60 animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-purple-400 to-pink-500 rounded-full opacity-40 blur-sm pointer-events-none" />
          
          <div className="relative w-48 h-48 rounded-full p-1.5 bg-slate-900/60 border border-white/15 backdrop-blur-xl shadow-2xl overflow-hidden hover:scale-103 transition-transform duration-500">
            <img
              src="https://telegra.ph/file/d8dd9492c6baef0f131c4.jpg"
              alt="Salmon Profile Artwork"
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover quality-high"
            />
          </div>
        </motion.div>

        {/* Name and Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
        >
          Hello, I&apos;m <span className="text-gradient-primary">Salmon</span>
        </motion.h1>

        {/* Specialized Typewriter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="h-10 text-xl sm:text-2xl font-light text-slate-350 tracking-wide font-sans mb-12 flex items-center justify-center"
        >
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mr-1">
            Specialized in
          </span>
          <span className="text-sky-305 font-medium border-r-2 border-sky-400 pr-1 animate-pulse min-h-[1.5em] inline-block">
            {displayText}
          </span>
        </motion.div>

        {/* Interlocking CTA Buttons in Golden Proportion ratios */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4.5 w-full max-w-md mx-auto"
        >
          {/* Main Primary Button */}
          <button
            onClick={() => onNavigate("contact")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-slate-950 bg-gradient-to-r from-sky-400 via-sky-300 to-purple-400 border border-white/20 shadow-[0_10px_35px_-5px_rgba(56,189,248,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(56,189,248,0.5)] hover:scale-103 active:scale-98 transition-all duration-300 flex items-center justify-center space-x-2.5 interactive"
          >
            <span>My Virtual Cards</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary Outline Glass Button */}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home", "about");
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:scale-103 active:scale-98 transition-all duration-300 flex items-center justify-center space-x-2.5 interactive"
          >
            <Network className="w-4 h-4 text-sky-400" />
            <span>Discover More</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

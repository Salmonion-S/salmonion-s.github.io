/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Smartphone, Compass } from "lucide-react";

interface HeaderProps {
  currentView: "home" | "contact" | "404";
  onNavigate: (view: "home" | "contact" | "404", anchorId?: string) => void;
  activeSection: string;
}

export function Header({ currentView, onNavigate, activeSection }: HeaderProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scrolling to auto-hide header and calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(currentScrollY / totalHeight);
      }

      // Auto Hide header logic
      if (currentScrollY > prevScrollY && currentScrollY > 80) {
        setIsHeaderVisible(false); // Hide
      } else {
        setIsHeaderVisible(true); // Show
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const handleLinkClick = (e: React.MouseEvent, anchorId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate("home", anchorId);
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Scroll Progress Indicator Bar at supreme top */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-950/20 z-[60] pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 via-purple-400 to-pink-500 rounded-r-full"
          style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
        />
      </div>

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4.5">
          <div className="liquid-glass-panel px-6 py-3 rounded-full flex items-center justify-between shadow-2xl shadow-sky-950/10 hover:shadow-sky-950/20 transition-all duration-500">
            {/* Logo area */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, "hero")}
              className="flex items-center space-x-2 group interactive"
            >
              <div className="relative w-7.5 h-7.5 bg-gradient-to-br from-sky-400/30 to-purple-500/30 rounded-full flex items-center justify-center border border-white/20 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0.5 bg-gradient-to-tr from-sky-400 to-purple-500 rounded-full opacity-70 blur-xs group-hover:opacity-100 transition-opacity" />
                <Compass className="w-4 h-4 text-white relative z-10" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                Salmon<span className="text-sky-400">.</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1.5 bg-white/5 py-1 px-1.5 rounded-full border border-white/5 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = currentView === "home" && activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className="relative px-4.5 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full text-slate-350 hover:text-white interactive"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-white/10 border border-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* CTA Profile Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => onNavigate("contact")}
                className={`flex items-center space-x-1.5 px-4.5 py-2 text-xs font-semibold rounded-full border transition-all duration-300 interactive ${
                  currentView === "contact"
                    ? "bg-sky-400 text-slate-950 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                    : "bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 active:scale-97"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>NFC Contact</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-sky-400 transition-colors interactive"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Curtain Glass Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          >
            {/* Soft decorative light orbits behind menu */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col items-center space-y-6 z-10 w-full max-w-xs px-6">
              {navItems.map((item, idx) => {
                const isActive = currentView === "home" && activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className={`relative w-full py-4 text-center text-2xl font-semibold rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "text-sky-400 bg-sky-500/10 border-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                        : "text-slate-300 bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.label}
                  </motion.a>
                );
              })}

              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate("contact");
                }}
                className={`w-full py-4.5 mt-4 text-center text-lg font-bold rounded-2xl flex items-center justify-center space-x-2 border transition-all ${
                  currentView === "contact"
                    ? "bg-sky-400 text-slate-950 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                    : "bg-gradient-to-r from-sky-400 to-purple-500 text-white border-transparent"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.08 }}
              >
                <Smartphone className="w-5 h-5 animate-bounce" />
                <span>NFC Virtual Contact</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

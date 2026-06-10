/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ViewRoute } from "./types";
import { CustomCursor } from "./components/CustomCursor";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { NFCContact } from "./components/NFCContact";
import { Page404 } from "./components/Page404";
import { Credentials } from "./components/Credentials";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewRoute>("home");
  const [activeSection, setActiveSection] = useState("hero");

const redirect = sessionStorage.getItem("redirect");

if (redirect) {
  sessionStorage.removeItem("redirect");
  window.history.replaceState({}, "", redirect);
}

  // Custom client router reflecting native window history pathnames
  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname.toLowerCase();
      if (
        path === "/contact" ||
        path === "/contact.html" ||
        path.endsWith("/contact") ||
        path.endsWith("/contact.html")
      ) {
        setCurrentView("contact");
      } else if (
        path === "/404" ||
        path === "/404.html" ||
        path.endsWith("/404") ||
        path.endsWith("/404.html")
      ) {
        setCurrentView("404");
      } else if (path === "/" || path === "" || path.endsWith("/")) {
        setCurrentView("home");
      } else {
        // Fallback for missing configurations, displaying premium 404 page
        setCurrentView("404");
      }
    };

    handleUrlRouting();
    window.addEventListener("popstate", handleUrlRouting);
    return () => window.removeEventListener("popstate", handleUrlRouting);
  }, []);

  // Monitor Scroll positions on primary home sections to update Header items
  useEffect(() => {
    if (currentView !== "home") return;

    const sections = ["hero", "about", "skills", "credentials", "contact"];

    const updateActiveSectionOnScroll = () => {
      const scrollPosition = window.scrollY + 280; // offset benchmark
      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", updateActiveSectionOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSectionOnScroll);
  }, [currentView]);

  // Master Navigation Controller supporting coordinates scroll offsets
  const handleNavigate = (view: ViewRoute, anchorId?: string) => {
    let targetPath = "/";
    if (view === "contact") targetPath = "/contact";
    if (view === "404") targetPath = "/404";

    // Push standard browser history states
    window.history.pushState({}, "", targetPath);
    setCurrentView(view);

    if (view === "home") {
      if (anchorId) {
        // Delay to allow DOM switches to complete first
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans text-slate-200 overflow-x-hidden select-none selection:bg-purple-500/20 selection:text-sky-400">
      {/* High-fidelity Custom Cursor (Touch screen disabled intrinsically) */}
      <CustomCursor />

      {/* Modern Rotating Glass Reflection Neon Blobs */}
      <div className="absolute inset-x-0 top-0 h-[1000px] bg-slate-950 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            transform: ["translate(-10%, -20%) rotate(0deg)", "translate(10%, -10%) rotate(180deg)", "translate(-10%, -20%) rotate(360deg)"],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-sky-500/8 blur-[120px]"
        />
        <motion.div
          animate={{
            transform: ["translate(15%, 5%) rotate(0deg)", "translate(-15%, -10%) rotate(-180deg)", "translate(15%, 5%) rotate(-360deg)"],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/6 blur-[150px]"
        />
      </div>

      {/* Floating starry sky simulation via premium background animations */}
      <div className="fixed inset-0 pointer-events-none -z-20 opacity-35 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Sticky Header Navigation Component */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Container with Page Dissolve Transitions */}
      <main className="relative z-10 w-full min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, filter: "blur(12px)", scale: 0.99 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1.0 }}
            exit={{ opacity: 0, filter: "blur(12px)", scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow flex flex-col justify-between"
          >
            {currentView === "home" && (
              <>
                <Hero onNavigate={handleNavigate} />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                <About />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                <Skills />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                <Credentials />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                <Contact />
              </>
            )}

            {currentView === "contact" && <NFCContact />}

            {currentView === "404" && <Page404 onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Unified Liquid Glass Footer */}
      <footer className="relative z-10 border-t border-white/5 py-10 bg-slate-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2 font-mono text-xs text-slate-500">
            <span className="inline-block w-2.5 h-2.5 bg-sky-400 rounded-full animate-pulse" />
            <span>Salmoni</span>
          </div>

          <p className="text-sm text-slate-400 text-center font-light">
            2026 Salmon. Designed using{" "}
            <span className="text-sky-405 font-medium">React</span> & &nbsp;
            <span className="text-purple-405 font-medium animate-pulse">Motion</span>.
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => handleNavigate("contact")}
              className="text-xs font-mono text-slate-400 hover:text-sky-305 transition-colors interactive"
            >
              NFC_CARD
            </button>
            <span className="text-slate-700 font-light">|</span>
            <button
              onClick={() => handleNavigate("home", "hero")}
              className="text-xs font-mono text-slate-400 hover:text-sky-305 transition-colors interactive"
            >
              SECURE_DOCK
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
import { Page404 } from "./components/Page404";
import { Credentials } from "./components/Credentials";
import Contacts from "./pages/Contacts";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewRoute>("home");
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname.toLowerCase();
      if (
        path === "/contacts" ||
        path === "/contacts.html" ||
        path.endsWith("/contacts") ||
        path.endsWith("/contacts.html")
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
        setCurrentView("404");
      }
    };

    handleUrlRouting();
    window.addEventListener("popstate", handleUrlRouting);
    return () => window.removeEventListener("popstate", handleUrlRouting);
  }, []);

  useEffect(() => {
    if (currentView !== "home") return;

    const sections = ["hero", "about", "skills", "credentials", "contact"];

    const updateActiveSectionOnScroll = () => {
      const scrollPosition = window.scrollY + 280;
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

  const handleNavigate = (view: ViewRoute, anchorId?: string) => {
    let targetPath = "/";
    if (view === "contact") targetPath = "/contacts";
    if (view === "404") targetPath = "/404";

    window.history.pushState({}, "", targetPath);
    setCurrentView(view);

    if (view === "home") {
      if (anchorId) {
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
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
      <CustomCursor />

      <div className="absolute inset-x-0 top-0 h-[1000px] bg-slate-950 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ transform: ["translate(-10%, -20%) rotate(0deg)", "translate(10%, -10%) rotate(180deg)", "translate(-10%, -20%) rotate(360deg)"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-sky-500/8 blur-[120px]"
        />
        <motion.div
          animate={{ transform: ["translate(15%, 5%) rotate(0deg)", "translate(-15%, -10%) rotate(-180deg)", "translate(15%, 5%) rotate(-360deg)"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/6 blur-[150px]"
        />
      </div>

      <div className="fixed inset-0 pointer-events-none -z-20 opacity-35 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />

      <Header currentView={currentView} onNavigate={handleNavigate} activeSection={activeSection} />

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

            {currentView === "contact" && <Contacts />}
            {currentView === "404" && <Page404 onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-10 bg-slate-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2 font-mono text-xs text-slate-500">
            <span className="inline-block w-2.5 h-2.5 bg-sky-400 rounded-full animate-pulse" />
            <span>Salmoni</span>
          </div>
          <p className="text-sm text-slate-400 text-center font-light">
            2026 Salmon. Designed using <span className="text-sky-405 font-medium">React</span> & <span className="text-purple-405 font-medium animate-pulse">Motion</span>.
          </p>
          <div className="flex space-x-4">
            <button onClick={() => handleNavigate("contact")} className="text-xs font-mono text-slate-400 hover:text-sky-305 transition-colors interactive">
              NFC_CARD
            </button>
            <span className="text-slate-700 font-light">|</span>
            <button onClick={() => handleNavigate("home", "hero")} className="text-xs font-mono text-slate-400 hover:text-sky-305 transition-colors interactive">
              SECURE_DOCK
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
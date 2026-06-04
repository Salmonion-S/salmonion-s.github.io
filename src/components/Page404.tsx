/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Compass, House, Sparkles } from "lucide-react";

interface Page404Props {
  onNavigate: (view: "home" | "contact" | "404", anchorId?: string) => void;
}

export function Page404({ onNavigate }: Page404Props) {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Heavy halo cosmic background rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full liquid-glass-panel rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl"
      >
        {/* Specular glass reflection */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl pointer-events-none" />

        <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/10 mx-auto mb-6">
          <Compass className="w-8 h-8 text-pink-400 animate-spin" style={{ animationDuration: '40s' }} />
        </div>

        <span className="text-sm font-bold uppercase tracking-widest text-pink-400 font-mono block mb-2">
          ERROR 404 | PACKET LOST
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
          Page Drifted Away
        </h2>

        <p className="text-sm sm:text-base text-slate-350 leading-relaxed font-light mb-8">
          &quot;Looks like this page drifted into another dimension.&quot; The coordinates you linked do not exist on our servers.
        </p>

        {/* Action button */}
        <div className="space-y-3.5">
          <button
            onClick={() => onNavigate("home")}
            className="w-full py-3.5 rounded-full font-semibold text-slate-950 bg-gradient-to-r from-sky-400 via-sky-305 to-purple-400 shadow-[0_4px_15px_rgba(56,189,248,0.25)] hover:shadow-[0_8px_20px_rgba(56,189,248,0.35)] hover:scale-102 active:scale-98 transition-all duration-300 flex items-center justify-center space-x-2 interactive"
          >
            <House className="w-4 h-4" />
            <span>Return to Safe Port</span>
          </button>

          <button
            onClick={() => onNavigate("contact")}
            className="w-full py-3.5 rounded-full font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-98 transition-all duration-350 flex items-center justify-center space-x-2.5 interactive"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Get NFC Card instead</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

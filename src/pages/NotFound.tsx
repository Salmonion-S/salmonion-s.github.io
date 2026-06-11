import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { NeonGlassCard } from '../components/NeonGlassCard';

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center relative overflow-hidden bg-black p-4">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg z-10"
      >
        <NeonGlassCard strong className="text-center p-12">
          <h1 className="text-7xl sm:text-9xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-2">
            404
          </h1>
          <p className="font-mono text-neon-cyan tracking-widest uppercase mb-8 opacity-80 text-sm sm:text-base">
            Lost in the signal.
          </p>
          
          <Link
            to="/"
            className="inline-block font-sans text-sm tracking-widest font-medium uppercase text-white px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-neon-purple/50 transition-all focus-ring"
          >
            Return Home
          </Link>
        </NeonGlassCard>
      </motion.div>
    </div>
  );
}

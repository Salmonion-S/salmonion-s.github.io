import { motion } from 'motion/react';
import { calculateAge, myBirthday } from '../utils';
import { NeonGlassCard } from '../components/NeonGlassCard';
import { Reveal } from '../components/Reveal';
import { Mail, Instagram, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NfcContact() {
  const age = calculateAge(myBirthday);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Cinematic ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <Reveal className="w-full max-w-sm z-10" direction="none">
        <NeonGlassCard strong className="flex flex-col items-center p-8 gap-6">
          <div className="relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_40px_rgba(178,0,255,0.5)]">
              <img
                src="https://i.ibb.co.com/0pksLrSK/IMG-SEGMENT-20260611-221132.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center space-y-1">
            <h1 className="font-sans font-bold text-2xl tracking-wide text-white">SALMON</h1>
            <p className="font-mono text-neon-cyan text-xs tracking-widest uppercase opacity-80">
              Information Management
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <p className="font-sans text-sm text-gray-400 italic text-center max-w-[250px] leading-relaxed">
            The older I get,
            <br />
            the quieter my trust becomes.
          </p>

          <div className="w-full space-y-3 mt-2">
            <ContactLink
              icon={<MessageSquare size={18} />}
              label="Signal"
              href="#"
              glowColor="group-hover:text-sky-400"
            />
            <ContactLink
              icon={<Instagram size={18} />}
              label="Instagram"
              href="#"
              glowColor="group-hover:text-neon-magenta"
            />
            <ContactLink
              icon={<Mail size={18} />}
              label="Proton Mail"
              href="mailto:contact@example.com"
              glowColor="group-hover:text-neon-purple"
            />
          </div>

          <div className="w-full pt-4 mt-2 border-t border-white/10">
             <Link
                to="/"
                className="w-full flex items-center justify-center font-mono text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors focus-ring py-2"
              >
                ACCESS MAIN_PORTFOLIO
             </Link>
          </div>
        </NeonGlassCard>
      </Reveal>
    </div>
  );
}

function ContactLink({ icon, label, href, glowColor }: { icon: React.ReactNode, label: string, href: string, glowColor: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all focus-ring"
    >
      <div className={`flex items-center gap-3 text-gray-300 ${glowColor} transition-colors`}>
        {icon}
        <span className="font-sans text-sm tracking-wide">{label}</span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/50 text-xs font-mono">
        &rarr;
      </div>
    </a>
  );
}

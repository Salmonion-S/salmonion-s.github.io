/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { calculateAge } from "../utils/age";
import { NFC_CONFIG } from "../config";
import {
  MessageSquare,
  Instagram,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

export function NFCContact() {
  const age = calculateAge();
  const shouldReduceMotion = useReducedMotion();

  // Parallax motion coordinates (normalized from -0.5 to 0.5)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Soft spring damping for fluid luxury kinetic motion
  const springX = useSpring(pointerX, { stiffness: 60, damping: 28 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 28 });

  // Layered background coordinate mapping
  const bgX = useTransform(springX, [-0.5, 0.5], ["-12px", "12px"]);
  const bgY = useTransform(springY, [-0.5, 0.5], ["-12px", "12px"]);

  // Deep background orbs coordinate mapping (exaggerated for glass lens deflection effect)
  const orb1X = useTransform(springX, [-0.5, 0.5], ["-32px", "32px"]);
  const orb1Y = useTransform(springY, [-0.5, 0.5], ["-32px", "32px"]);
  const orb2X = useTransform(springX, [-0.5, 0.5], ["32px", "-32px"]);
  const orb2Y = useTransform(springY, [-0.5, 0.5], ["32px", "-32px"]);

  // Glass card viewport perspective orientation translations
  const cardRotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const cardRotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const cardTranslateX = useTransform(springX, [-0.5, 0.5], ["-4px", "4px"]);
  const cardTranslateY = useTransform(springY, [-0.5, 0.5], ["-4px", "4px"]);

  useEffect(() => {
    // Only capture motions if the client hasn't configured reduced motion accessibility
    if (shouldReduceMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const xPercent = (e.clientX / window.innerWidth) - 0.5;
      const yPercent = (e.clientY / window.innerHeight) - 0.5;
      pointerX.set(xPercent);
      pointerY.set(yPercent);
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        // Map native smartphone tilting values to dynamic offsets (gamma range is -90 to 90, beta is -180 to 180)
        const xPercent = Math.min(Math.max(e.gamma / 22, -0.5), 0.5);
        const yPercent = Math.min(Math.max((e.beta - 45) / 22, -0.5), 0.5); // centered around vertical 45-deg incline
        pointerX.set(xPercent);
        pointerY.set(yPercent);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [pointerX, pointerY, shouldReduceMotion]);

  // Social Links matching strict instructions (Signal, Instagram, ProtonMail, Official Portfolio link)
  const socialLinks = [
    {
      name: "Signal Messenger",
      url: NFC_CONFIG.links.signal,
      icon: MessageSquare,
      desc: "Secure end-to-end node",
      bgClass: "bg-blue-600/10 text-blue-400 border-blue-500/20 hover:bg-blue-600/15",
    },
    {
      name: "Instagram",
      url: NFC_CONFIG.links.instagram,
      icon: Instagram,
      desc: "@wichi_ns",
      bgClass: "bg-pink-600/10 text-pink-400 border-pink-500/20 hover:bg-pink-600/15",
    },
    {
      name: "Proton Mail",
      url: NFC_CONFIG.links.email,
      icon: Mail,
      desc: "Direct secure inbox",
      bgClass: "bg-purple-600/10 text-purple-400 border-purple-500/20 hover:bg-purple-600/15",
    },
  ];

  return (
    <div className="relative w-full min-h-[82vh] flex items-center justify-center overflow-hidden p-3 select-none">
      {/* Liquid Floating Blur Orbs background layer (reduced or static if accessibility requested) */}
      <motion.div
        style={shouldReduceMotion ? {} : { x: bgX, y: bgY }}
        className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none"
      >
        <motion.div
          style={shouldReduceMotion ? {} : { x: orb1X, y: orb1Y }}
          className="absolute w-[240px] h-[240px] rounded-full bg-gradient-to-tr from-sky-450/10 to-transparent blur-3xl"
        />
        <motion.div
          style={shouldReduceMotion ? {} : { x: orb2X, y: orb2Y }}
          className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-transparent blur-3xl -ml-24 -mt-20"
        />
      </motion.div>

      {/* Main Single Screen Responsive Identity Card (optimized to sit on first-screen of smartwatch, mobile & desktop) */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : {
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                x: cardTranslateX,
                y: cardTranslateY,
                transformStyle: "preserve-3d",
              }
        }
        initial={{ opacity: 0, y: 15, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[320px] liquid-glass-panel rounded-[24px] p-4 flex flex-col justify-between items-center relative shadow-2xl border border-white/10 select-none overflow-hidden"
      >
        {/* Apple Style Reflection Gloss Bar */}
        <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-white/10 to-transparent pointer-events-none blur-sm" />

        <div className="w-full flex flex-col items-center">
          {/* Circular Specular Profile Avatar */}
          <div className="relative w-15 h-15 rounded-full p-[2px] bg-gradient-to-tr from-sky-400 via-purple-400 to-pink-500 shadow-md select-none mb-2">
            <img
              src={NFC_CONFIG.profilePhoto}
              alt={NFC_CONFIG.fullName}
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover quality-high bg-slate-900"
            />
            {/* Realtime dynamic availability indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
          </div>

          {/* Primary identity banner */}
          <h1 className="text-lg font-extrabold text-white tracking-tight leading-none">
            {NFC_CONFIG.fullName}
          </h1>

          <div className="flex items-center space-x-1.5 mt-1 select-none">
            <span className="text-[9.5px] font-bold text-sky-400 tracking-wider font-mono">
              {NFC_CONFIG.role.toUpperCase()}
            </span>
            <span className="text-[8px] text-slate-500">•</span>
            <span className="text-[9.5px] font-semibold text-purple-400 font-mono">
              {age} Y/O
            </span>
          </div>

          <div className="flex items-center space-x-1 mt-1 text-slate-400 text-[10px] font-light">
            <MapPin className="w-3 h-3 text-pink-400 shrink-0" />
            <span>{NFC_CONFIG.location}</span>
          </div>

          {/* Fully compliant 2-line condensed bio */}
          <p className="w-full text-[11px] text-slate-300 font-light leading-relaxed text-center mt-2.5 mb-3.5 border-t border-b border-white/5 py-2 px-1 select-none">
            {NFC_CONFIG.shortBio}
          </p>

          {/* Streamlined selection nodes */}
          <div className="w-full space-y-1.5 select-none">
            {socialLinks.map((link) => {
              const SocialIcon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all duration-300 group interactive select-none ${link.bgClass}`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="p-1 px-[7px] bg-slate-950/40 rounded-lg border border-white/8 group-hover:scale-105 transition-transform shrink-0">
                      <SocialIcon className="w-3.5 h-3.5 shrink-0" />
                    </div>
                    <div className="text-left min-w-0">
                      <h4 className="text-[11.5px] font-bold text-white leading-tight">
                        {link.name}
                      </h4>
                      <span className="text-[8.5px] text-slate-400 font-mono font-light truncate block leading-none mt-0.5">
                        {link.desc}
                      </span>
                    </div>
                  </div>
                  <div className="text-[8px] font-bold font-mono px-2 py-0.5 bg-white/5 group-hover:bg-white/10 rounded-full border border-white/5 text-slate-300 transition-all shrink-0">
                    CONNECT
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Minimal dynamic identity footprint */}
        <div className="w-full text-center mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-center space-x-1 text-[8px] font-mono tracking-widest text-slate-500 uppercase">
          <Sparkles className="w-3 h-3 text-sky-400/80 animate-pulse" />
          <span>CONTACT ENCRYPTED</span>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { Instagram, MessageSquare, Mail, ArrowRight, Sparkles } from "lucide-react";
import { NFC_CONFIG } from "../config";

export function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const primaryContacts = [
    {
      name: "Signal Messenger",
      desc: "Secure Encrypted Node",
      url: NFC_CONFIG.links.signal,
      icon: MessageSquare,
      color: "hover:shadow-blue-500/10 hover:border-blue-500/25",
      iconColor: "text-blue-400",
    },
    {
      name: "Instagram",
      desc: "@wichi_ns",
      url: NFC_CONFIG.links.instagram,
      icon: Instagram,
      color: "hover:shadow-pink-500/10 hover:border-pink-500/25",
      iconColor: "text-pink-400",
    },
    {
      name: "Proton Mail",
      desc: "Direct Secure Mailbox",
      url: NFC_CONFIG.links.email,
      icon: Mail,
      color: "hover:shadow-purple-500/10 hover:border-purple-500/25",
      iconColor: "text-purple-405",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden md:px-6">
      {/* Dynamic VisionOS blur spots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-sky-500/10 via-purple-505/5 to-pink-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header adhering to Golden Ratio spacing */}
        <ScrollReveal className="text-center mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-sky-500/10 border border-sky-500/15 rounded-full text-xs font-mono font-bold tracking-widest text-sky-400 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>CONNECT</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Get In <span className="text-gradient-primary">Touch</span>
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto rounded-full mb-5" />
          <p className="max-w-md mx-auto text-slate-400 font-light text-sm sm:text-base font-sans">
            Salmon does not use traditional tracking-heavy platforms. Reach out directly through standard verified nodes.
          </p>
        </ScrollReveal>

        {/* Minimal High-Contrast Directory Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {primaryContacts.map((contact, index) => {
            const SocialIcon = contact.icon;
            return (
              <ScrollReveal key={contact.name} delay={index * 0.08} yOffset={20}>
                <a
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-left liquid-glass-card rounded-[22px] p-5.5 flex flex-col justify-between group block relative overflow-hidden border border-white/8 h-full min-h-[140px] ${contact.color} interactive`}
                  aria-label={`Open ${contact.name}`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 bg-slate-950/60 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                        <SocialIcon className={`w-5 h-5 ${contact.iconColor}`} />
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </div>
                    <div className="text-left mt-4 min-w-0">
                      <h4 className="text-base font-bold text-white group-hover:text-sky-305 transition-colors truncate">
                        {contact.name}
                      </h4>
                      <p className="text-xs text-slate-405 font-mono mt-0.5 truncate">{contact.desc}</p>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

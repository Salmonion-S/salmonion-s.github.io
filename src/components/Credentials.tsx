/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScrollReveal } from "./ScrollReveal";
import { Award, ShieldCheck, Calendar, MapPin, Building, GraduationCap, Clock } from "lucide-react";

export function Credentials() {
  // Certification: BNSP Junior Technical Support
  const certIssueDate = new Date("2025-11-17");
  const certExpiryDate = new Date("2028-11-17");
  const isCertActive = new Date() < certExpiryDate;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="credentials" className="py-24 relative overflow-hidden md:px-6">
      {/* Dynamic VisionOS blur spots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-[400px] rounded-full bg-gradient-to-br from-indigo-500/5 via-transparent to-pink-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading with high-contrast subtitles */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/15 rounded-full text-xs font-mono font-bold tracking-widest text-purple-400 uppercase mb-4">
            <Award className="w-3.5 h-3.5 animate-pulse" />
            <span>CREDENTIALS</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Certifications & <span className="text-gradient-primary">Achievements</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto rounded-full" />
        </ScrollReveal>

        {/* Proportional Grid layout (Golden Ratio balance side-by-side) */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Professional Certifications Panel */}
          <ScrollReveal delay={0.1}>
            <div className="liquid-glass-card rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden group border border-white/8">
              {/* Internal Specluar Reflection Glass Overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-550 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-sky-500/10 border border-sky-500/15 rounded-2xl">
                      <ShieldCheck className="w-6 h-6 text-sky-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white tracking-tight">Professional Certifications</h3>
                      <p className="text-xs text-slate-400 font-mono">STANDARDIZED ASSESSMENT</p>
                    </div>
                  </div>

                  {/* Automatic dynamic status badge */}
                  <span
                    className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border tracking-widest uppercase ${
                      isCertActive
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}
                  >
                    {isCertActive ? "Active" : "Expired"}
                  </span>
                </div>

                <div className="space-y-6 text-left">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                      CERTIFICATION NAME
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-sky-305 transition-colors">
                      BNSP Junior Technical Support
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                        CERTIFICATION BODY
                      </span>
                      <div className="flex items-center space-x-1.5 text-sm font-semibold text-slate-200">
                        <Building className="w-4 h-4 text-purple-400/80 shrink-0" />
                        <span className="truncate">BNSP</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                        FIELD
                      </span>
                      <div className="flex items-center space-x-1.5 text-sm font-semibold text-slate-200">
                        <GraduationCap className="w-4 h-4 text-sky-450 shrink-0" />
                        <span className="truncate">Computer Network</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                        ISSUE DATE
                      </span>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{formatDate(certIssueDate)}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                        VALID UNTIL
                      </span>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{formatDate(certExpiryDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-[10px] text-slate-450 font-mono flex items-center space-x-2 border-t border-white/5 pt-4">
                <span className="inline-block w-2.5 h-2.5 bg-sky-400 rounded-full animate-pulse" />
                <span>VERIFIED BY BADAN NASIONAL SERTIFIKASI PROFESI</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Achievements Panel */}
          <ScrollReveal delay={0.25}>
            <div className="liquid-glass-card rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden group border border-white/8">
              {/* Internal Specluar Reflection Glass Overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-550 pointer-events-none" />

              <div>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/15 rounded-2xl">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white tracking-tight">Academic Achievements</h3>
                    <p className="text-xs text-slate-400 font-mono">ACADEMIC HONORS</p>
                  </div>
                </div>

                <div className="space-y-6 text-left">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                      ACHIEVEMENT TITLE
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-purple-305 transition-colors">
                      Outstanding Student
                    </h4>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                      AWARD DESCRIPTION
                    </span>
                    <p className="text-sm text-slate-305 leading-relaxed font-light">
                      Outstanding Student Award — recognizing exceptional performance and consistency.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                        GRADE & MAJOR
                      </span>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-305 font-mono">
                        <GraduationCap className="w-4 h-4 text-sky-450 shrink-0" />
                        <span className="truncate">Grade 12 — TJKT</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                        ACADEMIC YEAR
                      </span>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-305 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>2023–2026</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
                      INSTITUTION
                    </span>
                    <div className="flex items-center space-x-1.5 text-sm font-semibold text-slate-200">
                      <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>SMK Negeri 4 Bandar Lampung</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-[10px] text-slate-450 font-mono flex items-center space-x-2 border-t border-white/5 pt-4">
                <span className="inline-block w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse" />
                <span>ACADEMIC EXCELLENCE RECOGNITION</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}

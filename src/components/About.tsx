/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { User, Calendar, MapPin, GraduationCap, ChevronRight } from "lucide-react";
import { calculateAge } from "../utils/age";

export function About() {
  const age = calculateAge();
  
  const quickFacts = [
    { label: "Name", value: "Salmon", icon: User, color: "text-sky-400" },
    { label: "Age", value: `${age} Years Old`, icon: Calendar, color: "text-purple-400" },
    { label: "Location", value: "Bandar Lampung, Indonesia", icon: MapPin, color: "text-pink-400" },
    { label: "Academy", value: "Universitas Lampung", icon: GraduationCap, color: "text-sky-400" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden md:px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            About <span className="text-gradient-primary">Me</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto rounded-full" />
        </ScrollReveal>

        {/* Bento Grid Split: 1.618 Proportions (approx 3/5 to 2/5 split) */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Main Story Panel (Three-fifths width) */}
          <ScrollReveal className="lg:col-span-3 flex" delay={0.1}>
            <div className="liquid-glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between w-full h-full relative overflow-hidden group">
              {/* Internal Specluar Reflection Glass Overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/3 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

              <div>
                <span className="text-xs font-bold text-sky-450 tracking-widest uppercase mb-4 block">
                  Aspirations & Background
                </span>
                <p className="text-lg text-slate-300 leading-relaxed font-light mb-6">
                  I am a tech-curious designer and developer who loves figuring out how digital systems connect and work under the hood. Building on a background in{" "}
                  <strong className="text-white font-medium">
                    Computer and Network Engineering
                  </strong>{" "}
                  and real-world experience during my internship at{" "}
                  <strong className="text-white font-medium">Fibernet</strong>, I am now an Informatics Management student at{" "}
                  <strong className="text-white font-medium">Universitas Lampung</strong>.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  For me, technology is all about finding elegant ways to simplify problems. Whether it's optimizing router configurations or coding clean, performant interfaces, I enjoy learning what goes on behind the scenes to make things run faster and more efficiently.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center text-sm font-medium text-sky-400">
                <span>Passionate to learn, thrive on challenge, and grow</span>
                <ChevronRight className="w-4 h-4 ml-1.5 animate-pulse" />
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Facts Panel (Two-fifths width) */}
          <ScrollReveal className="lg:col-span-2 flex" delay={0.25}>
            <div className="liquid-glass-card rounded-3xl p-8 sm:p-10 w-full h-full flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
                  Quick Facts
                </h3>

                <StaggerContainer className="space-y-4.5">
                  {quickFacts.map((fact, index) => {
                    const FactIcon = fact.icon;
                    return (
                      <StaggerItem
                        key={index}
                        className="flex items-center space-x-4 p-3 bg-white/3 border border-white/5 hover:border-white/10 hover:bg-white/5 rounded-2xl transition-all duration-300 group/fact"
                      >
                        <div className={`p-3 bg-slate-900/40 rounded-xl border border-white/10 group-hover/fact:scale-105 transition-transform duration-300`}>
                          <FactIcon className={`w-5 h-5 ${fact.color}`} />
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 block tracking-wider font-mono">
                            {fact.label.toUpperCase()}
                          </span>
                          <span className="text-base font-semibold text-slate-200">
                            {fact.value}
                          </span>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>

              <div className="mt-8 text-xs text-slate-400 font-mono flex items-center space-x-2">
                <span className="inline-block w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                <span>INFORMATICS MANAGEMENT UNDERGRADUATE</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

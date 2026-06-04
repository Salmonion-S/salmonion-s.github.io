/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import {
  Settings,
  Spline,
  Network,
  Shield,
  Gauge,
  Wrench,
  Hash,
  Server,
  Workflow,
} from "lucide-react";

export function Skills() {
  const skillsList = [
    {
      name: "Mikrotik Configuration",
      icon: Settings,
      desc: "VLAN routing, bridge setup, and advanced system diagnostics.",
      color: "from-sky-400 to-indigo-500 hover:shadow-sky-500/15",
    },
    {
      name: "Fiber Optic Splicing",
      icon: Spline,
      desc: "Fusion splicing, fiber termination, and optic physical layer troubleshooting.",
      color: "from-purple-400 to-pink-500 hover:shadow-purple-500/15",
    },
    {
      name: "ONT/OLT Setup",
      icon: Network,
      desc: "FTTH optical access configurations, GPON networks, and user terminal activation.",
      color: "from-pink-400 to-rose-500 hover:shadow-pink-500/15",
    },
    {
      name: "Firewall & Security",
      icon: Shield,
      desc: "Layer 7 filters, security rules, connection tracker, and threat shields.",
      color: "from-sky-450 to-blue-600 hover:shadow-sky-500/15",
    },
    {
      name: "Bandwidth Management",
      icon: Gauge,
      desc: "Simple Queues, Queue Tree, PCQ configurations, and bandwidth prioritization.",
      color: "from-purple-500 to-indigo-600 hover:shadow-purple-500/15",
    },
    {
      name: "Network Troubleshooting",
      icon: Wrench,
      desc: "Diagnosing routing bottlenecks, packet loss investigation, and cabling issues.",
      color: "from-pink-500 to-purple-600 hover:shadow-pink-500/15",
    },
    {
      name: "IP Subnetting & DHCP",
      icon: Hash,
      desc: "Hierarchical CIDR address design, static leases, and dynamic range mapping.",
      color: "from-sky-400 to-teal-500 hover:shadow-sky-500/15",
    },
    {
      name: "System Installation",
      icon: Server,
      desc: "Hosting Linux/Windows nodes, file servers, network services, and virtualization.",
      color: "from-blue-400 to-sky-600 hover:shadow-blue-500/15",
    },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden md:px-6">
      {/* Visual glowing mesh behind cards */}
      <div className="absolute top-1/3 right-1/10 w-96 h-96 rounded-full bg-sky-500/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/10 w-96 h-96 rounded-full bg-pink-500/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Technical <span className="text-gradient-primary">Expertise</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-slate-400 font-light font-sans text-base sm:text-lg">
            A comprehensive overview of my networking capabilities, from hardware configurations to physical fibers.
          </p>
        </ScrollReveal>

        {/* Dynamic Header highlights */}
        <ScrollReveal className="mb-12">
          <div className="liquid-glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-sky-500/5 hover:-translate-y-0.5">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-sky-400/20 to-purple-500/20 border border-white/10 rounded-2xl">
                <Workflow className="w-6 h-6 text-sky-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Core Highlights</h3>
                <p className="text-sm text-slate-400">
                  Combining advanced network troubleshooting with optical splicings to deliver solid ISP infrastructures.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider font-mono px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-305">
              <span>FIBER OPTIC & MIKROTIK READY</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Grid of details */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6.5">
          {skillsList.map((skill, index) => {
            const SkillIcon = skill.icon;
            return (
              <StaggerItem key={index}>
                <div className={`liquid-glass-card h-full rounded-2xl p-6.5 flex flex-col justify-between group cursor-pointer relative shadow-lg ${skill.color}`}>
                  <div>
                    {/* Top left corner shine highlight */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-white/2 rounded-br-3xl pointer-events-none" />

                    <div className="mb-5 w-12 h-12 bg-slate-950/40 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-300">
                      <SkillIcon className="w-6 h-6 text-sky-400 group-hover:text-pink-400 transition-colors" />
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                      {skill.name}
                    </h4>

                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-sky-450 transition-colors">
                    <span className="font-mono">SYS_LVL_.0{index + 1}</span>
                    <span>Verified</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

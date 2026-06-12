import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Instagram, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- UTILITAS LOKAL ---
// PRIORITAS NOMOR 1: Tanggal lahir diubah ke 30 Mei 2008 agar kalkulasi umur akurat (18 tahun)
const myBirthday = "2008-05-30";

function calculateAge(birthdayStr: string): number {
  const birthDate = new Date(birthdayStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// --- KOMPONEN LOKAL: NeonGlassCard ---
interface NeonGlassCardProps {
  children: React.ReactNode;
  className?: string;
}

function NeonGlassCard({ children, className = '' }: NeonGlassCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:border-white/20 ${className}`}>
      {children}
    </div>
  );
}

// --- KOMPONEN LOKAL: Reveal ---
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

function Reveal({ children, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const age = calculateAge(myBirthday);

  // Nilai efek Parallax & Opacity Dinamis sesuai Scroll untuk nuansa sinematik
  const yHeroBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yHeroGlow = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Rei perlahan memudar lebih cepat (sudah menghilang total di scroll progress 0.6)
  const heroImageOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6],
    [0.8, 0.4, 0.1, 0]
  );

  return (
    <div className="relative bg-black min-h-dvh font-sans text-gray-200 overflow-x-hidden">

      {/* --- HERO SECTION (Ketinggian disesuaikan agar transisinya lebih rapat & natural) --- */}
      <section 
        ref={containerRef} 
        className="relative min-h-[140vh] flex items-start justify-center overflow-hidden pt-[25vh] md:pt-[30vh]"
      >
        {/* Background Layer: Ilustrasi Utama Rei dengan Opacity Scroll Dinamis */}
        <motion.div 
          style={{ y: yHeroBg }} 
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.img
              src="https://i.ibb.co.com/0pksLrSK/IMG-SEGMENT-20260611-221132.png"
              alt="Hero Artwork"
              style={{ opacity: heroImageOpacity }}
              className="h-[120%] w-auto object-contain blur-[0.5px]"
            />
          </div>

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_60%)]" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black" />
        </motion.div>

        {/* Middle Layer: Efek Atmosferik Glow Neon */}
        <motion.div 
          style={{ y: yHeroGlow }}
          className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center"
        >
           <div className="w-[80vw] max-w-[800px] h-[400px] bg-neon-purple/15 rounded-[100%] blur-[120px]" />
           <div className="absolute bottom-0 w-full h-[300px] bg-noir-900/80 blur-[80px]" />
        </motion.div>

        {/* Foreground Layer: Konten Utama Hero */}
        <motion.div 
          style={{ opacity: opacityHeroText }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-sans font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-2xl">
              SALMON
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="font-mono text-neon-cyan/80 uppercase tracking-[0.3em] text-xs sm:text-sm mb-12"
          >
            Digital Identity // System Active
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="max-w-md mx-auto"
          >
            <p className="font-serif italic text-xl sm:text-2xl text-gray-400 leading-relaxed text-glow">
              "The less I expect,<br/>the less the world can disappoint me."
            </p>
          </motion.div>
        </motion.div>

        {/* Indikator Gulir Halaman */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <div className="w-[1px] h-16 relative overflow-hidden bg-white/10">
            <motion.div 
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-full h-1/2 bg-neon-purple absolute top-0"
            />
          </div>
        </motion.div>
      </section>

      {/* --- CONTENT DOMAIN --- */}
      <div className="relative z-10 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-32">
          
          {/* Hero Fade Zone: Jeda yang dipersempit agar tidak menyisakan ruang kosong berlebih */}
          <div className="h-[15vh]" />

          {/* PROFILE SECTION */}
          <section id="about" className="scroll-mt-32">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-neon-purple/50 flex-grow" />
                <h2 className="font-mono text-xs tracking-widest uppercase text-neon-purple text-glow">01 // Profile</h2>
                <div className="h-[4px] w-[4px] bg-neon-purple rounded-full" />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <NeonGlassCard className="bg-black/30 backdrop-blur-xl text-gray-300 leading-relaxed font-sans text-base sm:text-lg space-y-6">
                <p>
                  Mahasiswa Manajemen Informatika di Universitas Lampung.
                </p>
                <p>
                  Memiliki latar belakang pendidikan Teknik Komputer dan Jaringan, serta pengalaman praktis di industri melalui program magang di Fibernet.
                </p>
                <div className="pt-4 mt-4 border-t border-white/5 flex gap-4 font-mono text-xs text-gray-500 uppercase">
                  <span>AGE: {age}</span>
                  <span>LOC: ID</span>
                </div>
              </NeonGlassCard>
            </Reveal>
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section id="certifications" className="scroll-mt-32">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[4px] w-[4px] bg-neon-cyan rounded-full" />
                <h2 className="font-mono text-xs tracking-widest uppercase text-neon-cyan text-glow-cyan">02 // Certifications</h2>
                <div className="h-px bg-neon-cyan/30 flex-grow" />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-4">
                <CertificationItem 
                  title="Junior Technical Support"
                  issuer="Badan Nasional Sertifikasi Profesi (BNSP)"
                  field="Computer Network"
                  issued="2025-11-17"
                  expires="2028-11-17"
                />
              </div>
            </Reveal>
          </section>

          {/* ACHIEVEMENTS SECTION */}
          <section id="achievements" className="scroll-mt-32">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-neon-pink/50 flex-grow" />
                <h2 className="font-mono text-xs tracking-widest uppercase text-neon-pink text-shadow-[0_0_10px_rgba(255,153,214,0.5)]">03 // Achievements</h2>
                <div className="h-[4px] w-[4px] bg-neon-pink rounded-full" />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <NeonGlassCard className="bg-black/30 backdrop-blur-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 border border-white rounded-full" />
                  </div>
                </div>
                <div className="relative z-10 space-y-2">
                  <h3 className="font-sans font-medium text-white text-xl">Outstanding Student Award</h3>
                  <div className="font-mono text-xs text-neon-pink mt-1 mb-4 opacity-80">SMK Negeri 4 Bandar Lampung</div>
                  <p className="text-sm text-gray-400">Teknik Komputer dan Jaringan (Kelas 12)</p>
                  <p className="text-xs text-gray-500 font-mono mt-4">ACADEMIC YEAR // 2023–2026</p>
                </div>
              </NeonGlassCard>
            </Reveal>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="scroll-mt-32">
             <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[4px] w-[4px] bg-white rounded-full" />
                <h2 className="font-mono text-xs tracking-widest uppercase text-white">04 // Comm_Link</h2>
                <div className="h-px bg-white/20 flex-grow" />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ContactBox 
                  href="https://signal.me/#eu/xrAU0_L6xdwg5QMsaoTffXIo5ebqcUouVjCmNKJrcBamxRNRlbJLfZdwvrwfU4r2"
                  icon={<MessageSquare className="w-6 h-6" />}
                  label="Signal"
                  colorClass="hover:border-sky-400/50 hover:bg-sky-400/10 text-sky-400"
                />
                <ContactBox 
                  href="https://instagram.com/wichi_ns"
                  icon={<Instagram className="w-6 h-6" />}
                  label="Instagram"
                  colorClass="hover:border-neon-magenta/50 hover:bg-neon-magenta/10 text-neon-magenta"
                />
                <ContactBox 
                  href="mailto:key_sionin@protonmail.com"
                  icon={<Mail className="w-6 h-6" />}
                  label="Proton Mail"
                  colorClass="hover:border-neon-purple/50 hover:bg-neon-purple/10 text-neon-purple"
                />
              </div>
            </Reveal>
            
            <Reveal delay={0.4}>
              <div className="mt-12 text-center">
                <Link to="/nfc" className="inline-flex items-center gap-2 font-mono text-xs hover:text-white text-gray-500 transition-colors py-4 px-6 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 focus-ring">
                  <span>IDENTITY NFC MODULE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </section>

        </div>
      </div>
    </div>
  );
}

// Sub-komponen Sertifikasi
function CertificationItem({ title, issuer, field, issued, expires }: { title: string, issuer: string, field: string, issued: string, expires: string }) {
  const isExpired = new Date() > new Date(expires);

  return (
    <NeonGlassCard className="bg-black/30 backdrop-blur-xl relative group">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan/50 to-transparent rounded-l-2xl" />
      <div className="pl-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
             <h3 className="font-sans font-medium text-white text-lg sm:text-xl tracking-tight">{title}</h3>
             <p className="text-gray-400 text-sm mt-1">{issuer}</p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isExpired ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]'}`} />
            <span className="font-mono text-xs uppercase tracking-wider text-gray-300">
              {isExpired ? 'Expired' : 'Active'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mt-6 border-t border-white/5 pt-4">
          <div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Bidang Keahlian</div>
            <div className="text-sm text-gray-300">{field}</div>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-12">
            <div>
              <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Diterbitkan</div>
              <div className="text-sm text-gray-300 font-mono">{issued}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Kedaluwarsa</div>
              <div className="text-sm text-gray-300 font-mono">{expires}</div>
            </div>
          </div>
        </div>
      </div>
    </NeonGlassCard>
  );
}

// Sub-komponen Tautan Kontak
function ContactBox({ href, icon, label, colorClass }: { href: string, icon: React.ReactNode, label: string, colorClass: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center p-8 gap-4 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/5 transition-all duration-300 group focus-ring ${colorClass}`}
    >
      <div className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <span className="font-sans font-medium tracking-wide text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </a>
  );
}

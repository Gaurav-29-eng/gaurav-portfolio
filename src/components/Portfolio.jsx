import { motion, useScroll, useAnimation } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaCode, FaGlobe, FaTools, FaExternalLinkAlt } from "react-icons/fa";
import emailjs from "emailjs-com";
import { useEffect, useRef, useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import CursorTrail from "./CursorTrail";
import profileImage from "../assets/profile.jpeg";

// Fix: some eslint configs ignore JSX member-usage; this keeps `motion` marked as used.
void motion;

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const bgRef = useRef(null);
  
  // Mouse tracking for 3D effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth mouse movement with easing
  useEffect(() => {
    let animationId;
    const animate = () => {
      setSmoothMouse(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.08,
        y: prev.y + (mousePosition.y - prev.y) * 0.08,
      }));
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mousePosition]);

  // Scroll listener for navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading state management
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_05a6xou",
      "template_ggfah39",
      e.target,
      "9y69GuMyzXGbvOy-E"
    ).then(
      () => alert("Message sent successfully 🚀"),
      () => alert("Failed to send message ❌")
    );

    e.target.reset();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#050816] flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <div className="relative w-16 h-16 mx-auto mb-4">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-emerald-400/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-80" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-emerald-300 text-sm font-medium tracking-wide"
          >
            Loading Portfolio
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative bg-[#050816] text-white min-h-screen overflow-hidden"
    >
      <AnimatedBackground />
      <CursorTrail />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col"
      >
      {/* NAVBAR - Premium Apple-Style Glass Design */}
      <nav className={`fixed left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl transition-all duration-500 ease-out ${isScrolled ? 'top-2' : 'top-4'}`}>
        <div 
          className={`flex items-center justify-between px-4 md:px-6 rounded-full
                     bg-slate-950/40 border border-white/[0.08]
                     shadow-[0_8px_32px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.05)_inset]
                     transition-all duration-500 ease-out
                     ${isScrolled ? 'py-2 backdrop-blur-2xl bg-slate-950/60' : 'py-2 md:py-3 backdrop-blur-xl'}`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5 md:gap-2 group">
            <span className={`font-semibold tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors duration-300 text-sm md:text-base ${isScrolled ? 'md:text-base' : 'md:text-lg'}`}>
              Gaurav
            </span>
            <span className={`text-slate-500 transition-all duration-500 text-xs ${isScrolled ? 'md:text-xs' : 'md:text-sm'}`}>.dev</span>
          </a>

          {/* Center Navigation - Desktop Only */}
          <div className="hidden md:flex items-center gap-1">
            <a 
              href="#projects" 
              className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-100 
                         transition-all duration-300 ease-in-out rounded-full
                         hover:bg-white/[0.06]"
            >
              Projects
            </a>
            <a 
              href="#about" 
              className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-100 
                         transition-all duration-300 ease-in-out rounded-full
                         hover:bg-white/[0.06]"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-100 
                         transition-all duration-300 ease-in-out rounded-full
                         hover:bg-white/[0.06]"
            >
              Contact
            </a>
          </div>

          {/* Right Side - Resume Button & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Resume CTA - Premium Pill Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              download
              className="relative group px-3 md:px-5 py-1.5 md:py-2 rounded-full
                         bg-gradient-to-r from-cyan-500/20 to-blue-500/20
                         border border-cyan-400/30
                         text-xs md:text-sm font-medium text-cyan-300
                         transition-all duration-300 ease-in-out
                         hover:scale-105 hover:border-cyan-400/60
                         hover:shadow-[0_0_20px_rgba(6,182,212,0.4),0_0_40px_rgba(6,182,212,0.2)]
                         hover:text-white
                         active:scale-95"
            >
              <span className="relative z-10 hidden sm:inline">Resume</span>
              <span className="relative z-10 sm:hidden">CV</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-cyan-300 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-2 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            <div className="flex flex-col p-2">
              <a
                href="#projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-white/[0.06] rounded-xl transition-all duration-300"
              >
                Projects
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-white/[0.06] rounded-xl transition-all duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-white/[0.06] rounded-xl transition-all duration-300"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* HERO - Vision Pro Style Glass Card with Parallax Depth */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16" style={{ perspective: '1000px' }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl mx-auto"
        >
          {/* Main Glass Card Container - Primary Tilt Layer */}
          <div 
            className="relative rounded-3xl p-[1px] bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-violet-500/30 shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
            style={{
              transform: `rotateY(${smoothMouse.x * 3}deg) rotateX(${-smoothMouse.y * 3}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Inner Glass Surface */}
            <div className="relative rounded-3xl bg-slate-950/60 backdrop-blur-2xl overflow-hidden">
              {/* Ambient Glow - Background Layer (slow parallax) */}
              <div 
                className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"
                style={{
                  transform: `translate(${smoothMouse.x * -15}px, ${smoothMouse.y * -15}px)`,
                  transition: 'transform 0.3s ease-out',
                }}
              />
              <div 
                className="absolute -bottom-32 -left-32 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px]"
                style={{
                  transform: `translate(${smoothMouse.x * -20}px, ${smoothMouse.y * -20}px)`,
                  transition: 'transform 0.3s ease-out',
                }}
              />
              
              <div 
                className="relative px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center gap-8 md:gap-12"
                style={{
                  transform: `translateZ(20px) rotateY(${smoothMouse.x * 1}deg) rotateX(${-smoothMouse.y * 1}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.15s ease-out',
                }}
              >
                
                {/* Text Content - Mid Layer */}
                <div 
                  className="flex-1 text-center md:text-left space-y-5"
                  style={{
                    transform: `translateZ(40px) translateX(${smoothMouse.x * -8}px)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.9, x: 0, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 font-medium"
                  >
                    Hi, I'm <span className="text-cyan-300 font-semibold">Gaurav</span>
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-2xl sm:text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 via-violet-500 to-cyan-400"
                    style={{ backgroundSize: '200% auto', animation: 'gradient-shift 8s ease infinite' }}
                  >
                    I build interactive, real-time web experiences.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-base md:text-lg text-slate-300/90 font-medium"
                  >
                    Frontend Developer focused on performance, UI and modern web apps.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-sm text-slate-400/80 max-w-md"
                  >
                    Currently building a real-time IPL Auction platform with multiplayer features.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-4"
                  >
                    <a
                      href="#projects"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-6 py-3 text-sm font-semibold shadow-[0_4px_20px_rgba(6,182,212,0.4)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.6)] active:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 w-full sm:w-auto"
                    >
                      View Projects
                    </a>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-200 hover:bg-white/[0.08] hover:border-cyan-400/50 hover:text-cyan-300 active:bg-white/[0.12] active:border-cyan-400/70 active:text-cyan-300 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 w-full sm:w-auto"
                    >
                      Download CV
                    </a>
                  </motion.div>
                </div>

                {/* Profile Image - Foreground Layer (fast parallax) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    opacity: { delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    scale: { delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    y: { delay: 1.5, duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative flex-shrink-0 group mx-auto"
                  style={{
                    transform: `translateZ(80px) translateX(${smoothMouse.x * 12}px) translateY(${smoothMouse.y * 8}px) rotateY(${smoothMouse.x * 4}deg) rotateX(${-smoothMouse.y * 4}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.1s ease-out',
                  }}
                >
                  {/* Outer Glow Ring - moves with parallax */}
                  <div 
                    className="absolute -inset-3 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-violet-500/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    style={{
                      transform: `translateZ(-20px) scale(${1 + smoothMouse.y * 0.02})`,
                      transition: 'transform 0.2s ease-out, opacity 0.5s',
                    }}
                  />
                  
                  {/* Gradient Border Ring */}
                  <div className="relative w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_8px_30px_rgba(6,182,212,0.3)] group-hover:shadow-[0_12px_40px_rgba(6,182,212,0.5)] transition-shadow duration-500">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-950 bg-slate-900">
                      <img
                        src={profileImage}
                        alt="Gaurav"
                        className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-500 ease-out"
                        style={{ objectPosition: '50% 20%' }}
                      />
                    </div>
                  </div>
                  
                  {/* Floating Ring Animation */}
                  <motion.div
                    className="absolute -inset-4 rounded-full border border-cyan-400/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Background Watermark - Deep Background (very slow parallax) */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.04, y: [0, -6, 0] }}
          transition={{ delay: 0.8, duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-4 md:right-8 bottom-8 text-[60px] md:text-[80px] lg:text-[100px] font-black tracking-[0.15em] text-cyan-400/20 select-none"
          style={{
            transform: `translate(${smoothMouse.x * -25}px, ${smoothMouse.y * -10}px)`,
            transition: 'transform 0.4s ease-out',
          }}
        >
          <span className="inline-block transition-all duration-500 ease-out hover:scale-105 hover:text-cyan-400/30 hover:drop-shadow-[0_0_30px_rgba(34,211,238,0.5)] cursor-default">GAURAV</span>
        </motion.h1>
      </section>

      {/* WHY HIRE ME */}
      <motion.section 
        id="why-hire-me"
        className="px-4 sm:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:tracking-wide cursor-default group"
        >
          <span className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">Why Hire Me</span>
          <span className="text-cyan-400 inline-block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-slate-950/30 border border-white/[0.06] hover:border-cyan-400/30 backdrop-blur-md p-4 md:p-5 flex flex-col gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] transition-all duration-300 ease-in-out hover:-translate-y-1"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-cyan-300 text-sm md:text-base font-semibold">
              <span className="text-lg md:text-xl">🚀</span>
              Real Front-End Projects
            </div>
            <div className="bg-slate-950/20 border border-white/[0.04] rounded-xl p-2.5 md:p-3">
              <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed">
                Built modern, responsive applications with focus on user experience, interactive interfaces, and clean design patterns.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-slate-950/30 border border-white/[0.06] hover:border-blue-400/30 backdrop-blur-md p-4 md:p-5 flex flex-col gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-300 ease-in-out hover:-translate-y-1"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-blue-300 text-sm md:text-base font-semibold">
              <span className="text-lg md:text-xl">💡</span>
              Strong Front-End Fundamentals
            </div>
            <div className="bg-slate-950/20 border border-white/[0.04] rounded-xl p-2.5 md:p-3">
              <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed">
                Solid understanding of JavaScript, React patterns, CSS architecture, and modern front-end best practices.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-slate-950/30 border border-white/[0.06] hover:border-indigo-400/30 backdrop-blur-md p-4 md:p-5 flex flex-col gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-all duration-300 ease-in-out hover:-translate-y-1"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-indigo-300 text-sm md:text-base font-semibold">
              <span className="text-lg md:text-xl">🎨</span>
              Clean UI/UX
            </div>
            <div className="bg-slate-950/20 border border-white/[0.04] rounded-xl p-2.5 md:p-3">
              <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed">
                Focus on modern, responsive, and user-friendly design with smooth animations and interactions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-slate-950/30 border border-white/[0.06] hover:border-violet-400/30 backdrop-blur-md p-4 md:p-5 flex flex-col gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-all duration-300 ease-in-out hover:-translate-y-1"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-violet-300 text-sm md:text-base font-semibold">
              <span className="text-lg md:text-xl">📈</span>
              Fast Learner
            </div>
            <div className="bg-slate-950/20 border border-white/[0.04] rounded-xl p-2.5 md:p-3">
              <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed">
                Continuously improving and adapting to new technologies with a growth mindset approach.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ABOUT */}
      <motion.section 
        id="about" 
        className="px-4 sm:px-8 py-20 md:py-28 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl mb-6 md:mb-10 font-semibold tracking-tight transition-all duration-300 ease-in-out hover:scale-[1.02] hover:tracking-wide cursor-default group"
        >
          <span className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">About</span>
          <span className="text-cyan-400 inline-block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-slate-300/90 text-base md:text-lg mb-6 max-w-2xl"
        >
          I specialize in building modern web applications with clean interfaces and smooth interactions.
        </motion.p>

        <ul className="space-y-3 text-slate-300/90 text-base md:text-lg max-w-2xl">
          {[
            { text: 'Pune, India', isBold: true },
            { text: 'B.E Computer Science (SPPU)', isBold: true },
            { text: 'Frontend Developer (React)', isBold: true },
            { text: 'Building real-time apps like ', highlight: 'IPL Auction system', hasHighlight: true },
            { text: 'Open to internships and opportunities', isCyan: true }
          ].map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + (index * 0.08), ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="text-cyan-400 mt-1.5">•</span>
              <span>
                {item.isBold ? (
                  <strong className="text-slate-100">{item.text}</strong>
                ) : item.hasHighlight ? (
                  <>
                    {item.text}<strong className="text-cyan-300">{item.highlight}</strong>
                  </>
                ) : item.isCyan ? (
                  <span className="text-cyan-400 font-medium">{item.text}</span>
                ) : (
                  item.text
                )}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* TECH STACK */}
      <motion.section
        id="skills"
        className="px-4 sm:px-8 py-16 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:tracking-wide cursor-default group"
        >
          <span className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">Tech Stack</span>
          <span className="text-cyan-400 inline-block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 max-w-4xl mx-auto">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-slate-950/30 border border-white/[0.06] hover:border-cyan-400/30 backdrop-blur-md p-4 md:p-5 flex flex-col gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] transition-all duration-300 ease-in-out hover:-translate-y-1"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-cyan-300 text-sm md:text-base font-semibold">
              <FaCode className="text-cyan-300/90 w-4 h-4 md:w-5 md:h-5" />
              Languages
            </div>
            <div className="bg-slate-950/20 border border-white/[0.04] rounded-xl p-2.5 md:p-3">
              <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed">
                Python • JavaScript • C • C++ • C#
              </p>
            </div>
          </motion.div>

          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-slate-950/30 border border-white/[0.06] hover:border-blue-400/30 backdrop-blur-md p-4 md:p-5 flex flex-col gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-300 ease-in-out hover:-translate-y-1"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-blue-300 text-sm md:text-base font-semibold">
              <FaGlobe className="text-blue-300/90 w-4 h-4 md:w-5 md:h-5" />
              Frontend
            </div>
            <div className="bg-slate-950/20 border border-white/[0.04] rounded-xl p-2.5 md:p-3">
              <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed">
                React.js • HTML5 • CSS3 • Tailwind CSS • JavaScript ES6+
              </p>
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-slate-950/30 border border-white/[0.06] hover:border-indigo-400/30 backdrop-blur-md p-4 md:p-5 flex flex-col gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-all duration-300 ease-in-out hover:-translate-y-1"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-indigo-300 text-sm md:text-base font-semibold">
              <FaTools className="text-indigo-300/90 w-4 h-4 md:w-5 md:h-5" />
              Tools
            </div>
            <div className="bg-slate-950/20 border border-white/[0.04] rounded-xl p-2.5 md:p-3">
              <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed">
                Git • GitHub • VS Code • Vercel • Framer Motion
              </p>
            </div>
          </motion.div>

          {/* Core Concepts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-slate-950/30 border border-white/[0.06] hover:border-violet-400/30 backdrop-blur-md p-4 md:p-5 flex flex-col gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-all duration-300 ease-in-out hover:-translate-y-1"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-violet-300 text-sm md:text-base font-semibold">
              <span className="inline-block h-2 w-2 rounded-full bg-violet-300/90 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
              Core Concepts
            </div>
            <div className="bg-slate-950/20 border border-white/[0.04] rounded-xl p-2.5 md:p-3">
              <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed">
                Data Structures & Algorithms • UI/UX Design • Responsive Design
              </p>
            </div>
          </motion.div>
        </div>

      </motion.section>
      <motion.section
        id="experience"
        className="px-4 sm:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl mb-8 md:mb-12 font-semibold tracking-tight transition-all duration-300 ease-in-out hover:scale-[1.02] hover:tracking-wide cursor-default group"
        >
          <span className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">Learning & Growth</span>
          <span className="text-cyan-400 inline-block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="rounded-2xl md:rounded-2xl bg-slate-950/30 md:bg-slate-950/40 border border-white/[0.06] md:border-white/[0.08] hover:border-cyan-400/30 backdrop-blur-xl md:backdrop-blur-xl p-6 md:p-8 text-slate-200 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)] md:hover:shadow-[0_20px_60px_rgba(6,182,212,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02]"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <h3 className="text-cyan-300 text-base md:text-lg font-semibold mb-4" style={{ transform: 'translateZ(20px)' }}>🎓 Certifications</h3>
            <ul className="space-y-3 text-sm text-slate-200/90 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
              <li>• <strong>Python Programming</strong> - Udemy Certification</li>
              <li>• <strong>Data Structures & Algorithms</strong> - Continuous Practice</li>
              <li>• <strong>Web Development</strong> - Self-taught & Online Courses</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="rounded-2xl md:rounded-2xl bg-slate-950/30 md:bg-slate-950/40 border border-white/[0.06] md:border-white/[0.08] hover:border-blue-400/30 backdrop-blur-xl md:backdrop-blur-xl p-6 md:p-8 text-slate-200 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)] md:hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02]"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <h3 className="text-blue-300 text-base md:text-lg font-semibold mb-4" style={{ transform: 'translateZ(20px)' }}>📚 Continuous Learning</h3>
            <ul className="space-y-3 text-sm text-slate-200/90 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
              <li>• <strong>DSA Practice</strong> - Problem solving on LeetCode</li>
              <li>• <strong>Project Building</strong> - Real-world application development</li>
              <li>• <strong>Technology Exploration</strong> - Staying updated with modern tools</li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="mt-6 md:mt-8 rounded-2xl md:rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/[0.06] md:border-white/[0.08] hover:border-cyan-400/30 backdrop-blur-xl md:backdrop-blur-xl p-6 md:p-8 text-center cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)] md:hover:shadow-[0_20px_60px_rgba(6,182,212,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02]"
        >
          <p className="text-cyan-300 text-base md:text-lg font-semibold mb-3">🚀 Growth Mindset</p>
          <p className="text-slate-300/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Passionate about continuous improvement and adapting to new technologies. 
            Always seeking to expand my skill set and tackle challenging problems that push me to grow as a developer.
          </p>
        </motion.div>

      </motion.section>

      <motion.section
        id="projects"
        className="px-4 sm:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-2xl md:text-4xl mb-8 md:mb-12 font-semibold tracking-tight text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:tracking-wide cursor-default group">
          <span className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300 group-hover:letter-spacing-[1px]">Projects</span>
          <span className="text-cyan-400 inline-block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        </h2>

        <div className="flex flex-row md:grid md:grid-cols-2 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0">
          {/* IPL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 min-w-[85vw] md:min-w-0 md:w-auto snap-center bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border border-white/[0.06] md:border-white/[0.08] hover:border-cyan-400/30 cursor-pointer group relative overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)] md:hover:shadow-[0_20px_60px_rgba(6,182,212,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-2xl z-10 pointer-events-none" />
            
            {/* Project Image Preview */}
            <div className="relative h-44 md:h-48 bg-gradient-to-br from-slate-800 via-cyan-900/30 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl md:text-6xl">🏏</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 flex gap-2">
                <span className="px-2 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-300 text-xs rounded-full border border-amber-400/30">In Progress</span>
                <span className="px-2 py-1 bg-cyan-400/20 backdrop-blur-sm text-cyan-300 text-xs rounded-full border border-cyan-400/30">Real-Time</span>
              </div>
            </div>

            <div className="p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-slate-100 mb-2">Real-Time IPL Auction Simulator</h3>
              <p className="text-cyan-300/90 text-sm mb-4">Real-time IPL Auction simulation with bidding logic, team purse management and AI-based teams. Multiplayer mode currently under development.</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-800/80 text-slate-300 text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-slate-800/80 text-slate-300 text-xs rounded">Firebase</span>
                  <span className="px-2 py-1 bg-slate-800/80 text-slate-300 text-xs rounded">WebSocket</span>
                </div>
                
                <ul className="text-slate-400 text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span> Real-time bidding system
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span> Team purse management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span> Player dataset handling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span> AI-based team participation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">⏳</span> <span className="text-amber-300/80">Multiplayer mode (In Progress)</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://github.com/Gaurav-29-eng/ipl-auction"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 text-sm rounded-lg transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40 active:bg-slate-700/90 active:border-cyan-400/60 active:scale-95 w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a
                  href="https://ipl-auction-hazel.vercel.app/"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 hover:from-cyan-400/30 hover:to-blue-400/30 text-cyan-300 text-sm rounded-lg transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400/50 active:from-cyan-400/40 active:to-blue-400/40 active:border-cyan-400/70 active:scale-95 w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>

          {/* PORTFOLIO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 min-w-[85vw] md:min-w-0 md:w-auto snap-center bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border border-white/[0.06] md:border-white/[0.08] hover:border-blue-400/30 cursor-pointer group relative overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)] md:hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-2xl z-10 pointer-events-none" />
            
            {/* Project Image Preview */}
            <div className="relative h-44 md:h-48 bg-gradient-to-br from-slate-800 via-blue-900/30 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl md:text-6xl">💼</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 flex gap-2">
                <span className="px-2 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-300 text-xs rounded-full border border-blue-400/30">Portfolio</span>
              </div>
            </div>

            <div className="p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-slate-100 mb-2">Developer Portfolio</h3>
              <p className="text-blue-300/90 text-sm mb-4">Interactive portfolio with animations and modern UI</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-800/80 text-slate-300 text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-slate-800/80 text-slate-300 text-xs rounded">Tailwind</span>
                  <span className="px-2 py-1 bg-slate-800/80 text-slate-300 text-xs rounded">Framer Motion</span>
                </div>
                
                <ul className="text-slate-400 text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Scroll animations & transitions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Interactive project showcase
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Responsive design all devices
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://github.com/Gaurav-29-eng/gaurav-portfolio"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-blue-300 text-sm rounded-lg transition-all duration-300 border border-blue-400/20 hover:border-blue-400/40 active:bg-slate-700/90 active:border-blue-400/60 active:scale-95 w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a
                  href="https://gaurav-portfolio-roan.vercel.app/"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 hover:from-blue-400/30 hover:to-indigo-400/30 text-blue-300 text-sm rounded-lg transition-all duration-300 border border-blue-400/30 hover:border-blue-400/50 active:from-blue-400/40 active:to-indigo-400/40 active:border-blue-400/70 active:scale-95 w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </motion.section>

      {/* PROBLEM SOLVING */}
      <motion.section 
        className="px-4 sm:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-2xl md:text-4xl mb-8 md:mb-12 font-semibold tracking-tight text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:tracking-wide cursor-default group">
          <span className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">Problem Solving</span>
          <span className="text-cyan-400 inline-block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        </h2>

        <motion.div 
          className="max-w-3xl mx-auto bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border border-white/[0.06] md:border-white/[0.08] hover:border-cyan-400/30 backdrop-blur-xl p-6 md:p-10 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)] md:hover:shadow-[0_20px_60px_rgba(6,182,212,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02]"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <div className="space-y-4 md:space-y-5 text-slate-300" style={{ transform: 'translateZ(15px)' }}>
            <div className="flex items-start gap-3 md:gap-4">
              <span className="text-cyan-400 text-lg md:text-xl mt-0.5">•</span>
              <p className="text-sm md:text-base leading-relaxed">Practicing Data Structures & Algorithms regularly</p>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <span className="text-cyan-400 text-lg md:text-xl mt-0.5">•</span>
              <p className="text-sm md:text-base leading-relaxed">Strong in arrays, strings, and basic recursion</p>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <span className="text-cyan-400 text-lg md:text-xl mt-0.5">•</span>
              <p className="text-sm md:text-base leading-relaxed">Actively improving problem-solving skills</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* EDUCATION */}
      <motion.section 
        className="px-4 sm:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-2xl md:text-4xl mb-8 md:mb-12 font-semibold tracking-tight text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:tracking-wide cursor-default group">
          <span className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">Education</span>
          <span className="text-cyan-400 inline-block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        </h2>

        <motion.div 
          className="max-w-2xl mx-auto bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border border-white/[0.06] md:border-white/[0.08] hover:border-cyan-400/30 backdrop-blur-xl p-6 md:p-10 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)] md:hover:shadow-[0_20px_60px_rgba(6,182,212,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02]"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <div className="text-center" style={{ transform: 'translateZ(20px)' }}>
            <h3 className="text-lg md:text-2xl font-semibold text-slate-100 mb-3">B.E. Computer Science</h3>
            <p className="text-cyan-300 text-sm md:text-base mb-2">SPPU, Pune</p>
            <p className="text-slate-400 text-xs md:text-sm">3rd Year • Current</p>
          </div>
        </motion.div>
      </motion.section>

      {/* CONTACT */}
      <motion.section id="contact" className="px-4 sm:px-8 py-20 md:py-28 pb-24 md:pb-32 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 60 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}>

        <h2 className="text-2xl md:text-4xl mb-4 md:mb-6 text-center font-semibold tracking-tight transition-all duration-300 ease-in-out hover:scale-[1.02] hover:tracking-wide cursor-default group">
          <span className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">Let's Connect</span>
          <span className="text-cyan-400 inline-block transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        </h2>
        
        <p className="text-center text-slate-300/90 mb-8 md:mb-10 max-w-xl mx-auto text-sm md:text-lg leading-relaxed px-4">
          Open to internships and opportunities
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-6">
          <a
            href="mailto:gaurav@example.com"
            className="group inline-flex items-center justify-center gap-3 px-6 py-4 min-h-[52px] bg-slate-950/30 md:bg-slate-950/40 backdrop-blur-xl rounded-xl md:rounded-xl border border-white/[0.06] md:border-white/[0.08] hover:border-cyan-400/40 hover:bg-slate-950/50 active:bg-slate-950/60 active:border-cyan-400/60 active:scale-95 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full sm:w-auto"
          >
            <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-cyan-300 font-medium text-sm md:text-base">Email</span>
          </a>

          <a
            href="https://github.com/Gaurav-29-eng"
            target="_blank"
            className="group inline-flex items-center justify-center gap-3 px-6 py-4 min-h-[52px] bg-slate-950/30 md:bg-slate-950/40 backdrop-blur-xl rounded-xl md:rounded-xl border border-white/[0.06] md:border-white/[0.08] hover:border-cyan-400/40 hover:bg-slate-950/50 active:bg-slate-950/60 active:border-cyan-400/60 active:scale-95 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full sm:w-auto"
          >
            <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-cyan-300 font-medium text-sm md:text-base">GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/gaurav-salunke-cse27"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-6 py-4 min-h-[52px] bg-slate-950/30 md:bg-slate-950/40 backdrop-blur-xl rounded-xl md:rounded-xl border border-white/[0.06] md:border-white/[0.08] hover:border-cyan-400/40 hover:bg-slate-950/50 active:bg-slate-950/60 active:border-cyan-400/60 active:scale-95 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full sm:w-auto"
          >
            <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span className="text-cyan-300 font-medium text-sm md:text-base">LinkedIn</span>
          </a>
        </div>
      </motion.section>

      </motion.div>
    </motion.div>
  );
}
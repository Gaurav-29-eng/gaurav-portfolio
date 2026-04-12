import { motion, useScroll, useAnimation } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaCode, FaGlobe, FaTools, FaExternalLinkAlt } from "react-icons/fa";
import emailjs from "emailjs-com";
import { useEffect, useRef, useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import CursorTrail from "./CursorTrail";
import profileImage from "../assets/profile.jpeg";
import salesforceFlow from "../assets/salesforce-flow.png";
import salesforceDashboard from "../assets/salesforce - dashboard.png";

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

      {/* HERO - Premium Tech Startup Style */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16 relative overflow-hidden" style={{ perspective: '1000px' }}>
        {/* Floating Geometric Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1, y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ 
            opacity: { duration: 1.2, delay: 0.5 },
            scale: { duration: 1.2, delay: 0.5 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
            rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
          className="absolute top-20 right-[10%] w-20 h-20 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 blur-sm border border-cyan-400/20 hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1, y: [0, 15, 0], rotate: [0, -8, 0] }}
          transition={{ 
            opacity: { duration: 1.2, delay: 0.7 },
            scale: { duration: 1.2, delay: 0.7 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 },
            rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
          className="absolute bottom-32 left-[8%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/10 blur-sm border border-violet-400/20 hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute top-40 left-[15%] w-2 h-2 rounded-full bg-cyan-400/60 hidden md:block"
          style={{ animation: 'pulse 3s ease-in-out infinite' }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute bottom-40 right-[20%] w-3 h-3 rounded-full bg-violet-400/60 hidden md:block"
          style={{ animation: 'pulse 4s ease-in-out infinite 1s' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
                
                {/* Text Content - Premium Typography */}
                <div 
                  className="flex-1 text-center space-y-6 md:space-y-7"
                  style={{
                    transform: `translateZ(40px) translateX(${smoothMouse.x * -8}px)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  {/* Name Badge with Gradient */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">Available for opportunities</span>
                  </motion.div>

                  {/* Main Heading with Enhanced Gradient */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-2"
                  >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                      <span className="text-slate-100">Hi, I'm </span>
                      <span 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 via-violet-500 to-cyan-400"
                        style={{ backgroundSize: '200% auto', animation: 'gradient-shift 5s ease infinite' }}
                      >
                        Gaurav
                      </span>
                    </h1>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light tracking-wide"
                    >
                      Computer Science Student & Full Stack Developer
                    </motion.p>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-base md:text-lg text-slate-400 font-normal max-w-xl mx-auto leading-relaxed"
                  >
                    Building real-world projects with React, Python, and modern web technologies. 
                    Focused on creating scalable applications with exceptional user experiences.
                  </motion.p>

                  {/* CTA Buttons - Staggered Animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
                  >
                    <motion.a
                      href="#projects"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-7 py-3.5 text-sm font-semibold shadow-[0_4px_20px_rgba(6,182,212,0.3)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.5)] transition-all duration-300 w-full sm:w-auto group"
                    >
                      View Projects
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="/resume.pdf"
                      target="_blank"
                      download
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-slate-200 hover:bg-white/[0.08] hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 w-full sm:w-auto"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Resume
                    </motion.a>
                    <motion.a
                      href="https://github.com/Gaurav-29-eng"
                      target="_blank"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-slate-200 hover:bg-white/[0.08] hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 w-full sm:w-auto"
                    >
                      <FaGithub className="w-4 h-4" />
                      GitHub
                    </motion.a>
                  </motion.div>
                </div>

                {/* Profile Image - Premium Floating Effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -12, 0]
                  }}
                  transition={{ 
                    opacity: { delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    scale: { delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    y: { delay: 1.2, duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative flex-shrink-0 group mx-auto"
                  style={{
                    transform: `translateZ(80px) translateX(${smoothMouse.x * 12}px) translateY(${smoothMouse.y * 8}px) rotateY(${smoothMouse.x * 4}deg) rotateX(${-smoothMouse.y * 4}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.1s ease-out',
                  }}
                >
                  {/* Multi-layer Glow Effect */}
                  <div 
                    className="absolute -inset-4 rounded-full bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-violet-500/10 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                    style={{
                      transform: `translateZ(-30px) scale(${1 + smoothMouse.y * 0.02})`,
                      transition: 'transform 0.2s ease-out, opacity 0.5s',
                    }}
                  />
                  <div 
                    className="absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-violet-500/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    style={{
                      transform: `translateZ(-15px) scale(${1 + smoothMouse.y * 0.015})`,
                      transition: 'transform 0.2s ease-out, opacity 0.5s',
                    }}
                  />
                  
                  {/* Gradient Border Ring */}
                  <div className="relative w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full p-[3px] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_8px_30px_rgba(6,182,212,0.25)] group-hover:shadow-[0_12px_40px_rgba(6,182,212,0.4)] transition-all duration-500">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-950 bg-slate-900">
                      <img
                        src={profileImage}
                        alt="Gaurav"
                        className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-500 ease-out"
                        style={{ objectPosition: '50% 20%' }}
                      />
                    </div>
                  </div>
                  
                  {/* Animated Rings */}
                  <motion.div
                    className="absolute -inset-5 rounded-full border border-cyan-400/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -inset-6 rounded-full border border-violet-400/5"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Why Hire Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {[ 
            { icon: "🚀", title: "Real Front-End Projects", desc: "Built modern, responsive applications with focus on user experience, interactive interfaces, and clean design patterns.", color: "cyan", delay: 0 },
            { icon: "💡", title: "Strong Front-End Fundamentals", desc: "Solid understanding of JavaScript, React patterns, CSS architecture, and modern front-end best practices.", color: "blue", delay: 0.1 },
            { icon: "🎨", title: "Clean UI/UX", desc: "Focus on modern, responsive, and user-friendly design with smooth animations and interactions.", color: "indigo", delay: 0.2 },
            { icon: "📈", title: "Fast Learner", desc: "Continuously improving and adapting to new technologies with a growth mindset approach.", color: "violet", delay: 0.3 }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden rounded-2xl bg-slate-950/40 border border-white/[0.08] hover:border-${item.color}-400/40 backdrop-blur-md p-5 flex flex-col gap-3 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300`}
            >
              <div className={`inline-flex items-center gap-2 text-${item.color}-300 text-sm font-semibold`}>
                <span className="text-lg">{item.icon}</span>
                {item.title}
              </div>
              <p className="text-xs text-slate-400/90 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ABOUT */}
      <motion.section 
        id="about" 
        className="px-4 sm:px-8 py-20 md:py-28 max-w-4xl mx-auto"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl mb-6 md:mb-10 font-semibold tracking-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">About</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="rounded-2xl bg-slate-950/40 border border-white/[0.08] backdrop-blur-md p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          <p className="text-slate-300/90 text-base md:text-lg mb-6">
            I build scalable web applications and automation systems with a focus on performance, real-time interaction, and clean user experience.
          </p>
          <ul className="space-y-3 text-slate-400 text-base">
            {[
              { text: 'Pune, India' },
              { text: 'B.E Computer Science (SPPU)' },
              { text: 'Frontend Developer (React)' },
              { text: 'Building real-time apps like ', highlight: 'IPL Auction system' },
              { text: 'Open to internships and opportunities', highlight: null, isCyan: true }
            ].map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + (index * 0.08), ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="text-cyan-400 mt-1">•</span>
                <span className={item.isCyan ? "text-cyan-400 font-medium" : ""}>
                  {item.text}
                  {item.highlight && <span className="text-cyan-300 font-medium">{item.highlight}</span>}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.section>

      {/* TECH STACK */}
      <motion.section
        id="skills"
        className="px-4 sm:px-8 py-16 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Tech Stack</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
          {[ 
            { icon: FaCode, title: "Languages", items: "Python • JavaScript • C • C++ • C#", color: "cyan", delay: 0 },
            { icon: FaGlobe, title: "Frontend", items: "React.js • HTML5 • CSS3 • Tailwind CSS", color: "blue", delay: 0.1 },
            { icon: FaTools, title: "Tools", items: "Git • GitHub • VS Code • Vercel", color: "indigo", delay: 0.2 },
            { icon: null, title: "Core Concepts", items: "Data Structures & Algorithms • UI/UX", color: "violet", delay: 0.3, isDot: true }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden rounded-2xl bg-slate-950/40 border border-white/[0.08] hover:border-${item.color}-400/40 backdrop-blur-md p-5 flex flex-col gap-3 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300`}
            >
              <div className={`inline-flex items-center gap-2 text-${item.color}-300 text-sm font-semibold`}>
                {item.isDot ? (
                  <span className="inline-block h-2 w-2 rounded-full bg-violet-300/90" />
                ) : (
                  <item.icon className={`text-${item.color}-300/90 w-4 h-4 md:w-5 md:h-5`} />
                )}
                {item.title}
              </div>
              <p className="text-xs text-slate-400/90 leading-relaxed">
                {item.items}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section
        id="experience"
        className="px-4 sm:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl mb-8 md:mb-12 font-semibold tracking-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Learning & Growth</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            { icon: "🎓", title: "Certifications", items: ["Python Programming - Udemy", "Data Structures & Algorithms", "Web Development - Self-taught"], color: "cyan", delay: 0 },
            { icon: "📚", title: "Continuous Learning", items: ["DSA Practice on LeetCode", "Real-world Project Building", "Technology Exploration"], color: "blue", delay: 0.1 }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`rounded-2xl bg-slate-950/40 border border-white/[0.08] hover:border-${item.color}-400/40 backdrop-blur-md p-6 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300`}
            >
              <h3 className={`text-${item.color}-300 text-base md:text-lg font-semibold mb-4`}>{item.icon} {item.title}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {item.items.map((listItem, idx) => (
                  <li key={idx}>• <strong className="text-slate-300">{listItem}</strong></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="mt-6 md:mt-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/[0.08] hover:border-cyan-400/40 backdrop-blur-md p-6 md:p-8 text-center cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
        >
          <p className="text-cyan-300 text-base md:text-lg font-semibold mb-3">🚀 Growth Mindset</p>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Passionate about continuous improvement and adapting to new technologies. Always seeking to expand my skill set and tackle challenging problems.
          </p>
        </motion.div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="px-4 sm:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl mb-8 md:mb-12 font-semibold tracking-tight text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
        </motion.h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-0 w-full">
          {/* Project 1 - IPL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:col-span-2 lg:col-span-1 md:w-auto bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border-2 border-amber-400/40 md:border-white/[0.08] hover:border-cyan-400/30 cursor-pointer group relative overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_12px_40px_rgba(245,158,11,0.2)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.2)] md:hover:shadow-[0_20px_60px_rgba(6,182,212,0.25)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] lg:hover:scale-[1.03]"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-2xl z-10 pointer-events-none" />
            
            {/* Project Image Preview */}
            <div className="relative h-48 md:h-52 bg-gradient-to-br from-slate-800 via-cyan-900/30 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl md:text-6xl">🏏</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col md:flex-row items-end gap-1 md:gap-2">
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-amber-400/30 backdrop-blur-sm text-amber-300 text-[10px] md:text-xs rounded-full border border-amber-400/40 whitespace-nowrap font-semibold">Featured</span>
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-amber-500/20 backdrop-blur-sm text-amber-300 text-[10px] md:text-xs rounded-full border border-amber-500/30 whitespace-nowrap">Under Progress</span>
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-cyan-400/20 backdrop-blur-sm text-cyan-300 text-[10px] md:text-xs rounded-full border border-cyan-400/30 whitespace-nowrap">Real-Time</span>
              </div>
            </div>

            <div className="p-4 md:p-6 w-full">
              <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-2 leading-tight w-full break-words">Real-Time IPL Auction Simulator</h3>
              <p className="text-cyan-300/90 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed w-full break-words">Real-time IPL Auction simulation with bidding logic, team purse management and AI-based teams. Multiplayer mode currently under development.</p>
              
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 w-full">
                <div className="flex flex-wrap gap-1.5 md:gap-2 w-full">
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">React</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Firebase</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">WebSocket</span>
                </div>
                
                <ul className="text-slate-400 text-xs md:text-sm space-y-2 w-full feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Real-time bidding system</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Team purse management</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Player dataset handling</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>AI-based team participation</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-amber-400 flex-shrink-0">⏳</span>
                    <span className="feature-text text-amber-300/80" style={{ display: 'inline', flex: '1 1 auto' }}>Multiplayer mode (In Progress)</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 pt-2 w-full">
                <a
                  href="https://github.com/Gaurav-29-eng/ipl-auction"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 text-sm rounded-lg transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40 active:bg-slate-700/90 active:border-cyan-400/60 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span className="break-words">GitHub</span>
                </a>
                <a
                  href="https://ipl-auction-hazel.vercel.app/"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 hover:from-cyan-400/30 hover:to-blue-400/30 text-cyan-300 text-sm rounded-lg transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400/50 active:from-cyan-400/40 active:to-blue-400/40 active:border-cyan-400/70 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  <span className="break-words">Live Demo</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Project 2 - Salesforce */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:col-span-2 lg:col-span-1 md:w-auto bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border-2 border-amber-400/40 md:border-white/[0.08] hover:border-sky-400/30 cursor-pointer group relative overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_12px_40px_rgba(245,158,11,0.2)] hover:shadow-[0_12px_40px_rgba(14,165,233,0.2)] md:hover:shadow-[0_20px_60px_rgba(14,165,233,0.25)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] lg:hover:scale-[1.03]"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 via-sky-400/0 to-sky-400/0 group-hover:from-sky-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-2xl z-10 pointer-events-none" />

            {/* Project Image Preview */}
            <div className="relative h-48 md:h-52 bg-gradient-to-br from-slate-800 via-sky-900/30 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl md:text-6xl">☁️</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col md:flex-row items-end gap-1 md:gap-2">
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-amber-400/30 backdrop-blur-sm text-amber-300 text-[10px] md:text-xs rounded-full border border-amber-400/40 whitespace-nowrap font-semibold">Featured</span>
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-sky-400/20 backdrop-blur-sm text-sky-300 text-[10px] md:text-xs rounded-full border border-sky-400/30 whitespace-nowrap">Salesforce</span>
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-sky-400/20 backdrop-blur-sm text-sky-300 text-[10px] md:text-xs rounded-full border border-sky-400/30 whitespace-nowrap">CRM</span>
              </div>
            </div>

            <div className="p-4 md:p-6 w-full">
              <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-2 leading-tight w-full break-words">Salesforce Placement Management System</h3>
              <p className="text-sky-300/90 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed w-full break-words">End-to-end campus placement solution built on Salesforce Platform</p>

              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 w-full">
                <div className="flex flex-wrap gap-1.5 md:gap-2 w-full">
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Salesforce</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Flow Builder</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Reports</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Dashboard</span>
                </div>

                <ul className="text-slate-400 text-xs md:text-sm space-y-2 w-full feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-sky-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Designed custom objects: Student, Company, Application</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-sky-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Built relationships using lookup fields</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-sky-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Created Record-Triggered Flow for automation</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-sky-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Auto-updates student as "Placed" when selected</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-sky-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Built dashboard for placement insights</span>
                  </li>
                </ul>
              </div>

              {/* Screenshots Section */}
              <div className="space-y-2 mb-4">
                <p className="text-slate-400 text-xs font-medium">Screenshots</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative aspect-video bg-slate-800/50 rounded-lg border border-white/[0.06] overflow-hidden group/image cursor-pointer hover:border-sky-400/30 transition-all duration-300">
                    <img src={salesforceFlow} alt="Flow Builder Screenshot" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="relative aspect-video bg-slate-800/50 rounded-lg border border-white/[0.06] overflow-hidden group/image cursor-pointer hover:border-sky-400/30 transition-all duration-300">
                    <img src={salesforceDashboard} alt="Dashboard Screenshot" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 3 - Password Generator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-auto bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border border-white/[0.06] md:border-white/[0.08] hover:border-emerald-400/30 cursor-pointer group relative overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.15)] md:hover:shadow-[0_20px_60px_rgba(16,185,129,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-emerald-400/0 to-emerald-400/0 group-hover:from-emerald-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-2xl z-10 pointer-events-none" />
            
            {/* Project Image Preview */}
            <div className="relative h-44 md:h-48 bg-gradient-to-br from-slate-800 via-emerald-900/30 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl md:text-6xl">🔐</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col md:flex-row items-end gap-1 md:gap-2">
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-300 text-[10px] md:text-xs rounded-full border border-emerald-400/30 whitespace-nowrap">Web App</span>
              </div>
            </div>

            <div className="p-4 md:p-6 w-full">
              <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-2 leading-tight w-full break-words">Password Generator</h3>
              <p className="text-emerald-300/90 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed w-full break-words">Modern web app to generate secure passwords with strength indicator</p>
              
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 w-full">
                <div className="flex flex-wrap gap-1.5 md:gap-2 w-full">
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">React</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Tailwind</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">JavaScript</span>
                </div>
                
                <ul className="text-slate-400 text-xs md:text-sm space-y-2 w-full feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-emerald-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Secure password generation</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-emerald-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Real-time strength indicator</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-emerald-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Customizable length & options</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 pt-2 w-full">
                <a
                  href="https://github.com/Gaurav-29-eng/password-generator"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-emerald-300 text-sm rounded-lg transition-all duration-300 border border-emerald-400/20 hover:border-emerald-400/40 active:bg-slate-700/90 active:border-emerald-400/60 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span className="break-words">GitHub</span>
                </a>
                <a
                  href="https://password-generator-phi-one-17.vercel.app"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 hover:from-emerald-400/30 hover:to-teal-400/30 text-emerald-300 text-sm rounded-lg transition-all duration-300 border border-emerald-400/30 hover:border-emerald-400/50 active:from-emerald-400/40 active:to-teal-400/40 active:border-emerald-400/70 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  <span className="break-words">Live Demo</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Project 4 - AI Chat Analyzer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-auto bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border border-white/[0.06] md:border-white/[0.08] hover:border-violet-400/30 cursor-pointer group relative overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.15)] md:hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400/0 via-violet-400/0 to-violet-400/0 group-hover:from-violet-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-2xl z-10 pointer-events-none" />
            
            {/* Project Image Preview */}
            <div className="relative h-44 md:h-48 bg-gradient-to-br from-slate-800 via-violet-900/30 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl md:text-6xl">🤖</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col md:flex-row items-end gap-1 md:gap-2">
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-violet-400/20 backdrop-blur-sm text-violet-300 text-[10px] md:text-xs rounded-full border border-violet-400/30 whitespace-nowrap">Flask</span>
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-violet-400/20 backdrop-blur-sm text-violet-300 text-[10px] md:text-xs rounded-full border border-violet-400/30 whitespace-nowrap">AI</span>
              </div>
            </div>

            <div className="p-4 md:p-6 w-full">
              <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-2 leading-tight w-full break-words">AI Chat Analyzer</h3>
              <p className="text-violet-300/90 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed w-full break-words">Flask-based app to store, search and summarize conversations</p>
              
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 w-full">
                <div className="flex flex-wrap gap-1.5 md:gap-2 w-full">
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Flask</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Python</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">AI</span>
                </div>
                
                <ul className="text-slate-400 text-xs md:text-sm space-y-2 w-full feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-violet-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Chat storage & management</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-violet-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>AI-powered search</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-violet-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Conversation summarization</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 pt-2 w-full">
                <a
                  href="https://github.com/Gaurav-29-eng/chat-analyzer"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-violet-300 text-sm rounded-lg transition-all duration-300 border border-violet-400/20 hover:border-violet-400/40 active:bg-slate-700/90 active:border-violet-400/60 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span className="break-words">GitHub</span>
                </a>
                <a
                  href="https://chat-analyzer-zpyx.onrender.com"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gradient-to-r from-violet-400/20 to-purple-400/20 hover:from-violet-400/30 hover:to-purple-400/30 text-violet-300 text-sm rounded-lg transition-all duration-300 border border-violet-400/30 hover:border-violet-400/50 active:from-violet-400/40 active:to-purple-400/40 active:border-violet-400/70 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  <span className="break-words">Live Demo</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Project 5 - Smart File Organizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-auto bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border border-white/[0.06] md:border-white/[0.08] hover:border-orange-400/30 cursor-pointer group relative overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(251,146,60,0.15)] md:hover:shadow-[0_20px_60px_rgba(251,146,60,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-orange-400/0 to-orange-400/0 group-hover:from-orange-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-2xl z-10 pointer-events-none" />
            
            {/* Project Image Preview */}
            <div className="relative h-44 md:h-48 bg-gradient-to-br from-slate-800 via-orange-900/30 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl md:text-6xl">📁</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col md:flex-row items-end gap-1 md:gap-2">
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-orange-400/20 backdrop-blur-sm text-orange-300 text-[10px] md:text-xs rounded-full border border-orange-400/30 whitespace-nowrap">Python</span>
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-orange-400/20 backdrop-blur-sm text-orange-300 text-[10px] md:text-xs rounded-full border border-orange-400/30 whitespace-nowrap">CLI</span>
              </div>
            </div>

            <div className="p-4 md:p-6 w-full">
              <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-2 leading-tight w-full break-words">Smart File Organizer</h3>
              <p className="text-orange-300/90 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed w-full break-words">Python tool that automatically organizes files into categories</p>
              
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 w-full">
                <div className="flex flex-wrap gap-1.5 md:gap-2 w-full">
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Python</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">OS</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Shutil</span>
                </div>
                
                <ul className="text-slate-400 text-xs md:text-sm space-y-2 w-full feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-orange-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Automatic file categorization</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-orange-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Extension-based sorting</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-orange-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Customizable categories</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 pt-2 w-full">
                <a
                  href="https://github.com/Gaurav-29-eng/smart-file-organizer"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-orange-300 text-sm rounded-lg transition-all duration-300 border border-orange-400/20 hover:border-orange-400/40 active:bg-slate-700/90 active:border-orange-400/60 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span className="break-words">GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* HOTEL BOOKING SYSTEM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-auto bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border border-white/[0.06] md:border-white/[0.08] hover:border-pink-400/30 cursor-pointer group relative overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(236,72,153,0.15)] md:hover:shadow-[0_20px_60px_rgba(236,72,153,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 via-pink-400/0 to-pink-400/0 group-hover:from-pink-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-2xl z-10 pointer-events-none" />
            
            {/* Project Image Preview */}
            <div className="relative h-44 md:h-48 bg-gradient-to-br from-slate-800 via-pink-900/30 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl md:text-6xl">🏨</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col md:flex-row items-end gap-1 md:gap-2">
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-pink-400/20 backdrop-blur-sm text-pink-300 text-[10px] md:text-xs rounded-full border border-pink-400/30 whitespace-nowrap">Flask</span>
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-pink-400/20 backdrop-blur-sm text-pink-300 text-[10px] md:text-xs rounded-full border border-pink-400/30 whitespace-nowrap">Full Stack</span>
              </div>
            </div>

            <div className="p-4 md:p-6 w-full">
              <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-2 leading-tight w-full break-words">Hotel Booking System</h3>
              <p className="text-pink-300/90 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed w-full break-words">Flask-based web app to book and manage hotel reservations</p>
              
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 w-full">
                <div className="flex flex-wrap gap-1.5 md:gap-2 w-full">
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Flask</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">SQLAlchemy</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">HTML</span>
                </div>
                
                <ul className="text-slate-400 text-xs md:text-sm space-y-2 w-full feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-pink-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Room booking & management</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-pink-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>User authentication</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-pink-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Reservation tracking</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 pt-2 w-full">
                <a
                  href="https://github.com/Gaurav-29-eng/hotel-booking-project"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-pink-300 text-sm rounded-lg transition-all duration-300 border border-pink-400/20 hover:border-pink-400/40 active:bg-slate-700/90 active:border-pink-400/60 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span className="break-words">GitHub</span>
                </a>
                <a
                  href="https://hotel-booking-project-80ln.onrender.com"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gradient-to-r from-pink-400/20 to-rose-400/20 hover:from-pink-400/30 hover:to-rose-400/30 text-pink-300 text-sm rounded-lg transition-all duration-300 border border-pink-400/30 hover:border-pink-400/50 active:from-pink-400/40 active:to-rose-400/40 active:border-pink-400/70 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  <span className="break-words">Live Demo</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* PORTFOLIO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-auto bg-slate-950/30 md:bg-slate-950/40 rounded-2xl md:rounded-2xl border border-white/[0.06] md:border-white/[0.08] hover:border-blue-400/30 cursor-pointer group relative overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)] md:hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
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
              <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col md:flex-row items-end gap-1 md:gap-2">
                <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-blue-400/20 backdrop-blur-sm text-blue-300 text-[10px] md:text-xs rounded-full border border-blue-400/30 whitespace-nowrap">Portfolio</span>
              </div>
            </div>

            <div className="p-4 md:p-6 w-full">
              <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-2 leading-tight w-full break-words">Developer Portfolio</h3>
              <p className="text-blue-300/90 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed w-full break-words">Interactive portfolio with animations and modern UI</p>

              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 w-full">
                <div className="flex flex-wrap gap-1.5 md:gap-2 w-full">
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">React</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Tailwind</span>
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800/80 text-slate-300 text-[10px] md:text-xs rounded whitespace-nowrap">Framer Motion</span>
                </div>

                <ul className="text-slate-400 text-xs md:text-sm space-y-2 w-full feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-blue-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Scroll animations & transitions</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-blue-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Interactive project showcase</span>
                  </li>
                  <li className="flex items-start gap-2 w-full" style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className="text-blue-400 flex-shrink-0">✓</span>
                    <span className="feature-text" style={{ display: 'inline', flex: '1 1 auto' }}>Responsive design all devices</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 pt-2 w-full">
                <a
                  href="https://github.com/Gaurav-29-eng/gaurav-portfolio"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-blue-300 text-sm rounded-lg transition-all duration-300 border border-blue-400/20 hover:border-blue-400/40 active:bg-slate-700/90 active:border-blue-400/60 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span className="break-words">GitHub</span>
                </a>
                <a
                  href="https://gaurav-portfolio-roan.vercel.app/"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 hover:from-blue-400/30 hover:to-indigo-400/30 text-blue-300 text-sm rounded-lg transition-all duration-300 border border-blue-400/30 hover:border-blue-400/50 active:from-blue-400/40 active:to-indigo-400/40 active:border-blue-400/70 active:scale-95 w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  <span className="break-words">Live Demo</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </motion.section>

      {/* PROBLEM SOLVING */}
      <motion.section 
        className="px-4 sm:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl mb-8 md:mb-12 font-semibold tracking-tight text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Problem Solving</span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="max-w-3xl mx-auto rounded-2xl bg-slate-950/40 border border-white/[0.08] hover:border-cyan-400/40 backdrop-blur-md p-6 md:p-10 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
        >
          <div className="space-y-4 text-slate-400">
            {[
              "Practicing Data Structures & Algorithms regularly",
              "Strong in arrays, strings, and basic recursion", 
              "Actively improving problem-solving skills"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-cyan-400 text-lg mt-0.5">•</span>
                <p className="text-sm md:text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* EDUCATION */}
      <motion.section 
        className="px-4 sm:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl mb-8 md:mb-12 font-semibold tracking-tight text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Education</span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="max-w-2xl mx-auto rounded-2xl bg-slate-950/40 border border-white/[0.08] hover:border-cyan-400/40 backdrop-blur-md p-6 md:p-10 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
        >
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-semibold text-slate-100 mb-3">B.E. Computer Science</h3>
            <p className="text-cyan-300 text-sm md:text-base mb-2">SPPU, Pune</p>
            <p className="text-slate-400 text-xs md:text-sm">3rd Year • Current</p>
          </div>
        </motion.div>
      </motion.section>

      {/* CONTACT */}
      <motion.section 
        id="contact" 
        className="px-4 sm:px-8 py-20 md:py-28 pb-24 md:pb-32 max-w-4xl mx-auto"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl mb-4 md:mb-6 text-center font-semibold tracking-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Let's Connect</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-center text-slate-400 mb-8 md:mb-10 max-w-xl mx-auto text-sm md:text-lg leading-relaxed px-4"
        >
          Open to internships and opportunities
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-6"
        >
          {[
            { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", href: "mailto:gaurav@example.com", isStroke: true },
            { icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", label: "GitHub", href: "https://github.com/Gaurav-29-eng", isExternal: true },
            { icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", label: "LinkedIn", href: "https://linkedin.com/in/gaurav-salunke-cse27", isExternal: true }
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-3 px-6 py-4 min-h-[52px] bg-slate-950/40 backdrop-blur-md rounded-xl border border-white/[0.08] hover:border-cyan-400/40 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 w-full sm:w-auto"
            >
              <svg 
                className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" 
                fill={item.isStroke ? "none" : "currentColor"} 
                stroke={item.isStroke ? "currentColor" : undefined}
                viewBox="0 0 24 24"
              >
                {item.isStroke ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                ) : (
                  <path d={item.icon} />
                )}
              </svg>
              <span className="text-cyan-300 font-medium text-sm md:text-base">{item.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.section>
      </motion.div>
    </motion.div>
  );
}
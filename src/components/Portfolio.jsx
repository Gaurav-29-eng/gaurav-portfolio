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
    <div className="relative bg-[#050816] text-white min-h-screen overflow-hidden">
      <AnimatedBackground />
      <CursorTrail />

      <div className="relative z-10 flex flex-col">
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="mx-auto max-w-6xl px-8 py-4 flex items-center justify-between bg-slate-900/60 backdrop-blur-xl border-b border-white/5 rounded-b-2xl shadow-[0_18px_60px_rgba(15,23,42,0.8)]">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight text-cyan-400 select-none">
            Gaurav<span className="text-slate-400">.dev</span>
          </h1>

          <nav className="flex items-center gap-8 text-sm md:text-base text-slate-300">
            <a href="#projects" className="relative hover:text-cyan-400 transition-all duration-300 ease-out after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-cyan-400 after:transition-all after:duration-300">
              Projects
            </a>
            <a href="#contact" className="relative hover:text-cyan-400 transition-all duration-300 ease-out after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-cyan-400 after:transition-all after:duration-300">
              Contact
            </a>

            <a
              href="/resume.pdf"
              download
              className="px-5 py-2.5 rounded-full border border-cyan-400/70 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] transition-all duration-300 ease-out"
            >
              Resume
            </a>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-8 pt-32 md:pt-40 max-w-6xl mx-auto" style={{ perspective: '1000px' }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16"
        >
          {/* Text Content */}
          <div 
            className="max-w-2xl text-center md:text-left"
            style={{
              transform: `rotateY(${smoothMouse.x * 3}deg) rotateX(${-smoothMouse.y * 3}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out',
            }}
          >
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-sm md:text-base uppercase tracking-[0.35em] text-cyan-300/90 mb-4 font-medium"
              style={{ transform: 'translateZ(20px)' }}
            >
              Hi, I'm <span className="font-semibold text-cyan-300">Gaurav</span>
            </motion.p>

            <div className="overflow-hidden" style={{ transform: 'translateZ(40px)' }}>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              >
                <span className="block text-slate-100 overflow-hidden">
                  {["Front-End", "Developer"].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.25 + i * 0.15,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="inline-block mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <span 
                  className="block mt-2 overflow-hidden bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 to-cyan-400 bg-clip-text text-transparent"
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'gradient-shift 4s ease infinite',
                  }}
                >
                  {["Computer", "Science", "Student"].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.55 + i * 0.12,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="inline-block mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ delay: 0.32, duration: 0.6 }}
              className="mt-6 text-base md:text-lg text-slate-300/80 max-w-xl leading-relaxed"
              style={{ transform: 'translateZ(30px)' }}
            >
              I build modern web applications with strong fundamentals in Data Structures, JavaScript, and front-end development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
              style={{ transform: 'translateZ(50px)' }}
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 px-8 py-3 text-sm font-semibold shadow-[0_4px_20px_rgba(6,182,212,0.4)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.6)] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/70 bg-slate-900/40 px-8 py-3 text-sm font-semibold text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_8px_30px_rgba(6,182,212,0.5)] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1"
              >
                Resume
              </a>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-shrink-0 self-center md:self-start group"
            style={{
              transform: `rotateY(${smoothMouse.x * 2}deg) rotateX(${-smoothMouse.y * 2}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Main container with gradient border */}
            <div className="relative w-44 h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 transition-transform duration-300 ease-out group-hover:scale-[1.03]">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/50 via-blue-500/40 to-violet-500/50 blur-2xl scale-130 opacity-80" />
              
              {/* Gradient border wrapper */}
              <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_8px_40px_rgba(6,182,212,0.35)] group-hover:shadow-[0_12px_50px_rgba(6,182,212,0.5)] transition-shadow duration-300">
                {/* Inner container */}
                <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-slate-900 bg-slate-900">
              <img
                src={profileImage}
                alt="Gaurav"
                className="w-full h-full object-cover scale-110 hover:scale-105 transition-transform duration-500 ease-out"
                style={{ objectPosition: '50% 15%' }}
              />
                </div>
              </div>
              
              {/* Decorative rotating ring */}
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-dashed border-cyan-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.06, y: [0, -8, 0] }}
          transition={{ delay: 0.6, duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-8 md:right-12 bottom-12 text-[72px] md:text-[96px] lg:text-[110px] font-black tracking-[0.2em] text-cyan-400/20"
        >
          GAURAV
        </motion.h1>

      </section>

      {/* WHY HIRE ME */}
      <motion.section 
        id="why-hire-me"
        className="px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight text-center">
          Why Hire Me<span className="text-cyan-400"></span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <motion.div
            whileHover={{ 
              y: -6, 
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0 25px 80px rgba(6, 182, 212, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-cyan-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-6 md:p-7 flex flex-col gap-4 cursor-pointer"
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="inline-flex items-center gap-3 text-cyan-300 text-lg font-semibold" style={{ transform: 'translateZ(20px)' }}>
              <span className="text-2xl">🚀</span>
              Real Front-End Projects
            </div>
            <p className="text-sm text-slate-300/80 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
              Built modern, responsive applications with focus on user experience, interactive interfaces, and clean design patterns.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ 
              y: -6, 
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0 25px 80px rgba(59, 130, 246, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-blue-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-6 md:p-7 flex flex-col gap-4 cursor-pointer"
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="inline-flex items-center gap-3 text-blue-300 text-lg font-semibold" style={{ transform: 'translateZ(20px)' }}>
              <span className="text-2xl">💡</span>
              Strong Front-End Fundamentals
            </div>
            <p className="text-sm text-slate-300/80 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
              Solid understanding of JavaScript, React patterns, CSS architecture, and modern front-end best practices.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ 
              y: -6, 
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0 25px 80px rgba(99, 102, 241, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-indigo-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-6 md:p-7 flex flex-col gap-4 cursor-pointer"
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="inline-flex items-center gap-3 text-indigo-300 text-lg font-semibold" style={{ transform: 'translateZ(20px)' }}>
              <span className="text-2xl">🎨</span>
              Clean UI/UX
            </div>
            <p className="text-sm text-slate-300/80 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
              Focus on modern, responsive, and user-friendly design with smooth animations and interactions.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ 
              y: -6, 
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0 25px 80px rgba(139, 92, 246, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-violet-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-6 md:p-7 flex flex-col gap-4 cursor-pointer"
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="inline-flex items-center gap-3 text-violet-300 text-lg font-semibold" style={{ transform: 'translateZ(20px)' }}>
              <span className="text-2xl">📈</span>
              Fast Learner
            </div>
            <p className="text-sm text-slate-300/80 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
              Continuously improving and adapting to new technologies with a growth mindset approach.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ABOUT */}
      <motion.section id="about" className="px-8 py-20 md:py-28 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 60 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}>
        
        <h2 className="text-3xl md:text-4xl mb-8 md:mb-10 font-semibold tracking-tight">
          About<span className="text-cyan-400"></span>
        </h2>

        <div className="space-y-5 text-slate-300/90 text-base md:text-lg leading-relaxed max-w-2xl">
          <p>I am a Computer Science Engineering student at SPPU, Pune, specializing in front-end development and creating exceptional user experiences.</p>
          <p>I enjoy building modern, responsive web applications with clean interfaces and smooth interactions that users love.</p>
          <p>Currently developing an IPL Auction system with real-time features and continuously expanding my front-end technical skillset.</p>
          <p className="text-cyan-400 font-medium pt-2">🚀 Actively seeking Front-End Developer internship opportunities to create impactful user interfaces.</p>
        </div>

      </motion.section>

      {/* SKILLS */}
      <motion.section
        id="skills"
        className="px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight">
          Technical Skills<span className="text-cyan-400"></span>
        </h2>

        <div className="grid md:grid-cols-4 gap-5 md:gap-6 text-slate-200">
          <motion.div
            whileHover={{ 
              y: -6, 
              rotateX: 4,
              rotateY: -4,
              boxShadow: "0 20px 60px rgba(6, 182, 212, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-cyan-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-5 md:p-6 flex flex-col gap-3 cursor-pointer"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-cyan-300 text-sm font-medium" style={{ transform: 'translateZ(15px)' }}>
              <FaCode className="text-cyan-300/90" />
              Programming
            </div>
            <p className="text-xs md:text-sm text-slate-300/80 leading-relaxed" style={{ transform: 'translateZ(8px)' }}>
              Python • C • C# • Arduino Programming
            </p>
          </motion.div>

          <motion.div
            whileHover={{ 
              y: -6, 
              rotateX: 4,
              rotateY: -4,
              boxShadow: "0 20px 60px rgba(59, 130, 246, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-blue-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-5 md:p-6 flex flex-col gap-3 cursor-pointer"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-blue-300 text-sm font-medium" style={{ transform: 'translateZ(15px)' }}>
              <FaGlobe className="text-blue-300/90" />
              Front-End
            </div>
            <p className="text-xs md:text-sm text-slate-300/80 leading-relaxed" style={{ transform: 'translateZ(8px)' }}>
              HTML5 • CSS3 • JavaScript ES6+ • React.js • Tailwind CSS
            </p>
          </motion.div>

          <motion.div
            whileHover={{ 
              y: -6, 
              rotateX: 4,
              rotateY: -4,
              boxShadow: "0 20px 60px rgba(99, 102, 241, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-indigo-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-5 md:p-6 flex flex-col gap-3 cursor-pointer"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-indigo-300 text-sm font-medium" style={{ transform: 'translateZ(15px)' }}>
              <FaTools className="text-indigo-300/90" />
              Tools
            </div>
            <p className="text-xs md:text-sm text-slate-300/80 leading-relaxed" style={{ transform: 'translateZ(8px)' }}>
              Git • VS Code • Pandas • NumPy • Framer Motion
            </p>
          </motion.div>

          <motion.div
            whileHover={{ 
              y: -6, 
              rotateX: 4,
              rotateY: -4,
              boxShadow: "0 20px 60px rgba(139, 92, 246, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-violet-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-5 md:p-6 flex flex-col gap-3 cursor-pointer"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="inline-flex items-center gap-2 text-violet-300 text-sm font-medium" style={{ transform: 'translateZ(15px)' }}>
              <span className="inline-block h-2 w-2 rounded-full bg-violet-300/90 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
              Specialization
            </div>
            <p className="text-xs md:text-sm text-slate-300/80 leading-relaxed" style={{ transform: 'translateZ(8px)' }}>
              Frontend Development • UI/UX Design • Responsive Design
            </p>
          </motion.div>
        </div>

      </motion.section>

      {/* LEARNING & GROWTH */}
      <motion.section
        id="experience"
        className="px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight">
          Learning & Growth<span className="text-cyan-400"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ 
              y: -6, 
              rotateX: 4,
              rotateY: -4,
              boxShadow: "0 25px 80px rgba(6, 182, 212, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-2xl bg-slate-900/70 border border-cyan-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.95)] backdrop-blur-xl p-6 md:p-8 text-slate-200 cursor-pointer"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <h3 className="text-cyan-300 text-lg font-semibold mb-4" style={{ transform: 'translateZ(20px)' }}>🎓 Certifications</h3>
            <ul className="space-y-3 text-sm text-slate-200/85 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
              <li>• <strong>Python Programming</strong> - Udemy Certification</li>
              <li>• <strong>Data Structures & Algorithms</strong> - Continuous Practice</li>
              <li>• <strong>Web Development</strong> - Self-taught & Online Courses</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ 
              y: -6, 
              rotateX: 4,
              rotateY: -4,
              boxShadow: "0 25px 80px rgba(59, 130, 246, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-2xl bg-slate-900/70 border border-blue-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.95)] backdrop-blur-xl p-6 md:p-8 text-slate-200 cursor-pointer"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <h3 className="text-blue-300 text-lg font-semibold mb-4" style={{ transform: 'translateZ(20px)' }}>📚 Continuous Learning</h3>
            <ul className="space-y-3 text-sm text-slate-200/85 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
              <li>• <strong>DSA Practice</strong> - Problem solving on LeetCode</li>
              <li>• <strong>Project Building</strong> - Real-world application development</li>
              <li>• <strong>Technology Exploration</strong> - Staying updated with modern tools</li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          whileHover={{ 
            y: -4,
            boxShadow: "0 25px 80px rgba(6, 182, 212, 0.15)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border border-cyan-400/20 shadow-[0_18px_60px_rgba(15,23,42,0.95)] backdrop-blur-xl p-6 md:p-8 text-center cursor-pointer"
        >
          <p className="text-cyan-300 text-lg font-semibold mb-3">🚀 Growth Mindset</p>
          <p className="text-slate-300/80 text-base max-w-2xl mx-auto leading-relaxed">
            Passionate about continuous improvement and adapting to new technologies. 
            Always seeking to expand my skill set and tackle challenging problems that push me to grow as a developer.
          </p>
        </motion.div>

      </motion.section>

      {/* TECH STACK */}
      <motion.section 
        className="px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight text-center">
          Tech Stack<span className="text-cyan-400"></span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-cyan-300 font-semibold mb-3 text-lg">Languages</h3>
            <p className="text-slate-300 text-sm leading-relaxed">Python, C++, JavaScript</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-blue-300 font-semibold mb-3 text-lg">Frontend</h3>
            <p className="text-slate-300 text-sm leading-relaxed">React, HTML, CSS</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-indigo-300 font-semibold mb-3 text-lg">Core</h3>
            <p className="text-slate-300 text-sm leading-relaxed">Data Structures & Algorithms</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-violet-300 font-semibold mb-3 text-lg">Tools</h3>
            <p className="text-slate-300 text-sm leading-relaxed">Git, GitHub, Vercel</p>
          </div>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight">
          Projects<span className="text-cyan-400"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* IPL */}
          <motion.div
            whileHover={{ 
              scale: 1.02,
              y: -8, 
              rotateX: 6,
              rotateY: -6,
              boxShadow: "0 30px 100px rgba(6, 182, 212, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="p-6 md:p-8 bg-slate-900/70 rounded-2xl border border-cyan-400/20 shadow-[0_24px_80px_rgba(15,23,42,1)] cursor-pointer group relative overflow-hidden"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-2xl" />
            <h3 className="text-xl font-semibold text-slate-100 mb-2" style={{ transform: 'translateZ(30px)' }}>IPL Auction System</h3>
            <p className="text-cyan-300 text-sm mb-5" style={{ transform: 'translateZ(20px)' }}>Real-time IPL Auction simulation with bidding logic and AI teams</p>
            
            <div className="space-y-4 mb-5" style={{ transform: 'translateZ(15px)' }}>
              <div>
                <p className="text-cyan-300 text-sm font-medium mb-1">Problem:</p>
                <p className="text-slate-400 text-sm leading-relaxed">Simulates real IPL auction complexity</p>
              </div>
              
              <div>
                <p className="text-cyan-300 text-sm font-medium mb-1">Solution:</p>
                <p className="text-slate-400 text-sm leading-relaxed">Built a dynamic bidding system with team strategies</p>
              </div>
              
              <div>
                <p className="text-cyan-300 text-sm font-medium mb-1">Features:</p>
                <ul className="text-slate-400 text-sm space-y-1 ml-4 leading-relaxed">
                  <li>• Real-time bidding system</li>
                  <li>• Team purse management</li>
                  <li>• Player dataset handling</li>
                  <li>• AI-based team participation</li>
                </ul>
              </div>
              
              <div>
                <p className="text-cyan-300 text-sm font-medium mb-1">Tech:</p>
                <p className="text-slate-400 text-sm leading-relaxed">React, JavaScript, CSS</p>
              </div>
            </div>
            
            <div className="flex gap-4 pt-2" style={{ transform: 'translateZ(25px)' }}>
              <a
                href="https://github.com/Gaurav-29-eng/ipl-auction"
                target="_blank"
                className="text-cyan-300 text-sm hover:text-cyan-200 transition-colors duration-300 hover:scale-105 inline-block"
              >
                GitHub
              </a>
              <span className="text-slate-500">|</span>
              <a
                href="https://ipl-auction-hazel.vercel.app/"
                target="_blank"
                className="text-cyan-300 text-sm hover:text-cyan-200 transition-colors duration-300 hover:scale-105 inline-block"
              >
                Live
              </a>
            </div>
          </motion.div>

          {/* PORTFOLIO */}
          <motion.div
            whileHover={{ 
              scale: 1.02,
              y: -8, 
              rotateX: 6,
              rotateY: -6,
              boxShadow: "0 30px 100px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="p-6 md:p-8 bg-slate-900/70 rounded-2xl border border-blue-400/20 shadow-[0_24px_80px_rgba(15,23,42,1)] cursor-pointer group relative overflow-hidden"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-2xl" />
            <h3 className="text-xl font-semibold text-slate-100 mb-2" style={{ transform: 'translateZ(30px)' }}>Portfolio Website</h3>
            <p className="text-blue-300 text-sm mb-5" style={{ transform: 'translateZ(20px)' }}>Professional portfolio showcasing projects and technical skills</p>
            
            <div className="space-y-4 mb-5" style={{ transform: 'translateZ(15px)' }}>
              <div>
                <p className="text-blue-300 text-sm font-medium mb-1">Problem:</p>
                <p className="text-slate-400 text-sm leading-relaxed">Create a professional portfolio for recruiters</p>
              </div>
              
              <div>
                <p className="text-blue-300 text-sm font-medium mb-1">Solution:</p>
                <p className="text-slate-400 text-sm leading-relaxed">Built a clean, responsive portfolio with modern design</p>
              </div>
              
              <div>
                <p className="text-blue-300 text-sm font-medium mb-1">Features:</p>
                <ul className="text-slate-400 text-sm space-y-1 ml-4 leading-relaxed">
                  <li>• Responsive design for all devices</li>
                  <li>• Clean, professional layout</li>
                  <li>• Project showcase section</li>
                  <li>• Contact form integration</li>
                </ul>
              </div>
              
              <div>
                <p className="text-blue-300 text-sm font-medium mb-1">Tech:</p>
                <p className="text-slate-400 text-sm leading-relaxed">React, JavaScript, CSS</p>
              </div>
            </div>
            
            <div className="flex gap-4 pt-2" style={{ transform: 'translateZ(25px)' }}>
              <a
                href="https://github.com/Gaurav-29-eng/gaurav-portfolio"
                target="_blank"
                className="text-blue-300 text-sm hover:text-blue-200 transition-colors duration-300 hover:scale-105 inline-block"
              >
                GitHub
              </a>
              <span className="text-slate-500">|</span>
              <a
                href="https://gaurav-portfolio-roan.vercel.app/"
                target="_blank"
                className="text-blue-300 text-sm hover:text-blue-200 transition-colors duration-300 hover:scale-105 inline-block"
              >
                Live
              </a>
            </div>
          </motion.div>
        </div>

      </motion.section>

      {/* PROBLEM SOLVING */}
      <motion.section 
        className="px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight text-center">
          Problem Solving<span className="text-cyan-400"></span>
        </h2>

        <motion.div 
          whileHover={{ 
            y: -6,
            rotateX: 4,
            rotateY: -4,
            boxShadow: "0 25px 80px rgba(6, 182, 212, 0.2)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="max-w-3xl mx-auto bg-slate-900/70 rounded-2xl border border-cyan-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-6 md:p-10 cursor-pointer"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <div className="space-y-5 text-slate-300" style={{ transform: 'translateZ(15px)' }}>
            <div className="flex items-start gap-4">
              <span className="text-cyan-400 text-xl mt-0.5">•</span>
              <p className="text-base leading-relaxed">Practicing Data Structures & Algorithms regularly</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-cyan-400 text-xl mt-0.5">•</span>
              <p className="text-base leading-relaxed">Strong in arrays, strings, and basic recursion</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-cyan-400 text-xl mt-0.5">•</span>
              <p className="text-base leading-relaxed">Actively improving problem-solving skills</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* EDUCATION */}
      <motion.section 
        className="px-8 py-20 md:py-28 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-3xl md:text-4xl mb-10 md:mb-12 font-semibold tracking-tight text-center">
          Education<span className="text-cyan-400"></span>
        </h2>

        <motion.div 
          whileHover={{ 
            y: -6,
            rotateX: 4,
            rotateY: -4,
            boxShadow: "0 25px 80px rgba(6, 182, 212, 0.25)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="max-w-2xl mx-auto bg-slate-900/70 rounded-2xl border border-cyan-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-8 md:p-10 cursor-pointer"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <div className="text-center" style={{ transform: 'translateZ(20px)' }}>
            <h3 className="text-xl md:text-2xl font-semibold text-slate-100 mb-3">B.E. Computer Science</h3>
            <p className="text-cyan-300 text-base mb-2">SPPU, Pune</p>
            <p className="text-slate-400 text-sm">3rd Year • Current</p>
          </div>
        </motion.div>
      </motion.section>

      {/* CONTACT */}
      <motion.section id="contact" className="px-8 py-20 md:py-28 pb-32 max-w-4xl mx-auto"
        initial={{ opacity: 0, x: -80 }} 
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}>

        <h2 className="text-3xl md:text-4xl mb-8 md:mb-10 text-center font-semibold tracking-tight">
          Let's Connect<span className="text-cyan-400"></span>
        </h2>
        
        <p className="text-center text-slate-300/80 mb-8 max-w-xl mx-auto text-base leading-relaxed">
          Open to internships and opportunities
        </p>

        <div className="flex justify-center gap-8 mb-8">
          <a
            href="mailto:gaurav@example.com"
            className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300 text-base font-medium"
          >
            Email
          </a>
          <span className="text-slate-500">|</span>
          <a
            href="https://github.com/Gaurav-29-eng"
            target="_blank"
            className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300 text-base font-medium"
          >
            GitHub
          </a>
          <span className="text-slate-500">|</span>
          <a
            href="https://linkedin.com/in/gaurav"
            target="_blank"
            className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300 text-base font-medium"
          >
            LinkedIn
          </a>
        </div>
      </motion.section>

      </div>
    </div>
  );
}
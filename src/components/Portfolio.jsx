import { motion, useScroll } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaCode, FaGlobe, FaTools } from "react-icons/fa";
import emailjs from "emailjs-com";
import { useEffect, useRef } from "react";

// Fix: some eslint configs ignore JSX member-usage; this keeps `motion` marked as used.
void motion;

export default function Portfolio() {

  const { scrollYProgress } = useScroll();

  const bgRef = useRef(null);

  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let nodes = [];
    let edges = [];
    let signals = [];
    let particles = [];
    let microText = [];
    let bgShapes = [];

    let bgGradient = null;
    let lastEdgeUpdate = 0;

    const HEX_SET = "0123456789ABCDEF";

    const rand = (min, max) => Math.random() * (max - min) + min;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const randHex = (len) =>
      Array.from({ length: len }, () => HEX_SET[Math.floor(Math.random() * HEX_SET.length)]).join("");

    const resize = () => {
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;

      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, "rgba(0, 0, 0, 0.9)");
      bgGradient.addColorStop(0.5, "rgba(2, 6, 23, 0.85)");
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");

      const minDim = Math.min(width, height);
      const nodeCount = clamp(Math.floor(minDim / 10), 44, 92);

      nodes = Array.from({ length: nodeCount }, (_, i) => ({
        i,
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.08, 0.08),
        vy: rand(-0.08, 0.08),
        phase: rand(0, Math.PI * 2),
        pulse: rand(0, 1),
      }));

      // Shapes for depth (kept intentionally faint).
      bgShapes = Array.from({ length: 3 }, () => ({
        x: rand(width * 0.15, width * 0.85),
        y: rand(height * 0.15, height * 0.85),
        r: rand(minDim * 0.08, minDim * 0.16),
        a: rand(0, Math.PI * 2),
        spin: rand(-0.0005, 0.0005),
      }));

      edges = [];
      signals = [];
      particles = [];
      microText = [];
    };

    const computeEdges = (now) => {
      edges = [];
      const maxDist = Math.min(width, height) * 0.28;
      const maxEdges = clamp(Math.floor((width * height) / 12000), 60, 170);

      // Simple “living network”: edges appear/disappear based on distance + randomness.
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[b].x - nodes[a].x;
          const dy = nodes[b].y - nodes[a].y;
          const dist = Math.hypot(dx, dy);
          if (dist > maxDist) continue;

          const closeness = 1 - dist / maxDist;
          const prob = Math.pow(closeness, 2.25) * 0.85;

          // Slight coherence so it feels “intelligent”.
          const steer = Math.sin(now * 0.00035 + nodes[a].phase + nodes[b].phase) * 0.1;
          const stableBias = 0.92 + steer;

          if (Math.random() < prob * stableBias) {
            edges.push({
              a,
              b,
              dist,
              phase: rand(0, Math.PI * 2),
              unstableUntil: Math.random() < 0.08 ? now + rand(1200, 3200) : 0,
              hueSeed: Math.random(),
            });
            if (edges.length >= maxEdges) return;
          }
        }
      }
    };

    const step = (now) => {
      // Motion blur-ish clearing (keeps it smooth and alive).
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Base background gradient.
      if (bgGradient) {
        ctx.fillStyle = bgGradient;
        // Low alpha keeps trails instead of fully washing the frame.
        ctx.globalAlpha = 0.18;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
      }

      // Animate nodes with gentle drift.
      const dt = 16.67;
      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        const drift = 0.35;
        n.x += (n.vx + Math.sin(now * 0.00015 + n.phase) * 0.04) * drift;
        n.y += (n.vy + Math.cos(now * 0.00013 + n.phase) * 0.04) * drift;

        // Bounce softly at edges.
        if (n.x < 0) {
          n.x = 0;
          n.vx *= -1;
        } else if (n.x > width) {
          n.x = width;
          n.vx *= -1;
        }
        if (n.y < 0) {
          n.y = 0;
          n.vy *= -1;
        } else if (n.y > height) {
          n.y = height;
          n.vy *= -1;
        }

        n.pulse = 0.5 + 0.5 * Math.sin(now * 0.0032 + n.phase);
      }

      // Edge updates are throttled for performance.
      const edgeIntervalMs = 180;
      if (now - lastEdgeUpdate > edgeIntervalMs) {
        computeEdges(now);
        lastEdgeUpdate = now;
      }

      // Depth shapes.
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.07)";
      ctx.lineWidth = 1;
      bgShapes.forEach((s, idx) => {
        s.a += s.spin * now;
        const cx = s.x;
        const cy = s.y;
        ctx.beginPath();
        ctx.arc(cx, cy, s.r * (0.65 + idx * 0.08), 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();

      // Faint shifting grid.
      const gridSize = clamp(Math.floor(Math.min(width, height) / 10), 55, 95);
      const ox = (now * 0.01) % gridSize;
      const oy = (now * 0.012) % gridSize;
      ctx.save();
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.10)";
      ctx.lineWidth = 1;
      for (let x = -gridSize; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + ox, 0);
        ctx.lineTo(x + ox, height);
        ctx.stroke();
      }
      for (let y = -gridSize; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + oy);
        ctx.lineTo(width, y + oy);
        ctx.stroke();
      }
      ctx.restore();

      // Signals + particles spawn (keep it subtle).
      if (!prefersReducedMotion) {
        if (edges.length > 0 && signals.length < 130 && Math.random() < 0.22) {
          const e = edges[Math.floor(Math.random() * edges.length)];
          signals.push({
            a: e.a,
            b: e.b,
            t: 0,
            speed: rand(0.7, 1.25),
            hueSeed: e.hueSeed,
            phase: rand(0, Math.PI * 2),
          });
        }
        if (edges.length > 0 && particles.length < 150 && Math.random() < 0.22) {
          const e = edges[Math.floor(Math.random() * edges.length)];
          particles.push({
            a: e.a,
            b: e.b,
            t: rand(0, 1),
            speed: rand(0.35, 0.85),
            hueSeed: e.hueSeed,
            phase: rand(0, Math.PI * 2),
          });
        }
        if (microText.length < 18 && Math.random() < 0.07) {
          microText.push({
            x: rand(0, width),
            y: rand(height * 0.08, height * 0.92),
            text: `0x${randHex(4)}`,
            life: 1,
            ttlMs: rand(900, 1700),
            drift: rand(-0.12, 0.12),
            phase: rand(0, Math.PI * 2),
          });
        }
      }

      // Draw edges (bloom + flicker).
      for (let idx = 0; idx < edges.length; idx++) {
        const e = edges[idx];
        const a = nodes[e.a];
        const b = nodes[e.b];

        const dist01 = clamp(e.dist / (Math.min(width, height) * 0.28), 0, 1);
        const closeness = 1 - dist01;

        const baseHue = 205 + 95 * Math.sin(e.hueSeed * 6.28 + now * 0.0004 + e.phase);
        const unstable = e.unstableUntil > now;
        const flicker =
          0.55 +
          0.45 * Math.sin(now * (unstable ? 0.018 : 0.010) + e.phase * 1.3);

        const alpha = clamp(0.035 + closeness * 0.17, 0, 0.22) * flicker * (unstable ? 0.7 : 1);

        const hue = unstable ? (baseHue + 55) % 360 : baseHue;
        const color = `hsla(${hue}, 100%, 65%, ${alpha})`;

        // Outer glow pass.
        ctx.save();
        ctx.shadowBlur = unstable ? 28 : 22;
        ctx.shadowColor = `hsla(${hue}, 100%, 65%, ${alpha})`;
        ctx.lineWidth = unstable ? 2.2 : 2.0;
        ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${alpha * 0.22})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.restore();

        // Core pass.
        ctx.save();
        ctx.shadowBlur = unstable ? 12 : 10;
        ctx.shadowColor = `hsla(${hue}, 100%, 70%, ${alpha})`;
        ctx.lineWidth = unstable ? 1.5 : 1.25;
        ctx.strokeStyle = color;
        if (unstable && Math.random() < 0.02) {
          ctx.setLineDash([8, 10]);
          ctx.lineDashOffset = -now * 0.02;
        } else {
          ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.restore();
      }

      // Draw nodes (pulse + bloom).
      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        const r = 1.2 + 1.9 * n.pulse;

        const hue = 200 + 95 * Math.sin(n.phase + now * 0.0006);
        const alpha = 0.18 + 0.30 * n.pulse;

        ctx.save();
        ctx.shadowBlur = 18;
        ctx.shadowColor = `hsla(${hue}, 100%, 65%, ${alpha})`;
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Tiny inner dot.
        ctx.save();
        ctx.fillStyle = `rgba(200, 255, 235, ${0.28 * n.pulse})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.7, r * 0.45), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Update/draw signals.
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.t += 0.004 * sig.speed * (prefersReducedMotion ? 0.2 : 1) * dt;
        if (sig.t >= 1) {
          signals.splice(s, 1);
          continue;
        }

        const a = nodes[sig.a];
        const b = nodes[sig.b];
        const px = a.x + (b.x - a.x) * sig.t;
        const py = a.y + (b.y - a.y) * sig.t;

        const hue = 185 + 120 * Math.sin(sig.hueSeed * 6.28 + sig.phase + now * 0.0009);
        const alpha = 0.65 * (1 - sig.t) + 0.15;

        ctx.save();
        ctx.shadowBlur = 28;
        ctx.shadowColor = `hsla(${hue}, 100%, 70%, ${alpha})`;
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Travel pulse from start -> current.
        ctx.globalAlpha = 0.55;
        ctx.lineWidth = 2;
        ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${alpha * 0.35})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.restore();
      }

      // Update/draw data particles along paths.
      for (let p = particles.length - 1; p >= 0; p--) {
        const part = particles[p];
        part.t += 0.003 * part.speed * (prefersReducedMotion ? 0.15 : 1) * dt;
        if (part.t >= 1) {
          particles.splice(p, 1);
          continue;
        }

        const a = nodes[part.a];
        const b = nodes[part.b];
        const px = a.x + (b.x - a.x) * part.t;
        const py = a.y + (b.y - a.y) * part.t;

        const hue = 180 + 120 * Math.sin(part.hueSeed * 6.28 + part.phase + now * 0.0008);
        const alpha = 0.20 + 0.55 * (1 - part.t);

        ctx.save();
        ctx.shadowBlur = 14;
        ctx.shadowColor = `hsla(${hue}, 100%, 70%, ${alpha})`;
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Micro-text overlay.
      for (let m = microText.length - 1; m >= 0; m--) {
        const t = microText[m];
        t.life -= dt / t.ttlMs;
        t.y -= (dt * 0.04) * (0.6 + Math.sin(now * 0.002 + t.phase) * 0.4);
        t.x += dt * t.drift;

        if (t.life <= 0) {
          microText.splice(m, 1);
          continue;
        }

        const a = clamp(t.life, 0, 1);
        ctx.save();
        ctx.globalAlpha = a * 0.22;
        const hue = 195 + 80 * Math.sin(t.phase + now * 0.0002);
        ctx.fillStyle = `hsla(${hue}, 100%, 75%, 1)`;
        ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
        ctx.fillText(t.text, t.x, t.y);
        ctx.restore();
      }

      if (!prefersReducedMotion) rafId = window.requestAnimationFrame(step);
    };

    resize();
    if (!prefersReducedMotion) rafId = window.requestAnimationFrame(step);
    else {
      // Render one frame for reduced motion.
      computeEdges(performance.now());
      step(performance.now());
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(rafId);
    };
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

  return (
    <div className="relative bg-[#050816] text-white min-h-screen overflow-hidden">

      {/* SCROLL BAR */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-green-400 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* BACKGROUND */}
      <canvas
        ref={bgRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-black/80 pointer-events-none z-0" />

      <div className="relative z-10">
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between bg-slate-900/60 backdrop-blur-xl border-b border-white/5 rounded-b-2xl shadow-[0_18px_60px_rgba(15,23,42,0.8)]">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight text-green-400 select-none">
            Gaurav<span className="text-slate-400">.dev</span>
          </h1>

          <nav className="flex items-center gap-6 text-sm md:text-base text-slate-300">
            <a href="#about" className="relative hover:text-green-400 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-400 after:transition-all after:duration-300">
              About
            </a>
            <a href="#skills" className="relative hover:text-green-400 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-400 after:transition-all after:duration-300">
              Skills
            </a>
            <a href="#experience" className="relative hover:text-green-400 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-400 after:transition-all after:duration-300">
              Experience
            </a>
            <a href="#projects" className="relative hover:text-green-400 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-400 after:transition-all after:duration-300">
              Projects
            </a>
            <a href="#contact" className="relative hover:text-green-400 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-400 after:transition-all after:duration-300">
              Contact
            </a>

            <a
              href="/resume.pdf"
              download
              className="px-4 py-2 rounded-full border border-emerald-400/70 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-400 hover:text-slate-950 hover:shadow-[0_0_35px_rgba(52,211,153,0.55)] transition-colors transition-transform duration-200 hover:-translate-y-0.5"
            >
              Resume
            </a>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-28 md:pt-32 max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.9, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xs md:text-sm uppercase tracking-[0.25em] text-emerald-300/80 mb-3"
          >
            Hi, I'm <span className="font-semibold text-emerald-300">Gaurav</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold md:font-bold leading-tight tracking-tight"
          >
            <span className="block text-slate-200">
              Building Modern
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-500 text-transparent bg-clip-text">
              Web Experiences
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="mt-5 text-sm md:text-base text-slate-300/80 max-w-xl"
          >
            Frontend-focused developer crafting interactive, performant interfaces with{" "}
            <span className="text-emerald-300">React</span>,{" "}
            <span className="text-emerald-300">JavaScript</span>, and{" "}
            <span className="text-emerald-300">modern UI engineering</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-7 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 px-7 py-2.5 text-sm font-semibold shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:shadow-[0_0_40px_rgba(16,185,129,0.9)] transition-transform transition-shadow duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/70 bg-slate-900/40 px-7 py-2.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-400 hover:text-slate-950 hover:shadow-[0_0_30px_rgba(52,211,153,0.6)] transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.08, y: [0, -8, 0] }}
          transition={{ delay: 0.6, duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-6 md:right-10 bottom-10 text-[72px] md:text-[96px] lg:text-[110px] font-black tracking-[0.2em] text-emerald-400/20"
        >
          GAURAV
        </motion.h1>

      </section>

      {/* ABOUT */}
      <motion.section id="about" className="px-10 mt-32 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}>
        
        <h2 className="text-3xl mb-4">About<span className="text-green-400"></span></h2>

        <div className="space-y-4 text-gray-400 max-w-2xl">
          <p>I am a Computer Science Engineering student at SPPU, Pune, passionate about building modern web applications.</p>
          <p>I enjoy solving real-world problems through code and creating clean, interactive user interfaces.</p>
          <p>Currently working on an IPL Auction system and improving my development and problem-solving skills.</p>
          <p className="text-green-400">🚀 Seeking Front-End Developer internship opportunities.</p>
        </div>

      </motion.section>

      {/* SKILLS */}
      <motion.section
        id="skills"
        className="px-6 mt-32 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >

        <h2 className="text-3xl md:text-4xl mb-6 font-semibold tracking-tight">
          Skills<span className="text-emerald-400"></span>
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-gray-200">
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-emerald-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-4 flex flex-col gap-2"
          >
            <div className="inline-flex items-center gap-2 text-emerald-300 text-sm font-medium">
              <FaCode className="text-emerald-300/90" />
              Programming
            </div>
            <p className="text-xs md:text-sm text-slate-300/80">
              Python • C • C# • Arduino
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-cyan-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-4 flex flex-col gap-2"
          >
            <div className="inline-flex items-center gap-2 text-cyan-300 text-sm font-medium">
              <FaGlobe className="text-cyan-300/90" />
              Web
            </div>
            <p className="text-xs md:text-sm text-slate-300/80">
              HTML • CSS • JavaScript • React
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-indigo-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-4 flex flex-col gap-2"
          >
            <div className="inline-flex items-center gap-2 text-indigo-300 text-sm font-medium">
              <FaTools className="text-indigo-300/90" />
              Tools
            </div>
            <p className="text-xs md:text-sm text-slate-300/80">
              Git • VS Code • Pandas • NumPy
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-violet-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl p-4 flex flex-col gap-2"
          >
            <div className="inline-flex items-center gap-2 text-violet-300 text-sm font-medium">
              <span className="inline-block h-2 w-2 rounded-full bg-violet-300/90 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
              Domains
            </div>
            <p className="text-xs md:text-sm text-slate-300/80">
              Frontend • Data Analytics • Embedded Systems
            </p>
          </motion.div>
        </div>

      </motion.section>

      {/* EXPERIENCE */}
      <motion.section
        id="experience"
        className="px-6 mt-32 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >

        <h2 className="text-3xl md:text-4xl mb-6 font-semibold tracking-tight">
          Experience<span className="text-emerald-400"></span>
        </h2>

        <div className="rounded-2xl bg-slate-900/70 border border-emerald-400/15 shadow-[0_18px_60px_rgba(15,23,42,0.95)] backdrop-blur-xl p-6 md:p-7 text-slate-200">
          <h3 className="text-emerald-300 text-lg font-semibold">Software Support Intern</h3>
          <p className="text-xs md:text-sm mb-3 text-slate-400/90">LAMCO Transformers • 2025</p>
          <ul className="list-disc ml-5 space-y-2 text-sm text-slate-200/85">
            <li>Worked on system troubleshooting and on-site software support for production systems.</li>
            <li>Handled PLC programming and automation logic to improve reliability and monitoring.</li>
            <li>Optimized internal workflows and reporting, reducing manual overhead for engineering teams.</li>
          </ul>
        </div>

      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="px-6 mt-32 space-y-10 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >

        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Projects<span className="text-emerald-400"></span></h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* IPL */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group p-6 bg-slate-900/70 rounded-2xl border border-emerald-400/20 shadow-[0_24px_80px_rgba(15,23,42,1)] transition duration-300 hover:shadow-[0_0_60px_rgba(34,197,94,0.55)]"
          >
            <p className="inline-flex items-center gap-2 text-yellow-400 text-[0.7rem] uppercase tracking-[0.2em] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
              Featured Project
            </p>
            <h3 className="text-xl font-semibold text-slate-50 mb-1.5">IPL Auction System</h3>
            <p className="text-gray-300 mb-4 text-sm">
  Full-fledged IPL Auction Simulator with real-time bidding logic, team purse tracking, player pools, and auto-bidding AI teams.
</p>

<ul className="text-sm text-gray-500 mb-4 space-y-1">
  <li>• Real-time bidding system</li>
  <li>• Team purse management</li>
  <li>• Auto-bidding AI teams</li>
  <li>• Player auction simulation</li>
  <li>• Multi-team participation</li>
  
</ul> 

<p className="text-sm text-emerald-300 mb-4">
  React • JavaScript • Node.js • State Management
</p> 
            <div className="flex gap-4 mt-4">

  <a
    href="https://github.com/Gaurav-29-eng/ipl-auction"
    target="_blank"
    className="px-4 py-2 border border-emerald-400 rounded-full text-sm text-emerald-200 hover:bg-emerald-400 hover:text-slate-950 hover:shadow-[0_0_25px_rgba(52,211,153,0.7)] transition-colors transition-transform duration-200 hover:-translate-y-0.5"
  >
    GitHub
  </a>

  <a
    href="https://ipl-auction-hazel.vercel.app/"
    target="_blank"
    className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-sm font-medium hover:shadow-[0_0_28px_rgba(52,211,153,0.9)] transition-transform transition-colors duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
  >
    Live
  </a>

</div>
          </motion.div>

          {/* PORTFOLIO */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group p-6 bg-slate-900/70 rounded-2xl border border-emerald-400/20 shadow-[0_24px_80px_rgba(15,23,42,1)] transition duration-300 hover:shadow-[0_0_60px_rgba(34,197,94,0.55)]"
          >
            <h3 className="text-xl font-semibold text-slate-50">Portfolio Website</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Modern responsive portfolio website showcasing projects, skills, and experience with smooth animations and interactive UI.
            </p>

            <ul className="text-sm text-gray-400 mb-4 space-y-1">
              <li>• Responsive design for all devices</li>
              <li>• Smooth animations and transitions</li>
              <li>• Interactive project showcase section</li>
              <li>• Clean UI with modern dark theme</li>
              <li>• Contact form / easy navigation</li>
            </ul>

            <p className="text-sm text-emerald-300 mb-4">
              React • JavaScript • CSS • Vercel Deployment
            </p>

            <div className="flex gap-4 mt-4">
              <a href="https://github.com/Gaurav-29-eng/gaurav-portfolio" target="_blank"
                className="px-4 py-2 border border-emerald-400 rounded-full text-sm text-emerald-200 hover:bg-emerald-400 hover:text-slate-950 hover:shadow-[0_0_25px_rgba(52,211,153,0.7)] transition-colors transition-transform duration-200 hover:-translate-y-0.5">
                GitHub
              </a>
              <a href="https://gaurav-portfolio-roan.vercel.app/" target="_blank"
                className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-sm font-medium hover:shadow-[0_0_28px_rgba(52,211,153,0.9)] transition-transform transition-colors duration-200 hover:-translate-y-0.5 hover:scale-[1.03]">
                Live
              </a>
            </div>
          </motion.div>

        </div>

      </motion.section>

      {/* CONTACT */}
      <motion.section id="contact" className="px-10 mt-32 pb-32 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }}>

        <h2 className="text-3xl mb-4">Contact<span className="text-green-400"></span></h2>

        <div className="flex gap-6 text-lg text-gray-400 mb-6">
          <a href="https://github.com/Gaurav-29-eng"><FaGithub /></a>
          <a href="https://linkedin.com"><FaLinkedin /></a>
          <a href="mailto:your@email.com"><FaEnvelope /></a>
          <a href="tel:+91XXXXXXXXXX"><FaPhone /></a>
        </div>

        <form onSubmit={sendEmail} className="flex flex-col gap-4 max-w-md">
          <input name="name" placeholder="Name" className="p-3 bg-[#0f172a] rounded" required />
          <input name="email" placeholder="Email" className="p-3 bg-[#0f172a] rounded" required />
          <textarea name="message" placeholder="Message" className="p-3 bg-[#0f172a] rounded h-32" required />
          <button className="bg-green-500 text-black p-2 rounded">Send</button>
        </form>

      </motion.section>

      </div>
    </div>
  );
}
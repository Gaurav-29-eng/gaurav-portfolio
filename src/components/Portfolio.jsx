import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import emailjs from "emailjs-com";

export default function Portfolio() {

  const { scrollYProgress, scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 80]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

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
    <div className="relative bg-[#020617] text-white min-h-screen overflow-hidden">

      {/* SCROLL BAR */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-green-400 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* BACKGROUND */}
      <motion.div style={{ y: y1 }} className="absolute w-[500px] h-[500px] bg-green-500 opacity-10 blur-[120px] top-[-100px] left-[20%]" />
      <motion.div style={{ y: y2 }} className="absolute w-[400px] h-[400px] bg-green-400 opacity-10 blur-[120px] bottom-[-100px] right-[20%]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none"></div>

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full flex justify-between px-10 py-5 z-50 bg-black/40 backdrop-blur-md">
        <h1 className="text-lg font-semibold text-green-400">Gaurav</h1>

        <div className="flex items-center gap-6 text-gray-400">
          <a href="#about" className="hover:text-green-400">About</a>
          <a href="#skills" className="hover:text-green-400">Skills</a>
          <a href="#experience" className="hover:text-green-400">Experience</a>
          <a href="#projects" className="hover:text-green-400">Projects</a>
          <a href="#contact" className="hover:text-green-400">Contact</a>

          <a
            href="/resume.pdf"
            download
            className="px-4 py-2 border border-green-500 rounded text-green-400 hover:bg-green-500 hover:text-black transition"
          >
            Resume
          </a>
        </div>
      </div>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-10 pt-24 max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
              Gaurav
            </span>
            <br />
            <span className="text-gray-300">
              I build interactive experiences
            </span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-md">
            Computer Science student passionate about building modern web apps and real-world solutions.
          </p>

          <div className="mt-6 flex gap-4">
            <a href="#projects" className="bg-green-500 text-black px-6 py-2 rounded hover:scale-105 transition">
              View Projects
            </a>
            <a href="#contact" className="border border-green-500 px-6 py-2 rounded hover:bg-green-500 hover:text-black transition">
              Contact Me
            </a>
          </div>
        </motion.div>

        <h1 className="absolute text-[100px] font-bold text-green-500 opacity-5 right-10 bottom-10 pointer-events-none">
          GAURAV
        </h1>

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
      <motion.section id="skills" className="px-10 mt-32 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}>

        <h2 className="text-3xl mb-6">Skills<span className="text-green-400"></span></h2>

        <div className="grid md:grid-cols-2 gap-8 text-gray-400">
          <div><h3 className="text-green-400">Programming</h3><p>Python, C, C#, Arduino</p></div>
          <div><h3 className="text-green-400">Web</h3><p>HTML, CSS, JavaScript, React</p></div>
          <div><h3 className="text-green-400">Tools</h3><p>Git, VS Code, Pandas, NumPy</p></div>
          <div><h3 className="text-green-400">Domains</h3><p>Frontend, Data Analytics, Embedded Systems</p></div>
        </div>

      </motion.section>

      {/* EXPERIENCE */}
      <motion.section id="experience" className="px-10 mt-32 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }}>

        <h2 className="text-3xl mb-6">Experience<span className="text-green-400"></span></h2>

        <div className="bg-[#0f172a] p-6 rounded-xl text-gray-400">
          <h3 className="text-green-400">Software Support Intern</h3>
          <p className="text-sm mb-2">LAMCO Transformers (2025)</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Worked on system troubleshooting and software support</li>
            <li>Handled PLC programming and automation tasks</li>
            <li>Improved workflow efficiency and reporting</li>
          </ul>
        </div>

      </motion.section>

      {/* PROJECTS */}
      <motion.section id="projects" className="px-10 mt-32 space-y-10 max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }}>

        <h2 className="text-3xl">Projects<span className="text-green-400"></span></h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* IPL */}
          <div className="p-6 bg-[#0f172a] rounded-xl">
            <p className="text-yellow-400 text-xs mb-2">● IN DEVELOPMENT</p>
            <h3 className="text-xl">IPL Auction System</h3>
            <p className="text-gray-400">
  Real-time IPL auction system with dynamic bidding and team purse management.
</p>
            <div className="flex gap-4 mt-4">

  <a 
    href="https://github.com/Gaurav-29-eng/ipl-auction"
    target="_blank"
    className="px-4 py-2 border border-green-500 rounded hover:bg-green-500 hover:text-black transition"
  >
    GitHub
  </a>

  <a 
    href="https://ipl-auction-hazel.vercel.app/"
    target="_blank"
    className="px-4 py-2 bg-green-500 text-black rounded hover:scale-105 transition"
  >
    Live
  </a>

</div>
          </div>

          {/* PORTFOLIO */}
          <div className="p-6 bg-[#0f172a] rounded-xl">
            <h3 className="text-xl">Portfolio Website</h3>
            <p className="text-gray-400">Modern portfolio with animations.</p>
            <div className="flex gap-4 mt-4">
              <a href="https://github.com/Gaurav-29-eng/gaurav-portfolio" target="_blank"
                className="px-4 py-2 border border-green-500 rounded">GitHub</a>
              <a href="https://gaurav-portfolio-roan.vercel.app/" target="_blank"
                className="px-4 py-2 bg-green-500 text-black rounded">Live</a>
            </div>
          </div>

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
  );
}
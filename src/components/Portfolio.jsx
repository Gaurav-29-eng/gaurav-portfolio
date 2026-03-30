import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import emailjs from "emailjs-com";

export default function Portfolio() {

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

         {/* CYBER GLOW */}
        <div className="absolute w-[600px] h-[600px] bg-green-500 opacity-10 blur-[150px] top-[-100px] left-[20%] pointer-events-none"></div>

        <div className="absolute w-[400px] h-[400px] bg-green-400 opacity-10 blur-[150px] bottom-[-100px] right-[20%] pointer-events-none"></div>
        

        {/* TECH GLOW */}
<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
  <div className="absolute w-[500px] h-[500px] bg-green-500 opacity-10 blur-[120px] top-[-100px] left-[20%]"></div>
  <div className="absolute w-[400px] h-[400px] bg-green-400 opacity-10 blur-[120px] bottom-[-100px] right-[20%]"></div>
</div>

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full flex justify-between px-10 py-5 z-50 bg-black/40 backdrop-blur-md">
        <h1 className="text-lg font-semibold text-green-400">Gaurav</h1>

        <div className="space-x-6 text-gray-400">
          <a href="#about" className="hover:text-green-400">About</a>
          <a href="#projects" className="hover:text-green-400">Projects</a>
          <a href="#contact" className="hover:text-green-400">Contact</a>
        </div>
      </div>

      {/* HERO */}

      <section className="relative min-h-screen flex items-center px-10 pt-24">

        <div className="grid md:grid-cols-2 gap-10 w-full">

          {/* LEFT */}
          <div>
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
              I design and develop modern web applications with creativity, performance, and real-world impact.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Available for internships • Open to opportunities
            </p>

            <div className="mt-6 flex gap-4">
              <a href="#projects" className="bg-green-500 text-black px-6 py-2 rounded">
                View Projects
              </a>
              <a href="#contact" className="border border-green-500 px-6 py-2 rounded">
                Contact Me
              </a>
            </div>
          </div>

          {/* RIGHT (EMPTY FOR NOW) */}
          <div></div>

        </div>

        {/* BACKGROUND TEXT */}
        <h1 className="absolute text-[100px] font-bold text-green-500 opacity-10 right-10 bottom-10 pointer-events-none select-none">
  GAURAV
</h1>

      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="px-10 mt-20"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl mb-4">About Me</h2>
        <p className="text-gray-400 max-w-xl">
          Passionate developer focused on building unique UI and real-world projects.
        </p>
      </motion.section>

      {/* PROJECTS */}
      <section id="projects" className="px-10 mt-32 space-y-10">

        <h2 className="text-4xl font-semibold">
          Projects<span className="text-green-400">.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* IPL PROJECT */}
          <div className="group p-6 bg-[#0f172a] rounded-xl hover:-translate-y-2 transition duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]">

            <p className="text-xs text-yellow-400 mb-2">● IN DEVELOPMENT</p>

            <h3 className="text-2xl font-semibold mb-2 group-hover:text-green-400 transition">
              IPL Auction System
            </h3>

            <p className="text-gray-400 mb-4">
              Multiplayer bidding system with real-time logic and player auction simulation.
            </p>

            <p className="text-sm text-green-400 mb-4">
              React • JavaScript • Node.js
            </p>

            <div className="flex gap-4">
              <span className="px-4 py-2 border border-gray-600 text-gray-400 rounded">
                GitHub
              </span>

              <span className="px-4 py-2 bg-gray-700 text-gray-300 rounded">
                Coming Soon
              </span>
            </div>
          </div>

          {/* PORTFOLIO PROJECT */}
          <div className="group p-6 bg-[#0f172a] rounded-xl hover:-translate-y-2 transition duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]">

            <h3 className="text-2xl font-semibold mb-2 group-hover:text-green-400 transition">
              Portfolio Website
            </h3>

            <p className="text-gray-400 mb-4">
              Creative developer portfolio with smooth animations and modern UI design.
            </p>

            <p className="text-sm text-green-400 mb-4">
              React • Tailwind • Framer Motion
            </p>

            <div className="flex gap-4">
              <a 
                href="https://github.com/Gaurav-29-eng/gaurav-portfolio"
                target="_blank"
                className="px-4 py-2 border border-green-500 rounded hover:bg-green-500 hover:text-black transition"
              >
                GitHub
              </a>

              <a 
                href="https://gaurav-portfolio-roan.vercel.app/"
                target="_blank"
                className="px-4 py-2 bg-green-500 text-black rounded hover:scale-105 transition"
              >
                Live
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-10 mt-32 space-y-6">

        <h2 className="text-4xl font-semibold">
          Get in <span className="text-green-400">Touch</span>
        </h2>

        <p className="text-gray-400 max-w-xl">
          Feel free to reach out for collaboration or opportunities.
        </p>

        {/* ICONS */}
        <div className="flex gap-6 text-gray-400 text-lg">

          <a href="https://github.com/Gaurav-29-eng" target="_blank">
            <FaGithub />
          </a>

          <a href="https://linkedin.com/in/gaurav-salunke-cse27" target="_blank">
            <FaLinkedin />
          </a>

          <a href="mailto:salunkegaurav2915@gmail.com">
            <FaEnvelope />
          </a>

          <a href="tel:+919370574295">
            <FaPhone />
          </a>

        </div>

        {/* FORM */}
        <form onSubmit={sendEmail} className="flex flex-col gap-4 max-w-md">

          <input type="text" name="name" placeholder="Your Name" className="p-3 bg-[#0f172a] rounded" required />
          <input type="email" name="email" placeholder="Your Email" className="p-3 bg-[#0f172a] rounded" required />
          <textarea name="message" placeholder="Your Message" className="p-3 bg-[#0f172a] rounded h-32" required />

          <button className="bg-green-500 text-black px-4 py-2 rounded">
            Send Message
          </button>

        </form>

      </section>

    </div>
  );
}
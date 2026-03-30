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
    () => {
      alert("Message sent successfully 🚀");
    },
    () => {
      alert("Failed to send message ❌");
    }
  );

  e.target.reset();
};

  return (
    <div className="relative z-10 bg-[#020617] text-white min-h-screen overflow-hidden">

        {/* ✅ NAVBAR GOES HERE */}
    <div className="fixed top-0 left-0 w-full flex justify-between px-10 py-5 z-20 bg-black/30 backdrop-blur-md">
      <h1 className="text-green-400 font-bold">Gaurav</h1>
      <div className="space-x-6 text-gray-400">
        <span className="hover:text-green-400 cursor-pointer">About</span>
        <span className="hover:text-green-400 cursor-pointer">Projects</span>
        <span className="hover:text-green-400 cursor-pointer">Contact</span>
        <button className="hover-target hover:text-green-400 transition"></button>
      </div>
    </div>

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-green-500 opacity-20 blur-[160px] top-[-100px] left-[30%] animate-pulse"></div>

      <div className="relative px-10 pt-32 pb-20 space-y-40">

        {/* HERO */}
        <motion.section
  initial={{ opacity: 0, y: 80 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  id="home"
>

  <h1 className="text-6xl md:text-7xl font-bold leading-tight">
    Hi, I'm <span className="text-green-400">Gaurav</span>
  </h1>

  <p className="text-xl mt-6 text-gray-400 max-w-xl leading-relaxed">
    Computer Science student focused on building real-world systems and solving practical problems through code.
  </p>

  {/* BUTTONS */}

  <p className="mt-6 text-sm text-gray-500">
  Available for internships • Open to opportunities
</p>

  <div className="mt-8 flex gap-4">
    <button className="px-6 py-3 bg-green-500 text-black rounded-lg font-semibold hover:scale-105 transition">
      View Projects
    </button>

    <button className="px-6 py-3 border border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition">
      Contact Me
    </button>
  </div>

</motion.section>

        {/* ABOUT */}
        <motion.section
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl mb-4">About Me</h2>
          <p className="text-gray-400 max-w-xl">
            Passionate developer focused on building unique UI and real-world projects.
          </p>
        </motion.section>

        {/* PROJECTS */}
        <section id="projects" className="space-y-10 mt-32">

  <p className="text-xs text-yellow-400 mb-2 tracking-wide">
  ● IN DEVELOPMENT
</p>

  <div className="grid md:grid-cols-2 gap-8">

    {/* PROJECT 1 */}
    <div className="group p-6 bg-[#0f172a] rounded-xl border border-transparent 
hover:border-green-500 transition duration-300 
hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] 
hover:-translate-y-2">

      <h3 className="text-2xl font-semibold mb-2">
        IPL Auction System
      </h3>

      <p className="text-gray-400 mb-4">
        Multiplayer bidding system with real-time logic and player auction simulation.
      </p>

      {/* TECH STACK */}
      <p className="text-sm text-green-400 mb-4">
        React • JavaScript • Node.js
      </p>

      {/* BUTTONS */}
      <div className="flex gap-4">

        <a 
          href="https://github.com/YOUR_USERNAME/YOUR_PROJECT"
          target="_blank"
          className="px-4 py-2 border border-green-500 rounded 
hover:bg-green-500 hover:text-black 
transition duration-300"
        >
          GitHub
        </a>

        <a 
          href="#"
          className="px-4 py-2 bg-green-500 text-black rounded 
hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] 
transition duration-300"
        >
          Live
        </a>

      </div>

    </div>

    {/* PROJECT 2 */}
    <div className="group p-6 bg-[#0f172a] rounded-xl border border-transparent hover:border-green-500 transition duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]">

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
  rel="noopener noreferrer"
>
  GitHub
</a>

        <a 
  href="https://gaurav-portfolio-roan.vercel.app/" 
  target="_blank"
  rel="noopener noreferrer"
  className="px-4 py-2 bg-green-500 text-black rounded hover:scale-105 transition"
>
  Live
</a>

      </div>

    </div>

  </div>

</section>


    {/* CONTACTS */}
        <section id="contact" className="space-y-6 mt-32">

  <h2 className="text-4xl font-semibold">
  Get in <span className="text-green-400">Touch</span>
</h2>
  <p className="text-gray-400 max-w-xl">
    Feel free to reach out for collaboration, opportunities, or just a quick chat.
  </p>

  {/* ICON LINKS */}
  <div className="flex gap-6 text-lg">
    <div className="hover:text-green-400 transition text-gray-400">
        
    </div>

  {/* GitHub */}
  <div className="group relative">
    <a href="https://github.com/Gaurav-29-eng" target="_blank"
      className="text-gray-400 text-lg hover:text-green-400 transition duration-300">
      <FaGithub />
    </a>
    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
      GitHub
    </span>
  </div>

  {/* LinkedIn */}
  <div className="group relative">
    <a href="https://linkedin.com/in/gaurav-salunke-cse27" target="_blank"
      className="text-gray-400 text-lg hover:text-green-400 transition duration-300">
      <FaLinkedin />
    </a>
    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
      LinkedIn
    </span>
  </div>

  {/* Email */}
  <div className="group relative">
    <a href="mailto:salunkegaurav2915@gmail.com?subject=Contact from Portfolio"
      className="text-gray-400 text-lg hover:text-green-400 transition duration-300">
      <FaEnvelope />
    </a>
    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
      Email
    </span>
  </div>

  {/* Phone */}
  <div className="group relative">
    <a href="tel:+919370574295"
      className="text-gray-400 text-lg hover:text-green-400 transition duration-300">
      <FaPhone />
    </a>
    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
      Call
    </span>
  </div>

</div>

{/* IFORM */}
  <form onSubmit={sendEmail} className="flex flex-col gap-4 max-w-md mt-6">

  <input 
    type="text" 
    name="name"
    placeholder="Your Name"
    className="p-3 bg-[#0f172a] rounded text-white"
    required
  />

  <input 
    type="email" 
    name="email"
    placeholder="Your Email"
    className="p-3 bg-[#0f172a] rounded text-white"
    required
  />

  <textarea 
    name="message"
    placeholder="Your Message"
    className="p-3 bg-[#0f172a] rounded h-32 text-white"
    required
  />

  <button 
    type="submit"
    className="bg-green-500 text-black px-4 py-2 rounded hover:scale-105 transition"
  >
    Send Message
  </button>

</form>

  {/* RESUME BUTTON */}
  <a 
    href="/resume.pdf" 
    download 
    className="inline-block mt-6 px-6 py-3 bg-green-500 text-black rounded-lg font-semibold hover:scale-105 transition"
  >
    Download Resume
  </a>

</section>

      </div>
    </div>
  );
}
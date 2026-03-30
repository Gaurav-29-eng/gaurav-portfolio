import { useState, useEffect, useRef } from "react";

const BOOT_LINES = [
  "Booting system...",
  "Loading AI modules...",
  "Injecting creativity...",
  "Welcome Gaurav 🚀"
];

export default function Terminal({ onEnter }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [booting, setBooting] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const terminalRef = useRef(null);

  const commandList = ["help", "about", "skills", "projects", "contact", "enter"];

  const commands = {
    help: "Commands: about, skills, projects, contact, enter",
    about: "I am Gaurav, a creative developer.",
    skills: "Python | C++ | React | DSA",
    projects: "IPL Auction App | Portfolio",
    contact: "Email: your@email.com"
  };

  // Auto scroll
  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  // Boot animation
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setHistory((prev) => [...prev, BOOT_LINES[i]]);
      i++;

      if (i === BOOT_LINES.length) {
        clearInterval(interval);
        setBooting(false);
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.toLowerCase();

      // SPECIAL ENTER COMMAND 🚀
      if (cmd === "enter") {
        setHistory((prev) => [...prev, "> enter", "Access granted..."]);

        setTimeout(() => {
         onEnter();   // 🔥 THIS IS THE MAGIC
       }, 800);

       setInput("");
       return;
     }

      const output = commands[cmd] || "Command not found";

      setHistory((prev) => [...prev, `> ${input}`, output]);
      setInput("");
      setSuggestions([]);
    }
  };

  return (
    <div
      ref={terminalRef}
      className="bg-[#020617]/80 backdrop-blur-xl text-green-400 rounded-2xl w-[90%] max-w-[900px] h-[500px] shadow-[0_0_60px_rgba(34,197,94,0.4)] border border-green-500 overflow-hidden"
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border-b border-green-500">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="ml-4 text-sm text-green-300">
          gaurav@portfolio:~
        </span>
      </div>

      {/* Terminal content */}
      <div className="p-4 h-full overflow-y-auto font-mono">

        {/* SYSTEM LABEL */}
        <p className="text-green-600 text-xs mb-2">
          SYSTEM: GAURAV_OS v1.0
        </p>

        {history.map((line, index) => (
          <p key={index} className="tracking-wide leading-relaxed">
            {line}
          </p>
        ))}

        {!booting && (
          <>
            <div className="flex items-center mt-2">
              <span>&gt;</span>
              <input
                className="bg-transparent outline-none ml-2 flex-1 caret-green-400"
                value={input}
                onChange={(e) => {
                  const value = e.target.value;
                  setInput(value);

                  const filtered = commandList.filter(cmd =>
                    cmd.startsWith(value.toLowerCase())
                  );

                  setSuggestions(filtered);
                }}
                onKeyDown={handleCommand}
                onFocus={(e) => {
                  e.target.parentElement.parentElement.style.boxShadow =
                    "0 0 80px rgba(34,197,94,0.6)";
                }}
                onBlur={(e) => {
                  e.target.parentElement.parentElement.style.boxShadow =
                    "0 0 40px rgba(34,197,94,0.3)";
                }}
                autoFocus
              />
              <span className="animate-pulse ml-1">|</span>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="text-green-500 mt-2 text-sm opacity-70">
                {suggestions.join("   ")}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
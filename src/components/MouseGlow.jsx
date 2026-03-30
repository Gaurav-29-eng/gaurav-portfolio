import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        width: "400px",
        height: "400px",
        background: `
          radial-gradient(circle at center,
            rgba(34,197,94,0.35) 0%,
            rgba(34,197,94,0.15) 20%,
            rgba(34,197,94,0.08) 40%,
            transparent 70%
          )
        `,
        filter: "blur(40px)",
      }}
    />
  );
}
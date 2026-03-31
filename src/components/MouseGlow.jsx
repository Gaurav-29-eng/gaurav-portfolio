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
        left: pos.x - 50,
        top: pos.y - 50,
        width: "100px",
        height: "100px",
        background: `
          radial-gradient(circle at center,
            rgba(6, 182, 212, 0.12) 0%,
            rgba(6, 182, 212, 0.04) 40%,
            transparent 70%
          )
        `,
        filter: "blur(12px)",
      }}
    />
  );
}
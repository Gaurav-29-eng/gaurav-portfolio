import { useEffect, useState, useRef } from "react";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Smooth easing with lerp
  useEffect(() => {
    const animate = () => {
      setSmoothPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.08,
        y: prev.y + (pos.y - prev.y) * 0.08,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pos]);

  return (
    <>
      {/* Primary soft glow - large radius */}
      <div
        className="pointer-events-none fixed z-40"
        style={{
          left: smoothPos.x - 150,
          top: smoothPos.y - 150,
          width: "300px",
          height: "300px",
          background: `
            radial-gradient(circle at center,
              rgba(6, 182, 212, 0.08) 0%,
              rgba(59, 130, 246, 0.05) 30%,
              transparent 60%
            )
          `,
          filter: "blur(40px)",
          transition: "opacity 0.3s ease",
        }}
      />
      
      {/* Secondary inner glow - smaller, brighter core */}
      <div
        className="pointer-events-none fixed z-40"
        style={{
          left: smoothPos.x - 60,
          top: smoothPos.y - 60,
          width: "120px",
          height: "120px",
          background: `
            radial-gradient(circle at center,
              rgba(6, 182, 212, 0.15) 0%,
              rgba(6, 182, 212, 0.05) 50%,
              transparent 70%
            )
          `,
          filter: "blur(20px)",
        }}
      />
    </>
  );
}
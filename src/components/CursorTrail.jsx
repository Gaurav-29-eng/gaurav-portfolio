import { useEffect, useState } from "react";

export default function CursorTrail() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  useEffect(() => {
    let frame;
    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[100]"
        style={{ 
          transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)`,
          boxShadow: "0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)"
        }}
      />

      {/* Inner trail ring */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[99]"
        style={{ 
          transform: `translate(${trail.x - 16}px, ${trail.y - 16}px)`,
          background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
          boxShadow: "0 0 30px rgba(34, 211, 238, 0.3), inset 0 0 10px rgba(34, 211, 238, 0.2)"
        }}
      />

      {/* Outer glow ring */}
      <div
        className="fixed w-12 h-12 rounded-full pointer-events-none z-[98]"
        style={{ 
          transform: `translate(${trail.x - 16 + (pos.x - trail.x) * 0.3}px, ${trail.y - 16 + (pos.y - trail.y) * 0.3}px)`,
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)"
        }}
      />
    </>
  );
}
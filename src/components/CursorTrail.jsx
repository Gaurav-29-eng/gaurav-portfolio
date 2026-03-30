import { useEffect, useState } from "react";

export default function CursorTrail() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    let frame;

    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [pos]);

  return (
    <>
      <div
        className="fixed w-2 h-2 bg-green-400 rounded-full pointer-events-none z-50"
        style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)` }}
      />

      <div
        className="fixed w-[25px] h-[25px] border border-green-400 rounded-full pointer-events-none z-40 opacity-30"
        style={{ transform: `translate(${trail.x - 12}px, ${trail.y - 12}px)` }}
      />
    </>
  );
}
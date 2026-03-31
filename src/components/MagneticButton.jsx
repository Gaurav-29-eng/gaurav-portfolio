import { useRef, useState, useEffect } from "react";

export default function MagneticButton({ children, className = "", strength = 0.3 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from cursor to center
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Check if cursor is within magnetic range (150px)
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDistance = 150;

      if (distance < maxDistance) {
        // Magnetic pull strength increases as cursor gets closer
        const pull = (1 - distance / maxDistance) * strength;
        setPosition({
          x: distX * pull,
          y: distY * pull,
        });
        setIsHovered(true);
      } else {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? "transform 0.15s ease-out" : "transform 0.4s ease-out",
      }}
    >
      {children}
    </div>
  );
}

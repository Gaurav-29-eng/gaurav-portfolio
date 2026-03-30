import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Create nodes with depth layers for parallax effect
    const nodeCount = Math.max(20, Math.floor(Math.min(width, height) / 20));
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const depth = Math.random(); // 0 = far, 1 = near
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (0.3 + depth * 0.8),
        vy: (Math.random() - 0.5) * (0.3 + depth * 0.8),
        baseVx: (Math.random() - 0.5) * (0.2 + depth * 0.5),
        baseVy: (Math.random() - 0.5) * (0.2 + depth * 0.5),
        radius: 1.5 + depth * 2.5,
        hue: Math.random() > 0.5 ? 180 : 280,
        pulseOffset: Math.random() * Math.PI * 2,
        depth: depth,
        parallaxX: 0,
        parallaxY: 0,
      });
    }

    let frameCount = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const animate = () => {
      frameCount++;
      
      // Smooth parallax easing
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.05;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.05;
      
      // Semi-transparent clear for trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Cursor glow effect
      if (mouseX > 0) {
        const cursorGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180);
        cursorGradient.addColorStop(0, 'rgba(6, 182, 212, 0.06)');
        cursorGradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)');
        cursorGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorGradient;
        ctx.fillRect(mouseX - 180, mouseY - 180, 360, 360);
      }

      // Update target parallax based on mouse position
      if (mouseX > 0 && mouseY > 0) {
        const centerX = width / 2;
        const centerY = height / 2;
        targetParallaxX = (mouseX - centerX) / centerX;
        targetParallaxY = (mouseY - centerY) / centerY;
      }

      // Update each node
      nodes.forEach((node) => {
        // Apply base velocity
        node.x += node.baseVx;
        node.y += node.baseVy;
        
        // Apply dynamic velocity
        node.x += node.vx;
        node.y += node.vy;
        
        // Add organic floating motion
        node.x += Math.sin(frameCount * 0.015 + node.pulseOffset) * 0.3;
        node.y += Math.cos(frameCount * 0.012 + node.pulseOffset) * 0.3;

        // Parallax effect - deeper layers move less
        const parallaxStrength = node.depth * 25;
        node.parallaxX = currentParallaxX * parallaxStrength;
        node.parallaxY = currentParallaxY * parallaxStrength;

        // Mouse attraction
        if (mouseX > 0) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200 && dist > 0) {
            const attractionStrength = (1 - dist / 200) * 0.08 * (0.5 + node.depth * 0.5);
            node.vx += (dx / dist) * attractionStrength;
            node.vy += (dy / dist) * attractionStrength;
          }
        }

        // Damping to prevent runaway velocities
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Boundary wrapping with parallax offset
        const effectiveX = node.x + node.parallaxX;
        const effectiveY = node.y + node.parallaxY;
        
        if (effectiveX < 20) {
          node.x = 20 - node.parallaxX;
          node.baseVx = Math.abs(node.baseVx);
          node.vx = Math.abs(node.vx) * 0.5;
        }
        if (effectiveX > width - 20) {
          node.x = width - 20 - node.parallaxX;
          node.baseVx = -Math.abs(node.baseVx);
          node.vx = -Math.abs(node.vx) * 0.5;
        }
        if (effectiveY < 20) {
          node.y = 20 - node.parallaxY;
          node.baseVy = Math.abs(node.baseVy);
          node.vy = Math.abs(node.vy) * 0.5;
        }
        if (effectiveY > height - 20) {
          node.y = height - 20 - node.parallaxY;
          node.baseVy = -Math.abs(node.baseVy);
          node.vy = -Math.abs(node.vy) * 0.5;
        }
      });

      // Draw connections between nearby nodes (with parallax)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          
          // Apply parallax for drawing
          const drawX1 = nodeA.x + nodeA.parallaxX;
          const drawY1 = nodeA.y + nodeA.parallaxY;
          const drawX2 = nodeB.x + nodeB.parallaxX;
          const drawY2 = nodeB.y + nodeB.parallaxY;
          
          const dx = drawX2 - drawX1;
          const dy = drawY2 - drawY1;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Depth-based connection distance
          const avgDepth = (nodeA.depth + nodeB.depth) / 2;
          let maxDist = 80 + avgDepth * 60;
          
          // Extend connection range near cursor
          if (mouseX > 0) {
            const distToMouseA = Math.sqrt((nodeA.x - mouseX) ** 2 + (nodeA.y - mouseY) ** 2);
            const distToMouseB = Math.sqrt((nodeB.x - mouseX) ** 2 + (nodeB.y - mouseY) ** 2);
            if (distToMouseA < 150 || distToMouseB < 150) {
              maxDist += 40;
            }
          }

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25 * (0.5 + avgDepth * 0.5);
            ctx.beginPath();
            ctx.moveTo(drawX1, drawY1);
            ctx.lineTo(drawX2, drawY2);
            ctx.strokeStyle = `hsla(${nodeA.hue}, 70%, 60%, ${alpha})`;
            ctx.lineWidth = 0.5 + avgDepth * 0.3;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with parallax (sorted by depth for proper layering)
      const sortedNodes = [...nodes].sort((a, b) => a.depth - b.depth);
      
      sortedNodes.forEach((node) => {
        const drawX = node.x + node.parallaxX;
        const drawY = node.y + node.parallaxY;
        const pulse = 1 + Math.sin(frameCount * 0.05 + node.pulseOffset) * 0.15;
        const size = node.radius * pulse;
        
        // Enhanced glow near cursor
        let glowAlpha = 0.08 + node.depth * 0.1;
        if (mouseX > 0) {
          const distToMouse = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2);
          if (distToMouse < 120) {
            glowAlpha += (1 - distToMouse / 120) * 0.15;
          }
        }

        // Outer glow
        ctx.beginPath();
        ctx.arc(drawX, drawY, size * (2.5 + node.depth), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${node.hue}, 70%, 55%, ${glowAlpha})`;
        ctx.fill();

        // Inner glow
        ctx.beginPath();
        ctx.arc(drawX, drawY, size * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${node.hue}, 80%, 65%, ${glowAlpha * 1.8})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${node.hue}, 90%, 80%, ${0.7 + node.depth * 0.25})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(drawX, drawY, size * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      />
    </div>
  );
};

export default AnimatedBackground;

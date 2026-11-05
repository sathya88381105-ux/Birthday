import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  type: 'petal' | 'heart' | 'star';
  color: string;
  opacity: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
}

interface RomanticParticlesProps {
  intensity?: 'gentle' | 'lush' | 'celebration';
}

export const RomanticParticles: React.FC<RomanticParticlesProps> = ({ intensity = 'lush' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = intensity === 'gentle' ? 24 : intensity === 'lush' ? 42 : 65;
    const particles: Particle[] = [];

    const petalColors = ['#f43f5e', '#fb7185', '#fda4af', '#e11d48', '#ffe4e6', '#be123c'];
    const heartColors = ['#e11d48', '#f43f5e', '#ff4d6d', '#ff758f', '#c9184a'];

    for (let i = 0; i < count; i++) {
      const isPetal = Math.random() > 0.35;
      const isStar = !isPetal && Math.random() > 0.6;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isPetal ? 10 + Math.random() * 12 : isStar ? 2 + Math.random() * 3 : 12 + Math.random() * 14,
        speedY: isPetal ? 0.7 + Math.random() * 1.2 : isStar ? 0 : -(0.5 + Math.random() * 1.0), // hearts float up, petals fall down
        speedX: (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        type: isPetal ? 'petal' : isStar ? 'star' : 'heart',
        color: isPetal
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : isStar
          ? '#fffbeb'
          : heartColors[Math.floor(Math.random() * heartColors.length)],
        opacity: isStar ? 0.3 + Math.random() * 0.7 : 0.4 + Math.random() * 0.5,
        swayAmplitude: 15 + Math.random() * 25,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, rot: number) => {
      c.save();
      c.translate(x, y);
      c.rotate((rot * Math.PI) / 180);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // top left curve
      c.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
      // top right curve
      c.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawPetal = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, rot: number) => {
      c.save();
      c.translate(x, y);
      c.rotate((rot * Math.PI) / 180);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(size * 0.6, -size * 0.3, size * 0.4, size * 0.6);
      c.quadraticCurveTo(0, size, -size * 0.4, size * 0.6);
      c.quadraticCurveTo(-size * 0.6, -size * 0.3, 0, -size);
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawStar = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.shadowBlur = 8;
      c.shadowColor = '#ffe4e6';
      c.beginPath();
      c.arc(x, y, size, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (p.type === 'star') {
          // Twinkle effect
          const twinkle = Math.sin(tick * 0.05 + p.swayOffset);
          const currentAlpha = Math.max(0.1, Math.min(0.9, p.opacity + twinkle * 0.3));
          drawStar(ctx, p.x, p.y, p.size, p.color, currentAlpha);
          continue;
        }

        // Sway motion
        const sway = Math.sin(tick * p.swaySpeed + p.swayOffset) * 0.8;
        p.x += p.speedX + sway;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap boundaries
        if (p.type === 'petal') {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          drawPetal(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === 'heart') {
          if (p.y < -30) {
            p.y = height + 30;
            p.x = Math.random() * width;
          }
          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Click anywhere to spawn floating love hearts!
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          size: 14 + Math.random() * 12,
          speedY: -(1.5 + Math.random() * 1.5),
          speedX: (Math.random() - 0.5) * 2,
          rotation: Math.random() * 40 - 20,
          rotationSpeed: (Math.random() - 0.5) * 2,
          type: 'heart',
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
          opacity: 0.9,
          swayAmplitude: 20,
          swaySpeed: 0.03,
          swayOffset: Math.random() * Math.PI,
        });
      }
      if (particles.length > 80) {
        particles.splice(0, 4);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ pointerEvents: 'none' }}
    />
  );
};

import React, { useEffect, useRef } from 'react';

export default function SmokeCanvas({ density = 'medium', className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle count based on density
    const count = density === 'high' ? 45 : density === 'low' ? 18 : 30;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = width * (0.35 + Math.random() * 0.3); // originate near center
        this.y = height * (0.55 + Math.random() * 0.4);
        this.radius = 25 + Math.random() * 60;
        this.baseAlpha = 0.015 + Math.random() * 0.035;
        this.alpha = 0;
        this.maxLife = 220 + Math.random() * 260;
        this.life = 0;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = -(0.35 + Math.random() * 0.55); // rise upwards
        this.growRate = 0.18 + Math.random() * 0.22;
        this.isEmber = Math.random() > 0.72; // gold tobacco dust ember
        if (this.isEmber) {
          this.radius = 1.2 + Math.random() * 2.2;
          this.baseAlpha = 0.25 + Math.random() * 0.5;
          this.vy = -(0.4 + Math.random() * 0.8);
          this.vx = (Math.random() - 0.5) * 0.6;
        }
      }

      update() {
        this.life++;
        this.x += this.vx;
        this.y += this.vy;

        if (!this.isEmber) {
          this.radius += this.growRate;
          this.vx += (Math.random() - 0.5) * 0.04;
        } else {
          this.x += Math.sin(this.life * 0.05) * 0.3;
        }

        // Fade in and out
        const progress = this.life / this.maxLife;
        if (progress < 0.25) {
          this.alpha = (progress / 0.25) * this.baseAlpha;
        } else if (progress > 0.65) {
          this.alpha = (1 - (progress - 0.65) / 0.35) * this.baseAlpha;
        } else {
          this.alpha = this.baseAlpha;
        }

        if (this.life >= this.maxLife || this.y < -100) {
          this.reset();
        }
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        if (this.isEmber) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(223, 186, 115, ${this.alpha})`;
          ctx.shadowColor = 'rgba(197, 160, 89, 0.6)';
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          const grad = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius
          );
          grad.addColorStop(0, `rgba(180, 165, 150, ${this.alpha})`);
          grad.addColorStop(0.5, `rgba(140, 120, 100, ${this.alpha * 0.45})`);
          grad.addColorStop(1, 'rgba(6, 5, 4, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const particles = Array.from({ length: count }, () => {
      const p = new Particle();
      p.life = Math.random() * p.maxLife; // stagger initial state
      return p;
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

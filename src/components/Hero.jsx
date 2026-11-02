import { useState, useEffect, useRef } from 'react';
import { heroRoles, heroBadges } from '../data';

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -2000, y: -2000, targetX: -2000, targetY: -2000 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((i) => (i + 1) % heroRoles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = heroRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let time = 0;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    });
    resizeObserver.observe(container);

    const render = () => {
      time += 0.012;

      const width = container.clientWidth;
      const height = container.clientHeight;
      const pointer = pointerRef.current;

      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const lines = 28;
      const stepY = height / (lines + 1);

      for (let i = 0; i < lines; i++) {
        const yBase = stepY * (i + 1);
        ctx.beginPath();
        const points = 90;
        const stepX = width / points;

        for (let p = 0; p <= points; p++) {
          const x = p * stepX;
          const dx = x - pointer.x;
          const dy = yBase - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = dist < 280 ? (1 - dist / 280) * 40 : 0;

          const wave =
            Math.sin(p * 0.08 + time + i * 0.18) * 16 +
            Math.cos(p * 0.04 - time * 0.7) * 10;
          const y = yBase + wave - influence;

          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = 0.08 + (i / lines) * 0.22;
        // Soft violet/purple wave lines harmonized with background
        ctx.strokeStyle = `rgba(158, 74, 187, ${alpha})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      pointerRef.current.targetX = e.clientX - rect.left;
      pointerRef.current.targetY = e.clientY - rect.top;
    }
  };

  const handleMouseLeave = () => {
    pointerRef.current.targetX = -2000;
    pointerRef.current.targetY = -2000;
  };

  return (
    <section
      ref={heroRef}
      className="hero"
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-bg-dots" />
      <canvas ref={canvasRef} className="hero-wave-canvas" />
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      {/* Floating Badges */}
      <div className="hero-floating-badges">
        {heroBadges.map((badge) => (
          <div key={badge.id} className={`hero-badge ${badge.position}`}>
            <div
              className="hero-badge-icon"
              style={{
                background: badge.iconBg,
                color: badge.iconColor || '#fff',
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>{badge.iconEmoji}</span>
            </div>
            <div>
              {badge.label && <div className="hero-badge-label">{badge.label}</div>}
              <div className="hero-badge-name">{badge.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Title */}
      <div className="hero-main">
        <div className="hero-portfolio-title">
          <div className="hero-title-box">
            <h1 className="hero-title-text">MY PORTFOLIO</h1>

            {/* Mouse pointer cursor at bottom-left of box */}
            <div className="hero-cursor-pointer">
              <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
                <path d="M4 4V28L10.5 21.5L14.5 30L19 28L15 19.5L24 19L4 4Z" fill="#3a004d" stroke="white" strokeWidth="2" />
              </svg>
            </div>

            {/* Role Switcher overlapping the bottom-right letter 'O' */}
            <div className="hero-role-switcher">
              {heroRoles.map((role, i) => (
                <div
                  key={role}
                  className={`hero-role-item ${i === roleIdx ? 'active' : ''}`}
                  onClick={() => setRoleIdx(i)}
                >
                  {role}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Badge */}
      <div className="hero-bottom">
        <div className="hero-presented-by">
          Presented by <strong>Nirmala</strong>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.3rem',
        opacity: 0.5,
        animation: 'float 2s ease-in-out infinite',
      }}>
        <span style={{ fontSize: '0.7rem', fontFamily: 'Space Grotesk, sans-serif', color: '#4B2070', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a004d" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}

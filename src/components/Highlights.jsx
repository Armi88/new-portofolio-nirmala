import { useState, useEffect, useRef } from 'react';
import { highlights } from '../data';

export default function Highlights() {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const autoRef = useRef(null);

  const total = highlights.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    if (isAuto) {
      autoRef.current = setInterval(next, 2500);
    } else {
      clearInterval(autoRef.current);
    }
    return () => clearInterval(autoRef.current);
  }, [isAuto, current]);

  const getCardClass = (idx) => {
    const diff = (idx - current + total) % total;
    if (diff === 0) return 'highlight-card active';
    if (diff === 1) return 'highlight-card next-1';
    if (diff === 2) return 'highlight-card next-2';
    return 'highlight-card hidden';
  };

  const scatteredDots = [
    { top: '15%', left: '8%', w: 10, h: 10 },
    { top: '70%', left: '12%', w: 7, h: 7 },
    { top: '40%', left: '85%', w: 12, h: 12 },
    { top: '80%', left: '90%', w: 6, h: 6 },
    { top: '25%', right: '35%', w: 8, h: 8 },
    { top: '65%', left: '55%', w: 5, h: 5 },
    { top: '10%', left: '60%', w: 9, h: 9 },
    { top: '55%', left: '25%', w: 14, h: 14 },
  ];

  return (
    <section className="highlights" id="highlights">
      <div className="highlights-bg" />
      <div className="highlights-scattered-dots">
        {scatteredDots.map((dot, i) => (
          <div
            key={i}
            className="h-dot"
            style={{
              top: dot.top,
              left: dot.left,
              right: dot.right,
              width: dot.w,
              height: dot.h,
              opacity: 0.3 + (i % 3) * 0.1,
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="section-title">
          <span className="section-label">FEATURED HIGHLIGHTS</span>
          <h2 className="section-heading">Milestones &amp; Achievements</h2>
        </div>

        <div className="highlights-carousel">
          <div className="highlights-stage">
            {highlights.map((item, idx) => (
              <div key={item.id} className={getCardClass(idx)}>
                <div className="highlight-card-img-placeholder" style={{
                  background: `linear-gradient(135deg, ${item.color}33, ${item.color}88)`,
                }}>
                  <span style={{ fontSize: '3rem' }}>{item.emoji}</span>
                </div>
                <span className="highlight-card-year">{item.year}</span>
                <div className="highlight-card-body">
                  <div className="highlight-card-title">{item.title}</div>
                  <div className="highlight-card-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="highlights-nav">
            <button
              className="highlights-nav-btn"
              onClick={prev}
              id="highlight-prev-btn"
              aria-label="Previous highlight"
            >
              ‹
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div className="highlights-nav-label">
                {highlights[current].title}
              </div>
              {/* Dots */}
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {highlights.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? 20 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: i === current ? '#7B2FBE' : 'rgba(123,47,190,0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                    aria-label={`Go to highlight ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              className="highlights-auto-btn"
              onClick={() => setIsAuto((a) => !a)}
              id="highlight-auto-btn"
            >
              {isAuto ? '⏸' : '▶'} {isAuto ? 'PAUSE' : 'AUTO TOUR'}
            </button>

            <button
              className="highlights-nav-btn"
              onClick={next}
              id="highlight-next-btn"
              aria-label="Next highlight"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

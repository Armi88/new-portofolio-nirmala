import { useEffect, useRef, useState } from 'react';

const statCards = [
  {
    id: 'gpa',
    icon: '🎓',
    iconBg: '#3a004d',
    value: '3.88',
    valueSuffix: '/4.00',
    valueColor: '#d1b3d5',
    label: 'CURRENT GPA',
    sublabel: 'Universitas Gunadarma',
    animateNumber: true,
    numericValue: 3.88,
    decimals: 2,
  },
  {
    id: 'projects',
    icon: '📊',
    iconBg: '#090b1a',
    value: '6+',
    valueColor: '#d1b3d5',
    label: 'STUDIES & RESEARCH',
    sublabel: 'Psychodiagnostics · PIO · Ergonomics · Qualitative',
  },
  {
    id: 'hr',
    icon: '👥',
    iconBg: '#1a3a5c',
    value: 'HR & Assessment',
    valueColor: '#fff',
    label: null,
    sublabel: 'Job Analysis · Competency Modeling · Talent Acquisition',
  },
  {
    id: 'growth',
    icon: '📈',
    iconBg: '#1E3A8A',
    value: 'Continuous Growth',
    valueColor: '#fff',
    label: null,
    sublabel: 'Planning to Tke the TOEFL Test and working abroad',
  },
];

const narrativeSections = [
  {
    heading: 'WHO I AM',
    text: "I’m Nirmala, a Psychology fresh graduate from Gunadarma University with a GPA of 3.88. I’m naturally curious about people, behavior, and the world around me. I enjoy understanding different perspectives, connecting ideas, and looking beyond the surface to understand what lies underneath.",
  },
  {
    heading: 'WHAT MOTIVATES ME',
    text: "I’m motivated by curiosity and the desire to understand. I enjoy asking questions, exploring different perspectives, and turning complex things into something I can understand. I find meaningful challenges in situations that allow me to analyze, learn, and work with people.",
  },
  {
    heading: 'WHAT I FOCUS ON',
    text: 'I enjoy exploring fields that allow me to understand people, analyze problems, and create meaningful solutions. My interests range from human behavior and organizational dynamics to social issues and creative expression. I enjoy learning across different fields and finding connections between them.',
  },
  {
    heading: "WHERE I'M HEADING",
    text: "I’m building my career from my foundation in Psychology, while exploring opportunities that allow me to apply it in different ways. I hope to keep developing my analytical, interpersonal, and creative skills while growing into work that is meaningful and impactful.",
  },
];

function AnimatedStatCard({ card }) {
  const [displayed, setDisplayed] = useState(card.animateNumber ? '0' : null);
  const [started, setStarted] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!card.animateNumber) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [card.animateNumber, started]);

  useEffect(() => {
    if (!started || !card.animateNumber) return;

    const duration = 1800;
    const startTime = performance.now();
    const target = card.numericValue;
    const decimals = card.decimals ?? 0;

    const frame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (eased * target).toFixed(decimals);
      setDisplayed(current);
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [started, card.animateNumber, card.numericValue, card.decimals]);

  return (
    <div ref={cardRef} className="about-stat-card">
      <div className="about-stat-icon" style={{ background: card.iconBg }}>
        <span>{card.icon}</span>
      </div>
      <div className="about-stat-value" style={{ color: card.valueColor }}>
        {card.animateNumber ? displayed : card.value}
        {card.valueSuffix && (
          <span className="about-stat-suffix">{card.valueSuffix}</span>
        )}
      </div>
      {card.label && (
        <div className="about-stat-label">{card.label}</div>
      )}
      <div className="about-stat-sublabel">{card.sublabel}</div>
    </div>
  );
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-header">
          <div className="about-label-row">
            <span className="about-label-line" />
            <span className="about-label-text">ABOUT ME</span>
          </div>
          <h2 className="about-heading">Understanding people, <span>empowering potential</span>.</h2>
          <div className="about-heading-underline" />
          <p className="about-subheading">Transforming psychological insights, behavioral assessment, and empirical research into impactful human-centered solutions.</p>
        </div>

        <div className="about-body">
          <div className="about-cards-grid">
            {statCards.map((card) => (
              <AnimatedStatCard key={card.id} card={card} />
            ))}
          </div>

          <div className="about-narrative">
            {narrativeSections.map((section) => (
              <div key={section.heading} className="about-narrative-section">
                <div className="about-narrative-heading-row">
                  <span className="about-narrative-line" />
                  <span className="about-narrative-heading">{section.heading}</span>
                </div>
                <p className="about-narrative-text">{section.text}</p>
              </div>
            ))}

            <div className="about-pills-row">
              <span className="about-pill-dark">
                <span className="about-pill-dot" />
                Open to internships &amp; entry-level roles
              </span>
              <span className="about-pill-location">
                📍 Jakarta, Indonesia
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

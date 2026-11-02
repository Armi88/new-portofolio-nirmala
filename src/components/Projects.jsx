import { useState, useRef, useLayoutEffect } from 'react';
import { projects } from '../data';

const filterCategories = ['All', 'Psychodiagnostics & Qualitative Research', 'Industrial & Organizational Psychology', 'Mindtools'];

// Mapping stack name → logo image URL
const stackImgMap = {
  'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  'Dart': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Canva': 'https://img.icons8.com/color/48/canva.png',
  'Figma': 'https://img.icons8.com/color/48/figma.png',
};

/* ──────────────────────────────────────────
   WORKFLOW with animated steps + SVG arrows
────────────────────────────────────────── */
function WorkflowSteps({ steps, isOpen }) {
  return (
    <div className="workflow-steps">
      {steps.map((step, i) => (
        <div
          key={`step-${i}`}
          className={`workflow-step-item ${isOpen ? 'workflow-step-visible' : ''}`}
          style={{ transitionDelay: isOpen ? `${i * 0.3}s` : '0s' }}
        >
          {/* Connector: karakter > */}
          {i < steps.length - 1 && (
            <div
              className={`workflow-connector ${isOpen ? 'workflow-connector-visible' : ''}`}
              style={{ transitionDelay: isOpen ? `${i * 0.08 + 0.06}s` : '0s' }}
            >
              &gt;
            </div>
          )}

          {/* Circle nomor */}
          <div className="workflow-step-num">{i + 1}</div>

          {/* Judul step (bold, medium) */}
          <div className="workflow-step-title">{step.title}</div>

          {/* Deskripsi step (kecil, abu) */}
          <div className="workflow-step-desc">{step.desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────
   PROJECT CARD
────────────────────────────────────────── */
function ProjectCard({ project, isOpen, onToggle }) {
  const handleHeaderClick = (e) => {
    if (e.target.closest('a')) return;
    e.preventDefault();
    onToggle();
  };

  return (
    <div className="project-card" id={`project-${project.id}`}>
      {/* ── Header (always visible, clickable) ── */}
      <div className="project-card-header" onClick={handleHeaderClick}>
        <div>
          <div className="project-card-meta">
            {project.category} &bull; {project.year}
          </div>
          <h3 className="project-card-title">{project.title}</h3>
          <div className="project-stack">
            <span className="project-stack-label">METODE / STACK:</span>
            {project.stack.map((s) => {
              const trimmed = s.trim();
              const img = stackImgMap[s] || stackImgMap[trimmed];
              return (
                <span key={s} className="stack-tag">
                  {img && (
                    <img
                      src={img}
                      alt={trimmed}
                      className="stack-tag-img"
                    />
                  )}
                  {trimmed}
                </span>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className={`project-expand-btn ${isOpen ? 'open' : ''}`}
          aria-label={isOpen ? 'Collapse project' : 'Expand project'}
          id={`expand-project-${project.id}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* ── Stats (always visible, below header) ── */}
      <div className="project-stats-bar" onClick={handleHeaderClick}>
        {project.stats.map((stat) => (
          <div key={stat.label} className="project-stat">
            <div className="project-stat-value">{stat.value}</div>
            <div className="project-stat-label">{stat.label}</div>
            <div className="project-stat-desc">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* ── Expandable body ── */}
      <div className={`project-card-body ${isOpen ? 'open' : ''}`}>
        <div className="project-card-body-inner">

          {/* Overview */}
          <div className="project-overview-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
            </svg>
            PROJECT OVERVIEW
          </div>
          <p className="project-overview-text">{project.overview}</p>

          {/* Recruiter Note */}
          <div className="project-recruiter-box">
            <div className="project-recruiter-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
              KEY HIGHLIGHTS
            </div>
            <p className="project-recruiter-text">{project.recruiterNote}</p>
          </div>

          {/* Workflow */}
          <div className="project-workflow">
            <div className="project-workflow-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              WORKFLOW
            </div>
            <WorkflowSteps steps={project.workflow} isOpen={isOpen} />
          </div>

          {/* Skills Demonstrated */}
          {project.skillsDemo && project.skillsDemo.length > 0 && (
            <div className="skills-panel">
              <div className="skills-panel-section">
                <div className="skills-panel-label">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  SKILLS DEMONSTRATED
                </div>
                <div className="skills-demo-pills">
                  {project.skillsDemo.map((skill) => (
                    <span key={skill} className="skills-demo-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="project-card-actions">
            <button
              type="button"
              className="project-collapse-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
              }}
              id={`collapse-project-${project.id}`}
            >
              ↑ Collapse
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   MAIN PROJECTS SECTION
────────────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [openId, setOpenId] = useState(null);
  const pendingAnchorRef = useRef(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleToggle = (id) => {
    const el = document.getElementById(`project-${id}`);
    if (el) {
      pendingAnchorRef.current = {
        id,
        initialTop: el.getBoundingClientRect().top,
      };
    }
    // Accordion: opening a new card closes the previous card
    setOpenId((prev) => (prev === id ? null : id));
  };

  useLayoutEffect(() => {
    if (pendingAnchorRef.current) {
      const { id, initialTop } = pendingAnchorRef.current;
      const el = document.getElementById(`project-${id}`);
      if (el) {
        const currentTop = el.getBoundingClientRect().top;
        const diff = currentTop - initialTop;
        if (Math.abs(diff) > 1) {
          window.scrollBy({ top: diff, behavior: 'instant' });
        }
      }
      pendingAnchorRef.current = null;
    }
  }, [openId]);

  return (
    <section className="projects" id="projects">
      <div className="container">

        {/* ── Section header (matches About style) ── */}
        <div className="about-header" style={{ marginBottom: '3rem' }}>
          <div className="about-label-row">
            <span className="about-label-line" />
            <span className="about-label-text">PORTFOLIO</span>
          </div>
          <h2 className="about-heading">
            Case <span>Studies</span> &amp; Projects
          </h2>
          <div className="about-heading-underline" />
          <p className="about-subheading">Every case study below reflects actual academic work — the problem, the approach, and what was learned. Click any project to read the full breakdown.</p>
        </div>

        {/* ── Filter pills ── */}
        <div className="projects-filter">
          {filterCategories.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => { setActiveFilter(cat); setOpenId(null); }}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
              {cat !== 'All' && (
                <span style={{ marginLeft: '0.3rem', opacity: 0.7, fontSize: '0.7rem' }}>
                  ({projects.filter((p) => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#8b4f67' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="projects-list">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isOpen={openId === project.id}
              onToggle={() => handleToggle(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

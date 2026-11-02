import { useState, useEffect, useRef } from 'react';

const navItems = [
  {
    label: 'Home',
    href: '#home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'About',
    href: '#about',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: 'Skills',
    href: '#skills',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    label: 'Experience',
    href: '#experience',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const sections = navItems.map((n) => n.href.replace('#', ''));
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('home');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobileMenuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        !e.target.closest('.navbar-mobile-menu')
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`} id="navbar" ref={navRef}>
        <div className="navbar-inner">
          {/* Brand Logo */}
          <a
            href="#home"
            className="nav-brand-logo"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Nirmala Homepage"
          >
            <span className="nav-brand-name">Nirmala</span>
            <span className="nav-brand-dot">.</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="navbar-links">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`nav-link${isActive ? ' active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  id={`nav-${item.label.toLowerCase()}`}
                >
                  <span className="nav-link-icon">{item.icon}</span>
                  <span className="nav-link-label">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop Right Side */}
          <div className="navbar-right">
            <div className="nav-available">
              <span className="nav-available-dot" />
              AVAILABLE FOR WORK
            </div>
            <a
              href="#contact"
              className="nav-logo-btn"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Connect <span className="nav-logo-dot">.</span>&thinsp;↗
            </a>
          </div>

          {/* Tablet & Mobile Right Actions (Available Badge + Hamburger) */}
          <div className="navbar-mobile-controls">
            <div className="nav-available nav-available-compact">
              <span className="nav-available-dot" />
              <span className="nav-available-text">AVAILABLE FOR WORK</span>
            </div>
            <button
              type="button"
              className={`navbar-hamburger ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              id="nav-hamburger-btn"
            >
              <span className="hamburger-line line-1" />
              <span className="hamburger-line line-2" />
              <span className="hamburger-line line-3" />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      <div
        className={`navbar-mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />

      {/* Drawer / Dropdown Menu for Tablet & Mobile */}
      <div
        className={`navbar-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="navbar-mobile-header">
          <div className="navbar-mobile-brand">
            <span className="nav-brand-name">Nirmala Ponggohong</span>
            <span className="nav-brand-sub">Psychology Graduate &bull; HR Portfolio</span>
          </div>
        </div>

        <div className="navbar-mobile-divider" />

        <div className="navbar-mobile-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                className={`navbar-mobile-link${isActive ? ' active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="navbar-mobile-link-icon">{item.icon}</span>
                <span className="navbar-mobile-link-label">{item.label}</span>
                {isActive && <span className="navbar-mobile-link-indicator" />}
              </a>
            );
          })}
        </div>

        <div className="navbar-mobile-footer">
          <a
            href="#contact"
            className="navbar-mobile-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Contact &amp; Connect ↗
          </a>
        </div>
      </div>
    </>
  );
}

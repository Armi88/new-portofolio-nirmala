import React from 'react';

export default function Contact() {
  const contactLinks = [
    {
      href: 'mailto:nrmlponggohong10@gmail.com',
      label: 'EMAIL',
      value: 'nrmlponggohong10@gmail.com',
      img: 'https://cdn.simpleicons.org/gmail/EA4335',
      bg: 'rgba(234, 67, 53, 0.12)',
    },
    {
      href: 'https://www.linkedin.com/in/nirmala-ponggohong-711369246/',
      label: 'LINKEDIN',
      value: 'Nirmala Ponggohong',
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
      bg: 'rgba(0, 119, 181, 0.12)',
    },
    {
      href: 'https://www.instagram.com/nrml.10?stkn=aWowaGtvazhocjZo',
      label: 'INSTAGRAM',
      value: '@nrml.10',
      img: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
      bg: 'rgba(225, 48, 108, 0.12)',
    },
  ];

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-title">
          <span className="section-label">GET IN TOUCH</span>
        </div>

        <div className="contact-inner">
          {/* Left Column: Heading & Description */}
          <div className="contact-left">
            <h2 className="contact-heading">
              Let's Connect &amp;<br />
              Collaborate <span>Together</span>
            </h2>
            <p className="contact-desc">
              I’m currently open to full-time career opportunities, internships, and collaborative projects in Human Resources, 
              talent acquisition, psychological assessment, job analysis, and behavioral research. Feel free to reach out and connect!
            </p>
          </div>

          {/* Right Column: Contact Links */}
          <div className="contact-right">
            <div className="contact-links">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="contact-link-item"
                  id={`contact-${link.label.toLowerCase()}`}
                >
                  <div
                    className="contact-link-icon"
                    style={{ background: link.bg }}
                  >
                    <img
                      src={link.img}
                      alt={link.label}
                      style={{
                        width: '22px',
                        height: '22px',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </div>
                  <div>
                    <span className="contact-link-label">{link.label}</span>
                    <span className="contact-link-value">{link.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

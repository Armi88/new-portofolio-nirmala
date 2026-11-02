import { skills } from '../data';

function SkillRow({ items, reversed }) {
  const doubled = [...items, ...items];
  return (
    <div className="skills-row-outer">
      <div
        className="skills-row"
        style={{
          animationDirection: reversed ? 'reverse' : 'normal',
          animationDuration: reversed ? '70s' : '80s',
        }}
      >
        {doubled.map((skill, i) => (
          <div key={i} className="skill-pill">
            <div
              className="skill-pill-icon"
              style={{ background: `${skill.color}18` }}
            >
              <img
                src={skill.img}
                alt={skill.name}
                width={20}
                height={20}
                style={{ objectFit: 'contain', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <span className="skill-pill-name">{skill.name}</span>
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {doubled.map((skill, i) => (
          <div key={`dup-${i}`} className="skill-pill" aria-hidden="true">
            <div
              className="skill-pill-icon"
              style={{ background: `${skill.color}18` }}
            >
              <img
                src={skill.img}
                alt={skill.name}
                width={20}
                height={20}
                style={{ objectFit: 'contain', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <span className="skill-pill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const categories = [
    {
      id: 'psychodiagnostics',
      icon: '🧠',
      accentColor: '#9e4abb',
      label: 'Asesmen & Psikodiagnostika',
      subtitle: 'Psychodiagnostics & Assessment',
      desc: 'Penguasaan teknik observasi sistematis, wawancara mendalam, dan administrasi instrumen asesmen psikologi.',
      skills: [
        'Wawancara Mendalam (In-Depth Interview)',
        'Observasi Perilaku (Time & Event Sampling)',
        'Asesmen Kebutuhan Khusus (CP-6D)',
        'Administrasi Tes Psikologi',
        'Evaluasi Postur Kerja (Nordic Body Map)',
        'Sintesis Laporan Psikologis',
      ],
    },
    {
      id: 'pio',
      icon: '🏢',
      accentColor: '#3a004d',
      label: 'Psikologi Industri & Organisasi (PIO)',
      subtitle: 'Industrial & Organizational / HR',
      desc: 'Analisis jabatan terstandarisasi, pemetaan kompetensi SDM, KPI mapping, dan integrasi standar sistem mutu ISO.',
      skills: [
        'Analisis Jabatan (Job Analysis)',
        'Penyusunan Job Desc & Job Spec',
        'Competency & KPI Mapping',
        'Analisis Beban Kerja (Workload)',
        'Evaluasi K3 & Standar ISO',
        'Rekrutmen & Seleksi Berbasis Kompetensi',
      ],
    },
    {
      id: 'research',
      icon: '📊',
      accentColor: '#7b2fbe',
      label: 'Metodologi Riset & Analisis Data',
      subtitle: 'Research & Statistical Analysis',
      desc: 'Pengolahan riset kualitatif berbasis reduksi transkrip verbatim masif serta analisis statistik kuantitatif.',
      skills: [
        'Riset Kualitatif (Thematic Coding)',
        'Reduksi Data Transkrip Verbatim',
        'Riset Kuantitatif & Desain Survei',
        'Uji Validitas & Reliabilitas Instrumen',
        'Analisis Statistik (SPSS & Excel)',
        'Penyusunan Laporan Ilmiah',
      ],
    },
    {
      id: 'edutech',
      icon: '💡',
      accentColor: '#d97706',
      label: 'Instructional Design & Psikoedukasi',
      subtitle: 'Educational Technology & Mindtools',
      desc: 'Perancangan media pembelajaran interaktif berbasis teori pedagogi konstruktivisme dan gamifikasi edukatif.',
      skills: [
        'Mindtools Framework (Jonassen)',
        'Interactive Multimedia (Articulate Storyline)',
        'Gamifikasi & Motivasi Belajar',
        'Storyboarding & Alur Kognitif',
        'Modul Psikoedukasi',
        'Evaluasi Efektivitas Pembelajaran',
      ],
    },
    {
      id: 'interpersonal',
      icon: '🤝',
      accentColor: '#10b981',
      label: 'Konseling & Interpersonal',
      subtitle: 'Counseling Basics & Soft Skills',
      desc: 'Komunikasi empatik, active listening, etika kepatuhan kode etik psikologi, dan pemecahan masalah analitis.',
      skills: [
        'Active Listening & Deep Empathy',
        'Komunikasi Terapeutik',
        'Dasar Konseling & Wawancara Klinis',
        'Penerapan Kode Etik Psikologi',
        'Critical Thinking & Problem Solving',
        'Public Speaking & Fasilitasi Diskusi',
      ],
    },
    {
      id: 'tools',
      icon: '💻',
      accentColor: '#2563eb',
      label: 'Software & Alat Analisis',
      subtitle: 'Software & Productivity Tools',
      desc: 'Penggunaan software statistik psikologi, instrumen survei daring, dokumentasi, dan media visual.',
      skills: [
        'IBM SPSS Statistics',
        'Microsoft Excel (Scoring & Data)',
        'Microsoft Word (Laporan & Transkrip)',
        'Microsoft PowerPoint (Presentasi & Training)',
        'Google Forms (Skala & Kuesioner)',
        'Canva (Infografis & Media Visual)',
      ],
    },
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        {/* Header styled like About section */}
        <div className="about-header" style={{ marginBottom: '3rem' }}>
          <div className="about-label-row">
            <span className="about-label-line" />
            <span className="about-label-text">CORE COMPETENCIES</span>
          </div>
          <h2 className="about-heading">
            Psychological &amp; <span>Analytical Skills</span>.
          </h2>
          <div className="about-heading-underline" />
          <p className="about-subheading">
            Bidang keahlian psikodiagnostika, asesmen perilaku, riset kualitatif &amp; kuantitatif, psikologi industri organisasi (PIO), serta pengembangan media psikoedukasi.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="skills-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="skills-card">
              <div className="skills-card-header">
                <div
                  className="skills-card-icon-wrap"
                  style={{ background: `${cat.accentColor}18`, color: cat.accentColor }}
                >
                  <span className="skills-card-icon">{cat.icon}</span>
                </div>
                <div className="skills-card-title-group">
                  <h3 className="skills-card-title">{cat.label}</h3>
                  <div className="skills-card-subtitle">{cat.subtitle}</div>
                </div>
              </div>

              <p className="skills-card-desc">{cat.desc}</p>
              <div className="skills-card-divider" />

              <div className="skills-card-pills">
                {cat.skills.map((s) => (
                  <span key={s} className="skills-card-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling rows */}
      <div className="skills-scroll-container">
        <SkillRow items={skills.row1} reversed={false} />
        <SkillRow items={skills.row2} reversed={true} />
      </div>
    </section>
  );
}

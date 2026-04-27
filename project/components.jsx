/* Section components for the portfolio */

const { useState, useEffect, useRef, useMemo } = React;

/* Reveal-on-scroll wrapper */
function Reveal({ children, delay = 0, as = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  const cls = `reveal ${shown ? "in" : ""} ${delay ? `delay-${delay}` : ""} ${className}`.trim();
  return <Tag ref={ref} className={cls} {...rest}>{children}</Tag>;
}

function SectionLabel({ num, children }) {
  return (
    <div className="section-label">
      <span className="num">{num}</span>
      <span>{children}</span>
    </div>);

}

/* ===== HERO ===== */
function Hero({ data }) {
  return (
    <section id="hero" className="hero" data-screen-label="01 Hero">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <Reveal className="greeting">
            <span className="caret mono">▍</span>
            <span className="mono">whoami → introducing</span>
          </Reveal>
          <Reveal delay={1} as="h1">
            {data.name.split(" ").slice(0, 2).join(" ")}<br />
            <span className="accent">{data.name.split(" ").slice(2).join(" ")}.</span>
          </Reveal>
          <Reveal delay={2} className="role">
            {data.title}
          </Reveal>
          <Reveal delay={3} as="p" className="tagline">{data.tagline}</Reveal>
          <Reveal delay={4} className="ctas">
            <a href="#projects" className="btn primary">
              View projects <span className="arrow mono">→</span>
            </a>
            <a href={data.resumeUrl} className="btn" download target="_blank" rel="noopener noreferrer">
              Download resume <span className="arrow mono">↓</span>
            </a>
            <a href="#contact" className="btn">Contact</a>
          </Reveal>
          <Reveal delay={4} className="hero-stats">
            <div className="stat"><span className="num">{data.yearsExp}<span className="plus">+</span></span><span className="lbl">Years experience</span></div>
            <div className="stat"><span className="num">10<span className="plus">+</span></span><span className="lbl">Shipped projects</span></div>
            <div className="stat"><span className="num">{"\n"}<span className="plus">+</span></span><span className="lbl"></span></div>
          </Reveal>
        </div>
        <Reveal delay={2} className="hero-portrait">
          <span className="tag top mono">// portrait_2024.png</span>
          <div className="frame">
            <img src="assets/profile.png" alt="Ponuel Mollah Swadesh" />
            <div className="scan"></div>
          </div>
          <div className="corner tl"></div>
          <div className="corner tr"></div>
          <div className="corner bl"></div>
          <div className="corner br"></div>
          <span className="tag bot mono">DHA · BD</span>
        </Reveal>
      </div>
      <div className="scroll-cue">
        <span>scroll</span>
        <span className="line"></span>
      </div>
    </section>);

}

/* ===== ABOUT ===== */
function About({ data }) {
  const renderP = (txt) => {
    const parts = txt.split(/\*\*(.+?)\*\*/g);
    return parts.map((p, i) => i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>);
  };
  return (
    <section id="about" data-screen-label="02 About">
      <div className="wrap">
        <Reveal><SectionLabel num="01 /">About</SectionLabel></Reveal>
        <Reveal delay={1} as="h2" className="section-title">
          Engineering at the intersection of <em style={{ fontFamily: 'JetBrains Mono', fontStyle: 'normal', color: 'var(--accent)' }}>code</em> and <em style={{ fontStyle: 'normal' }}>community.</em>
        </Reveal>
        <div className="about-grid">
          <Reveal delay={2} className="about-text">
            {data.about.map((p, i) => <p key={i}>{renderP(p)}</p>)}
          </Reveal>
          <Reveal delay={3} className="about-side">
            <div className="row"><span className="k">Based</span><span className="v">Dhaka, BD</span></div>
            <div className="row"><span className="k">Sector</span><span className="v">ICT/ Dev</span></div>
            <div className="row"><span className="k">Education</span><span className="v">BSc CSE, BRAC</span></div>
            <div className="row"><span className="k">CGPA</span><span className="v">3.71 / 4.00</span></div>
            <div className="row"><span className="k">IELTS</span><span className="v">7.0</span></div>
            <div className="row"><span className="k">Status</span><span className="v" style={{ color: 'var(--accent)' }}>● Open to talk</span></div>
          </Reveal>
        </div>
      </div>
    </section>);

}

/* ===== SKILLS ===== */
function SkillCard({ group, idx, items }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="skill-card">
      <div className="head">
        <span className="label">{group}</span>
        <span className="num">// {idx}</span>
      </div>
      <div ref={ref} className={`skill-bar ${active ? 'in' : ''}`}>
        {items.map((it, i) =>
        <div className="item" key={i}>
            <div className="top">
              <span className="name">{it.name}</span>
              <span className="pct">{Math.round(it.w * 100)}</span>
            </div>
            <div className="track">
              <div className="fill" style={{ '--w': it.w }}></div>
            </div>
          </div>
        )}
      </div>
    </div>);

}

function Skills({ data }) {
  return (
    <section id="skills" data-screen-label="03 Skills">
      <div className="wrap">
        <Reveal><SectionLabel num="02 /">Stack</SectionLabel></Reveal>
        <Reveal delay={1} as="h2" className="section-title">Toolbelt — kept sharp.</Reveal>
        <Reveal delay={2} as="p" className="section-sub">
          Five practice areas, each one shipped against a real deadline. Bars are calibration, not bragging — they reflect the depth I'd bring to an unfamiliar problem.
        </Reveal>
        <Reveal delay={2} className="skills-grid">
          {data.skills.map((s) => <SkillCard key={s.idx} {...s} />)}
        </Reveal>
      </div>
    </section>);

}

/* ===== EXPERIENCE ===== */
function Experience({ data }) {
  return (
    <section id="experience" data-screen-label="04 Experience">
      <div className="wrap">
        <Reveal><SectionLabel num="03 /">Experience</SectionLabel></Reveal>
        <Reveal delay={1} as="h2" className="section-title">A short, deliberate timeline.</Reveal>
        <Reveal delay={2} className="timeline" as="div">
          {data.experience.map((e, i) =>
          <div key={i} className="tl-item">
              <div className="meta-row">
                <span className="date">{e.date}</span>
                <span className="sep">·</span>
                <span>{e.type}</span>
              </div>
              <h3>{e.role}</h3>
              <div className="org">{e.org}</div>
              {e.groups ? (
                <div className="tl-groups">
                  {e.groups.map((g, k) => (
                    <div className="tl-group" key={k}>
                      <h4 className="tl-group-head">{g.heading}</h4>
                      <ul>{g.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul>{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>);

}

/* ===== PROJECTS ===== */
function Projects({ data }) {
  const allTags = useMemo(() => {
    const s = new Set();
    data.projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, [data.projects]);
  const [filter, setFilter] = useState("All");
  const visibleCount = filter === "All" ?
  data.projects.length :
  data.projects.filter((p) => p.tags.includes(filter)).length;

  return (
    <section id="projects" data-screen-label="05 Projects">
      <div className="wrap">
        <Reveal><SectionLabel num="04 /">Projects</SectionLabel></Reveal>
        <Reveal delay={1} as="h2" className="section-title">Things I've built — in production.</Reveal>
        <Reveal delay={2} as="p" className="section-sub">
          A selected slice across apps, MIS, and web. Most live with WaterAid Bangladesh and partner organisations.
        </Reveal>
        <Reveal delay={2} className="filter-bar" as="div">
          {allTags.map((t) =>
          <button
            key={t}
            className={filter === t ? 'active' : ''}
            onClick={() => setFilter(t)}>
            {t}</button>
          )}
          <span className="count mono">{String(visibleCount).padStart(2, '0')} / {String(data.projects.length).padStart(2, '0')}</span>
        </Reveal>
        <div className="proj-grid">
          {data.projects.map((p, i) => {
            const visible = filter === "All" || p.tags.includes(filter);
            return (
              <a
                key={p.id}
                href={p.url || "#"}
                target={p.url ? "_blank" : undefined}
                rel={p.url ? "noopener noreferrer" : undefined}
                className={`proj-card ${!visible ? 'hidden' : ''}`}
                onClick={(e) => {if (!p.url) e.preventDefault();}}>
                
                <div className="head">
                  <span className="id">PRJ_{p.id}</span>
                  <span className="ext mono">↗</span>
                </div>
                <h3>
                  {p.title}
                  {p.ongoing && <span className="ongoing-badge">Ongoing</span>}
                </h3>
                <div className="desc">{p.desc}</div>
                <div className="tags">
                  {p.tags.map((t, j) =>
                  <span key={j} className={`tag ${j % 2 ? 'alt' : ''}`}>{t}</span>
                  )}
                </div>
              </a>);

          })}
        </div>
      </div>
    </section>);

}

/* ===== PUBLICATIONS ===== */
function Publications({ data }) {
  return (
    <section id="publications" data-screen-label="06 Publications">
      <div className="wrap">
        <Reveal><SectionLabel num="05 /">Publications</SectionLabel></Reveal>
        <Reveal delay={1} as="h2" className="section-title">Research & writing.</Reveal>
        <Reveal delay={2} className="pub-list">
          {data.publications.map((p, i) =>
          <div className="pub-item" key={i}>
              <div className="year mono">{p.year}</div>
              <div>
                <h4>{p.title}</h4>
                <div className="venue">{p.venue}</div>
              </div>
              {p.url ?
            <a className="link" href={p.url} target="_blank" rel="noopener noreferrer">Read ↗</a> :

            <span className="link" style={{ opacity: 0.4 }}>Available on request</span>
            }
            </div>
          )}
        </Reveal>
      </div>
    </section>);

}

/* ===== CERTIFICATIONS ===== */
function Certifications({ data }) {
  return (
    <section id="certifications" data-screen-label="07 Certifications">
      <div className="wrap">
        <Reveal><SectionLabel num="06 /">Certifications</SectionLabel></Reveal>
        <Reveal delay={1} as="h2" className="section-title">Continued learning.</Reveal>
        <Reveal delay={2} className="cert-grid">
          {data.certifications.map((c, i) =>
          <div className="cert-card" key={i}>
              <div className="yr">CERT · {c.yr}</div>
              <h4>{c.title}</h4>
              <div className="issuer">{c.issuer}</div>
            </div>
          )}
        </Reveal>
      </div>
    </section>);

}

/* ===== OFF-HOURS / EXTRA-CURRICULAR ===== */
function OffHours({ data }) {
  return (
    <section id="offhours" className="music" data-screen-label="09 Off-Hours">
      <div className="wrap">
        <Reveal><SectionLabel num="08 /">Off-Hours</SectionLabel></Reveal>
        <Reveal delay={1} as="h2" className="section-title">Beyond the keyboard.</Reveal>
        <Reveal delay={2} as="p" className="section-sub">
          A few things I do when the standups end — leadership roles, music, and community work.
        </Reveal>
        <Reveal delay={2} className="offhours-grid">
          {(data.activities || []).map((a, i) => (
            <div className="offhours-card" key={i}>
              <div className="meta">{a.meta}</div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ===== GALLERY ===== */
function Gallery({ data }) {
  const trackRef = useRef(null);
  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth * 0.7;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  return (
    <section id="gallery" data-screen-label="08 Gallery">
      <div className="wrap">
        <Reveal><SectionLabel num="07 /">Gallery</SectionLabel></Reveal>
        <Reveal delay={1} as="h2" className="section-title">A few moments — on and off the clock.</Reveal>
        <Reveal delay={2} as="p" className="section-sub">
          Slide through portraits, field visits, and stage moments. Drop new images into <span className="mono" style={{ color: 'var(--accent)' }}>assets/</span> and add an entry in <span className="mono" style={{ color: 'var(--accent)' }}>data.js</span> to extend.
        </Reveal>
        <Reveal delay={2}>
          <div className="gallery-track" ref={trackRef}>
            {(data.gallery || []).map((g, i) => (
              <div className={`gallery-item ${g.placeholder ? 'placeholder' : ''}`} key={i}>
                <div className="img-wrap">
                  {g.placeholder
                    ? <span>+ Drop image here</span>
                    : <img src={g.src} alt={g.caption || ''} />}
                </div>
                <div className="meta-row">
                  <span className="cap">{g.caption || '—'}</span>
                  <span className="meta">{g.meta || '·'}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="gallery-controls">
            <button onClick={() => scroll(-1)} aria-label="Previous">←</button>
            <button onClick={() => scroll(1)} aria-label="Next">→</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===== CONTACT ===== */
function Contact({ data }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('// error: all fields required');
      return;
    }
    if (!/.+@.+\..+/.test(form.email)) {
      setStatus('// error: invalid email format');
      return;
    }
    setStatus('// queued: 3... 2... 1... ✓ message sent (demo)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" data-screen-label="09 Contact">
      <div className="wrap">
        <Reveal><SectionLabel num="08 /">Contact</SectionLabel></Reveal>
        <div className="contact-grid">
          <Reveal delay={1}>
            <h2 className="contact-headline">
              Have a project? <br />
              Let's <span className="accent">build</span> it.
            </h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: 40, maxWidth: '40ch' }}>
              I'm open to ICT consulting, digital development roles, and collaborations in the WASH and development sector.
            </p>
            <div className="contact-info">
              <a href={`mailto:${data.email}`}>
                <div>
                  <span className="k">Email</span>
                  {data.email}
                </div>
                <span className="arrow mono">→</span>
              </a>
              <a href={`tel:${data.phone.replace(/\s/g, '')}`}>
                <div>
                  <span className="k">Phone</span>
                  {data.phone}
                </div>
                <span className="arrow mono">→</span>
              </a>
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                <div>
                  <span className="k">LinkedIn</span>
                  in/ponuel-mollah-swadesh
                </div>
                <span className="arrow mono">↗</span>
              </a>
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                <div>
                  <span className="k">GitHub</span>
                  github.com/Swadesh1997
                </div>
                <span className="arrow mono">↗</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-label">
                <span>~/contact.sh</span>
                <span className="lights"><span></span><span></span><span></span></span>
              </div>
              <div className="field">
                <label>name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name" />
                
              </div>
              <div className="field">
                <label>email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com" />
                
              </div>
              <div className="field">
                <label>message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What are you building?">
                </textarea>
              </div>
              <button type="submit" className="btn primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send message <span className="arrow mono">→</span>
              </button>
              <div className="form-status">{status}</div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>);

}

/* ===== Footer ===== */
function Footer({ data }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          © 2026 {data.name}. <span className="built">Built in Dhaka · last commit 2026.04</span>
        </div>
        <div className="links">
          <a href={data.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={data.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`mailto:${data.email}`}>Email</a>
        </div>
      </div>
    </footer>);

}

/* ===== Topbar + DotNav ===== */
function Topbar({ data }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const t = d.toLocaleTimeString('en-GB', { hour12: false, timeZone: 'Asia/Dhaka' });
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  const goTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <header className="topbar">
      <div className="brand">
        <span className="dot"></span>
        <span>PMS · ICT/Dev · BD</span>
      </div>
      <nav className="topbar-nav" aria-label="Primary">
        <a href="#about" onClick={goTo('about')}>About</a>
        <a href="#skills" onClick={goTo('skills')}>Skills</a>
        <a href="#experience" onClick={goTo('experience')}>Experience</a>
        <a href="#projects" onClick={goTo('projects')}>Work</a>
        <a href="#publications" onClick={goTo('publications')}>Research</a>
        <a href="#contact" onClick={goTo('contact')}>Contact</a>
        <a href={data.resumeUrl} className="cta" download target="_blank" rel="noopener noreferrer">
          <span>Resume</span>
          <span aria-hidden="true">↓</span>
        </a>
      </nav>
    </header>
  );
}

function DotNav({ sections }) {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + window.innerHeight * 0.4;
      let cur = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) cur = s.id;
      }
      setActive(cur);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [sections]);
  return (
    <nav className="dot-nav" aria-label="Section navigation">
      {sections.map((s) =>
      <button
        key={s.id}
        className={active === s.id ? 'active' : ''}
        onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        aria-label={s.label}>
        
          <span className="label">{s.label}</span>
        </button>
      )}
    </nav>);

}

Object.assign(window, {
  Reveal, SectionLabel, Hero, About, Skills, Experience,
  Projects, Publications, Certifications, Gallery, OffHours, Contact, Footer,
  Topbar, DotNav
});
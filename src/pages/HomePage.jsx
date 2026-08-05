import { useState } from "react";
import { PORTFOLIO } from "../data.js";
import { useCollection } from "../hooks/useFirestore.js";
import { GithubIcon, LinkedinIcon, WhatsappIcon, ArrowUpRightIcon, ArrowDownIcon } from "../icons.jsx";
import ProjectModal from "../components/ProjectModal.jsx";

/* ── Services ──────────────────────────── */
const SERVICES = [
  { title: "Sites web", desc: "Des vitrines élégantes, rapides et responsives.", tag: "React · Laravel" },
  { title: "Applications", desc: "Des interfaces web & mobiles pensées pour l'usage.", tag: "Mobile · PWA" },
  { title: "UI / UX", desc: "Des designs chics, clairs et agréables à regarder.", tag: "Stitch · Figma" },
  { title: "Back-end & API", desc: "Des données bien rangées et des API qui répondent.", tag: "PHP · Firebase" },
  { title: "Bases de données", desc: "Modélisation propre, requêtes qui vont vite.", tag: "MySQL · PostgreSQL" },
  { title: "Git & déploiement", desc: "Un workflow propre, du code versionné et en ligne.", tag: "GitHub · Vercel" },
];

const MARQUEE = [
  "Développement Web", "React", "Laravel", "UI / UX",
  "Bases de données", "Git", "PHP", "Java", "Firebase", "MySQL",
];

export default function HomePage({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const { firstName, lastName, title, bio, photo, initials, email } = PORTFOLIO.personal;
  const { github, linkedin, whatsapp } = PORTFOLIO.social;
  const { data: projects } = useCollection("projects");
  const { data: skills } = useCollection("skills");

  const projectCount = projects?.length || PORTFOLIO.projects.length;
  const skillCount = skills?.length || PORTFOLIO.skills.length;

  const featured = projects?.length
    ? (projects.filter(p => p.featured).length ? projects.filter(p => p.featured).slice(0, 3) : projects.slice(0, 3))
    : PORTFOLIO.projects.filter(p => p.featured).slice(0, 3);

  const socials = [
    { href: github,   icon: <GithubIcon width={15} height={15} />,   label: "GitHub" },
    { href: linkedin, icon: <LinkedinIcon width={15} height={15} />,  label: "LinkedIn" },
    { href: whatsapp, icon: <WhatsappIcon width={15} height={15} />,  label: "WhatsApp" },
  ].filter(s => s.href);

  return (
    <>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      {/* ═══ HERO ═══════════════════════════ */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="hero-eyebrow">Portfolio · 2026 — Bobo-Dioulasso</p>
            <h1 className="hero-title">
              Bonjour, moi c'est <em>{firstName}</em>.
              <span className="hero-line2">Je crée des expériences web <em>chics &amp; malines.</em></span>
            </h1>
            <p className="hero-sub">
              {title} — je transforme les idées en sites et applications élégants, de la première
              esquisse jusqu'au déploiement.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => onNavigate("portfolio")}>
                Voir les projets <ArrowUpRightIcon width={15} height={15} />
              </button>
              <button className="btn btn-ghost" onClick={() => onNavigate("contact")}>
                Me contacter
              </button>
              <a className="btn btn-ghost" href="/CV_Kabore_Frank.pdf" download>
                <ArrowDownIcon width={14} height={14} /> CV
              </a>
            </div>

            <div className="hero-socials">
              {socials.map(s => (
                <a key={s.label} className="social-chip" href={s.href} target="_blank" rel="noreferrer">
                  {s.icon} {s.label}
                </a>
              ))}
              <span className="sep">·</span>
              <a className="social-chip" href={`mailto:${email}`} style={{ fontFamily: "var(--mono)", fontSize: "0.76rem" }}>
                {email}
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="hero-photo-wrap">
            <div className="hero-photo">
              {photo
                ? <img src={photo} alt={firstName} />
                : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", fontFamily: "var(--font-head)", color: "var(--accent)" }}>{initials}</div>
              }
            </div>
            <span className="hero-photo-badge">Disponible pour toute collaboration ✦</span>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══════════════════════ */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span className="marquee-item" key={i}>
              <b>✦</b> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ STATS ═════════════════════════ */}
      <section className="section-sm">
        <div className="container">
          <div className="stats">
            <div className="stat">
              <p className="stat-value">{projectCount}<em>+</em></p>
              <p className="stat-label">Projets réalisés</p>
            </div>
            <div className="stat">
              <p className="stat-value">{skillCount}<em>+</em></p>
              <p className="stat-label">Technologies</p>
            </div>
            <div className="stat">
              <p className="stat-value">3<em> ans</em></p>
              <p className="stat-label">De formation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BIO STRIP ═════════════════════ */}
      <section className="bio-strip" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <p className="bio-text">
            {bio} <em>J'aime les interfaces qui respirent, le code propre et les idées qui
            deviennent de vraies choses.</em>
          </p>
        </div>
      </section>

      {/* ═══ SERVICES ══════════════════════ */}
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="section-head">
            <span className="section-num">01 · Services</span>
            <h2 className="section-title">Ce que je <em>sais faire.</em></h2>
          </div>

          <div className="list">
            {SERVICES.map((s, i) => (
              <button key={s.title} className="list-item" onClick={() => onNavigate("portfolio")}>
                <span className="list-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="list-title">{s.title}</h3>
                  <p className="list-desc">{s.desc}</p>
                </div>
                <div className="list-meta">
                  <span className="tag">{s.tag}</span>
                  <span className="list-arrow"><ArrowUpRightIcon width={16} height={16} /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJETS À LA UNE ══════════════ */}
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <span className="section-num">02 · Sélection</span>
              <h2 className="section-title">Chaque projet, une <em>histoire.</em></h2>
            </div>
            <button className="btn btn-ghost" onClick={() => onNavigate("portfolio")}>
              Tout voir <ArrowUpRightIcon width={14} height={14} />
            </button>
          </div>

          <div className="list">
            {featured.map((p, i) => (
              <button key={p.id || p.title} className="list-item" onClick={() => setSelected(p)}>
                <span className="list-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="list-title">{p.title}</h3>
                  <p className="list-desc">{p.description}</p>
                </div>
                <div className="list-meta">
                  <div className="tags">
                    {(p.technologies || []).slice(0, 2).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <span className="list-arrow"><ArrowUpRightIcon width={16} height={16} /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <div>
              <h2 className="cta-title">Une idée ? Un projet ? <em>Parlons-en.</em></h2>
              <p className="cta-sub">Disponible pour toute collaboration, toujours partant pour échanger. Un café virtuel et c'est parti.</p>
            </div>
            <button className="btn btn-primary" onClick={() => onNavigate("contact")}>
              Travaillons ensemble <ArrowUpRightIcon width={15} height={15} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

import { useState } from "react";
import { PORTFOLIO } from "../data.js";
import { useCollection, useProfile } from "../hooks/useFirestore.js";
import { GithubIcon, LinkedinIcon, WhatsappIcon, ArrowUpRightIcon, ArrowDownIcon } from "../icons.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import ProjectRow from "../components/ProjectRow.jsx";

/* ── Services ──────────────────────────── */
const SERVICES = [
  { title: "Sites web",        desc: "Des sites rapides, clairs et adaptés à tous les écrans.",             tag: "React · Laravel"    },
  { title: "Applications",     desc: "Des applications web & mobile simples et efficaces.",                 tag: "Mobile · PWA"       },
  { title: "Bases de données", desc: "Des données fiables et des requêtes rapides.",                        tag: "MySQL · PostgreSQL" },
  { title: "Déploiement",      desc: "Du code propre, versionné et mis en ligne.",                          tag: "GitHub · Vercel"    },
];

const DEFAULT_MARQUEE = [
  "Développement Web", "React", "Laravel",
  "Bases de données", "Git", "PHP", "Java", "MySQL",
];

const PROCESS = [
  { title: "Analyse",       desc: "Comprendre votre besoin et vos objectifs." },
  { title: "Conception",    desc: "Architecture, maquettes et choix techniques." },
  { title: "Développement", desc: "Code propre, testé, adapté à tous les écrans." },
  { title: "Mise en ligne", desc: "Déploiement, suivi et évolutions." },
];

export default function HomePage({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const { data: personal, loading: profileLoading } = useProfile();
  const { firstName, lastName, title, bio, photo, initials, email } = personal || PORTFOLIO.personal;
  const { github, linkedin, whatsapp } = PORTFOLIO.social;
  const { data: projects } = useCollection("projects");
  const { data: skills }   = useCollection("skills");

  const marqueeItems = (skills && skills.length ? skills : PORTFOLIO.skills)
    .map(s => s.name)
    .filter(Boolean);
  const marquee = marqueeItems.length ? marqueeItems : DEFAULT_MARQUEE;

  const projectCount = projects?.length || PORTFOLIO.projects.length;
  const skillCount   = skills?.length   || PORTFOLIO.skills.length;

  const featured = projects?.length
    ? (projects.filter(p => p.featured).length
        ? projects.filter(p => p.featured).slice(0, 3)
        : projects.slice(0, 3))
    : PORTFOLIO.projects.filter(p => p.featured).slice(0, 3);

  const socials = [
    { href: github,   icon: <GithubIcon   width={15} height={15} />, label: "GitHub"   },
    { href: linkedin, icon: <LinkedinIcon  width={15} height={15} />, label: "LinkedIn" },
    { href: whatsapp, icon: <WhatsappIcon  width={15} height={15} />, label: "WhatsApp" },
  ].filter(s => s.href);

  return (
    <>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      {/* ═══ HERO ═══════════════════════════ */}
      <section className="hero" aria-label="Introduction">
        <div className="container hero-grid">
          <div>
            <h1 className="hero-title">
              {firstName} {lastName}.
              <span className="hero-line2">Développeur web &amp; mobile.</span>
            </h1>
            <p className="hero-sub">
              Étudiant en Génie Logiciel, je conçois des sites et applications web &amp; mobile.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => onNavigate("portfolio")} id="hero-cta-projects">
                Voir les projets <ArrowUpRightIcon width={15} height={15} />
              </button>
              <button className="btn btn-ghost" onClick={() => onNavigate("contact")} id="hero-cta-contact">
                Me contacter
              </button>
              <a className="btn btn-ghost" href="/CV_Kabore_Frank.pdf" download aria-label="Télécharger CV">
                <ArrowDownIcon width={14} height={14} /> CV
              </a>
            </div>

            <div className="hero-socials">
              {socials.map(s => (
                <a key={s.label} className="social-chip" href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  {s.icon} {s.label}
                </a>
              ))}
              <span className="sep">·</span>
              <a className="social-chip" href={`mailto:${email}`} style={{ fontFamily: "var(--mono)", fontSize: "0.76rem" }} aria-label={`Email : ${email}`}>
                {email}
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="hero-photo-wrap">
            <div className="hero-photo">
              <div className="hero-photo-shift" aria-hidden="true" />
              <div className="hero-photo-img">
                {photo && !profileLoading
                  ? <img src={photo} alt={`Photo de ${firstName} ${lastName}`} />
                  : <div className="hero-photo-initials">{initials}</div>
                }
              </div>
              <span className="hero-photo-status"><i aria-hidden="true" /> Disponible</span>
              <div className="hero-photo-caption">
                <p className="hero-photo-name">{firstName} {lastName}</p>
                <p className="hero-photo-role">{title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══════════════════════ */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((item, i) => (
            <span className="marquee-item" key={i}>
              <b>•</b> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ STATS ═════════════════════════ */}
      <section className="section-sm" aria-label="Statistiques">
        <div className="container">
          <div className="stats">
            <div className="stat">
              <p className="stat-value">{projectCount}</p>
              <p className="stat-label">Projets réalisés</p>
            </div>
            <div className="stat">
              <p className="stat-value">{skillCount}</p>
              <p className="stat-label">Technologies</p>
            </div>
            <div className="stat">
              <p className="stat-value">3<em> ans</em></p>
              <p className="stat-label">Formation en Génie Logiciel</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BIO STRIP ═════════════════════ */}
      <section className="bio-strip" aria-label="Bio">
        <div className="container">
          <span className="section-num">À propos</span>
          <p className="bio-text">
            {bio}
          </p>
        </div>
      </section>

      {/* ═══ SERVICES ══════════════════════ */}
      <section className="section" style={{ paddingTop: "2rem" }} id="services" aria-label="Services">
        <div className="container">
          <div className="section-head">
            <span className="section-num">01 · Expertises</span>
            <h2 className="section-title">Mes <em>compétences.</em></h2>
          </div>

          <div className="service-grid" role="list">
            {SERVICES.map((s, i) => (
              <button key={s.title} className="service-card" role="listitem" onClick={() => onNavigate("portfolio")}>
                <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-foot">
                  <span className="tag">{s.tag}</span>
                  <span className="service-arrow" aria-hidden="true"><ArrowUpRightIcon width={14} height={14} /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJETS À LA UNE ══════════════ */}
      <section className="section" style={{ paddingTop: "1rem" }} id="work" aria-label="Projets sélectionnés">
        <div className="container">
          <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <span className="section-num">02 · Sélection</span>
              <h2 className="section-title"><em>Quelques projets</em> réalisés.</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => onNavigate("portfolio")} id="see-all-projects">
              Voir tous les projets <ArrowUpRightIcon width={14} height={14} />
            </button>
          </div>

          <div className="proj-cards proj-cards--tri" role="list">
            {featured.map((p, i) => (
              <ProjectRow key={p.id || p.title} project={p} index={i} onSelect={setSelected} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MÉTHODE ═══════════════════════ */}
      <section className="section" aria-label="Méthode de travail">
        <div className="container">
          <div className="section-head">
            <span className="section-num">03 · Méthode</span>
            <h2 className="section-title">Ma méthode de <em>travail.</em></h2>
          </div>

          <div className="process-grid">
            {PROCESS.map((step, i) => (
              <div key={step.title} className="process-step">
                <p className="process-num">{String(i + 1).padStart(2, "0")}</p>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
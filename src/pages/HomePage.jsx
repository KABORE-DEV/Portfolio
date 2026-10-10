import { useState } from "react";
import { PORTFOLIO } from "../data.js";
import { useCollection, useProfile, useSettings } from "../hooks/useFirestore.js";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
  ArrowUpRightIcon,
  ArrowDownIcon,
} from "../icons.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import CvModal from "../components/CvModal.jsx";

const DEFAULT_MARQUEE = [
  "Développement Web",
  "React",
  "Laravel",
  "Bases de données",
  "Git",
  "PHP",
  "Java",
  "MySQL",
];

const PROCESS = [
  { title: "Analyse", desc: "Comprendre votre besoin et vos objectifs." },
  { title: "Conception", desc: "Architecture, maquettes et choix techniques." },
  {
    title: "Développement",
    desc: "Code propre, testé, adapté à tous les écrans.",
  },
  { title: "Mise en ligne", desc: "Déploiement, suivi et évolutions." },
];

export default function HomePage({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [cvOpen, setCvOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { data: personal, loading: profileLoading } = useProfile();
  const { firstName, lastName, title, bio, initials, email, heroSubtitle, location } =
    personal || PORTFOLIO.personal;
  const cvUrl = personal?.cvUrl || PORTFOLIO.personal.cvUrl || "/CV_Kabore_Frank.pdf";
  // Photo dispo immédiatement si en cache ; initiales seulement lors du tout premier chargement
  const photo =
    profileLoading && !personal ? null : (personal || PORTFOLIO.personal).photo;
  const { github, linkedin, whatsapp } = PORTFOLIO.social;
  const { data: projects } = useCollection("projects");
  const { data: skills } = useCollection("skills");
  const { data: services } = useCollection("services");

  const expertises = services?.length ? services : PORTFOLIO.services;

  const handleCopyEmail = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const marqueeItems = (skills && skills.length ? skills : PORTFOLIO.skills)
    .map((s) => s.name)
    .filter(Boolean);
  const marquee = marqueeItems.length ? marqueeItems : DEFAULT_MARQUEE;

  const featured = projects?.length
    ? projects.filter((p) => p.featured).length
      ? projects.filter((p) => p.featured).slice(0, 3)
      : projects.slice(0, 3)
    : PORTFOLIO.projects.filter((p) => p.featured).slice(0, 3);

  const socials = [
    {
      href: github,
      icon: <GithubIcon width={15} height={15} />,
      label: "GitHub",
    },
    {
      href: linkedin,
      icon: <LinkedinIcon width={15} height={15} />,
      label: "LinkedIn",
    },
    {
      href: whatsapp,
      icon: <WhatsappIcon width={15} height={15} />,
      label: "WhatsApp",
    },
  ].filter((s) => s.href);

  const { data: settings } = useSettings();

  const allProjectsList = projects?.length ? projects : PORTFOLIO.projects;

  // Projet vedette : piloté depuis le Dashboard si featuredCaseId est défini
  const featuredCase = (() => {
    const id = settings?.featuredCaseId;
    if (id) {
      const byId = allProjectsList.find((p) => p.id === id);
      const byTitle = allProjectsList.find((p) => p.title === id);
      if (byId || byTitle) return byId || byTitle;
    }
    // Fallback par défaut
    return (
      allProjectsList.find((p) => p.title?.toLowerCase().includes("mypasso")) ||
      allProjectsList.find((p) => p.title?.toLowerCase().includes("passo")) ||
      allProjectsList.find((p) => p.featured && p.demo) ||
      allProjectsList[0]
    );
  })();


  return (
    <>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} cvUrl={cvUrl} />

      {/* ═══ HERO ═══════════════════════════ */}
      <section className="hero" aria-label="Introduction">
        <div className="container hero-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--terra-glow)", color: "var(--terra)", padding: "0.3rem 0.8rem", borderRadius: "var(--r-full)", border: "1px solid var(--terra-border)", fontFamily: "var(--mono)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
              Disponible pour stage &amp; opportunités
            </div>

            <h1 className="hero-title">
              {firstName} {lastName}.
              <span className="hero-line2">Développeur web &amp; mobile.</span>
            </h1>
            <p className="hero-sub">
              {heroSubtitle || PORTFOLIO.personal.heroSubtitle}
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => onNavigate("portfolio")}
                id="hero-cta-projects"
              >
                Voir les projets <ArrowUpRightIcon width={15} height={15} />
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setCvOpen(true)}
                id="hero-cta-cv-preview"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                Aperçu du CV <ArrowUpRightIcon width={14} height={14} />
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => onNavigate("contact")}
                id="hero-cta-contact"
              >
                Me contacter
              </button>
            </div>

            <div className="hero-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  className="social-chip"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  {s.icon} {s.label}
                </a>
              ))}
              <span className="sep">·</span>
              <button
                className="social-chip"
                onClick={handleCopyEmail}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.76rem",
                  cursor: "pointer",
                  background: copiedEmail ? "var(--terra-glow)" : undefined,
                  color: copiedEmail ? "var(--terra)" : undefined,
                  borderColor: copiedEmail ? "var(--terra-border)" : undefined,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
                title="Cliquer pour copier l'email"
              >
                {copiedEmail ? "✓ Email copié !" : email}
              </button>
            </div>
          </div>

          {/* Photo */}
          <div className="hero-photo-wrap">
            <div className="hero-photo-glow" aria-hidden="true" />
            <div className="hero-photo">
              <div className="hero-photo-img">
                {photo ? (
                  <img src={photo} alt={`Photo de ${firstName} ${lastName}`} />
                ) : (
                  <div className="hero-photo-initials">{initials}</div>
                )}
              </div>
              <div className="hero-photo-overlay" aria-hidden="true" />
              <span className="hero-photo-status">
                <i aria-hidden="true" /> Disponible
              </span>
              <span className="hero-photo-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {location || "Burkina Faso"}
              </span>
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

      {/* ═══ DISPONIBILITÉ & TECHNOS ════════ */}
      <section className="section-sm" aria-label="Statut et technologies">
        <div className="container">
          <div className="status-box">
            <p className="status-line">
              Passionné de <strong>développement web</strong> · Des idées aux
              applications en ligne
            </p>
            <div className="tech-badges">
              {(skills && skills.length ? skills : PORTFOLIO.skills).map(
                (s) => (
                  <span className="tech-badge" key={s.name}>
                    {s.name}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BIO STRIP ═════════════════════ */}
      <section className="bio-strip" aria-label="Bio">
        <div className="container">
          <span className="section-num">À propos</span>
          <p className="bio-text">{bio}</p>
        </div>
      </section>

      {/* ═══ SERVICES ══════════════════════ */}
      <section
        className="section"
        style={{ paddingTop: "2rem" }}
        id="services"
        aria-label="Services"
      >
        <div className="container">
          <div className="section-head">
            <span className="section-num">01 · Expertises</span>
            <h2 className="section-title">
              Mes <em>compétences.</em>
            </h2>
          </div>

          <div className="service-grid" role="list">
            {expertises.map((s, i) => (
              <button
                key={s.title}
                className="service-card"
                role="listitem"
                onClick={() => onNavigate("portfolio")}
              >
                <span className="service-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-foot">
                  <span className="tag">{s.tag}</span>
                  <span className="service-arrow" aria-hidden="true">
                    <ArrowUpRightIcon width={14} height={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 02 · ÉTUDE DE CAS / PROJET PHARE ═══ */}
      {featuredCase && (
        <section
          className="section"
          style={{ paddingTop: "1rem" }}
          id="case-study"
          aria-label="Étude de cas principale"
        >
          <div className="container">
            <div className="section-head">
              <span className="section-num">02 · Étude de cas</span>
              <h2 className="section-title">
                Projet phare <em>en production.</em>
              </h2>
            </div>

            <div className="featured-case-card">
              <div className="featured-case-badge">
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "currentColor",
                    display: "inline-block",
                  }}
                />
                Application Web · Stage Kuilinga Technologies · En ligne
              </div>

              <h3 className="featured-case-title">{featuredCase.title}</h3>
              <p className="featured-case-desc">
                {featuredCase.longDescription || featuredCase.description}
              </p>

              <div className="featured-case-pillars">
                <div className="featured-pillar-item">
                  <span className="pillar-tag">01 · Contexte</span>
                  <span className="pillar-title">Projet de Stage en Entreprise</span>
                  <p className="pillar-text">
                    Développé en conditions réelles chez Kuilinga Technologies, avec intégration à une équipe et respect des délais et des standards de production.
                  </p>
                </div>
                <div className="featured-pillar-item">
                  <span className="pillar-tag">02 · Stack Technique</span>
                  <span className="pillar-title">Laravel · React · MySQL</span>
                  <p className="pillar-text">
                    Architecture MVC Laravel pour l'API back-end, React SPA pour l'interface utilisateur, base de données relationnelle MySQL.
                  </p>
                </div>
                <div className="featured-pillar-item">
                  <span className="pillar-tag">03 · Résultat</span>
                  <span className="pillar-title">Application Déployée &amp; Fonctionnelle</span>
                  <p className="pillar-text">
                    Application livrée, testée et mise en production. Interface responsive, fluide sur mobile et desktop.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.85rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {featuredCase.demo && (
                  <a
                    href={featuredCase.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    id="case-study-live-demo"
                  >
                    Tester le site en direct <ArrowUpRightIcon width={15} height={15} />
                  </a>
                )}
                {featuredCase.github && (
                  <a
                    href={featuredCase.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                    id="case-study-github"
                  >
                    Code source <ArrowUpRightIcon width={14} height={14} />
                  </a>
                )}
                <button
                  className="btn btn-ghost"
                  onClick={() => setSelected(featuredCase)}
                  id="case-study-details"
                >
                  Détails techniques
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 03 · PROJETS SÉLECTIONNÉS ══════ */}
      <section
        className="section"
        style={{ paddingTop: "1rem" }}
        id="work"
        aria-label="Projets sélectionnés"
      >
        <div className="container">
          <div
            className="section-head"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <span className="section-num">03 · Réalisations</span>
              <h2 className="section-title">
                <em>Autres projets</em> sélectionnés.
              </h2>
            </div>
            <button
              className="btn btn-ghost"
              onClick={() => onNavigate("portfolio")}
              id="see-all-projects"
            >
              Voir tous les projets <ArrowUpRightIcon width={14} height={14} />
            </button>
          </div>

          <div className="proj-cards proj-cards--tri" role="list">
            {featured.map((p, i) => (
              <ProjectRow
                key={p.id || p.title}
                project={p}
                index={i}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 04 · MÉTHODE ═══════════════════ */}
      <section className="section" aria-label="Méthode de travail">
        <div className="container">
          <div className="section-head">
            <span className="section-num">04 · Méthode</span>
            <h2 className="section-title">
              Ma méthode de <em>travail.</em>
            </h2>
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

      {/* ═══ 05 · ATOUTS RECRUTEUR ═══════════ */}
      <section className="section" aria-label="Pourquoi me recruter">
        <div className="container">
          <div className="section-head">
            <span className="section-num">05 · Atouts Recruteur</span>
            <h2 className="section-title">
              Pourquoi collaborer avec <em>moi ?</em>
            </h2>
          </div>

          <div className="why-me-grid">
            <div className="why-me-card">
              <div className="why-me-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
              </div>
              <h3>Pratique en Entreprise</h3>
              <p>
                Stage formateur chez Kuilinga Technologies : intégration
                d'interfaces Laravel &amp; React, respect des normes
                d'architecture et collaboration en équipe agile.
              </p>
            </div>

            <div className="why-me-card">
              <div className="why-me-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
              </div>
              <h3>Rigueur &amp; Code Propre</h3>
              <p>
                Structuration claire, souci des détails ergonomiques et
                accessibilité. Je conçois des solutions maintenables plutôt que
                de simples prototypes éphémères.
              </p>
            </div>

            <div className="why-me-card">
              <div className="why-me-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              </div>
              <h3>4 Certifications Reconnues</h3>
              <p>
                Certifié Coursera (JavaScript, Développement Front-End) et Cisco
                (Cybersécurité, IoT), attestant d'une autonomie et d'une soif
                continue d'apprendre.
              </p>
            </div>

            <div className="why-me-card">
              <div className="why-me-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h3>Opérationnel &amp; Motivé</h3>
              <p>
                Actuellement en 3ème année de Génie Logiciel à Bobo-Dioulasso,
                disponible pour un stage ou une mission technique (sur place ou
                en télétravail).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ════════════════════ */}
      <section className="section-sm" aria-label="Passer à l'action">
        <div className="container">
          <div className="cta-box">
            <div className="cta-box-badge">
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "currentColor",
                  display: "inline-block",
                }}
              />
              Opportunités &amp; Collaborations
            </div>
            <h2 className="cta-box-title">
              Donnons vie à vos prochains projets.
            </h2>
            <p className="cta-box-desc">
              Que ce soit pour un stage, un contrat ou une mission technique, je
              suis prêt à apporter de la valeur et de l'énergie à votre équipe.
            </p>
            <div className="cta-box-actions">
              <button
                className="btn btn-primary"
                onClick={() => onNavigate("contact")}
                id="cta-box-contact-btn"
              >
                Discuter ensemble <ArrowUpRightIcon width={15} height={15} />
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setCvOpen(true)}
                id="cta-box-cv-btn"
              >
                Consulter mon CV <ArrowUpRightIcon width={14} height={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

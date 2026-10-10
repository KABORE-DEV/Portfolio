import { useState } from "react";
import { useCollection, useProfile } from "../hooks/useFirestore.js";
import { PORTFOLIO } from "../data.js";
import { GraduationIcon, ArrowDownIcon, ArrowUpRightIcon } from "../icons.jsx";
import { TECH_ICONS } from "../techIcons.jsx";
import { motion } from "framer-motion";
import { viewportOnce } from "../motion.js";
import CvModal from "../components/CvModal.jsx";

function TimelineItem({ item, type }) {
  const title = type === "education" ? item.degree : item.role;
  const sub   = type === "education" ? item.school : item.company;
  const date  = item.period;

  return (
    <div className="tl-item">
      <p className="tl-date">{date}</p>
      <h3 className="tl-title">{title}</h3>
      {sub && <p className="tl-sub">{sub}</p>}
      {item.description && <p className="tl-desc">{item.description}</p>}
    </div>
  );
}

const LEVEL_SEGMENTS = {
  practiced: 3,
  familiar: 2,
  learning: 1,
};
const LEVEL_LABELS = {
  practiced: "Utilisé",
  familiar: "À l'aise",
  learning: "En cours",
};

function SkillBar({ skill }) {
  let icon = null;
  if (skill.iconType === "url" && skill.iconUrl) {
    icon = <img src={skill.iconUrl} alt={skill.name} loading="lazy" />;
  } else {
    icon = TECH_ICONS[skill.name] || TECH_ICONS[skill.iconKey] || null;
  }
  const segments = LEVEL_SEGMENTS[skill.level] ?? 2;
  const label    = LEVEL_LABELS[skill.level] || skill.level || "";

  return (
    <div className="skill-bar-card" title={skill.context}>
      <div className="skill-bar-top">
        <div className="skill-bar-name">
          <span className="skill-bar-icon">
            {icon || (
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", fontWeight: 700 }}>
                {skill.name.slice(0, 2)}
              </span>
            )}
          </span>
          <span>{skill.name}</span>
        </div>
        {label && <span className="skill-bar-level">{label}</span>}
      </div>
      <div className="skill-bar-segments" role="img" aria-label={`Niveau : ${label}`}>
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className={`skill-bar-seg${i < segments ? " is-on" : ""}`}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ResumePage() {
  const [cvOpen, setCvOpen]  = useState(false);
  const { data: profile }    = useProfile();
  const { data: education }  = useCollection("education");
  const { data: experience } = useCollection("experience");
  const { data: skills }     = useCollection("skills");
  const { data: certifications } = useCollection("certifications");

  const cvUrl = profile?.cvUrl || PORTFOLIO.personal.cvUrl || "/CV_Kabore_Frank.pdf";

  const allSkills = skills?.length ? skills : PORTFOLIO.skills;
  const languages  = allSkills.filter(s => s.category === "front" || s.category === "back");
  const frameworks = allSkills.filter(s => s.category === "framework");
  const tools      = allSkills.filter(s => s.category === "tools");

  const edu = education?.length ? education : PORTFOLIO.education;
  const exp = experience?.length ? experience : PORTFOLIO.experience;
  const certs = certifications?.length ? certifications : (PORTFOLIO.certifications || []);

  return (
    <>
      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} cvUrl={cvUrl} />

      {/* ═══ HEADER ═════════════════════════ */}
      <div className="page-head">
        <div className="container">
          <span className="section-num">Parcours</span>
          <h1 className="section-title"><em>Mon</em> parcours.</h1>
          <p className="section-desc" style={{ marginBottom: "1.75rem" }}>
            Formation, expériences, compétences et certifications professionnelles.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setCvOpen(true)}
              className="btn btn-primary"
              id="resume-preview-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              Aperçu du CV <ArrowUpRightIcon width={14} height={14} />
            </button>
            <a
              href={cvUrl}
              download="CV_Frank_KABORE.pdf"
              className="btn btn-ghost"
              id="resume-download-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              Télécharger le CV <ArrowDownIcon width={14} height={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">

          {/* ═══ TIMELINE ═══════════════════ */}
          <div className="timeline-grid">
            <div>
              <div className="tl-head">
                <span className="tl-ico"><GraduationIcon width={17} height={17} /></span>
                <h2>Formation</h2>
              </div>
              <div className="timeline">
                {edu.map((item, i) => (
                  <TimelineItem key={i} item={item} type="education" />
                ))}
              </div>
            </div>

            <div>
              <div className="tl-head">
                <span className="tl-ico">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </span>
                <h2>Expérience</h2>
              </div>
              <div className="timeline">
                {exp.length > 0
                  ? exp.map((item, i) => (
                      <TimelineItem key={i} item={item} type="experience" />
                    ))
                  : (
                    <div style={{ padding: "1.25rem 0", color: "var(--text-2)", fontSize: "0.92rem" }}>
                      En recherche de nouvelles opportunités professionnelles.
                    </div>
                  )
                }
              </div>
            </div>
          </div>

          {/* ═══ BOÎTE À OUTILS ═════════════ */}
          <div className="skills-card">
            <div className="section-head" style={{ marginBottom: "2.25rem" }}>
              <span className="section-num">Compétences</span>
              <h2 className="section-title"><em>Compétences</em> techniques.</h2>
            </div>

            {languages.length > 0 && (
              <>
                <h4 className="tool-group-label">Langages de programmation</h4>
                <div className="skills-bars">
                  {languages.map(s => <SkillBar key={s.name} skill={s} />)}
                </div>
              </>
            )}
            {frameworks.length > 0 && (
              <>
                <h4 className="tool-group-label">Frameworks</h4>
                <div className="skills-bars">
                  {frameworks.map(s => <SkillBar key={s.name} skill={s} />)}
                </div>
              </>
            )}
            {tools.length > 0 && (
              <>
                <h4 className="tool-group-label">Outils</h4>
                <div className="skills-bars">
                  {tools.map(s => <SkillBar key={s.name} skill={s} />)}
                </div>
              </>
            )}

            <div style={{ marginTop: "2.25rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
              <h4 className="tool-group-label">Langues</h4>
              <div className="tags">
                {[
                  { name: "Français", level: "Langue maternelle" },
                  { name: "Anglais",  level: "Technique / Professionnel" },
                  { name: "Mooré",    level: "Courant" },
                ].map(l => (
                  <span key={l.name} className="tag" title={l.level}>{l.name}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ CERTIFICATIONS VÉRIFIÉES ═════ */}
          {certs?.length > 0 && (
            <div className="skills-card" style={{ marginTop: "2.5rem" }}>
              <div className="section-head" style={{ marginBottom: "1.75rem" }}>
                <span className="section-num">Accréditations</span>
                <h2 className="section-title">Certifications <em>professionnelles.</em></h2>
              </div>
              <div className="certs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
                {certs.map((c, idx) => (
                  <div
                    key={idx}
                    className="cert-card"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-lg)",
                      padding: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "0.85rem",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", fontWeight: 700, color: "var(--terra)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                          {c.issuer}
                        </span>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--text-3)" }}>
                          {c.date}
                        </span>
                      </div>
                      <h4 style={{ fontFamily: "var(--font-head)", fontSize: "0.98rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>
                        {c.title}
                      </h4>
                    </div>
                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                        style={{ alignSelf: "flex-start", fontSize: "0.72rem", padding: "0.4rem 0.8rem", display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        Vérifier l'accréditation <ArrowUpRightIcon width={12} height={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

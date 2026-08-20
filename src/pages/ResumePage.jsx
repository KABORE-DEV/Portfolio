import { useCollection } from "../hooks/useFirestore.js";
import { PORTFOLIO } from "../data.js";
import { GraduationIcon, ArrowDownIcon } from "../icons.jsx";
import { TECH_ICONS } from "../techIcons.jsx";
import { motion } from "framer-motion";
import { viewportOnce } from "../motion.js";

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
  const { data: education }  = useCollection("education");
  const { data: experience } = useCollection("experience");
  const { data: skills }     = useCollection("skills");

  const allSkills = skills?.length ? skills : PORTFOLIO.skills;
  const languages  = allSkills.filter(s => s.category === "front" || s.category === "back");
  const frameworks = allSkills.filter(s => s.category === "framework");
  const tools      = allSkills.filter(s => s.category === "tools");

  const edu = education?.length ? education : PORTFOLIO.education;
  const exp = experience?.length ? experience : PORTFOLIO.experience;

  return (
    <>
      {/* ═══ HEADER ═════════════════════════ */}
      <div className="page-head">
        <div className="container">
          <span className="section-num">Parcours</span>
          <h1 className="section-title"><em>Mon</em> parcours.</h1>
          <p className="section-desc" style={{ marginBottom: "1.75rem" }}>
            Formation, expériences et compétences professionnelles.
          </p>
          <a href="/CV_Kabore_Frank.pdf" download className="btn btn-primary" id="resume-download-btn">
            Télécharger le CV <ArrowDownIcon width={14} height={14} />
          </a>
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

        </div>
      </div>
    </>
  );
}

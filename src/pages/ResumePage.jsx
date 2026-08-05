import { useCollection } from "../hooks/useFirestore.js";
import { PORTFOLIO } from "../data.js";
import { GraduationIcon, ArrowDownIcon } from "../icons.jsx";
import { TECH_ICONS } from "../techIcons.jsx";

function TimelineItem({ item, type, isLast }) {
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

/* ── Ticket outil (boîte à outils) ─────── */
function ToolCard({ skill }) {
  let icon = null;
  if (skill.iconType === "url" && skill.iconUrl) {
    icon = <img src={skill.iconUrl} alt={skill.name} loading="lazy" />;
  } else {
    icon = TECH_ICONS[skill.name] || TECH_ICONS[skill.iconKey] || null;
  }

  return (
    <div className="tool-card" title={skill.context}>
      <div className="tool-icon">{icon}</div>
      <div className="tool-info">
        <p className="tool-name">{skill.name}</p>
        <p className="tool-level">{skill.context || "—"}</p>
      </div>
    </div>
  );
}

export default function ResumePage() {
  const { data: education }  = useCollection("education");
  const { data: experience } = useCollection("experience");
  const { data: skills }     = useCollection("skills");

  const allSkills = skills?.length ? skills : PORTFOLIO.skills;
  const front = allSkills.filter(s => s.category === "front");
  const back  = allSkills.filter(s => s.category === "back");
  const tools = allSkills.filter(s => s.category === "tools");

  const edu = education?.length ? education : PORTFOLIO.education;
  const exp = experience?.length ? experience : PORTFOLIO.experience;

  return (
    <>
      {/* ═══ HEADER ═════════════════════════ */}
      <div className="page-head">
        <div className="container">
          <span className="section-num">Parcours</span>
          <h1 className="section-title">Le chemin, <em>jusqu'ici.</em></h1>
          <p className="section-desc" style={{ marginBottom: "1.75rem" }}>
            Formation, expériences et compétences — l'histoire d'un étudiant qui aime coder.
          </p>
          <a href="/CV_Kabore_Frank.pdf" download className="btn btn-primary">
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
                  <TimelineItem key={i} item={item} type="education" isLast={i === edu.length - 1} />
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
                      <TimelineItem key={i} item={item} type="experience" isLast={i === exp.length - 1} />
                    ))
                  : (
                    <div style={{ padding: "1.25rem 0", color: "var(--text-2)", fontSize: "0.92rem" }}>
                      Toujours en apprentissage, prêt pour de nouveaux défis. ✦
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
              <h2 className="section-title">La boîte à <em>outils.</em></h2>
            </div>

            {front.length > 0 && (
              <>
                <h4 className="tool-group-label">Front-end</h4>
                <div className="tools-grid">
                  {front.map(s => <ToolCard key={s.name} skill={s} />)}
                </div>
              </>
            )}
            {back.length > 0 && (
              <>
                <h4 className="tool-group-label">Back-end</h4>
                <div className="tools-grid">
                  {back.map(s => <ToolCard key={s.name} skill={s} />)}
                </div>
              </>
            )}
            {tools.length > 0 && (
              <>
                <h4 className="tool-group-label">Outils</h4>
                <div className="tools-grid">
                  {tools.map(s => <ToolCard key={s.name} skill={s} />)}
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

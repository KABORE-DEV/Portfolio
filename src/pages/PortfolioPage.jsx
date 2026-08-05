import { useState } from "react";
import { useCollection } from "../hooks/useFirestore.js";
import { PORTFOLIO } from "../data.js";
import ProjectModal from "../components/ProjectModal.jsx";
import { ArrowUpRightIcon } from "../icons.jsx";

export default function PortfolioPage() {
  const [selected, setSelected] = useState(null);
  const { data: projects }       = useCollection("projects");
  const { data: certifications } = useCollection("certifications");

  const allProjects = projects?.length ? projects : PORTFOLIO.projects;
  const allCerts    = certifications?.length ? certifications : (PORTFOLIO.certifications || []);

  return (
    <>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      {/* ═══ HEADER ═════════════════════════ */}
      <div className="page-head">
        <div className="container">
          <span className="section-num">Projets</span>
          <h1 className="section-title">Des projets qui <em>parlent pour moi.</em></h1>
          <p className="section-desc">
            Des idées transformées en vraies choses — cliquez sur un projet pour voir les détails.
          </p>
        </div>
      </div>

      <div className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          {/* ═══ PROJETS ════════════════════ */}
          <div className="list">
            {allProjects.map((p, i) => (
              <button key={p.id || p.title} className="list-item" onClick={() => setSelected(p)}>
                <span className="list-num">{String(i + 1).padStart(2, "0")}</span>
                <div style={{ textAlign: "left" }}>
                  <h3 className="list-title">{p.title}</h3>
                  <p className="list-desc">{p.description}</p>
                </div>
                <div className="list-meta">
                  {p.status && <span className="tag" style={{ color: "var(--accent)", borderColor: "var(--accent-border)", background: "var(--accent-glow)" }}>{p.status}</span>}
                  <span className="list-arrow"><ArrowUpRightIcon width={16} height={16} /></span>
                </div>
              </button>
            ))}
          </div>

          {/* ═══ CERTIFICATIONS ═════════════ */}
          {allCerts.length > 0 && (
            <div style={{ marginTop: "5rem" }}>
              <div className="section-head">
                <span className="section-num">Certifications</span>
                <h2 className="section-title">Les badges sur le <em>chapeau.</em></h2>
              </div>
              <div className="cert-list">
                {allCerts.map((c, i) => (
                  <div key={c.id || i} className="cert-item">
                    <div>
                      <p className="cert-title">
                        {c.url
                          ? <a href={c.url} target="_blank" rel="noreferrer">{c.title} <ArrowUpRightIcon width={13} height={13} /></a>
                          : c.title
                        }
                      </p>
                      <p style={{ color: "var(--text-2)", fontSize: "0.85rem", marginTop: "0.2rem" }}>{c.issuer}</p>
                    </div>
                    <span className="cert-meta"><b>{c.date}</b></span>
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

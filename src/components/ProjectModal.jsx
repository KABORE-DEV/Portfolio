import { useEffect } from "react";
import { createPortal } from "react-dom";
import { TECH_ICONS } from "../techIcons.jsx";
import { ArrowUpRightIcon, GithubIcon } from "../icons.jsx";
import { stopLenis, startLenis } from "../lib/scroll.js";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    stopLenis();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      startLenis();
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" data-lenis-prevent onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <span className="modal-eyebrow">Projet</span>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="modal-body">
          {project.image && (
            <div className="modal-media">
              <img src={project.image} alt={project.title} loading="lazy" />
            </div>
          )}
          <h2 className="modal-title">{project.title}</h2>
          {project.status && (
            <span className="tag" style={{ color: "var(--accent)", borderColor: "var(--accent-border)", background: "var(--accent-glow)", marginTop: "0.6rem", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              {project.status}
            </span>
          )}
          
          <p className="modal-desc" style={{ marginTop: "1.5rem" }}>{project.longDescription || project.description}</p>

          {project.technologies?.length > 0 && (
            <div className="modal-tech-list" style={{ marginTop: "2rem" }}>
              <div className="tags">
                {project.technologies.map(t => (
                  <span key={t} className="tag" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    {TECH_ICONS[t] && <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>{TECH_ICONS[t]}</span>}
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="modal-links" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                Voir la démo <ArrowUpRightIcon width={14} height={14} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <GithubIcon width={14} height={14} /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

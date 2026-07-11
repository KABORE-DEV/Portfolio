import { useState, useEffect } from "react"
import { PORTFOLIO } from "../data.js"

function ProjectModal({ project, onClose }) {
  // Fermer avec Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  // Délai pour l'animation d'ouverture
  const [open, setOpen] = useState(false)
  useEffect(() => { setTimeout(() => setOpen(true), 10) }, [])

  const handleClose = () => {
    setOpen(false)
    setTimeout(onClose, 300)
  }

  const techColors = {
    "Laravel": "#FF2D20", "React": "#61DAFB", "MySQL": "#00618A",
    "PHP": "#8892BF", "HTML": "#E34F26", "CSS": "#1572B6",
    "JavaScript": "#F7DF1E", "Java": "#007396", "C": "#A8B9CC",
    "SQL": "#336791", "Figma": "#F24E1E", "Git / GitHub": "#F05032",
    "Python": "#3776AB",
  }

  return (
    <div className={`modal ${open ? "modal--open" : ""}`}>
      <div className="modal__overlay" onClick={handleClose} />
      <div className="modal__container">
        <button className="modal__close" onClick={handleClose} aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Placeholder visuel coloré en haut */}
        <div className="modal__image">
          <div className="modal__image-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{width: "80px", height: "80px", opacity: 0.3}}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>

        <div className="modal__content">
          <div style={{display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap"}}>
            <h2 className="modal__title" style={{marginBottom: 0}}>{project.title}</h2>
            {project.status && (
              <span className="project-card__badge">{project.status}</span>
            )}
          </div>

          <p className="modal__desc">{project.longDescription || project.description}</p>

          {project.features && project.features.length > 0 && (
            <div className="modal__section">
              <p className="modal__section-title">Fonctionnalités</p>
              <ul className="modal__features">
                {project.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}

          <div className="modal__section">
            <p className="modal__section-title">Technologies</p>
            <div className="modal__techs">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="project-card__tech"
                  style={{
                    borderColor: techColors[t] ? `${techColors[t]}40` : undefined,
                    color: techColors[t] || undefined,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="modal__actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn--outline">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{width:"18px", height:"18px", marginRight:"8px"}}>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Code GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn--primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"18px", height:"18px", marginRight:"8px"}}>
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                Voir la démo
              </a>
            )}
            {project.links && project.links.map((link, i) => (
              <a href={link.url} target="_blank" rel="noreferrer" className="btn btn--outline" key={i}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { projects } = PORTFOLIO
  const [selected, setSelected] = useState(null)

  return (
    <section className="section" id="projets">
      <div className="container">
        <div className="section__header" data-animate="slide-up">
          <span className="section__tag">03. Projets</span>
          <h2 className="section__title">Mes réalisations</h2>
        </div>

        <div className="projects__grid" id="projects-grid">
          {projects.map((project, idx) => (
            <article
              className="project-card"
              data-animate="slide-up"
              style={{ "--delay": `${idx * 0.1}s` }}
              key={idx}
            >
              {/* Zone visuelle haut de carte */}
              <div className="project-card__image">
                <div className="project-card__image-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{width:"48px", height:"48px", opacity: 0.3}}>
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                {project.status && (
                  <span className="project-card__badge">{project.status}</span>
                )}
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__techs">
                  {project.technologies.map((t) => (
                    <span className="project-card__tech" key={t}>{t}</span>
                  ))}
                </div>

                <button
                  className="project-card__detail-btn"
                  onClick={() => setSelected(project)}
                  aria-label={`Voir les détails de ${project.title}`}
                >
                  Voir les détails
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"16px", height:"16px", marginLeft:"6px"}}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

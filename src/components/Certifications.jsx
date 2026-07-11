import { PORTFOLIO } from "../data.js"

function CertIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
    </svg>
  )
}

export default function Certifications() {
  const { certifications } = PORTFOLIO

  if (!certifications || certifications.length === 0) return null

  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section__header" data-animate="slide-up">
          <span className="section__tag">05. Certifications</span>
          <h2 className="section__title">Certifications & badges</h2>
        </div>

        <div className="certs__grid" id="certifications-grid">
          {certifications.map((cert, idx) => (
            <article
              className="cert-card"
              data-animate="slide-up"
              style={{ "--delay": `${idx * 0.1}s` }}
              key={idx}
            >
              <div className="cert-card__icon">
                <CertIcon style={{ width: "26px", height: "26px" }} />
              </div>
              <div className="cert-card__body">
                <h3 className="cert-card__title">{cert.title}</h3>
                <p className="cert-card__meta">
                  <span className="cert-card__issuer">{cert.issuer}</span>
                  <span className="cert-card__dot">•</span>
                  <span className="cert-card__date">Émise en {cert.date}</span>
                </p>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cert-card__link"
                  >
                    Voir le certificat
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "14px", height: "14px", marginLeft: "6px" }}>
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

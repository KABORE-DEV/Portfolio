import { PORTFOLIO } from "../data.js";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "../icons.jsx";

export default function Hero() {
  const { firstName, lastName, title, subtitle } = PORTFOLIO.personal;
  const { github, linkedin, whatsapp } = PORTFOLIO.social;
  const { skills, projects, education } = PORTFOLIO;

  return (
    <section className="hero section" id="accueil">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid"></div>
        <div className="hero__glow hero__glow--1"></div>
        <div className="hero__glow hero__glow--2"></div>
      </div>

      <div className="container hero__content">
        {/* Texte gauche */}
        <div className="hero__text">
          <p className="hero__greeting" data-animate="slide-up">
            Bonjour, je suis
          </p>
          <h1 className="hero__name" data-animate="slide-up" data-delay="0.1">
            <span>{firstName}</span>
            <span className="hero__name-accent"> {lastName}</span>
          </h1>
          <p className="hero__title" data-animate="slide-up" data-delay="0.2">
            {title}
          </p>
          <p
            className="hero__subtitle"
            data-animate="slide-up"
            data-delay="0.3"
          >
            {subtitle}
          </p>

          <div
            className="hero__actions"
            data-animate="slide-up"
            data-delay="0.4"
          >
            <a href="#projets" className="btn btn--primary">
              Voir mes projets
            </a>
            <a href="#contact" className="btn btn--outline">
              Me contacter
            </a>
          </div>

          <div
            className="hero__social"
            data-animate="slide-up"
            data-delay="0.5"
          >
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <GithubIcon width={20} height={20} />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <LinkedinIcon width={20} height={20} />
              </a>
            )}
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="WhatsApp"
              >
                <WhatsappIcon width={20} height={20} />
              </a>
            )}
          </div>
        </div>

        {/* Visuel droite */}
        <div className="hero__visual" data-animate="fade-in" data-delay="0.3">
          {/* Terminal principal */}
          <div
            className="hero__code-card"
            data-animate="slide-left"
            data-delay="0.4"
          >
            <div className="code-card">
              <div className="code-card__header">
                <span className="code-card__dot code-card__dot--red"></span>
                <span className="code-card__dot code-card__dot--yellow"></span>
                <span className="code-card__dot code-card__dot--green"></span>
                <span className="code-card__filename">developer.js</span>
              </div>
              <pre className="code-card__body">
                <code>
                  <span className="code-keyword">const</span>{" "}
                  <span className="code-var">developer</span> = {"{"}
                  {"\n"}
                  {"  "}
                  <span className="code-prop">name</span>:{" "}
                  <span className="code-string">
                    "{firstName} {lastName}"
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="code-prop">role</span>:{" "}
                  <span className="code-string">"{title}"</span>,{"\n"}
                  {"  "}
                  <span className="code-prop">passion</span>:{" "}
                  <span className="code-string">"Créer des apps"</span>,{"\n"}
                  {"  "}
                  <span className="code-prop">disponible</span>:{" "}
                  <span className="code-keyword">true</span>,{"\n"}
                  {"}"};
                </code>
              </pre>
            </div>
          </div>

          {/* Cartes stats flottantes */}
          <div
            className="hero__stat-card hero__stat-card--skills"
            data-animate="slide-up"
            data-delay="0.6"
          >
            <div className="hero__stat-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="20"
                height="20"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="hero__stat-value">{skills.length}+</div>
              <div className="hero__stat-label">Technologies</div>
            </div>
          </div>

          <div
            className="hero__stat-card hero__stat-card--projects"
            data-animate="slide-up"
            data-delay="0.7"
          >
            <div className="hero__stat-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="20"
                height="20"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <div>
              <div className="hero__stat-value">{projects.length}+</div>
              <div className="hero__stat-label">Projets</div>
            </div>
          </div>

          <div
            className="hero__stat-card hero__stat-card--edu"
            data-animate="slide-up"
            data-delay="0.8"
          >
            <div className="hero__stat-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="20"
                height="20"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div>
              <div className="hero__stat-value">
                {education[0]?.degree?.split(" ").slice(0, 1)[0]}
              </div>
              <div className="hero__stat-label">
                {education[0]?.school?.split(" ").slice(0, 3).join(" ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#apropos"
        className="hero__scroll"
        aria-label="Défiler vers le bas"
        data-animate="fade-in"
        data-delay="0.8"
      >
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line"></span>
      </a>
    </section>
  );
}

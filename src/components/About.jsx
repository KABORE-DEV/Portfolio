import { PORTFOLIO } from "../data.js";
import { MailIcon, PhoneIcon, MapPinIcon } from "../icons.jsx";

export default function About() {
  const { email, phone, location, bio, photo, initials } = PORTFOLIO.personal;
  const { projects, skills } = PORTFOLIO;

  const infoItems = [
    { label: "Email : ", value: email, icon: <MailIcon width={18} height={18} /> },
    {
      label: "Téléphone : ",
      value: phone,
      icon: <PhoneIcon width={18} height={18} />,
    },
    {
      label: "Localisation : ",
      value: location,
      icon: <MapPinIcon width={18} height={18} />,
    },
  ];

  return (
    <section className="about section" id="apropos">
      <div className="container">
        <div className="section__header" data-animate="slide-up">
          <span className="section__tag">01. À propos</span>
          <h2 className="section__title">Qui suis-je ?</h2>
        </div>

        <div className="about__grid">
          <div
            className="about__photo-wrapper"
            data-animate="slide-up"
            data-delay="0.1"
          >
            <div className="about__photo">
              {photo ? (
                <img
                  src={photo}
                  alt={`Photo de ${initials}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                  }}
                />
              ) : (
                <div className="about__photo-placeholder">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div
            className="about__text"
            data-animate="slide-up"
            data-delay="0.15"
          >
            <p className="about__bio">{bio}</p>
            <ul className="about__info">
              {infoItems.map((item, idx) => (
                <li className="about__info-item" key={idx}>
                  <div className="about__info-icon">{item.icon}</div>
                  <div>
                    <span className="about__info-label">{item.label}</span>
                    <span className="about__info-value">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="/CV_Kabore_Frank.pdf"
              className="btn btn--outline"
              id="cv-download"
              download
            >
              Télécharger mon CV
            </a>
          </div>

          <div
            className="about__stats"
            data-animate="slide-up"
            data-delay="0.2"
          >
            <div className="stat-card">
              <span className="stat-card__number">3</span>
              <span className="stat-card__label">Années d'études</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__number">{projects.length}</span>
              <span className="stat-card__label">Projets réalisés</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__number">{skills.length}</span>
              <span className="stat-card__label">Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

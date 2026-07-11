import { PORTFOLIO } from "../data.js"

export default function Parcours() {
  const { education, experience } = PORTFOLIO

  return (
    <section className="timeline section" id="parcours">
      <div className="container">
        <div className="section__header" data-animate="slide-up">
          <span className="section__tag">04. Parcours</span>
          <h2 className="section__title">Formation & expérience</h2>
        </div>

        <div className="timeline__wrapper">
          <div className="timeline__column">
            <h3 className="timeline__column-title" data-animate="slide-up">
              Formation
            </h3>
            <div className="timeline__list" id="education-list">
              {education.map((item, idx) => (
                <div className="timeline__item" data-animate="slide-up" key={idx}>
                  <div className="timeline__point"></div>
                  <div className="timeline__content">
                    <span className="timeline__date">{item.period}</span>
                    <h4 className="timeline__title">{item.degree}</h4>
                    <span className="timeline__subtitle">{item.school}</span>
                    <p className="timeline__text">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="timeline__column">
            <h3 className="timeline__column-title" data-animate="slide-up">
              Expérience
            </h3>
            <div className="timeline__list" id="experience-list">
              {experience.length > 0 ? (
                experience.map((item, idx) => (
                  <div className="timeline__item" data-animate="slide-up" key={idx}>
                    <div className="timeline__point"></div>
                    <div className="timeline__content">
                      <span className="timeline__date">{item.period}</span>
                      <h4 className="timeline__title">{item.role}</h4>
                      <span className="timeline__subtitle">{item.company}</span>
                      <p className="timeline__text">{item.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="timeline__item" data-animate="slide-up">
                  <div className="timeline__point"></div>
                  <div className="timeline__content">
                    <h4 className="timeline__title">Bientôt disponible</h4>
                    <p className="timeline__text">Je suis à la recherche d'un stage ou d'une première expérience pour mettre mes compétences en pratique.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

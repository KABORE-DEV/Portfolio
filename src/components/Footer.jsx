import { PORTFOLIO } from "../data.js";
import { GithubIcon, LinkedinIcon, ArrowUpRightIcon } from "../icons.jsx";

export default function Footer() {
  const { firstName, lastName } = PORTFOLIO.personal;
  const { github, linkedin } = PORTFOLIO.social;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Identité */}
          <div>
            <p className="footer-name">{firstName} <em>{lastName}</em></p>
            <p className="footer-tag">Étudiant en génie logiciel · créateur de trucs chics &amp; malins.</p>
          </div>

          {/* Crédit amusant */}
          <div className="footer-credit">
            <p className="footer-credit-sub">
              © {year} <strong>{firstName} {lastName}</strong> — fait maison, de la première ligne de code au dernier pixel,
              avec du <span className="footer-pop-accent">café</span> et un peu de <span className="footer-pop-accent">folie</span>.
            </p>
          </div>

          {/* Liens */}
          <div className="footer-links">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="footer-link">
                <GithubIcon width={15} height={15} /> GitHub <ArrowUpRightIcon width={12} height={12} />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer" className="footer-link">
                <LinkedinIcon width={15} height={15} /> LinkedIn <ArrowUpRightIcon width={12} height={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

import { PORTFOLIO } from "../data.js";
import { GithubIcon, LinkedinIcon, ArrowUpRightIcon } from "../icons.jsx";

export default function Footer() {
  const { firstName, lastName } = PORTFOLIO.personal;
  const { github, linkedin } = PORTFOLIO.social;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Pied de page">
      <div className="container">
        <div className="footer-grid">

          {/* Identité */}
          <div>
            <p className="footer-name">{firstName} <em>{lastName}</em></p>
            <p className="footer-tag">Développeur web &amp; mobile — étudiant en Génie Logiciel.</p>
          </div>

          {/* Crédit */}
          <div className="footer-credit">
            <p className="footer-credit-sub">
              © {year} <strong>{firstName} {lastName}</strong>. Tous droits réservés.
            </p>
          </div>

          {/* Liens */}
          <div className="footer-links">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="footer-link" aria-label="GitHub">
                <GithubIcon width={15} height={15} /> GitHub <ArrowUpRightIcon width={12} height={12} />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer" className="footer-link" aria-label="LinkedIn">
                <LinkedinIcon width={15} height={15} /> LinkedIn <ArrowUpRightIcon width={12} height={12} />
              </a>
            )}
          </div>

        </div>
      </div>
    </footer>
  );
}
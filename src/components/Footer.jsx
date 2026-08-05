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
            <p className="footer-name">{firstName} {lastName}</p>
            <p className="footer-tag">Étudiant en génie logiciel · créateur de trucs chics &amp; malins.</p>
          </div>

          {/* Crédit amusant */}
          <div className="footer-credit">
            <p className="footer-credit-main">
              Ce site a été <em>pensé, codé et déployé</em> par moi-même.
            </p>
            <p className="footer-credit-sub">
              © {year} {firstName} {lastName} — fait maison, de la première ligne de code au dernier pixel,
              avec beaucoup de café et un peu de folie.
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

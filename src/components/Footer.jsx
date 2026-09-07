import { PORTFOLIO } from "../data.js";
import { useProfile, useFooter } from "../hooks/useFirestore.js";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
  MailIcon,
  ArrowUpRightIcon,
} from "../icons.jsx";

export default function Footer() {
  const { data: profile } = useProfile();
  const { data: footer } = useFooter();

  const firstName = profile?.firstName || PORTFOLIO.personal.firstName;
  const lastName = profile?.lastName || PORTFOLIO.personal.lastName;

  // Accroche & Droits
  const tagline =
    footer?.tagline !== undefined
      ? footer.tagline
      : PORTFOLIO.footer?.tagline || "Développeur web & mobile — étudiant en Génie Logiciel.";

  const copyrightText =
    footer?.copyrightText !== undefined
      ? footer.copyrightText
      : PORTFOLIO.footer?.copyrightText || "Tous droits réservés.";

  const customName = footer?.customName;
  const displayName = customName ? (
    customName
  ) : (
    <>
      {firstName} <em>{lastName}</em>
    </>
  );

  const year = new Date().getFullYear();

  // Liens sociaux
  const showGithub = footer?.showGithub ?? true;
  const githubUrl =
    footer?.githubUrl || profile?.github || PORTFOLIO.social.github;

  const showLinkedin = footer?.showLinkedin ?? true;
  const linkedinUrl =
    footer?.linkedinUrl || profile?.linkedin || PORTFOLIO.social.linkedin;

  const showWhatsapp = footer?.showWhatsapp ?? false;
  const rawWhatsapp =
    footer?.whatsappUrl || profile?.whatsapp || PORTFOLIO.social.whatsapp;
  const whatsappUrl = rawWhatsapp
    ? rawWhatsapp.startsWith("http")
      ? rawWhatsapp
      : `https://wa.me/${rawWhatsapp.replace(/[^0-9]/g, "")}`
    : "";

  const showEmail = footer?.showEmail ?? false;
  const rawEmail = footer?.emailUrl || profile?.email || PORTFOLIO.personal.email;
  const emailUrl = rawEmail
    ? rawEmail.startsWith("mailto:")
      ? rawEmail
      : `mailto:${rawEmail}`
    : "";

  const customLinks = Array.isArray(footer?.customLinks)
    ? footer.customLinks
    : [];

  return (
    <footer className="site-footer" aria-label="Pied de page">
      <div className="container">
        <div className="footer-grid">

          {/* Identité & Tagline */}
          <div>
            <p className="footer-name">{displayName}</p>
            {tagline && <p className="footer-tag">{tagline}</p>}
          </div>

          {/* Crédit & Copyright */}
          <div className="footer-credit">
            <p className="footer-credit-sub">
              © {year} <strong>{customName || `${firstName} ${lastName}`}</strong>. {copyrightText}
            </p>
          </div>

          {/* Liens */}
          <div className="footer-links">
            {showGithub && githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-link"
                aria-label="GitHub"
              >
                <GithubIcon width={15} height={15} /> GitHub{" "}
                <ArrowUpRightIcon width={12} height={12} />
              </a>
            )}

            {showLinkedin && linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-link"
                aria-label="LinkedIn"
              >
                <LinkedinIcon width={15} height={15} /> LinkedIn{" "}
                <ArrowUpRightIcon width={12} height={12} />
              </a>
            )}

            {showWhatsapp && whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-link"
                aria-label="WhatsApp"
              >
                <WhatsappIcon width={15} height={15} /> WhatsApp{" "}
                <ArrowUpRightIcon width={12} height={12} />
              </a>
            )}

            {showEmail && emailUrl && (
              <a
                href={emailUrl}
                className="footer-link"
                aria-label="Envoyer un email"
              >
                <MailIcon width={15} height={15} /> Email{" "}
                <ArrowUpRightIcon width={12} height={12} />
              </a>
            )}

            {customLinks.map((link, idx) => {
              if (!link?.label || !link?.url) return null;
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                >
                  {link.label} <ArrowUpRightIcon width={12} height={12} />
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </footer>
  );
}
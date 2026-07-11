import { PORTFOLIO } from "../data.js"

export default function Footer() {
  const { firstName, lastName } = PORTFOLIO.personal
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__content">
        <p className="footer__copy">
          &copy; {year} — Tous droits réservés
        </p>
        <p className="footer__credit">
          Conçu &amp; développé par <span>{firstName} {lastName}</span>
        </p>
      </div>
    </footer>
  )
}

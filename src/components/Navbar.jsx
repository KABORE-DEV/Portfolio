import { useEffect, useState } from "react"
import { PORTFOLIO } from "../data.js"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("accueil")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = PORTFOLIO.nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -60% 0px" },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const go = () => {
    setOpen(false)
  }

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`} id="header">
      <nav className="nav container">
        <a href="#accueil" className="nav__logo" data-animate="fade-in" onClick={go}>
          <span className="nav__logo-bracket">&lt;</span>
          <span className="nav__logo-text">Portfolio</span>
          <span className="nav__logo-bracket">/&gt;</span>
        </a>

        <ul className={`nav__menu ${open ? "nav__menu--open" : ""}`} id="nav-menu">
          {PORTFOLIO.nav.map((item) => (
            <li className="nav__item" key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav__link ${active === item.id ? "active-link" : ""}`}
                onClick={go}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav__toggle ${open ? "nav__toggle--active" : ""}`}
          id="nav-toggle"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__toggle-bar"></span>
          <span className="nav__toggle-bar"></span>
          <span className="nav__toggle-bar"></span>
        </button>
      </nav>
    </header>
  )
}

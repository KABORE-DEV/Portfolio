import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO } from "../data.js";
import { useTheme } from "../contexts/ThemeContext.jsx";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");

  const { theme, toggleTheme } = useTheme();
  const { photo, initials } = PORTFOLIO.personal;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = PORTFOLIO.nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: scrolled ? "12px" : "20px",
        left: 0,
        right: 0,
        margin: "0 auto",
        zIndex: 1000,
        width: "90%",
        maxWidth: "860px",
        transition: "top 0.3s ease",
      }}
    >
      <div
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid var(--glass-border)",
          borderRadius: "9999px",
          padding: "8px 12px 8px 16px",
          display: "grid",
          /* 3 colonnes égales : left | center | right */
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* ── Gauche : liens sociaux ou vide ── */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* placeholder pour équilibrer */}
        </div>

        {/* ── Centre : liens de navigation ── */}
        <ul
          className="nav__menu-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {PORTFOLIO.nav.map((item) => (
            <motion.li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={go}
                style={{
                  color: active === item.id ? "var(--color-text)" : "var(--color-text-muted)",
                  fontWeight: active === item.id ? 600 : 400,
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  position: "relative",
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  background: active === item.id ? "var(--glass-bg-hover)" : "transparent",
                  display: "inline-block",
                  transition: "color 0.2s, background 0.2s",
                }}
              >
                {item.label}
                {active === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute", bottom: 2, left: "50%",
                      transform: "translateX(-50%)",
                      width: "4px", height: "4px",
                      background: "var(--color-accent)",
                      borderRadius: "50%",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* ── Droite : theme switcher + avatar ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}>
          {/* Bouton Theme */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, background: "var(--glass-bg-hover)" }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              transition: "background 0.2s",
            }}
            aria-label="Changer le thème"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </motion.button>

          {/* Avatar cliquable → accueil */}
          <motion.a
            href="#accueil"
            onClick={go}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--color-bg)",
              overflow: "hidden",
              border: "2px solid var(--color-accent)",
              textDecoration: "none",
              flexShrink: 0,
              boxShadow: "0 0 0 3px var(--color-accent-glow)",
            }}
          >
            {photo ? (
              <img src={photo} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>
                {initials}
              </span>
            )}
          </motion.a>

          {/* Bouton mobile */}
          <motion.button
            className={`nav__toggle ${open ? "nav__toggle--active" : ""}`}
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            style={{ display: "none" /* géré par media query */ }}
          >
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
          </motion.button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "24px",
              padding: "1.5rem",
              boxShadow: "var(--shadow-lg)",
              marginTop: "8px",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem", textAlign: "center" }}>
              {PORTFOLIO.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go}
                    style={{
                      color: active === item.id ? "var(--color-accent)" : "var(--color-text)",
                      fontWeight: active === item.id ? 600 : 400,
                      fontSize: "1.1rem",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

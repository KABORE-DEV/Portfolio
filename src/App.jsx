import { useState, Suspense, lazy } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext.jsx";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import ResumePage from "./pages/ResumePage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";
import { useSmoothScroll } from "./anim.js";
import { scrollToTop } from "./lib/scroll.js";
import "./variables.css";
import "./reset.css";
import "./style.css";

const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Login     = lazy(() => import("./pages/Login.jsx"));

/* ── SVG Icons ─────────────────────────────────── */
const SunIco  = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>;
const MoonIco = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const MenuIco = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const CloseIco = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const HomeIco = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg>;
const CvIco   = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const FolIco  = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>;
const MailIco = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const Monogram = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const NAV = [
  { id: "home",      label: "Accueil",  icon: <HomeIco /> },
  { id: "resume",    label: "Parcours", icon: <CvIco />   },
  { id: "portfolio", label: "Projets",  icon: <FolIco />  },
  { id: "contact",   label: "Contact",  icon: <MailIco /> },
];

/* ── Admin Section ──────────────────────────────── */
function AdminSection({ onBack }) {
  const { currentUser, loading } = useAuth();
  return (
    <div>
      <div className="admin-bar" style={{
        position: "sticky", top: "var(--nav-h)", zIndex: 50,
        background: "var(--surface)", borderBottom: "1px solid var(--border)",
        padding: "0.875rem 2rem", display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        <button onClick={onBack} className="btn btn-outline" style={{ padding: "7px 16px", fontSize: "0.82rem" }}>
          ← Retour
        </button>
        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Espace Administration
        </span>
      </div>
      {loading
        ? <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-2)", fontSize: "0.9rem" }}>Chargement…</div>
        : currentUser
          ? <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "var(--text-2)" }}>Chargement…</div>}><Dashboard /></Suspense>
          : <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "var(--text-2)" }}>Chargement…</div>}><Login /></Suspense>
      }
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────── */
function Navbar({ activePage, navigate, mobileOpen, setMobileOpen }) {
  const { theme, toggleTheme } = useTheme();
  /* Secret admin : triple-clic sur le logo */
  const [logoClicks, setLogoClicks] = useState(0);
  const handleLogoClick = () => {
    const n = logoClicks + 1;
    setLogoClicks(n);
    if (n >= 3) { setLogoClicks(0); navigate("admin"); }
    setTimeout(() => setLogoClicks(0), 2000);
  };

  return (
    <nav className="navbar" aria-label="Navigation principale">
      {/* Logo */}
      <div className="nav-logo" onClick={handleLogoClick} title="Frank KABORE" aria-label="Accueil" role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && handleLogoClick()}>
        <span className="nav-logo-badge" aria-hidden="true"><Monogram /></span>
      </div>

      {/* Desktop links */}
      <div className="nav-links" role="list">
        {NAV.map(n => (
          <button
            key={n.id}
            role="listitem"
            onClick={() => navigate(n.id)}
            className={`nav-link ${activePage === n.id ? "active" : ""}`}
            aria-current={activePage === n.id ? "page" : undefined}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* Right actions */}
      <div className="nav-right">
        <button onClick={toggleTheme} className="nav-theme-btn" aria-label="Changer de thème">
          {theme === "dark" ? <SunIco /> : <MoonIco />}
        </button>
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Menu mobile"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <CloseIco /> : <MenuIco />}
        </button>
      </div>
    </nav>
  );
}

/* ── Mobile Drawer ──────────────────────────────── */
function MobileDrawer({ activePage, navigate, open, onClose }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className={`mobile-menu-backdrop ${open ? "open" : ""}`} onClick={onClose} aria-hidden="true" />
      <div className={`mobile-menu ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu navigation">
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Navigation</span>
          <button className="mobile-menu-close" onClick={onClose} aria-label="Fermer"><CloseIco /></button>
        </div>
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => { navigate(n.id); onClose(); }}
            className={`mobile-nav-link ${activePage === n.id ? "active" : ""}`}
            aria-current={activePage === n.id ? "page" : undefined}
          >
            <span className="mobile-nav-icon">{n.icon}</span>
            {n.label}
          </button>
        ))}
        <button
          onClick={toggleTheme}
          style={{
            marginTop: "auto", paddingTop: "2rem",
            display: "flex", alignItems: "center", gap: "0.75rem",
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text-2)", fontFamily: "var(--mono)",
            fontSize: "0.68rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}
        >
          {theme === "dark" ? <SunIco /> : <MoonIco />}
          {theme === "dark" ? "Mode Clair" : "Mode Sombre"}
        </button>
      </div>
    </>
  );
}

/* ── Main App Shell ─────────────────────────────── */
function AppShell() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useSmoothScroll();

  const navigate = (id) => {
    setPage(id);
    setMobileOpen(false);
    scrollToTop();
  };

  const renderPage = () => {
    switch (page) {
      case "resume":    return <ResumePage />;
      case "portfolio": return <PortfolioPage />;
      case "contact":   return <ContactPage />;
      case "admin":     return <AdminSection onBack={() => navigate("home")} />;
      default:          return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="app-root">
      <Navbar
        activePage={page}
        navigate={navigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <MobileDrawer
        activePage={page}
        navigate={navigate}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="page-content" key={page}>
        {renderPage()}
      </div>
      {page !== "admin" && <Footer />}
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </ThemeProvider>
  );
}

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PORTFOLIO } from "../data.js"
import { useCollection } from "../hooks/useFirestore"

/* ── Couleurs officielles par techno ── */
const TECH_COLORS = {
  Laravel:      { bg: "rgba(255,45,32,0.08)",   border: "rgba(255,45,32,0.25)",   text: "#f87171" },
  React:        { bg: "rgba(97,218,251,0.08)",   border: "rgba(97,218,251,0.25)",  text: "#7dd3fc" },
  MySQL:        { bg: "rgba(0,97,138,0.08)",     border: "rgba(0,97,138,0.25)",   text: "#38bdf8" },
  PHP:          { bg: "rgba(136,146,191,0.08)",  border: "rgba(136,146,191,0.25)", text: "#cbd5e1" },
  HTML:         { bg: "rgba(228,77,38,0.08)",    border: "rgba(228,77,38,0.25)",   text: "#fb923c" },
  CSS:          { bg: "rgba(21,114,182,0.08)",   border: "rgba(21,114,182,0.25)",  text: "#60a5fa" },
  JavaScript:   { bg: "rgba(247,223,30,0.08)",   border: "rgba(247,223,30,0.25)",  text: "#fde047" },
  Java:         { bg: "rgba(0,115,150,0.08)",    border: "rgba(0,115,150,0.25)",   text: "#22d3ee" },
  C:            { bg: "rgba(168,185,204,0.08)",  border: "rgba(168,185,204,0.25)", text: "#e2e8f0" },
  "C++":        { bg: "rgba(101,154,210,0.08)",  border: "rgba(101,154,210,0.25)", text: "#93c5fd" },
  Python:       { bg: "rgba(55,118,171,0.08)",   border: "rgba(55,118,171,0.25)",  text: "#60a5fa" },
  SQL:          { bg: "rgba(51,103,145,0.08)",   border: "rgba(51,103,145,0.25)",  text: "#94a3b8" },
  PostgreSQL:   { bg: "rgba(51,103,145,0.08)",   border: "rgba(51,103,145,0.25)",  text: "#94a3b8" },
  Figma:        { bg: "rgba(242,78,30,0.08)",    border: "rgba(242,78,30,0.25)",   text: "#f87171" },
  "Git / GitHub":{ bg:"rgba(240,80,50,0.08)",    border: "rgba(240,80,50,0.25)",   text: "#fb923c" },
};

function getTechStyle(tech) {
  const cfg = TECH_COLORS[tech];
  if (cfg) return { background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text };
  return { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", color: "var(--color-text-muted)" };
}

/* ── Statut badge ── */
const STATUS_CONFIG = {
  "En ligne": { bg: "rgba(22, 163, 74, 0.15)", color: "#86efac", border: "rgba(22, 163, 74, 0.3)" },
  "Terminé":  { bg: "rgba(37, 99, 235, 0.15)", color: "#93c5fd", border: "rgba(37, 99, 235, 0.3)" },
  "En cours": { bg: "rgba(234, 88, 12, 0.15)", color: "#fdba74", border: "rgba(234, 88, 12, 0.3)" },
};
function statusStyle(s) {
  const c = STATUS_CONFIG[s];
  return c
    ? { background: c.bg, color: c.color, border: `1px solid ${c.border}` }
    : { background: "var(--glass-bg)", backdropFilter: "blur(8px)", color: "var(--color-text)", border: "1px solid var(--glass-border)" };
}

/* ════════════════════════════════════════
   Modal détail projet — style image 3
════════════════════════════════════════ */
function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.92 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "560px", maxHeight: "90vh", overflowY: "auto",
          borderRadius: "24px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          position: "relative",
          background: "var(--color-bg)",
          border: "1px solid var(--glass-border)",
        }}
      >
        {/* ── Header gradient (style image 3) ── */}
        <div style={{
          borderRadius: "24px 24px 0 0",
          background: "linear-gradient(160deg, #4c1d95, #1e40af, #0f172a)",
          padding: "3.5rem 2rem 2.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Glow subtil */}
          <div style={{
            position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)",
            width: "300px", height: "300px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)",
            pointerEvents: "none",
          }} />

          <h2 style={{
            fontSize: "1.8rem", fontWeight: 800,
            color: "#fff", margin: 0, position: "relative",
            letterSpacing: "-0.03em", lineHeight: 1.2,
          }}>
            {project.title}
          </h2>

          {project.status && (
            <span style={{
              display: "inline-block", marginTop: "16px",
              fontSize: "0.75rem", padding: "5px 16px",
              borderRadius: "9999px", fontWeight: 700,
              position: "relative",
              ...statusStyle(project.status),
            }}>
              {project.status}
            </span>
          )}

          {/* Bouton fermer */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Fermer"
            style={{
              position: "absolute", top: "16px", right: "16px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%", width: "38px", height: "38px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", fontSize: "1.1rem",
              fontWeight: 300,
            }}
          >
            ✕
          </motion.button>
        </div>

        {/* ── Contenu ── */}
        <div style={{ padding: "2rem" }}>
          {/* Description */}
          <p style={{
            fontSize: "0.92rem", color: "var(--color-text-muted)",
            lineHeight: 1.75, marginBottom: "1.5rem", margin: "0 0 1.5rem",
          }}>
            {project.longDescription || project.description}
          </p>

          {/* Fonctionnalités — bloc glass */}
          {project.features?.length > 0 && (
            <div style={{
              marginBottom: "1.75rem",
              background: "var(--glass-bg)",
              backdropFilter: "blur(16px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "16px", padding: "1.5rem",
            }}>
              <p style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--color-accent)",
                marginBottom: "1rem", margin: "0 0 1rem",
              }}>
                Fonctionnalités
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {project.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.88rem", color: "var(--color-text)" }}>
                    <span style={{ color: "var(--color-accent)", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0, lineHeight: 1.5 }}>›</span>
                    <span style={{ lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stack technique */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "0.85rem", margin: "0 0 0.85rem",
            }}>
              Stack technique
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {project.technologies.map((t) => (
                <span key={t} style={{
                  fontSize: "0.8rem", fontWeight: 600,
                  padding: "6px 16px", borderRadius: "9999px",
                  ...getTechStyle(t),
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Liens */}
          {(project.github || project.demo) && (
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {project.github && (
                <motion.a
                  href={project.github} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "12px 24px", borderRadius: "9999px",
                    background: "var(--glass-bg)", backdropFilter: "blur(12px)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--color-text)", fontSize: "0.88rem", fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Code source
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "12px 24px", borderRadius: "9999px",
                    background: "var(--color-accent)", color: "#fff",
                    fontSize: "0.88rem", fontWeight: 700,
                    textDecoration: "none", border: "none",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}>
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                  Voir la démo
                </motion.a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   Cartes projet — style image 2
════════════════════════════════════════ */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Projects() {
  const { data: projects, loading } = useCollection("projects");
  const [selected, setSelected] = useState(null);

  if (loading) return null;

  return (
    <section className="section" id="projets">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section__tag">03. Projets</span>
          <h2 className="section__title">
            Mes{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--color-accent), #ffffff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              réalisations
            </span>
          </h2>
        </motion.div>

        {/* Grille */}
        <div className="px-projects-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {projects.map((project, idx) => (
            <motion.article
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -6,
                borderColor: "var(--color-accent)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
                transition: { duration: 0.25 },
              }}
              style={{
                cursor: "pointer",
                background: "var(--glass-bg)",
                backdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border)",
                borderRadius: "20px",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                transition: "border-color 0.3s ease",
              }}
              onClick={() => setSelected(project)}
            >
              {/* Badge statut en haut */}
              {project.status && (
                <div>
                  <span style={{
                    fontSize: "0.7rem", padding: "4px 12px",
                    borderRadius: "9999px", fontWeight: 700,
                    ...statusStyle(project.status),
                  }}>
                    {project.status}
                  </span>
                </div>
              )}

              {/* Titre */}
              <h3 style={{
                fontSize: "1.1rem", fontWeight: 700,
                color: "var(--color-text)", margin: 0,
                lineHeight: 1.3,
              }}>
                {project.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: "0.88rem", color: "var(--color-text-muted)",
                lineHeight: 1.65, margin: 0,
              }}>
                {project.description}
              </p>

              {/* Features (courtes) */}
              {project.features?.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {project.features.slice(0, 3).map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <span style={{ color: "var(--color-text-muted)", fontSize: "0.78rem" }}>›</span>
                      <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Voir les détails — glass pill centré */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "8px", marginTop: "0.5rem",
                  padding: "10px 0",
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "12px",
                  fontSize: "0.82rem", fontWeight: 600,
                  color: "var(--color-text-muted)",
                  cursor: "pointer",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14, opacity: 0.6 }}>
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                </svg>
                Voir les détails
              </motion.div>

              {/* Tech badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "0.25rem" }}>
                {project.technologies.map((t) => (
                  <span key={t} style={{
                    fontSize: "0.72rem", fontWeight: 600,
                    padding: "4px 12px", borderRadius: "9999px",
                    ...getTechStyle(t),
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

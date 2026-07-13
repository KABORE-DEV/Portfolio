import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO } from "../data.js";
import { useCollection } from "../hooks/useFirestore";

const TECH_ICONS = {
  /* HTML5 — bouclier orange officiel */
  "HTML / CSS": (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M5 3l2.2 24.6L16 30l8.8-2.4L27 3H5z" fill="#E44D26"/>
      <path d="M16 27.5l7.1-2L25 7H16v20.5z" fill="#F16529"/>
      <path d="M16 13.5H11.5l-.4-4H16V6H7.6l1.1 12H16v-4.5zM16 22.5l-4.7-1.3-.3-3.5H7.6l.6 6.3L16 26v-3.5z" fill="#EBEBEB"/>
      <path d="M16 13.5v4.5h4.2l-.4 4.7-3.8 1v3.5l7-2-.1-.7-1-11H16v.5-.5z" fill="#fff"/>
    </svg>
  ),
  /* JavaScript — carré jaune JS officiel */
  JavaScript: (
    <svg viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
      <path d="M10 25.3c.7 1.2 1.6 2 3.3 2 1.7 0 2.8-.9 2.8-2.1 0-1.5-1-2-2.7-2.8l-.9-.4c-2.7-1.1-4.5-2.6-4.5-5.6C8 13.6 10.3 12 13.3 12c2 0 3.5.7 4.5 2.5l-2.5 1.6C14.8 15 14.1 14.5 13.3 14.5c-.9 0-1.5.5-1.5 1.4 0 1 .6 1.4 2.1 2l.9.4C17.7 19.6 20 21 20 24.2c0 3.4-2.7 5.3-6.3 5.3-3.5 0-5.8-1.7-6.9-4l3.2-2.2zM20.5 25c.6 1.5 1.7 2.3 3.4 2.3 1.5 0 2.4-.7 2.4-1.8 0-1.2-.9-1.7-2.6-2.4l-.9-.4C20.4 21.6 18.5 20.2 18.5 17c0-2.8 2.1-4.9 5.4-4.9 2.4 0 4.1.9 5.3 3l-2.5 1.7c-.6-1.1-1.4-1.6-2.8-1.6-1.2 0-2 .7-2 1.7 0 1.1.7 1.6 2.3 2.2l.9.4C27.7 20.6 30 22 30 25.3c0 3.5-2.7 5.3-6.3 5.3-3.6 0-5.8-1.8-6.9-4.2L20.5 25z" fill="#333"/>
    </svg>
  ),
  /* React — atome bleu officiel */
  React: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="2.8" fill="#61DAFB"/>
      <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="#61DAFB" strokeWidth="1.5"/>
      <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 16 16)"/>
    </svg>
  ),
  /* PHP — logo officiel elephant stylisé */
  PHP: (
    <svg viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="15" ry="9" fill="#8892BF"/>
      <text x="5" y="21" fontSize="11" fill="white" fontWeight="bold" fontFamily="Arial, sans-serif">php</text>
    </svg>
  ),
  /* Laravel — flamme rouge officielle */
  Laravel: (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M31.6 8.3c.1.2.1.4 0 .5L27 14.5l4.6 7.5c.1.2.1.4 0 .5-.1.1-.3.2-.5.2h-6.5c-.3 0-.6-.1-.7-.4l-2.7-4.6-5.2 5c-.2.2-.6.2-.8 0L4.3 14.5c-.2-.2-.2-.5 0-.7L15.6 2c.1-.1.3-.2.5-.2h6.3c.3 0 .5.2.6.4l.8 3.4 5.1-.4c.3 0 .5.2.6.4l2.1 2.7z" fill="#FF2D20"/>
      <path d="M15.4 15.5L22 8.6l-1.2-5.1-5.5.4-2.6 3.3 2.7 8.3z" fill="#FB503B"/>
    </svg>
  ),
  /* Java — tasse de café officielle */
  Java: (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M11 22s-2 1.2 1.4 1.6c4 .5 6 .4 10.4-.4 0 0 1.2.7 2.8 1.3-9.8 4.2-22.2-.2-14.6-2.5zM10 19s-2.2 1.6 1.2 2c4.4.5 7.9.5 13.8-.7 0 0 .8.8 2.1 1.3-12.3 3.6-26 .3-17.1-2.6z" fill="#007396"/>
      <path d="M18.5 13c2.5 2.9-.7 5.5-.7 5.5s6.3-3.2 3.4-7.3c-2.7-3.8-4.8-5.7 6.5-12.2 0 0-17.8 4.4-9.2 14z" fill="#EA2D2E"/>
      <path d="M27 25.2s1.5 1.2-1.7 2.2c-5.9 1.8-24.7 2.3-29.9.1-1.9-.8 1.6-1.9 2.7-2.1 1.1-.2 1.8-.2 1.8-.2-2-1.4-13.2 2.8-5.7 4 20.6 3.4 37.5-1.5 32.8-4z" fill="#007396"/>
      <path d="M12 15.5s-9 2.1-3.2 2.9c2.5.4 7.4.3 12-.1 3.8-.4 7.5-1.1 7.5-1.1s-1.3.6-2.3 1.2c-9.2 2.4-27 1.3-21.9-.7 4.3-1.7 7.9-2.2 7.9-2.2z" fill="#007396"/>
    </svg>
  ),
  /* SQL — cylindres base de données */
  SQL: (
    <svg viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="8" rx="10" ry="3.5" fill="#00618A" stroke="#00618A" strokeWidth="1.2"/>
      <path d="M6 8v6c0 2 4.5 3.5 10 3.5S26 16 26 14V8" fill="none" stroke="#00618A" strokeWidth="1.5"/>
      <ellipse cx="16" cy="14" rx="10" ry="3.5" fill="#0075A8" stroke="#0075A8" strokeWidth="1.2"/>
      <path d="M6 14v6c0 2 4.5 3.5 10 3.5S26 22 26 20v-6" fill="none" stroke="#00618A" strokeWidth="1.5"/>
      <ellipse cx="16" cy="20" rx="10" ry="3.5" fill="#00618A" stroke="#00618A" strokeWidth="1.2"/>
    </svg>
  ),
  /* PostgreSQL — éléphant bleu stylisé */
  PostgreSql: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#336791"/>
      <text x="4" y="22" fontSize="9" fill="white" fontWeight="bold" fontFamily="Arial,sans-serif">PG SQL</text>
    </svg>
  ),
  /* C — logo C officiel */
  C: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#A8B9CC"/>
      <circle cx="16" cy="16" r="14" fill="none" stroke="#659AD2" strokeWidth="2"/>
      <text x="9" y="22" fontSize="14" fill="white" fontWeight="bold" fontFamily="Arial,sans-serif">C</text>
    </svg>
  ),
  /* C++ — logo C++ officiel */
  "C++": (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#659AD2"/>
      <circle cx="16" cy="16" r="14" fill="none" stroke="#004482" strokeWidth="2"/>
      <text x="5" y="22" fontSize="11" fill="white" fontWeight="bold" fontFamily="Arial,sans-serif">C++</text>
    </svg>
  ),
  /* GitHub — Octocat officiel */
  "Git / GitHub": (
    <svg viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 2C8.27 2 2 8.27 2 16c0 6.23 4.04 11.52 9.64 13.38.7.13.96-.3.96-.67 0-.33-.01-1.43-.02-2.62-3.9.85-4.72-.94-4.72-.94-.64-1.62-1.56-2.05-1.56-2.05-1.27-.87.1-.85.1-.85 1.41.1 2.15 1.44 2.15 1.44 1.25 2.14 3.28 1.52 4.08 1.16.13-.9.49-1.52.89-1.87-3.11-.35-6.38-1.55-6.38-6.91 0-1.53.55-2.78 1.44-3.76-.14-.35-.63-1.78.14-3.7 0 0 1.17-.38 3.85 1.43A13.4 13.4 0 0116 9.22c1.19.01 2.39.16 3.51.47 2.67-1.81 3.84-1.43 3.84-1.43.77 1.92.28 3.35.14 3.7.9.98 1.44 2.23 1.44 3.76 0 5.37-3.27 6.56-6.39 6.9.5.43.95 1.29.95 2.6 0 1.87-.02 3.38-.02 3.84 0 .37.25.81.97.67C25.97 27.52 30 22.23 30 16c0-7.73-6.27-14-14-14z"/>
    </svg>
  ),
  /* Stitch / Figma — outil de design */
  Stitch: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#1a1a2e" stroke="#6C63FF" strokeWidth="1.5"/>
      <path d="M10 20 L16 8 L22 20" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="13" cy="14" r="2" fill="#6C63FF"/>
      <circle cx="19" cy="14" r="2" fill="#6C63FF"/>
      <path d="M11 20 c0-2.8 10-2.8 10 0" stroke="#6C63FF" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
};


const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  const { categories } = PORTFOLIO;
  const { data: skills, loading } = useCollection("skills");
  const [activeFilter, setActiveFilter] = useState("all");

  if (loading) return null;

  const filteredSkills = activeFilter === "all" ? skills : skills.filter((s) => s.category === activeFilter);

  const filters = [
    { key: "all", label: "Tout" },
    { key: "front", label: categories.front },
    { key: "back", label: categories.back },
    { key: "tools", label: categories.tools },
  ];

  return (
    <section className="skills section" id="competences">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section__tag">02. Compétences</span>
          <h2 className="section__title">
            Ce que j&apos;<span style={{ background: "linear-gradient(135deg, #6b7280, #9ca3af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>utilise</span>
          </h2>
        </motion.div>

        {/* Filtres */}
        <motion.div
          className="skills__filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filters.map((f) => (
            <motion.button
              key={f.key}
              className={`skills__filter ${activeFilter === f.key ? "skills__filter--active" : ""}`}
              onClick={() => setActiveFilter(f.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={
                activeFilter === f.key
                  ? { background: "var(--glass-bg-hover)", color: "var(--color-text)", border: "1px solid var(--glass-border-hover)", fontWeight: 600 }
                  : { background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grille de compétences */}
        <motion.div
          className="skills__grid"
          id="skills-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem" }}
        >
          {filteredSkills.map((skill, i) => (
            <motion.div
              className="skill-card"
              key={skill.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.25 },
              }}
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "16px",
                padding: "1.5rem 0.75rem",
                cursor: "default",
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                aspectRatio: "1 / 1",
                position: "relative",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--glass-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
                {/* Icône */}
                <div style={{ width: 44, height: 44, color: "var(--color-text)", flexShrink: 0 }}>
                  {TECH_ICONS[skill.name] || (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  )}
                </div>

                {/* Nom */}
                <h3 style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text)", textAlign: "center", margin: 0, lineHeight: 1.3 }}>
                  {skill.name}
                </h3>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}

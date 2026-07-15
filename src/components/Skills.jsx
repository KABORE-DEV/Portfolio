import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO } from "../data.js";
import { useCollection } from "../hooks/useFirestore";
import { TECH_ICONS } from "../techIcons.jsx";


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
                <div style={{ width: 44, height: 44, color: "var(--color-text)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {skill.iconType === "predefined" && (TECH_ICONS[skill.iconKey] || TECH_ICONS[skill.name]) ? (
                    TECH_ICONS[skill.iconKey] || TECH_ICONS[skill.name]
                  ) : skill.iconType === "emoji" && skill.iconEmoji ? (
                    <span style={{ fontSize: "2rem" }}>{skill.iconEmoji}</span>
                  ) : skill.iconType === "url" && skill.iconUrl ? (
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : TECH_ICONS[skill.iconKey] || TECH_ICONS[skill.name] ? (
                    TECH_ICONS[skill.iconKey] || TECH_ICONS[skill.name]
                  ) : (
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

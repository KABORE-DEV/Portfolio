import { motion } from "framer-motion";
import { useCollection } from "../hooks/useFirestore";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function TimelineItem({ item, index, type }) {
  const title = type === "education" ? item.degree : item.role;
  const subtitle = type === "education" ? item.school : item.company;
  const isEducation = type === "education";

  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{
        y: -4,
        background: "var(--glass-bg-hover)",
        borderColor: "var(--color-accent)",
        boxShadow: "var(--shadow-md)",
        transition: { duration: 0.2 },
      }}
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        borderRadius: "16px",
        padding: "1.5rem",
        marginBottom: "1rem",
        backdropFilter: "blur(12px)",
        cursor: "default",
      }}
    >
      {/* Période badge */}
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        color: "var(--color-accent)",
        letterSpacing: "0.05em",
        display: "inline-block",
        marginBottom: "0.75rem",
        background: "var(--color-accent-glow)",
        padding: "4px 10px",
        borderRadius: "9999px",
        border: "1px solid var(--color-accent)",
      }}>
        {item.period}
      </span>

      <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.25rem" }}>
        {title}
      </h4>
      <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: item.description ? "0.75rem" : 0 }}>
        {isEducation ? "🎓" : "💼"} {subtitle}
      </p>
      {item.description && (
        <p style={{ fontSize: "0.8rem", color: "var(--color-text-dim)", lineHeight: 1.7 }}>{item.description}</p>
      )}
    </motion.div>
  );
}

export default function Parcours() {
  const { data: education, loading: eduLoading } = useCollection("education");
  const { data: experience, loading: expLoading } = useCollection("experience");

  if (eduLoading || expLoading) return null;

  return (
    <section className="section" id="parcours">
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section__tag">04. Parcours</span>
          <h2 className="section__title">
            Formation &amp; <span style={{ color: "var(--color-accent)" }}>Expérience</span>
          </h2>
        </motion.div>

        <div className="px-parcours-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          {/* Formation */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                marginBottom: "1.5rem", paddingBottom: "1rem",
                borderBottom: "1px solid var(--glass-border)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🎓</span>
              <span style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Formation
              </span>
            </motion.div>
            <div id="education-list">
              {education.map((item, idx) => (
                <TimelineItem key={idx} item={item} index={idx} type="education" />
              ))}
            </div>
          </div>

          {/* Expérience */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                marginBottom: "1.5rem", paddingBottom: "1rem",
                borderBottom: "1px solid var(--glass-border)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>💼</span>
              <span style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Expérience
              </span>
            </motion.div>
            <div id="experience-list">
              {experience.length > 0 ? (
                experience.map((item, idx) => (
                  <TimelineItem key={idx} item={item} index={idx} type="experience" />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  style={{
                    padding: "2rem 1.5rem",
                    background: "var(--glass-bg)",
                    border: "1px dashed var(--glass-border)",
                    borderRadius: "16px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    🚀 Je suis à la recherche d&apos;un stage ou d&apos;une première expérience.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

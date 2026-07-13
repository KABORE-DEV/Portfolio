import { motion } from "framer-motion";
import { useCollection } from "../hooks/useFirestore";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CertIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
    </svg>
  );
}

export default function Certifications() {
  const { data: certifications, loading } = useCollection("certifications");

  if (loading || !certifications || certifications.length === 0) return null;

  return (
    <section className="section" id="certifications">
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section__tag">05. Certifications</span>
          <h2 className="section__title">
            Certifications &amp; <span style={{ color: "var(--color-accent)" }}>Badges</span>
          </h2>
        </motion.div>

        <div
          className="certs__grid"
          id="certifications-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}
        >
          {certifications.map((cert, idx) => (
            <motion.article
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{
                y: -5,
                background: "var(--glass-bg-hover)",
                borderColor: "var(--color-accent)",
                boxShadow: "var(--shadow-md)",
                transition: { duration: 0.2 },
              }}
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "18px",
                padding: "1.5rem",
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
                backdropFilter: "blur(12px)",
                cursor: "default",
              }}
            >
              {/* Icône */}
              <div
                style={{
                  flexShrink: 0, width: 44, height: 44, borderRadius: "12px",
                  background: "var(--color-accent-glow)",
                  border: "1px solid var(--color-accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--color-accent)",
                }}
              >
                <CertIcon style={{ width: "22px", height: "22px" }} />
              </div>

              {/* Contenu */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.4rem", lineHeight: 1.4 }}>
                  {cert.title}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: cert.url ? "0.75rem" : 0 }}>
                  <span style={{ color: "var(--color-text)", fontWeight: 500 }}>{cert.issuer}</span>
                  <span style={{ margin: "0 6px", opacity: 0.3 }}>•</span>
                  {cert.date}
                </p>
                {cert.url && (
                  <motion.a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 3 }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "5px",
                      fontSize: "0.78rem", color: "var(--color-accent)",
                      textDecoration: "none", fontWeight: 500,
                    }}
                  >
                    Voir le certificat
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "12px", height: "12px" }}>
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </motion.a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

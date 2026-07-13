import { motion } from "framer-motion";
import { PORTFOLIO } from "../data.js";
import { MailIcon, PhoneIcon, MapPinIcon } from "../icons.jsx";
import { useCollection } from "../hooks/useFirestore";

const statVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Bloc code affiché à la place de la photo ── */
function AboutCodeBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--glass-border)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "var(--shadow-lg)",
        width: "100%",
        textAlign: "left",
      }}
    >
      {/* Barre de titre */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "12px 16px",
        borderBottom: "1px solid var(--glass-border)",
        background: "rgba(0,0,0,0.15)",
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-text-muted)", marginLeft: "8px" }}>
          about.js
        </span>
      </div>
      {/* Code */}
      <div style={{ padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 2.1 }}>
        <div><span style={{ color: "#c792ea" }}>const</span> <span style={{ color: "#82aaff" }}>about</span> <span style={{ color: "var(--color-text-dim)" }}>=</span> {"{"}</div>
        <div style={{ paddingLeft: "1.25rem" }}>
          <span style={{ color: "#f78c6c" }}>formation</span><span style={{ color: "var(--color-text-dim)" }}>: </span>
          <span style={{ color: "#c3e88d" }}>"Génie Logiciel"</span><span style={{ color: "var(--color-text-dim)" }}>,</span>
        </div>
        <div style={{ paddingLeft: "1.25rem" }}>
          <span style={{ color: "#f78c6c" }}>université</span><span style={{ color: "var(--color-text-dim)" }}>: </span>
          <span style={{ color: "#c3e88d" }}>"Aube Nouvelle"</span><span style={{ color: "var(--color-text-dim)" }}>,</span>
        </div>
        <div style={{ paddingLeft: "1.25rem" }}>
          <span style={{ color: "#f78c6c" }}>spécialité</span><span style={{ color: "var(--color-text-dim)" }}>: </span>
          <span style={{ color: "#c3e88d" }}>"Full-Stack Web"</span><span style={{ color: "var(--color-text-dim)" }}>,</span>
        </div>
        <div style={{ paddingLeft: "1.25rem" }}>
          <span style={{ color: "#f78c6c" }}>objectif</span><span style={{ color: "var(--color-text-dim)" }}>: </span>
          <span style={{ color: "#c3e88d" }}>"Stage + Emploi"</span><span style={{ color: "var(--color-text-dim)" }}>,</span>
        </div>
        <div style={{ paddingLeft: "1.25rem" }}>
          <span style={{ color: "#f78c6c" }}>hobbies</span><span style={{ color: "var(--color-text-dim)" }}>: [</span>
        </div>
        <div style={{ paddingLeft: "2.5rem" }}>
          <span style={{ color: "#c3e88d" }}>"Code"</span><span style={{ color: "var(--color-text-dim)" }}>, </span>
          <span style={{ color: "#c3e88d" }}>"Design"</span><span style={{ color: "var(--color-text-dim)" }}>, </span>
          <span style={{ color: "#c3e88d" }}>"Jeux"</span>
        </div>
        <div style={{ paddingLeft: "1.25rem" }}>
          <span style={{ color: "var(--color-text-dim)" }}>],</span>
        </div>
        <div>{"}"}<span style={{ color: "var(--color-text-dim)" }}>;</span></div>
        <div style={{ marginTop: "0.5rem" }}>
          <span style={{ color: "var(--color-text-dim)" }}>{"// "}</span>
          <span style={{ color: "var(--color-accent)" }}>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            >▋</motion.span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const { email, phone, location, bio } = PORTFOLIO.personal;
  const { data: skills, loading: sLoad } = useCollection("skills");
  const { data: projects, loading: pLoad } = useCollection("projects");

  if (sLoad || pLoad) return null;

  const infoItems = [
    { label: "Email", value: email, icon: <MailIcon width={16} height={16} /> },
    { label: "Téléphone", value: phone, icon: <PhoneIcon width={16} height={16} /> },
    { label: "Localisation", value: location, icon: <MapPinIcon width={16} height={16} /> },
  ];

  const stats = [
    { number: "3", label: "Années d'études" },
    { number: `${projects.length}`, label: "Projets réalisés" },
    { number: `${skills.length}+`, label: "Technologies" },
  ];

  return (
    <section className="about section" id="apropos">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section__tag">01. À propos</span>
          <h2 className="section__title">
            Qui <span style={{ color: "var(--color-accent)" }}>suis-je</span> ?
          </h2>
        </motion.div>

        {/* Grille : bloc code à gauche, texte à droite */}
        <div className="about__grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

          {/* Gauche : bloc code (à la place de la photo) */}
          <AboutCodeBlock />

          {/* Droite : texte + infos */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              {bio}
            </p>

            <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {infoItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    fontSize: "0.875rem",
                    padding: "10px 14px",
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "12px",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                >
                  <span style={{ color: "var(--color-accent)", flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", minWidth: "90px", fontSize: "0.72rem" }}>
                    {item.label}
                  </span>
                  <span style={{ color: "var(--color-text)", fontWeight: 500 }}>{item.value}</span>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="/CV_Kabore_Frank.pdf"
              className="btn btn--outline"
              id="cv-download"
              download
              whileHover={{ scale: 1.04, borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "16px", height: "16px" }}>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Télécharger mon CV
            </motion.a>
          </motion.div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "1.25rem", marginTop: "3rem" }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={statVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, borderColor: "var(--color-accent)", boxShadow: "var(--shadow-md)" }}
              style={{
                flex: 1, textAlign: "center", padding: "1.5rem 1rem",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              <motion.span
                style={{ display: "block", fontSize: "2.5rem", fontWeight: 800, color: "var(--color-accent)", marginBottom: "0.25rem" }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200 }}
              >
                {s.number}
              </motion.span>
              <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

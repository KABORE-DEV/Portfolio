import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PORTFOLIO } from "../data.js";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "../icons.jsx";
import { useCollection } from "../hooks/useFirestore";

const letterVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimatedText({ text, className, startDelay = 0 }) {
  return (
    <span className={className} style={{ display: "inline-block", overflow: "hidden" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i + startDelay * 10}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const glowVariants = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.25, 0.45, 0.25],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Hero() {
  const { firstName, lastName, title, subtitle, photo, initials } = PORTFOLIO.personal;
  const { github, linkedin, whatsapp } = PORTFOLIO.social;
  const { data: skills, loading: sLoad } = useCollection("skills");
  const { data: projects, loading: pLoad } = useCollection("projects");
  const { data: education, loading: eLoad } = useCollection("education");

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  if (sLoad || pLoad || eLoad) return null;

  return (
    <section className="hero section" id="accueil" style={{ overflow: "hidden" }}>
      {/* Arrière-plan animé */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <motion.div
          className="hero__glow hero__glow--1"
          variants={glowVariants}
          animate="animate"
          style={{ x: mousePos.x, y: mousePos.y }}
        />
        <motion.div
          className="hero__glow hero__glow--2"
          variants={glowVariants}
          animate="animate"
          style={{ x: -mousePos.x, y: -mousePos.y }}
        />
      </div>

      {/* Contenu principal — deux colonnes */}
      <div className="container px-hero-content" style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "4rem",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        paddingTop: "100px",
        paddingBottom: "60px",
      }}>

        {/* Colonne gauche : texte */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tag */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              background: "var(--glass-bg)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--glass-border)",
              padding: "6px 16px",
              borderRadius: "9999px",
              fontSize: "0.82rem",
              marginBottom: "1.75rem",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 10px #16a34a", flexShrink: 0 }}
            />
            Open to work
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", fontSize: "1rem", marginBottom: "0.75rem" }}
          >
            Bonjour, je suis
          </motion.p>

          {/* Nom */}
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "1.25rem" }}>
            <AnimatedText text={firstName + " "} className="" startDelay={0} />
            <AnimatedText text={lastName} className="hero__name-accent" startDelay={0.5} />
          </h1>

          {/* Titre */}
          <motion.p variants={itemVariants} style={{ fontSize: "1.2rem", color: "var(--color-text)", fontWeight: 500, marginBottom: "1rem" }}>
            {title}
          </motion.p>

          <motion.p variants={itemVariants} style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "2.25rem", maxWidth: "440px" }}>
            {subtitle}
          </motion.p>

          {/* CTA */}
          <motion.div className="px-hero-cta" variants={itemVariants} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <motion.a
              href="#projets"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "var(--color-text)", color: "var(--color-bg)",
                padding: "13px 28px", borderRadius: "9999px",
                fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
              }}
            >
              Voir mes projets
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, background: "var(--glass-bg-hover)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "var(--glass-bg)", backdropFilter: "blur(12px)",
                border: "1px solid var(--glass-border)", color: "var(--color-text)",
                padding: "13px 28px", borderRadius: "9999px",
                fontWeight: 500, fontSize: "0.95rem", textDecoration: "none",
              }}
            >
              Me contacter
            </motion.a>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.div className="px-hero-social" variants={itemVariants} style={{ display: "flex", gap: "12px" }}>
            {[
              { href: github, icon: <GithubIcon width={20} height={20} />, label: "GitHub" },
              { href: linkedin, icon: <LinkedinIcon width={20} height={20} />, label: "LinkedIn" },
              { href: whatsapp, icon: <WhatsappIcon width={20} height={20} />, label: "WhatsApp" },
            ].filter((s) => s.href).map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.15, y: -4, background: "var(--color-accent)", color: "white", borderColor: "var(--color-accent)" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "46px", height: "46px", borderRadius: "50%",
                  background: "var(--glass-bg)", backdropFilter: "blur(12px)",
                  border: "1px solid var(--glass-border)", color: "var(--color-text)",
                  transition: "all 0.25s ease",
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Colonne droite : Photo de profil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
        >
          {/* Glow derrière la photo */}
          <div style={{
            position: "absolute",
            width: "120%",
            height: "120%",
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 60%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }} />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "100%", maxWidth: "360px", position: "relative", zIndex: 2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid var(--color-accent)",
                boxShadow: "0 0 0 8px var(--glass-border), var(--shadow-lg)",
                background: "var(--glass-bg)",
              }}
            >
            {photo ? (
              <img src={photo} alt={`${firstName} ${lastName}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", fontWeight: 800, color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>
                {initials}
              </div>
            )}
          </motion.div>
        </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#apropos"
        className="hero__scroll"
        aria-label="Défiler vers le bas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        whileHover={{ color: "var(--color-text)" }}
      >
        <span className="hero__scroll-text">Scroll</span>
        <motion.span
          className="hero__scroll-line"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}

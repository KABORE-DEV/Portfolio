import { useState } from "react";
import { motion } from "framer-motion";
import { useCollection } from "../hooks/useFirestore.js";
import { PORTFOLIO } from "../data.js";
import ProjectModal from "../components/ProjectModal.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import Seo from "../components/Seo.jsx";
import { ArrowUpRightIcon } from "../icons.jsx";
import { fadeUp, viewportOnce } from "../motion.js";

const certInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map(w => w[0])
    .join("")
    .toUpperCase();

export default function PortfolioPage() {
  const [selected, setSelected] = useState(null);
  const { data: projects }       = useCollection("projects");
  const { data: certifications } = useCollection("certifications");

  const allProjects = projects?.length ? projects : PORTFOLIO.projects;
  const allCerts    = certifications?.length ? certifications : (PORTFOLIO.certifications || []);

  return (
    <>
      <Seo
        title="Frank KABORE · Projets"
        description="Une sélection de projets web, mobiles et d'applications logicielles de Frank KABORE — développeur web & mobile, étudiant en Génie Logiciel."
      />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      {/* ═══ HEADER ═══════════════════════════ */}
      <header className="page-head">
        <div className="container">
          <motion.span
            className="section-num"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            03 · Projets
          </motion.span>
          <motion.h1
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.05 }}
          >
            Réalisations <em>&amp; projets.</em>
          </motion.h1>
          <motion.p
            className="section-desc"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.10 }}
          >
            Une sélection de projets web, mobiles et d'applications logicielles — de la
            conception à la mise en production.
          </motion.p>
        </div>
      </header>

      <main>
        <div className="section" style={{ paddingTop: "2rem" }}>
          <div className="container">
            {/* ═══ PROJETS (rangées) ═════════ */}
            <p className="proj-list-meta">
              {String(allProjects.length).padStart(2, "0")} projets — web, mobile &amp; logiciels
            </p>
            <div className="proj-cards" role="list">
              {allProjects.map((p, i) => (
                <ProjectRow key={p.id || p.title} project={p} index={i} onSelect={setSelected} />
              ))}
            </div>

            {/* ═══ CERTIFICATIONS ═════════════ */}
            {allCerts.length > 0 && (
              <div style={{ marginTop: "6rem" }}>
                <motion.div
                  className="section-head"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <span className="section-num">Certifications</span>
                  <h2 className="section-title">
                    Certifications <em>obtenues.</em>
                  </h2>
                </motion.div>

                <motion.div
                  className="certs-rail"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {allCerts.map((c, i) => (
                    <motion.a
                      key={c.id || i}
                      className="cert-tile"
                      href={c.url || "#"}
                      target={c.url ? "_blank" : "_self"}
                      rel="noreferrer"
                      whileHover={{ y: -6 }}
                      aria-label={`Certification : ${c.title} — ${c.issuer}`}
                    >
                      <div className={`cert-tile-cover${c.image ? "" : " cert-cover-fallback"}`}>
                        {c.image ? (
                          <img src={c.image} alt={c.title} loading="lazy" />
                        ) : (
                          <span className="cert-cover-mono">{certInitials(c.issuer)}</span>
                        )}
                      </div>
                      <div className="cert-tile-body">
                        <div className="cert-tile-meta">
                          <span className="cert-issuer-badge">{c.issuer}</span>
                          <span className="cert-date">{c.date}</span>
                        </div>
                        <h3 className="cert-tile-title">{c.title}</h3>
                        {c.url && (
                          <span className="cert-card-action">
                            Vérifier <ArrowUpRightIcon width={12} height={12} />
                          </span>
                        )}
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

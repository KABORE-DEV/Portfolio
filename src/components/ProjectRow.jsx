import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "../icons.jsx";
import { fadeUp, viewportOnce } from "../motion.js";

export default function ProjectRow({ project, index, onSelect }) {
  const i = index || 0;
  const statusClass = {
    "En ligne": "status-live",
    "En cours": "status-progress",
    "Terminé": "status-done",
  }[project.status] || "";

  return (
    <motion.article
      className="proj-card"
      onClick={() => onSelect(project)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: (i % 3) * 0.05 }}
    >
      <div className="proj-card-top">
        <span className="proj-card-num" aria-hidden="true">
          {String(i + 1).padStart(2, "0")}
        </span>
        {project.status && (
          <span className={`proj-row-status ${statusClass}`}>{project.status}</span>
        )}
      </div>

      <h3 className="proj-card-title">{project.title}</h3>
      <p className="proj-card-desc">{project.description}</p>

      <div className="proj-card-foot">
        <div className="proj-card-tags">
          {(project.technologies || []).slice(0, 3).map(t => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <span className="proj-card-arrow" aria-hidden="true">
          <ArrowUpRightIcon width={16} height={16} />
        </span>
      </div>
    </motion.article>
  );
}
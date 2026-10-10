import { useEffect } from "react";
import { createPortal } from "react-dom";
import { stopLenis, startLenis } from "../lib/scroll.js";
import { ArrowDownIcon, ArrowUpRightIcon } from "../icons.jsx";

export default function CvModal({ isOpen, onClose, cvUrl = "/CV_Kabore_Frank.pdf" }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    stopLenis();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      startLenis();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="cv-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Prévisualisation du CV">
      <div className="cv-modal-box" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
        {/* En-tête */}
        <div className="cv-modal-header">
          <div className="cv-modal-title-group">
            <span className="cv-modal-tag">Curriculum Vitae</span>
            <h3 className="cv-modal-title">Frank KABORE — Développeur Web & Mobile</h3>
          </div>
          <div className="cv-modal-actions">
            <a
              href={cvUrl}
              download="CV_Frank_KABORE.pdf"
              className="btn btn-primary btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowDownIcon width={14} height={14} /> Télécharger
            </a>
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowUpRightIcon width={14} height={14} /> Ouvrir
            </a>
            <button className="cv-modal-close" onClick={onClose} aria-label="Fermer la prévisualisation">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Visionneuse PDF */}
        <div className="cv-modal-viewer">
          <iframe
            src={`${cvUrl}#toolbar=0&navpanes=0`}
            title="Curriculum Vitae de Frank KABORE"
            width="100%"
            height="100%"
            style={{ border: "none", borderRadius: "var(--r-md)", background: "#ffffff" }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

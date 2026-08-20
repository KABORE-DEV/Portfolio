import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useCollection, useProfile } from "../hooks/useFirestore";
import { TECH_ICONS } from "../techIcons.jsx";
import { RocketIcon, ZapIcon, GraduationIcon, BriefcaseIcon, AwardIcon } from "../icons.jsx";
import { PORTFOLIO } from "../data.js";
import { db } from "../firebase.js";
import ImageUploader from "../components/ImageUploader.jsx";
import { stopLenis, startLenis } from "../lib/scroll.js";

/* ═══════════════════════════════════════
   Composants UI réutilisables — Design System minimaliste
═══════════════════════════════════════ */

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  background: "var(--bg)",
  border: "1px solid var(--border)",
  borderRadius: "var(--r-md)",
  color: "var(--text)",
  fontSize: "0.875rem",
  fontFamily: "var(--font)",
  outline: "none",
  transition: "border-color var(--fast), box-shadow var(--fast)",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  fontWeight: 700,
  color: "var(--text-2)",
  marginBottom: "6px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const focusOn = (e) => {
  e.target.style.borderColor = "var(--accent)";
  e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
};
const focusOff = (e) => {
  e.target.style.borderColor = "var(--border)";
  e.target.style.boxShadow = "none";
};

function Input({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={focusOn}
        onBlur={focusOff}
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label style={labelStyle}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{ ...inputStyle, resize: "vertical" }}
        onFocus={focusOn}
        onBlur={focusOff}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label style={labelStyle}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputStyle, cursor: "pointer" }}
        onFocus={focusOn}
        onBlur={focusOff}
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{ background: "var(--bg)" }}
          >
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Btn({ onClick, children, variant = "primary", small = false }) {
  const base = {
    border: "1px solid transparent",
    borderRadius: "var(--r-md)",
    fontSize: small ? "0.68rem" : "0.75rem",
    fontFamily: "var(--mono)",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    cursor: "pointer",
    padding: small ? "6px 12px" : "10px 20px",
    transition: "all var(--fast)",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
  };
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "#fff",
      borderColor: "var(--accent)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text)",
      borderColor: "var(--border)",
    },
    danger: {
      background: "transparent",
      color: "#e5484d",
      borderColor: "rgba(229,72,77,0.4)",
    },
    accent: {
      background: "var(--accent-glow)",
      color: "var(--accent)",
      borderColor: "var(--accent)",
    },
  };
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      style={{ ...base, ...variants[variant] }}
    >
      {children}
    </motion.button>
  );
}

function Modal({ title, onClose, children }) {
  useEffect(() => {
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
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="px-modal-overlay"
        data-lenis-prevent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          overflowY: "auto",
          padding: "1.5rem 1rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(20, 20, 18, 0.5)",
            backdropFilter: "blur(4px)",
          }}
          onClick={onClose}
        />
        <motion.div
          className="px-modal-panel"
          data-lenis-prevent
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "520px",
            maxHeight: "88vh",
            overflowY: "auto",
            overscrollBehavior: "contain",
            margin: "auto",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-xl)",
            padding: "2rem",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "1.35rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                margin: 0,
              }}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--text-2)",
                cursor: "pointer",
                width: "30px",
                height: "30px",
                borderRadius: "var(--r-full)",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all var(--fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-2)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              ✕
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ═══════════════════════════════════════
   Confirmation de suppression
═══════════════════════════════════════ */

function ConfirmDialog({ message, onCancel, onConfirm }) {
  return (
    <Modal title="Confirmer la suppression" onClose={onCancel}>
      <p
        style={{
          color: "var(--text-2)",
          fontSize: "0.9rem",
          lineHeight: 1.6,
          margin: "0 0 1.5rem",
        }}
      >
        {message}
      </p>
      <p
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.7rem",
          color: "var(--text-3)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          margin: "0 0 1.5rem",
        }}
      >
        Cette action est définitive.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <Btn onClick={onCancel} variant="ghost">Annuler</Btn>
        <Btn onClick={onConfirm} variant="danger">Supprimer</Btn>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════
   Sections
═══════════════════════════════════════ */

function SectionHeader({ title, count, onAdd }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "1.5rem",
        paddingBottom: "1.1rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "1.45rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            color: "var(--text-2)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "4px 0 0",
          }}
        >
          {count} élément{count !== 1 ? "s" : ""}
        </p>
      </div>
      <Btn onClick={onAdd} variant="primary" small>
        + Ajouter
      </Btn>
    </div>
  );
}

function ListRow({ main, sub, onEdit, onDelete, thumb }) {
  return (
    <motion.div
      whileHover={{ background: "var(--surface-2)" }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.9rem 0.5rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0, flex: "1 1 160px" }}>
        {thumb && (
          <img
            src={thumb}
            alt=""
            style={{
              width: "56px",
              height: "38px",
              objectFit: "cover",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "var(--surface-2)",
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontWeight: 600,
              color: "var(--text)",
              fontSize: "0.92rem",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {main}
          </p>
          {sub && (
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.72rem",
                color: "var(--text-2)",
                marginTop: "3px",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {sub}
            </p>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginLeft: "auto", flexShrink: 0 }}>
        <Btn onClick={onEdit} variant="accent" small>Modifier</Btn>
        <Btn onClick={onDelete} variant="danger" small>Supprimer</Btn>
      </div>
    </motion.div>
  );
}

const listContainerStyle = {
  display: "flex",
  flexDirection: "column",
  borderTop: "1px solid var(--border)",
};

function ProjectsSection({ confirmDelete }) {
  const { data, loading, add, update, remove } = useCollection("projects");
  const [modal, setModal] = useState(null);
  const emptyForm = {
    title: "",
    description: "",
    longDescription: "",
    features: "",
    technologies: "",
    github: "",
    demo: "",
    status: "",
    image: "",
  };
  const [form, setForm] = useState(emptyForm);
  const openAdd = () => {
    setForm(emptyForm);
    setModal({ mode: "add" });
  };
  const openEdit = (item) => {
    setForm({
      ...item,
      features: Array.isArray(item.features)
        ? item.features.join(", ")
        : item.features,
      technologies: Array.isArray(item.technologies)
        ? item.technologies.join(", ")
        : item.technologies,
    });
    setModal({ mode: "edit", item });
  };
  const handleSave = async () => {
    const payload = {
      ...form,
      features: form.features
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (modal.mode === "add") await add(payload);
    else await update(modal.item.id, payload);
    setModal(null);
  };
  return (
    <div>
      <SectionHeader title="Projets" count={data.length} onAdd={openAdd} />
      {loading ? (
        <p style={{ color: "var(--text-2)" }}>Chargement...</p>
      ) : (
        <div style={listContainerStyle}>
          {data.map((p) => (
            <ListRow
              key={p.id}
              main={p.title}
              thumb={p.image}
              sub={
                Array.isArray(p.technologies)
                  ? p.technologies.join(" · ")
                  : p.technologies
              }
              onEdit={() => openEdit(p)}
              onDelete={() => confirmDelete(`Voulez-vous vraiment supprimer le projet « ${p.title} » ?`, () => remove(p.id))}
            />
          ))}
        </div>
      )}
      {modal && (
        <Modal
          title={modal.mode === "add" ? "Nouveau projet" : "Modifier le projet"}
          onClose={() => setModal(null)}
        >
          <Input
            label="Titre"
            value={form.title}
            onChange={(v) => setForm((f) => ({ ...f, title: v }))}
            placeholder="Nom du projet"
          />
          <TextArea
            label="Description courte"
            value={form.description}
            onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            placeholder="Une ligne de description..."
          />
          <TextArea
            label="Description longue"
            value={form.longDescription}
            onChange={(v) => setForm((f) => ({ ...f, longDescription: v }))}
            rows={4}
            placeholder="Description détaillée..."
          />
          <TextArea
            label="Fonctionnalités (une par ligne ou séparées par des virgules)"
            value={form.features}
            onChange={(v) => setForm((f) => ({ ...f, features: v }))}
            rows={3}
            placeholder="Page d'accueil dynamique, Panier & commandes..."
          />
          <Input
            label="Technologies (séparées par des virgules)"
            value={form.technologies}
            onChange={(v) => setForm((f) => ({ ...f, technologies: v }))}
            placeholder="React, Laravel, MySQL"
          />
          <Input
            label="URL GitHub"
            value={form.github}
            onChange={(v) => setForm((f) => ({ ...f, github: v }))}
            placeholder="https://github.com/..."
          />
          <Input
            label="URL Demo"
            value={form.demo}
            onChange={(v) => setForm((f) => ({ ...f, demo: v }))}
            placeholder="https://..."
          />
          <Input
            label="Statut (optionnel)"
            value={form.status}
            onChange={(v) => setForm((f) => ({ ...f, status: v }))}
            placeholder="En cours, Terminé..."
          />
          <ImageUploader
            label="Capture d'écran du projet"
            value={form.image}
            onChange={(url) => setForm((f) => ({ ...f, image: url }))}
          />
          <div style={{ marginTop: "0.5rem" }}>
            <Btn onClick={handleSave} variant="primary">
              {modal.mode === "add" ? "Ajouter le projet" : "Enregistrer"}
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function SkillsSection({ confirmDelete }) {
  const { data, loading, add, update, remove } = useCollection("skills");
  const [modal, setModal] = useState(null);
  const emptyForm = {
    name: "",
    level: "practiced",
    category: "front",
    context: "",
    iconType: "predefined", // "predefined", "url"
    iconKey: "",
    iconUrl: "",
  };
  const [form, setForm] = useState(emptyForm);
  const openAdd = () => {
    setForm(emptyForm);
    setModal({ mode: "add" });
  };
  const openEdit = (item) => {
    // S'assurer que les nouveaux champs ont des valeurs par défaut
    setForm({
      ...emptyForm,
      ...item,
    });
    setModal({ mode: "edit", item });
  };
  const handleSave = async () => {
    if (modal.mode === "add") await add(form);
    else await update(modal.item.id, form);
    setModal(null);
  };

  return (
    <div>
      <SectionHeader title="Compétences" count={data.length} onAdd={openAdd} />
      {loading ? (
        <p style={{ color: "var(--text-2)" }}>Chargement...</p>
      ) : (
        <div
          className="px-dash-skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {data.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ borderColor: "var(--accent)" }}
              style={{
                padding: "1rem 1.1rem",
                background: "var(--glass-bg)",
                backdropFilter: "blur(var(--glass-blur)) saturate(150%)",
                WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(150%)",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--r-lg)",
                transition: "border-color var(--fast)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "6px",
                }}
              >
                <p
                  style={{
                    fontWeight: 600,
                    color: "var(--text)",
                    fontSize: "0.875rem",
                    margin: 0,
                  }}
                >
                  {s.name}
                </p>
              </div>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--accent)",
                  margin: "0 0 10px",
                }}
              >
                {({ front: "Front-end", back: "Back-end", framework: "Frameworks", tools: "Outils" })[s.category] || s.category}
              </p>
              <div style={{ display: "flex", gap: "6px" }}>
                <Btn onClick={() => openEdit(s)} variant="accent" small>
                  Modifier
                </Btn>
                <Btn onClick={() => confirmDelete(`Voulez-vous vraiment supprimer la compétence « ${s.name} » ?`, () => remove(s.id))} variant="danger" small>
                  Supprimer
                </Btn>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {modal && (
        <Modal
          title={
            modal.mode === "add"
              ? "Nouvelle compétence"
              : "Modifier la compétence"
          }
          onClose={() => setModal(null)}
        >
          <Input
            label="Nom de la technologie"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            placeholder="React, Laravel, Python..."
          />
          <Select
            label="Type d'icône"
            value={form.iconType}
            onChange={(v) => setForm((f) => ({ ...f, iconType: v }))}
            options={[
              { value: "predefined", label: "Icône prédéfinie" },
              { value: "url", label: "URL d'image" },
            ]}
          />

          {/* Champ selon le type d'icône */}
          {form.iconType === "predefined" && (
            <Select
              label="Icône prédéfinie"
              value={form.iconKey}
              onChange={(v) => setForm((f) => ({ ...f, iconKey: v }))}
              options={[
                { value: "", label: "Sélectionner une icône..." },
                ...Object.keys(TECH_ICONS).map((key) => ({ value: key, label: key })),
              ]}
            />
          )}

          {form.iconType === "url" && (
            <Input
              label="URL de l'icône"
              value={form.iconUrl}
              onChange={(v) => setForm((f) => ({ ...f, iconUrl: v }))}
              placeholder="https://example.com/icon.png"
            />
          )}

          {/* Aperçu de l'icône */}
          <div style={{ marginBottom: "1.1rem" }}>
            <label style={labelStyle}>Aperçu</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-md)",
              }}
            >
              <div style={{ width: 44, height: 44, color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {form.iconType === "predefined" && TECH_ICONS[form.iconKey] ? (
                  TECH_ICONS[form.iconKey]
                ) : form.iconType === "url" && form.iconUrl ? (
                  <img
                    src={form.iconUrl}
                    alt="Icon preview"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>
                {form.iconType === "predefined" && form.iconKey
                  ? form.iconKey
                  : form.iconType === "url" && form.iconUrl
                  ? "URL personnalisée"
                  : "Aucune icône sélectionnée"}
              </span>
            </div>
          </div>

          <Select
            label="Niveau"
            value={form.level}
            onChange={(v) => setForm((f) => ({ ...f, level: v }))}
            options={[
              { value: "practiced", label: "Utilisé en projet" },
              { value: "familiar", label: "À l'aise" },
              { value: "learning", label: "En cours" },
            ]}
          />
          <Select
            label="Catégorie"
            value={form.category}
            onChange={(v) => setForm((f) => ({ ...f, category: v }))}
            options={[
              { value: "front", label: "Front-end" },
              { value: "back", label: "Back-end" },
              { value: "framework", label: "Frameworks" },
              { value: "tools", label: "Outils" },
            ]}
          />
          <Input
            label="Contexte d'utilisation"
            value={form.context}
            onChange={(v) => setForm((f) => ({ ...f, context: v }))}
            placeholder="Utilisé dans mes projets web..."
          />
          <div style={{ marginTop: "0.5rem" }}>
            <Btn onClick={handleSave} variant="primary">
              {modal.mode === "add" ? "Ajouter" : "Enregistrer"}
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ParcoursSection({ confirmDelete }) {
  const edu = useCollection("education");
  const exp = useCollection("experience");
  const [modal, setModal] = useState(null);
  const emptyEdu = { degree: "", school: "", period: "", description: "" };
  const emptyExp = { role: "", company: "", period: "", description: "" };
  const [form, setForm] = useState(emptyEdu);
  const openAdd = (type) => {
    setForm(type === "education" ? emptyEdu : emptyExp);
    setModal({ mode: "add", type });
  };
  const openEdit = (type, item) => {
    setForm(item);
    setModal({ mode: "edit", type, item });
  };
  const handleSave = async () => {
    const col = modal.type === "education" ? edu : exp;
    if (modal.mode === "add") await col.add(form);
    else await col.update(modal.item.id, form);
    setModal(null);
  };
  const handleRemove = (type, id) =>
    (type === "education" ? edu : exp).remove(id);

  const renderCol = (items, type, loadingState) => (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {type === "education" ? "Formation" : "Expérience"}
        </span>
        <Btn onClick={() => openAdd(type)} variant="ghost" small>
          + Ajouter
        </Btn>
      </div>
      {loadingState ? (
        <p style={{ color: "var(--text-2)", fontSize: "0.85rem" }}>
          Chargement...
        </p>
      ) : (
        <div style={listContainerStyle}>
          {items.map((item) => (
            <ListRow
              key={item.id}
              main={type === "education" ? item.degree : item.role}
              sub={`${type === "education" ? item.school : item.company} · ${item.period}`}
              onEdit={() => openEdit(type, item)}
              onDelete={() => confirmDelete(
                type === "education"
                  ? `Voulez-vous vraiment supprimer la formation « ${item.degree} » ?`
                  : `Voulez-vous vraiment supprimer l'expérience « ${item.role} » ?`,
                () => handleRemove(type, item.id)
              )}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div
        style={{
          marginBottom: "1.5rem",
          paddingBottom: "1.1rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "1.45rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            margin: 0,
          }}
        >
          Parcours
        </h3>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            color: "var(--text-2)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "4px 0 0",
          }}
        >
          Formation et expériences professionnelles
        </p>
      </div>
      <div
        className="px-dash-twocol"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2.5rem",
        }}
      >
        {renderCol(edu.data, "education", edu.loading)}
        {renderCol(exp.data, "experience", exp.loading)}
      </div>
      {modal && (
        <Modal
          title={
            modal.mode === "add"
              ? modal.type === "education"
                ? "Nouvelle formation"
                : "Nouvelle expérience"
              : "Modifier"
          }
          onClose={() => setModal(null)}
        >
          {modal.type === "education" ? (
            <>
              <Input
                label="Diplôme / Formation"
                value={form.degree}
                onChange={(v) => setForm((f) => ({ ...f, degree: v }))}
                placeholder="Licence en Génie Logiciel..."
              />
              <Input
                label="École / Université"
                value={form.school}
                onChange={(v) => setForm((f) => ({ ...f, school: v }))}
                placeholder="Université Aube Nouvelle..."
              />
            </>
          ) : (
            <>
              <Input
                label="Poste / Rôle"
                value={form.role}
                onChange={(v) => setForm((f) => ({ ...f, role: v }))}
                placeholder="Stage Développeur Web..."
              />
              <Input
                label="Entreprise"
                value={form.company}
                onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                placeholder="Nom de l'entreprise..."
              />
            </>
          )}
          <Input
            label="Période"
            value={form.period}
            onChange={(v) => setForm((f) => ({ ...f, period: v }))}
            placeholder="2023 — Présent"
          />
          <TextArea
            label="Description"
            value={form.description}
            onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            placeholder="Décrivez cette étape..."
          />
          <div style={{ marginTop: "0.5rem" }}>
            <Btn onClick={handleSave} variant="primary">
              {modal.mode === "add" ? "Ajouter" : "Enregistrer"}
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function CertificationsSection({ confirmDelete }) {
  const { data, loading, add, update, remove } =
    useCollection("certifications");
  const [modal, setModal] = useState(null);
  const emptyForm = { title: "", issuer: "", date: "", url: "", image: "" };
  const [form, setForm] = useState(emptyForm);
  const openAdd = () => {
    setForm(emptyForm);
    setModal({ mode: "add" });
  };
  const openEdit = (item) => {
    setForm(item);
    setModal({ mode: "edit", item });
  };
  const handleSave = async () => {
    if (modal.mode === "add") await add(form);
    else await update(modal.item.id, form);
    setModal(null);
  };
  return (
    <div>
      <SectionHeader
        title="Certifications"
        count={data.length}
        onAdd={openAdd}
      />
      {loading ? (
        <p style={{ color: "var(--text-2)" }}>Chargement...</p>
      ) : (
        <div style={listContainerStyle}>
          {data.map((c) => (
            <ListRow
              key={c.id}
              main={c.title}
              thumb={c.image}
              sub={`${c.issuer} · ${c.date}`}
              onEdit={() => openEdit(c)}
              onDelete={() => confirmDelete(`Voulez-vous vraiment supprimer la certification « ${c.title} » ?`, () => remove(c.id))}
            />
          ))}
        </div>
      )}
      {modal && (
        <Modal
          title={modal.mode === "add" ? "Nouvelle certification" : "Modifier"}
          onClose={() => setModal(null)}
        >
          <Input
            label="Titre de la certification"
            value={form.title}
            onChange={(v) => setForm((f) => ({ ...f, title: v }))}
            placeholder="Introduction to..."
          />
          <Input
            label="Émetteur"
            value={form.issuer}
            onChange={(v) => setForm((f) => ({ ...f, issuer: v }))}
            placeholder="Coursera, Cisco..."
          />
          <Input
            label="Date"
            value={form.date}
            onChange={(v) => setForm((f) => ({ ...f, date: v }))}
            placeholder="Mars 2025"
          />
          <Input
            label="URL du certificat"
            value={form.url}
            onChange={(v) => setForm((f) => ({ ...f, url: v }))}
            placeholder="https://..."
          />
          <ImageUploader
            label="Photo / capture du certificat"
            value={form.image}
            onChange={(url) => setForm((f) => ({ ...f, image: url }))}
          />
          <div style={{ marginTop: "0.5rem" }}>
            <Btn onClick={handleSave} variant="primary">
              {modal.mode === "add" ? "Ajouter" : "Enregistrer"}
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   Section Profil — photo & informations
═══════════════════════════════════════ */
function ProfileSection() {
  const { data, loading, update } = useProfile();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && data && form === null) setForm(data);
  }, [loading, data, form]);

  const set = (key) => (v) => setForm((f) => ({ ...f, [key]: v }));

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setSaved(false);
    const ok = await update(form);
    setSaving(false);
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "1.5rem",
          paddingBottom: "1.1rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "1.45rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            margin: 0,
          }}
        >
          Profil
        </h3>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            color: "var(--text-2)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "4px 0 0",
          }}
        >
          Photo et informations personnelles
        </p>
      </div>

      {loading || !form ? (
        <p style={{ color: "var(--text-2)" }}>Chargement...</p>
      ) : (
        <div>
          <ImageUploader
            label="Photo de profil"
            value={form.photo}
            onChange={set("photo")}
            square
          />

          <Input
            label="Prénom"
            value={form.firstName}
            onChange={set("firstName")}
            placeholder="Frank"
          />
          <Input
            label="Nom"
            value={form.lastName}
            onChange={set("lastName")}
            placeholder="KABORE"
          />
          <Input
            label="Titre / Statut"
            value={form.title}
            onChange={set("title")}
            placeholder="Étudiant en Génie Logiciel"
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="vous@exemple.com"
          />
          <Input
            label="Téléphone"
            value={form.phone}
            onChange={set("phone")}
            placeholder="+226 ..."
          />
          <Input
            label="Localisation"
            value={form.location}
            onChange={set("location")}
            placeholder="Burkina Faso · Bobo-Dioulasso"
          />
          <TextArea
            label="Bio / description"
            value={form.bio}
            onChange={set("bio")}
            placeholder="Présentation en quelques lignes..."
            rows={4}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginTop: "0.5rem",
            }}
          >
            <Btn onClick={handleSave} variant="primary">
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Btn>
            {saved && (
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.74rem",
                  color: "var(--accent)",
                }}
              >
                ✔ Enregistré
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   Dashboard principal
═══════════════════════════════════════ */
const tabs = [
  { key: "profile", label: "Profil" },
  { key: "projects", label: "Projets" },
  { key: "skills", label: "Compétences" },
  { key: "parcours", label: "Parcours" },
  { key: "certifications", label: "Certifications" },
];

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);

  const confirmDelete = (message, action) => setPendingDelete({ message, action });
  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    await pendingDelete.action();
    setPendingDelete(null);
  };

  const { data: profileData, loading: profileLoading } = useProfile();
  const { firstName, photo, initials } = profileData || PORTFOLIO.personal;

  const projects = useCollection("projects");
  const skills = useCollection("skills");
  const education = useCollection("education");
  const experience = useCollection("experience");
  const certifications = useCollection("certifications");

  const [seedLoading, setSeedLoading] = useState(false);
  const [seedStatus, setSeedStatus] = useState("");

  async function handleSeed() {
    setSeedLoading(true);
    setSeedStatus("");
    try {
      const targets = [
        { name: "projects",       items: PORTFOLIO.projects || [],       key: "title"  },
        { name: "skills",         items: PORTFOLIO.skills || [],         key: "name"   },
        { name: "education",      items: PORTFOLIO.education || [],      key: "degree" },
        { name: "experience",     items: PORTFOLIO.experience || [],     key: "role"   },
        { name: "certifications", items: PORTFOLIO.certifications || [], key: "title"  },
      ];
      let imported = 0;
      const restored = [];
      const backfilled = [];
      for (const { name, items, key } of targets) {
        const snap = await getDocs(collection(db, name));
        const byKey = new Map(snap.docs.map((d) => [d.data()[key], d]));
        for (const item of items) {
          const { id, ...data } = item;
          if (!data[key]) continue;
          const doc = byKey.get(data[key]);
          if (doc) {
            const existingData = doc.data();
            const missing = {};
            for (const field of ["features", "longDescription", "description"]) {
              if (data[field] && !existingData[field]) missing[field] = data[field];
            }
            if (Object.keys(missing).length) {
              await updateDoc(doc.ref, missing);
              imported++;
              backfilled.push(name);
            }
          } else if (!byKey.has(data[key])) {
            await addDoc(collection(db, name), data);
            imported++;
            restored.push(name);
          }
        }
      }
      if (imported > 0) {
        const parts = [];
        if (restored.length) parts.push(`${[...new Set(restored)].join(", ")}`);
        if (backfilled.length) parts.push(`fonctionnalités complétées (${[...new Set(backfilled)].join(", ")})`);
        setSeedStatus(`✔ ${imported} mise(s) à jour effectuée(s) : ${parts.join(" ; ")}.`);
        projects.refresh();
        skills.refresh();
        education.refresh();
        experience.refresh();
        certifications.refresh();
      } else {
        setSeedStatus("Rien à restaurer — toutes les données sont déjà présentes.");
      }
    } catch (e) {
      setSeedStatus("Erreur d'import : " + (e?.message || e));
    } finally {
      setSeedLoading(false);
    }
  }

  const stats = [
    { key: "projects", icon: <RocketIcon width={20} height={20} />, num: projects.data.length, label: "Projets" },
    { key: "skills", icon: <ZapIcon width={20} height={20} />, num: skills.data.length, label: "Compétences" },
    { key: "parcours", icon: <GraduationIcon width={20} height={20} />, num: education.data.length, label: "Formations" },
    { key: "parcours", icon: <BriefcaseIcon width={20} height={20} />, num: experience.data.length, label: "Expériences" },
    { key: "certifications", icon: <AwardIcon width={20} height={20} />, num: certifications.data.length, label: "Certifications" },
  ];

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch {
      setError("Erreur lors de la déconnexion");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* ── Top Bar ── */}
      <motion.header
        className="px-dash-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          padding: "0.75rem 2rem",
          minHeight: "60px",
          background: "var(--glass-bg-strong)",
          backdropFilter: "blur(var(--glass-blur)) saturate(150%)",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(150%)",
          borderBottom: "1px solid var(--glass-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div
          className="px-dash-header-left"
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.78rem",
              fontFamily: "var(--mono)",
              color: "var(--text-2)",
              textDecoration: "none",
              transition: "color var(--fast)",
              borderBottom: "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.borderBottomColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-2)";
              e.currentTarget.style.borderBottomColor = "transparent";
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ width: "13px", height: "13px" }}
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Retour au site
          </a>
          <span style={{ color: "var(--border)", fontSize: "1.1rem" }}>·</span>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Espace Administration
          </span>
        </div>
        <div
          className="px-dash-header-right"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span
            className="px-dash-email"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.72rem",
              color: "var(--text-2)",
            }}
          >
            {currentUser?.email}
          </span>
          {error && (
            <span style={{ color: "#e5484d", fontSize: "0.75rem" }}>
              {error}
            </span>
          )}
          <Btn onClick={handleSeed} variant="ghost" small>
            {seedLoading ? "Restaurer..." : "Restaurer"}
          </Btn>
          <Btn onClick={handleLogout} variant="danger" small>
            Déconnecter
          </Btn>
        </div>
      </motion.header>

      {/* ── Contenu ── */}
      <div
        className="px-dash-layout"
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "2.5rem 2rem",
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: "2.5rem",
          alignItems: "start",
        }}
      >
        {/* Sidebar */}
        <div
          className="px-dash-sidebar"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
            position: "sticky",
            top: "96px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(var(--glass-blur)) saturate(150%)",
              WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(150%)",
              border: "1px solid var(--glass-border)",
              borderRadius: "var(--r-xl)",
              padding: "1.5rem 1.6rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "var(--r-full)",
                  overflow: "hidden",
                  border: "2px solid var(--accent)",
                  flexShrink: 0,
                }}
              >
                {photo ? (
                  <img
                    src={photo}
                    alt={firstName}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--accent)",
                      color: "#fff",
                      fontFamily: "var(--font-head)",
                      fontSize: "1.1rem",
                    }}
                  >
                    {initials}
                  </div>
                )}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  · Espace Administration ·
                </p>
                <h1
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: "1.35rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                    margin: "4px 0 0",
                  }}
                >
                  Bonjour, {firstName}
                </h1>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--text-2)",
                margin: 0,
                lineHeight: 1.6,
                borderTop: "1px solid var(--border)",
                paddingTop: "1rem",
              }}
            >
              Gérez ici les projets, compétences, parcours et certifications
              affichés sur votre portfolio.
            </p>
          </motion.div>

          {/* Onglets verticaux */}
          <motion.div
            className="px-dash-tabs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            {tabs.map((tab, i) => {
              const active = activeTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    borderRadius: "var(--r-md)",
                    background: active ? "var(--accent-glow)" : "transparent",
                    color: active ? "var(--accent)" : "var(--text-2)",
                    border: active ? "1px solid var(--accent)" : "1px solid transparent",
                    cursor: "pointer",
                    fontFamily: "var(--mono)",
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textAlign: "left",
                    transition: "all var(--fast)",
                  }}
                >
                  <span style={{ fontSize: "0.68rem", opacity: 0.65 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {tab.label}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Contenu principal */}
        <div className="px-dash-main">
          {seedStatus && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginBottom: "1.25rem",
                padding: "0.8rem 1.1rem",
                borderRadius: "var(--r-md)",
                border: "1px solid var(--accent-border)",
                background: "var(--accent-glow)",
                fontFamily: "var(--mono)",
                fontSize: "0.74rem",
                color: "var(--text)",
                lineHeight: 1.6,
              }}
            >
              {seedStatus}
            </motion.div>
          )}

          {/* Compteurs "studio" */}
          <motion.div
            className="px-dash-stats"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {stats.map((s) => (
              <button
                key={s.label}
                className={`px-stat ${activeTab === s.key ? "active" : ""}`}
                onClick={() => setActiveTab(s.key)}
                title={`Voir les ${s.label.toLowerCase()}`}
                style={{ cursor: "pointer", textAlign: "left" }}
              >
                <span className="px-stat-icon">{s.icon}</span>
                <p className="px-stat-num">
                  {s.num}<em>+</em>
                </p>
                <p className="px-stat-label">{s.label}</p>
              </button>
            ))}
          </motion.div>

          {/* Contenu de l'onglet */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="px-dash-tabpanel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                background: "var(--glass-bg-strong)",
                backdropFilter: "blur(var(--glass-blur)) saturate(150%)",
                WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(150%)",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--r-xl)",
                padding: "2.5rem",
                minHeight: "60vh",
              }}
            >
              {activeTab === "profile" && <ProfileSection />}
              {activeTab === "projects" && <ProjectsSection confirmDelete={confirmDelete} />}
              {activeTab === "skills" && <SkillsSection confirmDelete={confirmDelete} />}
              {activeTab === "parcours" && <ParcoursSection confirmDelete={confirmDelete} />}
              {activeTab === "certifications" && <CertificationsSection confirmDelete={confirmDelete} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {pendingDelete && (
        <ConfirmDialog
          message={pendingDelete.message}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

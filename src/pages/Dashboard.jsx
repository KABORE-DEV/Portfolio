import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useCollection } from "../hooks/useFirestore";

/* ═══════════════════════════════════════
   Composants UI réutilisables — Design System
═══════════════════════════════════════ */

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  background: "var(--glass-bg)",
  border: "1px solid var(--glass-border)",
  borderRadius: "10px",
  color: "var(--color-text)",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
  backdropFilter: "blur(8px)",
};

function Input({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "var(--color-text-muted)",
          marginBottom: "6px",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--color-accent)";
          e.target.style.boxShadow = "0 0 0 3px var(--color-accent-glow)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--glass-border)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "var(--color-text-muted)",
          marginBottom: "6px",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{ ...inputStyle, resize: "vertical" }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--color-accent)";
          e.target.style.boxShadow = "0 0 0 3px var(--color-accent-glow)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--glass-border)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "var(--color-text-muted)",
          marginBottom: "6px",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputStyle, cursor: "pointer" }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--color-accent)";
          e.target.style.boxShadow = "0 0 0 3px var(--color-accent-glow)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--glass-border)";
          e.target.style.boxShadow = "none";
        }}
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{ background: "var(--color-bg)" }}
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
    border: "none",
    borderRadius: small ? "8px" : "10px",
    fontSize: small ? "0.75rem" : "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    padding: small ? "5px 12px" : "10px 20px",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  };
  const variants = {
    primary: { background: "var(--color-accent)", color: "#fff" },
    ghost: {
      background: "var(--glass-bg)",
      color: "var(--color-text)",
      border: "1px solid var(--glass-border)",
    },
    danger: {
      background: "rgba(248,113,113,0.1)",
      color: "#f87171",
      border: "1px solid rgba(248,113,113,0.25)",
    },
    accent: {
      background: "var(--color-accent-glow)",
      color: "var(--color-accent-light)",
      border: "1px solid var(--color-accent)",
    },
  };
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      style={{ ...base, ...variants[variant] }}
    >
      {children}
    </motion.button>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(12px)",
          }}
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "520px",
            maxHeight: "88vh",
            overflowY: "auto",
            background: "var(--color-bg)",
            border: "1px solid var(--glass-border)",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.75rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--color-text)",
              }}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════
   Sections
═══════════════════════════════════════ */

function SectionHeader({ title, count, onAdd }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
      <div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text)", margin: 0 }}>{title}</h3>
        <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", margin: "2px 0 0" }}>{count} élément{count !== 1 ? "s" : ""}</p>
      </div>
      <Btn onClick={onAdd} variant="primary">+ Ajouter</Btn>
    </div>
  );
}

function ListRow({ main, sub, onEdit, onDelete }) {
  return (
    <motion.div
      whileHover={{ background: "var(--glass-bg-hover)", borderColor: "var(--glass-border-hover)" }}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", padding: "1rem 1.25rem", background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "12px", backdropFilter: "blur(8px)" }}
    >
      <div style={{ minWidth: 0, flex: "1 1 160px" }}>
        <p style={{ fontWeight: 600, color: "var(--color-text)", fontSize: "0.9rem", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{main}</p>
        {sub && <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</p>}
      </div>
      <div style={{ display: "flex", gap: "8px", marginLeft: "auto", flexShrink: 0 }}>
        <Btn onClick={onEdit} variant="accent" small>Modifier</Btn>
        <Btn onClick={onDelete} variant="danger" small>Supprimer</Btn>
      </div>
    </motion.div>
  );
}
function ProjectsSection() {
  const { data, loading, add, update, remove } = useCollection("projects");
  const [modal, setModal] = useState(null);
  const emptyForm = {
    title: "",
    description: "",
    longDescription: "",
    technologies: "",
    github: "",
    demo: "",
    status: "",
  };
  const [form, setForm] = useState(emptyForm);
  const openAdd = () => {
    setForm(emptyForm);
    setModal({ mode: "add" });
  };
  const openEdit = (item) => {
    setForm({
      ...item,
      technologies: Array.isArray(item.technologies)
        ? item.technologies.join(", ")
        : item.technologies,
    });
    setModal({ mode: "edit", item });
  };
  const handleSave = async () => {
    const payload = {
      ...form,
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
        <p style={{ color: "var(--color-text-muted)" }}>Chargement...</p>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {data.map((p) => (
            <ListRow
              key={p.id}
              main={p.title}
              sub={
                Array.isArray(p.technologies)
                  ? p.technologies.join(" · ")
                  : p.technologies
              }
              onEdit={() => openEdit(p)}
              onDelete={() => remove(p.id)}
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

function SkillsSection() {
  const { data, loading, add, update, remove } = useCollection("skills");
  const [modal, setModal] = useState(null);
  const emptyForm = {
    name: "",
    level: "practiced",
    category: "front",
    context: "",
  };
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
      <SectionHeader title="Compétences" count={data.length} onAdd={openAdd} />
      {loading ? (
        <p style={{ color: "var(--color-text-muted)" }}>Chargement...</p>
      ) : (
        <div
          className="px-dash-skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "0.6rem",
          }}
        >
          {data.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{
                background: "var(--glass-bg-hover)",
                borderColor: "var(--glass-border-hover)",
              }}
              style={{
                padding: "1rem 1.1rem",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                backdropFilter: "blur(8px)",
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
                    color: "var(--color-text)",
                    fontSize: "0.875rem",
                    margin: 0,
                  }}
                >
                  {s.name}
                </p>
              </div>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "10px",
                  margin: "0 0 10px",
                }}
              >
                {s.category}
              </p>
              <div style={{ display: "flex", gap: "6px" }}>
                <Btn onClick={() => openEdit(s)} variant="accent" small>
                  Modifier
                </Btn>
                <Btn onClick={() => remove(s.id)} variant="danger" small>
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

function ParcoursSection() {
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
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <span
          style={{
            fontSize: "0.78rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {type === "education" ? "🎓 Formation" : "💼 Expérience"}
        </span>
        <Btn onClick={() => openAdd(type)} variant="ghost" small>
          + Ajouter
        </Btn>
      </div>
      {loadingState ? (
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
          Chargement...
        </p>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {items.map((item) => (
            <ListRow
              key={item.id}
              main={type === "education" ? item.degree : item.role}
              sub={`${type === "education" ? item.school : item.company} · ${item.period}`}
              onEdit={() => openEdit(type, item)}
              onDelete={() => handleRemove(type, item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--color-text)",
            margin: 0,
          }}
        >
          Parcours
        </h3>
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--color-text-muted)",
            margin: "2px 0 0",
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

function CertificationsSection() {
  const { data, loading, add, update, remove } =
    useCollection("certifications");
  const [modal, setModal] = useState(null);
  const emptyForm = { title: "", issuer: "", date: "", url: "" };
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
        <p style={{ color: "var(--color-text-muted)" }}>Chargement...</p>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {data.map((c) => (
            <ListRow
              key={c.id}
              main={c.title}
              sub={`${c.issuer} · ${c.date}`}
              onEdit={() => openEdit(c)}
              onDelete={() => remove(c.id)}
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
   Dashboard principal
═══════════════════════════════════════ */
const tabs = [
  { key: "projects", label: "Projets", icon: "🚀" },
  { key: "skills", label: "Compétences", icon: "⚡" },
  { key: "parcours", label: "Parcours", icon: "🎓" },
  { key: "certifications", label: "Certifications", icon: "🏆" },
];

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");
  const [error, setError] = useState("");

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
        background: "var(--color-bg)",
        color: "var(--color-text)",
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
          minHeight: "64px",
          background: "var(--glass-bg)",
          backdropFilter: "blur(20px)",
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
          <motion.a
            href="/"
            whileHover={{
              x: -3,
              background: "var(--glass-bg-hover)",
              borderColor: "var(--glass-border-hover)",
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.9rem",
              color: "var(--color-text)",
              textDecoration: "none",
              fontWeight: 700,
              padding: "8px 16px",
              borderRadius: "10px",
              background: "var(--glass-bg)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--glass-border)",
              transition: "all 0.2s",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ width: "14px", height: "14px" }}
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Retour au site
          </motion.a>
          <span style={{ color: "var(--glass-border)", fontSize: "1.2rem" }}>
            |
          </span>
          <span
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--color-text)",
            }}
          >
            Administration
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
            style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}
          >
            {currentUser?.email}
          </span>
          {error && (
            <span style={{ color: "#f87171", fontSize: "0.75rem" }}>
              {error}
            </span>
          )}
          <Btn onClick={handleLogout} variant="danger" small>
            Déconnecter
          </Btn>
        </div>
      </motion.header>

      {/* ── Contenu ── */}
      <div
        className="px-dash-layout"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {/* Sidebar */}
        <div
          className="px-dash-sidebar"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            position: "sticky",
            top: "100px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "2rem",
              border: "1px solid var(--glass-border)",
              boxShadow: "var(--shadow-md)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background:
                  "linear-gradient(90deg, var(--color-accent), var(--color-secondary, #a8b1ff))",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                color: "var(--color-accent)",
                marginBottom: "0.5rem",
              }}
            >
              Bienvenue, {currentUser?.email?.split("@")[0]} 👋
            </p>
            <h1
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "var(--color-text)",
                letterSpacing: "-0.04em",
                margin: "0 0 0.5rem",
              }}
            >
              Dashboard
            </h1>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-muted)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Gérez le contenu de votre portfolio en temps réel.
            </p>
          </motion.div>

          {/* Onglets verticaux */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                whileHover={{
                  x: 4,
                  background:
                    activeTab === tab.key
                      ? "var(--color-accent)"
                      : "var(--glass-bg-hover)",
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "14px 20px",
                  borderRadius: "14px",
                  fontSize: "0.9rem",
                  fontWeight: activeTab === tab.key ? 700 : 500,
                  background:
                    activeTab === tab.key
                      ? "var(--color-accent)"
                      : "transparent",
                  color: activeTab === tab.key ? "#fff" : "var(--color-text)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  boxShadow:
                    activeTab === tab.key
                      ? "0 4px 14px var(--color-accent-glow)"
                      : "none",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{tab.icon}</span>{" "}
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Contenu de l'onglet */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="px-dash-tabpanel"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(24px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "24px",
              padding: "3rem",
              boxShadow: "var(--shadow-lg)",
              minHeight: "60vh",
            }}
          >
            {activeTab === "projects" && <ProjectsSection />}
            {activeTab === "skills" && <SkillsSection />}
            {activeTab === "parcours" && <ParcoursSection />}
            {activeTab === "certifications" && <CertificationsSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

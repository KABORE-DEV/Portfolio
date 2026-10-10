import { useState } from "react";
import { PORTFOLIO } from "../data.js";
import { useProfile } from "../hooks/useFirestore.js";
import { GithubIcon, LinkedinIcon, WhatsappIcon, ArrowUpRightIcon } from "../icons.jsx";

export default function ContactPage() {
  const { data: personal } = useProfile();
  const profile  = personal || PORTFOLIO.personal || {};
  const {
    email    = PORTFOLIO.personal.email,
    phone    = PORTFOLIO.personal.phone,
    location = PORTFOLIO.personal.location,
  } = profile;
  const { github, linkedin, whatsapp } = PORTFOLIO.social;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [form, setForm]     = useState({ prenom: "", name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({ prenom: "", name: "", email: "", subject: "", message: "" });

  const handleCopyEmail = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleChange = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    setErrors(err => ({ ...err, [key]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim())    errs.name    = "Veuillez indiquer votre nom.";
    if (!form.prenom.trim())  errs.prenom  = "Veuillez indiquer votre prénom.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = "Adresse email invalide.";
    if (!form.subject.trim()) errs.subject = "Veuillez indiquer un sujet.";
    if (!form.message.trim()) errs.message = "Veuillez écrire votre message.";
    if (Object.keys(errs).length) { setErrors(errs); setStatus("err"); return; }

    const subject = encodeURIComponent(form.subject);
    const body    = encodeURIComponent(`${form.message}\n\n— ${form.prenom} ${form.name} (${form.email})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setErrors({ prenom: "", name: "", email: "", subject: "", message: "" });
    setForm({ prenom: "", name: "", email: "", subject: "", message: "" });
    setStatus("ok");
    setTimeout(() => setStatus(null), 6000);
  };

  const socials = [
    { href: github,   icon: <GithubIcon   width={16} height={16} />, label: "GitHub"   },
    { href: linkedin, icon: <LinkedinIcon  width={16} height={16} />, label: "LinkedIn" },
    { href: whatsapp, icon: <WhatsappIcon  width={16} height={16} />, label: "WhatsApp" },
  ].filter(s => s.href);

  return (
    <>
      {/* ═══ HEADER ═════════════════════════ */}
      <div className="page-head">
        <div className="container">
          <span className="section-num">Contact</span>
          <h1 className="section-title">Travaillons <em>ensemble.</em></h1>
          <p className="section-desc">
            Un projet, une collaboration ou une question : je vous invite à me contacter.
          </p>
        </div>
      </div>

      <div className="section" style={{ paddingTop: "1rem" }}>
        <div className="container contact-grid">

          {/* ── Infos ─────────────────────── */}
          <div>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--terra-border)",
              borderRadius: "var(--r-lg)",
              padding: "1.25rem",
              marginBottom: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--mono)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--terra)" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                Statut actuel
              </div>
              <p style={{ fontSize: "0.92rem", color: "var(--text)", fontWeight: 600, margin: 0 }}>
                Disponible pour stage ou opportunité professionnelle
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--text-2)", margin: 0 }}>
                Bobo-Dioulasso, Burkina Faso &amp; ouvert au télétravail.
              </p>
            </div>

            <div className="contact-list">
              <div className="contact-item">
                <span className="k">Email</span>
                <div className="v" style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <a className="email-big" href={`mailto:${email}`}>{email}</a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="social-chip"
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.72rem",
                      cursor: "pointer",
                      background: copiedEmail ? "var(--terra-glow)" : undefined,
                      color: copiedEmail ? "var(--terra)" : undefined,
                      borderColor: copiedEmail ? "var(--terra-border)" : undefined,
                    }}
                    title="Copier l'adresse email"
                  >
                    {copiedEmail ? "✓ Copié !" : "Copier"}
                  </button>
                </div>
              </div>
              <div className="contact-item">
                <span className="k">Téléphone</span>
                <span className="v">{phone}</span>
              </div>
              <div className="contact-item">
                <span className="k">Localisation</span>
                <span className="v">{location}</span>
              </div>
            </div>

            <p style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-3)", margin: "2.25rem 0 1rem" }}>
              Réseaux &amp; Messagerie directe
            </p>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {socials.map(s => (
                <a key={s.label} className="social-chip" href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  {s.icon} {s.label}
                </a>
              ))}
            </div>

            {whatsapp && (
              <a
                href={`${whatsapp}?text=${encodeURIComponent("Bonjour Frank, j'ai consulté votre portfolio et j'aimerais échanger avec vous.")}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  borderColor: "var(--terra-border)",
                  color: "var(--terra)",
                  gap: "0.5rem"
                }}
              >
                <WhatsappIcon width={16} height={16} /> Discuter directement sur WhatsApp
              </a>
            )}
          </div>

          {/* ── Formulaire ────────────────── */}
          <div className="form-card">
            <h2>Écrivez-moi</h2>
            <p className="form-intro">Je réponds à chaque message sous 24h.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid2">
                <div className="field">
                  <label htmlFor="c-prenom">Prénom</label>
                  <input
                    id="c-prenom"
                    className={`input${errors.prenom ? " invalid" : ""}`}
                    value={form.prenom}
                    onChange={handleChange("prenom")}
                    placeholder="Votre prénom"
                    autoComplete="given-name"
                  />
                  {errors.prenom && <p className="field-err">{errors.prenom}</p>}
                </div>
                <div className="field">
                  <label htmlFor="c-name">Nom</label>
                  <input
                    id="c-name"
                    className={`input${errors.name ? " invalid" : ""}`}
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Votre nom"
                    autoComplete="family-name"
                  />
                  {errors.name && <p className="field-err">{errors.name}</p>}
                </div>
              </div>

              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  type="email"
                  className={`input${errors.email ? " invalid" : ""}`}
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="vous@email.com"
                  autoComplete="email"
                />
                {errors.email && <p className="field-err">{errors.email}</p>}
              </div>

              <div className="field">
                <label htmlFor="c-subject">Sujet</label>
                <input
                  id="c-subject"
                  className={`input${errors.subject ? " invalid" : ""}`}
                  value={form.subject}
                  onChange={handleChange("subject")}
                  placeholder="De quoi voulez-vous parler ?"
                />
                {errors.subject && <p className="field-err">{errors.subject}</p>}
              </div>

              <div className="field">
                <label htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  className={`textarea${errors.message ? " invalid" : ""}`}
                  rows={5}
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="Décrivez votre projet ou votre demande…"
                />
                {errors.message && <p className="field-err">{errors.message}</p>}
              </div>

              <button type="submit" id="contact-submit" className="btn btn-primary btn-block" style={{ marginTop: "0.5rem" }}>
                Envoyer le message <ArrowUpRightIcon width={15} height={15} />
              </button>

              {status === "ok" && (
                <p className="form-status ok" style={{ marginTop: "1rem" }}>
                  Votre message a été préparé. Votre client de messagerie s'est ouvert pour l'envoi.
                </p>
              )}
              {status === "err" && (
                <p className="form-status err" style={{ marginTop: "1rem" }}>
                  Merci de remplir tous les champs.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

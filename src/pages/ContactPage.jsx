import { useState } from "react";
import { PORTFOLIO } from "../data.js";
import { GithubIcon, LinkedinIcon, WhatsappIcon, ArrowUpRightIcon } from "../icons.jsx";

export default function ContactPage() {
  const { email, phone, location } = PORTFOLIO.personal;
  const { github, linkedin, whatsapp } = PORTFOLIO.social;

  const [form, setForm] = useState({ prenom: "", name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "ok" | "err"
  const [errors, setErrors] = useState({ prenom: "", name: "", email: "", subject: "", message: "" });

  const handleChange = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    setErrors(err => ({ ...err, [key]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = {};
    if (!form.name.trim()) errs.name = "Veuillez indiquer votre nom.";
    if (!form.prenom.trim()) errs.prenom = "Veuillez indiquer votre prénom.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = "Adresse email invalide.";
    if (!form.subject.trim()) errs.subject = "Veuillez indiquer un sujet.";
    if (!form.message.trim()) errs.message = "Veuillez écrire votre message.";

    if (Object.keys(errs).length) {
      setErrors(errs);
      setStatus("err");
      return;
    }

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.prenom} ${form.name} (${form.email})`);
    const mailto = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setErrors({ prenom: "", name: "", email: "", subject: "", message: "" });
    setForm({ prenom: "", name: "", email: "", subject: "", message: "" });
    setStatus("ok");
    setTimeout(() => setStatus(null), 6000);
  };

  const socials = [
    { href: github,   icon: <GithubIcon width={16} height={16} />,   label: "GitHub" },
    { href: linkedin, icon: <LinkedinIcon width={16} height={16} />,  label: "LinkedIn" },
    { href: whatsapp, icon: <WhatsappIcon width={16} height={16} />,  label: "WhatsApp" },
  ].filter(s => s.href);

  return (
    <>
      {/* ═══ HEADER ═════════════════════════ */}
      <div className="page-head">
        <div className="container">
          <span className="section-num">Contact</span>
          <h1 className="section-title">Travaillons <em>ensemble.</em></h1>
          <p className="section-desc">
            Une collaboration, un projet, ou simplement envie de discuter — ma boîte mail est ouverte.
          </p>
        </div>
      </div>

      <div className="section" style={{ paddingTop: "1rem" }}>
        <div className="container contact-grid">
          {/* ── Infos ─────────────────────── */}
          <div>
            <div className="contact-list">
              <div className="contact-item">
                <span className="k">Email</span>
                <div className="v">
                  <a className="email-big" href={`mailto:${email}`}>{email}</a>
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
              Réseaux
            </p>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {socials.map(s => (
                <a key={s.label} className="social-chip" href={s.href} target="_blank" rel="noreferrer">
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Formulaire ────────────────── */}
          <div className="form-card">
            <h2>Écrivez-moi</h2>
            <p className="form-intro">Réponse garantie sous 24h — promis juré.</p>

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

              <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "0.5rem" }}>
                Envoyer le message <ArrowUpRightIcon width={15} height={15} />
              </button>

              {status === "ok" && (
                <p className="form-status ok" style={{ marginTop: "1rem" }}>
                  Message prêt à partir ! Votre client mail s'est ouvert.
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

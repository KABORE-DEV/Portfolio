import { useState } from "react";
import { PORTFOLIO } from "../data.js";
import { MailIcon, PhoneIcon, GithubIcon, LinkedinIcon, WhatsappIcon } from "../icons.jsx";

export default function Contact() {
  const { email, phone } = PORTFOLIO.personal;
  const { github, linkedin, whatsapp } = PORTFOLIO.social;
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Message de ${form.name || "un visiteur"}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\nDe : ${form.name} (${form.email})`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section__header" data-animate="slide-up">
          <span className="section__tag">06. Contact</span>
          <h2 className="section__title">Travaillons ensemble</h2>
        </div>

        <div className="contact__grid">
          <div
            className="contact__info"
            data-animate="slide-up"
            data-delay="0.1"
          >
            <p className="contact__text">
              Vous avez un projet, une question ou vous voulez simplement
              discuter ? N'hésitez pas à me contacter, je vous répondrai
              rapidement.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <span className="contact__detail-icon">
                  <MailIcon width={24} height={24} />
                </span>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <a href={`mailto:${email}`} className="contact__detail-value">
                    {email}
                  </a>
                </div>
              </div>
              <div className="contact__detail">
                <span className="contact__detail-icon">
                  <PhoneIcon width={24} height={24} />
                </span>
                <div>
                  <span className="contact__detail-label">Téléphone</span>
                  <span className="contact__detail-value">{phone}</span>
                </div>
              </div>
            </div>

            <div className="contact__social">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <GithubIcon width={24} height={24} />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon width={24} height={24} />
                </a>
              )}
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="WhatsApp"
                >
                  <WhatsappIcon width={24} height={24} />
                </a>
              )}
            </div>
          </div>

          <form
            className="contact__form"
            data-animate="slide-up"
            data-delay="0.2"
            onSubmit={onSubmit}
          >
            <div className="form__group">
              <label htmlFor="name" className="form__label">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form__input"
                placeholder="Ton nom"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form__input"
                placeholder="ton@email.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form__group">
              <label htmlFor="message" className="form__label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form__input form__textarea"
                rows="5"
                placeholder="Ton message..."
                value={form.message}
                onChange={onChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn--primary btn--full">
              <span>Envoyer le message</span>
              <svg
                className="btn__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ width: "20px", height: "20px", marginLeft: "8px" }}
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

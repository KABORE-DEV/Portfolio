import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState("");

  const { login, resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      if (onSuccess) onSuccess();
    } catch {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    if (!email) {
      setResetMsg("");
      setError("Entrez d'abord votre email ci-dessus.");
      return;
    }
    try {
      setError("");
      await resetPassword(email);
      setResetMsg(`Un email de réinitialisation vient d'être envoyé à ${email}. Vérifiez votre boîte de réception.`);
    } catch {
      setError("Impossible d'envoyer l'email. Vérifiez l'adresse saisie.");
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid var(--color-border)",
    background: "var(--color-bg)",
    color: "var(--color-text)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        padding: "3rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
      }}
    >
      <motion.div
        className="px-login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "var(--color-card)",
          backgroundImage: "linear-gradient(160deg, var(--glass-bg-strong), var(--glass-bg))",
          backdropFilter: "blur(var(--glass-blur)) saturate(150%)",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(150%)",
          border: "1px solid var(--glass-border)",
          borderRadius: "var(--radius-lg)",
          padding: "2.5rem",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "var(--color-accent-glow)",
              color: "var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--color-text)", margin: "0 0 0.4rem" }}>
            Espace Admin
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", margin: 0 }}>
            Connectez-vous pour gérer votre portfolio
          </p>
        </div>

        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#ef4444",
            padding: "10px 14px",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.82rem",
            marginBottom: "1.25rem",
            textAlign: "center",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "var(--color-accent)"}
              onBlur={e => e.target.style.borderColor = "var(--color-border)"}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "var(--color-accent)"}
              onBlur={e => e.target.style.borderColor = "var(--color-border)"}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "var(--color-accent)",
              color: "#ffffff",
              border: "none",
              padding: "12px",
              borderRadius: "var(--radius-sm)",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: loading ? "wait" : "pointer",
              transition: "background var(--transition-base)",
              marginTop: "0.5rem",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--color-accent-dark)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--color-accent)"}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-muted)",
              fontSize: "0.8rem",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              cursor: "pointer",
              alignSelf: "center",
              marginTop: "0.25rem",
              transition: "color 0.2s",
              fontFamily: "var(--font)",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--color-accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
          >
            Mot de passe oublié ?
          </button>

          {resetMsg && (
            <p style={{
              background: "var(--color-accent-glow)",
              border: "1px solid var(--color-accent-border, rgba(255,77,36,0.28))",
              color: "var(--color-accent)",
              padding: "10px 14px",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.82rem",
              textAlign: "center",
              lineHeight: 1.5,
              margin: 0,
            }}>
              ✦ {resetMsg}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
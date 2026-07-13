import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/admin");
    } catch {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid var(--glass-border)",
    background: "var(--glass-bg)",
    backdropFilter: "blur(12px)",
    color: "var(--color-text)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Arrière-plan glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "var(--glass-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--glass-border)",
          borderRadius: "24px",
          padding: "2.5rem",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
        }}
      >
        {/* Icône / Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "var(--color-accent-glow)",
              border: "1px solid var(--color-accent)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              style={{ width: "28px", height: "28px" }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--color-text)",
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            Administration
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-muted)",
              margin: "6px 0 0",
            }}
          >
            Connectez-vous pour gérer votre portfolio
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              background: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.25)",
              color: "#f87171",
              fontSize: "0.85rem",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            {error}
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-text-muted)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="votre@email.com"
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
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-text-muted)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Mot de passe
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
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

          <motion.button
            id="login-submit"
            disabled={loading}
            type="submit"
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            style={{
              marginTop: "0.5rem",
              width: "100%",
              padding: "13px",
              borderRadius: "12px",
              background: "var(--color-accent)",
              color: "white",
              border: "none",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </motion.button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.8rem",
            color: "var(--color-text-muted)",
          }}
        >
          <motion.a
            href="/"
            whileHover={{ x: -3 }}
            style={{
              color: "var(--color-accent)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "10px",
              background: "var(--glass-bg)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--glass-border)",
              transition: "all 0.2s",
            }}
          >
            ← Retour au portfolio
          </motion.a>
        </p>
      </motion.div>
    </div>
  );
}

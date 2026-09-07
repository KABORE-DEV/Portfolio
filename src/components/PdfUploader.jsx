import { useRef, useState } from "react";
import { ArrowDownIcon } from "../icons.jsx";

const boxStyle = {
  border: "1px dashed rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
  padding: "1.2rem",
  background: "rgba(255, 255, 255, 0.02)",
  marginBottom: "1.2rem",
};

function fmtBytes(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return bytes + " o";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " Ko";
  return (bytes / (1024 * 1024)).toFixed(1) + " Mo";
}

export default function PdfUploader({
  value,
  onChange,
  label = "Curriculum Vitae (PDF)",
}) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(null);

  const isDataUrl = value && value.startsWith("data:application/pdf");
  const isCustomUrl = value && value !== "/CV_Kabore_Frank.pdf";

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Seuls les fichiers au format PDF sont autorisés.");
      return;
    }

    // Limite recommandée de Firestore : document <= 1 Mo (base64 augmente de ~33%)
    if (file.size > 800 * 1024) {
      setError(
        `Le fichier est trop volumineux (${fmtBytes(file.size)}). La taille maximale recommandée est de 800 Ko.`
      );
      return;
    }

    setError("");
    setBusy(true);

    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result);
      setFileName(file.name);
      setFileSize(file.size);
      setBusy(false);
    };
    reader.onerror = () => {
      setError("Erreur lors de la lecture du fichier.");
      setBusy(false);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    onChange("/CV_Kabore_Frank.pdf");
    setFileName("");
    setFileSize(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div style={boxStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.8rem",
        }}
      >
        <label
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "var(--text-2)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {label}
        </label>
        {fileSize && (
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.68rem",
              color: "var(--accent)",
            }}
          >
            {fmtBytes(fileSize)}
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <button
          type="button"
          onClick={() => inputRef.current && inputRef.current.click()}
          disabled={busy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "var(--r-md)",
            border: "1px solid var(--accent)",
            background: "var(--accent-glow)",
            color: "var(--accent)",
            fontFamily: "var(--mono)",
            fontSize: "0.74rem",
            fontWeight: 700,
            cursor: busy ? "not-allowed" : "pointer",
            transition: "all var(--fast)",
          }}
        >
          {busy ? "Chargement..." : "📁 Choisir un fichier PDF"}
        </button>

        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            download="CV_Frank_KABORE.pdf"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "var(--r-md)",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text)",
              fontFamily: "var(--mono)",
              fontSize: "0.74rem",
              textDecoration: "none",
            }}
          >
            <ArrowDownIcon width={13} height={13} /> Prévisualiser / Télécharger
          </a>
        )}

        {isCustomUrl && (
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--r-md)",
              border: "1px solid rgba(229,72,77,0.3)",
              background: "transparent",
              color: "#e5484d",
              fontFamily: "var(--mono)",
              fontSize: "0.72rem",
              cursor: "pointer",
            }}
          >
            Rétablir CV par défaut
          </button>
        )}
      </div>

      <div style={{ marginTop: "0.75rem" }}>
        <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-2)" }}>
          {isDataUrl ? (
            <span>
              ✔ CV personnalisé chargé {fileName ? `(${fileName})` : "(format Base64)"}.
            </span>
          ) : isCustomUrl ? (
            <span>✔ URL personnalisée : {value}</span>
          ) : (
            <span>ℹ CV actuel : fichier par défaut (<code>/CV_Kabore_Frank.pdf</code>).</span>
          )}
        </p>
      </div>

      {error && (
        <p
          style={{
            margin: "0.5rem 0 0",
            fontSize: "0.75rem",
            color: "#e5484d",
            fontFamily: "var(--mono)",
          }}
        >
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

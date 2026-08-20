import { useRef, useState } from "react";

const boxStyle = {
  border: "1px dashed rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
  padding: "1rem",
  background: "rgba(255, 255, 255, 0.02)",
};

const MAX_DIM = 1280;
const QUALITY = 0.8;

function fmtBytes(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return bytes + " o";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " Ko";
  return (bytes / (1024 * 1024)).toFixed(1) + " Mo";
}

/** Redimensionne + convertit en WebP, puis renvoie la DataURL base64. */
function compressToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > MAX_DIM || height > MAX_DIM) {
        const scale = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("La conversion a échoué"));
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Lecture du fichier impossible"));
          reader.readAsDataURL(blob);
        },
        "image/webp",
        QUALITY
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image illisible"));
    };
    img.src = url;
  });
}

/**
 * Uploader compatible forfait gratuit (Spark) : l'image est compressée
 * puis stockée directement dans Firestore sous forme de DataURL base64.
 */
export default function ImageUploader({
  value,
  onChange,
  label = "Capture d'écran",
  square = false,
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [sizeInfo, setSizeInfo] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setError("");
    setBusy(true);
    try {
      const dataUrl = await compressToDataUrl(f);
      onChange(dataUrl);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(dataUrl);
      setSizeInfo({ original: f.size, compressed: (dataUrl.length * 3) / 4 });
    } catch (err) {
      setError("Impossible de traiter l'image : " + (err?.message || err));
    } finally {
      setBusy(false);
    }
  };

  const remove = () => {
    onChange("");
    setPreview(null);
    setSizeInfo(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const tooBig = sizeInfo && sizeInfo.compressed > 500 * 1024;

  const btnStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "0.7rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    cursor: "pointer",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#ededed",
    background: "transparent",
    transition: "all 0.18s",
  };

  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <div
        style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          fontWeight: 700,
          color: "#888888",
          marginBottom: "6px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>

      <div style={boxStyle}>
        {value && (
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <img
              src={value}
              alt="Aperçu actuel"
              style={{
                width: square ? "96px" : "96px",
                height: square ? "96px" : "64px",
                objectFit: "cover",
                borderRadius: square ? "50%" : "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "#0c0c0c",
              }}
            />
            <div style={{ fontSize: "0.78rem", color: "#888888", lineHeight: 1.5 }}>
              {value.startsWith("data:") ? "Image intégrée (prête à enregistrer)." : "Image actuelle enregistrée."}
              <br />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", wordBreak: "break-all" }}>
                {value.slice(0, 80)}…
              </span>
            </div>
          </div>
        )}

        {preview && !value && (
          <img
            src={preview}
            alt="Aperçu"
            style={{
              width: "100%",
              maxHeight: "180px",
              objectFit: "contain",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "#0c0c0c",
              marginBottom: "0.75rem",
            }}
          />
        )}

        {sizeInfo && (
          <p
            style={{
              marginTop: "0.4rem",
              marginBottom: "0.75rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              color: "#c8c8c8",
            }}
          >
            {fmtBytes(sizeInfo.original)} → {fmtBytes(sizeInfo.compressed)}
            <span style={{ color: "#4ade80" }}>
              {" "}(-{Math.round((1 - sizeInfo.compressed / sizeInfo.original) * 100)}%)
            </span>
            {" · compression automatique"}
            {tooBig && (
              <span style={{ color: "#e8c56b" }}>
                {" · ⚠ image assez lourde, préfère une capture plus petite"}
              </span>
            )}
          </p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={pick}
          style={{ display: "none" }}
        />

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            style={btnStyle}
            onClick={() => inputRef.current && inputRef.current.click()}
            disabled={busy}
          >
            {busy ? "Traitement..." : value ? "Remplacer" : "Choisir un fichier"}
          </button>

          {value && (
            <button
              type="button"
              style={{ ...btnStyle, borderColor: "rgba(229,72,77,0.4)", color: "#e5484d" }}
              onClick={remove}
              disabled={busy}
            >
              Retirer l'image
            </button>
          )}
        </div>

        <p
          style={{
            marginTop: "0.6rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem",
            color: "#555555",
            lineHeight: 1.5,
          }}
        >
          L'image est compressée (WebP, max 1280px) puis stockée dans Firestore —
          compatible forfait gratuit, aucune configuration requise.
          Pense à cliquer sur « Enregistrer » pour sauvegarder.
        </p>

        {error && (
          <p style={{ marginTop: "0.6rem", fontSize: "0.75rem", color: "#e5484d" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

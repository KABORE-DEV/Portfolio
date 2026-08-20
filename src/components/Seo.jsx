import { useEffect } from "react";

const DEFAULT = {
  title: "Frank KABORE · Développeur Web & Mobile",
  description:
    "Portfolio de Frank KABORE — étudiant en génie logiciel, développeur de sites et d'applications web & mobiles.",
};

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, description }) {
  useEffect(() => {
    const t = title || DEFAULT.title;
    const d = description || DEFAULT.description;
    document.title = t;
    setMeta("name", "description", d);
    setMeta("property", "og:title", t);
    setMeta("property", "og:description", d);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", window.location.href);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", t);
    setMeta("name", "twitter:description", d);
  }, [title, description]);

  return null;
}

import { useState, useEffect } from "react";
import "./ScrollToTop.css";
import { scrollToTop } from "../lib/scroll.js";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = window.scrollY;
      if (scrolled > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      className={`scroll-to-top ${visible ? "is-visible" : ""}`}
      onClick={() => scrollToTop(false)}
      aria-label="Retour en haut"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

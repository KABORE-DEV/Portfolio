/* ═══ Framer Motion — variantes partagées ═════════ */

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export const viewportOnce = { once: true };

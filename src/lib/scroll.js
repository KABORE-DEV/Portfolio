import Lenis from "lenis";

let lenis = null;

export function initLenis() {
  if (lenis) return lenis;
  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    touchMultiplier: 1.6,
  });
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

/** Met le smooth-scroll en pause (à utiliser quand un élément doit défiler nativement). */
export function stopLenis() {
  if (lenis) lenis.stop();
}

/** Relance le smooth-scroll après une pause. */
export function startLenis() {
  if (lenis) lenis.start();
}

export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo(0, 0);
  }
}

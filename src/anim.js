import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initLenis, destroyLenis } from "./lib/scroll.js";

gsap.registerPlugin(ScrollTrigger);

/** Smooth scroll (Lenis) synchronisé avec ScrollTrigger + gsap ticker. */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = initLenis();
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      destroyLenis();
    };
  }, []);
}

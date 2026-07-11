import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll("[data-animate]");

    elements.forEach((el) => observer.observe(el));

    // Handle initial reveal for elements already in view
    setTimeout(() => {
      document.querySelectorAll("[data-animate]").forEach((el) => {
         if(el.getBoundingClientRect().top < window.innerHeight) {
             el.classList.add("is-visible");
         }
      })
    }, 100);

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}

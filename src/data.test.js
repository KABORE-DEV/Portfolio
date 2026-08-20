import { describe, it, expect } from "vitest";
import { PORTFOLIO } from "./data.js";

describe("data.js — intégrité des données", () => {
  it("le profil personnel est complet", () => {
    const p = PORTFOLIO.personal;
    for (const key of ["firstName", "lastName", "email", "bio", "initials"]) {
      expect(p[key]).toBeTruthy();
    }
  });

  it("les projets ont un titre, une description et des technologies", () => {
    for (const pr of PORTFOLIO.projects) {
      expect(pr.title).toBeTruthy();
      expect(pr.description).toBeTruthy();
      expect(Array.isArray(pr.technologies) && pr.technologies.length > 0).toBe(true);
    }
  });

  it("les noms de compétences sont uniques", () => {
    const names = PORTFOLIO.skills.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("les compétences ont des catégories et niveaux valides", () => {
    const cats = new Set(["front", "back", "framework", "tools"]);
    const levels = new Set(["practiced", "familiar", "learning"]);
    for (const s of PORTFOLIO.skills) {
      expect(cats.has(s.category)).toBe(true);
      expect(levels.has(s.level)).toBe(true);
    }
  });

  it("aucun projet ne contient d'URL vide", () => {
    for (const pr of PORTFOLIO.projects) {
      if (pr.demo) expect(pr.demo.startsWith("https://")).toBe(true);
      if (pr.github) expect(pr.github.startsWith("https://")).toBe(true);
    }
  });
});
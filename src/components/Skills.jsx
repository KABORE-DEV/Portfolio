import { useState } from "react";
import { PORTFOLIO } from "../data.js";

/* Icônes SVG inline pour chaque technologie */
const TECH_ICONS = {
  "HTML / CSS": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 3h16l-1.5 16L12 21l-6.5-2L4 3z" />
      <path d="M8 8h8M8.5 12h7l-.5 4-3 1-3-1-.2-2" />
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        fill="#F7DF1E"
        opacity="0.15"
      />
      <path
        d="M7 17.5c.4.7 1 1.2 2 1.2 1.1 0 1.7-.5 1.7-1.4 0-1-.6-1.3-1.7-1.8L8.5 15c-1.5-.6-2.5-1.4-2.5-3.1C6 10.1 7.3 9 9.1 9c1.2 0 2.2.5 2.8 1.5l-1.5 1C10 10.9 9.6 10.5 9.1 10.5c-.6 0-1 .3-1 .9 0 .7.4 1 1.4 1.4l.5.2C11.7 13.7 13 14.5 13 16.3c0 2.1-1.6 3.2-3.8 3.2-2.1 0-3.4-1-4.1-2.4L7 17.5zM14 17.4c.5.9 1.2 1.5 2.4 1.5 1 0 1.7-.5 1.7-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3C14 15.1 13 14.2 13 12.6c0-1.7 1.3-3 3.3-3 1.4 0 2.4.5 3.1 1.8l-1.5 1c-.3-.6-.7-1.1-1.6-1.1-.7 0-1.1.4-1.1 1 0 .6.4.9 1.4 1.3l.6.3C18.8 14.5 20 15.4 20 17.2c0 2.2-1.7 3.3-3.9 3.3-2.2 0-3.6-1.1-4.2-2.5l1.9-.6z"
        fill="#F7DF1E"
      />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.2">
      <circle cx="12" cy="12" r="2.5" fill="#61DAFB" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
    </svg>
  ),
  PHP: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="7"
        width="20"
        height="10"
        rx="5"
        fill="#8892BF"
        opacity="0.2"
        stroke="#8892BF"
        strokeWidth="1.5"
      />
      <text
        x="5"
        y="15"
        fontSize="8"
        fill="#8892BF"
        fontWeight="bold"
        fontFamily="monospace"
      >
        PHP
      </text>
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#007396" strokeWidth="1.5">
      <path d="M9 18s-1 .3-1.6-.4c0 0 2-1.3 2-5.6 0 0 .5 5-2 7C8.3 19.6 11 19 11 19" />
      <path d="M10 15s4.5-1.5 4.5-6.5c0-3-2.5-5.5-2.5-5.5s.5 2-3 4C6.5 8.5 5.5 12 8 15" />
      <path d="M6.5 20.5S5 21 6 22c1 .6 4 .6 6 .5 3-.2 4-1.5 4-1.5s-1 .5-5 .5c-3.5 0-4.5-1-4.5-1z" />
    </svg>
  ),
  SQL: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#00618A" strokeWidth="1.5">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
    </svg>
  ),
  C: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#A8B9CC" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5a4.5 4.5 0 100 5" />
    </svg>
  ),
  "Git / GitHub": (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
        opacity="0.85"
      />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M8 3h8l2 2v4l-2 2H8L6 9V5l2-2z" fill="#F24E1E" opacity="0.7" />
      <path d="M6 11l2-2h4v4H8l-2-2z" fill="#FF7262" opacity="0.7" />
      <path d="M12 9h4l2 2-2 2h-4V9z" fill="#1ABCFE" opacity="0.7" />
      <circle cx="14" cy="15" r="3" fill="#0ACF83" opacity="0.7" />
      <path d="M6 15l2-2h4v4H8l-2-2z" fill="#A259FF" opacity="0.7" />
    </svg>
  ),
};

const LEVEL_CONFIG = {
  practiced: { label: "Utilisé en projet", color: "#22d3ee", width: "90%" },
  familiar: { label: "À l'aise", color: "#818cf8", width: "65%" },
  learning: { label: "En cours", color: "#fb923c", width: "35%" },
};

export default function Skills() {
  const { skills, categories } = PORTFOLIO;
  const [activeFilter, setActiveFilter] = useState("all");
  const [hovered, setHovered] = useState(null);

  const filteredSkills =
    activeFilter === "all"
      ? skills
      : skills.filter((s) => s.category === activeFilter);

  const filters = [
    { key: "all", label: "Tout" },
    { key: "front", label: categories.front },
    { key: "back", label: categories.back },
    { key: "tools", label: categories.tools },
  ];

  return (
    <section className="skills section" id="competences">
      <div className="container">
        <div className="section__header" data-animate="slide-up">
          <span className="section__tag">02. Compétences</span>
          <h2 className="section__title">Ce que j'utilise</h2>
        </div>

        <div
          className="skills__filters"
          data-animate="slide-up"
          data-delay="0.1"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              className={`skills__filter ${activeFilter === f.key ? "skills__filter--active" : ""}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="skills__grid" id="skills-grid">
          {filteredSkills.map((skill, i) => {
            const level = LEVEL_CONFIG[skill.level];
            const isHovered = hovered === skill.name;
            return (
              <div
                className="skill-card"
                key={skill.name}
                style={{ animationDelay: `${i * 0.05}s` }}
                onMouseEnter={() => setHovered(skill.name)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Icône */}
                <div
                  className="skill-card__icon"
                  style={{ color: level.color }}
                >
                  {TECH_ICONS[skill.name] || (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  )}
                </div>

                {/* Nom + badge niveau */}
                <div className="skill-card__header">
                  <h3 className="skill-card__name">{skill.name}</h3>
                  <span
                    className="skill-card__level-badge"
                    style={{
                      backgroundColor: `${level.color}20`,
                      color: level.color,
                      border: `1px solid ${level.color}40`,
                    }}
                  >
                    {level.label}
                  </span>
                </div>

                {/* Contexte */}
                <p className="skill-card__context">{skill.context}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

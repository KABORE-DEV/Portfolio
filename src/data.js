/**
 * ============================================
 *  CONFIGURATION DU PORTFOLIO
 *  Modifie ce fichier pour personnaliser ton site
 * ============================================
 */

export const PORTFOLIO = {
  personal: {
    firstName: "Frank",
    lastName: "KABORE",
    title: "Étudiant en Génie Logiciel",
    email: "kabore.dev@gmail.com",
    phone: "+226 52 76 62 73 / 06 41 84 57",
    location: "Burkina Faso · Bobo-Dioulasso",
    bio: `Étudiant en 3ème année de génie logiciel, je crée des applications web & mobile simples, claires et efficaces.`,
    initials: "FK",
    photo: "/frank.jpg",
  },

  social: {
    github: "https://github.com/KABORE-DEV",
    linkedin: "https://www.linkedin.com/in/frank-b-kabore-9117632b0/",
    whatsapp: "https://wa.me/22652766273",
  },

  skills: [
    {
      name: "HTML / CSS",
      level: "practiced",
      category: "front",
      context: "Utilisé dans tous mes projets web",
    },
    {
      name: "JavaScript",
      level: "practiced",
      category: "front",
      context: "Manipulation du DOM, logique applicative",
    },
    {
      name: "React",
      level: "learning",
      category: "framework",
      context: "En cours d'apprentissage",
    },
    {
      name: "PHP",
      level: "learning",
      category: "back",
      context: "Scripts, algorithmique, projets universitaires",
    },
    {
      name: "Laravel",
      level: "learning",
      category: "framework",
      context: "Intégration dans des projets web, en cours d'apprentissage",
    },
    {
      name: "Java",
      level: "practiced",
      category: "back",
      context: "POO, structures de données",
    },
    {
      name: "SQL",
      level: "practiced",
      category: "back",
      context: "Requêtes, modélisation de BDD",
    },
    {
      name: "PostgreSql",
      level: "learning",
      category: "back",
      context: "Requêtes, modélisation de BDD",
    },
    {
      name: "C",
      level: "familiar",
      category: "back",
      context: "Manipulation de fichiers, structures",
    },
    {
      name: "C++",
      level: "familiar",
      category: "back",
      context: "Manipulation de fichiers, structures",
    },
    {
      name: "Git / GitHub",
      level: "practiced",
      category: "tools",
      context: "Versioning de tous mes projets",
    },
    {
      name: "Stitch",
      level: "learning",
      category: "tools",
      context: "Maquettes et prototypage UI",
    },
  ],

  projects: [
    {
      title: "La Voix de Korsimoro",
      description:
        "Site web d'un média en ligne local — actualités, articles et rubriques culturelles.",
      longDescription:
        "Plateforme de média en ligne dédiée à la ville de Korsimoro (Burkina Faso). Mise en page moderne avec une architecture multi-rubriques : actualités, culture, société, avec page administrative pour la gestion des différentes rubriques.",
      features: [
        "Page d'accueil dynamique",
        "Multi-rubriques (culture, société, actu)",
        "Design responsive",
      ],
      technologies: ["Laravel"],
      github: "https://github.com/KABORE-DEV/Cleaning_Services",
      demo: "https://la-voix-de-korsimoro.vercel.app",
      featured: true,
      status: "En ligne",
      image: "/projects/korsimoro.png",
    },
    {
      title: "Faso Pagnes",
      description:
        "Application e-commerce pour un atelier de pagnes traditionnels burkinabè.",
      longDescription:
        "Plateforme e-commerce complète permettant de présenter et vendre des pagnes traditionnels. Interface moderne côté client et gestion des produits côté back-office. Projet full-stack Laravel + React.",
      features: [
        "Catalogue de produits",
        "Panier & commandes",
        "Back-office de gestion",
        "Interface responsive",
      ],
      technologies: ["Laravel", "React", "MySQL"],
      github: "https://github.com/KABORE-DEV/Faso_Pagnes",
      demo: null,
      featured: true,
      status: "En cours",
      image: "/projects/fasopagnes.png",
    },
    {
      title: "Gestion de Bibliothèque Web",
      description:
        "Application web de gestion de bibliothèque (projet académique).",
      longDescription:
        "Application web permettant de gérer les livres, les emprunts et les adhérents d'une bibliothèque, réalisée dans le cadre d'un projet académique.",
      features: [
        "Gestion des livres",
        "Suivi des emprunts",
        "Gestion des adhérents",
        "Recherche et filtres",
      ],
      technologies: ["HTML", "CSS", "JavaScript"],
      github:
        "https://github.com/KABORE-DEV/Gestion-Biblith-que-Web-Projet-Academique",
      demo: null,
      featured: true,
      status: "Terminé",
    },
    {
      title: "Gestion de Compte Java",
      description:
        "Application console de gestion de comptes (transferts, retraits, consultation).",
      longDescription:
        "Application Java développée pour simuler un portefeuille électronique en mode console. Fonctionnalités : création et gestion de comptes, transferts entre comptes, gestion d'un compte administrateur.",
      features: [
        "Création et suppression de comptes",
        "Transferts et retraits",
        "Compte administrateur",
        "Journalisation des opérations",
      ],
      technologies: ["Java"],
      github: "https://github.com/KABORE-DEV/Gestion-Compte-Java",
      demo: null,
      featured: false,
      status: "Terminé",
    },
    {
      title: "Base de Données en C",
      description:
        "Projet en C pour la gestion de données avec opérations CRUD.",
      longDescription:
        "Travail en langage C portant sur la manipulation de fichiers et la gestion d'une base de données simple (CRUD). Utilisation de structures, pointeurs et fichiers binaires.",
      features: [
        "Opérations CRUD",
        "Structures avancées en C",
        "Sauvegarde dans fichiers binaires",
      ],
      technologies: ["C"],
      github: "https://github.com/KABORE-DEV/Base-de-Donn-es-C-",
      demo: null,
      featured: false,
      status: "Terminé",
    },
    {
      title: "Morpion en Python",
      description:
        "Jeu de morpion (tic-tac-toe) jouable en console, développé en Python.",
      longDescription:
        "Implémentation du jeu de morpion en Python, jouable en mode console, avec gestion des tours de jeu et détection automatique du gagnant ou du match nul.",
      features: [
        "Plateau de jeu en console",
        "Détection de victoire / match nul",
        "Gestion des tours entre joueurs",
      ],
      technologies: ["Python"],
      github: "https://github.com/KABORE-DEV/Morpion-Python",
      demo: null,
      featured: false,
      status: "Terminé",
    },
    {
      title: "Projets en langage C",
      description:
        "Recueil de projets et exercices réalisés en cours de langage C.",
      longDescription:
        "Ensemble de programmes en C réalisés dans le cadre de travaux pratiques universitaires : algorithmique, structures de données et manipulation de fichiers.",
      features: [
        "Exercices d'algorithmique",
        "Structures de données en C",
        "Travaux pratiques académiques",
      ],
      technologies: ["C"],
      github: "https://github.com/KABORE-DEV/Langage-C_PROJETS",
      demo: null,
      featured: false,
      status: "Terminé",
    },
  ],

  education: [
    {
      degree: "Licence en Génie Logiciel",
      school: "Université Aube Nouvelle",
      period: "2026 — Présent",
      description:
        "Formation en développement logiciel, algorithmique, bases de données et gestion de projet.",
    },
    {
      degree: "Baccalauréat série D",
      school: "Collège Saint Joseph Moukassa de Koudougou",
      period: "2023",
      description: "Série scientifique D.",
    },
  ],

  experience: [
    {
      role: "Stage - Développeur Web",
      company: "Kuilinga Technologies",
      period: "Juin 2026 - Septembre 2026",
      description:
        "Développement d'applications web en utilisant Laravel et React.",
    },
  ],

  certifications: [
    {
      title: "Programmation avec JavaScript",
      issuer: "Coursera",
      date: "Mars 2025",
      url: "https://www.coursera.org/account/accomplishments/records/9N4ET3VYSEME",
    },
    {
      title: "Introduction to Front-End Web Development",
      issuer: "Coursera",
      date: "Avril 2025",
      url: "https://www.coursera.org/account/accomplishments/verify/2UY019ONR668",
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "Décembre 2024",
      url: "https://www.netacad.com/profile?tab=badges",
    },
    {
      title: "Introduction to Internet of Things",
      issuer: "Cisco Networking Academy",
      date: "Décembre 2024",
      url: "https://www.netacad.com/profile?tab=badges",
    },
  ],
};

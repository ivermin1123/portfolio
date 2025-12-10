export type Project = {
  slug: string;
  title: string;
  category: "AI" | "Web" | "Tools";
  summary: string;
  tech: string[];
  highlights: string[];
  links?: { demo?: string | null; repo?: string | null };
};

export const projects: Project[] = [
  {
    slug: "onboarding-checklist-accelerator",
    title: "onboardingChecklist",
    category: "Web",
    summary: "onboardingChecklist",
    tech: ["React.js", "Next.js", "TypeScript", "React Hook Form", "Jest"],
    highlights: ["onboardingChecklist"],
    links: {},
  },
  {
    slug: "ui-library-standardization",
    title: "uiLibrary",
    category: "Tools",
    summary: "uiLibrary",
    tech: ["React.js", "TypeScript", "Storybook", "shadcn/ui"],
    highlights: ["uiLibrary"],
    links: {},
  },
  {
    slug: "testing-pipeline-optimization",
    title: "testingPipeline",
    category: "Tools",
    summary: "testingPipeline",
    tech: ["Jest", "CI/CD", "Testing Frameworks"],
    highlights: ["testingPipeline"],
    links: {},
  },
  {
    slug: "healthcare-web-application",
    title: "healthcareApp",
    category: "Web",
    summary: "healthcareApp",
    tech: ["React.js", "TypeScript", "Redux", "Google OAuth", "Jest"],
    highlights: ["healthcareApp"],
    links: {},
  },
  {
    slug: "car-insurance-management",
    title: "carInsurance",
    category: "Web",
    summary: "carInsurance",
    tech: ["Angular 12", "Node.js", "NestJS", "RxJS", "Firebase"],
    highlights: ["carInsurance"],
    links: {},
  },
  {
    slug: "solar-energy-sale-system",
    title: "solarEnergy",
    category: "Web",
    summary: "solarEnergy",
    tech: [
      "React.js",
      "Next.js",
      "NestJS",
      "MongoDB",
      "SCSS",
      "Redux",
      "AWS",
      "TypeScript",
      "RxJS",
    ],
    highlights: ["solarEnergy"],
    links: {},
  },
  {
    slug: "construction-management-system",
    title: "constructionManagement",
    category: "Web",
    summary: "constructionManagement",
    tech: ["Node.js", "MongoDB", "Amazon Web Services", "JavaScript", "HTML", "CSS", "jQuery"],
    highlights: ["constructionManagement"],
    links: {},
  },
];

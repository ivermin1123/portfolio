import { Section, Timeline } from "@/components";

export default function ExperiencePage() {
  return (
    <Section title="Career Timeline" subtitle="Key milestones with impact and recognition.">
      <Timeline
        items={[
          {
            company: "Employment Hero",
            role: "Software Engineer",
            start: "Jun 2022",
            bullets: [
              "Led frontend architecture and technical planning for a 4-developer squad, providing mentorship via comprehensive code reviews and technical training",
              "Engineered and implemented a digital onboarding checklist in partnership with product and design, reducing new organization setup time by 50%",
              "Enhanced code quality by implementing rigorous coding standards and upgrading testing frameworks, decreasing test execution times from 4-5 minutes",
              "Championed the 'Snowflakes' initiative to standardize internal UI library components, resolving 50+ inconsistencies across team modules",
            ],
            tech: [
              "React.js",
              "Next.js",
              "TypeScript",
              "Redux",
              "React Native",
              "Jest",
              "React Hook Form",
              "React Query",
            ],
          },
          {
            company: "FPT Software",
            role: "Software Developer",
            start: "Nov 2021",
            end: "Jun 2022",
            bullets: [
              "Analyzed complex business requirements and user stories to define precise acceptance criteria",
              "Maintained direct stakeholder communication for effective requirement clarification and feedback integration",
              "Mentored and led a 4-member development team, overseeing unit test creation and successful A/B test implementations",
            ],
            tech: ["React.js", "TypeScript", "Redux", "Google OAuth", "Jest"],
          },
          {
            company: "Favie Tech",
            role: "Software Developer",
            start: "Mar 2021",
            end: "Nov 2021",
            bullets: [
              "Collaborated with testers to debug and resolve issues",
              "Evaluated and recommended optimal technical libraries, ensuring adherence to project budget and performance requirements",
              "Managed team activities and facilitated daily stand-up meetings",
            ],
            tech: ["Angular 12", "Node.js", "NestJS", "RxJS", "Firebase"],
          },
          {
            company: "Designveloper",
            role: "Software Developer",
            start: "Dec 2020",
            end: "Mar 2021",
            bullets: [
              "Developed data structures and integrated React applications with server APIs",
              "Automated deployment processes using AWS services",
              "Finalized project requirements and solutions with customers",
            ],
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
          },
          {
            company: "Trixgo",
            role: "Software Developer",
            start: "Sep 2020",
            end: "Dec 2020",
            bullets: [
              "Designed database schemas and implemented functional components",
              "Developed and enhanced UI, including a chat system, improving user satisfaction by 20%",
              "Created systems for user feedback and website improvement",
            ],
            tech: [
              "Node.js",
              "MongoDB",
              "Amazon Web Services",
              "JavaScript",
              "HTML",
              "CSS",
              "jQuery",
            ],
          },
        ]}
      />
    </Section>
  );
}

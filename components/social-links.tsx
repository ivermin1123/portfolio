import { Github, Linkedin } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-3">
      <a
        className="rounded-md p-2 hover:bg-accent/10 dark:hover:bg-accent/10 hover:bg-gray-100 text-gray-700 dark:text-white"
        href="https://github.com/ivermin1123"
        target="_blank"
        rel="noreferrer"
      >
        <Github className="h-5 w-5" />
      </a>
      <a
        className="rounded-md p-2 hover:bg-accent/10 dark:hover:bg-accent/10 hover:bg-gray-100 text-gray-700 dark:text-white"
        href="https://linkedin.com/in/ivermin1123"
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin className="h-5 w-5" />
      </a>
    </div>
  );
}

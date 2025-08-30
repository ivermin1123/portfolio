
"use client";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold gradient-text">Hoang Le</Link>
        <nav className="flex items-center gap-2">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm hover:bg-accent/10",
                pathname === n.href && "bg-accent/10"
              )}
            >
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

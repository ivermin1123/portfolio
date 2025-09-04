"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="border-t py-10 text-center text-sm text-muted-foreground dark:border-white/10 dark:text-muted-foreground border-gray-200 text-gray-600">
      <div className="container">
        © {year} Hoang Le — Built with Next.js, shadcn/ui & Framer Motion
      </div>
    </footer>
  );
}

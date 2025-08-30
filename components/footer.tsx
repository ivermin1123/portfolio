
export default function Footer() {
  return (
    <footer className="border-t py-10 text-center text-sm text-muted-foreground">
      <div className="container">© {new Date().getFullYear()} Hoang Le — Built with Next.js, shadcn/ui & Framer Motion</div>
    </footer>
  );
}

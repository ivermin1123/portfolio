
import Section from "@/components/section";
import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return (
    <Section title="Let’s build something great" subtitle="Drop a message — I’ll get back soon.">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border p-6 glass">
          <ContactForm />
        </div>
        <div className="rounded-2xl border p-6">
          <h3 className="mb-2 font-semibold">Prefer email?</h3>
          <p className="text-sm text-muted-foreground">ivermin1123@gmail.com</p>
          <h3 className="mb-2 mt-6 font-semibold">Find me online</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>GitHub: github.com/ivermin1123</li>
            <li>LinkedIn: linkedin.com/in/ivermin1123</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

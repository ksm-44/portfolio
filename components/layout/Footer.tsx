import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

const links = [
  { label: "Features", href: "/features" },
  { label: "Email", href: `mailto:${siteConfig.author.email}` },
  { label: "LinkedIn", href: siteConfig.author.linkedin },
  { label: "GitHub", href: siteConfig.author.github },
];

export function Footer() {
  return (
    <footer className="mt-28 border-t border-line py-10">
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <ul className="flex items-center gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-ink-muted underline decoration-transparent underline-offset-[3px] transition-colors hover:text-ink hover:decoration-ink/30"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BacklogWhack } from "@/components/game/BacklogWhack";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-mono text-xs text-ink-muted">404 — page deprioritized</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        This page didn&apos;t make the sprint.
      </h1>
      <p className="mt-3 max-w-md text-ink-muted">
        While you&apos;re here: the backlog is under attack. Smash the scope creep
        before the timer runs out.
      </p>
      <div className="mt-8 flex w-full justify-center">
        <BacklogWhack />
      </div>
      <ButtonLink href="/" variant="ghost" className="mt-8">
        Escape to the roadmap
      </ButtonLink>
    </Container>
  );
}

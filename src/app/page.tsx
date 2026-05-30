import { AppShell } from "@/components/AppShell";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";

export default function Home() {
  return (
    <AppShell showNav={false}>
      <div className="flex flex-1 items-center">
        <div className="w-full space-y-8 py-8 sm:py-12">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Reflective Patterns
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-6xl">
              AI-assisted emotional reflection for behavioural insight
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Structure a difficult moment into patterns, possible triggers, useful questions, and
              one small next step.
            </p>
          </div>

          <Card className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-3">
              {["Notice the pattern", "Name the trigger", "Choose a next step"].map((item) => (
                <div className="rounded-[1.25rem] bg-secondary/65 px-4 py-3" key={item}>
                  <p className="text-sm font-semibold text-ink">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-6 text-muted">
              This tool is for structured reflection only. It does not provide therapy, diagnosis,
              or medical advice.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink className="w-full sm:w-auto" href="/reflect">
                Start Reflection
              </ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href="/history" variant="secondary">
                View History
              </ButtonLink>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

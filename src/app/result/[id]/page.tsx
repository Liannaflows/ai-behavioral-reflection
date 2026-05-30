"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { ResultCards } from "@/components/ResultCards";
import { getReflectionSummary } from "@/lib/reflectionContent";
import { getReflectionEntry } from "@/lib/storage";
import type { ReflectionEntry } from "@/types/reflection";

export default function ResultPage() {
  const params = useParams<{ id: string }>();
  const [entry, setEntry] = useState<ReflectionEntry | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setEntry(getReflectionEntry(params.id) ?? null);
    setIsLoaded(true);
  }, [params.id]);

  if (!isLoaded) {
    return (
      <AppShell>
        <p className="py-8 text-muted">Loading reflection...</p>
      </AppShell>
    );
  }

  if (!entry) {
    return (
      <AppShell>
        <Card className="space-y-4">
          <h1 className="text-2xl font-semibold text-ink">Reflection not found</h1>
          <p className="text-muted">This entry may have been removed from this browser.</p>
          <ButtonLink href="/reflect">Start a New Reflection</ButtonLink>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6 pb-8">
        <header className="space-y-3">
          <Link className="text-sm font-semibold text-muted hover:text-ink" href="/history">
            Back to history
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Reflection result
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              {entry.input.primaryEmotion || "Your reflection"}
            </h1>
          </div>
          <p className="text-sm text-muted">
            {new Intl.DateTimeFormat("en", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(entry.createdAt))}
          </p>
        </header>

        <Card className="space-y-3 bg-white/82">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Summary</p>
          <p className="text-lg leading-8 text-ink">{getReflectionSummary(entry.result)}</p>
        </Card>

        <ResultCards result={entry.result} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink className="w-full sm:w-auto" href="/reflect">
            Start Another Reflection
          </ButtonLink>
          <ButtonLink className="w-full sm:w-auto" href="/history" variant="secondary">
            View History
          </ButtonLink>
        </div>
      </div>
    </AppShell>
  );
}

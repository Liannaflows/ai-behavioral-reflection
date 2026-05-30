"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { getReflectionSummary } from "@/lib/reflectionContent";
import { getReflectionHistory } from "@/lib/storage";
import type { ReflectionEntry } from "@/types/reflection";

export default function HistoryPage() {
  const [history, setHistory] = useState<ReflectionEntry[]>([]);

  useEffect(() => {
    setHistory(getReflectionHistory());
  }, []);

  return (
    <AppShell>
      <div className="space-y-6 pb-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Reflection history
            </p>
            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Past entries</h1>
            <p className="max-w-xl text-base leading-7 text-muted">
              Previous reflections are saved only in this browser.
            </p>
          </div>
          <ButtonLink className="w-full sm:w-auto" href="/reflect">
            New Reflection
          </ButtonLink>
        </header>

        {history.length === 0 ? (
          <Card className="space-y-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-semibold text-primary">
              0
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-ink">No saved reflections yet</h2>
              <p className="max-w-xl leading-7 text-muted">
                Start with one recent moment. Your reflections will appear here with the date,
                primary emotion, and pattern.
              </p>
            </div>
            <ButtonLink className="w-full sm:w-auto" href="/reflect">
              Start Reflection
            </ButtonLink>
          </Card>
        ) : (
          <div className="space-y-3">
            {history.map((entry) => (
              <Link
                className="block rounded-[1.5rem] border border-white/80 bg-surface p-4 shadow-soft backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/88 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href={`/result/${entry.id}`}
                key={entry.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <p className="text-sm font-semibold text-ink">
                      {entry.input.primaryEmotion || "Untitled reflection"}
                    </p>
                    <p className="text-[15px] leading-6 text-muted">{entry.result.emotionPattern}</p>
                    <p className="line-clamp-2 text-sm leading-6 text-muted/85">
                      {getReflectionSummary(entry.result)}
                    </p>
                  </div>
                  <time className="shrink-0 rounded-full bg-secondary px-3 py-1 text-right text-xs font-semibold text-primary">
                    {new Intl.DateTimeFormat("en", {
                      month: "short",
                      day: "numeric",
                    }).format(new Date(entry.createdAt))}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

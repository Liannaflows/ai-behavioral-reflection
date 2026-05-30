"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Field } from "@/components/Field";
import { reflectionInputFields } from "@/lib/reflectionContent";
import { saveReflectionEntry } from "@/lib/storage";
import type { ReflectionInput, ReflectionResult } from "@/types/reflection";

type ReflectionApiError = {
  error?: string;
  statusCode?: number;
  errorType?: string;
  devMessage?: string;
};

const resultFields: (keyof ReflectionResult)[] = [
  "emotionPattern",
  "trigger",
  "thoughtPattern",
  "behaviouralInsight",
  "reflectionQuestion",
  "smallNextStep",
];

const initialInput: ReflectionInput = {
  primaryEmotion: "",
  happened: "",
  involved: "",
  facts: "",
  automaticThought: "",
  bodyResponse: "",
  understand: "",
};

function buildErrorMessage(data: ReflectionApiError, fallback: string) {
  const safeMessage = data.error ?? fallback;

  if (process.env.NODE_ENV === "production") {
    return safeMessage;
  }

  const details = [
    data.statusCode ? `status ${data.statusCode}` : null,
    data.errorType ? `type: ${data.errorType}` : null,
    data.devMessage ? `detail: ${data.devMessage}` : null,
  ].filter(Boolean);

  return details.length > 0 ? `${safeMessage} (${details.join("; ")})` : safeMessage;
}

function isReflectionResult(data: unknown): data is ReflectionResult {
  if (!data || typeof data !== "object") return false;

  return resultFields.every((field) => typeof (data as Record<string, unknown>)[field] === "string");
}

export default function ReflectPage() {
  const [input, setInput] = useState<ReflectionInput>(initialInput);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  function updateField(field: keyof ReflectionInput, value: string) {
    setInput((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reflect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = (await response.json()) as ReflectionResult | ReflectionApiError;

      if (!response.ok || "error" in data) {
        const apiError = data as ReflectionApiError;
        throw new Error(
          buildErrorMessage(apiError, "Reflection generation failed. Please try again."),
        );
      }

      if (!isReflectionResult(data)) {
        throw new Error(
          buildErrorMessage(
            {
              error: "Reflection generation returned an unexpected response.",
              errorType: "client_parse_error",
              statusCode: response.status,
              devMessage: "Response JSON did not include the expected reflection fields.",
            },
            "Reflection generation failed. Please try again.",
          ),
        );
      }

      const entry = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        input,
        result: data,
      };

      saveReflectionEntry(entry);
      router.push(`/result/${entry.id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Reflection generation failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppShell>
      <div className="space-y-6 pb-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            New reflection
          </p>
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Describe the moment</h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            Move through the prompts at your own pace. Short, specific notes work well.
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Card className="space-y-5">
            <div className="flex items-center justify-between gap-4 rounded-[1.25rem] bg-secondary/65 px-4 py-3">
              <p className="text-sm font-semibold text-ink">Guided reflection</p>
              <p className="text-xs font-medium text-muted">7 prompts</p>
            </div>
            <div className="space-y-5">
              {reflectionInputFields.map((field, index) => (
                <div className="rounded-[1.35rem] bg-white/42 p-4" key={field.id}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    Step {index + 1}
                  </p>
                  <Field
                    helper={field.prompt}
                    id={field.id}
                    label={field.label}
                    onChange={(event) => updateField(field.id, event.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={field.rows ?? 4}
                    value={input[field.id]}
                  />
                </div>
              ))}
            </div>
          </Card>
          {error ? (
            <div className="rounded-[1.25rem] border border-primary/20 bg-white/80 px-4 py-3 text-sm leading-6 text-muted">
              {error}
            </div>
          ) : null}
          {isSubmitting ? (
            <div className="rounded-[1.5rem] border border-white/80 bg-surface px-5 py-4 shadow-soft backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 animate-pulse rounded-full bg-primary" />
                <p className="text-sm font-medium text-muted">
                  Organizing your notes into a reflection...
                </p>
              </div>
            </div>
          ) : null}
          <Button className="w-full sm:w-auto" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Generating reflection" : "Generate Reflection"}
          </Button>
        </form>
      </div>
    </AppShell>
  );
}

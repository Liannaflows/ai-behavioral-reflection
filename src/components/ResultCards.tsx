"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { resultModules } from "@/lib/reflectionContent";
import type { ReflectionResult } from "@/types/reflection";

export function ResultCards({ result }: { result: ReflectionResult }) {
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {resultModules.map((module, index) => {
        const isOpen = openCard === module.key;

        return (
          <button
            aria-expanded={isOpen}
            className="group text-left"
            key={module.key}
            onClick={() => setOpenCard(isOpen ? null : module.key)}
            type="button"
          >
            <Card className="min-h-[10rem] p-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/88 sm:p-5">
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-muted">
                      {module.label}
                    </h2>
                  </div>
                  <span className="text-xl leading-none text-primary">{isOpen ? "-" : "+"}</span>
                </div>
                <div className="grid transition-[grid-template-rows] duration-300 ease-out [grid-template-rows:1fr]">
                  <div className="overflow-hidden">
                    <p className="text-[15px] leading-6 text-ink/88">
                      {isOpen ? result[module.key] : module.preview(result)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}

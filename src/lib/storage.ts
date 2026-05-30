"use client";

import type { ReflectionEntry } from "@/types/reflection";

const STORAGE_KEY = "reflective-patterns-history";

export function getReflectionHistory(): ReflectionEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as ReflectionEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveReflectionEntry(entry: ReflectionEntry): void {
  const history = getReflectionHistory();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...history]));
}

export function getReflectionEntry(id: string): ReflectionEntry | undefined {
  return getReflectionHistory().find((entry) => entry.id === id);
}

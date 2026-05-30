import { getPatternContent } from "@/lib/reflectionContent";
import type { PatternType, ReflectionInput, ReflectionResult } from "@/types/reflection";

const patternRoutes: { pattern: PatternType; keywords: string[] }[] = [
  {
    pattern: "Relationship responsiveness sensitivity",
    keywords: ["message", "reply", "ignored"],
  },
  {
    pattern: "Unmet support expectation",
    keywords: ["help", "busy", "work", "support"],
  },
  {
    pattern: "Comparison-driven insecurity",
    keywords: ["instagram", "ex", "jealous", "comparison"],
  },
];

export function routeReflectionPattern(input: ReflectionInput): PatternType {
  const haystack = Object.values(input).join(" ").toLowerCase();
  const match = patternRoutes.find((route) =>
    route.keywords.some((keyword) => haystack.includes(keyword)),
  );

  return match?.pattern ?? "Relationship responsiveness sensitivity";
}

export function generateLocalReflection(input: ReflectionInput): ReflectionResult {
  const pattern = routeReflectionPattern(input);
  return getPatternContent(pattern).build(input);
}

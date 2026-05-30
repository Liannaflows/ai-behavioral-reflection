export type PatternType =
  | "Relationship responsiveness sensitivity"
  | "Unmet support expectation"
  | "Comparison-driven insecurity";

export type ReflectionInput = {
  primaryEmotion: string;
  happened: string;
  involved: string;
  facts: string;
  automaticThought: string;
  bodyResponse: string;
  understand: string;
};

export type ReflectionResult = {
  summary?: string;
  emotionPattern: string;
  trigger: string;
  thoughtPattern: string;
  behaviouralInsight: string;
  reflectionQuestion: string;
  smallNextStep: string;
};

export type ReflectionEntry = {
  id: string;
  createdAt: string;
  input: ReflectionInput;
  result: ReflectionResult;
};

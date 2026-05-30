import type { PatternType, ReflectionInput, ReflectionResult } from "@/types/reflection";

export type ReflectionPatternContent = {
  pattern: PatternType;
  build: (input: ReflectionInput) => ReflectionResult;
};

export type ResultModule = {
  key: Exclude<keyof ReflectionResult, "summary">;
  label: string;
  preview: (result: ReflectionResult) => string;
};

export const reflectionInputFields: {
  id: keyof ReflectionInput;
  label: string;
  prompt: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
}[] = [
  {
    id: "primaryEmotion",
    label: "Primary emotion",
    prompt: "Name the main feeling in one or two words.",
    placeholder: "Anxious, disappointed, jealous...",
    rows: 2,
    required: true,
  },
  {
    id: "happened",
    label: "What happened?",
    prompt: "Describe the moment without needing to make it perfect.",
    placeholder: "A message was not answered, a plan changed, I saw something online...",
    required: true,
  },
  {
    id: "involved",
    label: "Who was involved?",
    prompt: "Include only what matters for understanding the situation.",
    placeholder: "A friend, partner, colleague, family member...",
    rows: 2,
  },
  {
    id: "facts",
    label: "What were the facts?",
    prompt: "Separate observable details from assumptions.",
    placeholder: "What could a neutral person have seen or heard?",
  },
  {
    id: "automaticThought",
    label: "First automatic thought",
    prompt: "Capture the first sentence your mind offered.",
    placeholder: "They do not care. I am behind. I have to handle this alone.",
  },
  {
    id: "bodyResponse",
    label: "Body or behaviour response",
    prompt: "Notice what changed in your body or what you felt pulled to do.",
    placeholder: "Tense shoulders, checking my phone, withdrawing, over-explaining...",
  },
  {
    id: "understand",
    label: "What do you want to understand?",
    prompt: "Choose the question you want this reflection to organize.",
    placeholder: "Why did this feel so strong? What need was underneath?",
  },
];

const fallback = (value: string, fallbackText: string) => value.trim() || fallbackText;

export const reflectionPatterns: ReflectionPatternContent[] = [
  {
    pattern: "Relationship responsiveness sensitivity",
    build: (input) => ({
      summary:
        "This reflection points to a moment where responsiveness may have felt tied to closeness, priority, or reassurance.",
      emotionPattern: "Relationship responsiveness sensitivity",
      trigger: `A response from ${fallback(input.involved, "someone important")} may have felt slower, colder, or less clear than you needed.`,
      thoughtPattern: `The first thought, "${fallback(input.automaticThought, "I might not matter here")}", points to a concern about closeness, priority, or reassurance.`,
      behaviouralInsight:
        "Your attention may move quickly toward signs of distance when a relationship feels uncertain. That can make neutral delays feel more personal than they are.",
      reflectionQuestion:
        "What evidence suggests this person was unavailable, and what evidence suggests they were rejecting you?",
      smallNextStep:
        "Before acting, write one calm sentence that names your need without accusing the other person.",
    }),
  },
  {
    pattern: "Unmet support expectation",
    build: (input) => ({
      summary:
        "This reflection points to a gap between the support you hoped for and the support that seemed available.",
      emotionPattern: "Unmet support expectation",
      trigger: `You may have expected practical or emotional support around "${fallback(input.happened, "the situation")}", and it did not arrive in the way you hoped.`,
      thoughtPattern: `The thought "${fallback(input.automaticThought, "I have to handle this by myself")}" suggests a gap between what you needed and what felt available.`,
      behaviouralInsight:
        "When support feels missing, your body and behaviour may shift into self-protection: withdrawing, pushing harder, or testing whether others notice.",
      reflectionQuestion:
        "What support did you want, and had that need been clearly shared before the moment became tense?",
      smallNextStep:
        "Choose one specific request you can make that is small, observable, and easy for someone to respond to.",
    }),
  },
  {
    pattern: "Comparison-driven insecurity",
    build: (input) => ({
      summary:
        "This reflection points to a comparison moment where another person's situation may have become a measure of your own progress.",
      emotionPattern: "Comparison-driven insecurity",
      trigger: `Something about "${fallback(input.happened, "the event")}" may have invited comparison or made your own progress feel smaller.`,
      thoughtPattern: `The automatic thought "${fallback(input.automaticThought, "I am not doing enough")}" frames another person's situation as a measure of your worth.`,
      behaviouralInsight:
        "Comparison can narrow attention until you mostly see gaps. That may hide your actual values, effort, and timing.",
      reflectionQuestion:
        "What standard are you using to judge yourself, and did you choose that standard deliberately?",
      smallNextStep:
        "Name one value-led action you can take today that is independent of anyone else's progress.",
    }),
  },
];

export const resultModules: ResultModule[] = [
  {
    key: "emotionPattern",
    label: "Emotion Pattern",
    preview: (result) => result.emotionPattern,
  },
  {
    key: "trigger",
    label: "Trigger",
    preview: () => "The moment that likely activated the pattern.",
  },
  {
    key: "thoughtPattern",
    label: "Thought Pattern",
    preview: () => "The first meaning your mind may have attached.",
  },
  {
    key: "behaviouralInsight",
    label: "Behavioural Insight",
    preview: () => "What your response may be trying to protect.",
  },
  {
    key: "reflectionQuestion",
    label: "Reflection Question",
    preview: () => "A question to slow the loop and add clarity.",
  },
  {
    key: "smallNextStep",
    label: "Small Next Step",
    preview: () => "One simple action to take from insight to choice.",
  },
];

export function getPatternContent(pattern: PatternType) {
  return reflectionPatterns.find((item) => item.pattern === pattern) ?? reflectionPatterns[0];
}

export function getReflectionSummary(result: ReflectionResult) {
  return (
    result.summary ??
    `This reflection points to ${result.emotionPattern.toLowerCase()} and offers one clear next step.`
  );
}

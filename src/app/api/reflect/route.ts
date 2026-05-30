import { NextResponse } from "next/server";
import { generateLocalReflection } from "@/lib/patternRouter";
import type { ReflectionInput } from "@/types/reflection";

const requiredInputFields: (keyof ReflectionInput)[] = [
  "primaryEmotion",
  "happened",
  "involved",
  "facts",
  "automaticThought",
  "bodyResponse",
  "understand",
];

function isReflectionInput(value: unknown): value is ReflectionInput {
  if (!value || typeof value !== "object") return false;

  return requiredInputFields.every((field) => typeof (value as ReflectionInput)[field] === "string");
}

function errorResponse(message: string, status: number, errorType: string) {
  return NextResponse.json(
    {
      error: message,
      statusCode: status,
      errorType,
    },
    { status },
  );
}

export async function POST(request: Request) {
  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return errorResponse("The reflection request could not be read.", 400, "invalid_request");
  }

  if (!isReflectionInput(input)) {
    return errorResponse("Reflection input is incomplete.", 400, "invalid_request");
  }

  return NextResponse.json(generateLocalReflection(input));
}

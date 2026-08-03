export type ClassValue = string | number | false | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  let result = "";
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      result += (result ? " " : "") + input;
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) result += (result ? " " : "") + nested;
    }
  }
  return result;
}

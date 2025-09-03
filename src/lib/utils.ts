import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Normalizes user-entered URLs by adding a default scheme when missing
// Accepts inputs like "www.example.com" or "example.com/path" and returns a full https URL
export function normalizeUrl(raw: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();

  // If already has a scheme, return as-is
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // If starts with www. or looks like a domain, prefix https://
  if (/^www\./i.test(trimmed) || /^[a-z0-9.-]+\.[a-z]{2,}(?:[:/].*)?$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  // Fallback: try to construct with https://, else return original
  try {
    const candidate = `https://${trimmed}`;
    // Validate using URL; will throw if invalid
    // eslint-disable-next-line no-new
    new URL(candidate);
    return candidate;
  } catch {
    return trimmed;
  }
}
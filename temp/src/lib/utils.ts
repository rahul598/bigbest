// Importing clsx for conditional class names
import { clsx, type ClassValue } from "clsx";
// Importing twMerge to handle Tailwind CSS class merging
import { twMerge } from "tailwind-merge";

/**
 * `cn` is a utility function to conditionally merge class names.
 * It combines class names using `clsx` and resolves conflicts using `twMerge`.
 *
 * @param inputs - An array of class values that may include strings, arrays, or objects
 * @returns A single string of merged and resolved class names
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

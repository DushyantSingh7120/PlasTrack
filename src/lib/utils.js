import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines classes conditionally using clsx, and resolves Tailwind conflicts using tailwind-merge.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

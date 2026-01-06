import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}


export const getCurrentHostId = (): string | null => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token"); // or get from cookies
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
    return payload.hostId || null;
  } catch {
    return null;
  }
};
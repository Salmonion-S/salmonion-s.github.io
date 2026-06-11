import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility to merge tailwind classes securely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Calculate dynamic age based on birthday */
export const myBirthday = new Date('2008-05-30T00:00:00Z');

export function calculateAge(birthday: Date): number {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

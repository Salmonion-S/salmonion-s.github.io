/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Calculates dynamic age based on May 30, 2008 birthday.
 * Handled according to actual day, month, and year calculations dynamically.
 */
export function calculateAge(): number {
  const birthDate = new Date(2008, 4, 30); // Months are 0-indexed in JavaScript Date (4 is May)
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  // If we haven't reached the birth month, or we are in the birth month but haven't reached the birth day yet:
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  id: string;
  name: string;
  iconName: string; // Lucide icon identifier
  description: string;
  category: "network" | "security" | "hardware" | "management";
}

export interface ContactLink {
  name: string;
  url: string;
  iconName: string;
  color: string;
  label: string;
}

export type ViewRoute = "home" | "contact" | "404";

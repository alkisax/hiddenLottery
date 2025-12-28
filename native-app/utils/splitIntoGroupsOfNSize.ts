// native-app\utils\splitIntoGroupsOfNSize.ts
import type { NameDraft } from "../types/types";

export interface NSizeGroupsResult {
  groups: NameDraft[][];
}

/**
 * Shuffle + chunk σε ομάδες fixed size.
 * Αν περισσέψουν άτομα, μπαίνουν σε τελευταία μικρότερη ομάδα.
 */
export const splitIntoGroupsOfNSize = (
  list: NameDraft[],
  groupSize: number
): NSizeGroupsResult => {
  if (groupSize < 1) return { groups: [] };

  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const groups: NameDraft[][] = [];
  for (let i = 0; i < shuffled.length; i += groupSize) {
    groups.push(shuffled.slice(i, i + groupSize));
  }

  return { groups };
};

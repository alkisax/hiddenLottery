// native-app\utils\splitIntoNGroups.ts
import type { NameDraft } from "../types/types";


export interface NGroupsResult {
  groups: NameDraft[][];
}

/**
 * Shuffle + distribute round-robin σε N ομάδες, όσο πιο ισορροπημένα γίνεται.
 */
export const splitIntoNGroups = (
  list: NameDraft[],
  groupsCount: number
): NGroupsResult => {
  if (groupsCount < 1) return { groups: [] };

  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const groups: NameDraft[][] = Array.from({ length: groupsCount }, () => []);

  shuffled.forEach((p, idx) => {
    groups[idx % groupsCount].push(p);
  });

  return { groups };
};

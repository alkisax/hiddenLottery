import type { NameDraft } from "../types/types";

export interface TwoGroupsResult {
  groupA: NameDraft[];
  groupB: NameDraft[];
}

export const splitIntoTwoGroups = (
  list: NameDraft[]
): TwoGroupsResult => {
  const shuffled = [...list];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const mid = Math.ceil(shuffled.length / 2);

  return {
    groupA: shuffled.slice(0, mid),
    groupB: shuffled.slice(mid),
  };
};
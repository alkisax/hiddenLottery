// frontend/src/utils/splitIntoGroupsOfNSize.ts
import type { NameDraft } from "../types/types";

export interface GroupsOfNResult {
  groups: NameDraft[][];
}

/*
  Fisher–Yates shuffle
  (ίδιο μοτίβο με τα άλλα utils)
*/
const shuffleParticipants = (
  list: NameDraft[]
): NameDraft[] => {
  const shuffled = [...list];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
};

/*
  Split into groups of fixed size (N)
  Παραδείγματα:
  size = 2 (couples)
    5 άτομα → [2, 2, 1]
  size = 3
    8 άτομα → [3, 3, 2]
  Κανόνες:
  - size >= 2
  - ένα shuffle
  - διαδοχικό κόψιμο (chunking)
*/
export const splitIntoGroupsOfNSize = (
  list: NameDraft[],
  size: number
): GroupsOfNResult => {
  if (size < 2) {
    throw new Error("Group size must be at least 2");
  }

  if (list.length < size) {
    throw new Error("Participants must be >= group size");
  }

  const shuffled = shuffleParticipants(list);

  const groups: NameDraft[][] = [];

  for (let i = 0; i < shuffled.length; i += size) {
    groups.push(shuffled.slice(i, i + size));
  }

  return { groups };
};

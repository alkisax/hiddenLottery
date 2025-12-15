import type { NameDraft } from "../types/types";

export interface NGroupsResult {
  groups: NameDraft[][];
}

/*
  Fisher–Yates shuffle
  (ίδιος αλγόριθμος με τα άλλα utils)
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
  Split into N groups

  Παράδειγμα:
    participants = 7
    n = 3

    Μετά το shuffle:
    [A, B, C, D, E, F, G]

    Κυκλική κατανομή:
    group 0 → A, D, G
    group 1 → B, E
    group 2 → C, F

  Έτσι:
  - καμία ομάδα δεν διαφέρει πάνω από 1 άτομο
  - αποφεύγουμε περίπλοκα slicing
*/
export const splitIntoNGroups = (
  list: NameDraft[],
  n: number
): NGroupsResult => {
  if (n < 2) {
    throw new Error("Number of groups must be at least 2");
  }

  if (list.length < n) {
    throw new Error("Participants must be >= number of groups");
  }

  const shuffled = shuffleParticipants(list);

  // δημιουργούμε n άδειες ομάδες
  const groups: NameDraft[][] = Array.from(
    { length: n },
    () => []
  );

  // κυκλική κατανομή
  shuffled.forEach((participant, index) => {
    const groupIndex = index % n;
    groups[groupIndex].push(participant);
  });

  return { groups };
};
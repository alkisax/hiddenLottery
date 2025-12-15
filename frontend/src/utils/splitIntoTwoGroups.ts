// frontend/src/utils/splitIntoTwoGroups.ts
import type {NameDraft } from "../types/types";

export interface TwoGroupsResult {
  groupA: NameDraft[];
  groupB: NameDraft[];
}

/*
  Fisher–Yates shuffle (ίδιος αλγόριθμος με secretSantaShuffle
  αλλά εδώ ΔΕΝ έχουμε constraint τύπου "όχι με τον εαυτό του")

  Στόχος:
  - τυχαία αναδιάταξη
  - μετά κόψιμο στη μέση
*/
export const splitIntoTwoGroups = (
  list: NameDraft[]
): TwoGroupsResult => {
  // δημιουργούμε αντίγραφο για να μη μεταβάλουμε την αρχική λίστα
  const shuffled = [...list];

  // Fisher–Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  // κόβουμε όσο πιο ισορροπημένα γίνεται
  // αν είναι μονός αριθμός → η πρώτη ομάδα παίρνει +1
  const mid = Math.ceil(shuffled.length / 2);

  return {
    groupA: shuffled.slice(0, mid),
    groupB: shuffled.slice(mid),
  };
};

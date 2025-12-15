// backend\src\santa\secretSantaShuffle.util.ts
// αυτή τη στιγμή το αρχείο υπάρχει ακριβώς ίδιο στο frontend
// in: μια λιστα με ονοματα και mail, out: μια ίδια λίστα με τα ονοματα ανακατεμένα
import type { ParticipantDraft, SantaResult } from "../types/types";

/*
  Fisher–Yates shuffle:
  Σε κάθε βήμα διαλέγουμε τυχαία ένα στοιχείο από όσα δεν έχουν «κλειδώσει» ακόμα
  και το ανταλλάσσουμε με τη θέση που κλειδώνει τώρα, ώστε όλες οι αναδιατάξεις
  να είναι ισοπίθανες.

  Παράδειγμα με 4 στοιχεία
    Αρχικά:
    [A, B, C, D]
    i = 3 → j ∈ [0..3]
    swap → π.χ. [A, D, C, B] → B κλειδώνει
    i = 2 → j ∈ [0..2]
    swap → [C, D, A, B] → A κλειδώνει
    i = 1 → j ∈ [0..1]
    swap → [D, C, A, B]
*/
export const secretSantaShuffle = (
  list: ParticipantDraft[]
): SantaResult[] => {
  // με τον spread δημιουργούμε ένα αντιγραφο της λίστας ωστε οι αλλαγές που κάνουμε
  // σε αυτόν να μην επιρεάζουν την αρχική λίστα
  const shuffled = [...list];

  // ενα flag για να μας πει πότε τελειώσαμε
  let isValid = false;

  while (!isValid) {
    // Fisher–Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      // η random επιστρέφει απο 0 ως 1. αν κάνω επι i επιστρέφει απο 0 ως i
      // και με floor ακέραιο
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }

    // check: κανείς με τον εαυτό του
    // Για κάθε participant p στη θέση i, βεβαιώσου ότι ΔΕΝ είναι
    // ο ίδιος με τον receiver στη θέση i.
    isValid = list.every((p, i) => p !== shuffled[i]);
  }

  return list.map((giver, i) => ({
    giver,
    receiver: shuffled[i],
  }));
};

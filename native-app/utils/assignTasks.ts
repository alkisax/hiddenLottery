// native-app\utils\assignTasks.ts
import type { NameDraft } from "../types/types";

export type AssignedTasksResult = { participant: NameDraft; tasks: string[] }[];

/**
 * Διανέμει tasks round-robin (ώστε να μοιραστούν όσο πιο ισορροπημένα γίνεται).
 * Αν tasks < participants, κάποιοι θα πάρουν 0 tasks.
 */
export const assignTasks = (
  participants: NameDraft[],
  tasks: string[]
): AssignedTasksResult => {
  const result: AssignedTasksResult = participants.map((p) => ({
    participant: p,
    tasks: [],
  }));

  tasks.forEach((task, idx) => {
    const receiverIndex = idx % participants.length;
    result[receiverIndex].tasks.push(task);
  });

  return result;
};

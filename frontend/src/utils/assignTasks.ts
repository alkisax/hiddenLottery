// frontend/src/utils/assignTasks.ts
import type { NameDraft } from "../types/types";

export interface AssignedTask {
  participant: NameDraft;
  tasks: string[];
}

/*
  Assign tasks to participants

  Κανόνες:
  - shuffle participants
  - shuffle tasks
  - κυκλική ανάθεση (round-robin)
  - έτσι κατανέμονται όσο πιο ισορροπημένα γίνεται
*/
export const assignTasks = (
  participants: NameDraft[],
  tasks: string[]
): AssignedTask[] => {
  if (participants.length === 0) {
    throw new Error("No participants provided");
  }

  if (tasks.length === 0) {
    throw new Error("No tasks provided");
  }

  // shuffle participants
  const shuffledParticipants = [...participants];
  for (let i = shuffledParticipants.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledParticipants[i];
    shuffledParticipants[i] = shuffledParticipants[j];
    shuffledParticipants[j] = temp;
  }

  // shuffle tasks
  const shuffledTasks = [...tasks];
  for (let i = shuffledTasks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledTasks[i];
    shuffledTasks[i] = shuffledTasks[j];
    shuffledTasks[j] = temp;
  }

  // αρχικοποίηση αποτελέσματος
  const result: AssignedTask[] = shuffledParticipants.map((p) => ({
    participant: p,
    tasks: [],
  }));

  // κυκλική ανάθεση tasks
  shuffledTasks.forEach((task, index) => {
    const participantIndex = index % result.length;
    result[participantIndex].tasks.push(task);
  });

  return result;
};
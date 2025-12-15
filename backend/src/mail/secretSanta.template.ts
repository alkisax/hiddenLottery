// backend\src\mail\secretSanta.template.ts
// ένα template για την μορφή του mail
import type { ParticipantDraft } from '../types/types';

export const secretSantaEmail = ({
  giver,
  receiver,
}: {
  giver: ParticipantDraft;
  receiver: ParticipantDraft;
}) => {
  return {
    subject: '🎅 Secret Santa Assignment',
    text: `
Hello ${giver.name || ''},

You are the Secret Santa for:

🎁 ${receiver.name || receiver.email}

Please keep it secret 😉

Happy holidays!
`,
  };
};

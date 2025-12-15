// backend/src/santa/santa.service.ts
// παίρνει ένα ένα τα αποτελέσματα φτιάχνει το array results, τα Περνάει απο το template και τους στέλνει μεηλ το result που αντιστοιχεί

import { secretSantaShuffle } from "./secretSantaShuffle.util";
import { sendEmail } from "../mail/mailer.service";
import { secretSantaEmail } from "../mail/secretSanta.template";
import type { ParticipantDraft } from "../types/types";

export const runSecretSanta = async (participants: ParticipantDraft[]) => {
  const results = secretSantaShuffle(participants);

  // fire & forget emails (no thenable)
  results.forEach((result) => {
    (async () => {
      try {
        const { subject, text } = secretSantaEmail(result);

        // const IS_DRY_RUN = process.env.SANTA_DRY_RUN === 'true';
        const IS_DRY_RUN = false
        if (IS_DRY_RUN) {
          console.log("🎅 [DRY RUN]");
          console.log("To:", result.giver.email);
          console.log("Subject:", subject);
          console.log("Text:", text);
          return;
        }

        await sendEmail({
          to: result.giver.email!, // εδώ υποθέτουμε ότι έχει προηγηθεί validation
          subject,
          text,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(
            "Secret Santa email failed:",
            result.giver.email,
            err.message
          );
        } else {
          console.error(
            "Secret Santa email failed with unknown error:",
            result.giver.email,
            err
          );
        }
      }
    })();
  });

  return results; // μόνο για debug / testing
};

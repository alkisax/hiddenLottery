export type ParticipantDraft = {
  name: string;
  email: string;
};

export type SantaResult = {
  giver: ParticipantDraft;
  receiver: ParticipantDraft;
};
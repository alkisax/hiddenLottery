export type ParticipantDraft = {
  name: string;
  email: string;
};

export type SantaResult = {
  giver: ParticipantDraft;
  receiver: ParticipantDraft;
};

export interface NameDraft {
  name: string;
}
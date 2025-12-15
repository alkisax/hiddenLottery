import { useState } from "react";
import { Box } from "@mui/material";
import type { ParticipantDraft, SantaResult } from "./types/types";
import ModeSelector from "./components/ModeSelector";
import ParticipantsForm from "./components/ParticipantsForm";
import ResultsDebug from "./components/ResultsDebug";
import { secretSantaShuffle } from "./utils/secretSantaShuffle";

const MIN_PARTICIPANTS = 3;

const App = () => {
  const [mode, setMode] = useState<string>("");

  const [participants, setParticipants] = useState<ParticipantDraft[]>([
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
  ]);

  const [results, setResults] = useState<SantaResult[] | null>(null);

  const isSanta = mode === "secret_santa";

  // βασικό CRUD συμμετεχόντων
  const handleEmailChange = (index: number, value: string) => {
    setParticipants((prev) =>
      prev.map((participant, i) =>
        i === index ? { ...participant, email: value } : participant
      )
    );
  };

  const handleNameChange = (index: number, value: string) => {
    setParticipants((prev) =>
      prev.map((participant, i) =>
        i === index ? { ...participant, name: value } : participant
      )
    );
  };

  const addParticipant = () => {
    setParticipants((prev) => [...prev, { name: "", email: "" }]);
  };

  const removeParticipant = (index: number) => {
    setParticipants((prev) =>
      prev.length > MIN_PARTICIPANTS
        ? prev.filter((_, i) => i !== index)
        : prev
    );
  };

  const handleSubmit = () => {
    const validParticipants = participants.filter(
      (p) => p.email.trim() !== ""
    );

    if (validParticipants.length < MIN_PARTICIPANTS) return;

    const santaResults = secretSantaShuffle(validParticipants);
    setResults(santaResults);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ModeSelector mode={mode} onChange={setMode} />

      {isSanta && (
        <ParticipantsForm
          participants={participants}
          minParticipants={MIN_PARTICIPANTS}
          onNameChange={handleNameChange}
          onEmailChange={handleEmailChange}
          onAdd={addParticipant}
          onRemove={removeParticipant}
          onSubmit={handleSubmit}
        />
      )}

      {results && <ResultsDebug results={results} />}
    </Box>
  );
};

export default App;

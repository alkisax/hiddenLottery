// frontend\src\App.tsx
import { useState } from "react";
import { Box } from "@mui/material";
import type { ParticipantDraft } from "./types/types";
import { URL } from "./variables/variables";
import { MODE_BACKGROUNDS } from "./variables/variables";
import ModeSelector from "./components/ModeSelector";
import SantaParticipantsForm from "./components/SantaParticipantsForm";
import TwoGroupsForm from "./components/TwoGroupsForm";
import NGroupsForm from "./components/NGroupsForm";
import NSizeGroupsForm from "./components/NSizeGroupsForm";
import AssignTasksForm from "./components/AssignTasksForm";
// import type { SantaResult } from "./types/types";
// import ResultsDebug from "./components/ResultsDebug";
// import { secretSantaShuffle } from "./utils/secretSantaShuffle";

const MIN_PARTICIPANTS = 3;

const App = () => {
  const [mode, setMode] = useState<string>("");

  const [participants, setParticipants] = useState<ParticipantDraft[]>([
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
  ]);

  // const [results, setResults] = useState<SantaResult[] | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSanta = mode === "secret_santa";
  const isTwoGroups = mode === "two_groups";
  const isNGroups = mode === "n_groups";
  const isNSizeGroups = mode === "nsize_groups";
  const isCouples = mode === "couples";
  const isAssignTasks = mode === "assign_tasks";

  const url = URL;

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
      prev.length > MIN_PARTICIPANTS ? prev.filter((_, i) => i !== index) : prev
    );
  };

  // έτσι ήταν οταν το χρησιμοποιούσαμε για να κάνουμε τον υπολογισμο στο front και να δείξουμε τα αποτελέσματα στην οθόνη (οχι κρυφα)
  // const handleSubmit = () => {
  //   const validParticipants = participants.filter((p) => p.email.trim() !== "");

  //   if (validParticipants.length < MIN_PARTICIPANTS) return;

  //   const santaResults = secretSantaShuffle(validParticipants);
  //   setResults(santaResults);
  // };

  const handleSubmit = async () => {
    const validParticipants = participants.filter((p) => p.email.trim() !== "");

    if (validParticipants.length < MIN_PARTICIPANTS) return;

    try {
      setIsSubmitting(true);
      setSuccessMessage(null);

      const res = await fetch(`${url}/api/santa/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participants: validParticipants,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create Secret Santa");
      }

      // TEMP FRONTEND LOG (DEBUG ONLY)
      console.log("[FRONTEND] Secret Santa payload:", validParticipants);
      console.log("[FRONTEND] Backend response OK");

      setSuccessMessage("🎅 Secret Santa created. Check your mails!!!");
    } catch (err) {
      console.error(err);
      setSuccessMessage("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        backgroundImage: MODE_BACKGROUNDS[mode]
          ? `url(${MODE_BACKGROUNDS[mode]})`
          : "none",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        transition: "background-image 0.4s ease",
      }}
    >
      <ModeSelector mode={mode} onChange={setMode} />

      {isSanta && (
        <SantaParticipantsForm
          participants={participants}
          minParticipants={MIN_PARTICIPANTS}
          onNameChange={handleNameChange}
          onEmailChange={handleEmailChange}
          onAdd={addParticipant}
          onRemove={removeParticipant}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {isTwoGroups && <TwoGroupsForm />}
      {isNGroups && <NGroupsForm />}
      {isNSizeGroups && <NSizeGroupsForm />}
      {isCouples && <NSizeGroupsForm />}
      {isAssignTasks && <AssignTasksForm />}

      {/* {results && <ResultsDebug results={results} />} */}
      {successMessage && (
        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 1,
            bgcolor: "#e8f5e9",
            color: "#2e7d32",
            fontWeight: 500,
          }}
        >
          {successMessage}
        </Box>
      )}
    </Box>
  );
};

export default App;

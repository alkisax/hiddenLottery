// native-app\app\index.tsx
import { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import type { ParticipantDraft } from "../types/types";
import ModeSelector from "@/components/ModeSelector.native";
import SantaParticipantsForm from "@/components/SantaParticipantsForm.native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKEND_URL } from "@/config/config";
import TwoGroupsForm from "../components/TwoGroupsForm.native";
import NGroupsForm from "@/components/NGroupsForm.native";
import AssignTasksForm from "@/components/AssignTasksForm.native";
import NSizeGroupsForm from "@/components/NSizeGroupsForm.native";
import { MODE_BACKGROUNDS } from "@/config/modeBackgrounds";
import type { Mode } from '@/config/modeBackgrounds'

const MIN_PARTICIPANTS = 3;

export default function App() {
  const [mode, setMode] = useState<Mode>("secret_santa");

  const [participants, setParticipants] = useState<ParticipantDraft[]>([
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
  ]);

  const isSanta = mode === "secret_santa";
  const isTwoGroups = mode === "two_groups";
  const isNGroups = mode === "n_groups";
  const isNSizeGroups = mode === "nsize_groups";
  const isAssignTasks = mode === "assign_tasks";

  const handleEmailChange = (index: number, value: string) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, email: value } : p))
    );
  };

  const handleNameChange = (index: number, value: string) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, name: value } : p))
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
  const handleSubmit = async () => {
    const validParticipants = participants.filter((p) => p.email.trim() !== "");
    if (validParticipants.length < MIN_PARTICIPANTS) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/santa/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participants: validParticipants }),
      });

      if (!res.ok) throw new Error("Failed");
      alert("🎅 Check your mails!");
    } catch {
      alert("❌ Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={MODE_BACKGROUNDS[mode]}
        style={styles.background}
        resizeMode="cover"
      ></ImageBackground>

      <View style={styles.container}>
        <ModeSelector mode={mode} onChange={setMode} />

        {isSanta && (
          <Text style={styles.placeholder}>🎅 Secret Santa selected</Text>
        )}
      </View>
      {isSanta && (
        <SantaParticipantsForm
          participants={participants}
          minParticipants={MIN_PARTICIPANTS}
          onNameChange={handleNameChange}
          onEmailChange={handleEmailChange}
          onAdd={addParticipant}
          onRemove={removeParticipant}
          onSubmit={handleSubmit}
          isSubmitting={false}
        />
      )}

      {isTwoGroups && <TwoGroupsForm />}
      {isNGroups && <NGroupsForm />}
      {isNSizeGroups && <NSizeGroupsForm />}
      {isAssignTasks && <AssignTasksForm />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  placeholder: {
    marginTop: 40,
    fontSize: 18,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
  },
});

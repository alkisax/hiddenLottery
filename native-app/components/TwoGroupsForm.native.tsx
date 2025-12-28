import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import type { NameDraft } from "../types/types";
import { splitIntoTwoGroups } from "../utils/splitIntoTwoGroups";

const MIN_PARTICIPANTS = 2;

export default function TwoGroupsForm () {
  const [participants, setParticipants] = useState<NameDraft[]>([
    { name: "" },
    { name: "" },
  ]);

  const [result, setResult] = useState<{
    groupA: NameDraft[];
    groupB: NameDraft[];
  } | null>(null);

  const handleChange = (index: number, value: string) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { name: value } : p))
    );
  };

  const addParticipant = () => {
    setParticipants((prev) => [...prev, { name: "" }]);
  };

  const removeParticipant = (index: number) => {
    setParticipants((prev) =>
      prev.length > MIN_PARTICIPANTS
        ? prev.filter((_, i) => i !== index)
        : prev
    );
  };

  const handleSubmit = () => {
    const valid = participants.filter((p) => p.name.trim() !== "");
    if (valid.length < MIN_PARTICIPANTS) return;

    setResult(splitIntoTwoGroups(valid));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Split into two groups</Text>

      {participants.map((p, i) => (
        <View key={i} style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder={`Participant ${i + 1}`}
            value={p.name}
            onChangeText={(text) => handleChange(i, text)}
          />

          <Pressable
            onPress={() => removeParticipant(i)}
            disabled={participants.length <= MIN_PARTICIPANTS}
            style={[
              styles.removeButton,
              participants.length <= MIN_PARTICIPANTS && styles.disabled,
            ]}
          >
            <Text style={styles.removeText}>−</Text>
          </Pressable>
        </View>
      ))}

      <Pressable onPress={addParticipant} style={styles.addButton}>
        <Text style={styles.addText}>＋ Add participant</Text>
      </Pressable>

      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Create groups</Text>
      </Pressable>

      {result && (
        <View style={styles.results}>
          <View style={styles.group}>
            <Text style={styles.groupTitle}>Group A</Text>
            {result.groupA.map((p, i) => (
              <Text key={i}>• {p.name}</Text>
            ))}
          </View>

          <View style={styles.group}>
            <Text style={styles.groupTitle}>Group B</Text>
            {result.groupB.map((p, i) => (
              <Text key={i}>• {p.name}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 32,
    width: "90%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  removeText: {
    fontSize: 22,
    color: "#c62828",
  },
  addButton: {
    marginTop: 12,
  },
  addText: {
    fontSize: 16,
    color: "#1976d2",
  },
  submitButton: {
    marginTop: 16,
    paddingVertical: 10,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "600",
  },
  results: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  group: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  groupTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  disabled: {
    opacity: 0.4,
  },
});

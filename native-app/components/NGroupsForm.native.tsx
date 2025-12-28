// native-app\components\NGroupsForm.native.tsx
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import type { NameDraft } from "../types/types";
import { splitIntoNGroups } from "../utils/splitIntoNGroups";

const MIN_PARTICIPANTS = 2;
const MIN_GROUPS = 2;

export default function NGroupsForm() {
  const [participants, setParticipants] = useState<NameDraft[]>([
    { name: "" },
    { name: "" },
  ]);

  const [groupsCount, setGroupsCount] = useState<number>(2);

  const [result, setResult] = useState<{ groups: NameDraft[][] } | null>(null);

  const handleChange = (index: number, value: string) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { name: value } : p))
    );
  };

  const addParticipant = () =>
    setParticipants((prev) => [...prev, { name: "" }]);

  const removeParticipant = (index: number) => {
    setParticipants((prev) =>
      prev.length > MIN_PARTICIPANTS ? prev.filter((_, i) => i !== index) : prev
    );
  };

  const handleGroupsCountChange = (value: string) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    if (n < MIN_GROUPS) return;
    setGroupsCount(n);
  };

  const handleSubmit = () => {
    const valid = participants.filter((p) => p.name.trim() !== "");
    if (valid.length < MIN_PARTICIPANTS) return;
    if (groupsCount > valid.length) return;

    setResult(splitIntoNGroups(valid, groupsCount));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Split into N groups</Text>

      <TextInput
        style={styles.input}
        placeholder="Number of groups"
        value={String(groupsCount)}
        keyboardType="number-pad"
        onChangeText={handleGroupsCountChange}
      />

      {participants.map((p, i) => (
        <View key={i} style={styles.row}>
          <TextInput
            style={styles.inputFlex}
            placeholder={`Participant ${i + 1}`}
            value={p.name}
            onChangeText={(text) => handleChange(i, text)}
          />
          <Pressable
            onPress={() => removeParticipant(i)}
            disabled={participants.length <= MIN_PARTICIPANTS}
            style={[
              styles.smallBtn,
              participants.length <= MIN_PARTICIPANTS && styles.disabled,
            ]}
          >
            <Text style={styles.smallBtnText}>−</Text>
          </Pressable>
        </View>
      ))}

      <Pressable onPress={addParticipant} style={styles.linkBtn}>
        <Text style={styles.linkText}>＋ Add participant</Text>
      </Pressable>

      <Pressable onPress={handleSubmit} style={styles.primaryBtn}>
        <Text style={styles.primaryText}>Create groups</Text>
      </Pressable>

      {result && (
        <View style={styles.results}>
          {result.groups.map((group, idx) => (
            <View key={idx} style={styles.groupCard}>
              <Text style={styles.groupTitle}>Group {idx + 1}</Text>
              {group.map((p, i) => (
                <Text key={i}>• {p.name}</Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    width: "90%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  inputFlex: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  smallBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  smallBtnText: { fontSize: 22, color: "#c62828" },
  linkBtn: { marginTop: 8 },
  linkText: { fontSize: 16, color: "#1976d2" },
  primaryBtn: { marginTop: 16, paddingVertical: 10 },
  primaryText: { fontSize: 16, fontWeight: "600" },
  results: { marginTop: 18, gap: 10 },
  groupCard: { padding: 12, borderRadius: 8, backgroundColor: "#f5f5f5" },
  groupTitle: { fontWeight: "600", marginBottom: 6 },
  disabled: { opacity: 0.4 },
});

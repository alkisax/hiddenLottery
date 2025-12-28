// native-app\components\AssignTasksForm.native.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import type { NameDraft } from "../types/types";
import { assignTasks } from "../utils/assignTasks";

const MIN_PARTICIPANTS = 1;
const MIN_TASKS = 1;

export default function AssignTasksForm() {
  const [participants, setParticipants] = useState<NameDraft[]>([{ name: "" }]);
  const [tasks, setTasks] = useState<string[]>([""]);

  const [result, setResult] = useState<
    { participant: NameDraft; tasks: string[] }[] | null
  >(null);

  // participants
  const handleParticipantChange = (index: number, value: string) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { name: value } : p))
    );
  };

  const addParticipant = () => setParticipants((prev) => [...prev, { name: "" }]);

  const removeParticipant = (index: number) => {
    setParticipants((prev) =>
      prev.length > MIN_PARTICIPANTS ? prev.filter((_, i) => i !== index) : prev
    );
  };

  // tasks
  const handleTaskChange = (index: number, value: string) => {
    setTasks((prev) => prev.map((t, i) => (i === index ? value : t)));
  };

  const addTask = () => setTasks((prev) => [...prev, ""]);

  const removeTask = (index: number) => {
    setTasks((prev) =>
      prev.length > MIN_TASKS ? prev.filter((_, i) => i !== index) : prev
    );
  };

  const handleSubmit = () => {
    const validParticipants = participants.filter((p) => p.name.trim() !== "");
    const validTasks = tasks.filter((t) => t.trim() !== "");

    if (validParticipants.length < MIN_PARTICIPANTS) return;
    if (validTasks.length < MIN_TASKS) return;

    setResult(assignTasks(validParticipants, validTasks));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Assign tasks to participants</Text>

      <Text style={styles.sectionTitle}>Participants</Text>

      {participants.map((p, i) => (
        <View key={i} style={styles.row}>
          <TextInput
            style={styles.inputFlex}
            placeholder={`Participant ${i + 1}`}
            value={p.name}
            onChangeText={(text) => handleParticipantChange(i, text)}
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

      <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Tasks</Text>

      {tasks.map((t, i) => (
        <View key={i} style={styles.row}>
          <TextInput
            style={styles.inputFlex}
            placeholder={`Task ${i + 1}`}
            value={t}
            onChangeText={(text) => handleTaskChange(i, text)}
          />
          <Pressable
            onPress={() => removeTask(i)}
            disabled={tasks.length <= MIN_TASKS}
            style={[styles.smallBtn, tasks.length <= MIN_TASKS && styles.disabled]}
          >
            <Text style={styles.smallBtnText}>−</Text>
          </Pressable>
        </View>
      ))}

      <Pressable onPress={addTask} style={styles.linkBtn}>
        <Text style={styles.linkText}>＋ Add task</Text>
      </Pressable>

      <Pressable onPress={handleSubmit} style={styles.primaryBtn}>
        <Text style={styles.primaryText}>Assign tasks</Text>
      </Pressable>

      {result && (
        <View style={styles.results}>
          {result.map((entry, idx) => (
            <View key={idx} style={styles.groupCard}>
              <Text style={styles.groupTitle}>{entry.participant.name}</Text>
              {entry.tasks.map((task, j) => (
                <Text key={j}>• {task}</Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 24, width: "90%", padding: 16, borderRadius: 12, backgroundColor: "#fff", elevation: 2 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  inputFlex: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
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

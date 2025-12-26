import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import type { ParticipantDraft } from "../types/types";

type Props = {
  participants: ParticipantDraft[];
  minParticipants: number;
  onNameChange: (index: number, value: string) => void;
  onEmailChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export default function SantaParticipantsForm({
  participants,
  minParticipants,
  onNameChange,
  onEmailChange,
  onAdd,
  onRemove,
  onSubmit,
  isSubmitting,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Give participant emails</Text>

      {participants.map((participant, index) => (
        <View key={index} style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder={`Name ${index + 1}`}
            value={participant.name}
            onChangeText={(text) => onNameChange(index, text)}
          />

          <TextInput
            style={styles.input}
            placeholder={`Email ${index + 1}`}
            value={participant.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => onEmailChange(index, text)}
          />

          <Pressable
            onPress={() => onRemove(index)}
            disabled={participants.length <= minParticipants}
            style={[
              styles.removeButton,
              participants.length <= minParticipants && styles.disabled,
            ]}
          >
            <Text style={styles.removeText}>−</Text>
          </Pressable>
        </View>
      ))}

      <Pressable onPress={onAdd} style={styles.addButton}>
        <Text style={styles.addText}>＋ Add participant</Text>
      </Pressable>

      <View style={styles.submitWrapper}>
        <Pressable
          onPress={onSubmit}
          disabled={isSubmitting}
          style={[styles.submitButton, isSubmitting && styles.disabled]}
        >
          <Text style={styles.submitText}>🎁</Text>
        </Pressable>
      </View>
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
    elevation: 2, // Android shadow
  },
  title: {
    fontSize: 16,
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
  submitWrapper: {
    alignItems: "flex-end",
    marginTop: 24,
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  submitText: {
    fontSize: 24,
  },
  disabled: {
    opacity: 0.4,
  },
});

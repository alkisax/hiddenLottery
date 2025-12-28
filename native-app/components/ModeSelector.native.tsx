// native-app\components\ModeSelector.native.tsx
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import type { Mode } from "@/config/modeBackgrounds";

type Props = {
  mode: Mode;
  onChange: (value: Mode) => void;
};

export default function ModeSelector({ mode, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select mode</Text>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={mode}
          onValueChange={(value) => onChange(value as Mode)}
        >
          <Picker.Item label="Secret Santa" value="secret_santa" />
          <Picker.Item label="Two Groups" value="two_groups" />
          <Picker.Item label="N Groups" value="n_groups" />
          <Picker.Item label="Groups of N size" value="nsize_groups" />
          <Picker.Item label="Assign Tasks" value="assign_tasks" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    overflow: "hidden",
  },
});

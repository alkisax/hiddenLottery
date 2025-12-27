// native-app\components\ModeSelector.native.tsx
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {
  mode: string;
  onChange: (value: string) => void;
};

export default function ModeSelector({ mode, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select mode</Text>

      <View style={styles.pickerWrapper}>
        <Picker selectedValue={mode} onValueChange={onChange}>
          <Picker.Item label="Secret Santa" value="secret_santa" />
          <Picker.Item label="Two Groups" value="two_groups" />
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

// native-app\config\modeBackgrounds.ts
import type { ImageSourcePropType } from "react-native";

export type Mode =
  | "secret_santa"
  | "two_groups"
  | "n_groups"
  | "nsize_groups"
  | "couples"
  | "assign_tasks";

export const MODE_BACKGROUNDS: Record<Mode, ImageSourcePropType> = {
  secret_santa: require("../assets/backgrounds/secretSanta.jpeg"),
  two_groups: require("../assets/backgrounds/twoteams.jpeg"),
  n_groups: require("../assets/backgrounds/nteams.jpeg"),
  nsize_groups: require("../assets/backgrounds/nsize.jpeg"),
  couples: require("../assets/backgrounds/couples.jpeg"),
  assign_tasks: require("../assets/backgrounds/tasks.jpeg"),
};

// frontend\src\components\ModeSelector.tsx
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
  mode: string;
  onChange: (value: string) => void;
}

const ModeSelector = ({ mode, onChange }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        pt: 6,
      }}
    >
      <FormControl sx={{ minWidth: 240 }}>
        <InputLabel id="mode-label">Mode</InputLabel>
        <Select
          labelId="mode-label"
          value={mode}
          label="Mode"
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem value="">
            <em>—</em>
          </MenuItem>
          <MenuItem value="secret_santa">Secret Santa</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ModeSelector;

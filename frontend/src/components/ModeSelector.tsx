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
        <InputLabel
          id="mode-label"
          sx={{
            backgroundColor: "#fff",
            px: 1,
          }}
        >
          Mode
        </InputLabel>
        <Select
          labelId="mode-label"
          value={mode}
          label="Mode"
          onChange={(e) => onChange(e.target.value)}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <MenuItem value="">
            <em>—</em>
          </MenuItem>
          <MenuItem value="secret_santa">Secret Santa</MenuItem>
          <MenuItem value="two_groups">Split into two teams</MenuItem>
          <MenuItem value="n_groups">Split into N teams</MenuItem>
          <MenuItem value="nsize_groups">
            Split into groups of fixed size
          </MenuItem>
          <MenuItem value="couples">Split into couples</MenuItem>
          <MenuItem value="assign_tasks">Assign tasks</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ModeSelector;

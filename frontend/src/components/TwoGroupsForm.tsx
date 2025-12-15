// frontend\src\components\TwoGroupsForm.tsx
import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import type { NameDraft } from "../types/types";
import { splitIntoTwoGroups } from "../utils/splitIntoTwoGroups";

const MIN_PARTICIPANTS = 2;

const TwoGroupsForm = () => {
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
      prev.length > MIN_PARTICIPANTS ? prev.filter((_, i) => i !== index) : prev
    );
  };

  const handleSubmit = () => {
    const valid = participants.filter((p) => p.name.trim() !== "");
    if (valid.length < MIN_PARTICIPANTS) return;

    setResult(splitIntoTwoGroups(valid));
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          mt: 6,
          width: "90%",
          maxWidth: 900,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Split into two groups
        </Typography>

        <Stack spacing={2}>
          {participants.map((p, i) => (
            <Stack key={i} direction="row" spacing={1}>
              <TextField
                fullWidth
                label={`Participant ${i + 1}`}
                value={p.name}
                onChange={(e) => handleChange(i, e.target.value)}
              />
              <Button onClick={() => removeParticipant(i)}>-</Button>
            </Stack>
          ))}

          <Button onClick={addParticipant}>Add participant</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create groups
          </Button>
        </Stack>

        {result && (
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Paper sx={{ p: 2, flex: 1 }}>
              <Typography variant="subtitle1">Group A</Typography>
              {result.groupA.map((p, i) => (
                <Typography key={i}>• {p.name}</Typography>
              ))}
            </Paper>

            <Paper sx={{ p: 2, flex: 1 }}>
              <Typography variant="subtitle1">Group B</Typography>
              {result.groupB.map((p, i) => (
                <Typography key={i}>• {p.name}</Typography>
              ))}
            </Paper>
          </Stack>
        )}
      </Paper>
    </>
  );
};

export default TwoGroupsForm;

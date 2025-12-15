import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import type { NameDraft } from "../types/types";
import { splitIntoGroupsOfNSize } from "../utils/splitIntoGroupsOfNSize";

const MIN_PARTICIPANTS = 2;
const MIN_GROUP_SIZE = 2;

const NSizeGroupsForm = () => {
  const [participants, setParticipants] = useState<NameDraft[]>([
    { name: "" },
    { name: "" },
  ]);

  const [groupSize, setGroupSize] = useState<number>(2);

  const [result, setResult] = useState<{
    groups: NameDraft[][];
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
    if (groupSize > valid.length) return;

    setResult(splitIntoGroupsOfNSize(valid, groupSize));
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
          Split into groups of fixed size
        </Typography>

        <Stack spacing={2}>
          {/* μέγεθος ομάδας */}
          <TextField
            type="number"
            label="Group size"
            value={groupSize}
            slotProps={{
              htmlInput: {
                min: MIN_GROUP_SIZE,
              },
            }}
            onChange={(e) => setGroupSize(Number(e.target.value))}
          />

          {/* συμμετέχοντες */}
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
          <Stack spacing={2} sx={{ mt: 4 }}>
            {result.groups.map((group, groupIndex) => (
              <Paper key={groupIndex} sx={{ p: 2 }}>
                <Typography variant="subtitle1">
                  Group {groupIndex + 1}
                </Typography>
                {group.map((p, i) => (
                  <Typography key={i}>• {p.name}</Typography>
                ))}
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </>
  );
};

export default NSizeGroupsForm;

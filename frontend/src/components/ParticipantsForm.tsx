// frontend\src\components\ParticipantsForm.tsx
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { ParticipantDraft } from "../types/types";

interface Props {
  participants: ParticipantDraft[];
  minParticipants: number;
  onNameChange: (index: number, value: string) => void;
  onEmailChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ParticipantsForm = ({
  participants,
  minParticipants,
  onNameChange,
  onEmailChange,
  onAdd,
  onRemove,
  onSubmit,
  isSubmitting,
}: Props) => {
  return (
    <Paper
      elevation={2}
      sx={{
        mt: 6,
        width: "90%",
        maxWidth: 900,
        p: 4,
      }}
    >
      <Stack spacing={2}>
        <strong>Give participant emails</strong>

        {participants.map((participant, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <TextField
              fullWidth
              label={`Name ${index + 1}`}
              value={participant.name}
              onChange={(e) => onNameChange(index, e.target.value)}
            />

            <TextField
              fullWidth
              type="email"
              label={`Email ${index + 1}`}
              value={participant.email}
              onChange={(e) => onEmailChange(index, e.target.value)}
            />

            <IconButton
              onClick={() => onRemove(index)}
              disabled={participants.length <= minParticipants}
            >
              <RemoveIcon />
            </IconButton>
          </Stack>
        ))}

        <Box>
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Box>

        <Box textAlign="right">
          <IconButton onClick={onSubmit} disabled={isSubmitting}>🎁</IconButton>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ParticipantsForm;

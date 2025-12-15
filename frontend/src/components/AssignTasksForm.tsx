import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import type { NameDraft } from "../types/types";
import { assignTasks } from "../utils/assignTasks";

const MIN_PARTICIPANTS = 1;
const MIN_TASKS = 1;

const AssignTasksForm = () => {
  const [participants, setParticipants] = useState<NameDraft[]>([
    { name: "" },
  ]);

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

  // tasks
  const handleTaskChange = (index: number, value: string) => {
    setTasks((prev) => prev.map((t, i) => (i === index ? value : t)));
  };

  const addTask = () => {
    setTasks((prev) => [...prev, ""]);
  };

  const removeTask = (index: number) => {
    setTasks((prev) =>
      prev.length > MIN_TASKS ? prev.filter((_, i) => i !== index) : prev
    );
  };

  const handleSubmit = () => {
    const validParticipants = participants.filter(
      (p) => p.name.trim() !== ""
    );
    const validTasks = tasks.filter((t) => t.trim() !== "");

    if (validParticipants.length < MIN_PARTICIPANTS) return;
    if (validTasks.length < MIN_TASKS) return;

    setResult(assignTasks(validParticipants, validTasks));
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
          Assign tasks to participants
        </Typography>

        <Stack spacing={2}>
          {/* Participants */}
          <Typography variant="subtitle1">Participants</Typography>

          {participants.map((p, i) => (
            <Stack key={i} direction="row" spacing={1}>
              <TextField
                fullWidth
                label={`Participant ${i + 1}`}
                value={p.name}
                onChange={(e) =>
                  handleParticipantChange(i, e.target.value)
                }
              />
              <Button onClick={() => removeParticipant(i)}>-</Button>
            </Stack>
          ))}

          <Button onClick={addParticipant}>Add participant</Button>

          {/* Tasks */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Tasks
          </Typography>

          {tasks.map((t, i) => (
            <Stack key={i} direction="row" spacing={1}>
              <TextField
                fullWidth
                label={`Task ${i + 1}`}
                value={t}
                onChange={(e) => handleTaskChange(i, e.target.value)}
              />
              <Button onClick={() => removeTask(i)}>-</Button>
            </Stack>
          ))}

          <Button onClick={addTask}>Add task</Button>

          <Button variant="contained" onClick={handleSubmit}>
            Assign tasks
          </Button>
        </Stack>

        {result && (
          <Stack spacing={2} sx={{ mt: 4 }}>
            {result.map((entry, i) => (
              <Paper key={i} sx={{ p: 2 }}>
                <Typography variant="subtitle1">
                  {entry.participant.name}
                </Typography>
                {entry.tasks.map((task, j) => (
                  <Typography key={j}>• {task}</Typography>
                ))}
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </>
  );
};

export default AssignTasksForm;

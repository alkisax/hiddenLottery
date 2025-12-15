// frontend\src\components\ResultsDebug.tsx
import { Paper, Stack } from "@mui/material";
import type { SantaResult } from "../types/types";

interface Props {
  results: SantaResult[];
}

const ResultsDebug = ({ results }: Props) => {
  return (
    <Paper
      elevation={1}
      sx={{
        mt: 4,
        width: "90%",
        maxWidth: 900,
        p: 3,
        bgcolor: "#fafafa",
      }}
    >
      <Stack spacing={1}>
        <strong>Results (debug)</strong>

        {results.map((result, i) => (
          <div key={i}>
            {result.giver.name || result.giver.email} →{" "}
            {result.receiver.name || result.receiver.email}
          </div>
        ))}
      </Stack>
    </Paper>
  );
};

export default ResultsDebug;

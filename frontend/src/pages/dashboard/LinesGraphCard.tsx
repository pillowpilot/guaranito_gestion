import { Card, CardContent, CardHeader, Stack, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import linesChartData from "./linesData";

interface LinesGraphCardProps {
  title: string;
  subtitle: string;
}

export const LinesGraphCard = ({ title, subtitle }: LinesGraphCardProps) => (
  <Card
    sx={{
      height: "100%",
      background:
        "linear-gradient(90deg, #1976CD 4px, transparent 5px, transparent)",
    }}
  >
    <CardHeader title={title} subheader={subtitle} />
    <CardContent>
      <Stack justifyContent="center">
        <Box sx={{ aspectRatio: 2 }}>
          <Line data={linesChartData} />
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

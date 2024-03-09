import { Card, CardContent, CardHeader, Stack, Box } from "@mui/material";
import { Pie } from "react-chartjs-2";
import pieChartData from "./pieData";

interface PieGraphCardProps {
  title: string;
  subtitle: string;
}

export const PieGraphCard = ({ title, subtitle }: PieGraphCardProps) => (
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
        <Box sx={{ aspectRatio: 1 }}>
          <Pie data={pieChartData} />
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

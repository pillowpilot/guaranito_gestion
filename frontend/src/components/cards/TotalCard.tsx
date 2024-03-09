import { Card, CardContent, CardHeader, Typography } from "@mui/material";

interface TotalCardProps {
  title: string;
  subtitle: string;
  content: string;
}

export const TotalCard = ({ title, subtitle, content }: TotalCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        background:
          "linear-gradient(90deg, #1976CD 4px, transparent 5px, transparent)",
      }}
    >
      <CardHeader title={title} subheader={subtitle} />
      <CardContent>
        <Typography variant="h5">{content}</Typography>
      </CardContent>
    </Card>
  );
};

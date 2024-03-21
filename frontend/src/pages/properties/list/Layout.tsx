import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactElement } from "react";

const Actions = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`new`}
        sx={{
          marginTop: 2,
        }}
      >
        {t("properties.list.newBtn")}
      </Button>
    </Box>
  );
};

interface PageLayoutProps {
  children: ReactElement;
}
const PageLayout = ({ children }: PageLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        padding: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">{t("properties.list.header")}</Typography>
      {children}
      <Actions />
    </Paper>
  );
};

export { PageLayout };

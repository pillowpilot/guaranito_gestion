import { Button, Paper, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Actions = () => {
  const { t } = useTranslation();
  return (
    <Stack direction="row">
      <Button variant="contained" color="primary" component={Link} to={`new`}>
        {t("inferences.list.newBtn")}
      </Button>
    </Stack>
  );
};

const Layout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 5 }}>
      <Stack gap={2}>
        <Typography variant="h4">{t("inferences.list.header")}</Typography>
        {children}
        <Actions />
      </Stack>
    </Paper>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export { Layout };
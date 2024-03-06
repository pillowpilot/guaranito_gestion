import { Box, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

/**
 * Layout of UsersNewPage
 */
const Layout = ({ profilePicture, form }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="center">
      <Paper sx={{ px: { xs: 0, md: 5 }, py: 5 }}>
        <Stack gap={5}>
          <Typography variant="h4">{t("users.create.header")}</Typography>
          <Stack
            gap={2}
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
          >
            <Box sx={{ mx: 10 }}>{profilePicture}</Box>
            {form}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

Layout.propTypes = {
  /**
   * Profile Picture placeholder
   */
  profilePicture: PropTypes.node,
  /**
   * Form
   */
  form: PropTypes.node,
};

export { Layout };

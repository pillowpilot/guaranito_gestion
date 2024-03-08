import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Button for login
 */
export const LoginButton = ({ tKey }: { tKey: string }) => {
  const { t } = useTranslation();
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        paddingY: "1rem",
      }}
    >
      {t(tKey)}
    </Button>
  );
};

import { Button } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface SubmitButtonProps {
  labelKey: string;
  endIcon: ReactNode;
}
/**
 * Submit button for forms
 *
 * labelKey: Translation key for the label
 */
export const SubmitButton = ({ labelKey, endIcon }: SubmitButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button variant="contained" type="submit" endIcon={endIcon}>
      {t(labelKey)}
    </Button>
  );
};

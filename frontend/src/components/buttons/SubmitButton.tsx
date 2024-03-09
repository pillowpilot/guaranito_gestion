import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SubmitButtonProps {
  labelKey: string;
}
/**
 * Submit button for forms
 * 
 * labelKey: Translation key for the label
 */
export const SubmitButton = ({ labelKey }: SubmitButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button variant="contained" type="submit">
      {t(labelKey)}
    </Button>
  );
};

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BackButtonProps {
  labelKey: string;
  onClick: null | (() => void);
}
/**
 * Go Back button.
 *
 * labelKey: Translation key for the label
 * onClick: If is not present, the go back functionality is enabled.
 */
export const BackButton = ({ labelKey, onClick }: BackButtonProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  if (!onClick) {
    onClick = () => {
      navigate(-1);
    };
  }
  return (
    <Button variant="outlined" size="medium" onClick={onClick}>
      {t(labelKey)}
    </Button>
  );
};

import { MenuItem, Typography, ListItemIcon, SvgIcon } from "@mui/material";
import { US, PY } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

interface LanguageOptionsProps {
  handleCloseAccountMenu: () => void;
}

/**
 * Renders i18n menu items
 */
const LanguageOptions = ({ handleCloseAccountMenu }: LanguageOptionsProps) => {
  const { i18n } = useTranslation();

  const activeOptionStyle = {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    "&:hover": {
      bgcolor: "primary.main",
      color: "primary.contrastText",
    },
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          i18n.changeLanguage("en");
          handleCloseAccountMenu();
        }}
        sx={i18n.language === "en" ? activeOptionStyle : {}}
      >
        <ListItemIcon>
          <SvgIcon>
            <US />
          </SvgIcon>
        </ListItemIcon>
        <Typography variant="inherit">English</Typography>
      </MenuItem>

      <MenuItem
        onClick={() => {
          i18n.changeLanguage("es");
          handleCloseAccountMenu();
        }}
        sx={i18n.language === "es" ? activeOptionStyle : {}}
      >
        <ListItemIcon>
          <SvgIcon>
            <PY />
          </SvgIcon>
        </ListItemIcon>
        <Typography variant="inherit">Español</Typography>
      </MenuItem>
    </>
  );
};

export { LanguageOptions };

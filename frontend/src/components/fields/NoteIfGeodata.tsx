import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const NoteIfGeodata = ({ geodata }) => {
  const { t } = useTranslation();
  if (geodata === null) return <></>;
  else {
    const startIndex = geodata.lastIndexOf("/") + 1;
    const filename = geodata.substring(startIndex);
    const message =
      t("properties.details.labels.geodataFound") + " (" + filename + ").";
    return <Typography variant="body">{message}</Typography>;
  }
};

export { NoteIfGeodata };

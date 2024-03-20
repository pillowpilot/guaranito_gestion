import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface NoteIfGeodataProps {
  geodata: string;
}

const NoteIfGeodata = ({ geodata }: NoteIfGeodataProps) => {
  const { t } = useTranslation();
  if (geodata === null) return <></>;
  else {
    const startIndex = geodata.lastIndexOf("/") + 1;
    const filename = geodata.substring(startIndex);
    const message =
      t("properties.details.labels.geodataFound") + " (" + filename + ").";
    return <Typography variant="body1">{message}</Typography>;
  }
};

export { NoteIfGeodata };

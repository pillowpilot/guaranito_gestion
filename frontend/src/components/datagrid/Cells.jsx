import { useTranslation } from "react-i18next";
import { Chip, Typography, Stack } from "@mui/material";
import Dms from "geodesy/dms";

const CoordinateCell = ({ lat, lon }) => {
  const { t } = useTranslation();
  if (lat === undefined || lon === undefined)
    return (
      <Typography variant="body">
        {t("inferences.list.labels.noCoords")}
      </Typography>
    );
  return (
    <Stack>
      <Typography variant="body">{Dms.toLat(lat, "dms", 2)}</Typography>
      <Typography variant="body">{Dms.toLon(lon, "dms", 2)}</Typography>
    </Stack>
  );
};

const StatusCell = ({ status }) => {
  const getColors = (st) => {
    // TODO Improve this!
    switch (st) {
      case "SUCCESS" | "EXITO":
        return { color: "#0d6832", backgroundColor: "#d6f0e0" };
      case "PENDING" | "PENDIENTE":
      case "PROCESSING" | "PROCESANDO":
        return { color: "#73510d", backgroundColor: "#fbf0da" };
      case "FAILURE" | "FRACASO":
        return { color: "white", backgroundColor: "red" };
    }
  };
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        ...getColors(status),
        width: "100px",
        fontWeight: "bold",
      }}
    />
  );
};

const DateCell = ({ date, translationKey }) => {
  const { t } = useTranslation();

  return (
    <Typography variant="body">
      {t(translationKey, {
        val: new Date(date),
        formatParams: {
          val: {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
          },
        },
      })}
    </Typography>
  );
};

export { CoordinateCell, StatusCell, DateCell };

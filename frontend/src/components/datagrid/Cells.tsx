import { useTranslation } from "react-i18next";
import { Chip, Typography, Stack } from "@mui/material";
import Dms from "geodesy/dms";

interface CoordinateCellProps {
  lat: number | undefined;
  lon: number | undefined;
}

const CoordinateCell = ({ lat, lon }: CoordinateCellProps) => {
  const { t } = useTranslation();
  if (lat === undefined || lon === undefined)
    return (
      <Typography variant="body1">
        {t("inferences.list.labels.noCoords")}
      </Typography>
    );
  return (
    <Stack>
      <Typography variant="body1">{Dms.toLat(lat, "dms", 2)}</Typography>
      <Typography variant="body1">{Dms.toLon(lon, "dms", 2)}</Typography>
    </Stack>
  );
};

type StatusValues =
  | "SUCCESS"
  | "EXITO"
  | "PENDING"
  | "PENDIENTE"
  | "PROCESSING"
  | "PROCESANDO"
  | "FAILURE"
  | "FRACASO";

interface StatusCellProps {
  status: StatusValues;
}

const StatusCell = ({ status }: StatusCellProps) => {
  const getColors = (st: StatusValues) => {
    // TODO Improve this!
    switch (st) {
      case "SUCCESS":
      case "EXITO":
        return { color: "#0d6832", backgroundColor: "#d6f0e0" };
      case "PENDING":
      case "PENDIENTE":
      case "PROCESSING":
      case "PROCESANDO":
        return { color: "#73510d", backgroundColor: "#fbf0da" };
      case "FAILURE":
      case "FRACASO":
        return { color: "white", backgroundColor: "red" };
    }
  };
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        ...getColors(status),
        width: "130px",
        fontWeight: "bold",
      }}
    />
  );
};

interface DateCellProps {
  date: string;
  translationKey: string;
}

const DateCell = ({ date, translationKey }: DateCellProps) => {
  const { t } = useTranslation();

  return (
    <Typography variant="body1">
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

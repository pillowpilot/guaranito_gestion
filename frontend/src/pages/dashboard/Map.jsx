import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useQueries, useQuery } from "react-query";
import { useSnackbar } from "notistack";

import bbox from "@turf/bbox";
import * as L from "leaflet";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Api } from "../../api/client";
import { useTranslation } from "react-i18next";

const LoadingMap = () => {
  return <span>Loading...</span>;
};

const manageErrorsFromQuery = (t, error, enqueueSnackbar) => {
  if (error.response) {
    enqueueSnackbar(error.response.data.detail, { variant: "error" });
  } else if (error.request) {
    enqueueSnackbar(t("errors.network.default"), { variant: "error" });
  } else {
    enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
  }
};

const Map = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const listLots = useQuery({
    queryKey: ["lots"],
    queryFn: Api.listLots,
    select: (data) => {
      const results = data.data.results;
      return results.filter((lot) => lot.geodata);
    },
    onError: (error) => {
      manageErrorsFromQuery(t, error, enqueueSnackbar);
    },
  });

  const geodataQueries = useQueries(
    listLots.data?.map((lot) => ({
      queryKey: ["lots", lot.id, "geodata"],
      queryFn: () => Api.retrieveMediaFile(lot.geodata),
      onError: (error) => {
        manageErrorsFromQuery(t, error, enqueueSnackbar);
      },
      enabled: !!listLots.isSuccess,
    })) ?? []
  );

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);

  if (listLots.isSuccess && geodataQueries.every((q) => q.isSuccess)) {
    const features = geodataQueries
      .map((q) => q.data.data.features)
      .reduce((acc, cur) => [...acc, ...cur], []);

    const featureCollection = {
      type: "FeatureCollection",
      features: features,
    };

    let mapBounds = undefined;
    if (featureCollection.features.length > 0) {
      const [minX, minY, maxX, maxY] = bbox(featureCollection);
      mapBounds = new L.LatLngBounds([
        [minY, minX],
        [maxY, maxX],
      ]);
    }

    return (
      <Card
        sx={{
          height: "100%",
          background:
            "linear-gradient(90deg, #1976CD 4px, transparent 5px, transparent)",
        }}
      >
        <CardHeader title="Total de Geodata" subheader="Union de la geolocalización de todos los lotes" />
        <CardContent>
          <MapContainer
            bounds={mapBounds}
            style={{
              aspectRatio: 3,
              flexGrow: 1,
              width: "100%",
            }}
          >
            <GeoJSON key="cuack" data={featureCollection}>
              {/* <Popup>Hi!</Popup> */}
            </GeoJSON>

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </CardContent>
      </Card>
    );
  }

  return <LoadingMap />;
};

export { Map };

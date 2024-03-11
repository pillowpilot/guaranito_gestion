import React from "react";
import { Button, Paper, Stack, Box, Typography, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Image } from "mui-image";
import { Api } from "../../../api/client";
import { useQuery } from "react-query";
import { LoadingDetails, LoadingPreview } from "./Loading";
import { useNotification } from "../../../hooks/useNotification";
import { useInferenceJobUtils } from "../../../hooks/inference/useInferenceJobUtils";

const PageLayout = ({ details, preview }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Grid container columns={12}>
      <Grid item xs={0} sm={1} />
      <Grid item xs={12} sm={10}>
        <Paper sx={{ p: 5 }}>
          <Stack direction="column" gap={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {details}
              </Grid>
              <Grid item xs={12} md={6}>
                {preview}
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="space-around">
              <Button variant="outlined" onClick={() => navigate(-1)}>
                {t("inferences.details.goBackBtn")}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

const DetailsEntry = ({ label, value }) => {
  return (
    <Box>
      <Typography variant="h6">{label}</Typography>
      <Typography variant="body1" color="text.secondary">
        {value}
      </Typography>
    </Box>
  );
};

const Details = ({ data }) => {
  const { t } = useTranslation();
  const tx = (key) => t(`inferences.details.${key}`);
  const { displayModelName, displayStatus, displayDate } = useInferenceJobUtils();
  console.log("data", data);

  return (
    <Stack gap={1}>
      <Typography variant="h5">{tx("labels.detailsHeader")}</Typography>
      <Stack gap={1} sx={{ paddingLeft: 3 }}>
        <DetailsEntry label={tx("labels.lot")} value={data.lot_name} />
        <DetailsEntry
          label={tx("labels.model")}
          value={displayModelName(data.model_codename)}
        />
        <DetailsEntry
          label={tx("labels.status")}
          value={displayStatus(data.status)}
        />
        <DetailsEntry
          label={tx("labels.createdOn")}
          value={displayDate(
            data.created_at,
            "inferences.list.datagrid.dateFormat"
          )}
        />
        <DetailsEntry
          label={tx("labels.updatedOn")}
          value={displayDate(
            data.updated_at,
            "inferences.list.datagrid.dateFormat"
          )}
        />
      </Stack>
    </Stack>
  );
};

const Preview = ({ data }) => {
  const { t } = useTranslation();
  const imageUrl = data.image_thumbnail;
  return (
    <Stack>
      <Typography variant="h5">
        {t("inferences.details.labels.previewHeader")}
      </Typography>
      <Image
        src={imageUrl}
        showLoading={true}
        sx={{
          maxWidth: "600px",
          maxHeight: "600px",
        }}
      />
    </Stack>
  );
};

const InferenceDetailsPage = () => {
  const { id } = useParams();
  const { notifyError } = useNotification();

  const results = useQuery({
    queryKey: ["inferences", id],
    queryFn: () => Api.retrieveInference(id),
    onError: (error) => notifyError(error),
  });

  if (results.isSuccess)
    return (
      <PageLayout
        details={<Details data={results.data.data} />}
        preview={<Preview data={results.data.data} />}
      />
    );

  return (
    <PageLayout details={<LoadingDetails />} preview={<LoadingPreview />} />
  );
};

export default InferenceDetailsPage;

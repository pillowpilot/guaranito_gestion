import { Typography, Box, Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Api } from "../../../api/client";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { LoadingPropertyForm } from "./LoadingForm";
import { PropertyForm } from "./Form";
import { queryKeys } from "../queries";
import { useRetrieveProperty } from "../../../hooks/property/useRetrieveProperty";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="center">
      <Box sx={{ width: 500 }}>
        <Paper sx={{ p: 5 }}>
          <Stack gap={5}>
            <Typography variant="h4">
              {t("properties.details.header")}
            </Typography>
            {children}
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const formMethods = useForm();
  const { setError } = formMethods;

  const retrieveProperty = useRetrieveProperty({ id });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => Api.updateProperty(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.all);
      enqueueSnackbar(t("properties.details.updateSuccessMsg"), {
        variant: "success",
      });
    },
    onError: (error) => {
      if (error.response) {
        const data = error.response.data;
        if (data.detail) enqueueSnackbar(data.detail, { variant: "error" });
        if (data.name) setError("name", { type: "400", message: data.name });
      } else if (error.request) {
        enqueueSnackbar(t("errors.network.default"), { variant: "error" });
      } else {
        enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
      }
    },
  });

  if (retrieveProperty.isLoading)
    return (
      <PageLayout>
        <LoadingPropertyForm />
      </PageLayout>
    );

  return (
    <PageLayout>
      <PropertyForm
        data={retrieveProperty.data}
        mutation={mutation}
        formMethods={formMethods}
        errors={formMethods.errors}
      />
    </PageLayout>
  );
};

export default PropertyDetailsPage;

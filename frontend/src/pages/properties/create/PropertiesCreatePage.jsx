import React, { useContext } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { queryKeys } from "../queries";
import { Form } from "./Form";
import { Api } from "../../../api/client";
import AuthContext from "../../../contexts/AuthProvider";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="center">
      <Paper sx={{ p: 5 }}>
        <Stack gap={5}>
          <Typography variant="h4">{t("properties.create.header")}</Typography>
          {children}
        </Stack>
      </Paper>
    </Stack>
  );
};

const NewPropertyPage = () => {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);

  const formMethods = useForm();
  const { setError } = formMethods;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => Api.createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.all);
      enqueueSnackbar(t("properties.create.createSuccessMsg"), {
        variant: "success",
      });
    },
    onError: (error) => {
      if (error.response) {
        const data = error.response.data;
        if (data.detail) enqueueSnackbar(data.detail, { variant: "error" });
        if (data.name) setError("name", { type: "400", message: data.name });
        if (data.geodata)
          setError("geodata", { type: "400", message: data.geodata });
      } else if (error.request) {
        enqueueSnackbar(t("errors.network.default"), { variant: "error" });
      } else {
        enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
      }
    },
  });

  const onSubmit = (d) => {
    mutation.mutate({
      name: d.name,
      company: auth.company.id,
      // geodata: d.geodata,
    });
  };

  return (
    <PageLayout>
      <Form formMethods={formMethods} onSubmit={onSubmit} />
    </PageLayout>
  );
};

export { NewPropertyPage };

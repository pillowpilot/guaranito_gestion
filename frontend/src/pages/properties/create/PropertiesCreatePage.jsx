import React, { useContext } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { Api } from "../../../api/client";
import AuthContext from "../../../contexts/AuthProvider";
import { useNotification } from "../../../hooks/useNotification";
import { queryKeys } from "../queries";
import { Form } from "./Form";

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
  const { auth } = useContext(AuthContext);
  const { notifySuccess, notifyError } = useNotification();

  const formMethods = useForm();
  const { setError } = formMethods;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => Api.createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.all);
      notifySuccess("properties.create.createSuccessMsg");
    },
    onError: (error) => {
      notifyError(error);

      if (error.response) {
        const data = error.response.data;
        if (data.name) setError("name", { type: "400", message: data.name });
        if (data.geodata)
          setError("geodata", { type: "400", message: data.geodata });
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

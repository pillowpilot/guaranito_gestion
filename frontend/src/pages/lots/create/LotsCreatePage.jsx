import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Api } from "../../../api/client";
import { useTranslation } from "react-i18next";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { useNotification } from "../../../hooks/useNotification";

import LoadingForm from "./LoadingForm";
import Form from "./Form";
import { lotsKeys } from "../queries";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={10}>
      <Stack direction="row" justifyContent="center">
        <Paper sx={{ p: 5 }}>
          <Stack gap={5}>
            <Typography variant="h4">{t("lots.create.header")}</Typography>
            {children}
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
};

const NewLotPage = () => {
  const { t } = useTranslation();
  const formMethods = useForm();
  const { setError } = formMethods;
  const { notifySuccess, notifyError } = useNotification();

  const listPropertiesQuery = useQuery({
    queryKey: ["properties"],
    queryFn: Api.listProperties,
    onSuccess: (data) => {
      const results = data.data?.results;
      if (results.length === 0)
        setError("parcel", {
          type: "400",
          message: t("lots.create.noPropertiesErrorMsg"),
        });
    },
    onError: (error) => notifyError(error),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: Api.createLot,
    onSuccess: () => {
      queryClient.invalidateQueries(lotsKeys.all);
      notifySuccess("lots.create.createSuccessMsg");
    },
    onError: (error) => {
      notifyError(error);
      if (error.response) {
        const data = error.response.data;
        if (data.name) setError("name", { type: "400", message: data.name });
        if (data.parcel)
          setError("parcel", { type: "400", message: data.parcel });
        // if (data.geodata)
        //   setError("geodata", { type: "400", message: data.geodata });
      }
    },
  });

  if (listPropertiesQuery.isSuccess)
    return (
      <PageLayout>
        <Form
          t={t}
          properties={listPropertiesQuery.data?.data?.results}
          formMethods={formMethods}
          mutation={mutation}
        />
      </PageLayout>
    );

  return (
    <PageLayout>
      <LoadingForm t={t} />
    </PageLayout>
  );
};

export default NewLotPage;

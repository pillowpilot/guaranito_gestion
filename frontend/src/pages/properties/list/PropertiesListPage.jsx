import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { Api } from "../../../api/client";
import { DeleteDialog } from "../../../components/dialogs/DeleteInferenceDialog";
import {
  DataGridDetailsButton,
  DataGridMapButton,
} from "../../../components/buttons/Buttons";
import { DateCell } from "../../../components/datagrid/Cells";
import { LoadingDataGrid } from "./Loading";
import { PropertiesDataGrid } from "./DataGrid";
import { queryKeys } from "../queries";
import { useListProperties } from "../../../hooks/property/useListProperties";
import { useNotification } from "../../../hooks/useNotification";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        padding: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">{t("properties.list.header")}</Typography>
      {children}
      <Actions />
    </Paper>
  );
};

const Actions = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`new`}
        sx={{
          marginTop: 2,
        }}
      >
        {t("properties.list.newBtn")}
      </Button>
    </Box>
  );
};

const PropertiesPage = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { notifyError } = useNotification();

  const [propertyId, setPropertyId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const listProperties = useListProperties();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => Api.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.all);
      queryClient.invalidateQueries(["inferences"]);
      enqueueSnackbar(t("properties.delete.successMsg"), {
        variant: "success",
      });
    },
    onError: (error) => {
      notifyError(error);
    },
  });

  const columns = [
    { field: "id", headerName: t("properties.list.datagrid.id") },
    {
      field: "name",
      headerName: t("properties.list.datagrid.name"),
      width: 250,
    },
    {
      field: "created_on",
      headerName: t("properties.list.datagrid.date"),
      width: 200,
      renderCell: (params) => (
        <DateCell
          date={params.value}
          translationKey="properties.list.datagrid.dateFormat"
        />
      ),
    },
    {
      field: "updated_on",
      headerName: t("properties.list.datagrid.updatedOn"),
      width: 200,
      renderCell: (params) => (
        <DateCell
          date={params.value}
          translationKey="properties.list.datagrid.updatedOnFormat"
        />
      ),
    },
    {
      field: "actions",
      headerName: t("properties.list.datagrid.actions"),
      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row">
            <DataGridDetailsButton id={params.id} />
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => {
                setPropertyId(params.id);
                setDeleteDialogOpen(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
            {params.row.geodata ? <DataGridMapButton id={params.id} /> : <></>}
          </Stack>
        );
      },
    },
  ];

  if (listProperties.isSuccess)
    return (
      <PageLayout>
        <PropertiesDataGrid
          columns={columns}
          properties={listProperties.data}
        />
        <DeleteDialog
          open={deleteDialogOpen}
          text={t("properties.delete.confirmationMsg")}
          onAccept={() => {
            mutation.mutate(propertyId);
            setPropertyId(null);
            setDeleteDialogOpen(false);
          }}
          onAcceptLabel={t("properties.delete.deleteBtn")}
          onReject={() => {
            setDeleteDialogOpen(false);
          }}
          onRejectLabel={t("properties.delete.goBackBtn")}
        />
      </PageLayout>
    );

  return (
    <PageLayout>
      <LoadingDataGrid columns={columns} />
    </PageLayout>
  );
};

export default PropertiesPage;

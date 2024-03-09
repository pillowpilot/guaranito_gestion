import React, { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { PageLayout } from "./Layout";

const PropertiesPage = () => {
  const { t } = useTranslation();
  const { notifySuccess, notifyError } = useNotification();

  const [propertyId, setPropertyId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const listProperties = useListProperties();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => Api.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.all);
      queryClient.invalidateQueries(["inferences"]);
      notifySuccess("properties.delete.successMsg");
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

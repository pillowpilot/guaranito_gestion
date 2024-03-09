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

  const [propertyId, setPropertyIdToDelete] = useState(null);
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

  const idColumn = {
    field: "id",
    headerName: t("properties.list.datagrid.id"),
  };
  const propertyNameColumn = {
    field: "name",
    headerName: t("properties.list.datagrid.name"),
    width: 250,
  };
  const createdOnColumn = {
    field: "created_on",
    headerName: t("properties.list.datagrid.date"),
    width: 200,
    renderCell: (params) => (
      <DateCell
        date={params.value}
        translationKey="properties.list.datagrid.dateFormat"
      />
    ),
  };
  const updatedOnColumn = {
    field: "updated_on",
    headerName: t("properties.list.datagrid.updatedOn"),
    width: 200,
    renderCell: (params) => (
      <DateCell
        date={params.value}
        translationKey="properties.list.datagrid.updatedOnFormat"
      />
    ),
  };

  const buildOnClickHandler = (id) => {
    if (setDeleteDialogOpen && setPropertyIdToDelete)
      return () => {
        setPropertyIdToDelete(id);
        setDeleteDialogOpen(true);
      };
    else return () => {};
  };

  const actionsColumns = {
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
            onClick={buildOnClickHandler(params.id)}
          >
            <DeleteIcon />
          </IconButton>
          {params.row.geodata ? <DataGridMapButton id={params.id} /> : <></>}
        </Stack>
      );
    },
  };
  const columns = [
    idColumn,
    propertyNameColumn,
    createdOnColumn,
    updatedOnColumn,
    actionsColumns,
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
            setPropertyIdToDelete(null);
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

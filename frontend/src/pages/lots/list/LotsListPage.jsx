import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { Api } from "../../../api/client";
import { DeleteLotDialog } from "../../../components/dialogs/DeleteInferenceDialog";
import {
  DataGridDetailsButton,
  DataGridMapButton,
} from "../../../components/buttons/Buttons";
import { DateCell } from "../../../components/datagrid/Cells";
import { LoadingDataGrid } from "./Loading";
import { LotsDataGrid } from "./DataGrid";
import { lotsKeys } from "../queries";
import { useListLots } from "../../../hooks/lot/useListLots";
import { useNotification } from "../../../hooks/useNotification";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 5 }}>
      <Stack gap={2}>
        <Typography variant="h4">{t("lots.list.header")}</Typography>
        {children}
        <Actions />
      </Stack>
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
        {t("lots.list.newBtn")}
      </Button>
    </Box>
  );
};

const LotsPage = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { notifyError } = useNotification();

  const [lotId, setLotId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const listLots = useListLots();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => Api.deleteLot(id),
    onSuccess: () => {
      queryClient.invalidateQueries(lotsKeys.all);
      queryClient.invalidateQueries(["inferences"]);
      enqueueSnackbar(t("lots.delete.successMsg"), { variant: "success" });
    },
    onError: (error) => notifyError(error),
  });

  const columns = [
    { field: "id", headerName: t("lots.list.datagrid.id") },
    { field: "name", headerName: t("lots.list.datagrid.name"), width: 250 },
    {
      field: "property",
      headerName: t("lots.list.datagrid.property"),
      width: 250,
    },
    {
      field: "created_on",
      headerName: t("lots.list.datagrid.date"),
      width: 250,
      renderCell: (params) => (
        <DateCell
          date={params.value}
          translationKey="lots.list.datagrid.dateFormat"
        />
      ),
    },
    {
      field: "updated_on",
      headerName: t("lots.list.datagrid.updatedOn"),
      width: 250,
      renderCell: (params) => (
        <DateCell
          date={params.value}
          translationKey="lots.list.datagrid.updatedOnFormat"
        />
      ),
    },
    {
      field: "actions",
      headerName: t("lots.list.datagrid.actions"),
      width: 150,
      renderCell: (params) => (
        <>
          <DataGridDetailsButton id={params.id} />
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => {
              setLotId(params.id);
              setDeleteDialogOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
          {params.row.geodata ? <DataGridMapButton id={params.id} /> : <></>}
        </>
      ),
    },
  ];

  if (listLots.isSuccess)
    return (
      <PageLayout>
        <LotsDataGrid columns={columns} lots={listLots.data} />
        <DeleteLotDialog
          open={deleteDialogOpen}
          onAccept={() => {
            mutation.mutate(lotId);
            setLotId(null);
            setDeleteDialogOpen(false);
          }}
          onReject={() => {
            setDeleteDialogOpen(false);
          }}
        />
      </PageLayout>
    );

  return (
    <PageLayout>
      <LoadingDataGrid columns={columns} />
    </PageLayout>
  );
};

export default LotsPage;

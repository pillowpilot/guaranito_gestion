import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import {
  DateCell,
  CoordinateCell,
  StatusCell,
} from "../../../components/datagrid/Cells";
import { DataGridDetailsButton } from "../../../components/buttons/Buttons";

/**
 * Returns the column specification for the inference datatable.
 * Because the each row actions button set is rendered using this spec,
 * it consumes the optional setters 'setInferenceIdToDelete' and 'setDeleteDialogOpen'.
 * If the setters are not supplied, the loading specs are returned.
 */
const useInferencesColumnsSpecs = (
  { setInferenceIdToDelete, setDeleteDialogOpen } = {
    setInferenceIdToDelete: null,
    setDeleteDialogOpen: null,
  }
) => {
  const { t } = useTranslation();

  const idColumn = {
    field: "id",
    headerName: t("inferences.list.datagrid.id"),
    width: 35,
  };

  const userNameColumn = {
    field: "user_name",
    headerName: t("inferences.list.datagrid.user"),
    width: 200,
  };

  const lotColumn = {
    field: "lot_name",
    headerName: t("inferences.list.datagrid.lot"),
    width: 150,
  };

  const createOnColumn = {
    field: "date",
    headerName: t("inferences.list.datagrid.date"),
    width: 170,
    renderCell: (params) => (
      <DateCell
        date={params.value}
        translationKey="inferences.list.datagrid.dateFormat"
      />
    ),
  };

  const modelColumn = {
    field: "model",
    headerName: t("inferences.list.datagrid.model"),
    width: 250,
  };

  const coordsColumn = {
    field: "coords",
    headerName: t("inferences.list.datagrid.coordinates"),
    width: 150,
    renderCell: (params) => <CoordinateCell {...params.value} />,
  };

  const statusColumn = {
    field: "status",
    headerName: t("inferences.list.datagrid.status"),
    width: 150,
    renderCell: (params) => <StatusCell status={params.value} />,
  };

  const buildHandlerOnClick = (id) => {
    if (setDeleteDialogOpen && setInferenceIdToDelete)
      return () => {
        setInferenceIdToDelete(id);
        setDeleteDialogOpen(true);
      };
    else return () => {};
  };

  const actionsColumn = {
    field: "actionModify",
    headerName: t("inferences.list.datagrid.actions"),
    renderCell: (params) => (
      <>
        <DataGridDetailsButton id={params.id} icon={<SearchIcon />} />
        <IconButton
          variant="contained"
          color="primary"
          onClick={buildHandlerOnClick(params.id)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  };

  const columnsSpecs = [
    idColumn,
    userNameColumn,
    lotColumn,
    createOnColumn,
    modelColumn,
    coordsColumn,
    statusColumn,
    actionsColumn,
  ];

  return { columnsSpecs };
};

export { useInferencesColumnsSpecs };

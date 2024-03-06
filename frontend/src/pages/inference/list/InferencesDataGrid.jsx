import { Box } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useInferencesColumnsSpecs } from "./useInferencesColumnsSpecs";

/**
 * Renders a datagrid with a list of inferences
 */
const InferencesDataGrid = ({
  inferences,
  setInferenceIdToDelete,
  setDeleteDialogOpen,
}) => {
  const { i18n } = useTranslation();

  const { columnsSpecs } = useInferencesColumnsSpecs({
    setInferenceIdToDelete,
    setDeleteDialogOpen,
  });

  return (
    <Box>
      <DataGrid
        pageSizeOptions={[10, 25, 50, 100]}
        rows={inferences}
        columns={columnsSpecs}
        localeText={
          i18n.language === "es"
            ? esES.components.MuiDataGrid.defaultProps.localeText
            : enUS.components.MuiDataGrid.defaultProps.localeText
        }
        sx={{
          height: "500px",
        }}
      />
    </Box>
  );
};

InferencesDataGrid.propTypes = {
  /**
   * List of inferences (as objects) to display. Required.
   */
  inferences: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  /**
   * Setter of the inference id to delete. Required.
   * This setter is supplied down to the datagrid columns specs.
   * Elimination itself (mutation) is responsability of the parent.
   */
  setInferenceIdToDelete: PropTypes.func.isRequired,
  /**
   * Setter of the open/close state of the delete dialog.
   * It is supplied down to the datagrid columns specs.
   */
  setDeleteDialogOpen: PropTypes.func.isRequired,
};

export { InferencesDataGrid };

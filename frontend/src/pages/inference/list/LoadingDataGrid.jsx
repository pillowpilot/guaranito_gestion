import { Box } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useInferencesColumnsSpecs } from "./useInferencesColumnsSpecs";

/**
 * Renders a loading datagrid with the inferences column specifications.
 */
const LoadingDataGrid = () => {
  const { i18n } = useTranslation();
  const { columnsSpecs } = useInferencesColumnsSpecs();

  return (
    <Box>
      <DataGrid
        loading
        rows={[]}
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

export default LoadingDataGrid;

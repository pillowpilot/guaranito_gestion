import { Box } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

const PropertiesDataGrid = ({ columns, properties }) => {
  const { i18n } = useTranslation();

  return (
    <Box>
      <DataGrid
        pageSizeOptions={[10, 25, 50, 100]}
        rows={properties}
        columns={columns}
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

export { PropertiesDataGrid };

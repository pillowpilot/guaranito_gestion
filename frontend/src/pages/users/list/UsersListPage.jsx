import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Stack, Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { DataGridDetailsButton } from "../../../components/buttons/Buttons";
import { Loading } from "./Loading";
import { useListUsers } from "../../../hooks/user/useListUsers";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 5 }}>
      <Stack gap={2}>
        <Typography variant="h4">{t("users.list.header")}</Typography>
        {children}
        <Actions />
      </Stack>
    </Paper>
  );
};

const nameWithAvatarRenderingFunction = (params) => {
  const name = params.formattedValue;
  return (
    <Box>
      <Stack gap={1} direction="row" alignItems="center">
        <Avatar>{name.charAt(0)}</Avatar>
        {name}
      </Stack>
    </Box>
  );
};

const UsersDataGrid = ({  users }) => {
  const { t, i18n } = useTranslation();

  const columns = [
    { field: "id", headerName: t("users.list.datagrid.id") },
    {
      field: "firstname",
      headerName: t("users.list.datagrid.name"),
      width: 250,
      renderCell: nameWithAvatarRenderingFunction,
    },
    {
      field: "lastname",
      headerName: t("users.list.datagrid.lastname"),
      width: 200,
    },
    { field: "role", headerName: t("users.list.datagrid.role") },
    { field: "email", headerName: t("users.list.datagrid.email"), width: 200 },
    {
      field: "actions",
      headerName: t("users.list.datagrid.actions"),
      renderCell: (params) => <DataGridDetailsButton id={params.id} />,
    },
  ];

  return (
    <Box>
      <DataGrid
        pageSizeOptions={[10, 25, 50, 100]}
        rows={users}
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

const Actions = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`new`}
        sx={{
          marginTop: 2,
        }}
      >
        {t("users.list.newBtn")}
      </Button>
    </Box>
  );
};

const UsersPage = () => {
  const listUsers = useListUsers();

  if (listUsers.isSuccess)
    return (
      <PageLayout>
        <UsersDataGrid users={listUsers.data} />
      </PageLayout>
    );

  return (
    <PageLayout>
      <Loading />
    </PageLayout>
  );
};

export default UsersPage;

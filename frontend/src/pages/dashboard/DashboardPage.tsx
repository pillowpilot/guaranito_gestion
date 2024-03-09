import { Stack, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Loading } from "./Loading";
import { Api } from "../../api/client";
import { Map } from "./Map";
import { TotalCard } from "../../components/cards/TotalCard";
import { LinesGraphCard } from "./LinesGraphCard";
import { PieGraphCard } from "./PieGraphCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const manageErrorsFromQuery = (t, error, enqueueSnackbar) => {
  if (error.response) {
    enqueueSnackbar(error.response.data.detail, { variant: "error" });
  } else if (error.request) {
    enqueueSnackbar(t("errors.network.default"), { variant: "error" });
  } else {
    enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
  }
};

const DashboardPage = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const inferencesTotal = useQuery({
    queryKey: ["inferences", "total"],
    queryFn: Api.retrieveTotalNumberOfInferences,
    onError: (error) => {
      manageErrorsFromQuery(t, error, enqueueSnackbar);
    },
  });

  // const lotsTotal = useQuery({
  //   queryKey: ["lots", "total"],
  //   queryFn: Api.retrieveTotalNumberOfLots,
  //   onError: (error) => {
  //     manageErrorsFromQuery(t, error, enqueueSnackbar);
  //   },
  // });

  // const propertiesTotal = useQuery({
  //   queryKey: ["properties", "total"],
  //   queryFn: Api.retrieveTotalNumberOfProperties,
  //   onError: (error) => {
  //     manageErrorsFromQuery(t, error, enqueueSnackbar);
  //   },
  // });

  if (
    inferencesTotal.isSuccess // &&
    // lotsTotal.isSuccess &&
    // propertiesTotal.isSuccess
  ) {
    const dashboardData = {
      total: {
        inferences: inferencesTotal.data.data.total,
        // lots: lotsTotal.data.data.total,
        // properties: propertiesTotal.data.data.total,
      },
    };

    return (
      <Container>
        <Stack gap={5}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={3}
            columns={{ xs: 1, md: 12 }}
            sx={{ px: 5 }}
            disableEqualOverflow
          >
            <Grid xs={1} md={4} sx={{ flexGrow: 1 }}>
              <TotalCard
                title="Total de Lotes"
                subtitle="lorem ipsum"
                content="LOTS"
              />
            </Grid>

            <Grid xs={1} md={4} sx={{ flexGrow: 1 }}>
              <TotalCard
                title="Total de Inferencias"
                subtitle="lorem ipsum"
                content={dashboardData.total.inferences}
              />
            </Grid>

            <Grid xs={1} md={4} sx={{ flexGrow: 1 }}>
              <TotalCard
                title="Total de Fincas"
                subtitle="lorem ipsum"
                content="PROPERTIES"
              />
            </Grid>
          </Grid>

          {/* Plots */}
          <Grid
            container
            rowSpacing={3}
            columnSpacing={3}
            columns={{ xs: 1, md: 12 }}
            sx={{ px: 5 }}
            disableEqualOverflow
          >
            <Grid xs={1} md={8}>
              <LinesGraphCard title="Gráfico Lines" subtitle="lorem ipsum" />
            </Grid>

            <Grid xs={1} md={4}>
              <PieGraphCard title="Gráfico Pie" subtitle="lorem ipsum" />
            </Grid>

            <Grid xs={1} md={12}>
              <Map />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    );
  }

  return <Loading />;
};

export default DashboardPage;

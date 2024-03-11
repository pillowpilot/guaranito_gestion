import { Stack, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
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
import { Map } from "./Map";
import { TotalCard } from "../../components/cards/TotalCard";
import { LinesGraphCard } from "./LinesGraphCard";
import { PieGraphCard } from "./PieGraphCard";
import { useGetDashboardStatistics } from "../../hooks/useGetDashboardStatistics";

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

const DashboardPage = () => {
  const { inferencesTotal, lotsTotal, propertiesTotal } =
    useGetDashboardStatistics();

  if (
    inferencesTotal.isSuccess &&
    lotsTotal.isSuccess &&
    propertiesTotal.isSuccess
  ) {
    const dashboardData = {
      total: {
        inferences: inferencesTotal.data.data.total,
        lots: lotsTotal.data.data.total,
        properties: propertiesTotal.data.data.total,
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
                content={dashboardData.total.lots}
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
                content={dashboardData.total.properties}
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

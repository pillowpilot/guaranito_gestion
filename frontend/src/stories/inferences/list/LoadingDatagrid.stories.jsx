import { withRouter } from "storybook-addon-react-router-v6";
import LoadingDataGrid from "../../../pages/inference/list/LoadingDataGrid";

export default {
  title: "Inference/list/LoadingDataGrid",
  component: LoadingDataGrid,
  decorators: [withRouter],
};

export const Loading = {
  render: () => <LoadingDataGrid />,
};


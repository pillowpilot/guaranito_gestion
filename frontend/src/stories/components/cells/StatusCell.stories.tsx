import { StatusCell } from "../../../components/datagrid/Cells";

export default {
  title: "Components/StatusCell",
  component: StatusCell,
  tags: ["autodocs"],
};

export const Success = {
  args: {
    status: "SUCCESS",
  },
};

export const Failure = {
  args: {
    status: "FAILURE",
  },
};

export const Pending = {
  args: {
    status: "PENDING",
  },
};

export const Processing = {
  args: {
    status: "PROCESSING",
  },
};

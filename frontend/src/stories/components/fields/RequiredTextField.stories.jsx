import { RequiredTextField } from "../../../components/fields/RequiredTextField";

export default {
  title: "Components/RequiredTextField",
  component: RequiredTextField,
  tags: ["autodocs"],
};

export const Empty = {
  args: {
    register: () => {},
    name: "name",
    labelKey: "users.create.labels.name",
    requiredKey: "users.create.errors.requiredName",
  },
};

export const WithServerError = {
  args: {
    register: () => {},
    name: "name",
    labelKey: "users.create.labels.name",
    requiredKey: "users.create.errors.requiredName",
    hasServerError: true,
    errorMsg: "server send this error",
  },
};

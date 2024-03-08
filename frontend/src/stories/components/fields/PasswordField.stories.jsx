import { PasswordField } from "../../../components/fields/PasswordField";

export default {
  title: "Components/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
};

export const Empty = {
  args: {
    register: () => {},
    name: "password",
    labelKey: "users.create.labels.password",
    requiredKey: "users.create.errors.requiredPassword",
  },
};

export const WithServerError = {
  args: {
    register: () => {},
    name: "password",
    labelKey: "users.create.labels.password",
    requiredKey: "users.create.errors.requiredPassword",
    hasServerError: true,
    errorMsg: "server send this error",
  },
};

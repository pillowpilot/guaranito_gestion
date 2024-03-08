import { UserDataForm } from "../../../pages/users/create/Form";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  title: "User/create/Form",
  component: UserDataForm,
  tags: ["autodocs"],
  decorators: [
    withRouter,
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export const Empty = {
  args: {
    formMethods: {
      register: () => {},
      handleSubmit: () => {},
    },
    mutation: {
      mutate: () => {},
    },
    errors: {},
  },
};

export const FullErrors = {
  args: {
    formMethods: {
      register: () => {},
      handleSubmit: () => {},
    },
    mutation: {
      mutate: () => {},
    },
    errors: {
      name: { message: "Server error response - name" },
      lastname: { message: "Server error response - lastname" },
      email: { message: "Server error response - email" },
      password: { message: "Server error response - password" },
    },
  },
};

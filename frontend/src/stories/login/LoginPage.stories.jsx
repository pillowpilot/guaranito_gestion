import LoginPage from "../../pages/login/LoginPage";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  title: "Login/LoginPage",
  component: LoginPage,
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

export const Primary = {
  args: {},
};

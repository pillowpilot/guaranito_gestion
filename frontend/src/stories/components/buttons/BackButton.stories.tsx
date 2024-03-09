import { withRouter } from "storybook-addon-react-router-v6";
import { BackButton } from "../../../components/buttons/BackButton";

export default {
  title: "Components/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  decorators: [withRouter],
};

export const Primary = {
  args: { labelKey: "properties.create.goBackBtn", onClick: () => {} },
};

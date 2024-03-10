import { SubmitButton } from "../../../components/buttons/SubmitButton";
import SendIcon from "@mui/icons-material/Send";

export default {
  title: "Components/SubmitButton",
  component: SubmitButton,
  tags: ["autodocs"],
};

export const Primary = {
  args: { labelKey: "properties.create.saveBtn" },
};

export const WithEndIcon = {
  args: { labelKey: "properties.create.saveBtn", endIcon: <SendIcon /> },
};

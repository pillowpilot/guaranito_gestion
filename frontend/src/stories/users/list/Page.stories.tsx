import { StoryFn } from "@storybook/react";
// @ts-expect-error TODO 
import { ListUsers } from "../../../pages/users/";
import { withRouter } from "storybook-addon-react-router-v6";
import { QueryClient, QueryClientProvider } from "react-query";

export default {
  title: "User/list/Page",
  component: ListUsers,
  tags: ["autodocs"],
  decorators: [
    withRouter,
    (Story: StoryFn) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export const Primary = {
  args: {},
};

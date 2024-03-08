import { SnackbarProvider } from "notistack";
import { useNotification } from "../../../hooks/useNotification";
import PropTypes from "prop-types";

export default {
  title: "Components/useNotification",

  decorators: [
    (Story) => {
      return (
        <SnackbarProvider>
          <Story />
        </SnackbarProvider>
      );
    },
  ],
};

export const NotifySuccess = {
  render: ({ messageKey }) => {
    const { notifySuccess } = useNotification();

    const handleClick = () => {
      notifySuccess(messageKey);
    };

    return <button onClick={handleClick}>Click Me!</button>;
  },
  argTypes: {
    messageKey: {
      options: ["users.create.successMsg", "users.details.successMsg"],
      control: { type: "select" },
    },
  },
};

const NotifyError = ({ error }) => {
  const { notifyError } = useNotification();

  const handleClick = () => {
    notifyError(error);
  };

  return <button onClick={handleClick}>Click Me!</button>;
};

NotifyError.propTypes = {
  error: PropTypes.object.isRequired,
};

export const NotifyServerError = {
  render: ({ error }) => <NotifyError error={error} />,
  argTypes: {
    error: {
      options: ["server-error", "network-error", "unknow-error"],
      mapping: {
        "server-error": {
          response: { data: { detail: "Message from server" } },
        },
        "network-error": { request: {} },
        "unknow-error": {},
      },
      control: { type: "select" },
    },
  },
};

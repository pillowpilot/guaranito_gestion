import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
// eslint-disable-next-line no-unused-vars
import { AxiosError } from "axios";

interface ServerErrorType {
  detail: string;
}

const useNotification = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Shows a snackbar with an error message.
   * Expects a field 'details' in case of a api error.
   *
   * Follows the Axios recommended error handling.
   * See: https://axios-http.com/docs/handling_errors
   *
   * @param {AxiosError} error
   */
  const notifyError = (error: AxiosError<ServerErrorType>) => {
    if (error.response) {
      if (error.response.status >= 500) {
        enqueueSnackbar(t("errors.unknown.default"), { variant: "error" }); // TODO Add server error dedicated message
      } else {
        const data = error.response.data;
        if (data.detail) enqueueSnackbar(data.detail, { variant: "error" });
      }
    } else if (error.request) {
      enqueueSnackbar(t("errors.network.default"), { variant: "error" });
    } else {
      enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
    }
  };

  /**
   * Shows a snackbar with a custom success message.
   * Expects an i18n key. See src/i18n.
   *
   * @param {string} key i18n key to display. Eg: users.create.successMsg
   */
  const notifySuccess = (key: string) => {
    enqueueSnackbar(t(key), { variant: "success" });
  };

  return { notifyError, notifySuccess };
};

export { useNotification };

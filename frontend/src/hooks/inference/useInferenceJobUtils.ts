import { useTranslation } from "react-i18next";

type ModelCodename = "leafs" | "fruits" | "trees";
type StatusOptions = "pending" | "processing" | "success" | "failure";

const useInferenceJobUtils = () => {
  const { t } = useTranslation();

  const displayModelName = (codename: ModelCodename) => {
    switch (codename) {
      case "leafs":
        return t("inferences.models.leafs");
      case "fruits":
        return t("inferences.models.fruits");
      case "trees":
        return t("inferences.models.trees");
    }
  };

  const displayStatus = (status: StatusOptions) => {
    switch (status) {
      case "pending":
        return t("inferences.list.labels.pendingStatus");
      case "processing":
        return t("inferences.list.labels.processingStatus");
      case "success":
        return t("inferences.list.labels.successStatus");
      case "failure":
        return t("inferences.list.labels.successStatus");
    }
  };

  const displayDate = (date: string, translationKey: string) => {
    return t(translationKey, {
      val: new Date(date),
      formatParams: {
        val: {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
        },
      },
    });
  };

  return { displayModelName, displayStatus, displayDate };
};

export { useInferenceJobUtils };

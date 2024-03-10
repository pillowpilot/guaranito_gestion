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
        return t("inference.list.labels.processingStatus");
      case "success":
        return t("inference.list.labels.successStatus");
      case "failure":
        return t("inference.list.labels.successStatus");
    }
  };

  return { displayModelName, displayStatus };
};

export { useInferenceJobUtils };

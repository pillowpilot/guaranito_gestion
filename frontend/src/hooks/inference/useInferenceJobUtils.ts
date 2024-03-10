import { useTranslation } from "react-i18next";

type ModelCodename = "leafs" | "fruits" | "trees";

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

  return { displayModelName };
};

export { useInferenceJobUtils };

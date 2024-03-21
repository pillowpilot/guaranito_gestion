import { useQuery } from "react-query";
import { useNotification, ServerErrorType } from "../useNotification";
import { Api } from "../../api/client";
import { AxiosError } from "axios";

const useListInferenceModels = () => {
  const { notifyError } = useNotification();

  const listModels = useQuery({
    queryKey: ["inferencemodels"],
    queryFn: Api.listInferenceModels,
    select: (response) => {
      const data = response.data;
      const results = data.results;
      const clean = results.map((model) => ({
        id: model.id,
        name: model.name,
        created_at: model.created_at,
        updated_at: model.updated_at,
      }));
      return clean;
    },
    onError: (error: AxiosError<ServerErrorType>) => notifyError(error),
  });

  return listModels;
};

export { useListInferenceModels };

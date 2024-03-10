import { useQuery } from "react-query";
import { useNotification } from "../useNotification";
import { Api } from "../../api/client";

const LIST_INFERENCE_QK = ["inferences"];

/**
 * Returns list of inferences and cleans it.
 */
const useListInferences = () => {
  const { notifyError } = useNotification();

  const listInferences = useQuery({
    queryKey: LIST_INFERENCE_QK,
    queryFn: Api.listInferences,
    select: (response) => {
      const results = response.data.results;
      const clean = results.map((job) => ({
        id: job.id,
        user_name: job.user,
        lot_name: "",
        date: job.created_at,
        updated_on: job.updated_at,
        model: "",
        task_id: "",
        status: "",
        coords: "",
        // job.latitude !== null && job.longitude != null
        //   ? { lat: job.latitude, lon: job.longitude }
        //   : null,
      }));
      return clean;
    },
    onError: (error) => notifyError(error),
  });

  return listInferences;
};

export { useListInferences };
import { useQuery } from "react-query";
import { useNotification } from "../useNotification";
import { Api } from "../../api/client";
import { capitalizeEachWord } from "../../utils/utils";

const LIST_INFERENCE_QK = ["inferences"];

/**
 * Returns list of inferences and cleans it.
 */
const useListInferences = () => {
  const { notifyError } = useNotification();

  const listInferences = useQuery({
    queryKey: LIST_INFERENCE_QK,
    queryFn: Api.listInferences,
    select: (data) => {
      const clean = data.data.results.map((o) => ({
        id: o.id,
        user_name: o.user?.email,
        lot_name: o.lot_name,
        date: o.created_on,
        updated_on: o.updated_on,
        model: capitalizeEachWord(o.model),
        task_id: o.task_id,
        status: capitalizeEachWord(o.status),
        coords:
          o.latitude !== null && o.longitude != null
            ? { lat: o.latitude, lon: o.longitude }
            : null,
      }));
      return clean;
    },
    onError: (error) => notifyError(error),
  });

  return listInferences;
};

export { useListInferences };

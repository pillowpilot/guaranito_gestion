import { useQuery } from "react-query";
import { useNotification } from "../useNotification";
import { Api } from "../../api/client";

const LIST_PROPERTIES_QK = ["properties"];

/**
 * List all properties and cleans it
 */
const useListProperties = () => {
  const { notifyError } = useNotification();

  const listProperties = useQuery({
    queryKey: LIST_PROPERTIES_QK,
    queryFn: Api.listProperties,
    select: (response) => {
      const data = response.data;
      const clean = data.results.map((o) => ({
        id: o.id,
        name: o.name,
        company: o.company,
        created_on: o.created_at,
        updated_on: o.updated_at,
      }));
      return clean;
    },
    onError: (error) => notifyError(error),
  });

  return listProperties;
};

export { useListProperties };

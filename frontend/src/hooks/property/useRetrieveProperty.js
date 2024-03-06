import { useQuery } from "react-query";
import { useNotification } from "../useNotification";
import { Api } from "../../api/client";

/**
 * Retrieves property data and cleans it
 */
const useRetrieveProperty = ({ id }) => {
  const { notifyError } = useNotification();

  const retrieveProperty = useQuery({
    queryKey: ["properties", id],
    queryFn: () => Api.retrieveProperty(id),
    select: data => {
      const clean = data.data;
      return clean;
    },
    onError: (error) => notifyError(error),
  });
  
  return retrieveProperty;
};

export { useRetrieveProperty };

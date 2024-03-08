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
    select: (data) => {
      console.log("data", data);
      const clean= data.data?.results?.map((o) => ({
        id: o.id,
        name: o.name,
        company: o.company_name,
        geodata: o.geodata,
        created_on: o.created_on,
        updated_on: o.updated_on,
      }));
      console.log(clean);
      return clean;
    },
    onError: (error) => notifyError(error),
  });

  return listProperties;
};

export { useListProperties };

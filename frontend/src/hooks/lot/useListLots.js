import { useQuery } from "react-query";
import { useNotification } from "../useNotification";
import { Api } from "../../api/client";

const LIST_USERS_QK = ["lots"];

const useListLots = () => {
  const { notifyError } = useNotification();

  const listLots = useQuery({
    queryKey: LIST_USERS_QK,
    queryFn: Api.listLots,
    select: (response) => {
      const data = response.data;
      const clean = data.results.map((o) => ({
        id: o.id,
        name: o.name,
        property: o.parcel,
        geodata: o.geodata,
        created_on: o.created_at,
        updated_on: o.updated_at,
      }));
      return clean;
    },
    onError: (error) => notifyError(error),
  });
  return listLots;
};

export { useListLots };

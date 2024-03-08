import { useQuery } from "react-query";
import { useNotification } from "../useNotification";
import { Api } from "../../api/client";

const LIST_USERS_QK = ["lots"];

const useListLots = () => {
  const { notifyError } = useNotification();

  const listLots = useQuery({
    queryKey: LIST_USERS_QK,
    queryFn: Api.listLots,
    select: (data) => {
      const clean = data.data.results?.map((o) => ({
        id: o.id,
        name: o.name,
        property: o.parcel_name,
        geodata: o.geodata,
        created_on: o.created_on,
        updated_on: o.updated_on,
      }));
      return clean;
    },
    onError: (error) => notifyError(error),
  });
  return listLots;
};

export { useListLots };

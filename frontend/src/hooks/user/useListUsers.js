import { useQuery } from "react-query";
import { useNotification } from "../useNotification";
import { Api } from "../../api/client";

const LIST_USERS_QK = ["users"];

const useListUsers = () => {
  const { notifyError } = useNotification();

  const listUsers = useQuery({
    queryKey: LIST_USERS_QK,
    queryFn: Api.listUsers,
    select: (data) => {
      const clean = data.data.results?.map((o) => ({
        id: o.id,
        firstname: o.first_name,
        lastname: o.last_name,
        role: o.is_company_manager ? "Manager" : "User",
        email: o.email,
      }));
      return clean;
    },
    onError: (error) => {
      notifyError(error);
    },
  });

  return listUsers;
};

export { useListUsers };

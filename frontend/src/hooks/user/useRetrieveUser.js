import { useQuery } from "react-query";
import { useNotification } from "../useNotification";
import { Api } from "../../api/client";

/**
 * Retrieves users data and cleans it
 * 
 * @param {number} id User's id
 * @returns 
 */
const useRetrieveUser = ({ id }) => {
  const { notifyError } = useNotification();

  const retrieveUser = useQuery({
    queryKey: ["users", id],
    queryFn: () => Api.retrieveUser(id),
    select: (data) => {
      return data.data;
    },
    onError: (error) => {
      notifyError(error);
    },
  });

  return retrieveUser;
};

export { useRetrieveUser };

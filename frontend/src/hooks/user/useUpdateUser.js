import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import AuthContext from "../../contexts/AuthProvider";
import { useNotification } from "../useNotification";
import { Api } from "../../api/client";

/**
 * Updates an users data
 */
const useUpdateUser = ({ id, setError }) => {
  const { auth } = useContext(AuthContext);
  const { notifySuccess, notifyError } = useNotification();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => Api.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      notifySuccess("users.details.successMsg");
    },
    onError: (error) => {
      if (error.response) {
        const data = error.response.data;
        if (data.name) setError("name", { type: "400", message: data.name });
        if (data.lastname)
          setError("lastname", { type: "400", message: data.lastname });
        if (data.email) setError("email", { type: "400", message: data.email });
        if (data.password)
          setError("password", { type: "400", message: data.password });
      }
      notifyError(error);
    },
  });

  /**
   * Do update
   * @param {*} d Updated form data to send
   */
  const doUpdate = (d) => {
    mutation.mutate({
      first_name: d.name,
      last_name: d.lastname,
      email: d.email,
      password: d.password,
      company: auth.company,
    });
  };

  doUpdate.propTypes = {
    formData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      company: PropTypes.number.isRequired,
      password: PropTypes.string,
    }),
  };

  return { doUpdate };
};

useUpdateUser.propTypes = {
  /**
   * Id of the user to update
   */
  id: PropTypes.number.isRequired,
  /**
   * Handler that collects all form errors (including server-side)
   */
  setError: PropTypes.func.isRequired,
};

export { useUpdateUser };

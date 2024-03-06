import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { Api } from "../../../api/client";
import { UploadProfilePicture } from "./UploadProfilePicture";
import { UserDataForm } from "./Form";
import { useNotification } from "../../../hooks/useNotification";
import { Layout } from "./Layout";

const UserNewPage = () => {
  const { notifyError, notifySuccess } = useNotification();

  const formMethods = useForm();
  const { setError } = formMethods;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => Api.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      notifySuccess("users.create.successMsg");
    },
    onError: (error) => {
      if (error.response) {
        const data = error.response.data;
        if (data.name) setError("name", { type: "400", message: data.name[0] });
        if (data.lastname)
          setError("lastname", { type: "400", message: data.lastname[0] });
        if (data.email) setError("email", { type: "400", message: data.email[0] });
        if (data.password)
          setError("password", { type: "400", message: data.password[0] });
      }
      notifyError(error);
    },
  });

  return (
    <Layout
      profilePicture={<UploadProfilePicture />}
      form={
        <UserDataForm
          formMethods={formMethods}
          mutation={mutation}
          errors={formMethods.formState.errors}
        />
      }
    ></Layout>
  );
};

export default UserNewPage;

import { Stack } from "@mui/material";
import { RequiredTextField } from "../../../components/fields/RequiredTextField";
import { useNavigate } from "react-router-dom";
import { useUpdateUser } from "../../../hooks/user/useUpdateUser";
import { PasswordField } from "../../../components/fields/PasswordField";
import { BackButton } from "../../../components/buttons/BackButton";
import { SubmitButton } from "../../../components/buttons/SubmitButton";

const UserDataForm = ({ data, formMethods }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = formMethods;

  const { doUpdate } = useUpdateUser({ id: data.id, setError: setError });

  return (
    <form onSubmit={handleSubmit(doUpdate)}>
      <Stack
        spacing={3}
        sx={{
          minWidth: { xs: 0, sm: "290px" },
        }}
      >
        <RequiredTextField
          register={register}
          name="name"
          labelKey="users.details.labels.name"
          requiredKey="users.details.errors.requiredName"
          hasServerError={!!errors.name}
          errorMsg={errors.name?.message}
          defaultValue={data.first_name}
        />
        <RequiredTextField
          register={register}
          name="lastname"
          labelKey="users.details.labels.lastname"
          requiredKey="users.details.errors.requiredLastname"
          hasServerError={!!errors.lastname}
          errorMsg={errors.lastname?.message}
          defaultValue={data.last_name}
        />
        <RequiredTextField
          register={register}
          name="email"
          labelKey="users.details.labels.email"
          requiredKey="users.details.errors.requiredEmail"
          hasServerError={!!errors.email}
          errorMsg={errors.email?.message}
          defaultValue={data.email}
        />
        <PasswordField
          register={register}
          name="password"
          labelKey="users.details.labels.password"
          requiredKey="users.details.errors.requiredPassword"
          hasServerError={!!errors.password}
          errorMsg={errors.password?.message}
        />
        <Stack direction="row" justifyContent="center" gap={1}>
          <BackButton
            labelKey="properties.details.goBackBtn"
            onClick={() => navigate(-1)}
          />
          <SubmitButton labelKey="users.details.saveBtn" />
        </Stack>
      </Stack>
    </form>
  );
};

export { UserDataForm };

import { useContext } from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthProvider";
import { RequiredTextField } from "../../../components/fields/RequiredTextField";
import { PasswordField } from "../../../components/fields/PasswordField";
import { BackButton } from "../../../components/buttons/BackButton";
import { SubmitButton } from "../../../components/buttons/SubmitButton";

/**
 * Renders user's form
 */
const UserDataForm = ({ formMethods, errors, mutation }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const { register, handleSubmit } = formMethods;

  const onSubmit = (d) => {
    mutation.mutate({
      first_name: d.name,
      last_name: d.lastname,
      email: d.email,
      password: d.password,
      company: auth.company,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          minWidth: { xs: 0, sm: "290px" },
        }}
      >
        <RequiredTextField
          register={register}
          name="name"
          labelKey="users.create.labels.name"
          requiredKey="users.create.errors.requiredName"
          hasServerError={!!errors.name}
          errorMsg={errors.name?.message}
        />
        <RequiredTextField
          register={register}
          name="lastname"
          labelKey="users.create.labels.lastname"
          requiredKey="users.create.errors.requiredLastname"
          hasServerError={!!errors.lastname}
          errorMsg={errors.lastname?.message}
        />
        <RequiredTextField
          register={register}
          name="email"
          labelKey="users.create.labels.email"
          requiredKey="users.create.errors.requiredEmail"
          hasServerError={!!errors.email}
          errorMsg={errors.email?.message}
        />
        <PasswordField
          register={register}
          name="password"
          labelKey="users.create.labels.password"
          requiredKey="users.create.errors.requiredPassword"
          hasServerError={!!errors.password}
          errorMsg={errors.password?.message}
        />
        <Stack direction="row" spacing={2}>
          <BackButton
            labelKey="properties.create.goBackBtn"
            onClick={() => navigate(-1)}
          />
          <SubmitButton labelKey="users.create.saveBtn" />
        </Stack>
      </Stack>
    </form>
  );
};

export { UserDataForm };

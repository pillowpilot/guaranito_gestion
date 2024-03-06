import { useContext } from "react";
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../../contexts/AuthProvider";
import { RequiredTextField } from "../../../components/fields/RequiredTextField";
import { PasswordField } from "../../../components/fields/PasswordField";

/**
 * Renders user's form
 */
const UserDataForm = ({ formMethods, errors, mutation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const { register, handleSubmit } = formMethods;

  const onSubmit = (d) => {
    mutation.mutate({
      first_name: d.name,
      last_name: d.lastname,
      email: d.email,
      password: d.password,
      company: auth.company.id,
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
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("properties.create.goBackBtn")}
          </Button>
          <Button variant="contained" type="submit">
            {t("users.create.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

UserDataForm.propTypes = {
  /**
   * Set of helper functions related to the form
   */
  formMethods: PropTypes.shape({
    /**
     * Helper function to register fields into RHF
     */
    register: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }),
  mutation: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }),
  /**
   * Object with form errors
   */
  errors: PropTypes.shape({
    name: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    lastname: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    email: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    password: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export { UserDataForm };

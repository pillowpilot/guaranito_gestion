import { useState, useContext, useEffect } from "react";
import {
  Button,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RequiredTextField } from "../../../components/fields/RequiredTextField";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../../contexts/AuthProvider";
import { useUpdateUser } from "../../../hooks/user/useUpdateUser";

const UserDataForm = ({ data, formMethods, mutation, errors = {} }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const { auth } = useContext(AuthContext);
  
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitSuccessful },
  } = formMethods;

  const { doUpdate } = useUpdateUser({ id: data.id, setError: setError });

  // const onSubmit = (d) => {
  //   mutation.mutate({
  //     first_name: d.name,
  //     last_name: d.lastname,
  //     email: d.email,
  //     password: d.password,
  //     company: auth.company,
  //   });
  // };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        password: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

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
        {/* <TextField
          label={t("users.details.labels.name")}
          {...register("name", {
            required: t("users.details.errors.requiredName"),
          })}
          defaultValue={data?.first_name}
          error={!!errors.name}
          helperText={errors.name?.message}
        /> */}
        <TextField
          label={t("users.details.labels.lastname")}
          {...register("lastname", {
            required: t("users.details.errors.requiredLastname"),
          })}
          defaultValue={data?.last_name}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
        />
        <TextField
          label={t("users.details.labels.email")}
          {...register("email", {
            required: t("users.details.errors.requiredEmail"),
          })}
          defaultValue={data?.email}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          type={showPassword ? "input" : "password"}
          label={t("users.details.labels.password")}
          {...register("password", {
            required: t("users.details.errors.requiredPassword"),
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" justifyContent="center" gap={1}>
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("properties.details.goBackBtn")}
          </Button>
          <Button variant="contained" type="submit">
            {t("users.details.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

UserDataForm.propTypes = {
  /**
   * Users data
   */
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  /**
   * Form errors, if any
   */
  errors: PropTypes.shape({
    name: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
  /**
   * Mutation methods
   */
  mutation: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }),
  /**
   * React Hoork Forms related functions
   */
  formMethods: PropTypes.shape({
    register: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    formState: {
      isSubmitSuccessful: PropTypes.bool.isRequired,
    },
  }),
};

export { UserDataForm };

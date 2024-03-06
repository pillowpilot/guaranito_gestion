import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

/**
 * Renders a password field for forms. Its state is manage by RHF.
 */
const PasswordField = ({
  register,
  name,
  labelKey,
  requiredKey,
  hasServerError = false,
  errorMsg = "",
}) => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      type={showPassword ? "input" : "password"}
      label={t(labelKey)}
      {...register(name, {
        required: t(requiredKey),
      })}
      error={!!hasServerError}
      helperText={errorMsg}
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
  );
};

PasswordField.propTypes = {
  /**
   * Form registration function (from {register} = useForm()). Required.
   */
  register: PropTypes.func.isRequired,
  /**
   * Field name. The field will be registered by this name. Required.
   */
  name: PropTypes.string.isRequired,
  /**
   * Label i18n key. Eg: "users.create.labels.password". See src/i18n. Required.
   */
  labelKey: PropTypes.string.isRequired,
  /**
   * Error message *key* if the field is empty. Client-side validation. Required.
   *
   * Eg: "users.create.errors.requiredPassword"
   */
  requiredKey: PropTypes.string.isRequired,
  /**
   * If the server answered with an error associated with this field.
   */
  hasServerError: PropTypes.bool,
  /**
   * Error message.
   */
  errorMsg: PropTypes.string,
};

PasswordField.defaultProps = {
  hasServerError: false,
  errorMsg: "",
};

export { PasswordField };

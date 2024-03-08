import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

/**
 * Renders a required text field for forms. Its state is manage by RHF.
 */
const RequiredTextField = ({
  register,
  name,
  labelKey,
  requiredKey,
  hasServerError = false,
  errorMsg = "",
  defaultValue = "",
}) => {
  const { t } = useTranslation();
  return (
    <TextField
      label={t(labelKey)}
      {...register(name, {
        required: t(requiredKey),
      })}
      error={!!hasServerError}
      helperText={errorMsg}
      defaultValue={defaultValue}
    />
  );
};

RequiredTextField.propTypes = {
  /**
   * Form registration function (from {register} = useForm()). Required.
   */
  register: PropTypes.func.isRequired,
  /**
   * Field name. The field will be registered by this name. Required.
   */
  name: PropTypes.string.isRequired,
  /**
   * Label i18n key. Eg: "users.create.labels.name". See src/i18n. Required.
   */
  labelKey: PropTypes.string.isRequired,
  /**
   * Error message *key* if the field is empty. Client-side validation. Required.
   *
   * Eg: "users.create.errors.requiredName"
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
  /**
   * Intial value to display
   */
  defaultValue: PropTypes.string,
};

RequiredTextField.defaultProps = {
  hasServerError: false,
  errorMsg: "",
  defaultValue: "",
};

export { RequiredTextField };

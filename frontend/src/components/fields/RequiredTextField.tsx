import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface RequiredTextFieldProps {
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  name: string;
  labelKey: string;
  requiredKey: string;
  hasServerError?: boolean;
  errorMsg?: string;
  defaultValue?: string;
}

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
}: RequiredTextFieldProps) => {
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

export { RequiredTextField };

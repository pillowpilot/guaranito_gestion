import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface PasswordFieldProps {
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  name: string;
  labelKey: string;
  requiredKey: string;
  hasServerError: boolean;
  errorMsg: string;
}

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
}: PasswordFieldProps) => {
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

export { PasswordField };

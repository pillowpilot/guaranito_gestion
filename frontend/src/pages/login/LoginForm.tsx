import { Box, Typography, Stack, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LoginButton } from "../../components/buttons/LoginButton";
import { PasswordField } from "../../components/fields/PasswordField";
import { RequiredTextField } from "../../components/fields/RequiredTextField.tsx";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface LoginData {
  loginEmail: string;
  loginPassword: string;
}
interface LoginFormProps {
  register: UseFormRegister<LoginData>;
  errorMsg: string;
  onSubmitHandler: SubmitHandler<LoginData>;
  handleSubmit: UseFormHandleSubmit<LoginData>;
}

export const LoginForm = ({
  errorMsg,
  onSubmitHandler,
  register,
  handleSubmit,
}: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        padding: 4,
        flexBasis: "50%",
      }}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack direction="column" gap={2}>
          <Typography variant="h3">{t("login.header")}</Typography>
          <Typography variant="subtitle1">{t("login.caption")}</Typography>
          <RequiredTextField
            name="loginEmail"
            labelKey="login.labels.email"
            requiredKey="login.errors.requiredEmail"
            // @ts-expect-error TODO add proper typing
            register={register}
          />
          <PasswordField
            name="loginPassword"
            labelKey="login.labels.password"
            requiredKey="login.errors.requiredPassword"
            // @ts-expect-error TODO add proper typing
            register={register}
          />
          <LoginButton tKey="login.loginBtn" />
          <Stack direction="column" gap={2} justifyContent="space-between">
            {errorMsg === "" ? (
              <></>
            ) : (
              <Alert severity="error">{errorMsg}</Alert>
            )}
            <Typography variant="subtitle1">
              {t("login.dontHaveAccount")}
            </Typography>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

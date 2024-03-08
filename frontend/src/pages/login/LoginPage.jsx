import { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Alert,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AuthContext from "../../contexts/AuthProvider";
import bgImage from "../../assets/orange_field_bg.png";
import { LoginButton } from "../../components/buttons/LoginButton";

const LoginRight = ({ errorMsg, onSubmitHandler, register, handleSubmit }) => {
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
          <TextField
            type="email"
            label={t("login.labels.email")}
            placeholder="Enter your email here"
            required
            {...register("loginEmail")}
          />
          <TextField
            type="password"
            label={t("login.labels.password")}
            placeholder="Enter your password here"
            required
            {...register("loginPassword")}
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

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      loginEmail: "manager@unida.com",
      loginPassword: "manager",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const onSubmitHandler = async (data) => {
    setErrorMsg("");

    const email = data.loginEmail;
    const password = data.loginPassword;

    try {
      await onLogin(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.log(`Error while login`, err);
      const responseCode = err.code;
      switch (responseCode) {
        case "ERR_NETWORK":
          setErrorMsg(t("errors.network.default"));
          break;
        case "ERR_BAD_REQUEST":
          setErrorMsg(t("errors.credentials.default"));
          break;
        default:
          setErrorMsg(t("errors.unknown.default"));
      }
    }
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <Grid item xs={0} md={6} lg={8}></Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ minWidth: 400 }}>
          <LoginRight
            errorMsg={errorMsg}
            onSubmitHandler={onSubmitHandler}
            register={register}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

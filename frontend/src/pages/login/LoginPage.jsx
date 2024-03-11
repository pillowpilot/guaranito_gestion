import { useContext, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthContext from "../../contexts/AuthProvider";
import bgImage from "../../assets/orange_field_bg.png";
import { LoginForm } from "./LoginForm";
import { useNotification } from "../../hooks/useNotification";

const LoginPage = () => {
  const navigate = useNavigate();
  const { notifyError } = useNotification();
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
      notifyError(err);
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
          <LoginForm
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

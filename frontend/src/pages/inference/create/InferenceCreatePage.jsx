import { useContext } from "react";
import {
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MuiFileInput } from "mui-file-input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Api } from "../../../api/client";
import AuthContext from "../../../contexts/AuthProvider";
import { useNotification } from "../../../hooks/useNotification";
import { useListInferenceModels } from "../../../hooks/inference/useListInferenceModels";
import { BackButton } from "../../../components/buttons/BackButton";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { LoadingForm } from "./LoadingForm";


const InferenceForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const listModels = useListInferenceModels();
  const { auth } = useContext(AuthContext);
  const { notifySuccess, notifyError } = useNotification();

  const formMethods = useForm();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = formMethods;

  const listLotsQuery = useQuery({
    queryKey: "lots",
    queryFn: Api.listLots,
    onSuccess: (data) => {
      console.log(data);
      const results = data.data?.results;
      if (results.length == 0)
        setError("lot", {
          type: "400",
          message: t("inferences.create.noLotsErrorMsg"),
        });
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => Api.createInference(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["inferences"]);
      notifySuccess("inferences.create.successMsg");
    },
    onError: (error) => {
      notifyError(error);

      if (error.response) {
        const data = error.response.data;
        if (data.model) setError("model", { type: "400", message: data.model });
        if (data.lot) setError("lot", { type: "400", message: data.lot });
        if (data.image) setError("image", { type: "400", message: data.image });
      }
    },
  });

  const onSubmitHandler = (d) => {
    mutation.mutate({
      user: auth.id,
      image: d.image,
      model: d.model,
      lot: Number(d.lot), // TODO Move typecasting to GET hook
    });
  };

  if (listLotsQuery.isSuccess && listModels.isSuccess) {
    const lots = listLotsQuery.data.data.results;
    return (
      <Paper
        sx={{
          padding: 5,
        }}
      >
        <Stack spacing={5}>
          <Typography variant="h4">{t("inferences.create.header")}</Typography>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack spacing={5}>
              <TextField
                select
                label={t("inferences.create.labels.inferenceModel")}
                {...register("model", {
                  required: t("inferences.create.errors.requiredModel"),
                })}
                error={!!errors.model}
                helperText={errors.model?.message}
                defaultValue={(() => {
                  const data = listModels.data;
                  if (data.length > 0) return data[0].id;
                  else return "";
                })()}
              >
                {listModels.data.map((model) => {
                  return <MenuItem value={model.id}>{model.name}</MenuItem>;
                })}
              </TextField>

              <TextField
                select
                label={t("inferences.create.labels.lot")}
                {...register("lot", {
                  required: t("inferences.create.errors.requiredLot"),
                })}
                error={!!errors.lot}
                helperText={errors.lot?.message}
                defaultValue={lots.length > 0 ? lots[0].id : ""}
              >
                {lots.map((lot) => (
                  <MenuItem key={lot.id} value={lot.id}>
                    {lot.name}
                  </MenuItem>
                ))}
              </TextField>

              <Controller
                name="image"
                control={control}
                rules={{
                  required: t("inferences.create.errors.requiredImage"),
                }}
                render={({ field, fieldState }) => {
                  console.log("field", field);
                  console.log("fieldState", fieldState);
                  return (
                    <MuiFileInput
                      {...field}
                      label={t("inferences.create.labels.inputImage")}
                      inputProps={{ accept: "image/*" }}
                      error={fieldState.invalid}
                      helperText={
                        fieldState.invalid ? fieldState.error?.message : ""
                      }
                    />
                  );
                }}
              />

              <Stack direction="row" justifyContent="center" gap={1}>
                <BackButton
                  labelKey="inferences.create.goBackBtn"
                  onClick={() => navigate(-1)}
                />
                <SubmitButton
                  labelKey="inferences.create.inferBtn"
                  endIcon={<SendIcon />}
                />
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Paper>
    );
  }

  return <LoadingForm />;
};

const InferenceFormPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={0} md={3} />
      <Grid item xs={12} md={6}>
        <InferenceForm />
      </Grid>
      <Grid item xs={0} md={3} />
    </Grid>
  );
};

export default InferenceFormPage;

import React from "react";
import { Stack, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { withTranslation } from "react-i18next";
import { MuiFileInput } from "mui-file-input";
import { RequiredTextField } from "../../../components/fields/RequiredTextField";
import { BackButton } from "../../../components/buttons/BackButton";
import { SubmitButton } from "../../../components/buttons/SubmitButton";

const Form = ({ t, properties, formMethods, mutation }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmit = (d) => {
    mutation.mutate({
      name: d.name,
      parcel: d.parcel,
      // geodata: d.geodata,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          md: {
            minWidth: "350px",
          },
        }}
      >
        <RequiredTextField
          labelKey="lots.create.labels.name"
          name="name"
          requiredKey="lots.create.errors.requiredName"
          register={register}
          hasServerError={!!errors.name}
          errorMsg={errors.name?.message}
        />
        <Controller
          name="parcel"
          control={control}
          defaultValue={properties.length > 0 ? properties[0].id : ""}
          render={({ field }) => {
            return (
              <TextField
                select
                {...field}
                label={t("lots.create.labels.property")}
                error={!!errors.parcel}
                helperText={errors.parcel?.message}
                defaultValue={`${field.value}`}
              >
                {properties?.map((o) => (
                  <MenuItem key={o.id} value={o.id}>
                    {o.name}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        ></Controller>

        {/* <Controller
          name="geodata"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <MuiFileInput
                {...field}
                label={t("properties.create.labels.geodata")}
                inputProps={{ accept: ".geojson" }}
                error={fieldState.invalid}
                helperText={fieldState.invalid ? fieldState.error?.message : ""}
              />
            );
          }}
        /> */}
        <Stack direction="row" justifyContent="center" gap={1}>
          <BackButton
            labelKey="lots.create.goBackBtn"
            onClick={() => navigate(-1)}
          />
          <SubmitButton labelKey="lots.create.saveBtn" />
        </Stack>
      </Stack>
    </form>
  );
};

export { Form };
export default withTranslation()(Form);

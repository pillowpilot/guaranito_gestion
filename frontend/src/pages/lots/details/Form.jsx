import React from "react";
import { Stack, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RequiredTextField } from "../../../components/fields/RequiredTextField";
import { GeodataField } from "../../../components/fields/GeodataField";
import { NoteIfGeodata } from "../../../components/fields/NoteIfGeodata";
import { BackButton } from "../../../components/buttons/BackButton";
import { SubmitButton } from "../../../components/buttons/SubmitButton";

const LotForm = ({ data, propertiesData, mutation, formMethods }) => {
  const { t } = useTranslation();
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
      geodata: d.geodata,
      parcel: d.property,
    });
  };

  /*
  To justify InputLabelProps={{ shrink: true }}
  See: https://stackoverflow.com/a/76688881
  */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <Stack spacing={5}>
        <RequiredTextField
          register={register}
          name="name"
          labelKey="lots.details.labels.name"
          requiredKey="lots.details.errors.requiredName"
          hasServerError={!!errors.name}
          errorMsg={errors.name?.message}
          defaultValue={data.name}
        />
        <Controller
          name="property"
          control={control}
          defaultValue={data.parcel}
          render={({ field }) => {
            return (
              <TextField
                select
                {...field}
                label={t("lots.details.labels.property")}
                defaultValue={`${field.value}`}
              >
                {propertiesData.map((o) => (
                  <MenuItem key={o.id} value={o.id}>{`${o.name}`}</MenuItem>
                ))}
              </TextField>
            );
          }}
        ></Controller>
        <GeodataField
          labelKey="lots.details.labels.geodata"
          requiredKey="lots.details.errors.requiredGeodata"
          control={control}
        />
        <NoteIfGeodata geodata={data.geodata} />
        <Stack direction="row" justifyContent="center" gap={1}>
          <BackButton
            labelKey="lots.details.goBackBtn"
            onClick={() => navigate(-1)}
          />
          <SubmitButton labelKey="lots.details.saveBtn" />
        </Stack>
      </Stack>
    </form>
  );
};

export { LotForm };

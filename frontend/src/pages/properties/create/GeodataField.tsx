import { Controller } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";
import { useTranslation } from "react-i18next";

export const GeodataField = ({ labelKey, requiredKey, control }) => {
  const { t } = useTranslation();
  return (
    <Controller
      name="geodata"
      control={control}
      rules={{
        required: t(requiredKey),
      }}
      render={({ field, fieldState }) => {
        return (
          <MuiFileInput
            {...field}
            label={t(labelKey)}
            inputProps={{ accept: ".geojson" }}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        );
      }}
    />
  );
};

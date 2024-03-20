import { Control, Controller } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";
import { useTranslation } from "react-i18next";

interface GeodataFieldProps {
  labelKey: string;
  requiredKey: string;
  control: Control;
}

const GeodataField = ({ labelKey, requiredKey, control }: GeodataFieldProps) => {
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

export { GeodataField };

import { Stack } from "@mui/material";
import { Controller } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { RequiredTextField } from "../../../components/fields/RequiredTextField";
import { BackButton } from "../../../components/buttons/BackButton";
import { SubmitButton } from "../../../components/buttons/SubmitButton";

/**
 * Form for property creation
 */
const Form = ({ formMethods, onSubmit, errors = {} }) => {
  const { t } = useTranslation();

  const { register, handleSubmit, control } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          sm: { minWidth: "350px" },
        }}
      >
        <RequiredTextField
          register={register}
          name="name"
          labelKey="properties.create.labels.name"
          requiredKey="properties.create.errors.requiredName"
          hasServerError={!!errors.name}
          errorMsg={errors.name?.message}
        />
        <Controller
          name="geodata"
          control={control}
          rules={{
            required: t("properties.create.errors.requiredGeodata"),
          }}
          render={({ field, fieldState }) => {
            return (
              <MuiFileInput
                {...field}
                label={t("properties.create.labels.geodata")}
                inputProps={{ accept: ".geojson" }}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            );
          }}
        />
        <Stack direction="row" justifyContent="center" gap={1}>
          <BackButton labelKey="properties.create.goBackBtn" />
          <SubmitButton labelKey="properties.create.saveBtn" />
        </Stack>
      </Stack>
    </form>
  );
};

Form.propTypes = {
  /**
   * React Hoork Forms related functions
   */
  formMethods: PropTypes.shape({
    register: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }),
  /**
   * Form errors, if any
   */
  errors: PropTypes.shape({
    name: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
  /**
   * Mutation methods
   */
  mutation: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }),
};

Form.defaultProps = {
  errors: {},
};

export { Form };

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { Controller } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { RequiredTextField } from "../../../components/fields/RequiredTextField";
import AuthContext from "../../../contexts/AuthProvider";

/**
 * Form for property creation
 */
const Form = ({ formMethods, mutation, errors = {} }) => {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const { register, handleSubmit, control } = formMethods;

  const onSubmit = (d) => {
    mutation.mutate({
      name: d.name,
      company: auth.company.id,
      geodata: d.geodata,
    });
  };

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
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("properties.create.goBackBtn")}
          </Button>
          <Button variant="contained" type="submit" data-testid="submit-btn">
            {t("properties.create.saveBtn")}
          </Button>
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

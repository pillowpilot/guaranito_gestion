import { useContext } from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import AuthContext from "../../../contexts/AuthProvider";
import { RequiredTextField } from "../../../components/fields/RequiredTextField";
import { GeodataField } from "../../../components/fields/GeodataField";
import { NoteIfGeodata } from "../../../components/fields/NoteIfGeodata";

/**
 * Form for property update
 */
const PropertyForm = ({
  formMethods,
  mutation,
  data = { name: "" },
  errors = {},
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const { register, handleSubmit, control } = formMethods;

  const onSubmit = (d) => {
    mutation.mutate({
      name: d.name,
      geodata: d.geodata,
      company: auth.company?.id,
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
          labelKey="properties.details.labels.name"
          requiredKey="properties.details.errors.requiredName"
          hasServerError={!!errors.name}
          errorMsg={errors.name?.message}
          defaultValue={data.name}
        />
        <GeodataField
          labelKey="properties.details.labels.geodata"
          requiredKey="properties.details.errors.requiredGeodata"
          control={control}
        />
        <NoteIfGeodata geodata={data.geodata} />
        <Stack direction="row" justifyContent="center" gap={1}>
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("properties.details.goBackBtn")}
          </Button>
          <Button type="submit" variant="contained">
            {t("properties.details.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

PropertyForm.propTypes = {
  /**
   * Initial data to display
   */
  data: PropTypes.shape({
    name: PropTypes.string,
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
   * React Hoork Forms related functions
   */
  formMethods: PropTypes.shape({
    register: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }),
  /**
   * Mutation methods
   */
  mutation: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }),
};

PropertyForm.defaultProps = {
  data: { name: "" },
  errors: {},
};

export { PropertyForm };

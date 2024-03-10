import { Paper, Stack, Typography, Skeleton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import { BackButton } from "../../../components/buttons/BackButton";
import { SubmitButton } from "../../../components/buttons/SubmitButton";

const LoadingForm = () => {
  const { t } = useTranslation();
  return (
    <Paper
      sx={{
        padding: 5,
      }}
    >
      <Stack spacing={5}>
        <Typography variant="h4">{t("inferences.create.header")}</Typography>
        <form>
          <Stack spacing={5}>
            <Skeleton variant="rounded" height={55} />
            <Skeleton variant="rounded" height={55} />
            <Skeleton variant="rounded" height={55} />

            <Stack direction="row" justifyContent="center" gap={1}>
              <BackButton
                labelKey="inferences.create.goBackBtn"
                onClick={() => {}}
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
};

export { LoadingForm };

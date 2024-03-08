import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { Api } from "../../../api/client";
import LoadingDataGrid from "./LoadingDataGrid";
import { InferencesDataGrid } from "./InferencesDataGrid";
import { useListInferences } from "../../../hooks/inference/useListInferences";
import { DeleteInferenceDialog } from "../../../components/dialogs/DeleteInferenceDialog";
import { useNotification } from "../../../hooks/useNotification";
import { Layout } from "./Layout";

const InferencesListPage = () => {
  const { notifySuccess, notifyError } = useNotification();
  const listInferences = useListInferences();

  const [inferenceIdToDelete, setInferenceIdToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => Api.deleteInference(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["inferences"]);
      notifySuccess("inferences.delete.successMsg");
    },
    onError: (error) => {
      notifyError(error);
    },
  });

  if (listInferences.isSuccess)
    return (
      <Layout>
        <InferencesDataGrid
          inferences={listInferences.data}
          setDeleteDialogOpen={setDeleteDialogOpen}
          setInferenceIdToDelete={setInferenceIdToDelete}
        />
        <DeleteInferenceDialog
          open={deleteDialogOpen}
          onAccept={() => {
            mutation.mutate(inferenceIdToDelete);
            inferenceIdToDelete(null);
            setDeleteDialogOpen(false);
          }}
          onReject={() => {
            setDeleteDialogOpen(false);
          }}
        />
      </Layout>
    );

  return (
    <Layout>
      <LoadingDataGrid />
    </Layout>
  );
};

export default InferencesListPage;

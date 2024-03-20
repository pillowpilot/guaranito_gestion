import { useQuery } from "react-query";
import { useNotification } from "./useNotification";
import { Api } from "../api/client";
import { AxiosError } from "axios";

interface ServerErrorType {
  detail: string;
}

const useGetDashboardStatistics = () => {
  const { notifyError } = useNotification();

  const inferencesTotal = useQuery({
    queryKey: ["inferences", "total"],
    queryFn: Api.retrieveTotalNumberOfInferences,
    onError: (error: AxiosError<ServerErrorType>) => {
      notifyError(error);
    },
  });

  const lotsTotal = useQuery({
    queryKey: ["lots", "total"],
    queryFn: Api.retrieveTotalNumberOfLots,
    onError: (error: AxiosError<ServerErrorType>) => {
      notifyError(error);
    },
  });

  const propertiesTotal = useQuery({
    queryKey: ["properties", "total"],
    queryFn: Api.retrieveTotalNumberOfProperties,
    onError: (error: AxiosError<ServerErrorType>) => {
      notifyError(error);
    },
  });

  return { inferencesTotal, lotsTotal, propertiesTotal };
};

export { useGetDashboardStatistics };

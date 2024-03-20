import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { LoginData, LoginResponse } from "../types/login";

export const LOCALSTORAGE_REFRESH_TOKEN = "refresh_token";
export const LOCALSTORAGE_ACCESS_TOKEN = "access_token";
// const baseURL = window.location.origin;
export const baseURL = import.meta.env.VITE_REACT_API_URL;
console.log("baseUrl", baseURL);

const buildApiClient = () => {
  const instance = axios.create({
    baseURL: baseURL,
  });
  console.log("instance", instance);

  // Add Request Interceptors
  // onFullfilled: add JWT Access Token to the request
  // onRejected: do nothing (identity fn)
  const addJWTAccessToken = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    config.headers = config.headers ?? {};

    const accessToken = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN);
    if (accessToken !== null)
      config.headers.Authorization = `Bearer ${accessToken}`;

    // config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  };
  instance.interceptors.request.use(addJWTAccessToken);

  // Add Response Interceptors
  // onFullfilled: do nothing (identity fn)
  // onRejected: refresh JWT Access Token if 401 and resend the original request
  const refreshJWTAccessToken = async (
    error: AxiosError
  ): Promise<AxiosError> => {
    const originalRequest = error.config?? {headers: {Authorization: ''}};

    // If jwtRefreshToken does not exists, the user is unauthenticated (ie. in login page).
    // If we receive a 401 Unauthorized with an unauthenticated user, ignore.
    const jwtRefreshToken = localStorage.getItem(LOCALSTORAGE_REFRESH_TOKEN);
    console.log(error);
    if (error?.response?.status === 401 && jwtRefreshToken) {
      try {
        const url = `${baseURL}api/token/refresh/`;
        const refreshResponse = await axios.post(url, {
          refresh: jwtRefreshToken,
        }); // DO NOT use instance for the refresh
        localStorage.setItem(
          LOCALSTORAGE_ACCESS_TOKEN,
          refreshResponse.data.access
        );
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        return instance(originalRequest);
      } catch (err) {
        console.log(err);
        localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN);
        localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN);
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    // Throw unhandled errors
    return Promise.reject(error);
  };
  instance.interceptors.response.use((c) => c, refreshJWTAccessToken);

  return instance;
};

const apiClient = buildApiClient();

interface Property {
  id: number;
  name: string;
  company: number;
  geodata: null | string;
  created_at: string;
  updated_at: string;
}
interface ListPropertiesResponse {
  count: number;
  previous: string | null;
  next: string | null;
  results: Property[];
}

interface Lot {
  id: number;
  name: string;
  property: number;
  geodata: null | string;
  created_at: string;
  updated_at: string;
}

interface ListLotsResponse {
  count: number;
  previous: string | null;
  next: string | null;
  results: Lot[];
}

interface InferenceModel {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface ListInferenceModelsResponse {
  count: number;
  previous: string | null;
  next: string | null;
  results: InferenceModel[];
}

interface InferenceJob {
  id: number;
  user: number;
  user_email: string;
  lot: number;
  lot_name: string;
  model: number;
  model_codename: "leafs" | "fruits" | "trees";
  status: "pending" | "processing" | "success" | "failure";
  image: null | string;
  latitude: null | number;
  longitude: null | number;
  created_at: string;
  updated_at: string;
}

interface ListInferenceJobsResponse {
  count: number;
  previous: string | null;
  next: string | null;
  results: InferenceJob[];
}

interface CreateUserInput {
  email: string;
  password: string;
  company: number;
  first_name?: string;
  last_name?: string;
}

interface UpdateUserInput {
  email?: string;
  password: string;
  company: number;
  first_name?: string;
  last_name?: string;
}

interface CreatePropertyInput {
  name: string;
}

interface UpdatePropertyInput {
  name?: string;
  geodata?: string; // TODO Fix?
}

interface CreateLotInput {
  name: string;
  parcel: number;
}

interface UpdateLotInput {
  name?: string;
  geodata?: string; // TODO Fix?
}

interface CreateInferenceJobInput {
  user: number;
  model: number;
  lot: number;
  image: string; // TODO Fix?
}

export const Api = {
  login: (data: LoginData) =>
    apiClient.post<LoginResponse>(`/api/token/`, data),

  retrieveMediaFile: (filepath: string) => apiClient.get(`/media/${filepath}`),

  listUsers: () => apiClient.get(`/api/users/`),
  createUser: (data: CreateUserInput) => apiClient.post(`/api/users/`, data),
  retrieveUser: (id: number) => apiClient.get(`/api/users/${id}/`),
  updateUser: (id: number, data: UpdateUserInput) =>
    apiClient.put(`/api/users/${id}/`, data),

  listProperties: () => apiClient.get<ListPropertiesResponse>(`/api/parcels/`),
  createProperty: (data: CreatePropertyInput) =>
    apiClient.post(`/api/parcels/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  retrieveProperty: (id: number) => apiClient.get(`/api/parcels/${id}/`),
  updateProperty: (id: number, data: UpdatePropertyInput) =>
    apiClient.put(`/api/parcels/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  retrieveTotalNumberOfProperties: () => apiClient.get(`/api/parcels/total/`),
  deleteProperty: (id: number) => apiClient.delete(`/api/parcels/${id}/`),

  listLots: () => apiClient.get<ListLotsResponse>(`/api/lots/`),
  createLot: (data: CreateLotInput) =>
    apiClient.post(`/api/lots/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  retrieveLot: (id: number) => apiClient.get(`/api/lots/${id}/`),
  updateLot: (id: number, data: UpdateLotInput) =>
    apiClient.put(`/api/lots/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  partiallyUpdateLot: (id: number, data: UpdateLotInput) =>
    apiClient.patch(`/api/lots/${id}/`, data),
  deleteLot: (id: number) => apiClient.delete(`/api/lots/${id}/`),
  retrieveTotalNumberOfLots: () => apiClient.get(`/api/lots/total/`),

  listInferenceModels: () =>
    apiClient.get<ListInferenceModelsResponse>(`/api/inferencemodels/`),

  listInferences: () =>
    apiClient.get<ListInferenceJobsResponse>(`/api/inferencejobs/`),
  createInference: (data: CreateInferenceJobInput) =>
    apiClient.post(`/api/inferencejobs/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  retrieveInference: (id: number) => apiClient.get(`/api/inferencejobs/${id}/`),
  deleteInference: (id: number) =>
    apiClient.delete(`/api/inferencejobs/${id}/`),
  retrieveTotalNumberOfInferences: () =>
    apiClient.get(`/api/inferencejobs/total/`),
};

export default apiClient;

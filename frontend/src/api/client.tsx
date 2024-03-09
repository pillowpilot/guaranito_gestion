import axios from "axios";

import { LoginData, LoginResponse } from "../types/login";

export const LOCALSTORAGE_REFRESH_TOKEN = "refresh_token";
export const LOCALSTORAGE_ACCESS_TOKEN = "access_token";

const buildApiClient = () => {
  // const baseURL = window.location.origin;
  const baseURL = "http://localhost:8000/";

  const instance = axios.create({
    baseURL: baseURL,
  });

  // Add Request Interceptors
  // onFullfilled: add JWT Access Token to the request
  // onRejected: do nothing (identity fn)
  const addJWTAccessToken = (config) => {
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
  const refreshJWTAccessToken = async (error) => {
    const originalRequest = error.config;

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
  created_at: string;
  updated_at: string;
}
interface ListPropertiesResponse {
  count: number;
  previous: string | null;
  next: string | null;
  results: Property[];
}

export const Api = {
  login: (data: LoginData) =>
    apiClient.post<LoginResponse>(`/api/token/`, data),

  retrieveMediaFile: (filepath) => apiClient.get(`/media/${filepath}`),

  listUsers: () => apiClient.get(`/api/users/`),
  createUser: (data) => apiClient.post(`/api/users/`, data),
  retrieveUser: (id: number) => apiClient.get(`/api/users/${id}/`),
  updateUser: (id: number, data) => apiClient.put(`/api/users/${id}/`, data),

  listProperties: () => apiClient.get<ListPropertiesResponse>(`/api/parcels/`),
  createProperty: (data) =>
    apiClient.post(`/api/parcels/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  retrieveProperty: (id: number) => apiClient.get(`/api/parcels/${id}/`),
  updateProperty: (id: number, data) =>
    apiClient.put(`/api/parcels/${id}/`, data),
  retrieveTotalNumberOfProperties: () => apiClient.get(`/api/parcels/total/`),
  deleteProperty: (id: number) => apiClient.delete(`/api/parcels/${id}/`),

  listLots: () => apiClient.get(`/api/lots/`),
  createLot: (data) =>
    apiClient.post(`/api/lots/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  retrieveLot: (id: number) => apiClient.get(`/api/lots/${id}/`),
  updateLot: (id: number, data) => apiClient.put(`/api/lots/${id}/`, data),
  partiallyUpdateLot: (id: number, data) =>
    apiClient.patch(`/api/lots/${id}/`, data),
  deleteLot: (id: number) => apiClient.delete(`/api/lots/${id}/`),
  retrieveTotalNumberOfLots: () => apiClient.get(`/api/lots/total/`),

  listInferences: () => apiClient.get(`/api/inferences/`),
  createInference: (data) =>
    apiClient.post(`/api/inferences/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  retrieveInference: (id: number) => apiClient.get(`/api/inferences/${id}/`),
  deleteInference: (id: number) => apiClient.delete(`/api/inferences/${id}/`),
  retrieveTotalNumberOfInferences: () =>
    apiClient.get(`/api/inferencejobs/total/`),
};

export default apiClient;

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  refresh: string;
  access: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  role: string;
  company: number;
  refresh: string;
  access: string;
}

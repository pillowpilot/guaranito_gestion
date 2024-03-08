import { createContext, useState } from "react";
import {
  Api,
  LOCALSTORAGE_ACCESS_TOKEN,
  LOCALSTORAGE_REFRESH_TOKEN,
} from "../api/client";
import axios, { AxiosError } from "axios";

const AuthContext = createContext({});
interface ContextState {
  id: number | null;
  isAuthenticated: boolean;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<ContextState>({
    id: null,
    isAuthenticated: false,
  });

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await Api.login({ email, password });
      const data = response.data;
      setAuth({
        ...auth,
        isAuthenticated: true,
        id: data.id,
      });
      localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN, response.data.refresh);
      localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN, response.data.access);
    } catch (e: Error | AxiosError) {
      if (axios.isAxiosError(e)) {
        console.log(`Axios Error`, e.message);
      } else {
        console.log(`Error at login`, e); // TODO Proper handling
      }
    }
  };

  const onLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN);
    localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN);
    // TODO Send token to blacklist
    setAuth({
      ...auth,
      id: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

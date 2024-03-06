import { createContext, useState } from "react";
import { Api, LOCALSTORAGE_ACCESS_TOKEN, LOCALSTORAGE_REFRESH_TOKEN } from "../api/client";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    id: null,
    company: {
      id: null,
    },
    isAuthenticated: false,
  });

  const onLogin = async (email, password) => {
    return Api.login({email, password})
    .then(response => {
      console.log('We are in!', response);
      const { data } = response;
      setAuth({
        ...auth,
        isAuthenticated: true,
        id: data.id, // Authenticated user id
      })
      localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN, response.data.refresh);
      localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN, response.data.access);
    })
  };

  const onLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN);
    localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN);
    // TODO Send token to blacklist
    setAuth({
      ...auth,
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

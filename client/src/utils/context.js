import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import authApi from "../apis/auth.api";
import catchErrors from './catchErrors';

const AuthContext = createContext({
  error: "",
  user: { id: "", role: "user", name: "" },
  setUser: () => { },
  login: () => Promise.resolve(false),
  logout: () => { },
  catchErrorAuth: (error, displayError) => { },
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: "", role: "user", name: "" });
  const [error, setError] = useState("");
  const history = useHistory()
  const { pathname } = useLocation()
  const getUser = async () => {
    try {
      const resUser = await authApi.getUser();
      setUser({ ...user, ...resUser })
      if (resUser.role === "admin") history.push("/admin")
      else if (pathname === "/admin" && resUser.role !== "admin") {
        await logout()
        return <ErrorPage />
      } else history.push("/home")
    } catch (error) {
      catchErrorAuth(error, setError);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const login = useCallback(async (userId, password) => {
    try {
      setError("");
      const user = await authApi.login(userId, password);
      localStorage.setItem("login", true)
      setUser(user)
      if (user.role === "admin") history.push("/admin")
      return true;
    } catch (error) {
      catchErrors(error, setError);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError("");
      const user = await authApi.logout();
      localStorage.removeItem("login")
      setUser(user);
      alert("로그아웃 되었습니다.");
    } catch (error) {
      catchErrors(error, setError);
    }
  }, []);

  const catchErrorAuth = useCallback(async (error, displayError) => {
    let errMsg;
    if (error.response) {
      if (typeof error.response.data === "string") {
        errMsg = error.response.data;
        console.log('Error response:', errMsg);
      } else {
        const { data } = error.response;
        if (data.redirectUrl) {
          errMsg = data.message;
          console.log('Error response with redirected message:', errMsg);
          return await logout();
        }
      }
    } else if (error.request) {
      errMsg = error.request;
      console.log('Error request:', errMsg);
    } else {
      errMsg = error.message;
      console.log("Error message:", errMsg)
    }
    displayError(errMsg);
    alert(errMsg)
  }, []);

  return (
    <AuthContext.Provider value={{ error, user, setUser, login, logout, catchErrorAuth }} >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
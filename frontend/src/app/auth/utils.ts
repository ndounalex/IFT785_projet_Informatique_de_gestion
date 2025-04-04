import api from "./axios.config";
import Cookies from "js-cookie";
/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
const storeToken = (token: string, type: "access" | "refresh") => {
    Cookies.set(type + "Token", token);
  };

  const storeUserData = (user: any, type: "user") => {
    Cookies.set(type, JSON.stringify(user));
  };

  const getUserData = () => {
    return JSON.parse(Cookies.get("user")||"{}");
  };
  
  /**
   * Retrieves a token from cookies.
   * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
   * @returns {string | undefined} The token, if found.
   */
  const getToken = (type: string) => {
    return Cookies.get(type + "Token");
  };
  
  /**
   * Removes both access and refresh tokens from cookies.
   */
  const removeTokens = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
  };

  const register = (email: string, username: string, password: string) => {
    return api.post("/auth/users/",{ email, username, password });
  };
  
  const login = (email: string, password: string) => {
    return api.post( "/auth/jwt/create", { username: email, password, email },);
  };
  
  const logout = () => {
    const refreshToken = getToken("refresh");
    return api.post("/auth/logout/", { refresh: refreshToken });
  };
  
  const handleJWTRefresh = () => {
    const refreshToken = getToken("refresh");
    return api.post("/auth/jwt/refresh", { refresh: refreshToken });
  };
  
  const resetPassword = (email: string) => {
    return api.post("/auth/users/reset_password/", { email });
  };
  
  const resetPasswordConfirm = (
    new_password: string,
    re_new_password: string,
    token: string,
    uid: string
  ) => {
    return api.post(
      "/auth/users/reset_password_confirm/",
      { uid, token, new_password, re_new_password },
    );
  };

  export const AuthActions = () => {
    return {
      login,
      resetPasswordConfirm,
      handleJWTRefresh,
      register,
      resetPassword,
      storeToken,
      getToken,
      storeUserData,
      getUserData,
      logout,
      removeTokens,
    };
  };
import { createContext, useContext, useEffect, useState } from "react";
import { useLoginUserMutation, useRegisterUserMutation } from "../redux/api/authenticationAPI";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [register] = useRegisterUserMutation();
  const [login] = useLoginUserMutation();

  // Register a user
  const registerUser = async (formData) => {
    const response = await register(formData);
    return response;
  };

  // Login user
  const loginUser = async (formData) => {
    const response = await login(formData);
    if (response?.data?.token) {
      localStorage.setItem("token", response.data.token);
      setCurrentUser(response.data.user); // user is expected to be returned from backend
    }
    console.log(response);
    return response;
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    // optionally: redirect or trigger revalidation
  };

  // Auto-load user on token presence (optional enhancement)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded); // assuming token has user info
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    logout,
  };

  if(!loading){
    return <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>;
  }
};

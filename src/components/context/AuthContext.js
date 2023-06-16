import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { getToken, getUserDetails } from "../../helper/SessionHelper";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  
  // axios config
  // axios.defaults.baseURL = 'http://localhost:8080/api/v1';
  // axios.defaults.headers.common["Authorization"] = auth?.token;
  // console.log(auth?.token)
  // console.log(auth?.token)
  
  useEffect(() => {
    const token = getToken()
    const user = getUserDetails()
    setAuth({user:user,token:token})
    
    
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
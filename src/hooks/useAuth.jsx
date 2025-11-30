import { useContext,createContext, useState, useCallback, useEffect, useRef } from "react";
import { useApiClient } from "../Api/Api";
import { loader } from "../Components/Loader/LoaderModal";
import { AppContext } from "../Contexts/AppContext";
import useLocalStorage from "./useLocalStorage";
import { useNavigate } from "react-router";
















const authenticationStore = {
  setStatus(status=null){
    try {
      if (status === null) throw new Error("No value provided");            
      localStorage.setItem("z",status.toString());
    } catch (error) {
      console.error(error.message);
    }
  },
  getStatus(){
    try {      
      let authStatus = localStorage.getItem("z");
      if (authStatus){
        return authStatus.toLowerCase() === 'true' ? true : false;
      }
      return false;
    } catch (error) {
      console.error(error.message);
    }
  }
}

const tokenStore = {
  setToken(token){
    try {
      if (!token) throw new Error("No value provided");
      localStorage.setItem("b",token);
    } catch (error) {
      console.error(error.message);
    }
  },
  getToken(){
    try {
      let token = localStorage.getItem("b");      
      return token;
    } catch (error) {
      console.error(error.message);
    }
  }
}


const parseUserFromLoginResponse = (response) => {
  try {
    if (!response) throw new TypeError("Cannot parse response. arguement undefined as null");
    const {first,last,email,isAdmin,username,id} = response.data;
    return {
      firstName: first,
      lastName: last,
      email: email,
      isAdmin: isAdmin,
      username: username,
      id: id
    };
  } catch (error) {
    console.error(error.message);
  }
}


const AuthContext = createContext();

const AuthActionsContext = createContext();

export const AuthActionsProvider = ({children}) => {
  const auth = useAuth();
  const api = useApiClient();

  const login = useCallback(async (formData) => {
    loader.loaded;

    const loginResponse = await api.post("login",formData,api.headers.applicationJson);
    
    if (loginResponse.success){
      let token = loginResponse.token;
      let authUser = parseUserFromLoginResponse(loginResponse);
      auth.setToken(token);      
      auth.setAuthUser(authUser);
      loader.loaded;
      return true;
    }
    return false;
      
  },[api,auth])

  const logout = useCallback(async (uid,navigate) => {
    debugger;
    auth.setToken("");
    auth.setAuthUser({
      "firstName": "",
      "lastName": "",
      "email": "",
      "isAdmin": false,
      "username": "",
      "id": ""
    });

    localStorage.removeItem("authUser");
    localStorage.removeItem("b");
    // navigateTo("/login");

    return true;

    // const loginResponse = await api.post("login",formData,api.headers.applicationJson);
    // request.post("logout",formData,headers,handleLogoutActionResponse);

  },[auth])

  const verify = useCallback((navigate) => {

    const handleAuthenticationResponse = (response) => {
      try {        
        if (response.success){
          return;
        }
        return;
      } catch (error) {
        console.error(error.message);
      }
    }

    // request.post("auth",{token:token},headers.applicationJson,handleAuthenticationResponse);
    
  },[])

  const register = useCallback(async ({data,navigate}) => {
    const fd = {
      username: data.userName,
      password: data.password,
      accessCode: data.registrationCode
    }
    const registrationResponse = await api.post("register",fd,api.headers.applicationJson);
    if (registrationResponse.success){
      let token = registrationResponse.token;
      let authUser = registrationResponse.data;
      auth.setToken(token);
      auth.setAuthUser(authUser);  
      navigate("/");
      return;
    }
  },[api,auth])

  return <AuthActionsContext.Provider
          value={{
            login,
            logout,
            verify,
            register
          }}>
            {children}
          </AuthActionsContext.Provider>
}

const AuthProvider = ({children}) => {
  const localStorage = useLocalStorage();
  const [user,setUser] = useState({});
  const [token,setAuthToken] = useState(tokenStore.getToken());
  const [isAuthenticating,setIsAuthenticating] = useState(false);
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const setToken = (token) => {
    setAuthToken(token);
    tokenStore.setToken(token);
  }
  const getToken = () => {
    if (token){
      return token;
    }
    return tokenStore.getToken();
  }

  const setAuthUser = (user) => {
    setUser(user);
    localStorage.set("authUser",JSON.stringify(user));
  }

  const getAuthUser = () => {
    let authUser = localStorage.get("authUser")
    if (authUser){
      authUser = JSON.parse(authUser);
      return authUser;
    }
    return user;
  }

  


  return  <AuthContext.Provider 
            value={{
              token,
              user,
              isAuthenticating,
              isAuthenticated,
              getToken,
              setToken,
              getAuthUser,
              setAuthUser
            }}>
            {children}
          </AuthContext.Provider>
}



export default AuthProvider;


export const useAuthActions = () => {
  return useContext(AuthActionsContext);
}

export const useAuth = () => {
  return useContext(AuthContext);  
}


import { useContext,createContext, useState, useCallback, useEffect, useRef } from "react";
import { useApiClient } from "../Api/Api";
import { loader } from "../Components/Loader/LoaderModal";
import { AppContext } from "../Contexts/AppContext";
















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





const AuthContext = createContext();

const AuthActionsContext = createContext();

export const AuthActionsProvider = ({children}) => {
  const auth = useAuth();
  const api = useApiClient();
  const {state,dispatch} = useContext(AppContext)

  const login = useCallback(async (formData,navigate) => {


    const loginResponse = await api.post("login",formData,api.headers.applicationJson);
    
  
    if (loginResponse.success){
      let token = loginResponse.token;
      let authUser = {
        firstName:loginResponse.data.first,
        lastName:loginResponse.data.last,
        email:loginResponse.data.email,
        sAdmin:loginResponse.data.isAdmin,
        username:loginResponse.data.username,
        id:loginResponse.data.id
      };
      auth.setToken(token);      
      auth.setAuthUser(authUser);
      let userId = authUser.id;
      const loginDataResponse = await api.get("organizations",{params:{userId,token}});
      if (loginDataResponse.success){
        const appData = loginDataResponse.data;
        dispatch({action:"all",payload:{organization: appData.orgId,stores: appData.stores}})
        navigate("/");
      }
      return;
    }
    loader.loaded();    
      
  },[api,auth])

  const logout = useCallback((uid,navigate) => {
    
    const handleLogoutActionResponse = (response) => {
      try {
        if (response.success){
          return;
        }        
        return;
      } catch (error) {
        console.error(error.message);
      } finally {
        
      }
    }

    // request.post("logout",formData,headers,handleLogoutActionResponse);

  },[])

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
    debugger;
    const registrationResponse = await api.post("register",fd,api.headers.applicationJson);
    if (registrationResponse.success){
      let token = registrationResponse.token;
      let authUser = registrationResponse.data;
      auth.setToken(token);
      auth.setAuthUser(authUser);  
      navigate("/");
      return;
    }
  },[])

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
  const [user,setUser] = useState({});
  const [token,setAuthToken] = useState(tokenStore.getToken());
  const [isAuthenticating,setIsAuthenticating] = useState(false);
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const setToken = (token) => {
    setAuthToken(token);
  }

  const setAuthUser = (user) => {
    setUser(user);
  }

  


  return  <AuthContext.Provider 
            value={{
              token,
              user,
              isAuthenticating,
              isAuthenticated,
              setToken,
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


import { useApiClient } from "../Api/Api"
import useAppContext from "./useAppContext";
import { useAuth } from "./useAuth";


const useAppHooks = () => {
  const api = useApiClient();
  const auth = useAuth();
  const {state,dispatch} = useAppContext();

  return {
    api,
    auth,
    appState: state,
    setAppState: dispatch
  }
}

export default useAppHooks;
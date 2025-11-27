import { useContext } from "react"
import { AppContext } from "../Contexts/AppContext"

const UPDATE_AGENT_STRING = "agentString";


const useAppContext = () => {
  const {state,dispatch} = useContext(AppContext);

  return {
    state,
    dispatch
  }
}

export default useAppContext;

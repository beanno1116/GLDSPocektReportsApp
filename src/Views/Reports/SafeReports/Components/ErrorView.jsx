import useAppContext from "../../../../hooks/useAppContext";



const ErrorView = ({ title,message,code, }) => {
  const {state} = useAppContext();
  const error = Error.requestError(Filter.storeById(state.stores,state.activeStore)?.name)
  title = title || error.title;
  message = message || error.message;
  code = code || error.code;
  return (
    <ErrorView title={title} message={message} code={code}/>
  )
}

export default ErrorView;
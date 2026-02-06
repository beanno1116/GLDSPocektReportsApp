import { useNavigate } from "react-router"



const useNavigateView = () => {
  const navigate = useNavigate();

  return (route) => {
    navigate(route,{viewTransition:true});
  }
}

export default useNavigateView;
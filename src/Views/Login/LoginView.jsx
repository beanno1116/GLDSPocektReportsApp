import styles from './loginView.module.css';
import { useCallback, useState } from 'react';
import BarGraphSvg from '../../assets/images/BarGraphSvg';
import LineGraphSvg from '../../assets/images/LineGraphSvg';
import DocumentGraphSvg from '../../assets/images/DocumentGraphSvg';
import GraphSvg from '../../assets/images/GraphSvg';
import StartLoginPanel from './Components/StartLoginPanel';
import LoginPanel from './Components/LoginPanel';
import RegistrationPanel from './Components/RegistrationPanel';


const useLoginView = () => {
  const [isStartPanelHidden,setIsStartPanelHidden] = useState(false);
  const [viewName,setViewName] = useState("");

  const onStartPanelButtonClick = useCallback((e,action) => {
    setIsStartPanelHidden(true);
    setViewName(action);
  },[])


  const onBackButtonClick = useCallback((e) => {
    setIsStartPanelHidden(false);
    setViewName("");
  },[])

  return {
    isStartPanelHidden,
    onBackButtonClick,
    onStartPanelButtonClick,
    viewName,
  }
}



const LoginView = () => {
  const {isStartPanelHidden,onBackButtonClick,onStartPanelButtonClick,viewName} = useLoginView();


  return (
    <div className={styles.login_view}>

      
      <BarGraphSvg />
      <LineGraphSvg />
      <DocumentGraphSvg />
      <GraphSvg />

      <LoginPanel when={viewName === "login"} navigation={{back:onBackButtonClick}} />
      <RegistrationPanel when={viewName === "register"} navigation={{back:onBackButtonClick}} />

      <StartLoginPanel when={isStartPanelHidden} onPanelButtonClick={onStartPanelButtonClick} />


    </div>
  );
}

export default LoginView;
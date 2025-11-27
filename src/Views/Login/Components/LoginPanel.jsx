
import styles from '../loginView.module.css';
import buttonStyles from '../../../Components/Buttons/button.module.css';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import { loader } from '../../../Components/Loader/LoaderModal';
import TextField from '../../../Components/Inputs/TextField';
import LinkButton from '../../../Components/Buttons/LinkButton';
import PasswordTextField from '../../../Components/Inputs/PasswordTextField';
import { useNavigate } from 'react-router';
import useWEForm from '../../../hooks/useWEForm';
import { useApiClient } from '../../../Api/Api';
import { useAuth, useAuthActions } from '../../../hooks/useAuth';
import { useContext } from 'react';
import { AppContext } from '../../../Contexts/AppContext';
import useLocalStorage from '../../../hooks/useLocalStorage';

const LoginPanel = ({ when,navigation }) => {
  const authAction = useAuthActions();  
  const api = useApiClient();
  const auth = useAuth();
  const localStorage = useLocalStorage();
  const {state,dispatch} = useContext(AppContext);
  const {registerFormInput,resetForm,onSubmit} = useWEForm({
    userName: "",
    password: ""
  })
  const navigate = useNavigate();

  const onLoginButtonClick = async ({data,isValid}) => {
    loader.loading();
    if (!isValid) {
      loader.loaded();
      return;
    }


    const fd = {
      userName: data.userName,
      password: data.password,    
    }
    const loginResponse = await authAction.login(fd,navigate);   
    if (loginResponse){      
      const loginDataResponse = await api.get("organizations",{params:{userId:auth.getAuthUser().id,token:auth.token}});
      if (loginDataResponse.success){
        const {id,stores,users} = loginDataResponse.data;        
        const payloadData = {
          organization: id,
          stores:stores,
          users: users,
          agentString: "",
          activeStore: 0,
          didInit: true
        }
        debugger;
        
        localStorage.set("org",JSON.stringify(payloadData));
        dispatch({action:"all",payload:payloadData});
        if (payloadData.stores.length > 1){
          navigate("/stores/selector");
          
          // navigate("/");
        }else{
          // navigate("/");
        }
      }
      loader.loaded();      
    }
  }

  const onBackButtonClick = (e) => {
    resetForm(e);
    navigation.back && navigation.back();
  }

  return (
    <div className={`${styles.login_view_form_panel} ${when ?  "" : styles.hidden}`}>

      <FlexColumn hAlign='center' vAlign='center'>
        <div className={styles.login_view_form_heading}><h1>Login</h1></div>
        <p className={styles.login_view_form_p}>Log in to get started!</p>
      </FlexColumn>

      <FlexColumn vAlign='center' g='1rem' p='0 2rem'>
        <TextField {...registerFormInput("userName",{required:true})} placeholder="User name" label={"User name"}/> 
        <div></div>
        <PasswordTextField {...registerFormInput("password",{required:true})} placeholder="Password" label={"Password"}/>
        <LinkButton>Forgot password?</LinkButton>          
      </FlexColumn>

      <div className={styles.login_view_button_panel}>
        <button className={buttonStyles.button} type='button' onClick={(e) => onSubmit(e,onLoginButtonClick)}>Login</button>
        <button className={`${buttonStyles.button} ${buttonStyles.secondary}`} type='button' onClick={onBackButtonClick}>Back</button>
      </div>

      <div></div>
      
    </div>
  );
}

export default LoginPanel;
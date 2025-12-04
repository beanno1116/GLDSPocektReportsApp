
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
import Organization from '../../../Models/Organization';
import Filter from '../../../Utils/Filter';


const createFormData = (data) => {
  try {
    if (!data) throw new TypeError("Data undefined or null");
    return {
      userName: data.userName,
      password: data.password
    }
  } catch (error) {
    console.error(error.message);
  }
}

const parseGetOrganizationResponse = (response) => {
  try {
    // const organization = new Organization(response.data);

    const {id,stores,users,seats} = response.data;        
    return {
      activeStore: 0,
      agentString: "",
      didInit: true,
      organization: id,
      seats,
      stores:stores,
      users: users,
    }
  } catch (error) {
    console.error(error.message);
  }
}

const initialFormData = {
  userName: "",
  password: ""
}


const useLoginPanel = (navigation) => {
  const authAction = useAuthActions();  
  const api = useApiClient();
  const auth = useAuth();
  const localStorage = useLocalStorage();
  const {dispatch} = useContext(AppContext);
  const {registerFormInput,resetForm,onSubmit} = useWEForm(initialFormData);
  const navigate = useNavigate();

  const handleLoginResponse = async (response) => {    
    if (response){  
      let authUser = auth.getAuthUser();
      
      const loginDataResponse = await api.get("organizations",{params:{userId:auth.getAuthUser().id,token:auth.token}});

      if (loginDataResponse.success){
        
        const payloadData = parseGetOrganizationResponse(loginDataResponse);

        debugger;
        if (authUser.stores.length > 1){
          navigate("/stores/selector");
        }else{
          let storeId = authUser.stores[0];
          const store = Filter.storeById(payloadData.stores,storeId);
          payloadData.agentString = store.agentString;
          payloadData.activeStore = store.id;

          navigate("/");
        }
        localStorage.set("org",JSON.stringify(payloadData));
        
        dispatch({action:"all",payload:payloadData});
      }
      loader.loaded();      
      return;
    }
    throw new TypeError("Invalid response data");
  }

  const onLoginButtonClick = async ({data,isValid}) => {

    loader.loading();

    if (!isValid) {
      loader.loaded();
      return;
    }


    const fd = createFormData(data);

    const loginResponse = await authAction.login(fd);

    if (loginResponse){  
      handleLoginResponse(loginResponse);  
    }

  }

  const onBackButtonClick = (e) => {
    resetForm(e);
    navigation.back && navigation.back();
  }

  return {
    onBackButtonClick,
    onLoginButtonClick,
    onSubmit,
    registerFormInput
  }
}



const LoginPanel = ({ when,navigation }) => {
  const {onBackButtonClick,onLoginButtonClick,onSubmit,registerFormInput} = useLoginPanel(navigation);

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
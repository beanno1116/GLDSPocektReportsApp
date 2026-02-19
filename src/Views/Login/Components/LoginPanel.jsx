
import styles from '../loginView.module.css';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import { loader } from '../../../Components/Loader/LoaderModal';
import TextField from '../../../Components/Inputs/TextField';
import LinkButton from '../../../Components/Buttons/LinkButton';
import PasswordTextField from '../../../Components/Inputs/PasswordTextField';
import useWEForm from '../../../hooks/useWEForm';
import { useApiClient } from '../../../Api/Api';
import { useAuth, useAuthActions } from '../../../hooks/useAuth';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useNavigateView from '../../../hooks/useNavigateView';
import Filter from '../../../Utils/Filter';
import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import OutlineButton from '../../../Components/Buttons/OutlineButton';
import useAppContext from '../../../hooks/useAppContext';


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

const parseGetOrganizationResponse = (resData,authorizedStores) => {
  try {
    if (!resData) throw new Error("Response data cannot be null or undefined!");

    const {id,stores,users,seats} = resData;  

    if (authorizedStores.length > 0){
      const autStoreId = authorizedStores[0];
      const initialStore = Filter.storeById(stores,autStoreId);
      const authdStores = Filter.authorizedStores(stores,authorizedStores);
      return {
        activeStore: initialStore.id,
        agentString: initialStore.agentString,
        didInit: true,
        organization: id,
        seats,        
        stores:authdStores,
        users: users,
      }
    }
    
    return {
      activeStore: 0,
      agentString: "",
      didInit: false,
      organization: id,
      seats,
      stores:[],
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
  const {dispatch} = useAppContext();
  const {registerFormInput,resetForm,onSubmit} = useWEForm(initialFormData);
  const navigate = useNavigateView();
  

  const handleLoginResponse = async (response) => {    
    if (response){  
      let authUser = auth.getAuthUser();
      
      const loginDataResponse = await api.get("organizations",{params:{userId:auth.getAuthUser().id,token:auth.token}});

      if (loginDataResponse.success){
        // 
        const payloadData = parseGetOrganizationResponse(loginDataResponse.data,authUser.stores);
        localStorage.set("org",JSON.stringify(payloadData));
        dispatch({type:"all",payload:payloadData});
        navigate("/");
        loader.loaded();
        return;
      }
      // loader.loaded();      
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
        <TextField {...registerFormInput("userName",{required:true})} size='sm' placeholder="User name" label="Username" /> 
        <div></div>
        <PasswordTextField {...registerFormInput("password",{required:true})} placeholder="Password" size='sm'  label="Password" />
        <LinkButton>Forgot password?</LinkButton>          
      </FlexColumn>

      <div className={styles.login_view_button_panel}>
        <PrimaryButton onClick={(e) => onSubmit(e,onLoginButtonClick)} size='md'>Login</PrimaryButton>
        <OutlineButton action={"/manage/users"} size='md' onClick={onBackButtonClick}>Back</OutlineButton>
      </div>

      <div></div>
      
    </div>
  );
}

export default LoginPanel;
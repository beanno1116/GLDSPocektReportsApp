
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
import { useAuthActions } from '../../../hooks/useAuth';

const LoginPanel = ({ when,navigation }) => {
  const authAction = useAuthActions();  
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
    authAction.login(fd,navigate);
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
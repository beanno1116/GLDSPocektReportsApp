
import styles from '../loginView.module.css';
import buttonStyles from '../../../Components/Buttons/button.module.css';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import { loader } from '../../../Components/Loader/LoaderModal';
import TextField from '../../../Components/Inputs/TextField';
import LinkButton from '../../../Components/Buttons/LinkButton';
import PasswordTextField from '../../../Components/Inputs/PasswordTextField';
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';

// import Api, { headers } from '../../../Api/Api';
import useWEForm from '../../../hooks/useWEForm';
import { useApiClient } from '../../../Api/Api';
import { useAuthActions } from '../../../hooks/useAuth';



const RegistrationPanel = ({ when,navigation }) => {
  const api = useApiClient();
  const authAction = useAuthActions();
  const {registerFormInput,resetForm,onSubmit} = useWEForm({
    userName: "",
    password: "",
    confirmPassword: "",
    registrationCode: ""
  })
  

  const navigate = useNavigate();


  const onLoginButtonClick = async ({data,isValid}) => {
    loader.loading();
    

    if (!isValid) {
      loader.loaded(); 
      return;
    }
    

    const fd = {
      username: data.userName,
      password: data.password,
      accessCode: data.registrationCode
    }
    authAction.register(fd,navigate);
    // const registrationResponse = await api.post("register",fd,api.headers.applicationJson);
    // if (registrationResponse.success){
    //   navigate("/");
    // }
    // const api = new Api("https://prapi.gldstools.com/");
    // const registrationResponse = await api.post("register",fd,headers.applicationJson);

    // if (registrationResponse.success){
    //   navigate("/");
    // }
    loader.loaded();
  }

  const onBackButtonClick = (e) => {
    navigation.back && navigation.back();
    resetForm(e);
  }

  return (
    <div className={`${styles.login_view_form_panel} ${when ?  "" : styles.hidden}`}>

      <FlexColumn hAlign='center' vAlign='center'>
        <div className={styles.login_view_form_heading}><h1>Register</h1></div>
        <p className={styles.login_view_form_p}>Register to activate your account!</p>
      </FlexColumn>

      <FlexColumn vAlign='center' g='1rem' p='0 2rem'>
        <TextField {...registerFormInput("userName",{required:true})} placeholder="User name" label={"User name"}/>         
        <PasswordTextField {...registerFormInput("password",{required:true})}placeholder="Password" label={"Password"}/>        
        <PasswordTextField {...registerFormInput("confirmPassword",{required:true})} placeholder={"Confirm"} label={"Confirm Password"} />        
        <TextField {...registerFormInput("registrationCode",{required:true})} placeholder={"Registration Code"} label={"Registration Code"} />        
      </FlexColumn>

      <div className={styles.login_view_button_panel}>
        <button className={buttonStyles.button} type='button' onClick={(e) => onSubmit(e,onLoginButtonClick)}>Register</button>
        <button className={`${buttonStyles.button} ${buttonStyles.secondary}`} type='button' onClick={onBackButtonClick}>Back</button>
      </div>

      <div></div>
      
    </div>
  );
}

export default RegistrationPanel;
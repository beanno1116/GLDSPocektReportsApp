
import { useApiClient } from '../../Api/Api';
import UserLockCircleIcon from '../../assets/icons/UserLockCircleIcon';
import XIcon from '../../assets/icons/XIcon';
import Button from '../../Components/Buttons/Button';
import IconButton from '../../Components/Buttons/IconButton';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import PasswordTextField from '../../Components/Inputs/PasswordTextField';
import DisplayLabel from '../../Components/Labels/DisplayLabel';
import Heading from '../../Components/Labels/Heading';
import { useAuth } from '../../hooks/useAuth';
import useWEForm from '../../hooks/useWEForm';
import BGImageUserPWReset from './Components/BGImageUserPWReset';
import styles from './passwordResetForm.module.css';

const initialData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
}

const PasswordResetForm = ({ submitHandler }) => {
  const auth = useAuth();
  const api = useApiClient();
  const {registerFormInput,onSubmit} = useWEForm(initialData);

  const handleFormSubmit = async ({data,isValid}) => {
    
    if (!isValid) {
      return;
    }

    if (data.newPassword !== data.confirmPassword) return;

    const fd = {
      token: auth.token,
      uid: auth.getAuthUser().id,
      password: data.currentPassword,
      currentPassword: data.newPassword
    }

    // const passwordResetResponse = await api.post("reset/password",fd,api.headers.applicationJson);

    // if (passwordResetResponse.success){
      submitHandler();
    // }

  }

  const onCancelButtonClick = (e) => {
    submitHandler();
  }
  return (
    <>
      <BGImageUserPWReset />
      <FlexRow hAlign="center">
        <Heading mode="lite" size="lg">Password Reset</Heading>
      </FlexRow>
      <FlexColumn hAlign="center" vAlign="center" p=".25rem 0 0 0">   
        <DisplayLabel icon="user" value={auth.getAuthUser().username} />
      </FlexColumn>
      <FlexRow hAlign="center">        
      </FlexRow>
      <FlexColumn flex="1" g="1rem">
        <PasswordTextField label="Current Password" {...registerFormInput("currentPassword",{required:true})} autocomplete="off" placeholder="Current password" />
        <PasswordTextField label="New Password" {...registerFormInput("newPassword",{required:true})} placeholder="New password" />
        <PasswordTextField label="Confirm New Password" {...registerFormInput("confirmPassword",{required:true})} placeholder="Confirm New password" />
      </FlexColumn>

      <FlexRow g='1rem'>
        <Button action={"save"} onClick={(e) => onSubmit(e,handleFormSubmit)}>Reset</Button>
        <IconButton action="close" onClick={onCancelButtonClick}>
          <XIcon size={20} />
        </IconButton> 
      </FlexRow>
    </>
  );
}

export default PasswordResetForm;
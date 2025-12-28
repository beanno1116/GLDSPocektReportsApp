
import { useApiClient } from '../../Api/Api';
import UserLockCircleIcon from '../../assets/icons/UserLockCircleIcon';
import XIcon from '../../assets/icons/XIcon';
import Button from '../../Components/Buttons/Button';
import IconButton from '../../Components/Buttons/IconButton';
import OutlineButton from '../../Components/Buttons/OutlineButton';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import PasswordTextField from '../../Components/Inputs/PasswordTextField';
import DisplayLabel from '../../Components/Labels/DisplayLabel';
import Heading from '../../Components/Labels/Heading';
import { useAuth } from '../../hooks/useAuth';
import useWEForm from '../../hooks/useWEForm';
import Card from '../../Views/Templates/Components/Cards/Card';
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
    <Card m='0'>
      <FlexColumn flex="1" g="1rem">
        <PasswordTextField label="Current Password" {...registerFormInput("currentPassword",{required:true})} autocomplete="off" placeholder="Current password" />
        <PasswordTextField label="New Password" {...registerFormInput("newPassword",{required:true})} placeholder="New password" />
        <PasswordTextField label="Confirm New Password" {...registerFormInput("confirmPassword",{required:true})} placeholder="Confirm New password" />
        <FlexRow g='1rem'>
          <PrimaryButton size='lg' action={"save"} onClick={(e) => onSubmit(e,handleFormSubmit)}>Reset</PrimaryButton>
        </FlexRow>
      </FlexColumn>
    </Card>
  );
}

export default PasswordResetForm;
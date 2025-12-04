
import { useApiClient } from '../../Api/Api';
import XIcon from '../../assets/icons/XIcon';
import Button from '../../Components/Buttons/Button';
import IconButton from '../../Components/Buttons/IconButton';
import NavButton from '../../Components/Buttons/NavButton';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import TextField from '../../Components/Inputs/TextField';
import { loader } from '../../Components/Loader/LoaderModal';
import { useAuth } from '../../hooks/useAuth';
import useWEForm from '../../hooks/useWEForm';
import User from '../../Models/User';
import styles from './editUserForm.module.css';

const initialData = {
  firstName: "",
  lastName: "",
  email: ""
}

const EditUserForm = ({ handleSubmit }) => {
  const api = useApiClient();
  const auth = useAuth();
  const {registerFormInput,onSubmit,resetForm} = useWEForm({
  firstName: auth.getAuthUser()?.firstName || "",
  lastName: auth.getAuthUser()?.lastName || "",
  email: auth.getAuthUser()?.email || ""
});

  const onCloseButtonClick = (e) => {
      handleSubmit && handleSubmit();
    }

    const onSaveButtonClick = async ({data,isValid}) => {
      
      loader.loading();

      if (!isValid){
        loader.loaded();
        return;
      }

      const fd = {
        userId: auth.getAuthUser().id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      }

      let saveResponse = await api.post("user/update",fd,api.headers.applicationJson);

      if (saveResponse.success){

        const {data} = saveResponse;
        const updatedUser = new User(data);
        auth.setAuthUser(updatedUser);
        // close();
      }
      loader.loaded();    
    }
  return (
    <>
      <FlexColumn flex='1' g='1rem'>
        <FlexRow>
          <TextField label="First Name" {...registerFormInput("firstName")} placeholder="First name"/>
        </FlexRow>
        <FlexRow>
          <TextField label="Last Name" {...registerFormInput("lastName")} placeholder="Last name"/>
        </FlexRow>
        <FlexRow>
          <TextField label="Email" {...registerFormInput("email")} placeholder="Email address"/>
        </FlexRow>
        {/* <FlexRow>
          <TextField value={formData.phoneNumber} onChange={(e) => onTextFieldChange(e,"phoneNumber")} name="phoneNumber" placeholder="Phone"/>
        </FlexRow> */}
      </FlexColumn>

      <FlexRow g='1rem'>
        <Button action="save" onClick={(e) => onSubmit(e,onSaveButtonClick)}>Save</Button>
        <IconButton action="close" onClick={onCloseButtonClick}>
          <XIcon size={20} />
        </IconButton>
      </FlexRow>
    </>
  );
}

export default EditUserForm;
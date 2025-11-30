
import { useState } from 'react';
import IconButton from '../../../Components/Buttons/IconButton';
import NavButton from '../../../Components/Buttons/NavButton';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import TextField from '../../../Components/Inputs/TextField';
import styles from '../manageUserView.module.css';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import PlainUserIcon from '../../../assets/icons/PlainUserIcon';
import { loader } from '../../../Components/Loader/LoaderModal';
import useWEForm from '../../../hooks/useWEForm';
import Button from '../../../Components/Buttons/Button';
import XIcon from '../../../assets/icons/XIcon';
import InputGroup from '../../../Components/Forms/InputGroup';
import InputLabel from '../../../Components/Labels/InputLabel';
import TextArea from '../../../Components/Inputs/TextArea';
import { useApiClient } from '../../../Api/Api';
import { useAuth } from '../../../hooks/useAuth';
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import useAppContext from '../../../hooks/useAppContext';

const initialFormData = {
    email: "",        
    message: ""
  }

const AddUserFormPanel = ({ when,close }) => {
  const api = useApiClient();
  const auth = useAuth();
  const {state} = useAppContext();
  const {formData,registerFormInput,resetForm,onSubmit} = useWEForm(initialFormData);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newAccessCode,setNewAccessCode] = useState("");





  const onCloseButtonClick = (e) => {
      close();
      resetForm(e);
  }

  const onSendInviteButtonClick = async ({data,isValid}) => {
    loader.loading();
    if (!isValid){
      return;
    }


    const postData = {
      ...data,
      token: auth.getToken(),
      orgId: state.organization,
      userId: auth.getAuthUser().id
    }
   
    let response = await api.post("users",postData,api.headers.applicationJson);
    debugger;

    if (response.success){
      setShowSuccessModal(true);
      setNewAccessCode(response.data);
      loader.loaded();
      return;
    }
    loader.loaded();
  }

  return (
    <DropdownPanel when={when}>

      {showSuccessModal && (
        <div className={styles.access_code_modal}>        
        <div className={styles.access_code_modal_container}>
          <div style={{fontSize:"3.25rem",fontWeight:"800",color:"snow",textAlign:"center",lineHeight:"1.5"}}>Success!</div>
          <p className={styles.sub_heading_p}>The user was successfully created!</p>
          <FlexRow p="0 1rem" hAlign='center'>
          <div className={styles.access_code_display_panel}>
            <div>Access Code</div>
            <div>{newAccessCode}</div>
          </div>
          </FlexRow>
          <p style={{textAlign:"center"}}>An email was sent with an access code to {formData.email}. You will be alerted once the user has completed the registration</p>          
          <FlexRow p='0 1rem 1.5rem 1rem '>
            <Button onClick={(e) => {
              close();
              resetForm(e);
              setShowSuccessModal(false)}
              }>Done</Button>
          </FlexRow>
        </div>

      </div>
      )}
      
      
      <FlexRow hAlign='center' p='.5rem 0 0 0'>
        <PlainUserIcon size={100} />
      </FlexRow>

      <FlexRow>
        <TextField  label={"Invite Email"} size={'lg'}  {...registerFormInput("email",{required:true})} placeholder="newuser@mail.com" />                
      </FlexRow>

      <FlexColumn flex='1' g='1rem'>
        <div style={{position:"relative",width:"100%",height:"100%"}}>
          <InputGroup height="100%" g={".5rem"}>
            <InputLabel text={"Invite message"} size='md'/>
            <TextArea {...registerFormInput("message",{required:"false"})} size="lg" placeholder={"Your invited to register"} />          
          </InputGroup>
        </div>
      </FlexColumn>

      <FlexRow g='1rem'>
        <Button size='lg' onClick={(e) => onSubmit(e,onSendInviteButtonClick)}>Send Invite</Button>
        <IconButton action="close" onClick={onCloseButtonClick}>
          <XIcon size={20} />          
        </IconButton>                
      </FlexRow>
    </DropdownPanel>    
  );
}

export default AddUserFormPanel;
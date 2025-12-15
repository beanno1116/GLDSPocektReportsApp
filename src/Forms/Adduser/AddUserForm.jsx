
import { useState } from 'react';
import PlainUserIcon from '../../assets/icons/PlainUserIcon';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import TextField from '../../Components/Inputs/TextField';
import WECheckbox from '../../Components/Inputs/WECheckbox/WECheckbox';
import InputLabel from '../../Components/Labels/InputLabel';
import useAppContext from '../../hooks/useAppContext';
import useWEForm from '../../hooks/useWEForm';
import User from '../../Models/User';
import ManageUserStoreList from '../Components/ManageUserStoreList/ManageUserStoreList';
import styles from './addUserForm.module.css';
import Button from '../../Components/Buttons/Button';
import IconButton from '../../Components/Buttons/IconButton';
import XIcon from '../../assets/icons/XIcon';
import { useAuth } from '../../hooks/useAuth';
import { useApiClient } from '../../Api/Api';
import { loader } from '../../Components/Loader/LoaderModal';
import Heading from '../../Components/Labels/Heading';
import BGImageAddUser from './Components/BGImageAddUser';

const initialFormData = {
  email: "",
  isAdmin: false
}


const AddUserForm = ({ handleSubmit }) => {
  const {state} = useAppContext();
  const [newAccessCode,setNewAccessCode] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const auth = useAuth();
  const api = useApiClient();
  const {formData,registerFormInput,resetForm,onSubmit} = useWEForm(initialFormData);
  const [currentUser,setCurrentUser] = useState(new User());


  const onStoreRowClick = (e,storeId) => {    
    if (currentUser.stores.filter(authStore => authStore === storeId).length > 0){
      setCurrentUser({...currentUser,stores:currentUser.stores.filter(authStore => authStore !== storeId)});
      return;
    }
    setCurrentUser({...currentUser,stores:[...currentUser.stores,storeId]})
  }

  const onSaveUserChanges = async ({data,isValid}) => {
    loader.loading();
    ;
    if (!isValid){
      loader.loaded();
      return;
    }
    
    const fd = {
      token: auth.token,
      userId: auth.getAuthUser().id,
      orgId: state.organization,
      email: data.email,
      isAdmin: data.isAdmin === "true" ? true : false,
      storeIds: currentUser.stores
    }
    console.log(fd);

    const createUserResponse = await api.post("users",fd,api.headers.applicationJson);

    if (createUserResponse.success){      
      setShowSuccessModal(true);
      setNewAccessCode(createUserResponse.data);
      loader.loaded();
      return;
    }
    loader.loaded();

  }

  const onCloseButtonClick = (e) => {
    handleSubmit && handleSubmit();
  }

  return (
    <>

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
              handleSubmit();
              resetForm(e);
              setShowSuccessModal(false)}
              }>Done</Button>
          </FlexRow>
        </div>

      </div>
      )}

      <BGImageAddUser />

      <Heading size='lg' mode='lite'>Invite New User</Heading>

      <TextField  label={"Invite Email"} size={'sm'} {...registerFormInput("email",{required:true})} placeholder="Email" />   

      <FlexRow vAlign='center' hAlign='center' g='1rem'>
        <InputLabel text={"Make Admin"} size='lg'/>
        <WECheckbox size="lg" {...registerFormInput("isAdmin")} />
      </FlexRow>   


      <ManageUserStoreList stores={state.stores} currentUser={currentUser} onClick={onStoreRowClick} />


      <FlexRow g='1rem'>
        <Button action={"save"} color='black' onClick={(e) => onSubmit(e,onSaveUserChanges)}>Create</Button>
        <IconButton action="close" onClick={onCloseButtonClick}>
          <XIcon size={20} />
        </IconButton> 
      </FlexRow>
    </>
  );
}

export default AddUserForm;
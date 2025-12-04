
import { useState } from 'react';
import IconButton from '../../../Components/Buttons/IconButton';
import NavButton from '../../../Components/Buttons/NavButton';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import TextField from '../../../Components/Inputs/TextField';
import Heading from '../../../Components/Labels/Heading';
import styles from '../manageUserView.module.css';
import { useApiClient } from '../../../Api/Api';
import PlainUserIcon from '../../../assets/icons/PlainUserIcon';
import { useAuth } from '../../../hooks/useAuth';
import { loader } from '../../../Components/Loader/LoaderModal';
import User from '../../../Models/User';
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import XIcon from '../../../assets/icons/XIcon';
import EditUserForm from '../../../Forms/EditUser/EditUserForm';

const EditUserDetailsPanel = ({ when,close }) => {
  const api = useApiClient();
  const auth = useAuth();





  const onCloseButtonClick = (e) => {
     close();
  }

  const onSaveButtonClick = async (e) => {
    
    loader.loading();

    let saveResponse = await api.post("user/update",formData,api.headers.applicationJson);

    if (saveResponse.success){

      const {data} = saveResponse;
      const updatedUser = new User(data);
      auth.setAuthUser(updatedUser);      
      close();
    }
    loader.loaded();    
  }

  return (
    <DropdownPanel when={when}>
      
      <Heading mode='lite' size='lg'>User Details</Heading>
      
      <FlexRow hAlign='space-between' p='1rem' >
        <PlainUserIcon size={80} />
        <FlexColumn vAlign='flex-end' hAlign='center'>
          <label style={{color:"snow",fontSize:"1.75rem",fontWeight:"800"}}>{auth.getAuthUser().username}</label>
          <label style={{color:"snow",fontSize:"1.5rem"}}>{auth.getAuthUser().isAdmin ? "Administrator" : "User"}</label>
        </FlexColumn>
      </FlexRow>
      <EditUserForm handleSubmit={(e) => close()}/>
    </DropdownPanel>    
  );
}

export default EditUserDetailsPanel;
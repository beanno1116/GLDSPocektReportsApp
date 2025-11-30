
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

const EditUserDetailsPanel = ({ when,close }) => {
  const api = useApiClient();
  const auth = useAuth();

  const [formData,setFormData] = useState({
    userId: auth.getAuthUser().id,
    firstName: auth.getAuthUser().firstName,
    lastName: auth.getAuthUser().lastName,
    email: auth.getAuthUser().email,
    // phoneNumber: ""
  })

  const onTextFieldChange = (e,name) => {
    setFormData({...formData,[name]:e.target.value});
  }

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
    <div className={`${styles.user_settings_panel} ${when ? styles.showing : ""}`}>

        <FlexColumn flex='1' g='1rem'>
          <Heading size='lg'>User Details</Heading>

          <FlexRow hAlign='space-between' p='1rem' >
            <PlainUserIcon size={80} />
            <FlexColumn vAlign='flex-end'>
              <label style={{color:"snow",fontSize:"1.75rem",fontWeight:"800"}}>devuser</label>
              <label style={{color:"snow",fontSize:"1.5rem"}}>Administrator</label>
            </FlexColumn>
          </FlexRow>

          <FlexRow>
            <TextField value={formData.firstName} onChange={(e) => onTextFieldChange(e,"firstName")} name="firstName" placeholder="First name"/>
          </FlexRow>
          <FlexRow>
            <TextField value={formData.lastName} onChange={(e) => onTextFieldChange(e,"lastName")} name="lastName" placeholder="Last name"/>
          </FlexRow>
          <FlexRow>
            <TextField value={formData.email} onChange={(e) => onTextFieldChange(e,"email")} name="email" placeholder="Email address"/>
          </FlexRow>
          {/* <FlexRow>
            <TextField value={formData.phoneNumber} onChange={(e) => onTextFieldChange(e,"phoneNumber")} name="phoneNumber" placeholder="Phone"/>
          </FlexRow> */}
        </FlexColumn>

        <FlexRow g='1rem'>
          <NavButton active={true} size='md' theme='dark' onClick={onSaveButtonClick}>Save</NavButton>
          <IconButton action="close" onClick={onCloseButtonClick}>
            <span style={{color:"red",fontWeight:"800",fontSize:".8rem"}}>X</span>
          </IconButton>
        </FlexRow>


      </div> 
  );
}

export default EditUserDetailsPanel;
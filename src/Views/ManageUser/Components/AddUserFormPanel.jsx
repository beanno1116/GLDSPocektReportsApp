
import { useState } from 'react';
import IconButton from '../../../Components/Buttons/IconButton';
import NavButton from '../../../Components/Buttons/NavButton';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import TextField from '../../../Components/Inputs/TextField';
import styles from '../manageUserView.module.css';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import PlainUserIcon from '../../../assets/icons/PlainUserIcon';
import { loader } from '../../../Components/Loader/LoaderModal';

const AddUserFormPanel = ({ when,close }) => {

  const [formData,setFormData] = useState({
    userRegistrationEmail: "",
    userRegistrationCode: "",
  })

  const onTextFieldChange = (e,name) => {
    setFormData({...formData,[name]:e.target.value});
  }

  const onCreateUseCodeButtonClick = (e) => {
    if (e.target.dataset.action === "close"){
      close();
      setFormData({
        userRegistrationEmail: "",
        userRegistrationCode: "",
      })
      return;
    }

    if (e.currentTarget.innerText === "Submit"){
      if (formData.userRegistrationEmail === "") return;
      close();      
      const intv = setTimeout(() => {
        
        
        
        clearTimeout(intv);
      },3000)
      return;
    }
    loader.loading();
    const intTo = setTimeout(() => {
      setFormData({...formData,userRegistrationCode:"BR19-7R29-X1"});
      loader.loaded();
      clearTimeout(intTo);
    },3000)
  }

  return (
    <div className={`${styles.user_settings_panel} ${when ? styles.showing : ""}`}>
      <FlexRow hAlign='center' p='1rem'>
        <PlainUserIcon size={100} />
      </FlexRow>
      <FlexColumn flex='1' g='1rem'>
        <TextField value={formData.newUserEmail} onChange={(e) => onTextFieldChange(e,"newUserEmail")} name="newUserEmail" placeholder="New User Email" />
        <TextField value={formData.userRegistrationCode} placeholder="xxxx-xxxx-xx" />
        <FlexRow hAlign='space-around'>
          <label style={{color:"snow"}}>Create as Admin?</label>
          <input type='checkbox' />
        </FlexRow>
        <FlexRow flex='1'>
          <textarea style={{display:"flex",flex:"1",width:"100%",height:"100%",fontSize:"1.25rem",padding:".5rem"}} value={"You have been invited to StoreName by devuser"}></textarea>
        </FlexRow>
      </FlexColumn>
      <FlexRow g='1rem'>
        <NavButton active={true} size='md' theme={"dark"} onClick={onCreateUseCodeButtonClick}>{formData.userRegistrationCode === "" ? "Create Code" : "Submit"}</NavButton>
        <IconButton action="close" onClick={onCreateUseCodeButtonClick}>
          <span style={{color:"red",fontWeight:"800",fontSize:".8rem"}}>X</span>
        </IconButton>                
      </FlexRow>
    </div>  
  );
}

export default AddUserFormPanel;
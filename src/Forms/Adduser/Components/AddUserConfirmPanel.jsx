
import Button from '../../../Components/Buttons/Button';
import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import Card from '../../../Views/Templates/Components/Cards/Card';
import styles from '../addUserForm.module.css';

const AddUserConfirmPanel = ({ when,accessCode,close,...props }) => {

  const onDoneButtonClick = (e) => {
    close && close();
  }

  return (
    <DropdownPanel when={when}>
                
        <div className={styles.access_code_modal_container}>
          <div style={{fontSize:"3.25rem",fontWeight:"800",color:"snow",paddingTop:"1rem",textAlign:"center",lineHeight:"1.5"}}>Success!</div>
          <p className={styles.sub_heading_p}>The user created!</p>

          <FlexRow p='1rem' hAlign='center'>
            <div className={styles.success_animation}>
              <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className={styles.checkmark_circle} cx="26" cy="26" r="25" fill="none" /><path className={styles.checkmark_check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
            </div>
          </FlexRow>

          <FlexRow p="0 1rem" hAlign='center'>
            <Card>
              <Card.CodeLabel code={accessCode} />
            </Card>
          </FlexRow>

          
          
          <FlexRow hAlign='center'>
            <p style={{textAlign:"center",color:"var(--text-secondary)",fontSize:"2rem"}}>Email has been sent!</p> 
          </FlexRow>

          <FlexRow flex='1' p='1rem 0'>
            <p style={{textAlign:"center",fontSize:"1.25rem"}}> You will be alerted once the user has completed the registration</p> 
          </FlexRow>

          <FlexRow p='0 1rem 1.5rem 1rem '>
            <PrimaryButton size='lg' action="done" onClick={onDoneButtonClick}>Done</PrimaryButton>
            {/* <Button onClick={(e) => {
              handleSubmit();
              resetForm(e);
              setShowSuccessModal(false)
            }
              }>Done</Button> */}
          </FlexRow>
        </div>
      
     
    </DropdownPanel>
  );
}

export default AddUserConfirmPanel;
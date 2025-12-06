import { useState } from 'react';
import SolidEmailIcon from '../../../assets/icons/SolidEmailIcon';
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import DisplayLabel from '../../../Components/Labels/DisplayLabel';
import Heading from '../../../Components/Labels/Heading';
import ManageUserForm from '../../../Forms/ManageUser/ManageUserForm';
import siteStyles from '../../../site.module.css';
import styles from '../manageUserView.module.css';


const ManageUserPanel = ({ user,when,onChange }) => {  
  const [isInfoPanelShowing,setIsInfoPanelShowing] = useState(false);

  return (
    <DropdownPanel when={when}>

      <FlexColumn flex='1' g='1rem' width='100%'>

        <Heading size='lg' mode='lite'>Manage User</Heading>

        <FlexRow>
          {/* <div style={{position:"absolute",top:"calc(100% + .5rem)",zIndex:"2",width:"100%",height:"100%",background:"red"}}> */}
          {isInfoPanelShowing && (<div className={`${styles.user_details_popup}`}>
            <Heading mode='lite'>User Details</Heading>            
            <DisplayLabel icon={"user"} value={user?.fullName} />
            <DisplayLabel icon={"email"} value={user?.email} />
            <DisplayLabel icon='date' value={"10/12/2025"} />
          </div>)}
          <DisplayLabel icon='user' value={user?.username} onClick={() => setIsInfoPanelShowing(!isInfoPanelShowing)}/>
        </FlexRow>


        <ManageUserForm user={user} submitHandler={onChange}/>

      </FlexColumn>

    
    </DropdownPanel>
  );
}

export default ManageUserPanel;
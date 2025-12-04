import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import DisplayLabel from '../../../Components/Labels/DisplayLabel';
import Heading from '../../../Components/Labels/Heading';
import ManageUserForm from '../../../Forms/ManageUser/ManageUserForm';


const ManageUserPanel = ({ user,when,onChange }) => {  
  ;

  return (
    <DropdownPanel when={when}>

      <FlexColumn flex='1' g='1rem' width='100%'>

        <Heading size='lg' mode='lite'>Manage User</Heading>

        <DisplayLabel label={"User"} value={user?.username} />

        <ManageUserForm user={user} submitHandler={onChange}/>

      </FlexColumn>

    
    </DropdownPanel>
  );
}

export default ManageUserPanel;
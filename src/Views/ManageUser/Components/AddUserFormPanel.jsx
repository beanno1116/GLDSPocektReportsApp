
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import AddUserForm from '../../../Forms/Adduser/AddUserForm';



const AddUserFormPanel = ({ when,close }) => {

  return (
    <DropdownPanel when={when}>

      <AddUserForm handleSubmit={close} />

    </DropdownPanel>    
  );
}

export default AddUserFormPanel;
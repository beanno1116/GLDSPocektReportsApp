
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import ManageUserPanel from './ManageUserPanel';



const DropdownManager = ({ view,when,object,close,p }) => {

  const renderDropDown = (view) => {
    switch (view) {
      case "edit":  
        return <div>Edit current user view</div>
      case "manage":
        return <ManageUserPanel currentUser={object} close={close} />      
    }
  }
  return (
    <DropdownPanel p={p} when={when}>
      {renderDropDown(view)}
    </DropdownPanel>

  );
}

export default DropdownManager;

import OutlineButton from '../../../Components/Buttons/OutlineButton';
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import TabView from '../../../Components/TabView/TabView';
import EditUserForm from '../../../Forms/EditUser/EditUserForm';
import PasswordResetForm from '../../../Forms/PasswordReset/PasswordResetForm';
import UserCard from '../../Templates/Components/Cards/UserCard';


const EditUserInfoTabView = () => {

  const getTab = (tab) => {
    return tab[0].toUpperCase() + tab.slice(1);
  }

  const renderTabView = (tab) => {
    switch (tab) {
      case "information":        
        return (<EditUserForm />);        
      case "security":
        return (<PasswordResetForm />);
      default:
        return (<div style={{color:"snow"}}>Information tab view</div>);
    }
  }

  return (
    <TabView 
      tabs={["information","security"]}
      getTab={getTab}
      renderTabView={renderTabView} />
  )
}


const EditAuthUserPanel = ({ user,when,close,...props }) => {
  const onDoneButtonClick = (e) => {
    const action = e.currentTarget.dataset.action;
    close();
  }

  return (
    <DropdownPanel when={when} p="1rem">

      <UserCard m='0'>
        <UserCard.Header name="Ben Klimaszewski" username="devUser" role={"Administrator"} />
      </UserCard>

      <div style={{flex:"1"}}>
        <EditUserInfoTabView />
      </div>

      <OutlineButton action={"done"} size='lg' onClick={onDoneButtonClick}>Done</OutlineButton>
      
    </DropdownPanel>
  );
}

export default EditAuthUserPanel;

import OutlineButton from '../../../Components/Buttons/OutlineButton';
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
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
    <DropdownPanel p='1rem' when={when}>

      <UserCard m='0'>
        <UserCard.Header name="Ben Klimaszewski" username="devUser" role={"Administrator"} />
      </UserCard>

      <div style={{flex:"1"}}>
        <EditUserInfoTabView />

      </div>
      
      <FlexRow m='0 0 calc(env(safe-area-inset-bottom)) 0'>
        <OutlineButton action={"/manage/users"} size='lg' onClick={onDoneButtonClick}>Done</OutlineButton>
      </FlexRow>
      
    </DropdownPanel>
  );
}

export default EditAuthUserPanel;
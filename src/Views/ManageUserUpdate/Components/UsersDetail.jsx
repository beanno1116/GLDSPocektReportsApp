import { useState } from "react";
import { useGetOrgUsers } from "../../../Api/ApiRoutes";
import AdminUserIcon from "../../../assets/icons/AdminUserIcon";
import PlainUserIcon from "../../../assets/icons/PlainUserIcon";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import FlexColumn from "../../../Components/FlexComponents/FlexColumn";
import FlexRow from "../../../Components/FlexComponents/FlexRow";
import UserList from "../../../Components/Lists/User/UserList";
import ScrollView from "../../../Components/ScrollView/ScrollView";
import useAppContext from "../../../hooks/useAppContext";
import { useAuth } from "../../../hooks/useAuth";
import Card from "../../Templates/Components/Cards/Card";
import AddUserPanel from "./AddUserPanel";

const isLastAdmin = (users,userId) => {
  try {
    const doesAdminExist = users.filter(user => user.id !== userId).some(user => user.isAdmin === true);
    if (doesAdminExist) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(`[ERROR] [HomeView] [isLastAdmin] - ${error.message}`);
  }
}


const useUsersDetail = () => {
  const auth = useAuth();
  const authUser = auth.getAuthUser();
  const {state} = useAppContext();
  const {status,users} = useGetOrgUsers(state.organization);
  const [currentUser,setCurrentUser] = useState(0);
  const [showFormPanel,setShowFormPanel] = useState(false);


  const onUserListItemClick = (e) => {
    
  }

  const onAddUserButtonClick = (e) => {
    setShowFormPanel(true);
  }
  const closeFormPanel = () => {
    setShowFormPanel(false);
  }

  const renderUserListItems = () => {
    if (authUser.isAdmin){
      
    }
    
    return users.map(user => {
      const doesAdminExist = isLastAdmin(users,user.id);

      return (
        <Card.ListItem 
          user={user} 
          icon={user.isAdmin ? <AdminUserIcon size={32} /> : <PlainUserIcon size={32} />}
          onClick={onUserListItemClick}
        />
      )
    })
  }

  return {
    closeFormPanel,
    onAddUserButtonClick,
    renderUserListItems,
    showFormPanel,
    status,
    users
  }
}


const UsersDetail = ({ ...props }) => {
  const {renderUserListItems,status,onAddUserButtonClick,showFormPanel,closeFormPanel} = useUsersDetail();



  if (status.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <AddUserPanel when={showFormPanel} close={closeFormPanel}/>
      <FlexRow flex='1'>
        <Card full={true}>
          <FlexColumn height='100%'>
            <FlexRow flex='1'>
                <div style={{position:"absolute",width:"100%",height:"100%",overflowY:"scroll",padding:"0rem 0"}}>
                  {renderUserListItems()}
                </div>



            </FlexRow>
            <FlexRow>
              <PrimaryButton onClick={onAddUserButtonClick}>Add User</PrimaryButton>
            </FlexRow>
          </FlexColumn>
        </Card>
      </FlexRow>
    </>
  );
}

export default UsersDetail;
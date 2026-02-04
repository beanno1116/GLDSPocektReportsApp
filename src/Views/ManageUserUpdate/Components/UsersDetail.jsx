import { useCallback, useState } from "react";
import { useGetOrgUsers } from "../../../Api/ApiRoutes";
import AdminUserIcon from "../../../assets/icons/AdminUserIcon";
import PlainUserIcon from "../../../assets/icons/PlainUserIcon";
import FlexColumn from "../../../Components/FlexComponents/FlexColumn";
import FlexRow from "../../../Components/FlexComponents/FlexRow";
import useAppContext from "../../../hooks/useAppContext";
import { useAuth } from "../../../hooks/useAuth";
import Card from "../../Templates/Components/Cards/Card";
import ManageUserPanel from "./ManageUserPanel";
import Filter from "../../../Utils/Filter";
import { useSearchParams } from "react-router";


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
  const [searchParams,setSearchParams] = useSearchParams();

  


  const onUserListItemClick = useCallback((e,userId) => {
    setCurrentUser(userId);
    setSearchParams({panelState:"open",user:userId})
    setShowFormPanel(true);
  },[setSearchParams])


  const closeFormPanel = () => {
    setShowFormPanel(false);
  }

  const renderUserListItems = () => {
    if (authUser.isAdmin){
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
    
    return <div></div>
  }

  const onStoreItemClick = (e,action) => {    
    const activeUser = Filter.userById(users,currentUser);
    const prevLength = activeUser.stores.length;
    const filteredUsers = activeUser.stores.filter(store => store !== action);
    if (filteredUsers.length < prevLength){
      setCurrentUser({...activeUser,stores: [...filteredUsers]});
      return;
    }
    setCurrentUser({...activeUser,stores: [...activeUser.stores,action]});
  }

  const getCurrentUser = (userId) => {
    return Filter.userById(users,userId);
  }

  return {
    currentUser,
    getCurrentUser,
    closeFormPanel,    
    renderUserListItems,
    onStoreItemClick,
    showFormPanel,
    status,
    users
  }
}


const UsersDetail = ({ ...props }) => {
  const {users,currentUser,onStoreItemClick,renderUserListItems,status,showFormPanel,closeFormPanel} = useUsersDetail();



  if (status.isLoading) {
    return (
      <div>Loading...</div>
    )
  }


  return (
    <>      
      <ManageUserPanel currentUser={Filter.userById(users,currentUser)} when={showFormPanel} close={closeFormPanel}/>
      <FlexRow flex='1'>
        <Card full={true}>
          <FlexColumn height='100%'>
            <FlexRow flex='1'>
                <div style={{position:"absolute",width:"100%",height:"100%",overflowY:"scroll",padding:"0rem 0"}}>
                  {renderUserListItems()}
                </div>
            </FlexRow>

          </FlexColumn>
        </Card>
      </FlexRow>
    </>
  );
}

export default UsersDetail;
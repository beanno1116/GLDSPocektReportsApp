

import UserRow from './UserRow';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../../Components/Cards/Card';
import UserList from '../../../Components/Lists/User/UserList';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import Button from '../../../Components/Buttons/Button';
import { useCallback, useState } from 'react';
import AddUserFormPanel from './AddUserFormPanel';
import { useGetOrgUsers } from '../../../Api/ApiRoutes';
import useAppContext from '../../../hooks/useAppContext';
import ManageUserPanel from './ManageUserPanel';
import Filter from '../../../Utils/Filter';


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

const AccountUsersPanel = () => {
  const auth = useAuth();
  const {state} = useAppContext();
  const {status,users} = useGetOrgUsers(state.organization);
  const [isDropdownShowing,setIsDropdownShowing] = useState(false);
  const [isManageUserShowing,setIsManageUserShowing] = useState(false); 
  const [currentUser, setCurrentUser] = useState(0); 
  

  const onAddUserButtonClick = (e) => {
    setIsDropdownShowing(!isDropdownShowing);
  }

  const onUserRowClick = useCallback((e,action) => {
    setIsManageUserShowing(true);
    setCurrentUser(action);
  },[])

  const fillUserList = () => {
    const authUser = auth.getAuthUser();
    if (!authUser.isAdmin){
      return (
        <UserRow 
          key={auth.getAuthUser().id} 
          user={auth.getAuthUser()}
          isLastAdmin={false}
          onClick={onUserRowClick} />
      )
    }
    return users.map(user => {
      const doesAdminExist = isLastAdmin(users,user.id);
      return (
        <UserRow 
          key={user.id} 
          user={user}
          isLastAdmin={doesAdminExist}
          onClick={onUserRowClick} />
      )
    })
  }
  
  if (status.isLoading){
    return (
      <div>Loading....</div>
    )
  }

  return (
    <>

      <AddUserFormPanel when={isDropdownShowing} close={(e) => setIsDropdownShowing(false)} />

      <ManageUserPanel 
        when={isManageUserShowing} 
        onChange={(e) => setIsManageUserShowing(false)} 
        user={Filter.userById(users,currentUser)}  />

      <Card flex='1'>
        <Card.Title>Users</Card.Title>
        <Card.FlexContent flex='1'>
          <FlexColumn width='100%' height='100%' p='1rem' g='1rem'>
            <UserList>
              {fillUserList()}
            </UserList>
            <FlexRow>
              {auth.getAuthUser().isAdmin && <Button size='md' color='black' onClick={onAddUserButtonClick}>Add</Button>}
            </FlexRow>
          </FlexColumn>
        </Card.FlexContent>
      </Card>
    </>
  );
}

export default AccountUsersPanel;
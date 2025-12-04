import styles from './manageUserView.module.css';
import Heading from '../../Components/Labels/Heading';
import { useCallback, useContext, useState } from 'react';
import ManageUserPanel from './Components/ManageUserPanel';
import { useGetOrgUsers } from '../../Api/ApiRoutes';
import AccountDetailsPanel from './Components/AccountDetailsPanel';
import CurrentUserDetailPanel from './Components/CurrentUserDetailPanel';
import { AppContext } from '../../Contexts/AppContext';
import AddUserFormPanel from './Components/AddUserFormPanel';
import EditUserDetailsPanel from './Components/EditUserDetailsPanel';
import AccountUsersPanel from './Components/AccountUsersPanel';
import Filter from '../../Utils/Filter';
import PasswordRestPanel from './Components/PasswordRestPanel';





const ManageUserView = () => {  
  const {state} = useContext(AppContext);
  const {status,users} = useGetOrgUsers(state.organization);
  const [isDropdownShowing,setIsDropdownSowing] = useState(false);
  const [isUserSettingsShowing,setIsUserSettingsShowing] = useState(false);
  const [isManageUserShowing,setIsManageUserShowing] = useState(false); 
  const [isPasswordResetShowing,setIsPasswordResetShowing] = useState(false);   
  const [currentUser, setCurrentUser] = useState(0);  



  const onAddUserButtonClick = (e) => {
    if (isDropdownShowing){
      setIsDropdownSowing(false);
      return;
    }
    setIsDropdownSowing(true);
  }



  const onUserRowClick = useCallback((action) => {
     console.log(`User ${action} row clicked`);
     ;
    setIsManageUserShowing(true);
    setCurrentUser(action);
  },[])

  const onUserEditIconClick = (e) => {
    setIsUserSettingsShowing(true);
  }

  const onPasswordResetButtonClick = (e) => {
    setIsPasswordResetShowing(true);
  }



  if (status.isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className={styles.manage_user}>


      {/* Panel auxillary views */}
      <EditUserDetailsPanel when={isUserSettingsShowing} close={(e) => setIsUserSettingsShowing(false)} />

      <PasswordRestPanel when={isPasswordResetShowing} close={(e) => setIsPasswordResetShowing(false)} />
      
      <AddUserFormPanel when={isDropdownShowing} close={(e) => setIsDropdownSowing(false)} />

      <ManageUserPanel 
        when={isManageUserShowing} 
        onChange={(e) => setIsManageUserShowing(false)} 
        user={Filter.userById(users,currentUser)}  />

      <Heading size='lg' mode='lite'>Manage Users</Heading>

      {/* Account user count details */}
      <AccountDetailsPanel userCount={users.length} seatCount={state.seats} />      

      {/* Logged in user details, logout, and reset password buttons */}
      <CurrentUserDetailPanel onToggleUserPanel={onUserEditIconClick} onPasswordResetClick={onPasswordResetButtonClick} />
      

      {/* Users for the current account */}
      <AccountUsersPanel users={users} onClick={onUserRowClick} toggle={onAddUserButtonClick} />

    </div>
  );
}

export default ManageUserView;
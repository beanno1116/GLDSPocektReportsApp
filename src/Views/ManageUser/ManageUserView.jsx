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

  return (
    <div className={styles.manage_user}>

      <Heading size='lg' mode='lite'>Manage Users</Heading>

      {/* Account user count details */}
      <AccountDetailsPanel />      

      {/* Logged in user details, logout, and reset password buttons */}
      <CurrentUserDetailPanel />

      {/* Users for the current account */}
      <AccountUsersPanel />

    </div>
  );
}

export default ManageUserView;
import styles from './manageUserView.module.css';
import Heading from '../../Components/Labels/Heading';



import AccountDetailsPanel from './Components/AccountDetailsPanel';
import CurrentUserDetailPanel from './Components/CurrentUserDetailPanel';



import AccountUsersPanel from './Components/AccountUsersPanel';







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
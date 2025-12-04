
import styles from '../manageUserView.module.css';
import siteStyles from '../../../site.module.css'
import UserRow from './UserRow';
import NavButton from '../../../Components/Buttons/NavButton';
import { useAuth } from '../../../hooks/useAuth';


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

const AccountUsersPanel = ({ users,onClick,toggle }) => {
  const auth = useAuth();
  
  const onUserRowClick = (e,action) => {
    onClick && onClick(action);
  }

  const onAddUserButtonClick = (e) => {
    toggle && toggle();
  }

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

  return (
    <div className={`${styles.manage_user_section} ${siteStyles.flex_4}`}>
        
      <label className={styles.label}>Active users</label>

      <div className={`${styles.panel_section} ${siteStyles.flex_4}`}>

        

        <div style={{position:"relative",flex:"1",width:"100%"}}>

          <div style={{position:"absolute",display:"flex",flexDirection:"column",gap:"1rem",top:"0",left:"0",width:"100%",height:"100%",overflowY:"scroll"}}>
            {fillUserList()}
          </div>

        </div>
        
        <div className={styles.manage_user_button_section}>

            {auth.getAuthUser().isAdmin && <NavButton size='md' active={true} onClick={onAddUserButtonClick}>Add</NavButton>}
            {/* {auth.getAuthUser().isAdmin && <NavButton disabled={users.length >= 4 ? true : false}  size='md' active={true} onClick={onAddUserButtonClick}>Add</NavButton>} */}

        </div>

      </div>
    </div> 
  );
}

export default AccountUsersPanel;
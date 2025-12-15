
import UserIcon from '../../../assets/icons/UserIcon';
import NavButton from '../../../Components/Buttons/NavButton';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import styles from '../manageUserView.module.css';
import siteStyles from '../../../site.module.css';
import { useAuth, useAuthActions } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import EditUserIcon from '../../../assets/icons/EditUserIcon';
import Button from '../../../Components/Buttons/Button';
import Card from '../../../Components/Cards/Card';
import PasswordRestPanel from './PasswordRestPanel';
import { useState } from 'react';
import EditUserDetailsPanel from './EditUserDetailsPanel';


const useUserDetailPanel = () => {
  const auth = useAuth();
  const authActions = useAuthActions();
  const navigate = useNavigate();
  const [isPasswordResetShowing,setIsPasswordResetShowing] = useState(false);
  const [isUserSettingsShowing,setIsUserSettingsShowing] = useState(false);

  const onUserEditButtonClick = (e) => {
    setIsUserSettingsShowing(!isUserSettingsShowing);
  }

  const onLogoutButtonClick = (e) => {
    const button = e.target;
    const action = button.dataset.action;
    if (action === "logout"){
      if (authActions.logout()){
        navigate("/login");
        return;
      }
    }
  }

  const onResetPasswordButtonClick = (e) => {
    setIsPasswordResetShowing(!isPasswordResetShowing);
  }

  return {
    isUserSettingsShowing,
    isPasswordResetShowing,
    onResetPasswordButtonClick,
    onUserEditButtonClick,
    onLogoutButtonClick,
    authUser: auth.getAuthUser(),
    username: auth.getAuthUser()?.username,
    isAdmin: auth.getAuthUser()?.isAdmin
  }
}


const CurrentUserDetailPanel = () => {
  const {username,isAdmin,isPasswordResetShowing,isUserSettingsShowing,onResetPasswordButtonClick,onUserEditButtonClick,onLogoutButtonClick} = useUserDetailPanel();
  

  return (
    <>
      <PasswordRestPanel when={isPasswordResetShowing} close={(e) => onResetPasswordButtonClick(false)} />
      <EditUserDetailsPanel when={isUserSettingsShowing} close={(e) => onUserEditButtonClick(false)} />
      <Card>
        <Card.Title>Your Details</Card.Title>
        <Card.Content>
          <FlexRow g='.5rem' vAlign='center' hAlign='center' p='1rem'>

              <button className={styles.current_user_icon_button} data-action="edit" onClick={onUserEditButtonClick}>
                <div style={{background:"#00800096",zIndex:"-1",borderRadius:"50%",boxShadow:" rgba(0, 0, 0, 0.25) 0px 25px 50px -12px"}}>
                  <EditUserIcon size={50} />                
                </div>
              </button>

              <FlexColumn g='.5rem' vAlign='center' flex='2'>
                <FlexRow hAlign='flex-start'>
                  <span className={`${siteStyles.align_right} ${siteStyles.md}`}>{username}</span>
                </FlexRow>
                <FlexRow hAlign='flex-start'>
                  <span className={siteStyles.md}>{isAdmin ? "Administrator" : "User"}</span>
                </FlexRow>
              </FlexColumn> 

            </FlexRow>

            <FlexRow g='1rem' p='1rem'>
              <Button action={"reset"} size='sm' color='black' onClick={onResetPasswordButtonClick}>Reset Password</Button>
              <Button action={"logout"} size='sm' color='black' onClick={onLogoutButtonClick}>Logout</Button>
            </FlexRow>
        </Card.Content>      
      </Card>
    </>
  );
}

export default CurrentUserDetailPanel;
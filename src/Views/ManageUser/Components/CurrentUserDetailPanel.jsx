
import UserIcon from '../../../assets/icons/UserIcon';
import NavButton from '../../../Components/Buttons/NavButton';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import styles from '../manageUserView.module.css';
import siteStyles from '../../../site.module.css';
import { useAuth, useAuthActions } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import EditUserIcon from '../../../assets/icons/EditUserIcon';

const CurrentUserDetailPanel = ({ onToggleUserPanel }) => {
  const auth = useAuth();
  const authActions = useAuthActions();
  const navigate = useNavigate();

  const onUserEditIconClick = (e) => {
    onToggleUserPanel && onToggleUserPanel(e);
  }

  const onLogoutButtonClick = (e) => {
    debugger;
    if (authActions.logout()){
      navigate("/login");
    }
  }

  const onButtonClickEvent = (e) => {
    const button = e.target;
    const action = button.dataset.action;
    if (action === "logout"){
      if (authActions.logout()){
        navigate("/login");
        return;
      }
    }
    if (action === "reset"){
      return;
    }

    if (action === "edit"){
      onToggleUserPanel && onToggleUserPanel(e);
      return;
    }

  }
  const onResetPasswordButtonClick = (e) => {

  }

  return (
      <div className={styles.manage_user_section}>

        <label className={styles.label}>User Information</label>

        <div className={styles.panel_section}>
          
          <FlexRow g='.5rem' vAlign='center' hAlign='center'>

            <FlexRow flex='1' hAlign='center'>
              <button data-action="edit" onClick={onUserEditIconClick}>
                {/* <EditUserIcon size={70} /> */}
                <UserIcon size={70} />
              </button>
            </FlexRow>

            <FlexColumn g='.5rem' vAlign='center' flex='2'>
              <FlexRow hAlign='flex-end'>
                <span className={`${siteStyles.align_right} ${siteStyles.md}`}>{auth.getAuthUser()?.username}</span>
              </FlexRow>
              <FlexRow hAlign='flex-end'>
                <span className={siteStyles.md}>{auth.getAuthUser()?.isAdmin ? "Administrator" : "User"}</span>
              </FlexRow>
              <FlexRow hAlign='flex-end'>
                <div className={styles.sm}></div>
              </FlexRow>                    
            </FlexColumn>       

          </FlexRow>

          <FlexRow g='1rem' p='.25rem 0 0 0'>
            <NavButton action={"reset"} color='black' active={true} size="sm">Reset Password</NavButton>
            <NavButton action={"logout"} color='black' active={true} size="sm" onClick={onButtonClickEvent}>Logout</NavButton>
          </FlexRow>
        </div>
      </div>
  );
}

export default CurrentUserDetailPanel;
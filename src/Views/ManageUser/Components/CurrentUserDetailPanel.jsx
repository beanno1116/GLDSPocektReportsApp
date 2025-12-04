
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
import IconButton from '../../../Components/Buttons/IconButton';

const CurrentUserDetailPanel = ({ onToggleUserPanel,onPasswordResetClick }) => {
  const auth = useAuth();
  const authActions = useAuthActions();
  const navigate = useNavigate();

  const onUserEditIconClick = (e) => {
    onToggleUserPanel && onToggleUserPanel(e);
  }

  const onLogoutButtonClick = (e) => {
    ;
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
    onPasswordResetClick && onPasswordResetClick(e);
  }

  return (
      <div className={styles.manage_user_section}>

        <label className={styles.label}>User Information</label>

        <div className={styles.panel_section}>
          
          <FlexRow g='.5rem' vAlign='center' hAlign='center'>
            <button style={{position:"absolute",top:"-40px",right:"0",zIndex:"1",background:"green",border:"2px solid limegreen",borderRadius:"50%",boxShadow:" rgba(0, 0, 0, 0.25) 0px 25px 50px -12px"}} data-action="edit" onClick={onUserEditIconClick}>
                <EditUserIcon size={60} />                
              </button>

            <FlexColumn g='.5rem' vAlign='center' flex='2'>
              <FlexRow hAlign='flex-start'>
                <span className={`${siteStyles.align_right} ${siteStyles.md}`}>{auth.getAuthUser()?.username}</span>
              </FlexRow>
              <FlexRow hAlign='flex-start'>
                <span className={siteStyles.md}>{auth.getAuthUser()?.isAdmin ? "Administrator" : "User"}</span>
              </FlexRow>
            </FlexColumn> 

            {/* <FlexRow flex='1' hAlign='flex-end'>
              
              <button style={{borderRadius:"50%",border:".2rem solid purple",padding:".25rem",transform:"translate(-10%,-25%)"}} data-action="edit" onClick={onUserEditIconClick}>
                <EditUserIcon size={35} />                                
              </button>
            </FlexRow> */}

          </FlexRow>

          <FlexRow g='1rem' p='.25rem 0 0 0'>
            <NavButton action={"reset"} color='black' active={true} size="sm" onClick={onResetPasswordButtonClick}>Reset Password</NavButton>
            <NavButton action={"logout"} color='black' active={true} size="sm" onClick={onButtonClickEvent}>Logout</NavButton>
            {/* <Button action={"reset"} size='sm' onClick={onResetPasswordButtonClick}>Reset Password</Button>
            <Button action={"logout"} size='sm' onClick={onButtonClickEvent}>Logout</Button> */}
          </FlexRow>
        </div>
      </div>
  );
}

export default CurrentUserDetailPanel;
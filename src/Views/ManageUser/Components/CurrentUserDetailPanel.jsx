
import UserIcon from '../../../assets/icons/UserIcon';
import NavButton from '../../../Components/Buttons/NavButton';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import styles from '../manageUserView.module.css';
import siteStyles from '../../../site.module.css';
import { useAuth } from '../../../hooks/useAuth';

const CurrentUserDetailPanel = ({ onToggleUserPanel }) => {
  const auth = useAuth();

  const onUserEditIconClick = (e) => {
    onToggleUserPanel && onToggleUserPanel(e);
  }

  const onLogoutButtonClick = (e) => {

  }

  return (
      <div className={styles.manage_user_section}>
        <label className={styles.label}>User Information</label>
        <div className={styles.panel_section}>
          
          <FlexRow g='.5rem' vAlign='center' hAlign='center'>
            <FlexRow flex='1' hAlign='center'>
              <button onClick={onUserEditIconClick}>
                <UserIcon size={70} />
              </button>
            </FlexRow>
            <FlexColumn g='.5rem' vAlign='center' flex='2'>
              <FlexRow hAlign='flex-end'>
                <span className={`${siteStyles.align_right} ${siteStyles.md}`}>{auth.user?.username}</span>
              </FlexRow>
              <FlexRow hAlign='flex-end'>
                <span className={siteStyles.md}>{auth.user?.isAdmin ? "Administrator" : "User"}</span>
              </FlexRow>
              <FlexRow hAlign='flex-end'>
                <div className={styles.sm}></div>
              </FlexRow>                    
            </FlexColumn>                  
          </FlexRow>
          <FlexRow g='1rem' p='.25rem 0 0 0'>
            <NavButton color='black' active={true} size="sm">Reset Password</NavButton>
            <NavButton color='black' active={true} size="sm" onClick={onLogoutButtonClick}>Logout</NavButton>
          </FlexRow>
        </div>
      </div>
  );
}

export default CurrentUserDetailPanel;
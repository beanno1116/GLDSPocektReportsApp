
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import styles from '../manageUserView.module.css';
import siteStyles from '../../../site.module.css';

const AccountDetailsPanel = ({ account }) => {
  return (
    <div className={styles.manage_user_section}>
        <label className={styles.label}>Account</label>
        <div className={`${styles.panel_section_row} ${styles.space_between}`}>
          <FlexRow g='.5rem'>
            <span className={siteStyles.md}>Total:</span>
            <span className={siteStyles.md}>{account.numberOfUsers}</span>
          </FlexRow>
          <FlexRow g='.5rem' hAlign='flex-end'>
            <span className={siteStyles.md}>Available:</span>
            <span className={siteStyles.md}>{account.numberOfUsers - account.activeUsers.length}</span>
          </FlexRow>
        </div>
      </div>
  );
}

export default AccountDetailsPanel;
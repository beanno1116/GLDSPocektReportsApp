
import UserLockCircleIcon from '../../../assets/icons/UserLockCircleIcon';
import styles from '../passwordResetForm.module.css';

const BGImageUserPWReset = ({color="#28304472"}) => {
  return (
    <div className={styles.user_pw_bg_icon}>
      <UserLockCircleIcon size={125} color={color} />
    </div>
  );
}

export default BGImageUserPWReset;
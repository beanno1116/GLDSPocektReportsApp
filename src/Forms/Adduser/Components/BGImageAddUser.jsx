
import AddNewUserIcon from '../../../assets/icons/AddNewUserIcon';
import styles from '../adduserForm.module.css';

const BGImageAddUser = ({color="#28304472"}) => {
  return (
    <div className={styles.user_pw_bg_icon}>
      <AddNewUserIcon size={125} color={color} />
    </div>
  );
}

export default BGImageAddUser;
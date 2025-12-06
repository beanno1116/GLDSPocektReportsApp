
import styles from './userList.module.css';

const UserList = ({ children }) => {
  return (
  <div className={styles.list_container}>
    <div className={styles.list}>
      {children}
    </div>
  </div>
  );
}

export default UserList;
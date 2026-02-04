
import styles from '../list.module.css';

const ListHeader = ({ title,selected,total,...props }) => {
  return (
    <div className={styles.list_header}>
        <div className={styles.list_title}>{title}</div>
        <div className={styles.selection_badge}>
          {selected} / {total}
        </div>
      </div>
  );
}

export default ListHeader;
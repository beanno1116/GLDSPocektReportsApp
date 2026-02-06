
import styles from '../list.module.css';

const ListHeader = ({ title,selected,total,countBadge="true",...props }) => {
  return (
    <div className={styles.list_header}>
        <div className={styles.list_title}>{title}</div>
        {countBadge && 
          <div className={styles.selection_badge}>
            {selected} / {total}
          </div>}

      </div>
  );
}

export default ListHeader;
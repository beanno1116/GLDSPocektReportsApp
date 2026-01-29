
import styles from '../list.module.css';

const CheckboxListItem = ({ id,title,description,onClick,status,...props }) => {
  return (
    <button key={id} className={styles.checkbox_list_item} onClick={(e) => onClick(e,id)}>
      <span className={`${styles.checkbox} ${status && styles.checked}`}>            
        {status ? '✓' : ''}
      </span>
      <div className={styles.item_content}>
        <div className={styles.item_title}>{title}</div>
        {description && (
          <div className={styles.item_description}>{description}</div>
        )}
      </div>
      {status && (
        <span className={styles.status_dot}></span>
      )}
    </button>
  );
}

export default CheckboxListItem;
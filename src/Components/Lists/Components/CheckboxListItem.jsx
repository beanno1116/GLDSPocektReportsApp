
import DragIcon from '../../../assets/icons/DragIcon';
import styles from '../list.module.css';

const CheckboxListItem = ({ id,title,description,onClick,status,dragable=false,...props }) => {
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
      {dragable && (
        <span>
          <DragIcon size={22} />
        </span>
      )}
      {!dragable && status && (
        <span className={styles.status_dot}></span>
      )}
    </button>
  );
}

export default CheckboxListItem;
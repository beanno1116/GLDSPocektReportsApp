
import DragIcon from '../../../assets/icons/DragIcon';
import styles from '../list.module.css';

const DragableListItem = ({ id,title,description,onClick,status,...props }) => {
  return (
    <button key={id} className={styles.checkbox_list_item} onClick={(e) => onClick(e,id)}>
       <div className={styles.item_content}>
        <div className={styles.item_title}>{title}</div>
       </div>
       <span>
        <DragIcon size={22} />
       </span>
    </button>
  );
}

export default DragableListItem;
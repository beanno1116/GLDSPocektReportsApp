
import CheckboxListItem from './Components/CheckboxListItem';
import DragableListItem from './Components/DragableListItem';
import ListHeader from './Components/ListHeader';
import styles from './list.module.css';


const ScrollList = ({children}) => {
  return (
    <div className={styles.scrollable_list}>
      {children}
    </div>
  )
}

const SelectAll = ({onClick,isAllSelected,isSomeSelected,...props}) => {
  return (
    <div className={styles.select_all}>
      <button className={styles.select_all_button} onClick={onClick}>
        <span className={`${styles.checkbox} ${isAllSelected && styles.checked} ${isSomeSelected && styles.partial_checked}`}>
          {isAllSelected ? '✓' : isSomeSelected ? '−' : ''}
        </span>
        <span className={styles.select_all_label}>
          {isAllSelected ? 'Deselect All' : 'Select All'}
        </span>
      </button>
    </div>
  )
}


const List = ({ children }) => {
  return (
    <div className={styles.list_container}>
       {children}
    </div>
  );
}

List.Header = ListHeader;
List.ScrollView = ScrollList;
List.SelectAll = SelectAll;
List.CheckboxListItem = CheckboxListItem;
List.DraggableListItem = DragableListItem;

export default List;